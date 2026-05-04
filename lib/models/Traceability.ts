import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITraceability extends Document {
    batchId: string;
    productId?: mongoose.Types.ObjectId;
    farmerId?: mongoose.Types.ObjectId;
    currentStatus: string;
    currentLocation: string;
    notes?: string;
    history: Array<{
        status: string;
        location: string;
        metadata?: Record<string, unknown>;
        actorId?: string;
        timestamp: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const TraceabilitySchema: Schema = new Schema(
    {
        batchId: { type: String, required: true, unique: true, index: true },
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        farmerId: { type: Schema.Types.ObjectId, ref: "User" },
        currentStatus: { type: String, required: true },
        currentLocation: { type: String, required: true },
        notes: { type: String },
        history: [
            {
                status: { type: String, required: true },
                location: { type: String, required: true },
                metadata: { type: Schema.Types.Mixed },
                actorId: { type: String },
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export const Traceability: Model<ITraceability> = mongoose.models.Traceability || mongoose.model<ITraceability>("Traceability", TraceabilitySchema);
