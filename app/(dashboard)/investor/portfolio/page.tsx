"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function InvestorPortfolioPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Aktif");

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
            <Link href="/investor/dashboard" className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-white hover:text-slate-800 rounded-2xl font-semibold transition-all">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link href="/investor/portfolio" className="flex items-center gap-3 px-4 py-3.5 bg-blue-50/80 border border-blue-100 text-blue-600 rounded-2xl font-bold shadow-sm transition-all">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>pie_chart</span>
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
              <h1 className="text-lg font-bold text-slate-800 font-plus">Portfolio</h1>
            </div>
            
            <div className="hidden lg:block">
              <h2 className="text-2xl font-extrabold text-slate-800 font-plus">Manajemen Portfolio</h2>
              <p className="text-xs font-semibold text-slate-400 mt-1">Pantau dan evaluasi performa investasi agrikultur Anda.</p>
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
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <p className="text-sm font-semibold text-slate-500 mb-1">Total Modal Diinvestasikan</p>
                <h3 className="text-2xl font-extrabold text-slate-800 font-plus tracking-tight mb-2">Rp 737.620.000</h3>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> 12 Proyek
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <p className="text-sm font-semibold text-slate-500 mb-1">Estimasi ROI Berjalan</p>
                <h3 className="text-2xl font-extrabold text-blockchain-blue font-plus tracking-tight mb-2">Rp 94.300.000</h3>
                <div className="flex items-center gap-1 text-[11px] font-bold text-sky-600 bg-sky-50 w-fit px-2 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[12px]">schedule</span> Jatuh tempo thn ini
                </div>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <p className="text-sm font-semibold text-slate-500 mb-1">Rata-rata Yield Tahunan</p>
                <h3 className="text-2xl font-extrabold text-emerald-main font-plus tracking-tight mb-2">12.8%</h3>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span> Di Atas Target
                </div>
              </div>
            </div>

            {/* Tabs & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div className="bg-white/60 backdrop-blur-md p-1 border border-slate-200 rounded-full flex gap-1 w-full sm:w-auto">
                {["Semua", "Aktif", "Selesai"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="w-full sm:w-auto flex items-center bg-white/80 border border-slate-200 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
                <input 
                  type="text" 
                  placeholder="Cari investasi..." 
                  className="bg-transparent border-none outline-none text-sm text-slate-700 w-full sm:w-48 ml-2 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Portfolio List */}
            <div className="space-y-4 pb-10">
              
              {/* Card 1 */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(2,132,199,0.08)] transition-all">
                <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center">
                  {/* Left: Image & Title */}
                  <div className="flex gap-4 items-center w-full xl:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1592650073507-6c2e3ca914a8?auto=format&fit=crop&q=80&w=200&h=200" 
                      alt="Cabai Lembang" 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-800 leading-tight mb-1">Kebun Cabai Keriting Organik</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        Lembang, Jawa Barat
                      </p>
                      <span className="inline-block mt-2 px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md text-[9px] font-extrabold uppercase tracking-wide">
                        Berjalan (Bulan 2/4)
                      </span>
                    </div>
                  </div>

                  {/* Middle: Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full xl:w-auto flex-1 border-t xl:border-t-0 xl:border-l border-slate-100 pt-4 xl:pt-0 xl:pl-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Modal</p>
                      <p className="text-sm sm:text-base font-extrabold text-slate-800">Rp 25.000.000</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Est. ROI</p>
                      <p className="text-sm sm:text-base font-extrabold text-emerald-main">12.5%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Jatuh Tempo</p>
                      <p className="text-sm sm:text-base font-extrabold text-slate-800">12 Des 2024</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Progress</p>
                      <p className="text-sm sm:text-base font-extrabold text-blue-600">50%</p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="w-full xl:w-auto flex flex-row xl:flex-col gap-2 pt-4 xl:pt-0 border-t xl:border-t-0 border-slate-100 justify-end">
                    <button className="flex-1 xl:w-32 bg-white border border-slate-200 text-slate-600 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs text-center shadow-sm">
                      Detail
                    </button>
                    <button className="flex-1 xl:w-32 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 font-bold py-2.5 rounded-xl transition-colors text-xs text-center">
                      Unduh Laporan
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(2,132,199,0.08)] transition-all">
                <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center">
                  {/* Left: Image & Title */}
                  <div className="flex gap-4 items-center w-full xl:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1629881180295-812e9b8979db?auto=format&fit=crop&q=80&w=200&h=200" 
                      alt="Lettuce Hydroponic" 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-800 leading-tight mb-1">Modern Hydroponic Lettuce</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        Malang, Jawa Timur
                      </p>
                      <span className="inline-block mt-2 px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-md text-[9px] font-extrabold uppercase tracking-wide">
                        Mendekati Panen (Bulan 3/3)
                      </span>
                    </div>
                  </div>

                  {/* Middle: Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full xl:w-auto flex-1 border-t xl:border-t-0 xl:border-l border-slate-100 pt-4 xl:pt-0 xl:pl-6">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Modal</p>
                      <p className="text-sm sm:text-base font-extrabold text-slate-800">Rp 12.000.000</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Est. ROI</p>
                      <p className="text-sm sm:text-base font-extrabold text-emerald-main">9.2%</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Jatuh Tempo</p>
                      <p className="text-sm sm:text-base font-extrabold text-slate-800">28 Okt 2024</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Progress</p>
                      <p className="text-sm sm:text-base font-extrabold text-blue-600">95%</p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="w-full xl:w-auto flex flex-row xl:flex-col gap-2 pt-4 xl:pt-0 border-t xl:border-t-0 border-slate-100 justify-end">
                    <button className="flex-1 xl:w-32 bg-white border border-slate-200 text-slate-600 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs text-center shadow-sm">
                      Detail
                    </button>
                    <button className="flex-1 xl:w-32 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 font-bold py-2.5 rounded-xl transition-colors text-xs text-center">
                      Unduh Laporan
                    </button>
                  </div>
                </div>
              </div>

               {/* Card 3 (Completed) */}
               {activeTab === "Semua" || activeTab === "Selesai" ? (
                <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-5 sm:p-6 shadow-sm opacity-80 transition-all">
                  <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center grayscale-[0.2]">
                    <div className="flex gap-4 items-center w-full xl:w-1/3">
                      <img 
                        src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=200&h=200" 
                        alt="Tambak Udang" 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm"
                      />
                      <div>
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-700 leading-tight mb-1">Kluster Bioflok A21</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">location_on</span>
                          Sidoarjo, Jawa Timur
                        </p>
                        <span className="inline-block mt-2 px-2.5 py-1 bg-slate-200 text-slate-600 rounded-md text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 w-fit">
                          <span className="material-symbols-outlined text-[10px]">done_all</span> Selesai
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full xl:w-auto flex-1 border-t xl:border-t-0 xl:border-l border-slate-200 pt-4 xl:pt-0 xl:pl-6">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Modal</p>
                        <p className="text-sm sm:text-base font-extrabold text-slate-600">Rp 50.000.000</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Realized ROI</p>
                        <p className="text-sm sm:text-base font-extrabold text-slate-600">14.1%</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Tgl Pencairan</p>
                        <p className="text-sm sm:text-base font-extrabold text-slate-600">24 Okt 2024</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Profit Bersih</p>
                        <p className="text-sm sm:text-base font-extrabold text-emerald-600">+ Rp 7.050.000</p>
                      </div>
                    </div>

                    <div className="w-full xl:w-auto flex flex-row gap-2 pt-4 xl:pt-0 border-t xl:border-t-0 border-slate-200 justify-end">
                      <button className="flex-1 xl:w-full bg-white border border-slate-200 text-slate-600 font-bold py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors text-xs text-center shadow-sm">
                        Laporan Final
                      </button>
                    </div>
                  </div>
                </div>
               ) : null}

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
              <Link onClick={() => setSidebarOpen(false)} href="/investor/portfolio" className="flex items-center gap-3 px-4 py-3.5 bg-blue-50 text-blue-600 rounded-2xl font-bold">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>pie_chart</span>
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
