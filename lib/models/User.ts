import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    role: "Petani" | "Investor" | "Konsumen" | "Admin";
    walletAddress?: string;
    kycStatus: "Pending" | "Verified" | "Rejected";
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        required: true,
        enum: ["Petani", "Investor", "Konsumen", "Admin"]
    },
    walletAddress: { type: String, sparse: true }, // For crypto interactions
    kycStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Verified", "Rejected"]
    },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite un hot-reload
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
