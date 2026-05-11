import midtransClient from 'midtrans-client';
import crypto from 'crypto';

type MidtransTransactionParams = {
    transaction_details: {
        order_id: string;
        gross_amount: number;
    };
    customer_details: {
        first_name: string;
        email: string;
        phone?: string;
    };
    callbacks: {
        finish: string;
    };
};

type MidtransTransactionResponse = {
    token: string;
    redirect_url: string;
};

type MidtransSnap = {
    createTransaction: (params: MidtransTransactionParams) => Promise<MidtransTransactionResponse>;
};

type MidtransClientModule = {
    Snap: new (config: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
    }) => MidtransSnap;
};

const midtrans = midtransClient as MidtransClientModule;

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
        },
        callbacks: {
            finish: `${process.env.NEXT_PUBLIC_APP_URL || 'https://freshchain.vercel.app'}/payment/finish`
        }
    };

    return snap.createTransaction(parameter);
};

export const createMarketplaceTransaction = async (params: {
    orderId: string;
    grossAmount: number;
    firstName: string;
    email: string;
    phone?: string;
}) => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://freshchain.vercel.app";
    const parameter = {
        transaction_details: {
            order_id: params.orderId,
            gross_amount: params.grossAmount
        },
        customer_details: {
            first_name: params.firstName,
            email: params.email,
            phone: params.phone
        },
        callbacks: {
            finish: `${appUrl}/payment/finish?order_id=${encodeURIComponent(params.orderId)}`
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
