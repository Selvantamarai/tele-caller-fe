import {
  AudioVideoObserver,
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
  VideoTileState,
} from 'amazon-chime-sdk-js';

import { Injectable, signal, WritableSignal } from '@angular/core';

export interface RemoteStreamState {
  hasCamera: boolean;
  hasScreen: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChimeMeetingService implements AudioVideoObserver {

  private meetingSession?: DefaultMeetingSession;
  private audioVideo: any;
  private videoContainer?: HTMLElement;
  /** tileId → video element */
  private tileVideoMap = new Map<number, HTMLVideoElement>();
  remoteStreamState: WritableSignal<RemoteStreamState> = signal({
    hasCamera: false,
    hasScreen: false,
  });
  private started = false;

  /* ---------------- INIT ---------------- */
  async initialize(
    meeting: any,
    attendee: any,
    videoContainer: HTMLElement
  ): Promise<void> {
    this.videoContainer = videoContainer;
    const logger = new ConsoleLogger('Chime', LogLevel.OFF);
    const deviceController = new DefaultDeviceController(logger);
    const config = new MeetingSessionConfiguration(meeting, attendee);
    this.meetingSession = new DefaultMeetingSession(config, logger, deviceController);
    this.audioVideo = this.meetingSession.audioVideo;
    this.audioVideo.addObserver(this);
    const audios = await this.audioVideo.listAudioInputDevices();
    if (audios.length) {
      await this.audioVideo.startAudioInput(audios[0].deviceId);
    }
  }

  async start(): Promise<void> {
    if (this.started) return;
    this.audioVideo.start();
    this.started = true;
  }

  /* ---------------- VIDEO TILES ---------------- */
  videoTileDidUpdate(tileState: VideoTileState): void {
    if (!tileState?.tileId || tileState.localTile) return;

    const tileId = tileState.tileId;
    if (this.tileVideoMap.has(tileId)) return;

    // wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'video-tile';
    wrapper.setAttribute('data-tile-id', tileId.toString());

    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    video.muted = tileState.isContent;

    // click actions
    wrapper.ondblclick = () => this.toggleFullscreen(wrapper);

    wrapper.appendChild(video);
    this.videoContainer?.appendChild(wrapper);

    this.tileVideoMap.set(tileId, video);
    this.audioVideo.bindVideoElement(tileId, video);

    // smooth entrance
    requestAnimationFrame(() => wrapper.classList.add('show'));

    if (tileState.isContent) {
      this.remoteStreamState.update(s => ({ ...s, hasScreen: true }));
    } else {
      this.remoteStreamState.update(s => ({ ...s, hasCamera: true }));
    }
  }


  toggleFullscreen(el: HTMLElement) {
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  videoTileWasRemoved(tileId: number): void {
    const video = this.tileVideoMap.get(tileId);
    if (!video) return;

    const wrapper = video.parentElement as HTMLElement;

    wrapper.classList.remove('show');
    wrapper.classList.add('removing');

    setTimeout(() => {
      this.audioVideo.unbindVideoElement(tileId);
      wrapper.remove();
      this.tileVideoMap.delete(tileId);
    }, 300);
  }

  /* ---------------- MIC ---------------- */

  setMicEnabled(enabled: boolean): void {
    enabled
      ? this.audioVideo.realtimeUnmuteLocalAudio()
      : this.audioVideo.realtimeMuteLocalAudio();
  }

  /* ---------------- CLEANUP ---------------- */

  async stopAll(): Promise<void> {
    try {
      for (const [tileId, video] of this.tileVideoMap) {
        this.audioVideo.unbindVideoElement(tileId);
        video.remove();
      }

      this.tileVideoMap.clear();
      this.remoteStreamState.set({ hasCamera: false, hasScreen: false });

      this.audioVideo.stopContentShare();
      await this.audioVideo.stopAudioInput();
      this.audioVideo.stop();

      this.started = false;
    } catch (err) {
      console.error('Chime cleanup error', err);
    }
  }
}
