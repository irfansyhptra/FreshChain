import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITraceability extends Document {
    productId: mongoose.Types.ObjectId;
    farmerId: mongoose.Types.ObjectId;
    txHash: string; // Blockchain transaction anchoring
    currentStatus: "Planted" | "Harvested" | "Packaging" | "In_Transit" | "Delivered";
    location: string;
    notes?: string;
    timestamp: Date;
}

const TraceabilitySchema: Schema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    txHash: { type: String, required: true },
    currentStatus: {
        type: String,
        enum: ["Planted", "Harvested", "Packaging", "In_Transit", "Delivered"],
        required: true
    },
    location: { type: String, required: true },
    notes: { type: String },
    timestamp: { type: Date, default: Date.now },
});

export const Traceability: Model<ITraceability> = mongoose.models.Traceability || mongoose.model<ITraceability>("Traceability", TraceabilitySchema);
