import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Cart } from "@/lib/models/Cart";

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
        return NextResponse.json({ success: true, data: cart || { items: [] } });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
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

        const cart = await Cart.findOneAndUpdate(
            { sessionId },
            { sessionId, items },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, data: cart });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}