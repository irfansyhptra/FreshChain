import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInvestment extends Document {
  campaignId: mongoose.Types.ObjectId;
  investorId: mongoose.Types.ObjectId;
  amount: number;
  status: "Active" | "Refunded" | "ProfitPaid";
  investedAt: Date;
  notes?: string;
}

const InvestmentSchema: Schema = new Schema({
  campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
  investorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Active", "Refunded", "ProfitPaid"],
    default: "Active"
  },
  notes: { type: String },
  investedAt: { type: Date, default: Date.now },
});

// Compound index: one investor per campaign (can invest multiple times — remove unique if needed)
InvestmentSchema.index({ campaignId: 1, investorId: 1 });

export const Investment: Model<IInvestment> =
  mongoose.models.Investment ||
  mongoose.model<IInvestment>("Investment", InvestmentSchema);
