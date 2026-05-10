"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CampaignForm from "@/components/crowdfunding/CampaignForm";

export default function CrowdfundingEdit() {
  const params = useParams();
  const id = params.id as string;
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await fetch(`/api/petani/campaigns/${id}`);
        const json = await res.json();
        
        if (json.success) {
          setInitialData(json.data);
        } else {
          setError(json.message || "Gagal memuat data draft");
        }
      } catch (err: any) {
        setError(err.message || "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDraft();
    }
  }, [id]);

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
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 lg:w-[calc(100%-16rem)] max-w-full w-full pt-10 pb-16 px-6 lg:px-12 max-w-7xl relative mx-auto">
        <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-light/20 rounded-full blur-[120px] pointer-events-none" />

        <header className="flex justify-between items-center mb-10 relative z-10 w-full">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-bold tracking-tight text-emerald-dark">Project Editor</h2>
          </div>
        </header>

        <div className="mb-10 relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-dark font-plus tracking-tight mb-2">Edit Draft Proyek</h2>
          <p className="text-slate-gray">Lanjutkan pengisian form untuk mempublikasikan proyek Anda.</p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-emerald-dark font-semibold relative z-10">
            <span className="material-symbols-outlined animate-spin">refresh</span>
            Memuat Data Draft...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-xl font-semibold relative z-10">{error}</div>
        ) : (
          <CampaignForm isEdit={true} campaignId={id} initialData={initialData} />
        )}

      </main>
    </div>
  );
}
