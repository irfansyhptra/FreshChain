"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PetaniProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  return (
    <div className="bg-frosted-white text-slate-gray font-inter antialiased flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 bottom-0 lg:top-0 h-16 lg:h-screen w-full lg:w-64 bg-white/60 backdrop-blur-xl border-t lg:border-t-0 lg:border-r border-white/50 flex flex-row lg:flex-col items-center lg:items-stretch overflow-x-auto lg:overflow-visible p-2 lg:p-4 space-x-2 lg:space-x-0 lg:space-y-2 pointer-events-auto z-[100] scrollbar-hide">
        <div className="hidden lg:flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-main to-[#10B981] flex items-center justify-center text-white">
            <span className="material-symbols-outlined">campaign</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-dark leading-tight">FreshChain Portal</h1>
            <p className="text-xs text-slate-gray">Verified Enterprise</p>
          </div>
        </div>

        <nav className="flex flex-row lg:flex-col flex-1 space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
          <Link href="/petani/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Dashboard</span>
          </Link>
          <Link href="/petani/investments" className="flex items-center gap-3 px-4 py-3 bg-emerald-main/10 text-emerald-main rounded-xl font-semibold transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">account_balance</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Investments</span>
          </Link>
          <Link href="/petani/crowdfunding" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">campaign</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Crowdfunding</span>
          </Link>
          <Link href="/petani/wallet" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Wallet</span>
          </Link>
          <Link href="/petani/kyc" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">KYC Status</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">contact_support</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Support</span>
          </Link>
        </nav>

        <div className="hidden lg:block pt-4 mt-auto border-t border-white/40">
          <button onClick={() => alert('Logging out...')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-gray hover:bg-white/60 rounded-xl transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-xs lg:text-sm whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 lg:w-[calc(100%-16rem)] max-w-full w-full pt-10 pb-16 px-6 lg:px-12 max-w-7xl relative mx-auto">
        {/* Decorative Background */}
        <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-light/20 rounded-full blur-[120px] pointer-events-none" />

        <header className="flex justify-between items-center mb-10 relative z-10 w-full">
          <div>
            <h2 className="text-2xl md:text-2xl md:text-3xl font-plus font-extrabold tracking-tight text-emerald-dark">Project Details</h2>
            <p className="text-slate-gray mt-1">Review investment performance & project assets.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span onClick={() => alert('Notifications')} className="material-symbols-outlined text-slate-gray cursor-pointer hover:text-emerald-main">notifications</span>
              <span onClick={() => alert('Settings')} className="material-symbols-outlined text-slate-gray cursor-pointer hover:text-emerald-main">settings</span>
            </div>
            <button onClick={() => alert('Menghubungkan Metamask Web3 Wallet...')} className="bg-emerald-main text-white px-4 py-2 rounded-xl font-semibold shadow-md active:scale-95 transition-transform text-sm">
                Connect Wallet
            </button>
          </div>
        </header>

        {/* Project Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 lg:gap-8 relative z-10">
          {/* Left Column: Media & Description (Asymmetric Bento) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Main Image Card */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] relative group shadow-sm border border-white/50">
              <img 
                alt="Project Hero Image" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOevhOc58Lb6JpSc7xIGZ4cX-WZ8gaqVB5ADD6KN6_C6o5iAtvc9mrv4rqk3DQzTVoDW1P_zvEYZwnrYsHPjgHzJVN_pamws6kFA_B5npKjU4QkM3jlEPz_B1RJg0x6h_pGAdhsFkNs7JGI7RSUvfq1tEASlzHB-gjpGIHhR16hdWVslf-CQD-rzV7NayTA-I7gyENo9MG49xnhEHSacmaGBsKKjaHfzWIEDJ7yo-DSibpBVBS3hBxDiqwKPq9L_76VQ9kPa0srak" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <span className="bg-emerald-main/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Agriculture Tech</span>
                <h1 className="text-2xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">Eco-Harvest Vertical Farm #12</h1>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-emerald-main shadow-sm">
                <p className="text-slate-gray text-xs font-plus uppercase tracking-widest font-bold">Target Raise</p>
                <h3 className="text-xl font-bold text-emerald-main mt-1">$2,500,000</h3>
              </div>
              <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-golden-harvest shadow-sm">
                <p className="text-slate-gray text-xs font-plus uppercase tracking-widest font-bold">Min. Entry</p>
                <h3 className="text-xl font-bold text-golden-harvest mt-1">$100,000</h3>
              </div>
              <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-blockchain-blue shadow-sm">
                <p className="text-slate-gray text-xs font-plus uppercase tracking-widest font-bold">Investors</p>
                <h3 className="text-xl font-bold text-blockchain-blue mt-1">142</h3>
              </div>
              <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-slate-gray shadow-sm">
                <p className="text-slate-gray text-xs font-plus uppercase tracking-widest font-bold">Days Left</p>
                <h3 className="text-xl font-bold text-emerald-dark mt-1">14d 08h</h3>
              </div>
            </div>

            {/* Description & Details */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-2xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-white/50">
                <h2 className="text-2xl font-bold mb-4 text-emerald-dark font-plus">Project Overview</h2>
                <p className="text-slate-gray leading-relaxed text-sm">
                  The Eco-Harvest Vertical Farm initiative integrates high-efficiency LED lighting systems and automated nutrient delivery protocols to produce 40% more yield than traditional hydroponics. Located in the tech-hub periphery, this project leverages IoT sensors to monitor crop health in real-time, ensuring maximum efficiency and zero waste. 
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4 lg:gap-8">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-main uppercase mb-4 tracking-widest">RAB Details (Real Asset Backing)</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-slate-gray">
                        <span className="material-symbols-outlined text-emerald-main text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                        <span>Verified Land Title: Asset ID #7721-XA</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-gray">
                        <span className="material-symbols-outlined text-emerald-main text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                        <span>Insurance Cover: AgriShield Premium</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-gray">
                        <span className="material-symbols-outlined text-emerald-main text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                        <span>Yield Projection: 12.4% Fixed APY</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-main/5 border border-emerald-main/10 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-emerald-dark mb-2">Escrow Smart Contract</h4>
                    <p className="text-[10px] font-mono break-all text-slate-gray bg-white p-2 rounded-lg border border-white shadow-inner">
                      0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs text-emerald-main">security</span>
                        <span className="text-xs font-semibold text-emerald-dark">Audited by QuantStamp</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone Stepper */}
              <div className="p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 text-emerald-dark font-plus">Milestone Plan</h2>
                <div className="relative space-y-12">
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-gray/20"></div>
                  
                  {/* Step 1 */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-6 h-6 rounded-full bg-emerald-main flex items-center justify-center z-10 border-2 border-white shadow-sm">
                      <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-dark text-sm">Phase 1: Site Preparation & Foundation</h4>
                      <p className="text-xs text-slate-gray mt-1 leading-relaxed">Completed. Foundation and structural frame established. Water rights secured.</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-emerald-main/10 text-emerald-main text-[10px] font-bold rounded-lg uppercase">Completed</span>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-6 h-6 rounded-full bg-golden-harvest flex items-center justify-center z-10 border-2 border-white shadow-sm">
                      <span className="material-symbols-outlined text-white text-[10px] animate-spin">sync</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-dark text-sm">Phase 2: Hydroponic System Installation</h4>
                      <p className="text-xs text-slate-gray mt-1 leading-relaxed">In Progress. Installation of proprietary nutrient delivery arrays and IoT sensor mesh.</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-golden-harvest/10 text-golden-harvest text-[10px] font-bold rounded-lg uppercase">Active</span>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-gray/30 flex items-center justify-center z-10 shadow-inner">
                      <div className="w-2 h-2 rounded-full bg-slate-gray/50"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-dark text-sm">Phase 3: Seed Planting & Scale-up</h4>
                      <p className="text-xs text-slate-gray mt-1 leading-relaxed">Pending funding completion. Scheduled for Q4 2024.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Investment Module (Sticky Widget) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-white/80 backdrop-blur-2xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-white">
                <h2 className="text-xl font-extrabold mb-6 text-emerald-dark font-plus">Investment Portal</h2>
                
                {/* Funding Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-emerald-main">68% Funded</span>
                    <span className="text-sm font-medium text-slate-gray">$1,700,000 Raised</span>
                  </div>
                  <div className="h-2 w-full bg-slate-gray/10 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-emerald-main to-emerald-light" style={{ width: '68%' }}></div>
                  </div>
                </div>
                
                {/* Investment Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-gray uppercase mb-2">Investment Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-dark font-bold text-lg">$</span>
                      <input 
                        className="w-full bg-white/50 border border-white shadow-inner rounded-xl pl-8 pr-4 py-4 text-lg font-bold focus:ring-2 focus:ring-emerald-main focus:outline-none transition-all placeholder:text-slate-gray/40 text-emerald-dark" 
                        min="100000" 
                        placeholder="100,000" 
                        type="number"
                      />
                    </div>
                    <p className="text-[10px] text-slate-gray mt-2 px-1">Minimum contribution: $100,000.00 USD</p>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-gray uppercase mb-3">Payment Method</label>
                    <div className="grid grid-cols-1 gap-3">
                      <label className="group flex items-center justify-between p-4 bg-white/50 border border-white/60 rounded-xl cursor-pointer hover:bg-white transition-all shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-gray">account_balance</span>
                          <span className="text-sm font-semibold text-emerald-dark">Bank Transfer</span>
                        </div>
                        <input className="text-emerald-main focus:ring-emerald-main" name="payment" type="radio" />
                      </label>
                      <label className="group flex items-center justify-between p-4 bg-white/50 border border-white/60 rounded-xl cursor-pointer hover:bg-white transition-all shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-gray">wallet</span>
                          <span className="text-sm font-semibold text-emerald-dark">E-wallet</span>
                        </div>
                        <input className="text-emerald-main focus:ring-emerald-main" name="payment" type="radio" />
                      </label>
                      <label className="group flex items-center justify-between p-4 bg-white/50 border border-emerald-main/30 rounded-xl cursor-pointer bg-emerald-main/5 transition-all shadow-sm ring-1 ring-emerald-main/20">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-emerald-main">token</span>
                          <span className="text-sm font-semibold text-emerald-dark">Crypto (MetaMask)</span>
                        </div>
                        <input defaultChecked className="text-emerald-main focus:ring-emerald-main" name="payment" type="radio" />
                      </label>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-gradient-to-r from-emerald-main to-[#10B981] text-white rounded-xl font-bold text-lg shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                      Invest Now
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-slate-gray">
                    <span className="material-symbols-outlined text-xs">lock</span>
                    <span className="text-[10px] font-medium text-emerald-dark">Secured by Smart Escrow Architecture</span>
                  </div>
                </div>
              </div>

              {/* Secondary Card: Yield Calculator Placeholder */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-main/10 flex items-center justify-center text-emerald-main">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-dark">Estimated Yield</h4>
                    <p className="text-[10px] text-slate-gray uppercase font-bold tracking-wider mt-0.5">Projected returns for this phase</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-slate-gray/10 pt-4 mt-4">
                  <span className="text-2xl md:text-2xl md:text-3xl font-extrabold text-golden-harvest tracking-tight">12.4%</span>
                  <span className="text-[10px] font-semibold text-slate-gray mb-1.5 uppercase">Fixed Annual Rate</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (FAB) - For Mobile Engagement */}
      <div className="fixed bottom-6 right-6 md:hidden z-[100]">
        <button onClick={() => alert('Menghubungkan Metamask Web3 Wallet...')} className="bg-emerald-main text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform">
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </div>

    </div>
  );
}
