"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MarketplacePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                className="bg-transparent border-none outline-none text-sm text-emerald-dark w-48 ml-2 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>

            <button className="hidden sm:flex items-center gap-2 bg-emerald-main text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-main/20 hover:opacity-90 active:scale-95 transition-all text-sm">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>Saldo</span>
            </button>

            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden hidden sm:block">
              <img 
                src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
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
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold bg-emerald-main text-white shadow-sm shadow-emerald-main/20">Semua Produk</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark transition-all">Sayur Organik</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark transition-all">Buah Tropis</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark transition-all">Sertifikasi Rendah Karbon</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark transition-all">Gandum & Biji</button>
            </div>
          </section>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Product Card 1: Cabai Merah */}
            <Link href="/marketplace/cabai-merah" className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer h-full">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="/buahCabai.jpeg" 
                  alt="Cabai Merah" 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-red-600 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                  Pedas Ekstra
                </div>
              </div>
              <div className="px-3 pb-3 flex flex-col flex-1 h-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-dark leading-tight group-hover:text-emerald-main transition-colors">Cabai Merah Segar</h3>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      Garut, Jawa Barat
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="block text-lg font-extrabold text-emerald-main">Rp 45k</span>
                    <span className="text-[10px] text-slate-400">per kg</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-slate-200 bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs">
                      PM
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-700">Petani Makmur</p>
                      <div className="flex items-center text-[10px] text-amber-500 font-medium">
                        <span className="material-symbols-outlined text-[12px] mr-0.5" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        4.9 (120 ulasan)
                      </div>
                    </div>
                  </div>
                  <button onClick={(e)=>{e.preventDefault();}} className="bg-emerald-50 text-emerald-main p-2.5 rounded-xl hover:bg-emerald-main hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </Link>

            {/* Product Card 2: Jagung Manis */}
            <Link href="/marketplace/jagung-manis" className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer h-full mt-0">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="/buahJagung.jpg" 
                  alt="Jagung Manis" 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-yellow-600 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                  Organik
                </div>
              </div>
              <div className="px-3 pb-3 flex flex-col flex-1 h-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-dark leading-tight group-hover:text-emerald-main transition-colors">Jagung Manis Organik</h3>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      Purwodadi, Jawa Tengah
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="block text-lg font-extrabold text-emerald-main">Rp 15k</span>
                    <span className="text-[10px] text-slate-400">per kg</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-slate-200 bg-yellow-50 flex items-center justify-center text-yellow-600 font-bold text-xs">
                      ST
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-700">Sumber Tani</p>
                      <div className="flex items-center text-[10px] text-amber-500 font-medium">
                        <span className="material-symbols-outlined text-[12px] mr-0.5" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        4.8 (85 ulasan)
                      </div>
                    </div>
                  </div>
                  <button onClick={(e)=>{e.preventDefault();}} className="bg-emerald-50 text-emerald-main p-2.5 rounded-xl hover:bg-emerald-main hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </Link>

            {/* Product Card 3: Tomat Merah (Normal Mobile & Desktop) */}
            <Link href="/marketplace/tomat-merah" className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer h-full gap-4">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="/buahTomat.jpg" 
                  alt="Tomat Segar" 
                />
                <div className="absolute top-3 left-3 bg-red-100 text-red-800 text-[10px] border border-red-200 font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                  Pestisida Nol
                </div>
              </div>
              <div className="px-3 pb-3 flex flex-col flex-1 h-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-dark leading-tight group-hover:text-emerald-main transition-colors">Tomat Segar Pilihan</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      Lembang, Jawa Barat
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-extrabold text-emerald-main">Rp 20k</span>
                    <span className="text-[10px] text-slate-400">per kg</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-slate-200 bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                      GL
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Kebun Gayo Lestari</p>
                      <div className="flex items-center text-[10px] text-amber-500 font-medium mt-0.5">
                        <span className="material-symbols-outlined text-[12px] mr-1" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        5.0 (342 ulasan)
                      </div>
                    </div>
                  </div>
                  <button onClick={(e)=>{e.preventDefault();}} className="bg-emerald-50 text-emerald-main p-2.5 rounded-xl hover:bg-emerald-main hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </Link>

            {/* Product Card 4: Timun */}
            <Link href="/marketplace/timun" className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer h-full gap-4">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="/buahTimun.jpeg" 
                  alt="Timun Hibrida" 
                />
                <div className="absolute top-3 left-3 bg-emerald-100 text-emerald-800 text-[10px] border border-emerald-200 font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                  Hidroponik
                </div>
              </div>
              <div className="px-3 pb-3 flex flex-col flex-1 h-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-dark leading-tight group-hover:text-emerald-main transition-colors">Timun Hibrida Super</h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      Cianjur, Jawa Barat
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-extrabold text-emerald-main">Rp 12k</span>
                    <span className="text-[10px] text-slate-400">per kg</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-slate-200 bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                      SB
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Tani Subur</p>
                      <div className="flex items-center text-[10px] text-amber-500 font-medium mt-0.5">
                        <span className="material-symbols-outlined text-[12px] mr-1" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        4.7 (215 ulasan)
                      </div>
                    </div>
                  </div>
                  <button onClick={(e)=>{e.preventDefault();}} className="bg-emerald-50 text-emerald-main p-2.5 rounded-xl hover:bg-emerald-main hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* Right Column Checkout Sidebar */}
        <aside className="lg:w-1/3 xl:w-1/4 mt-8 lg:mt-0">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-28">
            <h2 className="text-xl font-bold font-plus text-emerald-dark mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-main">shopping_cart</span>
              Ringkasan Keranjang
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src="/buahCabai.jpeg" 
                    alt="Cabai thumb" 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Cabai Merah Segar</p>
                    <p className="text-xs text-emerald-main font-semibold">2 kg</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-700">Rp 90.000</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src="/buahTomat.jpg" 
                    alt="Tomat thumb" 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Tomat Segar Pilihan</p>
                    <p className="text-xs text-emerald-main font-semibold">1 kg</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-700">Rp 20.000</span>
              </div>
            </div>

            {/* Shipping Detail */}
            <div className="mb-6 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Opsi Pengiriman</h3>
              
              <div className="space-y-2 flex flex-col gap-2">
                <label className="flex items-center justify-between p-3 rounded-xl border-2 border-emerald-main bg-emerald-50/50 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="ship" defaultChecked className="accent-emerald-main w-4 h-4" />
                    <span className="text-sm font-semibold text-emerald-dark">SiCepat Regular</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-main">Rp 12k</span>
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white/50 cursor-pointer hover:border-emerald-main/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="ship" className="accent-emerald-main w-4 h-4" />
                    <span className="text-sm font-medium text-slate-600">Grab Instant</span>
                  </div>
                  <span className="text-sm font-bold text-slate-600">Rp 35k</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Metode Pembayaran</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-slate-200 bg-white hover:border-emerald-main/50 transition-colors">
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">qr_code_2</span>
                  <span className="text-[10px] font-bold text-slate-600">QRIS</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border-2 border-emerald-main bg-emerald-50 text-emerald-main">
                  <span className="material-symbols-outlined text-emerald-main text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
                  <span className="text-[10px] font-bold">Dompet</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border border-slate-200 bg-white hover:border-emerald-main/50 transition-colors">
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">account_balance</span>
                  <span className="text-[10px] font-bold text-slate-600">Bank</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal Produk</span>
                <span className="font-semibold text-slate-700">Rp 152.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Biaya Pengiriman</span>
                <span className="font-semibold text-slate-700">Rp 12.000</span>
              </div>
              <div className="flex justify-between text-lg mt-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-emerald-dark">Total</span>
                <span className="font-extrabold text-emerald-main">Rp 164.000</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-emerald-main to-[#10B981] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-main/20 hover:opacity-90 active:scale-95 transition-all text-sm flex justify-center items-center gap-2"
            >
              Bayar Sekarang
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

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
