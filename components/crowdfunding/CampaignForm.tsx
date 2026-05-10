"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type ActivityItem = {
  name: string;
  category: string;
  costType: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
};

export type Activity = {
  milestone: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  items: ActivityItem[];
};

type CampaignFormProps = {
  isEdit?: boolean;
  campaignId?: string;
  initialData?: any;
};

export default function CampaignForm({ isEdit = false, campaignId, initialData }: CampaignFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    commodity: "",
    landArea: "",
    locationGPS: "",
    targetHarvest: "",
    bannerUrl: "",
  });

  const [uploadingBanner, setUploadingBanner] = useState(false);

  const [investmentTerms, setInvestmentTerms] = useState({
    minInvestment: 100000,
    profitSharing: 10,
    fundingDeadline: "",
    returnIfFailed: true,
  });

  const [returnSimulation, setReturnSimulation] = useState({
    productivity: 0,
    prices: { min: 0, normal: 0, max: 0 },
    salesPercentages: { min: 60, normal: 80, max: 100 },
  });

  const [activities, setActivities] = useState<Activity[]>([
    {
      milestone: "Persiapan",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      items: [
        {
          name: "",
          category: "",
          costType: "Material",
          quantity: 0,
          unit: "",
          unitPrice: 0,
          total: 0
        }
      ]
    }
  ]);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        title: initialData.title || "",
        commodity: initialData.commodity || "",
        landArea: initialData.landArea?.toString() || "",
        locationGPS: initialData.locationGPS || "",
        targetHarvest: initialData.targetHarvest || "",
        bannerUrl: initialData.bannerUrl || "",
      });

      if (initialData.investmentTerms) {
        setInvestmentTerms({
          minInvestment: initialData.investmentTerms.minInvestment || 100000,
          profitSharing: initialData.investmentTerms.profitSharing || 10,
          fundingDeadline: initialData.investmentTerms.fundingDeadline ? new Date(initialData.investmentTerms.fundingDeadline).toISOString().split('T')[0] : "",
          returnIfFailed: initialData.investmentTerms.returnIfFailed ?? true,
        });
      }

      if (initialData.returnSimulation) {
        setReturnSimulation({
          productivity: initialData.returnSimulation.productivity || 0,
          prices: initialData.returnSimulation.prices || { min: 0, normal: 0, max: 0 },
          salesPercentages: initialData.returnSimulation.salesPercentages || { min: 60, normal: 80, max: 100 },
        });
      }

      if (initialData.activities && initialData.activities.length > 0) {
        const mappedActivities = initialData.activities.map((act: any) => ({
          ...act,
          startDate: act.startDate ? new Date(act.startDate).toISOString().split('T')[0] : "",
          endDate: act.endDate ? new Date(act.endDate).toISOString().split('T')[0] : "",
        }));
        setActivities(mappedActivities);
      }
    }
  }, [isEdit, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setInvestmentTerms(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSimulationChange = (field: string, subfield: string | null, value: number) => {
    setReturnSimulation(prev => {
      if (subfield) {
        return {
          ...prev,
          [field]: {
            // @ts-ignore
            ...prev[field],
            [subfield]: value
          }
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBanner(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, bannerUrl: data.url }));
      } else {
        alert("Gagal mengunggah banner: " + data.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan saat mengunggah banner.");
    } finally {
      setUploadingBanner(false);
    }
  };

  // --- ACTIVITY ACTIONS ---
  const addActivity = () => {
    setActivities(prev => [
      ...prev,
      {
        milestone: "Persiapan",
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        items: [
          {
            name: "",
            category: "",
            costType: "Material",
            quantity: 0,
            unit: "",
            unitPrice: 0,
            total: 0
          }
        ]
      }
    ]);
  };

  const removeActivity = (index: number) => {
    setActivities(prev => prev.filter((_, i) => i !== index));
  };

  const updateActivity = (index: number, field: keyof Activity, value: string) => {
    const newActivities = [...activities];
    // @ts-ignore
    newActivities[index][field] = value;
    setActivities(newActivities);
  };

  // --- ITEM ACTIONS ---
  const addItem = (actIndex: number) => {
    const newActivities = [...activities];
    newActivities[actIndex].items.push({
      name: "",
      category: "",
      costType: "Material",
      quantity: 0,
      unit: "",
      unitPrice: 0,
      total: 0
    });
    setActivities(newActivities);
  };

  const removeItem = (actIndex: number, itemIndex: number) => {
    const newActivities = [...activities];
    newActivities[actIndex].items = newActivities[actIndex].items.filter((_, i) => i !== itemIndex);
    setActivities(newActivities);
  };

  const updateItem = (actIndex: number, itemIndex: number, field: keyof ActivityItem, value: string | number) => {
    const newActivities = [...activities];
    const item = newActivities[actIndex].items[itemIndex];
    
    // @ts-ignore
    item[field] = value;
    
    // Auto calculate total for this item
    if (field === 'quantity' || field === 'unitPrice') {
      item.total = Number(item.quantity || 0) * Number(item.unitPrice || 0);
    }
    
    setActivities(newActivities);
  };

  // --- CALCULATIONS ---
  const calculateTotalRAB = () => {
    return activities.reduce((sum, act) => {
      const actTotal = act.items.reduce((itemSum, item) => itemSum + (Number(item.total) || 0), 0);
      return sum + actTotal;
    }, 0);
  };

  const calculateTotalByMilestone = (milestone: string) => {
    return activities
      .filter(a => a.milestone === milestone)
      .reduce((sum, act) => {
        const actTotal = act.items.reduce((itemSum, item) => itemSum + (Number(item.total) || 0), 0);
        return sum + actTotal;
      }, 0);
  };

  const totalRAB = calculateTotalRAB();
  const minJaminan = totalRAB * 0.05; // 5%

  const calculateSimulation = (type: 'min' | 'normal' | 'max') => {
    const landArea = Number(formData.landArea) || 0;
    const estHarvest = landArea * (Number(returnSimulation.productivity) || 0); // kg
    
    let salesPercent = 0;
    let price = 0;

    if (type === 'min') {
      salesPercent = Number(returnSimulation.salesPercentages.min) / 100;
      price = Number(returnSimulation.prices.min);
    } else if (type === 'normal') {
      salesPercent = Number(returnSimulation.salesPercentages.normal) / 100;
      price = Number(returnSimulation.prices.normal);
    } else {
      salesPercent = Number(returnSimulation.salesPercentages.max) / 100;
      price = Number(returnSimulation.prices.max);
    }

    const soldKg = estHarvest * salesPercent;
    const grossRevenue = soldKg * price;
    const netProfit = grossRevenue - totalRAB;

    let platformFee = 0;
    let investorProfit = 0;
    let farmerProfit = 0;

    if (netProfit > 0) {
      platformFee = netProfit * 0.05;
      const distributableProfit = netProfit - platformFee;
      const investorShare = Number(investmentTerms.profitSharing) / 100;
      investorProfit = distributableProfit * investorShare;
      farmerProfit = distributableProfit * (1 - investorShare);
    }

    return { estHarvest, soldKg, grossRevenue, netProfit, platformFee, investorProfit, farmerProfit };
  };

  const simNormal = calculateSimulation('normal');
  const simWorst = calculateSimulation('min');
  const simBest = calculateSimulation('max');

  const handleSubmit = async (status: "Draft" | "Funding") => {
    try {
      setLoading(true);
      setError("");

      if (status === "Funding") {
        if (!investmentTerms.fundingDeadline) {
          throw new Error("Batas Waktu Pengumpulan Dana harus diisi sebelum dipublish.");
        }
        const deadlineDate = new Date(investmentTerms.fundingDeadline);
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 2);
        
        if (deadlineDate > maxDate) {
          throw new Error("Batas Waktu Pengumpulan Dana maksimal 2 bulan dari hari ini.");
        }
      }
      
      const payload = {
        ...formData,
        targetAmount: totalRAB,
        status: status,
        investmentTerms: {
          minInvestment: Number(investmentTerms.minInvestment),
          profitSharing: Number(investmentTerms.profitSharing),
          fundingDeadline: investmentTerms.fundingDeadline ? new Date(investmentTerms.fundingDeadline) : undefined,
          returnIfFailed: investmentTerms.returnIfFailed
        },
        returnSimulation: {
          productivity: Number(returnSimulation.productivity),
          prices: {
            min: Number(returnSimulation.prices.min),
            normal: Number(returnSimulation.prices.normal),
            max: Number(returnSimulation.prices.max)
          },
          salesPercentages: {
            min: Number(returnSimulation.salesPercentages.min),
            normal: Number(returnSimulation.salesPercentages.normal),
            max: Number(returnSimulation.salesPercentages.max)
          }
        },
        description: `Proyek Crowdfunding: ${formData.title}`,
        activities: activities.map(a => ({
          ...a,
          startDate: a.startDate ? new Date(a.startDate) : undefined,
          endDate: a.endDate ? new Date(a.endDate) : undefined,
        }))
      };

      const endpoint = isEdit ? `/api/petani/campaigns/${campaignId}` : '/api/petani/campaigns';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.success) {
        alert("Proyek berhasil disimpan!");
        router.push("/petani/dashboard");
      } else {
        setError(json.message || "Terjadi kesalahan saat menyimpan proyek.");
      }
    } catch (err: any) {
      setError(err.message || "Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  const timelineMilestones = ["Persiapan", "Penanaman", "Pemeliharaan", "Panen"];

  return (
    <div className="space-y-8 relative z-10">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">{error}</div>}
      
      {/* A. Form Informasi Proyek */}
      <section className="bg-white/70 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-sm border border-white/50">
        <h3 className="text-xl font-bold font-plus text-emerald-dark mb-6">A. Informasi Proyek</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-gray mb-2">Nama Proyek</label>
            <input name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 text-sm text-emerald-dark font-bold outline-none transition-all" type="text" placeholder="Contoh: Penanaman Padi Sawah 5 Hektar" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-gray mb-2">Komoditas</label>
            <select name="commodity" value={formData.commodity} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 text-sm text-emerald-dark font-bold outline-none transition-all">
              <option value="" disabled>Pilih Komoditas...</option>
              <option value="Cabe Rawit">Cabe Rawit</option>
              <option value="Padi Organik">Padi Organik</option>
              <option value="Jagung Hibrida">Jagung Hibrida</option>
              <option value="Sayuran Hidroponik">Sayuran Hidroponik</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-gray mb-2">Luas Lahan (Hektar)</label>
            <input name="landArea" value={formData.landArea} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 text-sm text-emerald-dark font-bold outline-none transition-all" placeholder="0.0" type="number" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-gray mb-2">Target Panen</label>
            <input name="targetHarvest" value={formData.targetHarvest} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 text-sm text-emerald-dark font-bold outline-none transition-all" placeholder="Bulan & Tahun (cth: Des 2026)" type="text" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-gray mb-2">Lokasi GPS</label>
            <div className="relative">
              <input name="locationGPS" value={formData.locationGPS} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 pl-10 text-sm text-emerald-dark font-bold outline-none transition-all" placeholder="-6.2088, 106.8456" type="text" />
              <span className="material-symbols-outlined absolute left-3 top-3.5 text-slate-400 text-lg">location_on</span>
            </div>
          </div>
          <div className="md:col-span-3 border-t border-slate-100 pt-4 mt-2">
            <label className="block text-sm font-semibold text-slate-gray mb-2">Banner Proyek (Opsional)</label>
            <div className="flex items-center gap-4">
              {formData.bannerUrl ? (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-emerald-200 shadow-sm">
                  <img src={formData.bannerUrl} alt="Banner" className="object-cover w-full h-full" />
                  <button onClick={() => setFormData(prev => ({ ...prev, bannerUrl: "" }))} className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px] block">close</span>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full max-w-sm h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadingBanner ? (
                      <span className="material-symbols-outlined animate-spin text-emerald-main text-3xl mb-2">refresh</span>
                    ) : (
                      <span className="material-symbols-outlined text-slate-400 text-3xl mb-2">cloud_upload</span>
                    )}
                    <p className="text-sm text-slate-500 font-semibold">{uploadingBanner ? "Mengunggah..." : "Klik untuk upload foto"}</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, max 5MB</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleBannerUpload} disabled={uploadingBanner} />
                </label>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* B. RAB & Kegiatan (Card-Based UI) */}
      <section className="bg-white/70 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-sm border border-white/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold font-plus text-emerald-dark">B. RAB & Kegiatan (Nested Activity-Based)</h3>
            <p className="text-sm text-slate-gray mt-1">Satu kegiatan bisa memuat banyak item/rincian biaya.</p>
          </div>
          <button onClick={addActivity} className="flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all">
            <span className="material-symbols-outlined text-sm">add_box</span> Tambah Kegiatan Baru
          </button>
        </div>
        
        <div className="space-y-6">
          {activities.map((act, actIdx) => (
            <div key={actIdx} className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden group">
              {/* Activity Header */}
              <div className="bg-slate-50/50 p-5 border-b border-slate-200/80">
                <div className="flex flex-col xl:flex-row gap-4 xl:items-start justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    <div className="md:col-span-3 space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tahap (Milestone)</label>
                      <select value={act.milestone} onChange={(e) => updateActivity(actIdx, 'milestone', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-emerald-700 outline-none focus:border-emerald-main focus:ring-2 focus:ring-emerald-main/20 transition-all cursor-pointer">
                        <option value="Persiapan">Persiapan Lahan</option>
                        <option value="Penanaman">Penanaman</option>
                        <option value="Pemeliharaan">Pemeliharaan</option>
                        <option value="Panen">Panen & Pasca Panen</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-5 space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kegiatan Induk</label>
                      <input type="text" value={act.name} onChange={(e) => updateActivity(actIdx, 'name', e.target.value)} placeholder="Nama Kegiatan (Cth: Pembajakan & Penggemburan)" className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-slate-800 outline-none focus:border-emerald-main focus:ring-2 focus:ring-emerald-main/20 transition-all placeholder:font-medium placeholder:text-slate-300" />
                    </div>

                    <div className="md:col-span-4 space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Waktu Pelaksanaan</label>
                      <div className="flex items-center gap-2">
                         <input type="date" value={act.startDate} onChange={(e) => updateActivity(actIdx, 'startDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-600 outline-none focus:border-emerald-main" />
                         <span className="text-slate-400 font-bold">-</span>
                         <input type="date" value={act.endDate} onChange={(e) => updateActivity(actIdx, 'endDate', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-600 outline-none focus:border-emerald-main" />
                      </div>
                    </div>

                  </div>
                  
                  <button onClick={() => removeActivity(actIdx)} className="w-10 h-10 shrink-0 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-40 group-hover:opacity-100 self-end xl:self-auto xl:mt-6">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                   <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                     <span className="material-symbols-outlined text-emerald-main text-[18px]">receipt_long</span> Rincian Item / Biaya
                   </h4>
                </div>

                <div className="space-y-3">
                  {act.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-slate-50/50 border border-slate-100 p-3 rounded-xl relative group/item">
                       
                       <div className="w-full md:w-[35%] flex flex-col gap-1">
                         <input type="text" value={item.name} onChange={(e) => updateItem(actIdx, itemIdx, 'name', e.target.value)} placeholder="Nama Item (Cth: Sewa Traktor)" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-emerald-main focus:ring-2 focus:ring-emerald-main/20" />
                       </div>

                       <div className="w-full md:w-[15%] flex flex-col gap-1">
                         <select value={item.costType} onChange={(e) => updateItem(actIdx, itemIdx, 'costType', e.target.value)} className="w-full bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg px-2 py-2 text-xs font-bold outline-none cursor-pointer">
                           <option value="Material">Material</option>
                           <option value="Jasa">Jasa</option>
                           <option value="Operasional">Operasional</option>
                           <option value="Logistik">Logistik</option>
                         </select>
                       </div>

                       <div className="w-full md:w-[25%] flex gap-2">
                         <div className="w-1/2">
                           <input type="number" min="0" value={item.quantity || ''} onChange={(e) => updateItem(actIdx, itemIdx, 'quantity', Number(e.target.value))} placeholder="Qty" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-center outline-none focus:border-emerald-main font-semibold" />
                         </div>
                         <div className="w-1/2">
                           <input type="text" value={item.unit} onChange={(e) => updateItem(actIdx, itemIdx, 'unit', e.target.value)} placeholder="Satuan" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-center outline-none focus:border-emerald-main" />
                         </div>
                       </div>

                       <div className="w-full md:w-[25%] flex gap-3 items-center">
                         <div className="w-full">
                           <input type="number" min="0" value={item.unitPrice || ''} onChange={(e) => updateItem(actIdx, itemIdx, 'unitPrice', Number(e.target.value))} placeholder="Harga Satuan" className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-right outline-none focus:border-emerald-main font-semibold text-slate-700" />
                         </div>
                       </div>

                       <div className="w-full md:w-[20%] text-right font-bold text-emerald-700 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/50">
                         {new Intl.NumberFormat('id-ID').format(item.total)}
                       </div>

                       <button onClick={() => removeItem(actIdx, itemIdx)} className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity shadow-sm">
                         <span className="material-symbols-outlined text-[14px]">close</span>
                       </button>
                    </div>
                  ))}

                  <button onClick={() => addItem(actIdx)} className="text-xs font-bold text-emerald-main hover:text-emerald-dark flex items-center gap-1 p-2 rounded-lg hover:bg-emerald-50 transition-colors inline-flex">
                    <span className="material-symbols-outlined text-sm">add</span> Tambah Item Biaya
                  </button>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end items-center gap-4">
                   <span className="text-sm font-semibold text-slate-400">Total Kegiatan ini:</span>
                   <span className="text-lg font-extrabold text-emerald-dark">
                     Rp {new Intl.NumberFormat('id-ID').format(
                        act.items.reduce((sum, i) => sum + (Number(i.total) || 0), 0)
                     )}
                   </span>
                </div>

              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                 <span className="material-symbols-outlined text-3xl">post_add</span>
               </div>
               <p className="text-slate-500 font-medium">Belum ada kegiatan.</p>
               <p className="text-sm text-slate-400 mt-1">Mulai rencanakan proyek Anda dengan klik "Tambah Kegiatan Baru".</p>
            </div>
          )}
        </div>
      </section>

      {/* C. Asumsi Panen & Simulasi Bagi Hasil */}
      <section className="bg-white/70 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-sm border border-emerald-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-600">monitoring</span>
          </div>
          <h3 className="text-xl font-bold font-plus text-emerald-dark">C. Asumsi Panen & Simulasi Bagi Hasil</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Asumsi */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60">
              <h4 className="font-bold text-slate-700 text-sm mb-4">1. Estimasi Produktivitas</h4>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Produktivitas per Hektar (Kg/Ha)</label>
              <input type="number" min="0" value={returnSimulation.productivity} onChange={(e) => handleSimulationChange('productivity', null, Number(e.target.value))} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-emerald-main font-semibold" placeholder="Contoh: 8000" />
              <p className="text-[10px] text-slate-400 mt-1">Estimasi Panen: {new Intl.NumberFormat('id-ID').format((Number(formData.landArea) || 0) * (Number(returnSimulation.productivity) || 0))} Kg</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60">
              <h4 className="font-bold text-slate-700 text-sm mb-4">2. Harga Pasar (Rp/Kg)</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-16 text-xs font-bold text-red-500">Terburuk</span>
                  <input type="number" value={returnSimulation.prices.min} onChange={(e) => handleSimulationChange('prices', 'min', Number(e.target.value))} className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-red-300" placeholder="Rp" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-xs font-bold text-amber-500">Normal</span>
                  <input type="number" value={returnSimulation.prices.normal} onChange={(e) => handleSimulationChange('prices', 'normal', Number(e.target.value))} className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-amber-300" placeholder="Rp" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-xs font-bold text-emerald-500">Terbaik</span>
                  <input type="number" value={returnSimulation.prices.max} onChange={(e) => handleSimulationChange('prices', 'max', Number(e.target.value))} className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-emerald-300" placeholder="Rp" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60">
              <h4 className="font-bold text-slate-700 text-sm mb-4">3. Penyerapan Pasar (% Terjual)</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-16 text-xs font-bold text-red-500">Terburuk</span>
                  <input type="number" value={returnSimulation.salesPercentages.min} onChange={(e) => handleSimulationChange('salesPercentages', 'min', Number(e.target.value))} className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-red-300" placeholder="%" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-xs font-bold text-amber-500">Normal</span>
                  <input type="number" value={returnSimulation.salesPercentages.normal} onChange={(e) => handleSimulationChange('salesPercentages', 'normal', Number(e.target.value))} className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-amber-300" placeholder="%" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-xs font-bold text-emerald-500">Terbaik</span>
                  <input type="number" value={returnSimulation.salesPercentages.max} onChange={(e) => handleSimulationChange('salesPercentages', 'max', Number(e.target.value))} className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-emerald-300" placeholder="%" />
                </div>
              </div>
            </div>
          </div>

          {/* Output Simulasi */}
          <div className="lg:col-span-7">
            <h4 className="font-bold text-slate-700 text-sm mb-4">Live Calculator Skenario Panen</h4>
            
            <div className="space-y-4">
              {[
                { label: 'Skenario Normal', data: simNormal, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
                { label: 'Skenario Terbaik', data: simBest, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
                { label: 'Skenario Terburuk', data: simWorst, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' }
              ].map((scenario, idx) => (
                <div key={idx} className={`${scenario.bg} border ${scenario.border} rounded-xl p-4`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`font-bold text-sm ${scenario.text}`}>{scenario.label}</span>
                    <span className="text-xs font-semibold text-slate-500">{new Intl.NumberFormat('id-ID').format(scenario.data.soldKg)} Kg Terjual</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-600">Pendapatan Kotor:</span>
                     <span className="font-bold">Rp {new Intl.NumberFormat('id-ID').format(scenario.data.grossRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-600">Total Modal (RAB):</span>
                     <span className="font-bold text-red-500">- Rp {new Intl.NumberFormat('id-ID').format(totalRAB)}</span>
                  </div>
                  <div className="w-full h-px bg-slate-200/60 my-2"></div>
                  <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-800 font-bold">Keuntungan Bersih:</span>
                     <span className={`font-bold ${scenario.data.netProfit > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                       Rp {new Intl.NumberFormat('id-ID').format(scenario.data.netProfit)}
                     </span>
                  </div>
                  
                  {scenario.data.netProfit > 0 ? (
                    <div className="mt-3 pt-3 border-t border-slate-200/50">
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-slate-500">Platform Fee (5%):</span>
                         <span className="font-semibold text-slate-700">- Rp {new Intl.NumberFormat('id-ID').format(scenario.data.platformFee)}</span>
                      </div>
                      <div className="flex justify-between text-xs mb-3">
                         <span className="text-slate-500">Profit Petani ({100 - investmentTerms.profitSharing}%):</span>
                         <span className="font-bold text-emerald-700">Rp {new Intl.NumberFormat('id-ID').format(scenario.data.farmerProfit)}</span>
                      </div>
                      
                      <div className="bg-white/50 p-3 rounded-lg border border-emerald-100/50">
                        <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-2">Total Pencairan Investor</span>
                        <div className="flex justify-between text-xs mb-1">
                           <span className="text-slate-500">Pengembalian Modal (100%):</span>
                           <span className="font-semibold text-slate-700">Rp {new Intl.NumberFormat('id-ID').format(totalRAB)}</span>
                        </div>
                        <div className="flex justify-between text-xs mb-1">
                           <span className="text-slate-500">Profit Investor ({investmentTerms.profitSharing}%):</span>
                           <span className="font-bold text-emerald-700">+ Rp {new Intl.NumberFormat('id-ID').format(scenario.data.investorProfit)}</span>
                        </div>
                        <div className="w-full h-px bg-slate-200/60 my-1"></div>
                        <div className="flex justify-between text-sm mt-1">
                           <span className="text-slate-800 font-bold">Estimasi Total Cair:</span>
                           <span className="font-black text-emerald-main">Rp {new Intl.NumberFormat('id-ID').format(totalRAB + scenario.data.investorProfit)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-red-500 font-semibold bg-red-100/50 p-2 rounded">
                      *Risk Sharing: Modal investor tidak kembali utuh. Tidak ada profit yang dibagikan. Platform tidak mengambil fee.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D. Penawaran Investasi Tambahan */}
      <section className="bg-white/70 backdrop-blur-md p-6 lg:p-8 rounded-2xl shadow-sm border border-white/50">
        <h3 className="text-xl font-bold font-plus text-emerald-dark mb-6">D. Aturan Investasi & Perlindungan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-gray mb-2">Minimal Investasi</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-400 font-bold text-sm">Rp</span>
              <input name="minInvestment" value={investmentTerms.minInvestment} onChange={handleInvestmentChange} className="w-full bg-slate-50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 pl-9 text-sm text-emerald-dark font-bold outline-none transition-all" placeholder="100000" type="number" min="10000" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-slate-gray mb-2">Bagi Hasil Penjualan Panen (Petani : Investor)</label>
            <div className="flex items-center gap-4">
              <div className="relative w-1/2">
                <span className="absolute left-3 top-3 text-slate-400 font-bold text-sm">Petani</span>
                <input disabled value={100 - investmentTerms.profitSharing} className="w-full bg-slate-100 border border-slate-200/60 rounded-xl p-3 pl-16 text-sm text-slate-500 font-bold outline-none cursor-not-allowed text-right pr-8" type="number" />
                <span className="absolute right-4 top-3 text-slate-400 font-bold text-sm">%</span>
              </div>
              <span className="font-bold text-slate-400">:</span>
              <div className="relative w-1/2">
                <span className="absolute left-3 top-3 text-emerald-main font-bold text-sm">Investor</span>
                <input name="profitSharing" value={investmentTerms.profitSharing} onChange={handleInvestmentChange} className="w-full bg-slate-50 border border-emerald-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 pl-20 text-sm text-emerald-dark font-bold outline-none transition-all text-right pr-8" placeholder="10" type="number" min="0" max="100" />
                <span className="absolute right-4 top-3 text-emerald-main font-bold text-sm">%</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-gray mb-2">Batas Waktu Pendanaan</label>
            <input name="fundingDeadline" value={investmentTerms.fundingDeadline} onChange={handleInvestmentChange} className="w-full bg-slate-50 border border-slate-200/60 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main p-3 text-sm text-emerald-dark font-bold outline-none transition-all" type="date" />
            <p className="text-[10px] text-slate-400 mt-1">Maks. 2 bulan dari pembuatan.</p>
          </div>
          <div className="md:col-span-2 lg:col-span-4 mt-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60">
                <span className="material-symbols-outlined text-emerald-main mt-0.5">payments</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-700">Skema Pengembalian Modal + Profit (Wajib)</h4>
                  <p className="text-xs text-slate-500 mt-1">Setelah proyek selesai dan panen terjual, sistem otomatis mendistribusikan <b>Modal Awal Investor beserta Persentase Keuntungan (Profit)</b> secara bersamaan ke dompet digital (wallet) masing-masing investor melalui eksekusi Smart Contract.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <span className="material-symbols-outlined text-slate-400 mt-0.5">verified_user</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-700">Perlindungan Dana Pra-Proyek (Refund)</h4>
                  <p className="text-xs text-slate-500 mt-1">Sistem menjamin seluruh dana investasi <b>dikembalikan 100%</b> apabila total target RAB gagal terpenuhi hingga batas waktu pendanaan habis.</p>
                </div>
                <input type="hidden" name="returnIfFailed" value="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. Output Otomatis Sistem */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50">
           <h3 className="text-xl font-bold font-plus text-emerald-dark mb-6">E. Timeline Visual & Sub-Total</h3>
           <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-slate-200 rounded-full z-0"></div>
              <div className="relative z-10 flex justify-between">
                {timelineMilestones.map((ms, idx) => {
                  const totalMs = calculateTotalByMilestone(ms);
                  const hasItems = totalMs > 0;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm transition-colors ${hasItems ? 'bg-emerald-main text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {idx + 1}
                      </div>
                      <span className={`mt-3 text-[10px] font-bold uppercase tracking-wider ${hasItems ? 'text-emerald-700' : 'text-slate-400'}`}>{ms}</span>
                      <span className={`mt-1 text-xs font-semibold ${hasItems ? 'text-slate-700' : 'text-slate-400'}`}>Rp {new Intl.NumberFormat('id-ID').format(totalMs)}</span>
                    </div>
                  )
                })}
              </div>
           </div>
        </section>

        <section className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold font-plus text-slate-800 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">account_balance</span>
            Total Proyek & Jaminan
          </h3>
          
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-500">Total RAB (Target Pendanaan)</span>
              <span className="text-lg font-extrabold text-emerald-dark">
                Rp {new Intl.NumberFormat('id-ID').format(totalRAB)}
              </span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-500">Jaminan Petani (5%)</span>
              <span className="text-lg font-extrabold text-emerald-main">
                Rp {new Intl.NumberFormat('id-ID').format(minJaminan)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleSubmit("Draft")}
              disabled={loading}
              className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:shadow-none flex justify-center items-center gap-2"
            >
              {loading ? <span className="material-symbols-outlined animate-spin text-sm">refresh</span> : <span className="material-symbols-outlined text-sm">save</span>}
              Simpan sebagai Draft
            </button>
            <button 
              onClick={() => handleSubmit("Funding")}
              disabled={loading || totalRAB === 0}
              className="w-full bg-emerald-main text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-main/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:bg-slate-300 disabled:shadow-none flex justify-center items-center gap-2"
            >
              {loading && <span className="material-symbols-outlined animate-spin text-sm">refresh</span>}
              {loading ? 'Menyimpan & Submit Escrow...' : 'Submit Proyek & Bayar Jaminan'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
