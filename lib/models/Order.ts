import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
    buyerId?: mongoose.Types.ObjectId; // Optional if guest
    guestEmail?: string;
    orderNumber: string;
    products: Array<{
        productId: mongoose.Types.ObjectId;
        name: string;
        imageUrl?: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    status: "pending" | "paid" | "packed" | "shipped" | "completed" | "cancelled";
    shippingAddress: {
        receiverName: string;
        phone: string;
        fullAddress: string;
    };
    estimatedArrival?: Date;
    paymentReference?: string;
    paymentToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    buyerId: { type: Schema.Types.ObjectId, ref: "User" },
    guestEmail: { type: String },
    orderNumber: { type: String, required: true, unique: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        imageUrl: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "paid", "packed", "shipped", "completed", "cancelled"],
        default: "pending"
    },
    shippingAddress: {
        receiverName: { type: String, required: true },
        phone: { type: String, required: true },
        fullAddress: { type: String, required: true },
    },
    estimatedArrival: { type: Date },
    paymentReference: { type: String },
    paymentToken: { type: String },
}, { timestamps: true });

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
