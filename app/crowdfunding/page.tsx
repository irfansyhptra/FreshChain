"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Campaign = {
  _id: string;
  title: string;
  description: string;
  commodity: string;
  landArea: number;
  targetHarvest: string;
  targetAmount: number;
  currentAmount: number;
  status: "Funding" | "In_Progress" | "Completed";
  bannerUrl?: string;
  createdAt: string;
  investmentTerms?: {
    minInvestment: number;
    profitSharing: number;
    fundingDeadline: string;
  };
};

const STATUS_MAP = {
  Funding:     { label: "Pendanaan",  color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500 animate-pulse" },
  In_Progress: { label: "Berjalan",   color: "bg-blue-100 text-blue-700",       dot: "bg-blue-500" },
  Completed:   { label: "Selesai",    color: "bg-slate-100 text-slate-500",      dot: "bg-slate-400" },
};

const COMMODITY_ICON: Record<string, string> = {
  "Cabe Rawit": "🌶️", "Padi Organik": "🌾",
  "Jagung Hibrida": "🌽", "Sayuran Hidroponik": "🥬",
};

function fmtCompact(n: number) {
  return new Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

const FILTER_OPTIONS = [
  { key: "all", label: "Semua Proyek" },
  { key: "Funding", label: "Sedang Pendanaan" },
  { key: "In_Progress", label: "Berjalan" },
  { key: "Completed", label: "Selesai" },
];

export default function CrowdfundingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetch("/api/crowdfunding")
      .then(r => r.json())
      .then(j => { if (j.success) setCampaigns(j.data); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = campaigns.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = c.title.toLowerCase().includes(q) || (c.commodity || "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const progress = (c: Campaign) =>
    c.targetAmount > 0 ? Math.min(100, (c.currentAmount / c.targetAmount) * 100) : 0;

  const daysLeft = (deadline?: string) => {
    if (!deadline) return null;
    return Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000));
  };

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased pb-24 lg:pb-0">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* ── Top Navbar (same as Marketplace) ── */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
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
            <div className="hidden lg:flex items-center bg-white border border-slate-200/60 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-main/20 focus-within:border-emerald-main/40 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
              <input
                type="text"
                placeholder="Cari proyek pertanian..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-emerald-dark w-48 ml-2 placeholder:text-slate-400"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>

            <Link href="/investor/dashboard" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-main bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">show_chart</span>
                Kelola Investasi
            </Link>

            <Link href="/marketplace/orders" title="Keranjang & Pesanan" className="relative hidden sm:flex items-center p-2 text-slate-500 hover:text-emerald-main hover:bg-emerald-50 rounded-full transition-all">
                <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
            </Link>

            <button className="hidden sm:flex items-center gap-2 bg-emerald-main text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-main/20 hover:bg-emerald-600 hover:shadow-emerald-main/40 active:scale-95 transition-all text-sm">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>Saldo</span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden hidden sm:block">
              <img src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        {/* ── Page Header ── */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-dark font-plus mb-2">
                Proyek Crowdfunding
              </h1>
              <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
                Danai proyek pertanian lokal dan raih keuntungan nyata. Dana 100% aman — dikembalikan jika target tidak tercapai.
              </p>
            </div>
            {/* Quick stats */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {[
                { icon: "campaign", val: campaigns.filter(c => c.status === "Funding").length, label: "Aktif" },
                { icon: "people",   val: campaigns.length, label: "Total" },
                { icon: "verified", val: campaigns.filter(c => c.status === "Completed").length, label: "Selesai" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <span className="material-symbols-outlined text-emerald-main text-[18px] block mx-auto">{s.icon}</span>
                  <p className="text-base font-extrabold text-emerald-dark leading-none">{s.val}</p>
                  <p className="text-[10px] text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter chips (same pill style as marketplace) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {FILTER_OPTIONS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  filterStatus === f.key
                    ? "bg-emerald-main text-white shadow-sm shadow-emerald-main/20"
                    : "bg-white/60 backdrop-blur-md border border-white/50 text-slate-600 hover:bg-white hover:text-emerald-dark"
                }`}
              >
                {f.label}
              </button>
            ))}
            {/* Mobile search pill */}
            <div className="flex lg:hidden items-center bg-white border border-slate-200/60 rounded-full px-3 py-2 ml-1">
              <span className="material-symbols-outlined text-slate-400 text-[16px]">search</span>
              <input
                type="text"
                placeholder="Cari..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-28 ml-1 placeholder:text-slate-400"
              />
            </div>
          </div>
        </section>

        {/* ── Skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-3 animate-pulse">
                <div className="h-48 rounded-2xl bg-slate-100 mb-4" />
                <div className="space-y-2 px-2">
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3 w-1/2 bg-slate-100 rounded" />
                  <div className="h-2 w-full bg-slate-100 rounded-full mt-3" />
                  <div className="h-10 bg-slate-100 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-4 text-emerald-300">
              <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <h3 className="font-bold text-emerald-dark text-lg mb-1">Tidak ada proyek ditemukan</h3>
            <p className="text-slate-400 text-sm max-w-xs">Coba ubah filter atau kata kunci pencarian Anda.</p>
          </div>
        )}

        {/* ── Campaign Grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(c => {
              const pct = progress(c);
              const st = STATUS_MAP[c.status] || STATUS_MAP.Funding;
              const icon = COMMODITY_ICON[c.commodity] || "🌿";
              const dl = daysLeft(c.investmentTerms?.fundingDeadline);

              return (
                <Link
                  href={`/crowdfunding/${c._id}`}
                  key={c._id}
                  className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Banner */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    {c.bannerUrl ? (
                      <Image
                        src={c.bannerUrl}
                        alt={c.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                        <span className="text-5xl mb-1">{icon}</span>
                        <span className="text-xs font-semibold tracking-widest uppercase">Pertanian</span>
                      </div>
                    )}
                    {/* Status badge */}
                    <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${st.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {st.label}
                    </div>
                    {/* Days left */}
                    {dl !== null && c.status === "Funding" && (
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[12px]">timer</span>
                        {dl}h lagi
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="px-3 pb-3 flex flex-col flex-1">
                    {/* Commodity tag */}
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2">
                      {icon} {c.commodity || "Umum"}
                    </span>

                    <h3 className="text-base font-bold text-emerald-dark leading-snug group-hover:text-emerald-main transition-colors line-clamp-2 mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">{c.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-500 font-semibold mb-1.5">
                        <span>Terkumpul</span>
                        <span className="text-emerald-700 font-bold">{pct.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-main to-[#10B981] rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1.5">
                        <span>Rp {fmtCompact(c.currentAmount)}</span>
                        <span>dari Rp {fmtCompact(c.targetAmount)}</span>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-main">landscape</span>
                        {c.landArea} Ha
                      </span>
                      <span className="w-px h-3 bg-slate-200" />
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-main">pie_chart</span>
                        {c.investmentTerms?.profitSharing ?? "—"}% ROI
                      </span>
                      <span className="w-px h-3 bg-slate-200" />
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-main">payments</span>
                        Min Rp {fmtCompact(c.investmentTerms?.minInvestment ?? 0)}
                      </span>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border border-slate-200 bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-xs">
                          PT
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-700">Petani Terverifikasi</p>
                          <div className="flex items-center text-[10px] text-amber-500 font-medium">
                            <span className="material-symbols-outlined text-[12px] mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            Terverifikasi FreshChain
                          </div>
                        </div>
                      </div>
                      <button className="bg-emerald-50 text-emerald-main p-2.5 rounded-xl hover:bg-emerald-main hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[20px]">trending_up</span>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Bottom Nav (identical to Marketplace) ── */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 flex items-center justify-around py-3 z-50 shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
        <a href="/marketplace" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">storefront</span>
          <span className="text-[10px] font-semibold">Shop</span>
        </a>
        <a href="/crowdfunding" className="flex flex-col items-center gap-1 text-emerald-main">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
          <span className="text-[10px] font-bold">Proyek</span>
        </a>
        <a href="/traceability" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors relative -top-4">
          <div className="bg-gradient-to-r from-emerald-main to-[#10B981] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-main/30 active:scale-95 transition-transform border-4 border-frosted-white">
            <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
          </div>
        </a>
        <a href="/petani/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-semibold">Panel</span>
        </a>
        <a href="/petani/wallet" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
          <span className="text-[10px] font-semibold">Wallet</span>
        </a>
      </nav>
    </div>
  );
}
