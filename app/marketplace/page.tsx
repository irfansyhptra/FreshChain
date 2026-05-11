"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  category: string;
  imageUrl?: string;
  badge?: string;
  farmerName: string;
  farmerLocation: string;
  status: string;
};

const CATEGORIES = ["Semua Produk", "Sayur Organik", "Buah Tropis", "Gandum & Biji", "Rempah & Bumbu", "Lainnya"];
const fmt = (n: number) => new Intl.NumberFormat("id-ID").format(n);

export default function MarketplacePage() {
  const { addToCart, cartItems, cartTotal, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua Produk");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    // Load default address from profile on mount
    const savedProfile = localStorage.getItem("freshchain_profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (parsed.address) setShippingAddress(parsed.address);
    } else {
      // Set to default placeholder profile if nothing exists
      setShippingAddress("Jl. Merdeka No. 123, Kecamatan Sukamaju, Kota Jakarta Selatan, 12345");
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "Semua Produk") params.set("category", activeCategory);
      if (searchQuery) params.set("search", searchQuery);
      const res = await fetch(`/api/marketplace?${params.toString()}`);
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } finally {
      setLoadingProducts(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased pb-24 lg:pb-0">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand & Nav */}
          <div className="flex items-center gap-4 lg:gap-4 lg:gap-8">
            <Link href="/" className="text-2xl font-extrabold text-emerald-dark tracking-tight font-plus">
              FreshChain
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/marketplace" className="text-emerald-main font-semibold text-sm border-b-2 border-emerald-main py-2">
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

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-white border border-slate-200/60 rounded-full px-4 py-2 shadow-sm shadow-slate-100 focus-within:ring-2 focus-within:ring-emerald-main/20 focus-within:border-emerald-main/40 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Cari sayur & buah organik..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-emerald-dark w-48 ml-2 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>

            <Link href="/investor/dashboard" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-main bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">show_chart</span>
                Kelola Investasi
            </Link>

            <Link href="/marketplace/orders" title="Keranjang & Pesanan" className="relative hidden sm:flex items-center p-2 text-slate-500 hover:text-emerald-main hover:bg-emerald-50 rounded-full transition-all">
                <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
                {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                        {cartItems.length}
                    </span>
                )}
            </Link>

            <button className="hidden sm:flex items-center gap-2 bg-emerald-main text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-main/20 hover:bg-emerald-600 hover:shadow-emerald-main/40 active:scale-95 transition-all text-sm">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>Saldo</span>
            </button>

            <Link href="/profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden hidden sm:block hover:ring-2 hover:ring-emerald-main transition-all">
              <img 
                src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-6 lg:py-10 relative z-10 w-full flex flex-col lg:flex-row gap-4 lg:gap-4 lg:gap-8">
        
        {/* Main Content Column */}
        <div className="flex-1 lg:w-2/3 xl:w-3/4">
          
          {/* Header & Quick Filters */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-dark font-plus mb-2">The Fresh Market</h1>
                <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
                  Akses langsung ke hasil panen organik dari petani lokal. Transparan, segar, dan tertelusur melalui sistem traceability berbasis database.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-dark hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Semua Filter
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-emerald-main text-white shadow-sm shadow-emerald-main/20"
                      : "bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Product Grid - Dynamic */}
          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-72 bg-white/70 rounded-3xl border border-white/50 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl">
              <span className="material-symbols-outlined text-5xl text-slate-200 block mb-3">search_off</span>
              <h3 className="font-bold text-slate-600 text-lg mb-1">Belum ada produk</h3>
              <p className="text-slate-400 text-sm">Produk dari petani lokal akan segera tersedia di sini.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p._id} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer h-full">
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={p.name} fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={products.indexOf(p) === 0} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-slate-200">image</span>
                    </div>
                  )}
                  {p.badge && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">{p.badge}</div>
                  )}
                  {p.stock === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                      <span className="text-white font-extrabold text-sm bg-black/50 px-3 py-1 rounded-full">Stok Habis</span>
                    </div>
                  )}
                </div>
                <div className="px-3 pb-3 flex flex-col flex-1 h-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-emerald-dark leading-tight group-hover:text-emerald-main transition-colors">{p.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        {p.farmerLocation}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <span className="block text-lg font-extrabold text-emerald-main">Rp {fmt(p.price)}</span>
                      <span className="text-[10px] text-slate-400">per {p.unit}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-slate-200 bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        {p.farmerName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0,2)}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-700">{p.farmerName}</p>
                        <p className="text-[10px] text-slate-400">{p.category}</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        setSelectedProduct(p);
                        setOrderQuantity(1);
                        setIsOrderModalOpen(true);
                      }} 
                      className="bg-emerald-50 text-emerald-main p-2.5 rounded-xl hover:bg-emerald-main hover:text-white transition-colors" 
                      disabled={p.stock === 0}
                    >
                      <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>



        {/* Right Column Checkout Sidebar */}
        <aside className="lg:w-1/3 xl:w-1/4 mt-8 lg:mt-0">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-28">
            <h2 className="text-xl font-bold font-plus text-emerald-dark mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-main">shopping_cart</span>
              Ringkasan Keranjang
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-10">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">shopping_bag</span>
                <p className="text-sm text-slate-500">Keranjang masih kosong</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-100 overflow-hidden relative">
                           {/* Using any for index signature since CartItem lacks imageUrl natively without extension */}
                          {(item as any).imageUrl ? (
                            <Image src={(item as any).imageUrl} alt={item.name} fill sizes="48px" className="object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-slate-400">image</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => removeFromCart(item.id)} className="text-xs text-rose-500 hover:text-rose-600">Hapus</button>
                            <span className="text-xs text-emerald-main font-semibold">{item.quantity}x</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-700">Rp {fmt(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal Produk</span>
                    <span className="font-semibold text-slate-700">Rp {fmt(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Biaya Platform</span>
                    <span className="font-semibold text-slate-700">Rp 1.000</span>
              </div>
              <div className="flex justify-between text-lg mt-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-dark">Total</span>
                <span className="font-extrabold text-emerald-main">Rp {fmt(cartTotal + 1000)}</span>
              </div>
            </div>

            <button 
              onClick={async () => {
                try {
                  const response = await fetch('/api/midtrans/transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      amount: cartTotal + 1000,
                      firstName: 'Pelanggan',
                      email: 'pelanggan@freshchain.id'
                    })
                  });
                  const data = await response.json();
                  if(data.token) {
                    (window as any).snap.pay(data.token, {
                      onSuccess: function (result: any) { window.location.href = '/payment/finish'; },
                      onPending: function (result: any) { window.location.href = '/payment/unfinish'; },
                      onError: function (result: any) { window.location.href = '/payment/error'; },
                      onClose: function () { alert('Anda menutup popup sebelum menyelesaikan pembayaran'); }
                    });
                  }
                } catch(e) {
                  alert('Gagal membuat transaksi');
                }
              }}
              className="w-full bg-gradient-to-r from-emerald-main to-[#10B981] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-main/20 hover:opacity-90 active:scale-95 transition-all text-sm flex justify-center items-center gap-2"
            >
              Bayar Sekarang
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            </>
            )}

            <div className="mt-6 flex items-start gap-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
              <span className="material-symbols-outlined text-emerald-main text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
              <div>
                <p className="text-xs font-bold text-emerald-dark leading-tight">100% Terverifikasi</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Produk dapat dilacak hingga ke sumber kebunnya.</p>
              </div>
            </div>

          </div>
        </aside>

      </main>

      {/* Order / Checkout Modal */}
      {isOrderModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative animate-in zoom-in duration-200">
            <button onClick={() => setIsOrderModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            
            <h2 className="text-xl font-extrabold text-emerald-dark mb-4 font-plus">Rincian Pemesanan</h2>
            
            <div className="flex gap-4 mb-5 border-b border-slate-100 pb-5">
              <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 relative border border-slate-200">
                 {selectedProduct.imageUrl ? (
                    <Image src={selectedProduct.imageUrl} alt={selectedProduct.name} fill sizes="80px" className="object-cover" />
                 ) : (
                    <span className="material-symbols-outlined text-slate-400 flex items-center justify-center w-full h-full">image</span>
                 )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{selectedProduct.name}</h3>
                <p className="text-emerald-main font-bold mt-1">Rp {fmt(selectedProduct.price)} <span className="text-xs text-slate-400 font-normal">/ {selectedProduct.unit}</span></p>
                <div className="flex items-center gap-3 mt-3 w-fit bg-slate-50 border border-slate-200 rounded-lg py-1 px-2">
                  <button onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))} className="w-6 h-6 text-slate-600 flex items-center justify-center font-bold hover:text-emerald-main">-</button>
                  <span className="font-bold text-sm w-4 text-center text-slate-800">{orderQuantity}</span>
                  <button onClick={() => setOrderQuantity(Math.min(selectedProduct.stock, orderQuantity + 1))} className="w-6 h-6 text-slate-600 flex items-center justify-center font-bold hover:text-emerald-main">+</button>
                </div>
              </div>
            </div>
            
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-emerald-500">location_on</span>Alamat Pengiriman</label>
                <textarea 
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Masukkan alamat lengkap pengiriman... (Misal: Jl. Mawar No. 10, RT 01/RW 02)"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[80px] bg-slate-50/50 resize-none"
                />
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal ({orderQuantity} barang)</span>
                  <span className="font-semibold text-slate-700">Rp {fmt(selectedProduct.price * orderQuantity)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Ongkos Kirim (Flat)</span>
                  <span className="font-semibold text-slate-700">Rp 15.000</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-200 mt-2 font-bold text-lg text-emerald-dark">
                  <span>Total Tagihan</span>
                  <span>Rp {fmt((selectedProduct.price * orderQuantity) + 15000)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  for(let i=0; i<orderQuantity; i++) {
                     addToCart({id: selectedProduct._id, name: selectedProduct.name, price: selectedProduct.price, imageUrl: selectedProduct.imageUrl} as any);
                  }
                  setIsOrderModalOpen(false);
                  window.location.href = '/marketplace/orders';
                }}
                className="flex-1 py-3 px-4 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                Masuk Keranjang
              </button>
              <button 
                onClick={async () => {
                   if (!shippingAddress) return alert("Mohon isi alamat pengiriman dengan lengkap");
                   try {
                      const total = (selectedProduct.price * orderQuantity) + 15000;
                      const response = await fetch('/api/midtrans/transaction', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          amount: total,
                          firstName: 'Pelanggan',
                          email: 'pelanggan@freshchain.id'
                        })
                      });
                      const data = await response.json();
                      if(data.token) {
                        (window as any).snap.pay(data.token, {
                          onSuccess: function (result: any) { window.location.href = '/payment/finish'; },
                          onPending: function (result: any) { window.location.href = '/payment/unfinish'; },
                          onError: function (result: any) { window.location.href = '/payment/error'; },
                          onClose: function () { alert('Anda menutup popup sebelum menyelesaikan pembayaran'); }
                        });
                        setIsOrderModalOpen(false);
                      }
                   } catch (e) {
                      console.error(e);
                   }
                }}
                className="flex-1 py-3 px-4 bg-emerald-main text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav for Mobile */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 flex items-center justify-around py-3 pb-safe-area-inset-bottom z-50 shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
        <a href="/marketplace" className="flex flex-col items-center gap-1 text-emerald-main">
          <span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>storefront</span>
          <span className="text-[10px] font-bold">Shop</span>
        </a>
        <a href="/crowdfunding" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">agriculture</span>
          <span className="text-[10px] font-semibold">Proyek</span>
        </a>
        <a href="/traceability" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors relative -top-4">
          <div className="bg-gradient-to-r from-emerald-main to-[#10B981] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-main/30 active:scale-95 transition-transform border-4 border-frosted-white">
            <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
          </div>
        </a>
        <a href="/petani/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-semibold">Panel</span>
        </a>
        <a href="/petani/wallet" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
          <span className="text-[10px] font-semibold">Wallet</span>
        </a>
      </nav>

      {/* Success Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 max-w-sm w-full relative shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-main mb-6">
              <span className="material-symbols-outlined text-[40px]">check_circle</span>
            </div>
            
            <h2 className="text-2xl font-bold font-plus text-emerald-dark mb-2">Pesanan Berhasil!</h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Dukungan Anda terhadap pertanian regeneratif telah tercatat otomatis di sistem ledger. Petani kami sedang mengatur panen terbaik untuk dikirim.
            </p>
            
            <div className="w-full space-y-3">
              <Link href="/traceability/TRC-892301" className="w-full block bg-emerald-main text-white font-bold py-3 rounded-xl shadow-md hover:bg-emerald-600 transition-colors">
                Lacak Pengiriman
              </Link>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Kembali Belanja
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
