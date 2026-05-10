"use client";

import React from "react";
import CampaignForm from "@/components/crowdfunding/CampaignForm";

export default function CrowdfundingCreate() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-dark font-plus tracking-tight mb-2">
          Buat Proyek Crowdfunding
        </h2>
        <p className="text-slate-gray">
          Buat RAB berbasis aktivitas dengan multi-item sebagai dasar pendanaan Anda.
        </p>
      </div>

      <CampaignForm isEdit={false} />
    </>
  );
}