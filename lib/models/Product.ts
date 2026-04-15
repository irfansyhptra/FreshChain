import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    farmerId: mongoose.Types.ObjectId;
    price: number;
    stock: number;
    qrCodeUrl?: string; // Mapping to trace code
    createdAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    qrCodeUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
