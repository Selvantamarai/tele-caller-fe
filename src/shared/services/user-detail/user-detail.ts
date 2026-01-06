import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurdService } from '../core/services';
import { UserDetailModel } from '../models/user-detail/user-detail.model';
import { GridifyQuery } from '../core/models';

@Injectable({
  providedIn: 'root',
})

export class UserDetailService extends CurdService<
  string,
  UserDetailModel,
  UserDetailModel,
  GridifyQuery
> {
  constructor(
    protected httpClients: HttpClient,
  ) {
    super(httpClients, 'TelecallerUserDetail'); //3a90fd66-6654-41d8-9b24-77850a3f5ed4
  }
  
  private readonly _loginUserDetail: WritableSignal<UserDetailModel | null> = signal<UserDetailModel | null>(null);

  get loginUserDetail(): Signal<UserDetailModel | null> {
    return this._loginUserDetail.asReadonly();
  }

  setLoginUserDetail(value: UserDetailModel | null): void {
    this._loginUserDetail.set(value);
  }
}