import { NextResponse } from 'next/server';
import { createTransaction } from '@/lib/services/midtrans.service';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        const { amount, firstName, email } = body;
        
        if (!amount || !firstName || !email) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }
        
        // Generate UUID for order_id as per best practices
        const orderId = `ORDER-${uuidv4()}`;
        
        // You should also save this order to the database first with status pending
        // e.g. await Order.create({ _id: orderId, amount, status: 'pending', ... })
        
        const transaction = await createTransaction({
            orderId,
            grossAmount: amount,
            firstName,
            email,
        });
        
        return NextResponse.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            order_id: orderId
        });
    } catch (error: any) {
        console.error('Midtrans Transaction Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
