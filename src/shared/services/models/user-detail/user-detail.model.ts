/* ---- Models (adjust as needed) ---- */
export interface UserDetailModel {
  id: string;
  providerId: string;
  userId: string;
  userName: string;
  userStatus: UserStatusEnum;
  userRoleId: string;
}

export enum UserStatusEnum {
  Available = 1,
  OnChat = 2,
  OnCall = 3,
  LoggedOff = 4
}