"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

type OrderStatus = 'pending' | 'paid' | 'packed' | 'shipped' | 'completed';

type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type SnapCallbacks = {
  onSuccess?: (result?: unknown) => void;
  onPending?: (result?: unknown) => void;
  onError?: (result?: unknown) => void;
  onClose?: () => void;
};

type WindowWithSnap = Window & typeof globalThis & {
  snap?: {
    pay: (token: string, callbacks: SnapCallbacks) => void;
  };
};

interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  subtotalAmount?: number;
  shippingFee?: number;
  platformFee?: number;
  status: OrderStatus;
  products: OrderProduct[]; // DB field name
  createdAt: string;
  estimatedArrival?: string;
  shippingAddress: {
    receiverName: string;
    phone: string;
    fullAddress: string;
  };
}

const SHIPPING_FEE = 15000;
const DEFAULT_PROFILE: Profile = {
  name: "Ahmad Budi",
  email: "pengguna@freshchain.id",
  phone: "081234567890",
  address: "Jl. Merdeka No. 123, Kecamatan Sukamaju, Kota Jakarta Selatan, 12345"
};

const readStoredProfile = (): Profile => {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  const savedProfileStr = localStorage.getItem("freshchain_profile");
  if (!savedProfileStr) return DEFAULT_PROFILE;

  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(savedProfileStr) };
  } catch {
    return DEFAULT_PROFILE;
  }
};

const readInitialTab = (): OrderStatus => {
  if (typeof window === "undefined") return "pending";

  const requestedTab = new URLSearchParams(window.location.search).get('tab') as OrderStatus | null;
  return requestedTab && ['pending', 'packed', 'shipped', 'completed'].includes(requestedTab)
    ? requestedTab
    : "pending";
};

export default function OrdersPage() {
  const { cartItems, cartTotal, clearCart, updateQuantity, cartSessionId, cartStatus } = useCart();
  const [activeTab, setActiveTab] = useState<OrderStatus>(readInitialTab);
  // Per-tab order cache: status -> Order[]
  const [ordersByStatus, setOrdersByStatus] = useState<Record<string, Order[]>>({
    pending: [], paid: [], packed: [], shipped: [], completed: []
  });
  const [tabCounts, setTabCounts] = useState<Record<string, number>>({
    pending: 0, paid: 0, packed: 0, shipped: 0, completed: 0
  });
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [packedPolls, setPackedPolls] = useState(0);
  const [userProfile] = useState<Profile>(readStoredProfile);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const startDraftCheckout = async (draft: Order) => {
    if (!cartSessionId) return alert("Sesi keranjang belum siap. Coba beberapa detik lagi.");
    const snap = (window as WindowWithSnap).snap;
    if (!snap) return alert("Midtrans Snap belum siap. Coba beberapa detik lagi.");

    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/marketplace/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartSessionId,
          customerEmail: userProfile.email || DEFAULT_PROFILE.email,
          shippingAddress: draft.shippingAddress,
          items: draft.products.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        })
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Gagal membuat checkout");
      }

      localStorage.setItem('freshchain_pending_checkout', JSON.stringify({
        orderNumber: json.data.orderNumber,
        cartSessionId,
        shouldClearCart: true,
      }));

      snap.pay(json.data.token, {
        onSuccess: function () {
          clearCart();
          window.location.href = '/marketplace/orders?tab=packed';
        },
        onPending: function () { window.location.href = '/payment/unfinish'; },
        onError: function () { window.location.href = '/payment/error'; },
        onClose: function () { alert('Anda menutup popup pembayaran'); }
      });
    } catch(e: unknown) {
      alert(e instanceof Error ? e.message : "Gagal membuat transaksi");
      console.error(e);
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Fetch orders for active tab when profile is ready or tab changes
  useEffect(() => {
    if (!userProfile.email) return;

    const fetchTabOrders = async () => {
      setLoading(true);
      try {
        // pending tab keeps legacy "paid" orders visible while new successful payments move to "packed".
        const statusParam = activeTab === 'pending' ? 'pending,paid' : activeTab;
        const res = await fetch(
          `/api/orders?email=${encodeURIComponent(userProfile.email)}&status=${statusParam}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (json.success) {
          setOrdersByStatus(prev => ({ ...prev, [activeTab]: json.data }));
          setTabCounts(prev => ({ ...prev, [activeTab]: json.data.length }));
          const pendingCheckout = localStorage.getItem('freshchain_pending_checkout');
          if (activeTab === 'packed' && pendingCheckout) {
            const pending = JSON.parse(pendingCheckout);
            const foundPackedOrder = json.data.some((order: Order) => order.orderNumber === pending.orderNumber);

            if (foundPackedOrder) {
              localStorage.removeItem('freshchain_pending_checkout');
              setPackedPolls(0);
            } else if (packedPolls < 8) {
              setTimeout(() => setPackedPolls((count) => count + 1), 2000);
            }
          }
        }
      } catch (e) {
        console.error("Gagal mengambil pesanan:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTabOrders();
  }, [activeTab, userProfile.email, packedPolls]);


  const tabs = [
    { id: 'pending', label: 'Keranjang', icon: 'shopping_cart' },
    { id: 'packed', label: 'Dikemas', icon: 'inventory_2' },
    { id: 'shipped', label: 'Dikirim', icon: 'local_shipping' },
    { id: 'completed', label: 'Selesai', icon: 'check_circle' }
  ];

  let displayedOrders = ordersByStatus[activeTab] || [];
  
  if (activeTab === 'pending' && cartItems.length > 0) {
     const draftOrder: Order = {
        _id: "draft-cart",
        orderNumber: "Draft Pesanan Belum Dibayar",
        subtotalAmount: cartTotal,
        shippingFee: SHIPPING_FEE,
        platformFee: 0,
        totalAmount: cartTotal + SHIPPING_FEE,
        status: "pending",
        createdAt: new Date().toISOString(),
        shippingAddress: {
           receiverName: userProfile.name || "Ahmad Budi",
           phone: userProfile.phone || "081234567890",
           fullAddress: userProfile.address || "Jl. Merdeka No. 123"
        },
        products: cartItems.map((item) => ({
           productId: String(item.id),
           name: item.name,
           quantity: item.quantity,
           price: item.price,
           imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=60"
        }))
     };
     displayedOrders = [draftOrder, ...displayedOrders];
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubtotal = (order: Order) => (
    order.subtotalAmount ?? order.products.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const getShippingFee = (order: Order) => order.shippingFee ?? (order._id === 'draft-cart' ? SHIPPING_FEE : 0);
  const getOrderTotal = (order: Order) => order.totalAmount ?? (getSubtotal(order) + getShippingFee(order));

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased pb-24 lg:pb-0">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="text-2xl font-extrabold text-emerald-dark tracking-tight font-plus">
              FreshChain
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/marketplace" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">
                Marketplace
              </Link>
              <Link href="/crowdfunding" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">
                Projects
              </Link>
              <Link href="/traceability" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">
                Traceability
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
            <Link href="/investor/dashboard" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-main bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">show_chart</span>
                Kelola Investasi
            </Link>
            <Link href="/marketplace/orders" title="Keranjang & Pesanan" className="relative hidden sm:flex items-center p-2 text-emerald-main bg-emerald-50 rounded-full transition-all border border-emerald-main/20">
                <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
            </Link>
            <button className="hidden sm:flex items-center gap-2 bg-emerald-main text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-main/20 hover:opacity-90 active:scale-95 transition-all text-sm">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>Saldo</span>
            </button>
              <Link href="/profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden hidden sm:block hover:ring-2 hover:ring-emerald-main transition-all">
                <img src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" alt="Avatar" className="w-full h-full object-cover" />
              </Link>            </div>
          </div>
        </header>      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 relative z-10 w-full flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-dark tracking-tight font-plus">Kelola Pesanan</h1>
            <p className="text-slate-500 mt-1">Pantau keranjang, status pengiriman, dan riwayat belanja Anda</p>
          </div>
          <Link 
            href="/marketplace" 
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-white border border-emerald-200 shadow-sm px-5 py-2.5 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          >
            Lanjut Belanja <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrolbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as OrderStatus)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-4 px-6 text-sm font-semibold whitespace-nowrap transition-colors border-b-2
                  ${activeTab === tab.id
                    ? "border-emerald-500 text-emerald-700 bg-emerald-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                {tab.label}
                <span className={`ml-1.5 inline-flex items-center justify-center text-[11px] font-bold px-2 py-0.5 rounded-full
                  ${activeTab === tab.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {(tabCounts[tab.id] || 0) + (tab.id === 'pending' && cartItems.length > 0 ? 1 : 0)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-emerald-500 mb-4"></div>
            <p className="text-slate-500 font-medium">Memuat data keranjang dan pesanan Anda...</p>
          </div>
        ) : displayedOrders.length > 0 ? (
          <div className="space-y-6">
            {displayedOrders.map((order) => (
              <div key={order._id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow group">
                
                {/* Header Pesanan */}
                <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                        {order.status === 'pending' ? 'Tanggal Diambil' : 'Tanggal Belanja'}
                      </p>
                      <p className="font-semibold text-slate-800 text-sm mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">No. Invoice / Booking</p>
                      <p className="font-semibold text-emerald-700 text-sm mt-0.5">{order.orderNumber}</p>
                    </div>
                    {['shipped', 'completed'].includes(order.status) && order.estimatedArrival && (
                      <div className="md:border-l md:border-slate-200 md:pl-6">
                        <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                          {order.status === 'completed' ? 'Diterima Pada' : 'Estimasi Tiba'}
                        </p>
                        <p className="font-semibold text-slate-800 text-sm mt-0.5">{formatDate(order.estimatedArrival)}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize shadow-sm border
                      ${order.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200/50' : 
                        order.status === 'packed' ? 'bg-sky-50 text-sky-700 border-sky-200/50' : 
                        order.status === 'shipped' ? 'bg-indigo-50 text-indigo-700 border-indigo-200/50' : 
                        'bg-emerald-50 text-emerald-700 border-emerald-200/50'}`}>
                      <span className="material-symbols-outlined text-[14px]">{tabs.find(t => t.id === order.status)?.icon}</span>
                      {tabs.find(t => t.id === order.status)?.label || order.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row">
                  {/* Produk Items */}
                  <div className="flex-1 p-6 space-y-5">
                    {order.products?.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative h-24 w-24 rounded-xl overflow-hidden shadow-sm shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="text-base font-bold text-slate-800">{item.name}</h4>
                          {order._id === 'draft-cart' ? (
                            <div className="flex items-center gap-3 mt-1.5">
                              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-5 h-5 text-slate-500 hover:text-emerald-main flex items-center justify-center font-bold text-sm leading-none">-</button>
                                <span className="font-semibold text-sm w-4 text-center text-slate-700">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-5 h-5 text-slate-500 hover:text-emerald-main flex items-center justify-center font-bold text-sm leading-none">+</button>
                              </div>
                              <button onClick={() => updateQuantity(item.productId, 0)} className="text-xs text-rose-500 hover:text-rose-600 font-medium">Hapus</button>
                              <span className="mx-1 text-slate-300">•</span> 
                              <span className="text-sm text-slate-500 font-medium">{formatPrice(item.price)} / item</span>
                            </div>
                          ) : (
                            <p className="text-sm text-slate-500 mt-1 font-medium">{item.quantity} barang <span className="mx-1.5">•</span> {formatPrice(item.price)}</p>
                          )}
                        </div>
                        <div className="text-right flex flex-col justify-center pl-6 border-l border-slate-100 hidden sm:flex">
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Total</p>
                          <p className="font-bold text-slate-800">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info Pengiriman */}
                  <div className="lg:w-[300px] bg-slate-50/30 p-6 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center">
                    <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-1.5 text-sm uppercase tracking-wider text-[11px]">
                      <span className="material-symbols-outlined text-[16px] text-emerald-500">location_on</span>
                      Detail Pengiriman
                    </h5>
                    <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm text-sm text-slate-600 space-y-1.5">
                      <p className="font-bold text-slate-800">{order.shippingAddress.receiverName}</p>
                      <p className="text-slate-500">{order.shippingAddress.phone}</p>
                      <p className="mt-2 line-clamp-3 leading-relaxed pt-1.5 border-t border-slate-100">{order.shippingAddress.fullAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-slate-100 p-6 bg-white/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="bg-emerald-50/50 px-4 py-2 rounded-xl border border-emerald-100/50">
                      <p className="text-[11px] text-emerald-600 uppercase font-bold tracking-wider mb-0.5">Total Belanja</p>
                      <p className="text-xl font-extrabold text-emerald-dark">{formatPrice(getOrderTotal(order))}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    {order.status === 'pending' && (
                      <> 
                        {cartStatus === 'pending_checkout' && order._id === 'draft-cart' ? (
                          <button disabled className="flex-1 sm:flex-none px-6 py-2.5 shadow-sm text-sm font-semibold rounded-xl text-white bg-amber-400 cursor-not-allowed">
                            Menunggu Pembayaran
                          </button>
                        ) : (
                          <button 
                             onClick={async () => {
                               if (order._id === 'draft-cart') {
                                  startDraftCheckout(order);
                               }
                             }}
                             disabled={checkoutLoading}
                             className="flex-1 sm:flex-none px-6 py-2.5 shadow-sm text-sm font-semibold rounded-xl text-white bg-emerald-main hover:bg-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all hover:-translate-y-0.5 hover:shadow-md">
                            {checkoutLoading ? 'Memproses...' : 'Checkout Sekarang'}
                          </button>
                        )}
                      </>
                    )}
                    {order.status === 'shipped' && (
                      <button className="flex-1 sm:flex-none px-6 py-2.5 shadow-sm text-sm font-semibold rounded-xl text-white bg-emerald-main hover:bg-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all hover:-translate-y-0.5 hover:shadow-md">
                        Konfirmasi Diterima
                      </button>
                    )}
                    {(order.status === 'completed' || order.status === 'packed' || order.status === 'shipped') && (
                      <button className="flex-1 sm:flex-none px-6 py-2.5 border-2 border-emerald-200 shadow-sm text-sm font-semibold rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all hover:-translate-y-0.5">
                        Beli Lagi
                      </button>
                    )}
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 sm:flex-none px-6 py-2.5 border border-slate-200 shadow-sm text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all hover:-translate-y-0.5">
                      Lihat Rincian
                    </button>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-16 text-center">
            <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="material-symbols-outlined text-[48px] text-emerald-main">
                {tabs.find(t => t.id === activeTab)?.icon}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Keranjang Masih Kosong</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
              Anda tidak memiliki data pada kategori &quot;{tabs.find(t => t.id === activeTab)?.label}&quot;. Yuk, temukan produk segar langsung dari petani!
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 py-3 px-6 shadow-md text-base font-semibold rounded-xl text-white bg-emerald-main hover:bg-emerald-600 hover:-translate-y-0.5 transition-all w-fit mx-auto"
            >
              Mulai Belanja <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </Link>
          </div>
        )}
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-slate-800">Rincian Pesanan</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Info Utama */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-emerald-600 font-bold mb-0.5">#{selectedOrder.orderNumber}</p>
                    <p className="text-xs text-slate-500">{new Date(selectedOrder.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                    {tabs.find(t => t.id === selectedOrder.status)?.label || selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Produk */}
              <div>
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-main">inventory_2</span>
                  Produk yang Dibeli
                </h4>
                <div className="space-y-4">
                  {selectedOrder.products?.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-1">Petani: Mitra FreshChain</p>
                        <p className="text-sm font-medium text-emerald-700 mt-1">{item.quantity} x {formatPrice(item.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rincian Pembayaran */}
              <div>
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-main">receipt_long</span>
                  Rincian Pembayaran
                </h4>
                <div className="bg-slate-50 p-5 rounded-xl space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal Produk</span>
                    <span className="font-medium text-slate-800">{formatPrice(getSubtotal(selectedOrder))}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Ongkos Kirim</span>
                    <span className="font-medium text-slate-800">{formatPrice(getShippingFee(selectedOrder))}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-slate-800">Total Pembayaran</span>
                    <span className="text-lg font-extrabold text-emerald-main">{formatPrice(getOrderTotal(selectedOrder))}</span>
                  </div>
                </div>
              </div>

              {/* Info Pengiriman */}
              <div>
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-main">local_shipping</span>
                  Info Pengiriman
                </h4>
                <div className="border border-slate-100 rounded-xl p-4">
                  <p className="font-bold text-slate-800">{selectedOrder.shippingAddress.receiverName}</p>
                  <p className="text-sm text-slate-500 my-1">{selectedOrder.shippingAddress.phone}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedOrder.shippingAddress.fullAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  
