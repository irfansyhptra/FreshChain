import mongoose, { Schema, Document, Model } from "mongoose";

export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    type: "info" | "warning" | "success" | "error";
    title: string;
    message: string;
    icon?: string;
    metadata?: any;
    isRead: boolean;
    createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["info", "warning", "success", "error"], default: "info" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    icon: { type: String },
    metadata: { type: Schema.Types.Mixed },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
