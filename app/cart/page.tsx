'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function CartPage() {
    const [isLoading, setIsLoading] = useState(false);

    // Mock cart items for demonstration
    const cartItems = [
        { id: 1, name: 'Beras Organik Menthik Wangi', price: 25000, quantity: 2 },
        { id: 2, name: 'Sayur Hidroponik Campur', price: 15000, quantity: 1 },
    ];

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            // 1. Request token to backend
            const response = await fetch('/api/midtrans/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    firstName: 'Guest',
                    email: 'guest@example.com',
                    // You can also send item details here if your backend supports it
                }),
            });

            const data = await response.json();

            if (data.token) {
                // 2. Open Snap popup
                window.snap.pay(data.token, {
                    onSuccess: function (result: any) {
                        /* You may add your own implementation here */
                        console.log('payment success!', result);
                        window.location.href = '/payment/finish';
                    },
                    onPending: function (result: any) {
                        /* You may add your own implementation here */
                        console.log('wating your payment!', result);
                        window.location.href = '/payment/unfinish';
                    },
                    onError: function (result: any) {
                        /* You may add your own implementation here */
                        console.log('payment failed!', result);
                        window.location.href = '/payment/error';
                    },
                    onClose: function () {
                        /* You may add your own implementation here */
                        console.log('you closed the popup without finishing the payment');
                        alert('Silakan selesaikan pembayaran Anda.');
                    }
                });
            } else {
                console.error("Token tidak ditemukan", data);
                alert("Gagal memproses transaksi.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("Terjadi kesalahan saat menghubungi server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>
                
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item.id} className="py-6 flex justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-gray-500">Jumlah: {item.quantity}</p>
                                    </div>
                                    <p className="text-lg font-medium text-gray-900">
                                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                        <div className="flex justify-between font-bold text-xl text-gray-900 mb-6">
                            <span>Total Pembayaran</span>
                            <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                        </div>
                        
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                                isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                        >
                            {isLoading ? 'Memproses...' : 'Bayar Sekarang'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
