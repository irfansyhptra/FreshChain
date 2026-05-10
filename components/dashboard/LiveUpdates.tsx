"use client";

import React, { useEffect, useState } from 'react';

type Update = {
  id: string;
  type: string;
  icon: string;
  color: string;
  message: string;
  time: string;
};

export default function LiveUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch('/api/petani/updates');
        const json = await res.json();
        if (json.success) {
          setUpdates(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch live updates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 border-b border-white/40 pb-4">
        <h2 className="text-xl font-plus font-bold text-emerald-dark flex items-center gap-2">
          <span className="material-symbols-outlined text-blockchain-blue animate-pulse">online_prediction</span>
          Live Farm Updates
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-gray">
          <span className="material-symbols-outlined animate-spin text-3xl text-blockchain-blue mb-2 block mx-auto">progress_activity</span>
          Loading live updates...
        </div>
      ) : updates.length === 0 ? (
        <div className="text-center py-8 text-slate-gray">
          <p>No recent farm updates.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
