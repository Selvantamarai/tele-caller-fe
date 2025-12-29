import { Injectable, signal, WritableSignal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CallSessionModel } from '../models/teli-caller/callSessionModel';
import { environment } from '../../../environments/environments';
import { ChatMessageModel } from '../models/teli-caller/chatMessageModel';
import { ChimeSessionResponseModel } from '../models/teli-caller/chimeSessionResponseModel';
import { AlertService } from '../core/services';

interface HubEventMap {
  CallSession: CallSessionModel;
  Message: ChatMessageModel;
  CallRequested: string;
  CallRejected: string;
  CallAccepted: ChimeSessionResponseModel;
  CallEnded: string;
}

interface HubMethodMap {
  SendMessage: ChatMessageModel;
  RejectCall: string;
  AsseptCall: string;
  RequestCall: string;
  EndCall: string;
  ReConnect: string;
}

@Injectable({ providedIn: 'root' })
export class SignalRService {
  public hubConnection!: signalR.HubConnection;
  public connectionId$: WritableSignal<string> = signal('');
  private eventSignals = new Map<keyof HubEventMap, WritableSignal<any>>();

  constructor(public alertService: AlertService) {
  }

  async connectToSignalR(userId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.API_BASE_URL}/api/v1/CallHub?userId=${userId}`, {
        withCredentials: true
      }).withAutomaticReconnect().build();
    try {
      await this.hubConnection.start();
      this.connectionId$.set(this.hubConnection.connectionId as string)
      console.log("SignalR Connected");
    } catch (err) {
      console.error("SignalR Connection Error:", err);
    }
  }

  onSignal<K extends keyof HubEventMap>(event: K): WritableSignal<HubEventMap[K] | null> {
    if (!this.eventSignals.has(event)) {
      const sig = signal<HubEventMap[K] | null>(null);
      this.eventSignals.set(event, sig);
      this.hubConnection.on(event as string, data => sig.set(data));
    }
    return this.eventSignals.get(event)!;
  }

  async trigger<K extends keyof HubMethodMap>(method: K, payload: HubMethodMap[K]): Promise<void> {
    if (!this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      console.warn(`SignalR not connected. Skipping invoke: ${String(method)}`);
      return;
    }
    try { await this.hubConnection.invoke(method as string, payload); }
    catch (err) { this.alertService.warning(err); console.error(`SignalR invoke failed: ${String(method)}`, err); }
  }
}
