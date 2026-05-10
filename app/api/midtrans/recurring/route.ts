import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Midtrans Recurring Notification:', body);
        
        // Handle recurring payment logic here if needed in the future

        return NextResponse.json({ status: 'OK' }, { status: 200 });
    } catch (error) {
        console.error('Midtrans Recurring Callback Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
