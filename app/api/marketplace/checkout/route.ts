import { NextResponse } from "next/server";
import {
    CheckoutError,
    createMarketplaceCheckout,
} from "@/lib/services/marketplace-checkout.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const checkout = await createMarketplaceCheckout(body);

        return NextResponse.json({
            success: true,
            data: {
                orderNumber: checkout.order.orderNumber,
                token: checkout.token,
                redirect_url: checkout.redirect_url,
            },
        });
    } catch (error: unknown) {
        const status = error instanceof CheckoutError ? error.statusCode : 500;
        const message = error instanceof Error ? error.message : "Gagal membuat checkout marketplace";
        console.error("POST /api/marketplace/checkout error:", error);

        return NextResponse.json(
            {
                success: false,
                message,
            },
            { status }
        );
    }
}
