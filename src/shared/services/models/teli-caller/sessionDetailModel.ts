import { CustomReadModel } from "../../../models/common/custom-read.model";
import { UserStatusEnum } from "../user-detail/user-detail.model";
import { CallSessionModel } from "./callSessionModel";

export interface SessionDetailModel extends CustomReadModel {
    participantId: string;
    participantName:string;
    participantType: UserStatusEnum;
    callSessionId: string;
    callSession: CallSessionModel;
    attendeeId: string;
}