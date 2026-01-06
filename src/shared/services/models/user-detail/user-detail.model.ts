/* ---- Models (adjust as needed) ---- */
export interface UserDetailModel {
  id: string;
  providerId: string;
  userId: string;
  userName: string;
  userStatus: UserStatusEnum;
  userType: UserTypeEnum;
}

export enum UserStatusEnum {
  Available = 1,
  OnCall = 2,
  LoggedOff = 3
}

export enum UserTypeEnum {
  Telecaller = 1,
  Customer = 2,
  Manager = 3
}