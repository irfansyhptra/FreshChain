import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Order } from "@/lib/models/Order";

// GET user/guest orders — supports optional ?status= filter
export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");
        const status = searchParams.get("status"); // e.g. packed | shipped | completed | pending | paid

        if (!email) {
            return NextResponse.json({ success: false, message: "Email required to fetch orders" }, { status: 400 });
        }

        const query: Record<string, any> = { guestEmail: email };
        if (status) {
            // Support comma-separated multi-status: ?status=packed,shipped
            const statuses = status.split(",").map(s => s.trim());
            query.status = statuses.length === 1 ? statuses[0] : { $in: statuses };
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: orders });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// POST create order
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        
        // orderNumber Generation (Simple Mock)
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        const newOrder = new Order({
            ...body,
            orderNumber,
            status: "pending",
            // Set default estimated arrival 3 days from now
            estimatedArrival: new Date(Date.now() + 3 * 86400000)
        });

        await newOrder.save();
        return NextResponse.json({ success: true, data: newOrder });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}