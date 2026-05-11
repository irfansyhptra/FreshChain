import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
    buyerId?: mongoose.Types.ObjectId; // Optional if guest
    guestEmail?: string;
    cartSessionId?: string;
    orderNumber: string;
    products: Array<{
        productId: mongoose.Types.ObjectId;
        name: string;
        imageUrl?: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    subtotalAmount: number;
    shippingFee: number;
    platformFee: number;
    status: "pending" | "paid" | "packed" | "shipped" | "completed" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed" | "cancelled" | "expired";
    shippingAddress: {
        receiverName: string;
        phone: string;
        fullAddress: string;
    };
    estimatedArrival?: Date;
    paymentReference?: string;
    paymentToken?: string;
    paymentType?: string;
    midtransTransactionId?: string;
    paidAt?: Date;
    cancelledAt?: Date;
    stockReserved: boolean;
    stockReleasedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    buyerId: { type: Schema.Types.ObjectId, ref: "User" },
    guestEmail: { type: String },
    cartSessionId: { type: String },
    orderNumber: { type: String, required: true, unique: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        imageUrl: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    subtotalAmount: { type: Number, required: true, default: 0 },
    shippingFee: { type: Number, required: true, default: 0 },
    platformFee: { type: Number, required: true, default: 0 },
    status: {
        type: String,
        enum: ["pending", "paid", "packed", "shipped", "completed", "cancelled"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "cancelled", "expired"],
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
    paymentType: { type: String },
    midtransTransactionId: { type: String },
    paidAt: { type: Date },
    cancelledAt: { type: Date },
    stockReserved: { type: Boolean, default: false },
    stockReleasedAt: { type: Date },
}, { timestamps: true });

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
