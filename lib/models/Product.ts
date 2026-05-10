import mongoose, { Schema, Document, Model } from "mongoose";

export type ProductCategory =
    | "Sayur Organik"
    | "Buah Tropis"
    | "Gandum & Biji"
    | "Rempah & Bumbu"
    | "Lainnya";

export type ProductUnit = "kg" | "gram" | "ikat" | "buah" | "liter" | "karung";

export type ProductStatus = "Aktif" | "Habis" | "Ditarik";

export interface IProduct extends Document {
    name: string;
    description: string;
    farmerId: mongoose.Types.ObjectId;
    farmerName: string;
    farmerLocation: string;
    price: number;
    stock: number;
    unit: ProductUnit;
    category: ProductCategory;
    imageUrl?: string;
    badge?: string;
    qrCodeUrl?: string;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        farmerName: { type: String, required: true },
        farmerLocation: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        unit: {
            type: String,
            required: true,
            enum: ["kg", "gram", "ikat", "buah", "liter", "karung"],
            default: "kg",
        },
        category: {
            type: String,
            required: true,
            enum: ["Sayur Organik", "Buah Tropis", "Gandum & Biji", "Rempah & Bumbu", "Lainnya"],
            default: "Lainnya",
        },
        imageUrl: { type: String },
        badge: { type: String },
        qrCodeUrl: { type: String },
        status: {
            type: String,
            enum: ["Aktif", "Habis", "Ditarik"],
            default: "Aktif",
        },
    },
    { timestamps: true }
);

export const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
