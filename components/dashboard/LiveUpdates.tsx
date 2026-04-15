"use client";

import React from 'react';

const updates = [
  {
    id: 1,
    type: "sensor",
    icon: "water_drop",
    color: "text-blue-500 bg-blue-50",
    message: "Sensor Irigasi B-1 diaktifkan otomatis (Kelembapan < 40%)",
    time: "2 mins ago"
  },
  {
    id: 2,
    type: "finance",
    icon: "payments",
    color: "text-emerald-main bg-emerald-main/10",
    message: "Funding diterima: 1.500 USDT dari 0x71F...2c90",
    time: "1 hour ago"
  },
  {
    id: 3,
    type: "traceability",
    icon: "qr_code_scanner",
    color: "text-purple-600 bg-purple-50",
    message: "Batch TRC-8899-CORN diperbarui status: Quality Check",
    time: "4 hours ago"
  },
  {
    id: 4,
    type: "system",
    icon: "smart_toy",
    color: "text-orange-500 bg-orange-50",
    message: "Smart Contract ESC-Cabai-102 mencairkan termin ke-2 (30%)",
    time: "1 day ago"
  }
];

export default function LiveUpdates() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 border-b border-white/40 pb-4">
        <h2 className="text-xl font-plus font-bold text-emerald-dark flex items-center gap-2">
          <span className="material-symbols-outlined text-blockchain-blue animate-pulse">online_prediction</span>
          Live Farm Updates
        </h2>
      </div>

      <div className="space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-gray/20 before:to-transparent">
        {updates.map((update, idx) => (
          <div key={update.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${update.color}`}>
               <span className="material-symbols-outlined text-sm">{update.icon}</span>
            </div>
            <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/40 bg-white/70 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
               <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-sm text-emerald-dark">{update.type.toUpperCase()}</div>
                  <time className="text-[10px] font-medium text-slate-gray bg-white px-2 py-1 rounded-md shadow-inner">{update.time}</time>
               </div>
               <div className="text-xs text-slate-gray mt-2 leading-relaxed">
                 {update.message}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
