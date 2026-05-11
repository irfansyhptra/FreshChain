import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransactionProduct {
    productId: mongoose.Types.ObjectId;
    name: string;
    imageUrl?: string;
    quantity: number;
    price: number;
    status: "pending" | "packed" | "shipped" | "completed" | "cancelled";
}

export interface ITransaction extends Document {
    userId?: mongoose.Types.ObjectId;
    guestEmail?: string;
    transactionNumber: string;
    
    products: ITransactionProduct[];
    
    subtotalAmount: number;
    shippingFee: number;
    platformFee: number;
    totalAmount: number;
    
    // Overall transaction status
    status: "pending" | "paid" | "packed" | "shipped" | "completed" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed" | "cancelled" | "expired";
    
    // Shipping details
    shippingAddress: {
        receiverName: string;
        phone: string;
        fullAddress: string;
    };
    
    // Payment references
    paymentReference?: string;
    paymentToken?: string;
    paymentType?: string;
    midtransTransactionId?: string;
    
    // Timestamps
    paidAt?: Date;
    shippedAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
    estimatedArrival?: Date;
    
    // Stock management
    stockReserved: boolean;
    stockReleasedAt?: Date;
    
    // Metadata
    cartSessionId?: string;
    notes?: string;
    
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    guestEmail: { type: String },
    transactionNumber: { type: String, required: true, unique: true },
    
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        imageUrl: { type: String },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        status: {
            type: String,
            enum: ["pending", "packed", "shipped", "completed", "cancelled"],
            default: "pending"
        }
    }],
    
    subtotalAmount: { type: Number, required: true, default: 0, min: 0 },
    shippingFee: { type: Number, required: true, default: 0, min: 0 },
    platformFee: { type: Number, required: true, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    
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
    
    paymentReference: { type: String },
    paymentToken: { type: String },
    paymentType: { type: String },
    midtransTransactionId: { type: String },
    
    paidAt: { type: Date },
    shippedAt: { type: Date },
    completedAt: { type: Date },
    cancelledAt: { type: Date },
    estimatedArrival: { type: Date },
    
    stockReserved: { type: Boolean, default: false },
    stockReleasedAt: { type: Date },
    
    cartSessionId: { type: String },
    notes: { type: String },
    
}, { timestamps: true });

// Indexes for common queries
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ guestEmail: 1, createdAt: -1 });
TransactionSchema.index({ transactionNumber: 1 });
TransactionSchema.index({ status: 1 });

export const Transaction: Model<ITransaction> = 
    mongoose.models.Transaction || 
    mongoose.model<ITransaction>("Transaction", TransactionSchema);
