"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PemanajemenMilestone() {
  const [activeTab, setActiveTab] = useState("Semua");

  return (
    <div className="bg-frosted-white text-slate-gray font-inter antialiased flex min-h-screen relative overflow-hidden">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blockchain-blue/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 bottom-0 lg:top-0 h-16 lg:h-screen w-full lg:w-64 bg-white/60 backdrop-blur-xl border-t lg:border-t-0 lg:border-r border-white/50 flex flex-row lg:flex-col items-center lg:items-stretch overflow-x-auto lg:overflow-visible p-2 lg:p-4 space-x-2 lg:space-x-0 lg:space-y-2 pointer-events-auto z-[100] scrollbar-hide">
        <div className="hidden lg:flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-main to-[#10B981] flex items-center justify-center text-white">
            <span className="material-symbols-outlined">campaign</span>
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
          <Link href="/petani/investments" className="flex items-center gap-3 px-4 py-3 bg-emerald-main/10 text-emerald-main rounded-xl font-semibold transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">account_balance</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Investments</span>
          </Link>
          <Link href="/petani/crowdfunding" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">campaign</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Crowdfunding</span>
          </Link>
          <Link href="/petani/wallet" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
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
      <main className="lg:ml-64 lg:w-[calc(100%-16rem)] max-w-full w-full min-h-screen p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 lg:p-6 sm:p-4 sm:p-6 lg:p-8 lg:p-6 sm:p-8 lg:p-12 relative flex flex-col">
          
          {/* Top Header */}
          <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-white/50 px-6 sm:px-4 sm:px-6 lg:px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4 lg:hidden">
              <h1 className="text-lg font-bold text-slate-800 font-plus">Milestone</h1>
            </div>
            
            <div className="hidden lg:block">
              <h2 className="text-2xl font-extrabold text-slate-800 font-plus">Manajemen Milestone</h2>
              <p className="text-xs font-semibold text-slate-400 mt-1">Perbarui progres fase proyek Anda dan ajukan pencairan dana.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-emerald-main transition-colors relative">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                P
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 sm:p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-10 flex-1 space-y-6">
            
            {/* Quick Stats overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">psychiatry</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Proyek Berjalan</p>
                </div>
                <h3 className="text-2xl md:text-2xl md:text-3xl font-extrabold text-slate-800 font-plus tracking-tight">0 <span className="text-sm text-slate-400 font-medium">Proyek</span></h3>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Dana Terkunci (Escrow)</p>
                </div>
                <h3 className="text-2xl md:text-2xl md:text-3xl font-extrabold text-slate-800 font-plus tracking-tight">Rp 0</h3>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">clock_loader_40</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Pencairan Tertunda</p>
                </div>
                <h3 className="text-2xl md:text-2xl md:text-3xl font-extrabold text-amber-600 font-plus tracking-tight">0 <span className="text-sm text-amber-600/70 font-medium">Pengajuan</span></h3>
              </div>
            </div>

            {/* List of Active Projects with Milestone Management */}
            <div className="space-y-6">
              
              {/* Empty State / Loading State for dynamic data */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">inbox</span>
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">Belum Ada Proyek Aktif</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Anda belum memiliki proyek crowdfunding yang sedang berjalan atau data sedang dimuat dari server.
                </p>
                <Link href="/petani/crowdfunding" className="inline-block mt-6 px-6 py-3 bg-emerald-main text-white font-bold rounded-xl shadow-md shadow-emerald-main/20 hover:opacity-90 transition-opacity">
                  Buat Proyek Baru
                </Link>
              </div>


            </div>
          </div>
        </main>

    </div>
  );
}
