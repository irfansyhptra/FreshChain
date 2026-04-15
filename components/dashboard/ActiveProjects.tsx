"use client";

import React from 'react';

const projects = [
  {
    id: "PRJ-102",
    title: "Cabai Merah Premium 5 Hektar",
    status: "Cultivating",
    fundingGoal: "5.000 USDT",
    currentFunding: "5.000 USDT",
    progress: 100,
    harvestDate: "Sep 15, 2026",
    contract: "0x892a...1Cbb"
  },
  {
    id: "PRJ-105",
    title: "Padi Organik Cisaat",
    status: "Funding",
    fundingGoal: "12.000 USDT",
    currentFunding: "8.400 USDT",
    progress: 70,
    harvestDate: "Dec 10, 2026",
    contract: "0x4a9F...B881"
  }
];

export default function ActiveProjects() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-plus font-bold text-emerald-dark flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-main">grass</span>
          Active Projects
        </h2>
        <button className="text-sm font-semibold text-emerald-main hover:underline flex items-center gap-1">
          View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white/70 border border-white/60 p-5 rounded-xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-bold text-slate-gray">{proj.id}</span>
                <h3 className="text-lg font-bold text-emerald-dark leading-tight mt-1">{proj.title}</h3>
              </div>
              <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${
                proj.status === 'Funding' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-main/20 text-emerald-main'
              }`}>
                {proj.status}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-gray mb-1 font-semibold">
                <span>Funding Progress</span>
                <span>{proj.progress}%</span>
              </div>
              <div className="w-full bg-slate-gray/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-main to-[#10B981] h-2 rounded-full" 
                  style={{ width: `${proj.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-slate-gray">
                <span>{proj.currentFunding}</span>
                <span>{proj.fundingGoal}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mt-4 border-t border-slate-gray/10 pt-4">
              <div>
                <p className="text-xs text-slate-gray mb-1">Est. Harvest</p>
                <p className="font-semibold text-emerald-dark">{proj.harvestDate}</p>
              </div>
              <div>
                <p className="text-xs text-slate-gray mb-1">Smart Contract</p>
                <p className="font-mono text-xs text-blockchain-blue font-bold bg-blockchain-blue/5 p-1 inline-block rounded">{proj.contract}</p>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-emerald-main/10 hover:bg-emerald-main/20 text-emerald-main font-bold py-2 rounded-xl transition-all text-sm">
              Update Status Traceability
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
