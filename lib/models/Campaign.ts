import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICampaign extends Document {
    title: string;
    description: string;
    farmerId: mongoose.Types.ObjectId;
    targetAmount: number;     // in IDR or Crypto equivalent
    currentAmount: number;
    status: "Funding" | "In_Progress" | "Completed" | "Failed";
    smartContractAddress?: string; // the Escrow contract
    milestones: Array<{
        description: string;
        targetDate: Date;
        isCompleted: boolean;
    }>;
    createdAt: Date;
}

const CampaignSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["Funding", "In_Progress", "Completed", "Failed"],
        default: "Funding"
    },
    smartContractAddress: { type: String },
    milestones: [{
        description: String,
        targetDate: Date,
        isCompleted: { type: Boolean, default: false }
    }],
    createdAt: { type: Date, default: Date.now },
});

export const Campaign: Model<ICampaign> = mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema);
