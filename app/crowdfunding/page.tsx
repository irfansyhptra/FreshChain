"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CrowdfundingCatalog() {
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
              <Link href="/crowdfunding" className="text-emerald-main font-semibold text-sm border-b-2 border-emerald-main py-2">
                Projects
              </Link>
              <Link href="/traceability" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">
                Traceability
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-emerald-50/80 border border-emerald-100 rounded-full px-4 py-2 shadow-sm text-sm">
              <span className="material-symbols-outlined text-emerald-500 text-[18px] mr-2">account_balance_wallet</span>
              <span className="font-bold text-emerald-dark">Rp 12.450.000</span>
            </div>
            
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
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
          
          {/* Header */}
          <section className="mb-10">
            <div className="flex flex-col gap-3 mb-6">
              <h1 className="text-2xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-dark font-plus">
                Sustainable <span className="text-emerald-main">Growth</span>
              </h1>
              <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                Hubungkan langsung dengan petani organik lokal. Transparansi dan audit log membantu memastikan setiap milestone tercatat jelas untuk imbal hasil sosial dan finansial.
              </p>
            </div>
            
            {/* Quick Filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold bg-emerald-main text-white shadow-sm shadow-emerald-main/20">Semua Proyek</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark transition-all">Risiko Rendah</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark transition-all">Jangka Pendek</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark transition-all">Sertifikasi Hijau</button>
            </div>
          </section>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            
            {/* Card 1: Kebun Cabai */}
            <Link href="/crowdfunding/1" className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-main/5 rounded-full blur-2xl group-hover:bg-emerald-main/10 transition-colors pointer-events-none"></div>
              
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="/LadangCabai.jpg" 
                  alt="Kebun Cabai" 
                />
                <div className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                  Risiko Sedang
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-emerald-dark leading-tight group-hover:text-emerald-main transition-colors mb-1">Kebun Cabai Keriting Organik</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-4">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  Lembang, Jawa Barat
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-600">Dana Terkumpul</span>
                    <span className="font-bold text-emerald-main">75%</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-emerald-main h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Estimasi ROI</p>
                    <p className="text-lg font-extrabold text-emerald-main">12.5% <span className="text-[10px] text-emerald-600 font-semibold">/ siklus</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Durasi</p>
                    <p className="text-lg font-bold text-emerald-dark">4 Bulan</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Ladang Tomat */}
            <Link href="/crowdfunding/2" className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-main/5 rounded-full blur-2xl group-hover:bg-emerald-main/10 transition-colors pointer-events-none"></div>

              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="/LadangTomat.jpg" 
                  alt="Ladang Tomat" 
                />
                <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                  Risiko Rendah
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold text-emerald-dark leading-tight group-hover:text-emerald-main transition-colors mb-1">Proyek Ladang Tomat Hijau</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-4">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  Malang, Jawa Timur
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-600">Dana Terkumpul</span>
                    <span className="font-bold text-emerald-main">42%</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-emerald-main h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Estimasi ROI</p>
                    <p className="text-lg font-extrabold text-emerald-main">9.2% <span className="text-[10px] text-emerald-600 font-semibold">/ siklus</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Durasi</p>
                    <p className="text-lg font-bold text-emerald-dark">3 Bulan</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

{/* Bento Highlight Banner (Proyek Ladang Jagung) */}
            <div className="bg-emerald-main/90 bg-gradient-to-br from-emerald-main to-[#059669] text-white rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 sm:p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-10 shadow-xl shadow-emerald-main/30 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 lg:gap-4 lg:gap-8 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 flex-1 flex flex-col items-start">
                <span className="bg-emerald-800 text-emerald-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
                  Peluang Baru
                </span>
                <h2 className="text-2xl sm:text-2xl md:text-2xl md:text-3xl font-extrabold text-white font-plus mb-4 leading-tight shadow-sm">
                  Proyek Ladang Jagung Organik: Phase II
                </h2>
                <p className="text-emerald-50 text-sm mb-6 max-w-sm leading-relaxed">
                  Ekspansi lahan 5 hektar dengan smart irrigation. Bergabung sekarang dan amankan slot investasi khusus early-bird dengan ekstra dividen bulanan.
                </p>
                <button className="bg-white text-emerald-700 px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all">
                  Pelajari Proyek
                </button>
              </div>
              
              <div className="relative w-full sm:w-1/3 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white/20 z-10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/ladangJagung.jpeg" 
                  alt="Ladang Jagung" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

        </div>

        {/* Right Sidebar (Milestones Detail) */}
        <aside className="fixed bottom-0 left-0 w-full lg:static lg:w-1/3 xl:w-1/4 mt-0 z-40">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-t-3xl lg:rounded-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.05)] lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-28 max-h-[80vh] lg:max-h-[calc(100vh-10rem)] overflow-y-auto hidden lg:block scrollbar-hide">
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-100">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-main rounded-xl flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>info</span>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-emerald-dark font-plus leading-tight">Project Milestones</h4>
                <p className="text-xs text-slate-500 font-medium">Kebun Cabai Keriting</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative pl-3 border-l-2 border-slate-100 ml-3 mb-8 space-y-6">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[19px] top-1 w-8 h-8 rounded-full bg-emerald-main text-white flex items-center justify-center border-4 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <div className="pl-6">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="text-sm font-bold text-emerald-dark">Persiapan Lahan</h5>
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">Selesai</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Pengolahan tanah dan instalasi sistem irigasi tetes otomatis.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[19px] top-1 w-8 h-8 rounded-full bg-white text-amber-500 border-2 border-amber-400 flex items-center justify-center shadow-sm ring-4 ring-amber-50 animate-pulse">
                  <span className="material-symbols-outlined text-[14px]">agriculture</span>
                </div>
                <div className="pl-6">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="text-sm font-bold text-emerald-dark">Penanaman</h5>
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-700">Berjalan</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Pemindahan bibit cabai unggul dari persemaian ke lahan terbuka.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[19px] top-1 w-8 h-8 rounded-full bg-white text-slate-300 border-2 border-slate-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px]">inventory_2</span>
                </div>
                <div className="pl-6">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="text-sm font-bold text-slate-400">Panen</h5>
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">Mendatang</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">Proses pemetikan hasil dan distribusi ke marketplace FreshChain.</p>
                </div>
              </div>

            </div>

            {/* Investment Summary */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 mt-6">
              <p className="text-sm font-extrabold text-emerald-dark mb-2">Ringkasan Proyek</p>
              <p className="text-xs text-emerald-800/70 leading-relaxed mb-5">
                Proyek ini menggunakan teknologi sensor IoT untuk memantau kelembaban tanah secara real-time, memastikan hasil panen maksimal dengan penggunaan air minimal.
              </p>
              <button className="w-full bg-emerald-main text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-main/20 hover:opacity-90 active:scale-95 transition-all text-sm flex justify-center items-center gap-2">
                Mulai Investasi <span className="material-symbols-outlined text-[16px]">trending_up</span>
              </button>
            </div>

          </div>
        </aside>

      </main>

      {/* Modern Role Switcher Overlay (Optional) */}
      <div className="fixed bottom-24 right-6 x-50 hidden lg:flex flex-col gap-2 z-50">
        <Link href="/petani/dashboard" className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-main hover:-translate-x-1 transition-all group relative">
          <span className="material-symbols-outlined absolute opacity-0 group-hover:opacity-100 right-14 text-sm font-bold bg-white px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap pointer-events-none">Mode Petani</span>
          <span className="material-symbols-outlined text-[22px]">agriculture</span>
        </Link>
        <Link href="/investor" className="w-12 h-12 bg-emerald-main rounded-full shadow-lg shadow-emerald-main/30 flex items-center justify-center text-white ring-4 ring-emerald-50 group hover:-translate-x-1 transition-all relative">
          <span className="material-symbols-outlined absolute opacity-0 group-hover:opacity-100 right-14 text-sm font-bold bg-emerald-main text-white px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap pointer-events-none">Mode Investor</span>
          <span className="material-symbols-outlined text-[22px]">account_balance</span>
        </Link>
      </div>

    </div>
  );
}
