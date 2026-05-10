"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

type ProductStatus = "Aktif" | "Habis" | "Ditarik";
type ProductCategory = "Sayur Organik" | "Buah Tropis" | "Gandum & Biji" | "Rempah & Bumbu" | "Lainnya";
type ProductUnit = "kg" | "gram" | "ikat" | "buah" | "liter" | "karung";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: ProductUnit;
  category: ProductCategory;
  imageUrl?: string;
  badge?: string;
  status: ProductStatus;
  farmerName: string;
  farmerLocation: string;
  createdAt: string;
};

type Stats = { total: number; active: number; habis: number };

const CATEGORIES: ProductCategory[] = ["Sayur Organik", "Buah Tropis", "Gandum & Biji", "Rempah & Bumbu", "Lainnya"];
const UNITS: ProductUnit[] = ["kg", "gram", "ikat", "buah", "liter", "karung"];
const STATUS_CFG: Record<ProductStatus, { label: string; cls: string }> = {
  Aktif: { label: "Aktif", cls: "bg-emerald-100 text-emerald-700" },
  Habis: { label: "Stok Habis", cls: "bg-amber-100 text-amber-700" },
  Ditarik: { label: "Ditarik", cls: "bg-slate-100 text-slate-500" },
};
const fmt = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const EMPTY_FORM = { name: "", description: "", price: "", stock: "", unit: "kg" as ProductUnit, category: "Sayur Organik" as ProductCategory, badge: "", imageUrl: "" };

export default function PetaniMarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, habis: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/petani/marketplace");
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
        setStats(json.stats);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const openAdd = () => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (p: Product) => {
    setEditId(p._id);
    setForm({ name: p.name, description: p.description, price: String(p.price), stock: String(p.stock), unit: p.unit, category: p.category, badge: p.badge || "", imageUrl: p.imageUrl || "" });
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.success) setForm(f => ({ ...f, imageUrl: json.url }));
      else showToast("Gagal upload gambar", "err");
    } catch { showToast("Gagal upload gambar", "err"); }
    finally { setUploading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) { showToast("Nama, harga, dan stok wajib diisi", "err"); return; }
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      const url = editId ? `/api/petani/marketplace/${editId}` : "/api/petani/marketplace";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (json.success) {
        showToast(editId ? "Produk berhasil diperbarui!" : "Produk berhasil diunggah ke marketplace!");
        setShowForm(false);
        fetchProducts();
      } else showToast(json.message || "Gagal menyimpan", "err");
    } catch { showToast("Terjadi kesalahan", "err"); }
    finally { setSaving(false); }
  };

  const handleStatusChange = async (id: string, status: ProductStatus) => {
    try {
      const res = await fetch(`/api/petani/marketplace/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const json = await res.json();
      if (json.success) { showToast("Status diperbarui"); fetchProducts(); }
      else showToast(json.message || "Gagal", "err");
    } catch { showToast("Terjadi kesalahan", "err"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tarik produk ini dari marketplace?")) return;
    try {
      const res = await fetch(`/api/petani/marketplace/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) { showToast("Produk ditarik dari marketplace"); fetchProducts(); }
      else showToast(json.message || "Gagal", "err");
    } catch { showToast("Terjadi kesalahan", "err"); }
  };

  const filtered = products.filter(p => filterStatus === "all" || p.status === filterStatus);

  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-white/70 rounded-2xl border border-white/50 animate-pulse" />)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{[1,2,3,4,5,6].map(i => <div key={i} className="h-56 bg-white/70 rounded-2xl border border-white/50 animate-pulse" />)}</div>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[300] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-bold transition-all animate-in fade-in slide-in-from-top-2 ${toast.type === "ok" ? "bg-emerald-main text-white" : "bg-red-500 text-white"}`}>
          <span className="material-symbols-outlined text-[20px]">{toast.type === "ok" ? "check_circle" : "error"}</span>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-dark font-plus tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-main">storefront</span>
            Marketplace Saya
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">Kelola dan upload hasil panen ke marketplace FreshChain</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Upload Produk
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: "inventory_2", label: "Total Produk", value: stats.total, color: "text-emerald-main", bg: "bg-emerald-50" },
          { icon: "check_circle", label: "Aktif", value: stats.active, color: "text-blue-500", bg: "bg-blue-50" },
          { icon: "remove_shopping_cart", label: "Stok Habis", value: stats.habis, color: "text-amber-500", bg: "bg-amber-50" },
        ].map(s => (
          <div key={s.label} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-2`}>
              <span className={`material-symbols-outlined ${s.color} text-[20px]`}>{s.icon}</span>
            </div>
            <p className="text-xl font-extrabold text-emerald-dark">{s.value}</p>
            <p className="text-xs font-semibold text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[{ k: "all", l: "Semua" }, { k: "Aktif", l: "Aktif" }, { k: "Habis", l: "Habis" }, { k: "Ditarik", l: "Ditarik" }].map(f => (
          <button key={f.k} onClick={() => setFilterStatus(f.k)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterStatus === f.k ? "bg-emerald-main text-white shadow-sm" : "bg-white/60 text-slate-500 border border-white/50 hover:text-emerald-main"}`}
          >{f.l}</button>
        ))}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl text-slate-300">storefront</span>
          </div>
          <h3 className="font-bold text-slate-700 text-lg mb-1">Belum ada produk</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">Upload hasil panen Anda agar bisa dibeli pelanggan di marketplace.</p>
          <button onClick={openAdd} className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Upload Produk Pertama
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => {
            const st = STATUS_CFG[p.status];
            return (
              <div key={p._id} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
                {/* Image */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-slate-300">image</span>
                    </div>
                  )}
                  {p.badge && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">{p.badge}</div>
                  )}
                  <div className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${st.cls}`}>{st.label}</div>
                </div>
                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-emerald-dark text-base leading-tight mb-1">{p.name}</h3>
                  <p className="text-xs text-slate-400 mb-2 line-clamp-2">{p.description}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                    <span className="material-symbols-outlined text-[12px]">category</span>
                    <span>{p.category}</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-lg font-extrabold text-emerald-main">Rp {fmt(p.price)}</span>
                      <span className="text-xs text-slate-400 ml-1">/{p.unit}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.stock > 0 ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-500"}`}>
                      Stok: {p.stock}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1 text-xs font-bold text-emerald-main bg-emerald-50 py-2 rounded-xl hover:bg-emerald-100 transition-colors">
                      <span className="material-symbols-outlined text-[14px]">edit</span>Edit
                    </button>
                    <select
                      value={p.status}
                      onChange={e => handleStatusChange(p._id, e.target.value as ProductStatus)}
                      className="flex-1 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-main/20"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Habis">Habis</option>
                    </select>
                    <button onClick={() => handleDelete(p._id)} className="p-2 text-red-400 bg-red-50 rounded-xl hover:bg-red-100 hover:text-red-600 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-emerald-dark/20 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl border border-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-xl">
              <h3 className="text-lg font-extrabold text-emerald-dark font-plus">
                {editId ? "Edit Produk" : "Upload Produk Baru"}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Foto Produk</label>
                <div className="relative h-36 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden hover:border-emerald-main/50 transition-colors cursor-pointer group">
                  {form.imageUrl ? (
                    <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="100vw" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 group-hover:text-emerald-main transition-colors">
                      <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                      <span className="text-xs font-semibold">{uploading ? "Mengunggah..." : "Klik untuk upload foto"}</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploading} />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Nama Produk *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main focus:outline-none py-2.5 px-4 text-sm" placeholder="cth: Cabai Merah Segar" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Deskripsi *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={3} className="w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main focus:outline-none py-2.5 px-4 text-sm resize-none" placeholder="Deskripsikan produk Anda..." />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Harga (Rp) *</label>
                  <input type="number" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required className="w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main focus:outline-none py-2.5 px-4 text-sm" placeholder="45000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Stok *</label>
                  <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} required className="w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main focus:outline-none py-2.5 px-4 text-sm" placeholder="100" />
                </div>
              </div>

              {/* Unit & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Satuan *</label>
                  <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value as ProductUnit }))} className="w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main focus:outline-none py-2.5 px-4 text-sm">
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Kategori *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as ProductCategory }))} className="w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main focus:outline-none py-2.5 px-4 text-sm">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-bold text-emerald-dark uppercase mb-2">Label/Badge (opsional)</label>
                <input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} className="w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-main/20 focus:border-emerald-main focus:outline-none py-2.5 px-4 text-sm" placeholder="cth: Organik, Pestisida Nol, Hidroponik" />
              </div>

              {/* Info box */}
              <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                <span className="material-symbols-outlined text-emerald-main text-[18px] mt-0.5">info</span>
                <p className="text-xs text-slate-600">Produk akan langsung muncul di <strong className="text-emerald-dark">Marketplace</strong> dan bisa dibeli oleh konsumen setelah disimpan.</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors text-sm">Batal</button>
                <button type="submit" disabled={saving || uploading} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all text-sm disabled:opacity-60">
                  {saving ? <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span> : <span className="material-symbols-outlined text-[18px]">cloud_upload</span>}
                  {saving ? "Menyimpan..." : editId ? "Simpan Perubahan" : "Upload ke Marketplace"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
