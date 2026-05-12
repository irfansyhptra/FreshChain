"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", icon: "admin_panel_settings", label: "Super Admin" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-frosted-white text-slate-gray font-inter antialiased flex min-h-screen">
      <aside className="fixed left-0 bottom-0 md:top-0 h-16 md:h-screen w-full md:w-64 bg-white/60 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/50 flex flex-row md:flex-col items-center md:items-stretch overflow-x-auto md:overflow-visible p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2 pointer-events-auto z-[100]">
        <div className="hidden md:flex items-center gap-3 px-4 py-6 mb-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-indigo-900 leading-tight font-plus">FreshChain Admin</h1>
            <p className="text-[11px] text-slate-400">Super Admin</p>
          </div>
        </div>

        <nav className="flex flex-row md:flex-col flex-1 space-x-1 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-hide">
          {NAV_ITEMS.map(({ href, icon, label }) => {
            const isActive = href === pathname;
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-700"
                    : "text-slate-gray hover:bg-white/60 hover:text-indigo-900"
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${isActive ? "text-indigo-700" : ""}`}>
                  {icon}
                </span>
                <span className="text-xs lg:text-sm hidden sm:inline md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block pt-4 mt-auto border-t border-white/40 flex-shrink-0">
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-red-50 hover:text-red-500 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-xs lg:text-sm">Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 w-full min-h-screen p-4 sm:p-6 lg:p-8 relative">
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-indigo-700/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
