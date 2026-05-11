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

export interface IKonsumenProfile {
    phone: string;
    address: string;
    provinsi: string;
    kota: string;
    kodepos: string;
    kycUrl?: string;
    
    // Investasi fields
    nikPaspor?: string;
    npwp?: string;
    incomeSource?: string;
    riskProfile?: string;
    kycDocUrl?: string;
    kycSelfieUrl?: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: "Petani" | "Konsumen" | "Admin";
    dob?: Date;
    phone?: string;
    address?: string;
    kycStatus: "Pending" | "Verified" | "Rejected" | "Unverified";
    
    petaniProfile?: IPetaniProfile;
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
        enum: ["Petani", "Konsumen", "Admin"]
    },
    dob: { type: Date },
    phone: { type: String },
    address: { type: String },
    kycStatus: {
        type: String,
        default: "Unverified",
        enum: ["Unverified", "Pending", "Verified", "Rejected"]
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
    
    konsumenProfile: {
        phone: String,
        address: String,
        provinsi: String,
        kota: String,
        kodepos: String,
        kycUrl: String,
        
        nikPaspor: String,
        npwp: String,
        incomeSource: String,
        riskProfile: String,
        kycDocUrl: String,
        kycSelfieUrl: String,
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
