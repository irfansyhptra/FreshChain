import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICampaign extends Document {
    title: string;
    description: string;
    commodity?: string;
    landArea?: number;
    locationGPS?: string;
    targetHarvest?: string;
    bannerUrl?: string;
    farmerId: mongoose.Types.ObjectId;
    targetAmount: number;     // in IDR or Crypto equivalent
    currentAmount: number;
    status: "Draft" | "Funding" | "In_Progress" | "Completed" | "Failed";
    smartContractAddress?: string; // the Escrow contract
    investmentTerms?: {
        minInvestment: number;
        profitSharing: number;
        fundingDeadline: Date;
        returnIfFailed: boolean;
    };
    returnSimulation?: {
        productivity: number;
        prices: { min: number; normal: number; max: number };
        salesPercentages: { min: number; normal: number; max: number };
    };
    activities: Array<{
        milestone: "Persiapan" | "Penanaman" | "Pemeliharaan" | "Panen";
        name: string;
        description: string;
        startDate: Date;
        endDate: Date;
        items: Array<{
            name: string;
            category: string;
            quantity: number;
            unit: string;
            unitPrice: number;
            total: number;
            costType: "Material" | "Jasa" | "Operasional" | "Logistik";
        }>;
        proofRequirement?: string;
        isCompleted: boolean;
    }>;
    createdAt: Date;
}

const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    costType: { type: String, enum: ["Material", "Jasa", "Operasional", "Logistik"], required: true },
});

const CampaignSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    commodity: { type: String },
    landArea: { type: Number },
    locationGPS: { type: String },
    targetHarvest: { type: String },
    bannerUrl: { type: String },
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["Draft", "Funding", "In_Progress", "Completed", "Failed"],
        default: "Draft"
    },
    smartContractAddress: { type: String },
    investmentTerms: {
        minInvestment: { type: Number, default: 100000 },
        profitSharing: { type: Number, default: 0 },
        fundingDeadline: { type: Date },
        returnIfFailed: { type: Boolean, default: true }
    },
    returnSimulation: {
        productivity: { type: Number, default: 0 },
        prices: {
            min: { type: Number, default: 0 },
            normal: { type: Number, default: 0 },
            max: { type: Number, default: 0 }
        },
        salesPercentages: {
            min: { type: Number, default: 60 },
            normal: { type: Number, default: 80 },
            max: { type: Number, default: 100 }
        }
    },
    activities: [{
        milestone: { type: String, enum: ["Persiapan", "Penanaman", "Pemeliharaan", "Panen"], required: true },
        name: { type: String, required: true },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        items: [ItemSchema],
        proofRequirement: { type: String },
        isCompleted: { type: Boolean, default: false }
    }],
    createdAt: { type: Date, default: Date.now },
});

export const Campaign: Model<ICampaign> = mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema);
