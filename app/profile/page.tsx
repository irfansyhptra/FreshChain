"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Pengguna Default",
    phone: "081234567890",
    email: "pengguna@freshchain.id",
    address: "Jl. Merdeka No. 123, Kecamatan Sukamaju, Kota Jakarta Selatan, 12345"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load profile from local storage if exists
    const savedProfile = localStorage.getItem("freshchain_profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("freshchain_profile", JSON.stringify(profile));
      setIsEditing(false);
      setIsSaving(false);
      alert("Profil berhasil diperbarui. Alamat ini akan digunakan untuk pengiriman.");
    }, 800);
  };

  return (
    <div className="bg-frosted-white text-slate-gray font-inter min-h-screen relative overflow-x-hidden antialiased">
      {/* Background Decorators */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/30 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Top Navbar */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="text-2xl font-extrabold text-emerald-dark tracking-tight font-plus">
              FreshChain
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/marketplace" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">
                Marketplace
              </Link>
              <Link href="/crowdfunding" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">
                Projects
              </Link>
              <Link href="/traceability" className="text-slate-500 hover:text-emerald-dark font-medium text-sm py-2 transition-colors">
                Traceability
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
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
            <button className="hidden sm:flex items-center gap-2 bg-emerald-main text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-main/20 hover:opacity-90 active:scale-95 transition-all text-sm">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              <span>Saldo</span>
            </button>
            <Link href="/profile" className="w-10 h-10 rounded-full border-2 border-emerald-main shadow-sm overflow-hidden hover:ring-2 hover:ring-emerald-main transition-all">
              <img src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" alt="Avatar" className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-slate-200/60 p-8 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-emerald-100 shrink-0">
                <img src="https://ui-avatars.com/api/?name=User&background=10B981&color=fff" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-dark font-plus">{profile.name}</h1>
                <p className="text-slate-500 font-medium mt-1">{profile.email}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                   <span className="material-symbols-outlined text-[14px]">verified_user</span>
                   Akun Terverifikasi
                </div>
              </div>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit Profil
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-70 disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-70 disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">No. Handphone (WhatsApp)</label>
              <input 
                type="text" 
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-70 disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium max-w-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-emerald-500">location_on</span>
                Alamat Pengiriman Utama
              </label>
              <textarea 
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows={3}
                placeholder="Alamat lengkap beserta RT/RW dan kodepos..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-70 disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none font-medium"
              />
              <p className="text-xs text-slate-400 mt-2">
                * Alamat ini akan digunakan secara otomatis saat Anda melakukan checkout di Marketplace. 
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-end gap-3">
               <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-all"
               >
                  Batal
               </button>
               <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-3 bg-emerald-main text-white font-bold rounded-xl hover:bg-emerald-600 shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
               >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
               </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
