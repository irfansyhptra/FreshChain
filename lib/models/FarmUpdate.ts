import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFarmUpdate extends Document {
    farmerId?: mongoose.Types.ObjectId;
    type: string; // "sensor", "finance", "traceability", "system"
    icon: string;
    color: string;
    message: string;
    time: string; // Storing as string to match existing UI for now ("2 mins ago")
    createdAt: Date;
}

const FarmUpdateSchema: Schema = new Schema({
    farmerId: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const FarmUpdate: Model<IFarmUpdate> = mongoose.models.FarmUpdate || mongoose.model<IFarmUpdate>("FarmUpdate", FarmUpdateSchema);
