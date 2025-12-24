import { CustomReadModel } from "../../../models/common/custom-read.model";
import { CallSessionModel } from "./callSessionModel";

export interface SessionDetailModel extends CustomReadModel {
    participantId: string;
    participantName:string;
    callSessionId: string;
    callSession: CallSessionModel;
    attendeeId: string;
}