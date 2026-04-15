"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function InvestorWalletPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Semua"); // Semua, Pemasukan, Pengeluaran

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blockchain-blue/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Layout containing Sidebar + Content */}
      <div className="flex h-screen overflow-hidden relative z-10">
        
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white/70 backdrop-blur-xl border-r border-white/50 flex-col p-4 shadow-[4px_0_24px_rgb(0,0,0,0.02)] z-50">
          <div className="flex items-center gap-3 px-4 py-6 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0284C7] to-blockchain-blue flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 font-plus tracking-tight">FreshChain</h1>
              <p className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-0.5">Investor</p>
            </div>
          </div>
          
          <nav className="flex-1 space-y-2">
            <Link href="/investor/dashboard" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-white hover:text-slate-800 rounded-2xl font-semibold transition-all">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link href="/investor/portfolio" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-white hover:text-slate-800 rounded-2xl font-semibold transition-all">
              <span className="material-symbols-outlined text-[20px]">pie_chart</span>
              <span className="text-sm">Portfolio</span>
            </Link>
            <Link href="/crowdfunding" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-white hover:text-slate-800 rounded-2xl font-semibold transition-all">
              <span className="material-symbols-outlined text-[20px]">agriculture</span>
              <span className="text-sm">Browse Projects</span>
            </Link>
            <Link href="/marketplace" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-white hover:text-slate-800 rounded-2xl font-semibold transition-all">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span className="text-sm">Marketplace</span>
            </Link>
            <Link href="/investor/wallet" className="flex items-center gap-3 px-4 py-3.5 bg-blue-50/80 border border-blue-100 text-blue-600 rounded-2xl font-bold shadow-sm transition-all">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
              <span className="text-sm">Wallet</span>
            </Link>
          </nav>

          <div className="pt-4 mt-auto">
            <button className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl transition-all border border-slate-100 font-bold text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span>Keluar</span>
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 lg:w-[calc(100%-16rem)] max-w-full flex flex-col h-screen overflow-y-auto scrollbar-hide">
          
          {/* Top Header */}
          <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-white/50 px-6 sm:px-4 sm:px-6 lg:px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-600">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="text-lg font-bold text-slate-800 font-plus">Dompet</h1>
            </div>
            
            <div className="hidden lg:block">
              <h2 className="text-2xl font-extrabold text-slate-800 font-plus">Dompet & Saldo</h2>
              <p className="text-xs font-semibold text-slate-400 mt-1">Kelola dana, tarik tunai, dan lihat riwayat transaksi.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blockchain-blue transition-colors relative">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
              </button>
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                B
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 sm:p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-10 flex-1 flex flex-col xl:flex-row gap-4 lg:gap-4 lg:gap-8">
            
            {/* Left Column: Wallet Card & Actions */}
            <div className="w-full xl:w-1/3 space-y-6">
              
              {/* Main Wallet Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-6 shadow-[0_8px_30px_rgb(5,150,105,0.2)] text-white relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/40 rounded-full blur-[40px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/40 rounded-full blur-[40px] pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-emerald-100/90 text-sm font-semibold">
                      <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                      Total Saldo
                    </div>
                    <span className="bg-emerald-500/50 backdrop-blur text-xs px-2 py-1 rounded-md font-bold">
                      IDR
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-2xl md:text-3xl md:text-2xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold font-plus tracking-tight mb-6">Rp 42.500.000</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-emerald-500/30 pt-4">
                    <div>
                      <p className="text-[10px] text-emerald-100/80 uppercase font-bold tracking-wider mb-1">Saldo Tersedia</p>
                      <p className="text-sm font-extrabold">Rp 12.500.000</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-100/80 uppercase font-bold tracking-wider mb-1">Dana Diinvestasikan</p>
                      <p className="text-sm font-extrabold">Rp 30.000.000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="bg-white/70 backdrop-blur-xl border border-emerald-100 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200 transition-all font-bold py-3.5 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[24px]">add_circle</span>
                  <span className="text-sm">Top Up</span>
                </button>
                <button className="bg-white/70 backdrop-blur-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-bold py-3.5 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[24px]">payments</span>
                  <span className="text-sm">Tarik Dana</span>
                </button>
              </div>

              {/* Bank Accounts */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-800">Rekening Tersimpan</h4>
                  <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg text-xs font-bold transition-colors">
                    + Tambah
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-800 font-extrabold text-sm border border-slate-100">
                      BCA
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">BCA - xxxx 4589</p>
                      <p className="text-[11px] font-semibold text-slate-400">A.n. Budi Santoso</p>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-1 rounded uppercase font-bold">Utama</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Transactions */}
            <div className="w-full xl:w-2/3 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
              <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-800 font-plus">Riwayat Transaksi</h3>
                
                <div className="flex bg-slate-100/80 p-1 rounded-full w-fit border border-slate-200">
                  {["Semua", "Pemasukan", "Pengeluaran"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                        activeTab === tab
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transaction List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
                
                {/* TRX 1 */}
                <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">call_received</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">ROI: Tambak Udang Kluster A21</h4>
                    <p className="text-[11px] text-slate-500">24 Okt 2024, 09:12 WIB • Bagi Hasil</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-emerald-600">+ Rp 7.050.000</p>
                    <p className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">Berhasil</p>
                  </div>
                </div>

                {/* TRX 2 */}
                <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">agriculture</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">Investasi: Kebun Cabai Keriting</h4>
                    <p className="text-[11px] text-slate-500">12 Sep 2024, 14:30 WIB • Pendanaan Proyek</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-slate-800">- Rp 25.000.000</p>
                    <p className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">Selesai</p>
                  </div>
                </div>

                {/* TRX 3 */}
                <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">Penarikan Dana ke BCA</h4>
                    <p className="text-[11px] text-slate-500">01 Sep 2024, 10:00 WIB • Withdraw</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-slate-800">- Rp 5.000.000</p>
                    <p className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">Selesai</p>
                  </div>
                </div>

                {/* TRX 4 */}
                <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">Top Up Saldo via Virtual Account</h4>
                    <p className="text-[11px] text-slate-500">28 Agu 2024, 08:15 WIB • Deposit</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-emerald-600">+ Rp 50.000.000</p>
                    <p className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">Berhasil</p>
                  </div>
                </div>

              </div>

              <div className="p-4 border-t border-slate-100 text-center">
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Lihat Semua Transaksi</button>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl flex flex-col p-4 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between px-4 py-4 mb-4">
              <h1 className="text-xl font-extrabold text-slate-800 font-plus">Investor</h1>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 p-1 bg-slate-50 rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <nav className="flex-1 space-y-2">
              <Link onClick={() => setSidebarOpen(false)} href="/investor/dashboard" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 rounded-2xl font-semibold">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span className="text-sm">Dashboard</span>
              </Link>
              <Link onClick={() => setSidebarOpen(false)} href="/investor/portfolio" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 rounded-2xl font-semibold">
                <span className="material-symbols-outlined text-[20px]">pie_chart</span>
                <span className="text-sm">Portfolio</span>
              </Link>
              <Link onClick={() => setSidebarOpen(false)} href="/crowdfunding" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 rounded-2xl font-semibold">
                <span className="material-symbols-outlined text-[20px]">agriculture</span>
                <span className="text-sm">Projects</span>
              </Link>
              <Link onClick={() => setSidebarOpen(false)} href="/marketplace" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 rounded-2xl font-semibold">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span className="text-sm">Marketplace</span>
              </Link>
              <Link onClick={() => setSidebarOpen(false)} href="/investor/wallet" className="flex items-center gap-3 px-4 py-3.5 bg-blue-50 text-blue-600 rounded-2xl font-bold">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
                <span className="text-sm">Wallet</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
      
    </div>
  );
}
