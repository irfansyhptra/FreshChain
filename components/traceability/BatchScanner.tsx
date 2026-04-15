"use client";

import React, { useState } from 'react';

export default function BatchScanner() {
  const [batchId, setBatchId] = useState("");
  const [status, setStatus] = useState("Harvested");
  const [location, setLocation] = useState("Farm B");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/traceability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, status, location })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleScan} className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-emerald-dark mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined">qr_code_scanner</span>
        Physically Scan Batch to Blockchain
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-gray uppercase mb-1">Batch ID (From QR Print)</label>
          <input 
            type="text" 
            required 
            value={batchId} 
            onChange={e => setBatchId(e.target.value)}
            placeholder="e.g. TRC-8899-CORN"
            className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-gray uppercase mb-1">New Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)}
              className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner"
            >
              <option>Planted</option>
              <option>Harvested</option>
              <option>Quality Check</option>
              <option>Packaging</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-gray uppercase mb-1">Current Physical Location</label>
            <input 
              type="text" 
              required 
              value={location} 
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Storage Facility X"
              className="w-full bg-white/50 border border-white rounded-xl focus:ring-2 focus:ring-emerald-main focus:outline-none py-3 px-4 shadow-inner" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 bg-gradient-to-r from-blockchain-blue to-[#2563EB] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Syncing to Blockchain..." : "Record Digital Update"}
          {!loading && <span className="material-symbols-outlined text-sm">link</span>}
        </button>

        {result && result.success && (
          <div className="mt-4 p-4 bg-emerald-main/10 border border-emerald-main/20 rounded-xl text-emerald-dark">
            <p className="text-sm font-semibold flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-emerald-main">verified</span>
              Digital Twin Updated!
            </p>
            <p className="text-xs break-all"><strong>TxHash:</strong> {result.txHash}</p>
          </div>
        )}
      </div>
    </form>
  );
}
