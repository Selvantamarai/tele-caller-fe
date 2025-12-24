import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TeleCallerModule } from './telecaller/telecaller.module';
import { CallerPageComponent } from "./telecaller/caller-page/caller-page.component";
import { SignalRService } from '../shared/services/teli-caller/signar-r.service';
import { GridifyQuery, GridResult } from '../shared/services/core/models';
import { takeUntil } from 'rxjs';
import { Unsubscriber } from '../shared/services/module/unsubscribe/unsubscribe.component.';
import { UserDetailService } from '../shared/services/user-detail/user-detail';
import { UserDetailModel } from '../shared/services/models/user-detail/user-detail.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TeleCallerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App extends Unsubscriber implements OnInit {
  providerId: string;
  teleCallers: UserDetailModel[]
  logedInTeleCallerModel!: UserDetailModel;

  constructor(public signalRService: SignalRService, private userDetailService: UserDetailService, private route: ActivatedRoute,) {
    super()
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.providerId = params['providerId'];
      if (this.providerId) {
        this.getAllTeleCaller();
      }
    });
  }

  getAllTeleCaller() {
    var query: GridifyQuery = {
      page: 1,
      pageSize: 100,
      filter: 'providerId=' + this.providerId
    }
    this.userDetailService.get(query).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: GridResult<UserDetailModel>) => {
        this.teleCallers = data.data
      }
    })
  }

  logedInTeleCaller(model: UserDetailModel) {
    this.logedInTeleCallerModel = model;
  }
}
