import { CallSessionModel } from "./callSessionModel";

export interface ChimeSessionResponseModel {
    callSession: CallSessionModel
    meeting: any;
    attendee: any;
}

