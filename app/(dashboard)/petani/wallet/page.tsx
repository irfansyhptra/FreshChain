"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PetaniWallet() {
  return (
    <div className="bg-frosted-white text-slate-gray font-inter antialiased flex min-h-screen relative overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 bottom-0 lg:top-0 h-16 lg:h-screen w-full lg:w-64 bg-white/60 backdrop-blur-xl border-t lg:border-t-0 lg:border-r border-white/50 flex flex-row lg:flex-col items-center lg:items-stretch overflow-x-auto lg:overflow-visible p-2 lg:p-4 space-x-2 lg:space-x-0 lg:space-y-2 pointer-events-auto z-[100] scrollbar-hide">
        <div className="hidden lg:flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-main to-[#10B981] flex items-center justify-center text-white shadow-sm shadow-emerald-main/20">
            <span className="material-symbols-outlined">agriculture</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-dark leading-tight">FreshChain Portal</h1>
            <p className="text-xs text-slate-gray">Verified Enterprise</p>
          </div>
        </div>

        <nav className="flex flex-row lg:flex-col flex-1 space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
          <Link href="/petani/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Dashboard</span>
          </Link>
          <Link href="/petani/investments" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">account_balance</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Investments</span>
          </Link>
          <Link href="/petani/crowdfunding" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">campaign</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Crowdfunding</span>
          </Link>
          <Link href="/petani/wallet" className="flex items-center gap-3 px-4 py-3 bg-emerald-main/10 text-emerald-main rounded-xl font-semibold transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Wallet</span>
          </Link>
          <Link href="/petani/kyc" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">KYC Status</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">contact_support</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Support</span>
          </Link>
        </nav>

        <div className="hidden lg:block pt-4 mt-auto border-t border-white/40">
          <button onClick={() => alert('Logging out...')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 lg:w-[calc(100%-16rem)] max-w-full w-full pt-10 pb-16 px-6 lg:px-12 max-w-6xl relative mx-auto">
        {/* Decorative Background */}
        <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-light/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <header className="flex justify-between items-center mb-10 relative z-10 w-full">
          <div>
            <h2 className="text-2xl md:text-2xl md:text-3xl font-extrabold tracking-tight text-emerald-dark font-plus mb-1">Dompet Digital</h2>
            <p className="text-slate-gray text-sm">Kelola saldo, deposit jaminan, dan tarik hasil panen Anda.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-gray hover:text-emerald-main transition-colors active:scale-95 bg-white/50 backdrop-blur-sm rounded-full">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-gray hover:text-emerald-main transition-colors active:scale-95 bg-white/50 backdrop-blur-sm rounded-full">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="flex items-center gap-2 bg-emerald-main text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-main/20 active:scale-95 transition-all text-sm ml-2">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>0x8aF...3eD2</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 lg:gap-8 relative z-10">
          {/* Left Area (Cards & Actions) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-emerald-main to-[#0e9f6e] p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-3xl text-white shadow-xl shadow-emerald-main/20 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 mix-blend-overlay"></div>
              <div className="absolute left-10 bottom-0 w-32 h-32 bg-emerald-light/20 rounded-full blur-2xl transform mix-blend-overlay"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 opacity-90">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                    <span className="text-sm font-medium tracking-wide">Total Saldo (IDR & Token)</span>
                  </div>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-md border border-white/10">
                    Jaringan Polygon
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl md:text-3xl md:text-5xl font-extrabold tracking-tight mb-2">Rp 45.500.000</h1>
                <p className="text-emerald-100 font-medium tracking-wide flex items-center gap-1.5 opacity-90">
                  ≈ 2,905.40 USDT
                  <span className="material-symbols-outlined text-[14px]">currency_exchange</span>
                </p>

                {/* Sub-balances */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                  <div>
                    <p className="text-emerald-100 text-xs uppercase tracking-wider font-semibold mb-1">Tersedia (Bisa Ditarik)</p>
                    <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100">Rp 15.500.000</p>
                  </div>
                  <div>
                    <p className="text-emerald-100 text-xs uppercase tracking-wider font-semibold mb-1">Di-Stake (Jaminan Escrow)</p>
                    <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200">Rp 30.000.000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-emerald-50 hover:border-emerald-200/50 transition-all text-emerald-dark group cursor-pointer shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-main/10 flex items-center justify-center group-hover:bg-emerald-main group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-emerald-main group-hover:text-white transition-colors">download</span>
                </div>
                <span className="font-semibold text-sm">Deposit</span>
              </button>
              
              <button className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-emerald-50 hover:border-emerald-200/50 transition-all text-emerald-dark group cursor-pointer shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-main/10 flex items-center justify-center group-hover:bg-emerald-main group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-emerald-main group-hover:text-white transition-colors">publish</span>
                </div>
                <span className="font-semibold text-sm">Tarik Dana</span>
              </button>

              <button className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-emerald-50 hover:border-emerald-200/50 transition-all text-emerald-dark group cursor-pointer shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-main/10 flex items-center justify-center group-hover:bg-emerald-main group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-emerald-main group-hover:text-white transition-colors">swap_horiz</span>
                </div>
                <span className="font-semibold text-sm">Swap Token</span>
              </button>
            </div>

            {/* Recent Transactions List */}
            <div className="bg-white/70 backdrop-blur-md p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-3xl border border-white/50 shadow-sm mt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-emerald-dark">Riwayat Transaksi</h3>
                <button className="text-emerald-main text-sm font-semibold hover:underline">Lihat Semua</button>
              </div>

              <div className="space-y-4">
                {/* TRX 1 */}
                <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50/50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <span className="material-symbols-outlined text-sm">lock</span>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-dark text-sm">Stake Jaminan (Proyek A)</p>
                      <p className="text-xs text-slate-500 mt-0.5">14 Apr 2026, 10:24 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-600 text-sm">- Rp 5.000.000</p>
                    <p className="text-xs text-slate-400 mt-0.5">Escrow Lock</p>
                  </div>
                </div>

                {/* TRX 2 */}
                <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50/50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-main/10 flex items-center justify-center text-emerald-main">
                      <span className="material-symbols-outlined text-sm">download</span>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-dark text-sm">Setoran Pendanaan (Investor)</p>
                      <p className="text-xs text-slate-500 mt-0.5">10 Apr 2026, 14:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-main text-sm">+ Rp 15.000.000</p>
                    <p className="text-xs text-slate-400 mt-0.5">Smart Contract (Milestone 1)</p>
                  </div>
                </div>

                {/* TRX 3 */}
                <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50/50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                      <span className="material-symbols-outlined text-sm">publish</span>
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-dark text-sm">Penarikan ke Bank BCA</p>
                      <p className="text-xs text-slate-500 mt-0.5">02 Apr 2026, 09:15 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-700 text-sm">- Rp 8.000.000</p>
                    <p className="text-xs text-slate-400 mt-0.5">Selesai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-6">
            {/* Wallet Info Details */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
              <h3 className="font-bold mb-4 text-emerald-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">info</span>
                Info Alamat Wallet
              </h3>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 breakdown-all whitespace-pre-wrap word-wrap break-words">
                <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-1 block">Polygon Address</span>
                <p className="text-xs font-mono text-emerald-dark bg-white border border-slate-200 p-2 rounded-lg break-all">
                  0x8aF9234b2cD85C3eD2D50E8221B6Cd7292271B43
                </p>
                <div className="flex justify-end mt-2">
                  <button className="text-emerald-main text-xs font-bold hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    Salin
                  </button>
                </div>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
              <h3 className="font-bold mb-4 text-emerald-dark">Alokasi Aset</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-500">IDR Rupiah (Fiat)</span>
                    <span className="text-emerald-dark font-bold">15%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-main h-full w-[15%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-500">USDT Stablecoin</span>
                    <span className="text-teal-600 font-bold">35%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full w-[35%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-500">VRDX Token (Utility)</span>
                    <span className="text-indigo-600 font-bold">50%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[50%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Help / Secure Asset */}
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-main">
                <span className="material-symbols-outlined">shield_locked</span>
                <h4 className="font-bold text-sm">Aset Anda Dilindungi</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seluruh dana Escrow diikat melalui Smart Contract FreshChain, menjamin likuiditas yang tidak dapat dipindah tangankan secara sepihak dan dijamin oleh audit keamanan.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}