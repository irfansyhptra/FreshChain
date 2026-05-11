import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/client";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";

type OrderProductPayload = {
    productId?: string;
    quantity?: number;
    price?: number;
};

type OrderPayload = {
    guestEmail?: string;
    customerEmail?: string;
    subtotalAmount?: number;
    shippingFee?: number;
    platformFee?: number;
    totalAmount?: number;
    products?: OrderProductPayload[];
    status?: string;
    paymentStatus?: string;
};

const getErrorMessage = (error: unknown) => (
    error instanceof Error ? error.message : "Terjadi kesalahan"
);

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

        const query: Record<string, unknown> = { guestEmail: email };
        if (status) {
            // Support comma-separated multi-status: ?status=packed,shipped
            const statuses = status.split(",").map(s => s.trim());
            query.status = statuses.length === 1 ? statuses[0] : { $in: statuses };
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: orders });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
    }
}

// POST create order
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json() as OrderPayload;
        
        // orderNumber Generation (Simple Mock)
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const subtotalAmount = body.subtotalAmount ?? (Array.isArray(body.products)
            ? body.products.reduce((total: number, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0)
            : Number(body.totalAmount || 0));
        const shippingFee = Number(body.shippingFee || 0);
        const platformFee = Number(body.platformFee || 0);
        
        const newOrder = new Order({
            ...body,
            guestEmail: body.guestEmail || body.customerEmail,
            orderNumber,
            subtotalAmount,
            shippingFee,
            platformFee,
            totalAmount: body.totalAmount ?? subtotalAmount + shippingFee + platformFee,
            status: body.status || "pending",
            paymentStatus: body.paymentStatus || "pending",
            // Set default estimated arrival 3 days from now
            estimatedArrival: new Date(Date.now() + 3 * 86400000)
        });

        await newOrder.save();

        // Update product stock
        if (body.products && Array.isArray(body.products)) {
            for (const item of body.products) {
                if (item.productId && item.quantity) {
                    await Product.findByIdAndUpdate(item.productId, {
                        $inc: { stock: -item.quantity }
                    });
                    
                    // Optional: Update status if stock reaches 0
                    // This can be done by fetching the product or using a separate trigger, 
                    // but for simplicity, we'll let it be decremented and checked during fetch.
                    const updatedProduct = await Product.findById(item.productId);
                    if (updatedProduct && updatedProduct.stock <= 0) {
                        updatedProduct.status = "Habis";
                        await updatedProduct.save();
                    }
                }
            }
        }

        return NextResponse.json({ success: true, data: newOrder });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, message: getErrorMessage(error) }, { status: 500 });
    }
}
