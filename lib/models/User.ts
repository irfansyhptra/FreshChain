import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "Petani" | "Investor" | "Konsumen" | "Admin";
    kycStatus: "Pending" | "Verified" | "Rejected";
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Tambahan field password (optional untuk provider auth lain)
    role: {
        type: String,
        required: true,
        enum: ["Petani", "Investor", "Konsumen", "Admin"]
    },
    kycStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Verified", "Rejected"]
    },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite un hot-reload
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
