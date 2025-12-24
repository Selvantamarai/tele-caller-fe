
import { CustomReadModel } from "../../../models/common/custom-read.model";

export interface ChatMessageModel extends CustomReadModel {
    senderId: string;
    senderName: string;
    messageText: string;
    isRead: boolean;
    isModified: boolean | null;
    isDeleted: boolean | null;
    createdAt: string;
    callSessionId: string;
}