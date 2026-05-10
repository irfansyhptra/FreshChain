"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type DraftCampaign = {
  _id: string;
  title: string;
  commodity: string;
  landArea: number;
  targetAmount: number;
  createdAt: string;
  bannerUrl?: string;
  status: string;
  investmentTerms?: {
    fundingDeadline?: string;
    profitSharing?: number;
    minInvestment?: number;
  };
};

const COMMODITY_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  "Cabe Rawit":         { bg: "bg-red-50",    text: "text-red-600",    icon: "🌶️" },
  "Padi Organik":       { bg: "bg-amber-50",  text: "text-amber-600",  icon: "🌾" },
  "Jagung Hibrida":     { bg: "bg-yellow-50", text: "text-yellow-600", icon: "🌽" },
  "Sayuran Hidroponik": { bg: "bg-teal-50",   text: "text-teal-600",   icon: "🥬" },
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

export default function DraftProjects() {
  const [drafts, setDrafts] = useState<DraftCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  const [publishing, setPublishing] = useState<string | null>(null);

  const publishDraft = async (id: string) => {
    if (!confirm("Publikasikan proyek ini? Pastikan semua data sudah lengkap.")) return;
    setPublishing(id);
    try {
      const res = await fetch(`/api/petani/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Funding' }),
      });
      const json = await res.json();
      if (json.success) {
        setDrafts(prev => prev.filter(d => d._id !== id));
        alert('Proyek berhasil dipublikasikan! 🚀');
      } else {
        alert('Gagal: ' + json.message);
      }
    } catch {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setPublishing(null);
    }
  };

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch('/api/petani/campaigns/drafts');
        const json = await res.json();
        if (json.success) {
          setDrafts(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch drafts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrafts();
  }, []);

  // --- Skeleton Loader ---
  if (loading) {
    return (
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-7 w-40 bg-slate-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm animate-pulse overflow-hidden">
              <div className="h-36 bg-slate-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                <div className="h-3 w-1/2 bg-slate-100 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="flex-1 h-9 bg-slate-100 rounded-lg" />
                  <div className="flex-1 h-9 bg-emerald-50 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // --- Empty State ---
  if (drafts.length === 0) {
    return (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-plus flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-xl">edit_note</span>
              Draft Proyek
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">Proyek yang belum dipublikasi</p>
          </div>
          <Link href="/petani/crowdfunding" className="flex items-center gap-1.5 text-sm font-bold text-emerald-main bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span> Buat Proyek
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center text-center bg-white border border-dashed border-slate-200 rounded-2xl py-14 px-6">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 text-amber-400">
            <span className="material-symbols-outlined text-3xl">inventory_2</span>
          </div>
          <h4 className="font-bold text-slate-700 mb-1">Belum ada draft proyek</h4>
          <p className="text-sm text-slate-400 max-w-xs">Proyek yang Anda simpan sementara akan muncul di sini. Mulai buat sekarang!</p>
          <Link href="/petani/crowdfunding" className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add_circle</span> Buat Proyek Baru
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-800 font-plus flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-xl">edit_note</span>
            Draft Proyek
            <span className="ml-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-extrabold">
              {drafts.length}
            </span>
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Proyek yang belum dipublikasi</p>
        </div>
        <Link href="/petani/crowdfunding" className="flex items-center gap-1.5 text-sm font-bold text-emerald-main bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors">
          <span className="material-symbols-outlined text-[18px]">add</span> Buat Baru
        </Link>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {drafts.map((draft) => {
          const commodity = COMMODITY_COLORS[draft.commodity] || { bg: "bg-slate-50", text: "text-slate-600", icon: "🌿" };
          const hasBanner = !!draft.bannerUrl;

          return (
            <div key={draft._id} className="group bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-100 transition-all duration-300 overflow-hidden flex flex-col">

              {/* Banner / Placeholder Image */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 flex-shrink-0">
                {hasBanner ? (
                  <Image
                    src={draft.bannerUrl!}
                    alt={draft.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300">
                    <span className="text-5xl">{commodity.icon}</span>
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Belum Ada Banner</span>
                  </div>
                )}

                {/* Draft Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-amber-400/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block"></span>
                    Draft
                  </span>
                </div>

                {/* Time ago overlay */}
                <div className="absolute bottom-3 right-3">
                  <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {timeAgo(draft.createdAt)}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Commodity Tag */}
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-2 ${commodity.bg} ${commodity.text}`}>
                  {commodity.icon} {draft.commodity || "Umum"}
                </span>

                {/* Title */}
                <h4 className="font-bold text-slate-800 text-sm leading-snug mb-3 line-clamp-2 group-hover:text-emerald-dark transition-colors">
                  {draft.title || "Proyek Tanpa Judul"}
                </h4>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                    <div className="text-[10px] font-semibold text-slate-400 mb-0.5 uppercase">Luas Lahan</div>
                    <div className="text-sm font-extrabold text-slate-700">{draft.landArea || "—"} <span className="font-medium text-slate-400">Ha</span></div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-2.5 text-center">
                    <div className="text-[10px] font-semibold text-emerald-400 mb-0.5 uppercase">Target Dana</div>
                    <div className="text-xs font-extrabold text-emerald-700 leading-tight">
                      Rp {new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(draft.targetAmount || 0)}
                    </div>
                  </div>
                </div>

                {/* Profit Sharing badge */}
                {draft.investmentTerms?.profitSharing !== undefined && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <span className="material-symbols-outlined text-[14px] text-emerald-main">pie_chart</span>
                    Bagi Hasil Investor: <span className="font-bold text-emerald-700">{draft.investmentTerms.profitSharing}%</span>
                  </div>
                )}

                {/* Spacer */}
                <div className="mt-auto" />

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/petani/crowdfunding/${draft._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-sm font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-2.5 rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Edit
                  </Link>
                  <button
                    onClick={() => publishDraft(draft._id)}
                    disabled={publishing === draft._id}
                    className="flex-1 flex items-center justify-center gap-1.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-main to-[#10B981] px-3 py-2.5 rounded-xl shadow-md shadow-emerald-100 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:scale-100"
                  >
                    {publishing === draft._id ? (
                      <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                    ) : (
                      <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                    )}
                    {publishing === draft._id ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
