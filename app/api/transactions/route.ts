import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { TransactionService } from "@/lib/services/transaction.service";

type QueryParams = {
    userId?: string;
    email?: string;
    status?: string;
};

const getErrorMessage = (error: unknown) => (
    error instanceof Error ? error.message : "Terjadi kesalahan"
);

/**
 * GET /api/transactions
 * Query params:
 * - userId: get transactions for a specific user
 * - email: get transactions for a guest email
 * - status: filter by transaction status (comma-separated for multiple)
 */
export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);

        const userId = searchParams.get("userId");
        const email = searchParams.get("email");
        const status = searchParams.get("status");

        if (!userId && !email) {
            return NextResponse.json(
                { success: false, message: "userId or email query parameter is required" },
                { status: 400 }
            );
        }

        let transactions;
        if (userId) {
            transactions = await TransactionService.getUserTransactions(userId, status || undefined);
        } else if (email) {
            transactions = await TransactionService.getGuestTransactions(email, status || undefined);
        } else {
            throw new Error("userId or email required");
        }

        return NextResponse.json({ success: true, data: transactions });
    } catch (error: unknown) {
        console.error("GET /api/transactions error:", error);
        return NextResponse.json(
            { success: false, message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

/**
 * GET /api/transactions/:transactionNumber
 * Get a specific transaction by transaction number
 */
export async function GET_TRANSACTION_DETAIL(request: Request, context: any) {
    try {
        await dbConnect();
        const transactionNumber = context.params?.transactionNumber;

        if (!transactionNumber) {
            return NextResponse.json(
                { success: false, message: "Transaction number is required" },
                { status: 400 }
            );
        }

        const transaction = await TransactionService.getTransactionByNumber(transactionNumber);
        if (!transaction) {
            return NextResponse.json(
                { success: false, message: "Transaction not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: transaction });
    } catch (error: unknown) {
        console.error("GET /api/transactions/:transactionNumber error:", error);
        return NextResponse.json(
            { success: false, message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}
