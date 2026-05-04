import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLog extends Document {
  action: string;
  entityType: string;
  entityId?: string;
  actorId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    action: { type: String, required: true, index: true },
    entityType: { type: String, required: true, index: true },
    entityId: { type: String },
    actorId: { type: String },
    metadata: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

