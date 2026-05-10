"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import ActiveProjects from "@/components/dashboard/ActiveProjects";
import LiveUpdates from "@/components/dashboard/LiveUpdates";
import DraftProjects from "@/components/dashboard/DraftProjects";

type FarmerDashboardResponse = {
  success: boolean;
  data?: {
    organizationName: string;
    stats: {
      totalFundingReceivedLabel: string;
      fundingGrowthPercent: number;
      activeProjects: number;
      salesRevenueLabel: string;
      salesLabel: string;
    };
  };
};

export default function FreshChainFarmerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<FarmerDashboardResponse["data"]>();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await fetch('/api/petani/dashboard');
      const json: FarmerDashboardResponse = await res.json();
      if (json.success && json.data) {
        setDashboardData(json.data);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      {/* Header Section */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-plus font-extrabold tracking-tight text-emerald-dark">Farmer Dashboard</h2>
          <p className="text-slate-gray mt-1">Welcome back, {dashboardData?.organizationName ?? "Petani"}. Here is your farm&apos;s performance.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Proposal Proyek Baru
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {/* Total Funding */}
        <div className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-main/5 rounded-full blur-2xl group-hover:bg-emerald-main/10 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-main/10 flex items-center justify-center rounded-xl text-emerald-main">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-sm font-semibold text-slate-gray">Total Funding Received</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-emerald-dark">{dashboardData?.stats.totalFundingReceivedLabel ?? "Rp 0"}</span>
            <span className="text-xs text-emerald-main font-bold mb-1 flex items-center">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              +{dashboardData?.stats.fundingGrowthPercent ?? 0}%
            </span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-golden-harvest/5 rounded-full blur-2xl group-hover:bg-golden-harvest/10 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-golden-harvest/10 flex items-center justify-center rounded-xl text-golden-harvest">
              <span className="material-symbols-outlined">assignment</span>
            </div>
            <span className="text-sm font-semibold text-slate-gray">Active Projects</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-emerald-dark">{dashboardData?.stats.activeProjects ?? 0} Projects</span>
            <span className="text-xs text-slate-gray font-semibold mb-1">In progress</span>
          </div>
        </div>

        {/* Sales Revenue */}
        <div className="bg-white/70 backdrop-blur-md border border-white/50 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blockchain-blue/5 rounded-full blur-2xl group-hover:bg-blockchain-blue/10 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blockchain-blue/10 flex items-center justify-center rounded-xl text-blockchain-blue">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <span className="text-sm font-semibold text-slate-gray">Sales Revenue</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-emerald-dark">{dashboardData?.stats.salesRevenueLabel ?? "Rp 0"}</span>
            <span className="text-xs text-blockchain-blue font-bold mb-1 flex items-center">
              <span className="material-symbols-outlined text-xs">arrow_upward</span>
              {dashboardData?.stats.salesLabel ?? "-"}
            </span>
          </div>
        </div>
      </div>

      <DraftProjects />

      {/* Additional Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <ActiveProjects />
        <LiveUpdates />
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-emerald-dark/20 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl border border-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-slate-gray/10 flex justify-between items-center">
              <h3 className="text-xl font-plus font-bold text-emerald-dark">Proposal Proyek Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-gray hover:text-safety-red transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Project Title</label>
                  <input className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" placeholder="e.g., Organic Avocado Expansion" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Commodity</label>
                  <select className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner">
                    <option>Corn</option><option>Rice</option><option>Chili</option><option>Lettuce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Land Area (sqm)</label>
                  <input className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" placeholder="10000" type="number" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Milestone Plan</label>
                  <textarea className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" placeholder="Describe major project phases..." rows={3} />
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
    </>
  );
}
