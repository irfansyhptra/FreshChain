"use client";

import React, { useState } from "react";
import Link from "next/link";

import ActiveProjects from "@/components/dashboard/ActiveProjects";
import LiveUpdates from "@/components/dashboard/LiveUpdates";

export default function FreshChainFarmerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-frosted-white text-slate-gray font-inter antialiased flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 bottom-0 md:top-0 h-16 md:h-screen w-full md:w-64 bg-white/60 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/50 flex flex-row md:flex-col items-center md:items-stretch overflow-x-auto md:overflow-visible p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2 pointer-events-auto z-[100]">
        <div className="hidden md:flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-main to-[#10B981] flex items-center justify-center text-white">
            <span className="material-symbols-outlined">campaign</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-dark leading-tight">FreshChain Portal</h1>
            <p className="text-xs text-slate-gray">Verified Enterprise</p>
          </div>
        </div>
        <nav className="flex flex-row md:flex-col flex-1 space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
          <Link href="/petani/dashboard" className="flex items-center gap-3 px-4 py-3 bg-emerald-main/10 text-emerald-main rounded-xl font-semibold transition-all duration-200 ease-in-out">
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
          <Link href="/petani/kyc" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">KYC Status</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">contact_support</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Support</span>
          </Link>
        </nav>
        <div className="hidden md:block pt-4 mt-auto border-t border-white/40">
          <button onClick={() => alert('Logging out...')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 lg:w-[calc(100%-16rem)] max-w-full w-full min-h-screen p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 lg:p-6 sm:p-4 sm:p-6 lg:p-8 lg:p-6 sm:p-8 lg:p-12 relative">
        {/* Decorative Background */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Header Section */}
        <header className="flex justify-between items-end mb-10 relative z-10">
          <div>
            <h2 className="text-2xl md:text-2xl md:text-3xl font-plus font-extrabold tracking-tight text-emerald-dark">Farmer Dashboard</h2>
            <p className="text-slate-gray mt-1">Welcome back, Agro-Invest Primary Cooperative. Here is your farm's performance.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all">
            <span className="material-symbols-outlined">add_circle</span>
            Proposal Proyek Baru
          </button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-10">
          {/* Total Funding */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-main/5 rounded-full blur-2xl group-hover:bg-emerald-main/10 transition-colors"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-main/10 flex items-center justify-center rounded-xl text-emerald-main">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="text-sm font-semibold text-slate-gray">Total Funding Received</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-emerald-dark">Rp 2.450.000.000</span>
              <span className="text-xs text-emerald-main font-bold mb-1 flex items-center">
                <span className="material-symbols-outlined text-xs">trending_up</span> +12%
              </span>
            </div>
          </div>
          {/* Active Projects */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-golden-harvest/5 rounded-full blur-2xl group-hover:bg-golden-harvest/10 transition-colors"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-golden-harvest/10 flex items-center justify-center rounded-xl text-golden-harvest">
                <span className="material-symbols-outlined">assignment</span>
              </div>
              <span className="text-sm font-semibold text-slate-gray">Active Projects</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-emerald-dark">14 Projects</span>
              <span className="text-xs text-slate-gray font-semibold mb-1">In progress</span>
            </div>
          </div>
          {/* Sales Revenue */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blockchain-blue/5 rounded-full blur-2xl group-hover:bg-blockchain-blue/10 transition-colors"></div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blockchain-blue/10 flex items-center justify-center rounded-xl text-blockchain-blue">
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <span className="text-sm font-semibold text-slate-gray">Sales Revenue</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-emerald-dark">Rp 892.400.000</span>
              <span className="text-xs text-blockchain-blue font-bold mb-1 flex items-center">
                <span className="material-symbols-outlined text-xs">arrow_upward</span> YTD
              </span>
            </div>
          </div>
        </div>
          {/* Additional Features */}
          <div className="grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4 lg:gap-8 mb-12 relative z-10">
            <ActiveProjects />
            <LiveUpdates />
          </div>
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-emerald-dark/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl border border-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-slate-gray/10 flex justify-between items-center">
              <h3 className="text-xl font-plus font-bold text-emerald-dark">Proposal Proyek Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-gray hover:text-safety-red transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Project Title</label>
                  <input className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" placeholder="e.g., Organic Avocado Expansion" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Commodity</label>
                  <select className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner">
                    <option>Corn</option>
                    <option>Rice</option>
                    <option>Chili</option>
                    <option>Lettuce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Land Area (sqm)</label>
                  <input className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" placeholder="10000" type="number" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Milestone Plan</label>
                  <textarea className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" placeholder="Describe major project phases..." rows={3}></textarea>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-semibold text-slate-gray hover:bg-slate-gray/10 rounded-xl transition-all">Cancel</button>
                <button className="bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all">Submit Proposal</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
