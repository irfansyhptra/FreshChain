'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type TransactionProduct = {
    productId: string;
    name: string;
    imageUrl?: string;
    quantity: number;
    price: number;
    status: 'pending' | 'packed' | 'shipped' | 'completed' | 'cancelled';
};

type Transaction = {
    _id: string;
    transactionNumber: string;
    products: TransactionProduct[];
    subtotalAmount: number;
    shippingFee: number;
    platformFee: number;
    totalAmount: number;
    status: 'pending' | 'paid' | 'packed' | 'shipped' | 'completed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'cancelled' | 'expired';
    shippingAddress: {
        receiverName: string;
        phone: string;
        fullAddress: string;
    };
    estimatedArrival?: string;
    paidAt?: string;
    shippedAt?: string;
    completedAt?: string;
    cancelledAt?: string;
    createdAt: string;
    updatedAt: string;
};

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeStatus, setActiveStatus] = useState<string>('all');
    const [userEmail, setUserEmail] = useState<string>('');

    useEffect(() => {
        // Get user email from localStorage or session
        const profile = localStorage.getItem('freshchain_profile');
        if (profile) {
            try {
                const parsedProfile = JSON.parse(profile);
                setUserEmail(parsedProfile.email || '');
            } catch (e) {
                console.error('Failed to parse profile:', e);
            }
        }
    }, []);

    useEffect(() => {
        if (!userEmail) return;

        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const statusParam = activeStatus === 'all' ? '' : `&status=${activeStatus}`;
                const res = await fetch(`/api/transactions?email=${encodeURIComponent(userEmail)}${statusParam}`);
                const json = await res.json();

                if (json.success) {
                    setTransactions(json.data || []);
                } else {
                    console.error('Failed to fetch transactions:', json.message);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userEmail, activeStatus]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const statusConfig = {
        pending: { label: 'Menunggu Pembayaran', color: 'amber', icon: 'clock' },
        paid: { label: 'Pembayaran Diterima', color: 'sky', icon: 'check_circle' },
        packed: { label: 'Dikemas', color: 'blue', icon: 'inventory_2' },
        shipped: { label: 'Dikirim', color: 'indigo', icon: 'local_shipping' },
        completed: { label: 'Selesai', color: 'emerald', icon: 'check_circle' },
        cancelled: { label: 'Dibatalkan', color: 'rose', icon: 'cancel' },
    };

    const paymentStatusConfig = {
        pending: { label: 'Pending', color: 'amber' },
        paid: { label: 'Dibayar', color: 'emerald' },
        failed: { label: 'Gagal', color: 'rose' },
        cancelled: { label: 'Dibatalkan', color: 'rose' },
        expired: { label: 'Kadaluarsa', color: 'orange' },
    };

    const tabs = [
        { id: 'all', label: 'Semua Transaksi' },
        { id: 'pending', label: 'Menunggu Pembayaran' },
        { id: 'packed', label: 'Dikemas' },
        { id: 'shipped', label: 'Dikirim' },
        { id: 'completed', label: 'Selesai' },
        { id: 'cancelled', label: 'Dibatalkan' },
    ];

    return (
        <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased pb-24 lg:pb-0">
            {/* Background Decorators */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Top Navbar */}
            <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-extrabold text-emerald-dark tracking-tight font-plus">
                        FreshChain
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/marketplace" className="text-slate-500 hover:text-emerald-dark font-medium text-sm transition-colors">
                            Marketplace
                        </Link>
                        <Link href="/marketplace/orders" className="text-slate-500 hover:text-emerald-dark font-medium text-sm transition-colors">
                            Pesanan
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 relative z-10">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-emerald-dark tracking-tight font-plus mb-2">Riwayat Transaksi</h1>
                    <p className="text-slate-500 text-lg">Kelola dan pantau semua transaksi belanja Anda</p>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 mb-6 overflow-hidden">
                    <div className="flex overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveStatus(tab.id)}
                                className={`flex-1 min-w-[140px] px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                                    activeStatus === tab.id
                                        ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transactions List */}
                {loading ? (
                    <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-emerald-500 mb-4"></div>
                        <p className="text-slate-500 font-medium">Memuat transaksi Anda...</p>
                    </div>
                ) : transactions.length > 0 ? (
                    <div className="space-y-6">
                        {transactions.map((transaction) => {
                            const statusConfig_item = statusConfig[transaction.status as keyof typeof statusConfig];
                            const paymentStatusConfig_item = paymentStatusConfig[transaction.paymentStatus as keyof typeof paymentStatusConfig];

                            return (
                                <div key={transaction._id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow">
                                    {/* Header */}
                                    <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                            <div>
                                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">No. Transaksi</p>
                                                <p className="font-semibold text-emerald-700 text-sm mt-0.5">{transaction.transactionNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Tanggal</p>
                                                <p className="font-semibold text-slate-800 text-sm mt-0.5">{formatDate(transaction.createdAt)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize shadow-sm border bg-${statusConfig_item?.color}-50 text-${statusConfig_item?.color}-700 border-${statusConfig_item?.color}-200/50`}>
                                                <span className="material-symbols-outlined text-[14px]">{statusConfig_item?.icon}</span>
                                                {statusConfig_item?.label}
                                            </span>
                                            {transaction.paymentStatus !== 'paid' && (
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border bg-${paymentStatusConfig_item?.color}-50 text-${paymentStatusConfig_item?.color}-700 border-${paymentStatusConfig_item?.color}-200/50`}>
                                                    {paymentStatusConfig_item?.label}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <div className="p-6 border-b border-slate-100">
                                        <h3 className="font-bold text-slate-800 mb-4">Produk yang Dibeli ({transaction.products.length})</h3>
                                        <div className="space-y-3">
                                            {transaction.products.map((product, idx) => (
                                                <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                                                    {product.imageUrl && (
                                                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-slate-800 line-clamp-2">{product.name}</p>
                                                        <p className="text-sm text-slate-500 mt-1">
                                                            {product.quantity}x {formatPrice(product.price)}
                                                        </p>
                                                        <div className="mt-2">
                                                            <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold capitalize">
                                                                {product.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-slate-400">Subtotal</p>
                                                        <p className="font-bold text-slate-800">{formatPrice(product.price * product.quantity)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping & Total */}
                                    <div className="p-6 bg-slate-50/30 border-b border-slate-100">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">Pengiriman Ke</p>
                                                <p className="text-sm font-semibold text-slate-800">{transaction.shippingAddress.receiverName}</p>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{transaction.shippingAddress.fullAddress}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">Ongkos Kirim</p>
                                                <p className="text-sm font-bold text-emerald-600">{formatPrice(transaction.shippingFee)}</p>
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total</p>
                                                <p className="text-lg font-extrabold text-emerald-600">{formatPrice(transaction.totalAmount)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Action */}
                                    <div className="p-6 bg-white/50 flex gap-3">
                                        <button className="flex-1 md:flex-none px-6 py-2.5 border border-slate-200 shadow-sm text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all hover:-translate-y-0.5">
                                            Lihat Detail
                                        </button>
                                        {transaction.status === 'shipped' && (
                                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-main text-white shadow-sm text-sm font-semibold rounded-xl hover:bg-emerald-600 transition-all hover:-translate-y-0.5">
                                                Konfirmasi Diterima
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-16 text-center">
                        <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-[48px] text-emerald-main">receipt_long</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Tidak Ada Transaksi</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
                            Belum ada transaksi pada kategori ini. Mulai belanja untuk melihat riwayat transaksi Anda.
                        </p>
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center gap-2 py-3 px-6 shadow-md text-base font-semibold rounded-xl text-white bg-emerald-main hover:bg-emerald-600 hover:-translate-y-0.5 transition-all"
                        >
                            Mulai Belanja <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
