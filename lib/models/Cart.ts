import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
    productId: mongoose.Types.ObjectId;
    name: string;
    imageUrl?: string;
    quantity: number;
    price: number;
}

export interface ICart extends Document {
    userId?: mongoose.Types.ObjectId;
    sessionId?: string; // For guest users
    items: ICartItem[];
    status: "active" | "checked_out";
    checkoutOrderId?: mongoose.Types.ObjectId;
    checkedOutAt?: Date;
    updatedAt: Date;
}

const CartItemSchema: Schema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    imageUrl: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
}, { _id: false });

const CartSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    sessionId: { type: String }, // Used as a fallback if the user is not logged in
    items: [CartItemSchema],
    status: {
        type: String,
        enum: ["active", "checked_out"],
        default: "active",
    },
    checkoutOrderId: { type: Schema.Types.ObjectId, ref: "Order" },
    checkedOutAt: { type: Date },
}, { timestamps: true });

export const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
