"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function InvestorDashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/40 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blockchain-blue/20 rounded-full blur-[120px] pointer-events-none z-0" />

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
            <Link href="/investor/dashboard" className="flex items-center gap-3 px-4 py-3.5 bg-blue-50/80 border border-blue-100 text-blue-600 rounded-2xl font-bold shadow-sm transition-all">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
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
            <Link href="/investor/wallet" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-white hover:text-slate-800 rounded-2xl font-semibold transition-all">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
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
              <h1 className="text-lg font-bold text-slate-800 font-plus">Investor</h1>
            </div>
            
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">September 24, 2024</p>
              <h2 className="text-2xl font-extrabold text-slate-800 font-plus">Selamat Datang, Budi!</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-white/80 border border-slate-200/60 rounded-full px-4 py-2 shadow-sm text-sm font-bold text-emerald-dark">
                <span className="material-symbols-outlined text-emerald-main text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
                <span>Rp 42.500.000</span>
              </div>
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
          <div className="p-6 sm:p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-10 flex-1 space-y-6">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Main Portfolio Stat */}
              <div className="md:col-span-1 bg-gradient-to-br from-blockchain-blue to-[#0284C7] rounded-3xl p-6 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <p className="text-sm font-semibold text-blue-100">Nilai Portofolio</p>
                       <span className="material-symbols-outlined text-white/50 text-[28px]">trending_up</span>
                    </div>
                    <h3 className="text-2xl md:text-2xl md:text-3xl sm:text-2xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold font-plus tracking-tight">Rp 842.12M</h3>
                  </div>
                  <div className="mt-8 flex items-center gap-2 bg-white/20 backdrop-blur-sm w-fit px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                    <span className="text-xs font-bold">+12.4%</span>
                    <span className="text-[10px] text-blue-100 ml-1">Tahun Ini</span>
                  </div>
                </div>
              </div>

               {/* Secondary Stats */}
               <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 
                 {/* ROI Stat */}
                 <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-500 mb-1">Total ROI Diterima</p>
                        <h3 className="text-2xl font-extrabold text-emerald-main font-plus tracking-tight">Rp 104.5M</h3>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-main flex items-center justify-center border border-emerald-100">
                        <span className="material-symbols-outlined text-[24px]">payments</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="font-bold text-slate-400">Target Tahunan</span>
                        <span className="font-bold text-emerald-main">72%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-main h-full rounded-full w-[72%] relative">
                          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 w-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                 </div>

                 {/* Active Assets Stat */}
                 <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-500 mb-1">Aset Aktif</p>
                        <h3 className="text-2xl font-extrabold text-slate-800 font-plus tracking-tight">12 Kluster</h3>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
                        <span className="material-symbols-outlined text-[24px]">eco</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-3">
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 z-30">P</div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700 z-20">J</div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-100 flex items-center justify-center text-xs font-bold text-rose-700 z-10">T</div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 z-0">+9</div>
                      </div>
                      <span className="ml-4 text-xs font-semibold text-slate-400">Tersebar di 4 Provinsi</span>
                    </div>
                 </div>

               </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              
              {/* Allocation Chart */}
              <div className="lg:col-span-1 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-slate-800 font-plus">Alokasi Portofolio</h3>
                  <button className="text-slate-400 hover:text-blockchain-blue transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                  </button>
                </div>

                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background */}
                    <path stroke="#f1f5f9" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                    {/* Vaname 45% */}
                    <path stroke="#0ea5e9" strokeDasharray="45, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Hydroponics 25% */}
                    <path stroke="#10b981" strokeDasharray="25, 100" strokeDashoffset="-45" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Corn 15% */}
                    <path stroke="#f59e0b" strokeDasharray="15, 100" strokeDashoffset="-70" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Unallocated 15% -> Empty background */}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-slate-400 mb-0.5">TOTAL</span>
                    <span className="text-2xl font-extrabold text-slate-800 font-plus">100%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:border-sky-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                      <span className="text-sm font-bold text-slate-700">Udang Vaname</span>
                    </div>
                    <span className="text-sm font-extrabold text-slate-800">45%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-bold text-slate-700">Sayur Hidroponik</span>
                    </div>
                    <span className="text-sm font-extrabold text-slate-800">25%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:border-amber-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm font-bold text-slate-700">Pakan Jagung</span>
                    </div>
                    <span className="text-sm font-extrabold text-slate-800">15%</span>
                  </div>
                </div>
              </div>

              {/* History Table */}
              <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-800 font-plus">Riwayat Distribusi ROI</h3>
                  <button className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Export CSV
                  </button>
                </div>

                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-4 pl-2 font-semibold">Nama Proyek</th>
                        <th className="py-4 font-semibold">Tanggal</th>
                        <th className="py-4 font-semibold">Jumlah (Rp)</th>
                        <th className="py-4 font-semibold text-right pr-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors group">
                        <td className="py-4 pl-2 font-bold text-slate-700">Kluster Bioflok A21</td>
                        <td className="py-4 text-slate-500 font-medium">24 Okt 2024</td>
                        <td className="py-4 font-extrabold text-emerald-main">+4.250.000</td>
                        <td className="py-4 text-right pr-2">
                          <span className="inline-flex py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-wide">SUKSES</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors group">
                        <td className="py-4 pl-2 font-bold text-slate-700">Jagung Manis Jatim</td>
                        <td className="py-4 text-slate-500 font-medium">12 Okt 2024</td>
                        <td className="py-4 font-extrabold text-emerald-main">+1.800.000</td>
                        <td className="py-4 text-right pr-2">
                          <span className="inline-flex py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-wide">SUKSES</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors group">
                        <td className="py-4 pl-2 font-bold text-slate-700">Cabai Organik Lembang</td>
                        <td className="py-4 text-slate-500 font-medium">02 Okt 2024</td>
                        <td className="py-4 font-extrabold text-slate-400">2.100.000</td>
                        <td className="py-4 text-right pr-2">
                          <span className="inline-flex py-1 px-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-extrabold uppercase tracking-wide">PENDING</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors group">
                        <td className="py-4 pl-2 font-bold text-slate-700">Greenhouse Tomat III</td>
                        <td className="py-4 text-slate-500 font-medium">28 Sep 2024</td>
                        <td className="py-4 font-extrabold text-emerald-main">+3.500.000</td>
                        <td className="py-4 text-right pr-2">
                          <span className="inline-flex py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-wide">SUKSES</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors group">
                        <td className="py-4 pl-2 font-bold text-slate-700">Tambak Udang Sidoarjo</td>
                        <td className="py-4 text-slate-500 font-medium">15 Sep 2024</td>
                        <td className="py-4 font-extrabold text-emerald-main">+12.000.000</td>
                        <td className="py-4 text-right pr-2">
                          <span className="inline-flex py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-wide">SUKSES</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                    Lihat Riwayat Lengkap <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
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
              <Link onClick={() => setSidebarOpen(false)} href="/investor/dashboard" className="flex items-center gap-3 px-4 py-3.5 bg-blue-50 text-blue-600 rounded-2xl font-bold">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
                <span className="text-sm">Dashboard</span>
              </Link>
              <Link onClick={() => setSidebarOpen(false)} href="#" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 rounded-2xl font-semibold">
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
            </nav>
          </div>
        </div>
      )}
      
    </div>
  );
}
