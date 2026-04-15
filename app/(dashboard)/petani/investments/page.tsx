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
                <h3 className="text-2xl md:text-2xl md:text-3xl font-extrabold text-slate-800 font-plus tracking-tight">3 <span className="text-sm text-slate-400 font-medium">Proyek</span></h3>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Dana Terkunci (Escrow)</p>
                </div>
                <h3 className="text-2xl md:text-2xl md:text-3xl font-extrabold text-slate-800 font-plus tracking-tight">Rp 2.1M</h3>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">clock_loader_40</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Pencairan Tertunda</p>
                </div>
                <h3 className="text-2xl md:text-2xl md:text-3xl font-extrabold text-amber-600 font-plus tracking-tight">1 <span className="text-sm text-amber-600/70 font-medium">Pengajuan</span></h3>
              </div>
            </div>

            {/* List of Active Projects with Milestone Management */}
            <div className="space-y-6">
              
              {/* Project Card 1 */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                {/* Header Card */}
                <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1592650073507-6c2e3ca914a8?auto=format&fit=crop&q=80&w=200&h=200" 
                      alt="Cabai Lembang" 
                      className="w-14 h-14 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800">Perluasan Lahan Cabai Keriting</h3>
                      <p className="text-xs text-slate-500 font-medium">Berhasil Didanai: Rp 450.000.000 • Mulai 12 Sep 2024</p>
                    </div>
                  </div>
                  <Link href="/petani/projects/cabai-keriting-lembang" className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors shadow-sm">
                    Lihat Prospektus
                  </Link>
                </div>

                {/* Milestone Tracker */}
                <div className="p-6">
                  <h4 className="text-sm font-extrabold text-slate-800 mb-4 px-2">Progres Milestone (Smart Contract Escrow)</h4>
                  
                  <div className="space-y-4">
                    {/* Milestone 1 (Completed) */}
                    <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">Termin 1 • 30% Dana (Rp 135.000.000)</p>
                          <h5 className="font-extrabold text-slate-800">Persiapan Lahan & Alat</h5>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Telah Dicairkan</span>
                      </div>
                    </div>

                    {/* Milestone 2 (Active/Awaiting Validation) */}
                    <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_20px_rgb(251,191,36,0.1)]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                          <span className="material-symbols-outlined text-[20px] animate-spin-slow">sync</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-0.5">Termin 2 • 40% Dana (Rp 180.000.000)</p>
                          <h5 className="font-extrabold text-slate-800">Proses Pembibitan & Tanam</h5>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors shadow-sm whitespace-nowrap">
                          Ajukan Pencairan
                        </button>
                        <button className="flex-1 sm:flex-none px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-xs transition-colors flex items-center justify-center">
                           <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        </button>
                      </div>
                    </div>

                    {/* Milestone 3 (Locked) */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-60">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200 shrink-0">
                          <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Termin 3 • 30% Dana (Rp 135.000.000)</p>
                          <h5 className="font-extrabold text-slate-600">Panen & Distribusi</h5>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs font-bold text-slate-400 bg-slate-100/80 px-2 py-1 border border-slate-200 rounded-md">Terkunci (Escrow)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


               {/* Project Card 2 */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                {/* Header Card */}
                <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1629881180295-812e9b8979db?auto=format&fit=crop&q=80&w=200&h=200" 
                      alt="Hydroponic Lettuce" 
                      className="w-14 h-14 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800">Greenhouse Skala Menengah</h3>
                      <p className="text-xs text-slate-500 font-medium">Berhasil Didanai: Rp 850.000.000 • Mulai 05 Ags 2024</p>
                    </div>
                  </div>
                  <Link href="/petani/projects/greenhouse-lettuce" className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors shadow-sm">
                    Lihat Prospektus
                  </Link>
                </div>

                {/* Milestone Tracker */}
                <div className="p-6">
                  <h4 className="text-sm font-extrabold text-slate-800 mb-4 px-2">Progres Milestone (Smart Contract Escrow)</h4>
                  
                  <div className="space-y-4">
                    {/* Milestone 1 (Completed) */}
                    <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">Termin 1 • 50% Dana (Rp 425.000.000)</p>
                          <h5 className="font-extrabold text-slate-800">Pembelian Baja & Plastik UV</h5>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Telah Dicairkan</span>
                      </div>
                    </div>

                    {/* Milestone 2 (Completed) */}
                    <div className="bg-white border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                          <span className="material-symbols-outlined text-[20px]">check</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">Termin 2 • 30% Dana (Rp 255.000.000)</p>
                          <h5 className="font-extrabold text-slate-800">Sistem Pengairan (IoT)</h5>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Telah Dicairkan</span>
                      </div>
                    </div>

                    {/* Milestone 3 (Pending Panen) */}
                    <div className="bg-white border-2 border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_20px_rgb(16,185,129,0.1)]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                          <span className="material-symbols-outlined text-[20px] animate-spin-slow">sync</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">Termin 3 • 20% Dana (Rp 170.000.000)</p>
                          <h5 className="font-extrabold text-slate-800">Siklus Panen Perdana</h5>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors shadow-sm whitespace-nowrap">
                          Laporan Panen
                        </button>
                        <button className="flex-1 sm:flex-none px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-xs transition-colors flex items-center justify-center">
                           <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </main>

    </div>
  );
}
