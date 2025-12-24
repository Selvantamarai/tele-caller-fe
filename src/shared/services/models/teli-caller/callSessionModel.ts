import { CustomReadModel } from "../../../models/common/custom-read.model";
import { CallQueueModel } from "./callQueueModel";
import { ChatMessageModel } from "./chatMessageModel";
import { SessionDetailModel } from "./sessionDetailModel";

export interface CallSessionModel extends CustomReadModel {
    meetingId: string | null;
    callStartTime: string;
    callEndTime: string | null;
    callSessionStatus: CallSessionStatus;
    providerId: string;
    isDeleted: boolean | null;
    callQueueId: string | null;
    callQueue: CallQueueModel;
    chatMessages: ChatMessageModel[];
    sessionDetails: SessionDetailModel[];
}

export enum CallSessionStatus {
    Pending = 1,
    Started,
    Ended,
    Canceled,
    Declined
}