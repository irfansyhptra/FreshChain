import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
    buyerId: mongoose.Types.ObjectId;
    products: Array<{
        productId: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    txHash?: string; // Payment via crypto
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending"
    },
    txHash: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
