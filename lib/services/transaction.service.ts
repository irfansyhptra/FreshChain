import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb/client";
import { Transaction, ITransaction } from "@/lib/models/Transaction";
import { User } from "@/lib/models/User";
import { Order } from "@/lib/models/Order";

type CreateTransactionInput = {
    userId?: string;
    guestEmail?: string;
    products: Array<{
        productId: string;
        name: string;
        imageUrl?: string;
        quantity: number;
        price: number;
    }>;
    subtotalAmount: number;
    shippingFee: number;
    platformFee: number;
    totalAmount: number;
    shippingAddress: {
        receiverName: string;
        phone: string;
        fullAddress: string;
    };
    cartSessionId?: string;
    paymentReference?: string;
};

export class TransactionService {
    /**
     * Create a new transaction from an order
     */
    static async createTransaction(input: CreateTransactionInput): Promise<ITransaction> {
        await dbConnect();

        const transactionNumber = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;

        const transactionData = {
            userId: input.userId ? new mongoose.Types.ObjectId(input.userId) : undefined,
            guestEmail: input.guestEmail,
            transactionNumber,
            products: input.products.map((item) => ({
                productId: new mongoose.Types.ObjectId(item.productId),
                name: item.name,
                imageUrl: item.imageUrl || "",
                quantity: item.quantity,
                price: item.price,
                status: "pending" as const,
            })),
            subtotalAmount: input.subtotalAmount,
            shippingFee: input.shippingFee,
            platformFee: input.platformFee,
            totalAmount: input.totalAmount,
            shippingAddress: input.shippingAddress,
            status: "pending" as const,
            paymentStatus: "pending" as const,
            stockReserved: true,
            cartSessionId: input.cartSessionId,
            paymentReference: input.paymentReference,
        };

        const transaction = await Transaction.create(transactionData);

        // Link transaction to user if userId exists
        if (input.userId) {
            await User.findByIdAndUpdate(
                new mongoose.Types.ObjectId(input.userId),
                { $push: { transactions: transaction._id } },
                { new: true }
            );
        }

        return transaction;
    }

    /**
     * Get user's transactions with optional status filter
     */
    static async getUserTransactions(
        userId: string,
        statusFilter?: string | string[]
    ): Promise<ITransaction[]> {
        await dbConnect();

        const query: Record<string, unknown> = {
            userId: new mongoose.Types.ObjectId(userId),
        };

        if (statusFilter) {
            const statuses = Array.isArray(statusFilter)
                ? statusFilter
                : statusFilter.split(",").map((s) => s.trim());
            query.status = statuses.length === 1 ? statuses[0] : { $in: statuses };
        }

        return Transaction.find(query).sort({ createdAt: -1 });
    }

    /**
     * Get user's transactions by email (for guests)
     */
    static async getGuestTransactions(
        email: string,
        statusFilter?: string | string[]
    ): Promise<ITransaction[]> {
        await dbConnect();

        const query: Record<string, unknown> = {
            guestEmail: email.toLowerCase(),
        };

        if (statusFilter) {
            const statuses = Array.isArray(statusFilter)
                ? statusFilter
                : statusFilter.split(",").map((s) => s.trim());
            query.status = statuses.length === 1 ? statuses[0] : { $in: statuses };
        }

        return Transaction.find(query).sort({ createdAt: -1 });
    }

    /**
     * Update transaction payment status (called by Midtrans webhook)
     */
    static async updatePaymentStatus(
        transactionNumber: string,
        paymentStatus: "paid" | "failed" | "cancelled" | "expired",
        paymentType?: string,
        midtransTransactionId?: string
    ): Promise<ITransaction | null> {
        await dbConnect();

        const updateData: Record<string, unknown> = {
            paymentStatus,
            paymentType: paymentType || undefined,
            midtransTransactionId: midtransTransactionId || undefined,
        };

        if (paymentStatus === "paid") {
            updateData.status = "packed"; // Move directly to packed after payment
            updateData.paidAt = new Date();
        } else if (["failed", "cancelled", "expired"].includes(paymentStatus)) {
            updateData.status = "cancelled";
            updateData.cancelledAt = new Date();
        }

        return Transaction.findOneAndUpdate(
            { transactionNumber },
            { $set: updateData },
            { new: true }
        );
    }

    /**
     * Update product status within a transaction
     */
    static async updateProductStatus(
        transactionNumber: string,
        productId: string,
        status: "pending" | "packed" | "shipped" | "completed" | "cancelled"
    ): Promise<ITransaction | null> {
        await dbConnect();

        const objectId = new mongoose.Types.ObjectId(productId);

        const transaction = await Transaction.findOneAndUpdate(
            { transactionNumber, "products.productId": objectId },
            {
                $set: {
                    "products.$.status": status,
                },
            },
            { new: true }
        );

        // Check if all products have same status to update overall transaction status
        if (transaction) {
            const allProductStatuses = transaction.products.map((p) => p.status);
            if (allProductStatuses.every((s) => s === "completed")) {
                transaction.status = "completed";
                transaction.completedAt = new Date();
                await transaction.save();
            } else if (allProductStatuses.every((s) => s === "shipped")) {
                transaction.status = "shipped";
                transaction.shippedAt = new Date();
                await transaction.save();
            } else if (allProductStatuses.every((s) => s === "packed")) {
                transaction.status = "packed";
                await transaction.save();
            }
        }

        return transaction;
    }

    /**
     * Get transaction by transaction number
     */
    static async getTransactionByNumber(transactionNumber: string): Promise<ITransaction | null> {
        await dbConnect();
        return Transaction.findOne({ transactionNumber });
    }

    /**
     * Get transaction by ID
     */
    static async getTransactionById(id: string): Promise<ITransaction | null> {
        await dbConnect();
        return Transaction.findById(new mongoose.Types.ObjectId(id));
    }
}
