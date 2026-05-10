"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────
type Investor = { _id: string; name?: string; email?: string; phone?: string };
type Investment = { _id: string; amount: number; status: string; investedAt: string; investor: Investor };
type Campaign = {
  _id: string; title: string; commodity: string; landArea: number;
  bannerUrl?: string; targetAmount: number; currentAmount: number;
  status: "Funding" | "In_Progress" | "Completed" | "Failed";
  createdAt: string; investorCount: number;
  investmentTerms?: { minInvestment: number; profitSharing: number; fundingDeadline: string };
  investments: Investment[];
};
type Summary = { totalFunded: number; totalInvestors: number; activeCount: number; completedCount: number };

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Funding:     { label: "Sedang Pendanaan", bg: "bg-emerald-100", text: "text-emerald-700",  dot: "bg-emerald-500 animate-pulse", icon: "campaign" },
  In_Progress: { label: "Berjalan",          bg: "bg-blue-100",   text: "text-blue-700",     dot: "bg-blue-500",                  icon: "engineering" },
  Completed:   { label: "Selesai",            bg: "bg-slate-100",  text: "text-slate-600",   dot: "bg-slate-400",                  icon: "check_circle" },
  Failed:      { label: "Gagal",              bg: "bg-red-100",    text: "text-red-600",     dot: "bg-red-400",                    icon: "cancel" },
};
const INV_STATUS = {
  Active:     { label: "Aktif",     color: "text-emerald-600 bg-emerald-50" },
  Refunded:   { label: "Dikembalikan", color: "text-amber-600 bg-amber-50" },
  ProfitPaid: { label: "Profit Cair", color: "text-blue-600 bg-blue-50"   },
};
const COMMODITY_ICON: Record<string, string> = {
  "Cabe Rawit": "🌶️", "Padi Organik": "🌾", "Jagung Hibrida": "🌽", "Sayuran Hidroponik": "🥬",
};
const fmt = (n: number) => new Intl.NumberFormat("id-ID").format(n);
const fmtK = (n: number) => new Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 }).format(n);
const timeAgo = (d: string) => {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function MyProjectsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/petani/my-projects");
      const json = await res.json();
      if (json.success) {
        setCampaigns(json.data);
        setSummary(json.summary);
        if (!selectedId && json.data.length > 0) setSelectedId(json.data[0]._id);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedId]);

  useEffect(() => {
    fetchData();
    // Real-time polling every 30 seconds
    const interval = setInterval(() => fetchData(false), 30000);
    return () => clearInterval(interval);
  }, []);

  const filtered = campaigns.filter(c => filterStatus === "all" || c.status === filterStatus);
  const selected = campaigns.find(c => c._id === selectedId) || null;
  const progress = (c: Campaign) => c.targetAmount > 0 ? Math.min(100, (c.currentAmount / c.targetAmount) * 100) : 0;

  // ── Skeleton ─────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white/70 rounded-2xl border border-white/50 animate-pulse" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          {[1,2].map(i => <div key={i} className="h-40 bg-white/70 rounded-2xl border border-white/50 animate-pulse" />)}
        </div>
        <div className="lg:col-span-2 h-96 bg-white/70 rounded-2xl border border-white/50 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-dark font-plus tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-main">folder_special</span>
            Proyek Saya
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">Pantau proyek yang sudah dipublikasikan dan investor Anda</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white/70 border border-white/50 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white transition-colors shadow-sm"
          >
            <span className={`material-symbols-outlined text-[18px] text-emerald-main ${refreshing ? "animate-spin" : ""}`}>refresh</span>
            {refreshing ? "Memperbarui..." : "Perbarui"}
          </button>
          <Link href="/petani/crowdfunding" className="flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Proyek Baru
          </Link>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "payments", label: "Total Terkumpul", value: `Rp ${fmtK(summary.totalFunded)}`, sub: "dari semua proyek", color: "text-emerald-main", bg: "bg-emerald-50" },
            { icon: "people", label: "Total Investor", value: summary.totalInvestors.toString(), sub: "investor aktif", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: "campaign", label: "Sedang Pendanaan", value: summary.activeCount.toString(), sub: "proyek aktif", color: "text-amber-500", bg: "bg-amber-50" },
            { icon: "check_circle", label: "Proyek Selesai", value: summary.completedCount.toString(), sub: "berhasil diselesaikan", color: "text-slate-500", bg: "bg-slate-50" },
          ].map(s => (
            <div key={s.label} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <span className={`material-symbols-outlined ${s.color} text-[22px]`}>{s.icon}</span>
              </div>
              <p className="text-xl font-extrabold text-emerald-dark leading-none">{s.value}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{s.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Empty State ── */}
      {campaigns.length === 0 && (
        <div className="text-center py-16 bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl text-slate-300">folder_open</span>
          </div>
          <h3 className="font-bold text-slate-700 text-lg mb-1">Belum ada proyek dipublikasikan</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">Proyek yang sudah dipublikasikan akan tampil di sini beserta data investornya.</p>
          <Link href="/petani/crowdfunding" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Buat Proyek Sekarang
          </Link>
        </div>
      )}

      {/* ── Main Panel (List + Detail) ── */}
      {campaigns.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Project List */}
          <div className="space-y-3">
            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[
                { k: "all", l: "Semua" },
                { k: "Funding", l: "Pendanaan" },
                { k: "In_Progress", l: "Berjalan" },
                { k: "Completed", l: "Selesai" },
              ].map(f => (
                <button
                  key={f.k}
                  onClick={() => setFilterStatus(f.k)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filterStatus === f.k
                      ? "bg-emerald-main text-white shadow-sm"
                      : "bg-white/60 text-slate-500 border border-white/50 hover:text-emerald-main"
                  }`}
                >
                  {f.l}
                </button>
              ))}
            </div>

            {filtered.map(c => {
              const st = STATUS_CONFIG[c.status] || STATUS_CONFIG.Funding;
              const pct = progress(c);
              const icon = COMMODITY_ICON[c.commodity] || "🌿";
              const isActive = selectedId === c._id;

              return (
                <button
                  key={c._id}
                  onClick={() => setSelectedId(c._id)}
                  className={`w-full text-left bg-white/70 backdrop-blur-md border rounded-2xl p-4 transition-all shadow-sm hover:shadow-md ${
                    isActive ? "border-emerald-main/50 ring-2 ring-emerald-main/20 shadow-md" : "border-white/50 hover:border-emerald-100"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    {/* Banner thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                      {c.bannerUrl ? (
                        <Image src={c.bannerUrl} alt={c.title} fill className="object-cover" sizes="56px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">{icon}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${st.bg} ${st.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{c.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{c.investorCount} investor · {timeAgo(c.createdAt)}</p>
                      {/* Mini progress */}
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-main to-[#10B981] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span className="font-semibold text-emerald-700">Rp {fmtK(c.currentAmount)}</span>
                        <span>{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Project Detail Panel */}
          {selected ? (
            <div className="lg:col-span-2 space-y-5">
              {/* Header card */}
              <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl overflow-hidden shadow-sm">
                <div className="relative h-44 bg-gradient-to-br from-emerald-dark to-emerald-main overflow-hidden">
                  {selected.bannerUrl ? (
                    <Image src={selected.bannerUrl} alt={selected.title} fill className="object-cover opacity-60" sizes="100vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20">
                      {COMMODITY_ICON[selected.commodity] || "🌿"}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-2 mb-1">
                      {(() => {
                        const st = STATUS_CONFIG[selected.status] || STATUS_CONFIG.Funding;
                        return (
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                            {st.label}
                          </span>
                        );
                      })()}
                      <span className="text-white/60 text-xs">{selected.commodity}</span>
                    </div>
                    <h2 className="text-xl font-extrabold text-white font-plus leading-tight">{selected.title}</h2>
                  </div>
                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white text-[10px] font-bold uppercase">Live</span>
                  </div>
                </div>

                {/* Progress section */}
                <div className="p-5">
                  <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2">
                    <span>Dana Terkumpul</span>
                    <span className="text-emerald-700 font-bold">{progress(selected).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-main to-[#10B981] rounded-full transition-all duration-1000"
                      style={{ width: `${progress(selected)}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-emerald-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-emerald-500 font-semibold mb-0.5">Terkumpul</p>
                      <p className="font-extrabold text-emerald-dark text-base">Rp {fmtK(selected.currentAmount)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400 font-semibold mb-0.5">Target</p>
                      <p className="font-extrabold text-slate-700 text-base">Rp {fmtK(selected.targetAmount)}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-blue-400 font-semibold mb-0.5">Investor</p>
                      <p className="font-extrabold text-blue-700 text-base">{selected.investorCount}</p>
                    </div>
                  </div>

                  {selected.investmentTerms && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-emerald-main text-[16px]">pie_chart</span>
                        <span className="text-slate-400">Bagi Hasil:</span>
                        <span className="font-bold text-slate-700">{selected.investmentTerms.profitSharing}%</span>
                      </div>
                      {selected.investmentTerms.fundingDeadline && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-amber-500 text-[16px]">timer</span>
                          <span className="text-slate-400">Deadline:</span>
                          <span className="font-bold text-slate-700">
                            {new Date(selected.investmentTerms.fundingDeadline).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/crowdfunding/${selected._id}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm font-bold text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      Halaman Publik
                    </Link>
                    <Link
                      href={`/petani/crowdfunding/${selected._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-sm font-bold text-emerald-main bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      Edit Proyek
                    </Link>
                  </div>
                </div>
              </div>

              {/* Investor List */}
              <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-emerald-dark flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-main text-[20px]">group</span>
                    Daftar Investor
                    <span className="ml-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">
                      {selected.investments.length}
                    </span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    Total: <span className="text-emerald-700 font-bold">Rp {fmt(selected.currentAmount)}</span>
                  </span>
                </div>

                {selected.investments.length === 0 ? (
                  <div className="text-center py-10">
                    <span className="material-symbols-outlined text-4xl text-slate-200 block mb-2">person_search</span>
                    <p className="text-slate-400 text-sm font-semibold">Belum ada investor</p>
                    <p className="text-slate-300 text-xs mt-1">Bagikan link proyek Anda untuk menarik investor</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selected.investments.map((inv, idx) => {
                      const invSt = INV_STATUS[inv.status as keyof typeof INV_STATUS] || INV_STATUS.Active;
                      const pct = selected.currentAmount > 0 ? ((inv.amount / selected.currentAmount) * 100).toFixed(1) : "0";
                      const initials = inv.investor?.name
                        ? inv.investor.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
                        : "IN";
                      const bgColors = ["bg-emerald-100 text-emerald-700", "bg-blue-100 text-blue-700", "bg-amber-100 text-amber-700", "bg-purple-100 text-purple-700"];
                      const avatarColor = bgColors[idx % bgColors.length];

                      return (
                        <div key={inv._id} className="flex items-center gap-3 p-3 bg-slate-50/60 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                          {/* Avatar */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${avatarColor}`}>
                            {initials}
                          </div>
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-800 text-sm">{inv.investor?.name || "Investor Anonim"}</p>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${invSt.color}`}>{invSt.label}</span>
                            </div>
                            <p className="text-[11px] text-slate-400">{inv.investor?.email || "—"} · {timeAgo(inv.investedAt)}</p>
                            {/* Share bar */}
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-[10px] text-slate-400 font-semibold">{pct}%</span>
                            </div>
                          </div>
                          {/* Amount */}
                          <div className="text-right flex-shrink-0">
                            <p className="font-extrabold text-emerald-dark text-sm">Rp {fmtK(inv.amount)}</p>
                            <p className="text-[10px] text-slate-400">investasi</p>
                          </div>
                        </div>
                      );
                    })}

                    {/* Total summary row */}
                    <div className="flex items-center justify-between bg-emerald-dark text-white px-4 py-3 rounded-2xl mt-2">
                      <span className="font-bold text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">payments</span>
                        Total Dana Masuk
                      </span>
                      <span className="font-extrabold text-base">Rp {fmt(selected.currentAmount)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 flex items-center justify-center bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-10 text-center">
              <div>
                <span className="material-symbols-outlined text-5xl text-slate-200 block mb-3">touch_app</span>
                <p className="text-slate-400 font-semibold">Pilih proyek di sebelah kiri untuk melihat detail</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
