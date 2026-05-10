import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFarmProject extends Document {
    farmerId?: mongoose.Types.ObjectId;
    projectId: string; // e.g., "PRJ-102"
    title: string;
    status: string; // e.g., "Cultivating", "Funding"
    fundingGoal: string; // e.g., "5.000 USDT"
    currentFunding: string; // e.g., "5.000 USDT"
    progress: number;
    harvestDate: string;
    traceabilityId: string;
    createdAt: Date;
}

const FarmProjectSchema: Schema = new Schema({
    farmerId: { type: Schema.Types.ObjectId, ref: "User" },
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
    fundingGoal: { type: String, required: true },
    currentFunding: { type: String, required: true },
    progress: { type: Number, required: true },
    harvestDate: { type: String, required: true },
    traceabilityId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const FarmProject: Model<IFarmProject> = mongoose.models.FarmProject || mongoose.model<IFarmProject>("FarmProject", FarmProjectSchema);
