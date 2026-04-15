"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PetaniKYC() {
  const router = useRouter();

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
          <Link href="/petani/wallet" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Wallet</span>
          </Link>
          <Link href="/petani/kyc" className="flex items-center gap-3 px-4 py-3 bg-emerald-main/10 text-emerald-main rounded-xl font-semibold transition-all duration-200 ease-in-out">
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
        <div className="fixed top-[-5%] right-[-5%] w-[40%] h-[40%] bg-emerald-light/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header */}
        <header className="flex justify-between items-center mb-10 relative z-10 w-full">
          <div>
            <h2 className="text-2xl md:text-2xl md:text-3xl font-extrabold tracking-tight text-emerald-dark font-plus mb-1">Verifikasi Identitas (KYC)</h2>
            <p className="text-slate-gray text-sm">Status kepatuhan dan batas limit transaksi akun portal Anda.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-gray hover:text-emerald-main transition-colors active:scale-95 bg-white/50 backdrop-blur-sm rounded-full">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 lg:gap-8 relative z-10">
          {/* Left Column (Status Overview & Limits) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Status Banner */}
            <div className="bg-gradient-to-r from-emerald-main to-[#10B981] p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-3xl text-white shadow-lg shadow-emerald-main/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
              
              <div className="flex items-center gap-5 relative z-10 w-full">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/30">
                  <span className="material-symbols-outlined text-[40px] text-white">verified</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1">Status: Terverifikasi (Level 2)</h3>
                  <p className="text-emerald-100 font-medium text-sm leading-relaxed">
                    Data KTP dan legalitas lahan valid. Anda diperbolehkan merilis proposal Crowdfunding publik.
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex-shrink-0">
                <button className="bg-white text-emerald-main font-bold py-2.5 px-5 rounded-xl shadow-md hover:bg-slate-50 transition-colors text-sm">
                  Lihat Sertifikat
                </button>
              </div>
            </div>

            {/* Profile & Document Detail */}
            <div className="bg-white/70 backdrop-blur-md p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-3xl border border-white/50 shadow-sm">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-lg text-emerald-dark flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-main">manage_accounts</span>
                  Informasi Identitas Personal
                </h4>
                <button className="text-emerald-main font-semibold text-sm hover:underline">Perbarui Data</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Nama Lengkap Sesuai KTP</p>
                  <p className="text-sm font-bold text-slate-700">Ahmad Santoso</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Nomor Induk Kependudukan (NIK)</p>
                  <p className="text-sm font-bold text-slate-700">3271 * * * * * * * 0004</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Tanggal Lahir</p>
                  <p className="text-sm font-bold text-slate-700">12 Agustus 1985</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Nomor HP</p>
                  <p className="text-sm font-bold text-slate-700">+62 812-****-192</p>
                </div>
              </div>

              <div className="mt-8">
                <h5 className="font-bold text-sm text-emerald-dark mb-4">Dokumen yang Diserahkan</h5>
                <div className="space-y-3">
                  {/* KTP Document */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-main">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-dark">E-KTP Pribadi</p>
                        <p className="text-[11px] text-slate-500 font-medium">Diunggah: 14 Mar 2026</p>
                      </div>
                    </div>
                    <span className="bg-emerald-main/10 text-emerald-main text-[10px] font-bold px-2 py-1 rounded-full uppercase">Valid</span>
                  </div>
                  
                  {/* Land Legacy Document */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-main">
                        <span className="material-symbols-outlined text-[20px]">landscape</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-dark">Sertifikat / Bukti Sewa Lahan (SHM)</p>
                        <p className="text-[11px] text-slate-500 font-medium">Diunggah: 15 Mar 2026</p>
                      </div>
                    </div>
                    <span className="bg-emerald-main/10 text-emerald-main text-[10px] font-bold px-2 py-1 rounded-full uppercase">Valid</span>
                  </div>

                  {/* NPWP (Optional) */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-300">
                    <div className="flex items-center gap-3 opacity-60">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-[20px]">account_balance</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-600">NPWP / Legalitas Usaha (Koperasi)</p>
                        <p className="text-[11px] text-slate-500 font-medium">Belum diunggah</p>
                      </div>
                    </div>
                    <button className="text-emerald-main text-xs font-bold hover:underline">Unggah</button>
                  </div>

                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column (Access Permissions & Upgrade) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Limit Per Akun */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
              <h3 className="font-bold mb-4 text-emerald-dark">Limit & Akses Transaksi</h3>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-main mt-0.5 text-[20px]">check_circle</span>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Akses Platform</p>
                    <p className="text-[11px] text-slate-500">Penuh (Marketplace & Dashboard)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-main mt-0.5 text-[20px]">check_circle</span>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Maks. Target Crowdfunding</p>
                    <p className="text-[11px] text-slate-500">Hingga <strong className="text-emerald-dark font-mono">Rp 500.000.000</strong> per proyek</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-main mt-0.5 text-[20px]">check_circle</span>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Pencairan Dana Escrow</p>
                    <p className="text-[11px] text-slate-500">Limit harian <strong className="text-emerald-dark font-mono">Rp 25.000.000</strong></p>
                  </div>
                </li>
                <li className="flex items-start gap-3 opacity-60">
                  <span className="material-symbols-outlined text-slate-400 mt-0.5 text-[20px]">block</span>
                  <div>
                    <p className="text-sm font-bold text-slate-500">Akses Koperasi Ekspor</p>
                    <p className="text-[11px] text-amber-600 font-semibold bg-amber-50 inline-block px-1 rounded mt-0.5">Butuh Level 3</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 relative overflow-hidden shadow-sm">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-blue-500/10 pointer-events-none">workspace_premium</span>
              
              <div className="relative z-10">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block">
                  Level Berikutnya
                </span>
                <h4 className="font-bold text-slate-800 text-lg leading-tight mb-2">
                  Upgrade ke Enterprise (Level 3)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Tingkatkan limit pendanaan hingga Rp 2 Miliar dan dapatkan akses langsung menuju fasilitas Koperasi Ekspor dengan memverifikasi legalitas PT / Koperasi.
                </p>
                <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm shadow-md hover:bg-blue-700 transition-colors active:scale-95">
                  Mulai Proses Upgrade
                </button>
              </div>
            </div>
            
            {/* Help Note */}
            <p className="text-[11px] text-slate-400 text-center font-medium px-4">
              Data Anda dilindungi oleh enkripsi 256-bit dan mematuhi regulasi privasi institusi di sektor Agritek.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}