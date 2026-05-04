import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPetaniProfile {
    nik: string;
    groupName?: string;
    location: string;
    commodity: string;
    area: number;
    kycKTPUrl?: string;
    kycLandUrl?: string;
}

export interface IInvestorProfile {
    nikPaspor: string;
    npwp: string;
    incomeSource: string;
    riskProfile: string;
    kycDocUrl?: string;
    kycSelfieUrl?: string;
}

export interface IKonsumenProfile {
    phone: string;
    address: string;
    provinsi: string;
    kota: string;
    kodepos: string;
    kycUrl?: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "Petani" | "Investor" | "Konsumen" | "Admin";
    dob?: Date;
    phone?: string;
    address?: string;
    kycStatus: "Pending" | "Verified" | "Rejected";
    
    petaniProfile?: IPetaniProfile;
    investorProfile?: IInvestorProfile;
    konsumenProfile?: IKonsumenProfile;
    
    createdAt: Date;
    updatedAt: Date;
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
    dob: { type: Date },
    phone: { type: String },
    address: { type: String },
    kycStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Verified", "Rejected"]
    },
    
    petaniProfile: {
        nik: String,
        groupName: String,
        location: String,
        commodity: String,
        area: Number,
        kycKTPUrl: String,
        kycLandUrl: String,
    },
    
    investorProfile: {
        nikPaspor: String,
        npwp: String,
        incomeSource: String,
        riskProfile: String,
        kycDocUrl: String,
        kycSelfieUrl: String,
    },
    
    konsumenProfile: {
        phone: String,
        address: String,
        provinsi: String,
        kota: String,
        kodepos: String,
        kycUrl: String,
    },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on save
UserSchema.pre('save', function () {
    this.updatedAt = new Date();
});

// Prevent model overwrite in hot-reload
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
