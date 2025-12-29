import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, effect, Signal, WritableSignal, signal } from '@angular/core';
import { CallSessionModel } from '../../../shared/services/models/teli-caller/callSessionModel';
import { ChimeMeetingService, RemoteStreamState } from '../../../shared/services/teli-caller/chime-meeting.service';
import { SignalRService } from '../../../shared/services/teli-caller/signar-r.service';
import { ChatMessageModel } from '../../../shared/services/models/teli-caller/chatMessageModel';
import { SessionDetailModel } from '../../../shared/services/models/teli-caller/sessionDetailModel';
import { UserDetailService } from '../../../shared/services/user-detail/user-detail';
import { UserDetailModel } from '../../../shared/services/models/user-detail/user-detail.model';
import { ChimeSessionResponseModel } from '../../../shared/services/models/teli-caller/chimeSessionResponseModel';

@Component({
  selector: 'app-caller-page',
  standalone: false,
  templateUrl: './caller-page.component.html',
  styleUrl: './caller-page.component.scss'
})
export class CallerPageComponent implements OnInit, OnDestroy {

  /* ---------------------- VIDEO ELEMENTS ---------------------- */
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('screenVideo') screenVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLElement>;
  @ViewChild('videoContainer', { static: false }) videoContainer!: ElementRef<HTMLDivElement>;
  @Output() messageEmitter = new EventEmitter<string>();
  @Output() callEnded = new EventEmitter<any>();

  callSessionModel: WritableSignal<CallSessionModel | null>;

  /* ---------------------- CALLER INFO ------------------------- */
  callTimer: string = "00:00:00";
  isRecording: boolean = false;
  piplineId!: string | null;

  /* ---------------------- CHAT ---------------------- */
  messages: WritableSignal<ChatMessageModel[]> = signal([]);
  chatMessage: string = "";

  /* ---------------------- CONTROLS ---------------------- */
  micEnabled: boolean = true;
  camEnabled: boolean = true;
  chimeStarted: boolean = false;

  /* ---------------------- REMOTE STREAM STATE ---------------------- */
  remoteState = signal<RemoteStreamState>({ hasCamera: false, hasScreen: false });

  /* ---------------------- INTERNAL TIMER ---------------------- */
  private timerInterval: any;
  private totalSeconds = 0;
  private sessionDetail: SessionDetailModel;
  public loginUserDetail: UserDetailModel;
  chatMessageSignal: WritableSignal<ChatMessageModel>;
  callRequestedSignal: WritableSignal<string>;
  callAcceptedSignal: WritableSignal<ChimeSessionResponseModel>;
  callEndedSignal: WritableSignal<string>;

  constructor(
    private chime: ChimeMeetingService,
    private signalRService: SignalRService,
    private userDetailService: UserDetailService
  ) {
    this.loginUserDetail = this.userDetailService.loginUserDetail();
    this.callSessionModel = this.signalRService.onSignal('CallSession');
    this.chatMessageSignal = this.signalRService.onSignal('Message');
    this.callRequestedSignal = this.signalRService.onSignal('CallRequested');
    this.callAcceptedSignal = this.signalRService.onSignal('CallAccepted');
    this.callEndedSignal = this.signalRService.onSignal('CallEnded');

    effect(() => {
      const msg = this.chatMessageSignal();
      if (!msg) return;
      if (msg.senderId !== this.loginUserDetail?.userId) {
        this.messages.update(list => [...list, msg]);
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const val = this.callSessionModel();
      if (!val) return;
      this.sessionDetail = val.sessionDetails?.find(o => o.participantId == this.loginUserDetail.userId);
      if (!this.timerInterval && this.callSessionModel()) this.startCallTimer();
      this.messages.set(val.chatMessages)
    }, { allowSignalWrites: true });

    effect(() => {
      this.remoteState.set(this.chime.remoteStreamState());
    }, { allowSignalWrites: true });

    effect(() => {
      const val = this.callAcceptedSignal();
      if (!val) return;
      this.callSessionModel.set(val.callSession);
      this.tryStartChime();
    }, { allowSignalWrites: true });

    effect(() => {
      const val = this.callEndedSignal();
      if (!val) return;
      this.endCall(false)
    })
  }

  ngOnInit(): void {
    this.signalRService.trigger('ReConnect', '')
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  /* ---------------------- CHIME JOIN ---------------------- */

  private async tryStartChime(): Promise<void> {
    if (this.chimeStarted) return;
    const accepted = this.callAcceptedSignal();
    if (!accepted?.meeting || !accepted?.attendee) return;
    if (!this.videoContainer?.nativeElement) {
      requestAnimationFrame(() => this.tryStartChime());
      return;
    }
    await this.chime.initialize(
      accepted.meeting,
      accepted.attendee,
      this.videoContainer.nativeElement
    );
    await this.chime.start();
    this.chimeStarted = true;
  }

  /* ---------------------- CHAT METHODS ---------------------- */

  async sendMessage() {
    if (!this.chatMessage.trim()) return;

    const cs = this.callSessionModel();
    if (!cs) return;

    const messageModel: ChatMessageModel = {
      callSessionId: cs.id,
      isModified: false,
      messageText: this.chatMessage,
      createdAt: new Date().toISOString(),
      isRead: false,
      senderName: this.sessionDetail?.participantName,
      senderId: this.sessionDetail?.participantId,
      isDeleted: false,
    };
    this.messages.update(list => [...list, messageModel]);
    await this.signalRService.trigger('SendMessage', messageModel);
    this.chatMessage = "";
    setTimeout(() => this.scrollChatToBottom(), 20);
  }

  private scrollChatToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer) {
        const el = this.chatContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }

  getMessageBy(msg: ChatMessageModel) {
    return (msg.senderId == this.loginUserDetail.userId) ? "me" : "other";
  }

  /* ---------------------- CALL TIMER ---------------------- */

  private startCallTimer(): void {
    this.timerInterval = setInterval(() => {
      this.totalSeconds++;

      const hrs = Math.floor(this.totalSeconds / 3600);
      const mins = Math.floor((this.totalSeconds % 3600) / 60);
      const secs = this.totalSeconds % 60;

      this.callTimer = `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.callTimer = "00:00:00";
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  /* ---------------------- CONTROLS (CHIME) ---------------------- */

  toggleMic(): void {
    this.micEnabled = !this.micEnabled;
    this.chime.setMicEnabled(this.micEnabled);
  }

  /* ---------------------- END CALL ---------------------- */

  async endCall(eventNeeded = true) {
    console.log("Ending call...");
    await this.chime.stopAll();
    this.stopTimer()
    this.stopBrowserMedia();
    this.micEnabled = false;
    this.camEnabled = false;
    this.chimeStarted = false;
    if (eventNeeded) {
      this.signalRService.trigger('EndCall', this.callSessionModel().id)
    }
    this.callAcceptedSignal.set(null);
    this.callRequestedSignal.set(null);
    this.callSessionModel.set(null)
    console.log("Call fully ended.");
  }

  private stopBrowserMedia() {
    const stopTracks = (videoEl?: ElementRef<HTMLVideoElement>) => {
      const el = videoEl?.nativeElement;
      if (el?.srcObject) {
        const stream = el.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
        el.srcObject = null;
      }
    };
    stopTracks(this.remoteVideo);
    stopTracks(this.screenVideo);
    console.log("Browser streams stopped.");
  }

  /* ---------------------- CALL REQUEST ACTIONS ---------------------- */

  attendCall() {
    this.signalRService.trigger("AsseptCall", this.callSessionModel().id);
  }

  rejectCall() {
    this.callRequestedSignal.set(null);
    this.signalRService.trigger("RejectCall", this.callSessionModel().id);
  }
}