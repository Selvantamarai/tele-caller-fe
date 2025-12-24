import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserDetailService } from '../../../shared/services/user-detail/user-detail';
import { Unsubscriber } from '../../../shared/services/module/unsubscribe/unsubscribe.component.';
import { UserDetailModel, UserStatusEnum } from '../../../shared/services/models/user-detail/user-detail.model';
import { SignalRService } from '../../../shared/services/teli-caller/signar-r.service';
import { AlertService } from '../../../shared/services/core/services';
import { CallQueueService } from '../../../shared/services/teli-caller/call-queue.service';

@Component({
  selector: 'app-telecaller-list',
  standalone: false,
  templateUrl: './telecaller-list.html',
  styleUrl: './telecaller-list.scss',
})
export class TelecallerList extends Unsubscriber implements OnDestroy {

  providerId: string;
  logedTeleCaller: UserDetailModel;
  @Input() teleCallers: UserDetailModel[];
  @Output() logedIn: EventEmitter<UserDetailModel> = new EventEmitter<UserDetailModel>();


  constructor(private signalrService: SignalRService, private userDetailService: UserDetailService
    , private alertService: AlertService, private callQueueService: CallQueueService,
  ) {
    super()
  }
  
  getUserStatusName(status: UserStatusEnum): string {
    switch (status) {
      case UserStatusEnum.Available:
        return 'Available';
      case UserStatusEnum.OnChat:
        return 'On Chat';
      case UserStatusEnum.OnCall:
        return 'On Call';
      case UserStatusEnum.LoggedOff:
        return 'Logged Off';
      default:
        return 'Unknown';
    }
  }

  getStatusClass(status: UserStatusEnum): string {
    return UserStatusBgClass[status] ?? 'bg-light';
  }

  async loginAsTeleCaller(index: number) {
    var res = await this.signalrService.connectToSignalR(this.teleCallers[index].userId);
    if (this.signalrService.connectionId$()) {
      this.alertService.success("Hub connection success.")
      this.userDetailService.setLoginUserDetail(this.teleCallers[index]);
    } else {
      this.alertService.warning("Hub connection failed.")
    }
  }



}

export const UserStatusBgClass: Record<UserStatusEnum, string> = {
  [UserStatusEnum.Available]: 'bg-success',
  [UserStatusEnum.OnChat]: 'bg-info',
  [UserStatusEnum.OnCall]: 'bg-warning',
  [UserStatusEnum.LoggedOff]: 'bg-secondary'
};