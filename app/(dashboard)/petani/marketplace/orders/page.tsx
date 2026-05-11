'use client';

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type OrderStatus = "pending" | "paid" | "packed" | "shipped" | "completed" | "cancelled";
type ProductStatus = "pending" | "packed" | "shipped" | "completed" | "cancelled";

type OrderProduct = {
  productId: string;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
  status: ProductStatus;
};

type TransactionOrder = {
  _id: string;
  transactionNumber: string;
  guestEmail?: string;
  products: OrderProduct[];
  subtotalAmount: number;
  shippingFee: number;
  platformFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "cancelled" | "expired";
  shippingAddress: {
    receiverName: string;
    phone: string;
    fullAddress: string;
  };
  paidAt?: string;
  shippedAt?: string;
  completedAt?: string;
  createdAt: string;
};

const STATUS_META: Record<OrderStatus, { label: string; badge: string; icon: string }> = {
  pending: { label: "Menunggu Pembayaran", badge: "bg-amber-50 text-amber-700 border-amber-200", icon: "schedule" },
  paid: { label: "Pesanan Diterima", badge: "bg-sky-50 text-sky-700 border-sky-200", icon: "inbox" },
  packed: { label: "Siap Dikemas", badge: "bg-blue-50 text-blue-700 border-blue-200", icon: "inventory_2" },
  shipped: { label: "Sudah Dikirim", badge: "bg-indigo-50 text-indigo-700 border-indigo-200", icon: "local_shipping" },
  completed: { label: "Selesai", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "check_circle" },
  cancelled: { label: "Dibatalkan", badge: "bg-rose-50 text-rose-700 border-rose-200", icon: "cancel" },
};

const PRODUCT_STATUS_META: Record<ProductStatus, { label: string; badge: string }> = {
  pending: { label: "Menunggu", badge: "bg-slate-100 text-slate-600" },
  packed: { label: "Dikemas", badge: "bg-blue-100 text-blue-700" },
  shipped: { label: "Dikirim", badge: "bg-indigo-100 text-indigo-700" },
  completed: { label: "Selesai", badge: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Dibatalkan", badge: "bg-rose-100 text-rose-700" },
};

const formatPrice = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);

const formatDate = (value: string) => new Date(value).toLocaleDateString("id-ID", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function PetaniMarketplaceOrdersPage() {
  const [orders, setOrders] = useState<TransactionOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const statusParam = filterStatus === "all" ? "" : `?status=${encodeURIComponent(filterStatus)}`;
      const res = await fetch(`/api/petani/marketplace/orders${statusParam}`);
      const json = await res.json();
      if (json.success) {
        setOrders(json.data || []);
      } else {
        showToast(json.message || "Gagal mengambil pesanan", "err");
      }
    } catch (error) {
      console.error(error);
      showToast("Terjadi kesalahan saat mengambil pesanan", "err");
    } finally {
      setLoading(false);
    }
  }, [filterStatus, showToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrder = async (transactionNumber: string, status: "packed" | "shipped") => {
    setSavingId(transactionNumber);
    try {
      const res = await fetch("/api/petani/marketplace/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionNumber, status }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Gagal memperbarui status");
      }
      showToast(status === "packed" ? "Pesanan ditandai siap dikemas" : "Pesanan ditandai sudah dikirim");
      await fetchOrders();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Terjadi kesalahan", "err");
    } finally {
      setSavingId(null);
    }
  };

  const visibleOrders = useMemo(() => orders, [orders]);

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-[300] px-5 py-3 rounded-2xl shadow-xl text-sm font-bold text-white ${toast.type === "ok" ? "bg-emerald-main" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-dark font-plus tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-main">receipt_long</span>
            Pesanan Diterima
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">Kelola pesanan pelanggan yang masuk, lalu validasi proses kemas dan pengiriman.</p>
        </div>
        <Link href="/petani/marketplace" className="inline-flex items-center gap-2 bg-white/70 border border-white/50 px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-dark hover:bg-white transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Kembali ke Marketplace
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { k: "all", l: "Semua" },
          { k: "paid", l: "Pesanan Diterima" },
          { k: "packed", l: "Siap Dikemas" },
          { k: "shipped", l: "Sudah Dikirim" },
        ].map((item) => (
          <button
            key={item.k}
            onClick={() => setFilterStatus(item.k)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterStatus === item.k ? "bg-emerald-main text-white shadow-sm" : "bg-white/60 text-slate-500 border border-white/50 hover:text-emerald-main"}`}
          >
            {item.l}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-emerald-500 mb-4" />
          <p className="text-slate-500 font-medium">Memuat pesanan pelanggan...</p>
        </div>
      ) : visibleOrders.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {visibleOrders.map((order) => {
            const meta = STATUS_META[order.status] || STATUS_META.paid;
            return (
              <div key={order._id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-slate-50/60 border-b border-slate-100 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">No. Pesanan</p>
                    <p className="font-semibold text-emerald-700 text-sm mt-0.5">{order.transactionNumber}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${meta.badge}`}>
                    <span className="material-symbols-outlined text-[14px]">{meta.icon}</span>
                    {meta.label}
                  </span>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-1">Pelanggan</p>
                      <p className="font-bold text-slate-800">{order.shippingAddress.receiverName}</p>
                      <p className="text-slate-500 mt-1">{order.guestEmail || "-"}</p>
                      <p className="text-slate-500">{order.shippingAddress.phone}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-1">Alamat Pengiriman</p>
                      <p className="text-slate-700 leading-relaxed line-clamp-4">{order.shippingAddress.fullAddress}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-3">Rincian Produk</p>
                    <div className="space-y-3">
                      {order.products.map((product) => {
                        const productMeta = PRODUCT_STATUS_META[product.status] || PRODUCT_STATUS_META.pending;
                        return (
                          <div key={product.productId} className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-slate-300">
                                <span className="material-symbols-outlined">image</span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-800 line-clamp-2">{product.name}</p>
                              <p className="text-sm text-slate-500 mt-1">{product.quantity} x {formatPrice(product.price)}</p>
                              <span className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-[11px] font-bold ${productMeta.badge}`}>{productMeta.label}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Subtotal</p>
                              <p className="font-bold text-slate-800">{formatPrice(product.price * product.quantity)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <p className="text-[11px] uppercase font-bold tracking-wider text-emerald-600">Subtotal</p>
                      <p className="font-extrabold text-emerald-dark mt-1">{formatPrice(order.subtotalAmount)}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <p className="text-[11px] uppercase font-bold tracking-wider text-emerald-600">Ongkir</p>
                      <p className="font-extrabold text-emerald-dark mt-1">{formatPrice(order.shippingFee)}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <p className="text-[11px] uppercase font-bold tracking-wider text-emerald-600">Total</p>
                      <p className="font-extrabold text-emerald-dark mt-1">{formatPrice(order.totalAmount)}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <p className="text-[11px] uppercase font-bold tracking-wider text-emerald-600">Tanggal</p>
                      <p className="font-extrabold text-emerald-dark mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => updateOrder(order.transactionNumber, "packed")}
                      disabled={savingId === order.transactionNumber || order.status !== "paid"}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                      {savingId === order.transactionNumber ? "Menyimpan..." : order.status === "paid" ? "Pesanan Siap Dikemas" : "Tunggu Status Diterima"}
                    </button>
                    <button
                      onClick={() => updateOrder(order.transactionNumber, "shipped")}
                      disabled={savingId === order.transactionNumber || order.status !== "packed"}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-main text-white text-sm font-bold shadow-sm hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                      {savingId === order.transactionNumber ? "Menyimpan..." : order.status === "packed" ? "Pesanan Sudah Dikirim" : "Tunggu Dikemas"}
                    </button>
                  </div>
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
          <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Pesanan</h3>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Pesanan pelanggan akan muncul di sini setelah pembayaran berhasil.</p>
          <Link href="/petani/marketplace" className="inline-flex items-center gap-2 py-3 px-6 shadow-md text-base font-semibold rounded-xl text-white bg-emerald-main hover:bg-emerald-600 hover:-translate-y-0.5 transition-all">
            Kembali ke Marketplace <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      )}
    </div>
  );
}