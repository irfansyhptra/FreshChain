"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CrowdfundingCreate() {
  return (
    <div className="bg-frosted-white text-slate-gray font-inter antialiased flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 bottom-0 lg:top-0 h-16 lg:h-screen w-full lg:w-64 bg-white/60 backdrop-blur-xl border-t lg:border-t-0 lg:border-r border-white/50 flex flex-row lg:flex-col items-center lg:items-stretch overflow-x-auto lg:overflow-visible p-2 lg:p-4 space-x-2 lg:space-x-0 lg:space-y-2 pointer-events-auto z-[100] scrollbar-hide">
        <div className="hidden lg:flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-main to-[#10B981] flex items-center justify-center text-white">
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
          <Link href="/petani/crowdfunding" className="flex items-center gap-3 px-4 py-3 bg-emerald-main/10 text-emerald-main rounded-xl font-semibold transition-all duration-200 ease-in-out">
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
      <main className="lg:ml-64 lg:w-[calc(100%-16rem)] max-w-full w-full pt-10 pb-16 px-6 lg:px-12 max-w-7xl relative mx-auto">
        {/* Decorative Background */}
        <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-light/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <header className="flex justify-between items-center mb-10 relative z-10 w-full">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-bold tracking-tight text-emerald-dark">Project Builder</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/70 px-4 py-2 rounded-full border border-white/50 shadow-sm">
              <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-48 text-emerald-dark outline-none placeholder:text-slate-400" 
                placeholder="Cari proyek..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-gray hover:text-emerald-main transition-colors active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-gray hover:text-emerald-main transition-colors active:scale-95">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </button>
              <button onClick={() => alert('Menghubungkan Wallet...')} className="bg-emerald-main text-white px-4 py-2 rounded-xl font-semibold shadow-md active:scale-95 transition-transform text-sm ml-2">
                Connect
              </button>
            </div>
          </div>
        </header>

        <div className="mb-10 relative z-10">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-extrabold text-emerald-dark font-plus tracking-tight mb-2">Buat Proyek Crowdfunding Baru</h2>
          <p className="text-slate-gray">Bangun masa depan pertanian berkelanjutan melalui pendanaan berbasis blockchain.</p>
        </div>

        {/* Stepper Horizontal */}
        <div className="mb-12 relative z-10">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-emerald-main/20 z-0"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-main text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-main/20 ring-4 ring-frosted-white">
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </div>
              <span className="mt-3 text-xs font-bold text-emerald-main uppercase tracking-wider">Informasi Dasar</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-main text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-main/20 ring-4 ring-frosted-white">
                <span className="text-xs lg:text-sm whitespace-nowrap">2</span>
              </div>
              <span className="mt-3 text-xs font-bold text-emerald-main uppercase tracking-wider">RAB & Milestone</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white text-slate-400 flex items-center justify-center font-bold ring-4 ring-frosted-white border border-slate-200">
                <span className="text-xs lg:text-sm whitespace-nowrap">3</span>
              </div>
              <span className="mt-3 text-xs font-semibold text-slate-gray uppercase tracking-wider">Jaminan & Deposit</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white text-slate-400 flex items-center justify-center font-bold ring-4 ring-frosted-white border border-slate-200">
                <span className="text-xs lg:text-sm whitespace-nowrap">4</span>
              </div>
              <span className="mt-3 text-xs font-semibold text-slate-gray uppercase tracking-wider">Review & Publish</span>
            </div>
          </div>
        </div>

        {/* Main Layout: Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 lg:gap-8 items-start relative z-10">
          
          {/* Left Column - Forms */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Form Informasi Proyek */}
            <section className="bg-white/70 backdrop-blur-md p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-white/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-emerald-main/10 flex items-center justify-center text-emerald-main">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <h3 className="text-xl font-bold font-plus text-emerald-dark">Rencana RAB & Milestone</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-gray mb-2">Judul Proyek</label>
                    <input 
                      className="w-full bg-white border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-emerald-main/20 p-3 text-emerald-dark font-medium outline-none" 
                      type="text" 
                      defaultValue="Budidaya Cabe Rawit Organik Lahan Gambut"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-gray mb-2">Komoditas</label>
                    <select className="w-full bg-white border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-emerald-main/20 p-3 text-emerald-dark font-medium outline-none">
                      <option>Cabe Rawit</option>
                      <option>Padi Organik</option>
                      <option>Jagung Hibrida</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-gray mb-2">Luas Lahan (Hektar)</label>
                    <input 
                      className="w-full bg-white border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-emerald-main/20 p-3 text-emerald-dark font-medium outline-none" 
                      placeholder="0.0" 
                      type="number"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-gray mb-2">Lokasi GPS</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-white border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-emerald-main/20 p-3 pl-10 text-emerald-dark font-medium outline-none" 
                        placeholder="-6.2088, 106.8456" 
                        type="text"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-3.5 text-slate-400 text-lg">location_on</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Modul RAB & Milestone Dinamis */}
            <section className="bg-white/70 backdrop-blur-md p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-white/50">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-main/10 flex items-center justify-center text-emerald-main">
                    <span className="material-symbols-outlined">account_tree</span>
                  </div>
                  <h3 className="text-xl font-bold font-plus text-emerald-dark">Rincian Anggaran & Milestone</h3>
                </div>
                <button className="flex items-center gap-2 bg-emerald-main text-white px-4 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined text-sm">add</span> Tambah Item
                </button>
              </div>

              <div className="space-y-4">
                {/* Milestone Item 1 */}
                <div className="p-5 rounded-xl bg-white border border-slate-200/50 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-emerald-dark">Milestone 1: Persiapan Lahan & Benih</h4>
                      <p className="text-xs text-slate-400 mt-1">Estimasi pencairan: Rp 15.000.000</p>
                    </div>
                    <span className="bg-emerald-main/10 text-emerald-main text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Wajib</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Item Biaya</label>
                      <div className="text-sm font-medium p-2 bg-slate-50 border border-slate-100 rounded-lg">Pembelian Benih Cabe Varietas Unggul & Pupuk Kandang</div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Selesai</label>
                      <input className="w-full bg-slate-50 border border-slate-100 outline-none rounded-lg p-2 text-xs font-medium text-emerald-dark" type="date" defaultValue="2024-05-20" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <span className="material-symbols-outlined text-amber-600 text-sm">verified</span>
                    <div className="text-xs font-medium text-amber-800">
                      Syarat Bukti: <span className="font-bold">Foto Geotag</span> & <span className="font-bold">Nota Pembelian Digital</span>
                    </div>
                  </div>
                </div>

                {/* Milestone Item 2 */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/50 opacity-60">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-slate-600">Milestone 2: Penanaman & Sistem Irigasi</h4>
                      <p className="text-xs text-slate-400 mt-1">Estimasi pencairan: Rp 25.000.000</p>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar Columns */}
          <div className="lg:col-span-4 space-y-6">
            {/* Smart Contract Banner */}
            <div className="bg-gradient-to-br from-emerald-main to-[#10B981] p-6 rounded-2xl text-white shadow-xl shadow-emerald-main/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
                <h4 className="font-bold font-plus">Keamanan Escrow</h4>
              </div>
              <p className="text-sm leading-relaxed opacity-90 mb-4">
                RAB yang Anda buat akan langsung di-deploy ke <strong>Smart Contract Escrow</strong>. Dana hanya akan dicairkan per-milestone setelah bukti validasi diverifikasi oleh sistem.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm">info</span>
                TRANSPARANSI BLOCKCHAIN 100%
              </div>
            </div>

            {/* Stake Jaminan Section */}
            <section className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm">
              <h3 className="text-lg font-bold font-plus mb-4 flex items-center gap-2 text-emerald-dark">
                <span className="material-symbols-outlined text-amber-500">account_balance</span>
                Stake Jaminan
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Sebagai komitmen pengelolaan dana investor, petani diwajibkan melakukan deposit jaminan sebesar 5% dari total RAB.
              </p>
              
              <div className="bg-slate-50/80 rounded-xl p-4 mb-6 border border-slate-200/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-slate-500">Total Target RAB</span>
                  <span className="text-sm font-bold text-emerald-dark">Rp 40.000.000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 mb-2">
                  <span className="text-xs font-medium text-slate-500">Minimal Jaminan (5%)</span>
                  <span className="text-sm font-bold text-emerald-main">Rp 2.000.000</span>
                </div>
                <div className="mt-4">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Metode Deposit</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 p-2 bg-emerald-50 rounded-lg border-2 border-emerald-main text-xs font-bold text-emerald-main">
                      <span className="material-symbols-outlined text-sm">account_balance_wallet</span> Token
                    </button>
                    <button className="flex items-center justify-center gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-400 hover:text-slate-600">
                      <span className="material-symbols-outlined text-sm">payments</span> Tunai
                    </button>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-emerald-main to-[#10B981] text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-main/20 hover:scale-[1.02] active:scale-95 transition-all">
                Deposit & Lanjutkan
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 font-medium italic">
                Jaminan akan dikembalikan saat panen berhasil.
              </p>
            </section>

            {/* Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-white/50 bg-white/70 backdrop-blur-md shadow-sm">
              <div className="relative h-32 w-full bg-slate-200">
                {/* Fallback pattern replacing the external image if missing */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-700 to-emerald-400 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-white text-[10px] font-bold uppercase tracking-widest bg-emerald-main px-2 py-0.5 rounded shadow-sm">Preview Proyek</span>
              </div>
              <div className="p-4">
                <h5 className="text-sm font-bold mb-1 text-emerald-dark">Budidaya Cabe Rawit Organik...</h5>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <span className="material-symbols-outlined text-xs">person</span>
                  <span>Oleh: Ahmad Santoso</span>
                </div>
                <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-main w-1/12 h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Navigation */}
        <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-200 relative z-10">
          <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-dark font-bold text-sm transition-colors">
            <span className="material-symbols-outlined">arrow_back</span> Kembali
          </button>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 font-bold text-sm bg-white hover:bg-slate-50 transition-colors">
              Simpan Draft
            </button>
            <button className="px-8 py-3 rounded-xl bg-emerald-main text-white font-bold text-sm shadow-md shadow-emerald-main/20 hover:opacity-90 transition-opacity">
              Langkah Selanjutnya
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}