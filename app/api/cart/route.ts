import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Cart } from "@/lib/models/Cart";

type RawCartItem = {
    productId?: string;
    id?: string;
    name?: string;
    imageUrl?: string;
    quantity?: number;
    price?: number;
};

const getErrorMessage = (error: unknown) => (
    error instanceof Error ? error.message : "Terjadi kesalahan"
);

const normalizeItems = (items: RawCartItem[] = []) => items
    .map((item) => ({
        productId: item.productId || item.id,
        name: item.name,
        imageUrl: item.imageUrl || "",
        quantity: Number(item.quantity),
        price: Number(item.price),
    }))
    .filter((item) => item.productId && item.name && item.quantity > 0 && item.price >= 0);

// GET cart by sessionId
export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");

        if (!sessionId) {
            return NextResponse.json({ success: false, message: "Session ID required" }, { status: 400 });
        }

        const cart = await Cart.findOne({ sessionId });
        return NextResponse.json({
            success: true,
            data: cart || { sessionId, items: [], status: "active" }
        });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
    }
}

// POST update cart sync
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { sessionId, items } = body;

        if (!sessionId) {
            return NextResponse.json({ success: false, message: "Session ID required" }, { status: 400 });
        }

        const normalizedItems = normalizeItems(items);
        const cart = await Cart.findOneAndUpdate(
            { sessionId },
            {
                $set: {
                    sessionId,
                    items: normalizedItems,
                    status: "active",
                },
                $unset: {
                    checkoutOrderId: "",
                    checkedOutAt: "",
                },
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: cart });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
    }
}

// DELETE clear cart by sessionId
export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");

        if (!sessionId) {
            return NextResponse.json({ success: false, message: "Session ID required" }, { status: 400 });
        }

        const existingCart = await Cart.findOne({ sessionId });
        const cart = await Cart.findOneAndUpdate(
            { sessionId },
            {
                $set: {
                    sessionId,
                    items: [],
                    status: existingCart?.status === "checked_out" ? "checked_out" : "active",
                },
                $unset: {
                    checkoutOrderId: "",
                    checkedOutAt: "",
                },
            },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: cart });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
    }
}
