import { NextResponse } from 'next/server';
import { verifySignature } from '@/lib/services/midtrans.service';
import { applyMarketplacePaymentNotification } from '@/lib/services/marketplace-checkout.service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        const {
            order_id,
            status_code,
            gross_amount,
            signature_key,
            transaction_status,
            payment_type, // e.g. gopay, bank_transfer, etc.
            transaction_id,
            fraud_status,
            settlement_time // Note: settlement_time might not be available in all statuses
        } = body;

        // 1. Verify the signature to ensure request came from Midtrans
        const signatureMatch = verifySignature(
            String(order_id),
            String(status_code),
            String(gross_amount),
            String(signature_key)
        );
        
        if (!signatureMatch) {
            return NextResponse.json({ error: 'Invalid signature key' }, { status: 400 });
        }

        console.log(`Verifying Midtrans Callback for Order ID: ${order_id}`);
        
        const marketplaceResult = await applyMarketplacePaymentNotification({
            order_id,
            transaction_status,
            fraud_status,
            payment_type,
            transaction_id,
            settlement_time
        });

        if (marketplaceResult.handled) {
            console.log(`Marketplace order ${order_id} updated from Midtrans status ${transaction_status}`);
            return NextResponse.json({ status: 'OK' }, { status: 200 });
        }

        // 2. Process non-marketplace transactions based on transaction status
        if (transaction_status == 'capture') {
            if (fraud_status == 'challenge') {
                // Update order status to challenge
                // e.g. await Order.updateOne({ _id: order_id }, { status: "pending", paymentType: payment_type });
            } else if (fraud_status == 'accept') {
                // Update order status to success
                // e.g. await Order.updateOne({ _id: order_id }, { status: "paid", paymentType: payment_type });
            }
        } else if (transaction_status == 'settlement') {
            // Update order status to success
            console.log('Payment success');
            // TODO: Update database status here, e.g.
            /*
            await updateOrderOrInvestment(order_id, {
                status: 'paid',
                paymentType: payment_type,
                transactionId: transaction_id,
                settlementTime: settlement_time || new Date().toISOString()
            });
            */
        } else if (transaction_status == 'cancel' ||
                   transaction_status == 'deny' ||
                   transaction_status == 'expire') {
            // Update order status to failure
            // e.g. await Order.updateOne({ _id: order_id }, { status: "failed" });
        } else if (transaction_status == 'pending') {
            // Update order status to pending
            // e.g. await Order.updateOne({ _id: order_id }, { status: "pending" });
        }

        // Must respond with 200 OK so Midtrans stops sending notifications for this event
        return NextResponse.json({ status: 'OK' }, { status: 200 });
    } catch (error) {
        console.error('Midtrans Callback Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
