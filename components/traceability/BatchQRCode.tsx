"use client";

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface BatchQRCodeProps {
  batchId: string;
  productName: string;
}

export default function BatchQRCode({ batchId, productName }: BatchQRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Automatically creates the link back to the tracking system
  const trackingUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/traceability/${batchId}`;

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Batch-${batchId}-QR.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm max-w-xs mx-auto">
      <h3 className="text-lg font-bold text-emerald-dark mb-2 text-center">{productName}</h3>
      <p className="text-xs text-slate-gray mb-4 text-center">Batch ID: {batchId}</p>
      
      <div ref={qrRef} className="p-4 bg-white rounded-xl shadow-inner mb-4">
        <QRCodeSVG 
          value={trackingUrl} 
          size={180} 
          fgColor="#022c22" 
          bgColor="#ffffff" 
          level="H" 
          includeMargin={false}
        />
      </div>
      
      <p className="text-[10px] text-slate-gray mb-4 text-center">Scan untuk melihat riwayat traceability</p>
      
      <button 
        onClick={downloadQR}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-main to-[#10B981] text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:shadow-lg active:scale-95"
      >
        <span className="material-symbols-outlined text-sm">download</span>
        Print QR Code
      </button>
    </div>
  );
}
