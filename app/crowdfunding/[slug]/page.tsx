"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type ActivityItem = { name: string; costType: string; quantity: number; unit: string; unitPrice: number; total: number; };
type Activity = { milestone: string; name: string; description: string; startDate: string; endDate: string; items: ActivityItem[]; };
type Campaign = {
  _id: string; title: string; description: string; commodity: string; landArea: number; locationGPS?: string;
  targetHarvest?: string; targetAmount: number; currentAmount: number; status: string; bannerUrl?: string;
  createdAt: string; farmerId?: { name?: string; organizationName?: string };
  investmentTerms?: { minInvestment: number; profitSharing: number; fundingDeadline: string; returnIfFailed: boolean; };
  returnSimulation?: { productivity: number; prices: { min: number; normal: number; max: number }; salesPercentages: { min: number; normal: number; max: number }; };
  activities: Activity[];
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  Funding:     { label: "Sedang Pendanaan", color: "bg-emerald-100 text-emerald-700" },
  In_Progress: { label: "Berjalan",          color: "bg-blue-100 text-blue-700" },
  Completed:   { label: "Selesai",            color: "bg-slate-100 text-slate-600" },
  Draft:       { label: "Draft",              color: "bg-amber-100 text-amber-700" },
};
const MILESTONE_COLOR: Record<string, string> = {
  Persiapan: "bg-blue-500", Penanaman: "bg-emerald-500", Pemeliharaan: "bg-amber-500", Panen: "bg-orange-500",
};

function fmt(n: number) { return new Intl.NumberFormat("id-ID").format(n); }
function fmtK(n: number) { return new Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 }).format(n); }

export default function CampaignDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const id = slug;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "rab" | "simulation">("overview");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/crowdfunding/${id}`)
      .then(r => r.json())
      .then(j => { if (j.success) setCampaign(j.data); else setError(j.message); })
      .catch(() => setError("Gagal memuat data"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="bg-frosted-white min-h-screen flex items-center justify-center font-inter">
      <div className="flex flex-col items-center gap-3 text-emerald-main">
        <span className="material-symbols-outlined text-5xl animate-spin">refresh</span>
        <p className="font-semibold text-slate-500">Memuat detail proyek...</p>
      </div>
    </div>
  );

  if (error || !campaign) return (
    <div className="bg-frosted-white min-h-screen flex items-center justify-center font-inter">
      <div className="text-center p-8 bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl shadow-sm max-w-sm">
        <span className="material-symbols-outlined text-4xl text-red-400 mb-3 block">error</span>
        <h2 className="font-bold text-emerald-dark font-plus mb-1">Proyek Tidak Ditemukan</h2>
        <p className="text-sm text-slate-400 mb-4">{error}</p>
        <Link href="/crowdfunding" className="text-emerald-main font-bold text-sm">← Kembali ke Daftar</Link>
      </div>
    </div>
  );

  const progress = campaign.targetAmount > 0 ? Math.min(100, (campaign.currentAmount / campaign.targetAmount) * 100) : 0;
  const status = STATUS_MAP[campaign.status] || STATUS_MAP.Funding;
  const deadline = campaign.investmentTerms?.fundingDeadline ? new Date(campaign.investmentTerms.fundingDeadline) : null;
  const daysLeft = deadline ? Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / 86400000)) : null;
  const milestoneGroups = ["Persiapan", "Penanaman", "Pemeliharaan", "Panen"].map(ms => ({
    name: ms,
    activities: campaign.activities.filter(a => a.milestone === ms),
    total: campaign.activities.filter(a => a.milestone === ms).reduce((s, a) => s + a.items.reduce((ss, i) => ss + (i.total || 0), 0), 0),
  }));
  const totalRAB = milestoneGroups.reduce((s, m) => s + m.total, 0);
  const sim = (type: "min" | "normal" | "max") => {
    if (!campaign.returnSimulation) return null;
    const estH = (campaign.landArea || 0) * campaign.returnSimulation.productivity;
    const sp = campaign.returnSimulation.salesPercentages[type] / 100;
    const price = campaign.returnSimulation.prices[type];
    const gross = estH * sp * price;
    const net = gross - totalRAB;
    const pFee = net > 0 ? net * 0.05 : 0;
    const distrib = net > 0 ? net - pFee : 0;
    const iShare = (campaign.investmentTerms?.profitSharing ?? 0) / 100;
    return { estH, soldKg: estH * sp, gross, net, pFee, investorProfit: distrib * iShare, farmerProfit: distrib * (1 - iShare) };
  };

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased pb-24 lg:pb-0">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navbar — same as Marketplace */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="text-2xl font-extrabold text-emerald-dark tracking-tight font-plus">
              FreshChain
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/marketplace" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">Marketplace</Link>
              <Link href="/crowdfunding" className="text-emerald-main font-semibold text-sm border-b-2 border-emerald-main py-2">Projects</Link>
              <Link href="/traceability" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">Traceability</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/crowdfunding" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span> Daftar Proyek
            </Link>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-emerald-main text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-main/20 hover:opacity-90 active:scale-95 transition-all text-sm">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>Saldo</span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden hidden sm:block">
              <img src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-emerald-dark to-emerald-main overflow-hidden">
        {campaign.bannerUrl ? (
          <Image src={campaign.bannerUrl} alt={campaign.title} fill sizes="100vw" className="object-cover opacity-60" priority />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">🌿</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full ${status.color}`}>{status.label}</span>
            {campaign.commodity && (
              <span className="text-[11px] font-bold text-white bg-white/20 backdrop-blur px-2.5 py-1 rounded-full">{campaign.commodity}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-plus leading-tight drop-shadow-sm">
            {campaign.title}
          </h1>
          {campaign.farmerId && (
            <p className="text-white/70 text-sm mt-1">oleh {campaign.farmerId.organizationName || campaign.farmerId.name || "Petani Terverifikasi"}</p>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* LEFT: Detail Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-1 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-1 shadow-sm w-fit">
            {[
              { key: "overview", label: "Gambaran Umum", icon: "info" },
              { key: "rab", label: "RAB & Milestone", icon: "receipt_long" },
              { key: "simulation", label: "Simulasi Bagi Hasil", icon: "monitoring" },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.key ? "bg-emerald-main text-white shadow-sm" : "text-slate-500 hover:text-emerald-main"
                }`}>
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── Tab: Overview ── */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-sm">
                <h2 className="font-bold text-emerald-dark text-base mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-main text-[20px]">description</span>
                  Deskripsi Proyek
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">{campaign.description || "Tidak ada deskripsi."}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "landscape", label: "Luas Lahan", value: `${campaign.landArea} Ha` },
                  { icon: "location_on", label: "Lokasi", value: campaign.locationGPS || "—" },
                  { icon: "event", label: "Target Panen", value: campaign.targetHarvest || "—" },
                  { icon: "calendar_today", label: "Dibuat", value: new Date(campaign.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) },
                ].map(item => (
                  <div key={item.label} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-sm">
                    <span className="material-symbols-outlined text-emerald-main text-[18px] block mb-1">{item.icon}</span>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase mb-0.5">{item.label}</div>
                    <div className="text-sm font-bold text-slate-700 break-words">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-sm">
                <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-main text-[20px]">verified_user</span>
                  Perlindungan Investor
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl">
                    <span className="material-symbols-outlined text-emerald-main mt-0.5 text-[18px]">payments</span>
                    <div><p className="text-sm font-bold text-slate-700">Pengembalian Modal + Profit</p><p className="text-xs text-slate-500 mt-0.5">Modal awal 100% + profit dikembalikan otomatis setelah proyek selesai via Smart Contract.</p></div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <span className="material-symbols-outlined text-blue-500 mt-0.5 text-[18px]">security</span>
                    <div><p className="text-sm font-bold text-slate-700">Refund 100% Jika Gagal Target</p><p className="text-xs text-slate-500 mt-0.5">Dana dikembalikan penuh apabila target pendanaan tidak terpenuhi sebelum deadline.</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: RAB ── */}
          {activeTab === "rab" && (
            <div className="space-y-6">
              {/* Milestone Timeline */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="font-bold text-slate-800 text-base mb-5">Timeline Milestone</h2>
                <div className="relative flex justify-between items-start">
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-100 z-0" />
                  {milestoneGroups.map((ms, i) => (
                    <div key={ms.name} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-4 ring-white shadow ${ms.total > 0 ? MILESTONE_COLOR[ms.name] || "bg-slate-400" : "bg-slate-200"}`}>{i + 1}</div>
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${ms.total > 0 ? "text-slate-700" : "text-slate-400"}`}>{ms.name}</span>
                      <span className={`text-xs font-extrabold ${ms.total > 0 ? "text-emerald-700" : "text-slate-300"}`}>Rp {fmtK(ms.total)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RAB Detail per Milestone */}
              {milestoneGroups.filter(ms => ms.activities.length > 0).map(ms => (
                <div key={ms.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className={`flex items-center justify-between px-6 py-4 border-l-4 ${MILESTONE_COLOR[ms.name] || "border-slate-400"}`}>
                    <h3 className="font-bold text-slate-800">{ms.name}</h3>
                    <span className="text-sm font-extrabold text-emerald-dark">Rp {fmt(ms.total)}</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {ms.activities.map((act, ai) => (
                      <div key={ai} className="px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-slate-700 text-sm">{act.name || `Kegiatan ${ai + 1}`}</p>
                            {act.startDate && <p className="text-[11px] text-slate-400 mt-0.5">{new Date(act.startDate).toLocaleDateString("id-ID")} — {act.endDate ? new Date(act.endDate).toLocaleDateString("id-ID") : "?"}</p>}
                          </div>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                            Rp {fmt(act.items.reduce((s, i) => s + (i.total || 0), 0))}
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-slate-50 text-slate-400 font-semibold uppercase tracking-wide">
                                <th className="text-left py-2 px-3 rounded-l-lg">Item</th>
                                <th className="text-left py-2 px-2">Jenis</th>
                                <th className="text-center py-2 px-2">Qty</th>
                                <th className="text-right py-2 px-2">Harga Satuan</th>
                                <th className="text-right py-2 px-3 rounded-r-lg">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {act.items.map((item, ii) => (
                                <tr key={ii} className="hover:bg-slate-50/50">
                                  <td className="py-2 px-3 font-medium text-slate-700">{item.name || "—"}</td>
                                  <td className="py-2 px-2"><span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{item.costType}</span></td>
                                  <td className="py-2 px-2 text-center text-slate-500">{item.quantity} {item.unit}</td>
                                  <td className="py-2 px-2 text-right text-slate-500">Rp {fmt(item.unitPrice)}</td>
                                  <td className="py-2 px-3 text-right font-bold text-emerald-700">Rp {fmt(item.total)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center bg-emerald-dark text-white px-6 py-4 rounded-2xl shadow-lg">
                <span className="font-bold">Total RAB (Target Pendanaan)</span>
                <span className="text-xl font-extrabold">Rp {fmt(totalRAB)}</span>
              </div>
            </div>
          )}

          {/* ── Tab: Simulation ── */}
          {activeTab === "simulation" && (
            <div className="space-y-4">
              {!campaign.returnSimulation ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-400">Data simulasi belum tersedia.</div>
              ) : (
                [
                  { type: "normal" as const, label: "Skenario Normal", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
                  { type: "max" as const,    label: "Skenario Terbaik", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
                  { type: "min" as const,    label: "Skenario Terburuk", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
                ].map(({ type, label, bg, border, text }) => {
                  const s = sim(type);
                  if (!s) return null;
                  return (
                    <div key={type} className={`${bg} border ${border} rounded-2xl p-5`}>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className={`font-bold ${text}`}>{label}</h3>
                        <span className="text-xs text-slate-500 font-semibold">{fmt(Math.round(s.soldKg))} Kg Terjual</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        {[
                          { label: "Est. Total Panen", value: `${fmt(Math.round(s.estH))} Kg` },
                          { label: "Pendapatan Kotor", value: `Rp ${fmt(Math.round(s.gross))}`, bold: true },
                          { label: "Total Modal (RAB)", value: `- Rp ${fmt(totalRAB)}`, color: "text-red-500" },
                          { label: "Keuntungan Bersih", value: `Rp ${fmt(Math.round(s.net))}`, bold: true, color: s.net > 0 ? "text-emerald-600" : "text-red-600" },
                        ].map(row => (
                          <div key={row.label} className="flex justify-between">
                            <span className="text-slate-500">{row.label}</span>
                            <span className={`${row.bold ? "font-bold" : ""} ${row.color || "text-slate-700"}`}>{row.value}</span>
                          </div>
                        ))}
                        {s.net > 0 && (
                          <div className="pt-3 mt-2 border-t border-white/60 space-y-2">
                            <div className="flex justify-between text-xs"><span className="text-slate-400">Platform Fee (5%)</span><span className="font-semibold">- Rp {fmt(Math.round(s.pFee))}</span></div>
                            <div className="flex justify-between text-xs"><span className="text-slate-400">Profit Petani ({100 - (campaign.investmentTerms?.profitSharing ?? 0)}%)</span><span className="font-bold text-emerald-700">Rp {fmt(Math.round(s.farmerProfit))}</span></div>
                            <div className={`${bg} border ${border} rounded-xl p-3 mt-2`}>
                              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Total Pencairan Investor</p>
                              <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Pengembalian Modal</span><span>Rp {fmt(totalRAB)}</span></div>
                              <div className="flex justify-between text-xs mb-2"><span className="text-slate-500">Profit ({campaign.investmentTerms?.profitSharing}%)</span><span className={`font-bold ${text}`}>+ Rp {fmt(Math.round(s.investorProfit))}</span></div>
                              <div className="flex justify-between font-black text-base"><span>Total Cair</span><span className="text-emerald-main">Rp {fmt(totalRAB + Math.round(s.investorProfit))}</span></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Investment Sidebar */}
        <div className="space-y-5">
          {/* Progress Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-28">
            <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2">
              <span>Dana Terkumpul</span>
              <span className="text-emerald-700 font-bold">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-emerald-main to-[#10B981] rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mb-4">
              <span className="font-bold text-emerald-dark text-base">Rp {fmtK(campaign.currentAmount)}</span>
              <span>dari Rp {fmtK(campaign.targetAmount)}</span>
            </div>
            {daysLeft !== null && (
              <div className={`flex items-center gap-2 p-3 rounded-xl mb-4 ${daysLeft <= 3 ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"}`}>
                <span className="material-symbols-outlined text-[18px]">timer</span>
                <span className="text-sm font-bold">{daysLeft} hari tersisa</span>
              </div>
            )}
            {campaign.investmentTerms && (
              <div className="space-y-2 mb-5">
                {[
                  { label: "Minimal Investasi", value: `Rp ${fmt(campaign.investmentTerms.minInvestment)}` },
                  { label: "Bagi Hasil Investor", value: `${campaign.investmentTerms.profitSharing}%` },
                  { label: "Batas Pendanaan", value: deadline ? deadline.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "—" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-bold text-slate-700">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full bg-gradient-to-r from-emerald-main to-[#10B981] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              Investasi Sekarang
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2">Dana aman — 100% refund jika gagal target</p>
          </div>

          {/* Info Lahan */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-main text-[18px]">landscape</span>
              Info Lahan & Komoditas
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Komoditas", value: campaign.commodity || "—" },
                { label: "Luas Lahan", value: `${campaign.landArea} Hektar` },
                { label: "Target Panen", value: campaign.targetHarvest || "—" },
                { label: "Lokasi GPS", value: campaign.locationGPS || "—" },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-semibold text-slate-700 max-w-[60%] text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Mobile */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 flex items-center justify-around py-3 z-50 shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
        <a href="/marketplace" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-main transition-colors">
          <span className="material-symbols-outlined text-[24px]">storefront</span>
          <span className="text-[10px] font-semibold">Shop</span>
        </a>
        <a href="/crowdfunding" className="flex flex-col items-center gap-1 text-emerald-main">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
          <span className="text-[10px] font-bold">Proyek</span>
        </a>
        <a href="/traceability" className="flex flex-col items-center gap-1 text-slate-400 relative -top-4">
          <div className="bg-gradient-to-r from-emerald-main to-[#10B981] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-main/30 border-4 border-frosted-white">
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
