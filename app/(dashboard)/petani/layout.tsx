"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/petani/dashboard",    icon: "dashboard",             label: "Dashboard" },
  { href: "/petani/marketplace",  icon: "storefront",            label: "Marketplace" },
  { href: "/petani/crowdfunding", icon: "campaign",              label: "Crowdfunding" },
  { href: "/petani/my-projects",  icon: "folder_special",        label: "Proyek Saya" },
  { href: "/petani/investments",  icon: "account_balance",       label: "Investments" },
  { href: "/petani/wallet",       icon: "account_balance_wallet", label: "Wallet" },
  { href: "/petani/kyc",          icon: "verified_user",         label: "KYC Status" },
  { href: "#",                    icon: "contact_support",       label: "Support" },
];

export default function PetaniLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-frosted-white text-slate-gray font-inter antialiased flex min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="fixed left-0 bottom-0 md:top-0 h-16 md:h-screen w-full md:w-64 bg-white/60 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/50 flex flex-row md:flex-col items-center md:items-stretch overflow-x-auto md:overflow-visible p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2 pointer-events-auto z-[100]">
        {/* Brand */}
        <div className="hidden md:flex items-center gap-3 px-4 py-6 mb-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-main to-[#10B981] flex items-center justify-center text-white shadow-md shadow-emerald-main/20">
            <span className="material-symbols-outlined">agriculture</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-emerald-dark leading-tight font-plus">FreshChain Portal</h1>
            <p className="text-[11px] text-slate-400">Verified Enterprise</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-row md:flex-col flex-1 space-x-1 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-hide">
          {NAV_ITEMS.map(({ href, icon, label }) => {
            const isActive = href !== "#" && (pathname === href || pathname.startsWith(href + "/"));
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-emerald-main/10 text-emerald-main"
                    : "text-slate-gray hover:bg-white/60 hover:text-emerald-dark"
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${isActive ? "text-emerald-main" : ""}`}>
                  {icon}
                </span>
                <span className="text-xs lg:text-sm hidden sm:inline md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="hidden md:block pt-4 mt-auto border-t border-white/40 flex-shrink-0">
          <button
            onClick={() => alert("Logging out...")}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-red-50 hover:text-red-500 rounded-xl transition-all duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-xs lg:text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 md:ml-64 w-full min-h-screen p-4 sm:p-6 lg:p-8 relative">
        {/* Decorative blobs */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-light/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-emerald-main/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
