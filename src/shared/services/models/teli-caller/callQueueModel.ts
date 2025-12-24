import { CustomReadModel } from "../../../models/common/custom-read.model";

export interface CallQueueModel extends CustomReadModel {
    providerId: string;
    inspectionType: InspectionTypeEnum;
    inspectionId: string;
    customerId: string;
    customerName:string;
    customerRequestComment: string | null;
    callQueueStatus: CallQueueStatus;
    requestedAt: number;
    expiryAt: number;
    isDeleted: boolean | null;
}

export enum InspectionTypeEnum {
    Order = 1,
    Roster = 2,
    Program = 3,
    Inquiry = 4
}

export enum CallQueueStatus {
    Waiting = 1,
    Assigned,
    Completed,
    Declined,
    Expired
}