import midtransClient from 'midtrans-client';
import crypto from 'crypto';

// Use type assertion to avoid TypeScript errors since we don't have types for midtrans-client
const midtrans = midtransClient as any;

export const snap = new midtrans.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || ''
});

export const createTransaction = async (params: {
    orderId: string;
    grossAmount: number;
    firstName: string;
    email: string;
}) => {
    const parameter = {
        transaction_details: {
            order_id: params.orderId,
            gross_amount: params.grossAmount
        },
        customer_details: {
            first_name: params.firstName,
            email: params.email
        }
    };

    return snap.createTransaction(parameter);
};

export const verifySignature = (
    orderId: string, 
    statusCode: string, 
    grossAmount: string, 
    receivedSignature: string
) => {
    const hash = crypto
        .createHash('sha512')
        .update(`${orderId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`)
        .digest('hex');
    
    return hash === receivedSignature;
};
