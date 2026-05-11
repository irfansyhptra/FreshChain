import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";
import { TransactionService } from "@/lib/services/transaction.service";

const getErrorMessage = (error: unknown) => (
  error instanceof Error ? error.message : "Terjadi kesalahan"
);

async function getActiveFarmerId() {
  const user = await User.findOne({ role: "Petani" }).sort({ createdAt: -1 }).lean();
  return user?._id?.toString();
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;

    const farmerId = await getActiveFarmerId();
    if (!farmerId) {
      return NextResponse.json({ success: true, data: [], stats: { total: 0, pending: 0, packed: 0, shipped: 0 } });
    }

    const transactions = await TransactionService.getFarmerTransactions(farmerId, status);

    const stats = {
      total: transactions.length,
      pending: transactions.filter((txn) => txn.status === "paid").length,
      packed: transactions.filter((txn) => txn.status === "packed").length,
      shipped: transactions.filter((txn) => txn.status === "shipped").length,
    };

    return NextResponse.json({ success: true, data: transactions, stats });
  } catch (error: unknown) {
    console.error("GET /api/petani/marketplace/orders error:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const transactionNumber = String(body.transactionNumber || "").trim();
    const status = body.status as "packed" | "shipped" | undefined;

    if (!transactionNumber || !status) {
      return NextResponse.json({ success: false, message: "transactionNumber dan status wajib diisi" }, { status: 400 });
    }

    if (!["packed", "shipped"].includes(status)) {
      return NextResponse.json({ success: false, message: "Status tidak valid" }, { status: 400 });
    }

    const updated = await TransactionService.advanceTransactionStatus(transactionNumber, status);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Transaksi tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PATCH /api/petani/marketplace/orders error:", error);
    return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
  }
}