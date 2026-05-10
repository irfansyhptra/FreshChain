import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Midtrans Pay Account Notification:', body);
        
        // Handle pay account logic here if needed in the future (e.g. for card linking)

        return NextResponse.json({ status: 'OK' }, { status: 200 });
    } catch (error) {
        console.error('Midtrans Pay Account Callback Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
