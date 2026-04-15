"use client";

import React, { useState } from "react";
import Link from "next/link";
import BatchQRCode from "@/components/traceability/BatchQRCode";
import BatchScanner from "@/components/traceability/BatchScanner";

export default function TraceabilityHub() {
  const [newBatchId, setNewBatchId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const generateRandomBatch = () => {
    setNewBatchId(`TRC-${Math.floor(1000 + Math.random() * 9000)}-BAT`);
  };

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased pb-24 lg:pb-0">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-4 lg:gap-8">
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
              <Link href="/traceability" className="text-emerald-main font-semibold text-sm border-b-2 border-emerald-main py-2">
                Traceability
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-white border border-slate-200/60 rounded-full px-4 py-2 shadow-sm shadow-slate-100 focus-within:ring-2 focus-within:ring-emerald-main/20 focus-within:border-emerald-main/40 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Lacak ID Produk..." 
                className="bg-transparent border-none outline-none text-sm text-emerald-dark w-48 ml-2 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-main rounded-full transition-colors relative">
              <span className="material-symbols-outlined">qr_code_scanner</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-6 lg:py-10 relative z-10 w-full">
        
        {/* Header Hero */}
        <section className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            100% Immutable on Blockchain
          </div>
          <h1 className="text-2xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl sm:text-2xl md:text-3xl md:text-3xl md:text-5xl font-extrabold tracking-tight text-emerald-dark font-plus mb-4 leading-tight">
            Transparansi <span className="text-emerald-main">Dari Kebun ke Meja</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Lacak perjalanan produk pertanian secara real-time. Setiap langkah dicatat secara permanen di blockchain FreshChain, memberikan Anda jaminan kualitas dan asal-usul yang tak terbantahkan.
          </p>
        </section>

        {/* Global Search Bar */}
        <section className="max-w-3xl mx-auto mb-14 relative z-20">
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-2 sm:p-3 rounded-2xl sm:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-auto flex-1 flex items-center bg-transparent px-4 py-3 sm:py-2">
              <span className="material-symbols-outlined text-emerald-main text-[24px] mr-3">search</span>
              <input 
                type="text" 
                placeholder="Masukkan ID Traceability (Cth: TRC-0821-BAT)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-emerald-dark text-base placeholder:text-slate-400 font-medium"
              />
            </div>
            <Link 
              href={searchQuery ? `/traceability/${searchQuery}` : "#"} 
              className="w-full sm:w-auto bg-emerald-main text-white font-bold py-3 sm:py-3.5 px-8 rounded-xl sm:rounded-full shadow-md shadow-emerald-main/30 hover:opacity-90 active:scale-95 transition-all text-center"
            >
              Lacak Sekarang
            </Link>
          </div>
        </section>

        {/* Action Grid (Generate & Scan) */}
        <div className="grid md:grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4 lg:gap-8 items-start">
          
          {/* Action 1: Create physical tag */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] transition-shadow">
            <div className="mb-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-main flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-50">
                <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-emerald-dark font-plus">
                  1. Generate Digital Twin QR
                </h2>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Buat label QR untuk ditempel pada aset fisik (kotak, peti, karung). Batch ini akan terintegrasi langsung dengan ledger blockchain kami.
                </p>
              </div>
            </div>
            
            {!newBatchId ? (
               <button 
                 onClick={generateRandomBatch}
                 className="w-full bg-emerald-50 border-2 border-dashed border-emerald-200 text-emerald-600 px-6 py-8 rounded-2xl font-bold hover:bg-emerald-100/50 hover:border-emerald-main transition-colors text-center flex flex-col items-center justify-center gap-3"
               >
                 <span className="material-symbols-outlined text-[32px] text-emerald-main">add_box</span>
                 Inisialisasi Batch Fisik Baru
               </button>
            ) : (
               <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <BatchQRCode batchId={newBatchId} productName="Premium Kopi Gayo Batch" />
                  <button 
                    onClick={() => setNewBatchId("")} 
                    className="w-full mt-4 bg-slate-50 text-slate-500 text-xs font-bold py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Reset & Buat Ulang
                  </button>
               </div>
            )}
          </div>

          {/* Action 2: Scan physical tag */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(59,130,246,0.1)] transition-shadow">
            <div className="mb-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-50">
                <span className="material-symbols-outlined text-[24px]">document_scanner</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 font-plus">
                  2. Scan QR & Update Log
                </h2>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Pindai QR fisik pada batch untuk mencatat lokasi dan status terbarunya secara otomatis ke jaringan blockchain.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <BatchScanner />
            </div>
          </div>
          
        </div>

        {/* Global Recent Activity (Optional Demo Section) */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold text-emerald-dark font-plus">Aktivitas Terbaru</h3>
            <Link href="#" className="text-sm font-bold text-emerald-main hover:underline">Lihat Semua Ledger</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Log Item 1 */}
            <div className="bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">TRC-8921-BAT</p>
                <p className="text-[10px] text-slate-500">Tiba di Pusat Distribusi Jakarta</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">2 mnt lalu</span>
            </div>

            {/* Log Item 2 */}
            <div className="bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">TRC-3342-BAT</p>
                <p className="text-[10px] text-slate-500">Dikemas (Premium Kopi Gayo)</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">12 mnt lalu</span>
            </div>

            {/* Log Item 3 */}
            <div className="bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">TRC-1092-BAT</p>
                <p className="text-[10px] text-slate-500">Sertifikasi Organik Lolos</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">1 jam lalu</span>
            </div>

          </div>
        </section>

      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 flex items-center justify-around py-3 pb-safe-area-inset-bottom z-50 shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
        <a href="/marketplace" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">storefront</span>
          <span className="text-[10px] font-semibold">Shop</span>
        </a>
        <a href="/crowdfunding" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">agriculture</span>
          <span className="text-[10px] font-semibold">Proyek</span>
        </a>
        <a href="/traceability" className="flex flex-col items-center gap-1 text-emerald-main relative -top-4">
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

    </div>
  );
}
