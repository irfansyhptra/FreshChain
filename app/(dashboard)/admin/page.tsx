"use client";

import React, { useEffect, useState } from "react";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  kycStatus: "Pending" | "Verified" | "Rejected" | "Unverified";
  createdAt: string;
  petaniProfile?: any;
  konsumenProfile?: any;
  investorProfile?: any;
};

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers(filter);
  }, [filter]);

  const fetchUsers = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?status=${status}`);
      const json = await res.json();
      if (json.success) {
        setUsers(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id: string, newStatus: string) => {
    if (!confirm(`Ubah status validasi menjadi ${newStatus}?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${id}/validate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kycStatus: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, kycStatus: json.data.kycStatus } : u));
      } else {
        alert("Gagal mengupdate: " + json.message);
      }
    } catch (e) {
      alert("Terjadi kesalahan sistem");
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-indigo-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">manage_accounts</span>
          Manajemen Pengguna & Validasi Akun
        </h1>
        <p className="text-slate-500 text-sm mt-1">Kelola permohonan validasi untuk semua pendaftar Petani, Investor, dll.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: "all", label: "Semua" },
          { key: "Pending", label: "Pending" },
          { key: "Verified", label: "Verified" },
          { key: "Rejected", label: "Rejected" },
          { key: "Unverified", label: "Unverified" },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === f.key 
              ? "bg-indigo-600 text-white shadow-md" 
              : "bg-white/60 text-slate-500 hover:text-indigo-600 border border-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
           <span className="material-symbols-outlined animate-spin text-4xl text-indigo-400">progress_activity</span>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 bg-white/70 rounded-3xl border border-white">
          <p className="text-slate-400 font-bold">Tidak ada pengguna dengan filter ini.</p>
        </div>
      ) : (
        <div className="bg-white/80 rounded-2xl border border-white/50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold">Nama & Email</th>
                  <th className="px-6 py-4 font-bold">Role</th>
                  <th className="px-6 py-4 font-bold">Status Validasi</th>
                  <th className="px-6 py-4 font-bold">Tgl Daftar</th>
                  <th className="px-6 py-4 font-bold text-right">Aksi Validasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{u.name}</div>
                      <div className="text-slate-500 text-xs">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-bold font-plus">{u.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        u.kycStatus === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                        u.kycStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        u.kycStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {u.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 text-xs font-bold">
                        <button 
                          onClick={() => handleValidate(u._id, "Verified")}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-emerald-200"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => handleValidate(u._id, "Rejected")}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
