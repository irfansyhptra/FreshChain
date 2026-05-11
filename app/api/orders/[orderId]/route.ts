import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Order } from "@/lib/models/Order";

// PATCH update order status
export async function PATCH(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
    try {
        await dbConnect();
        const { orderId } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json({ success: false, message: "Status is required" }, { status: 400 });
        }

        const validStatuses = ["pending", "paid", "packed", "shipped", "completed", "cancelled"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
           return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}