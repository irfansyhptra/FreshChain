"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function AppHome() {
  const { scrollY } = useScroll();
  
  // Parallax and fade effects for Hero section elements
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'petani' | 'investor' | 'konsumen'>('investor');

  const getRoleConfig = () => {
    switch (selectedRole) {
      case 'petani':
        return {
          href: '/petani/dashboard',
          roleName: 'Petani & Produsen',
          doc1Icon: 'landscape',
          doc1Title: 'KTP & Surat Tanah',
          doc1Desc: 'Bukti Legalitas Kepemilikan Lahan',
          doc2Icon: 'face_retouching_natural',
          doc2Title: 'Swafoto Liveness',
          doc2Desc: 'Pemindaian wajah biometrik'
        };
      case 'konsumen':
        return {
          href: '/marketplace',
          roleName: 'Konsumen',
          doc1Icon: 'contact_mail',
          doc1Title: 'Email & No. HP',
          doc1Desc: 'Untuk verifikasi akun dasar',
          doc2Icon: 'local_shipping',
          doc2Title: 'Alamat Pengiriman',
          doc2Desc: 'Data tujuan distribusi produk'
        };
      case 'investor':
      default:
        return {
          href: '/investor/dashboard',
          roleName: 'Investor',
          doc1Icon: 'upload_file',
          doc1Title: 'KTP / Paspor Resmi',
          doc1Desc: 'Maks 10MB (JPG, PNG)',
          doc2Icon: 'face_retouching_natural',
          doc2Title: 'Swafoto Liveness',
          doc2Desc: 'Pemindaian wajah biometrik'
        };
    }
  };

  const currentRole = getRoleConfig();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 relative min-h-screen font-inter selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/70 backdrop-blur-md border-b border-white/20 py-4 shadow-sm" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-6 lg:px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined ${isScrolled ? 'text-emerald-600' : 'text-emerald-400'} text-2xl md:text-2xl md:text-3xl`}>compost</span>
            <span className={`font-plus font-extrabold text-xl tracking-tight ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
              FreshChain
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`hidden sm:block text-sm font-semibold ${isScrolled ? 'text-slate-500' : 'text-white/80'}`}>
              Sudah punya akun?
            </span>
            <Button 
              variant={isScrolled ? "primary" : "secondary"}
              size="sm"
              onClick={() => setIsLoginModalOpen(true)}
              className="!px-6 !py-2.5 rounded-full font-bold"
            >
              Masuk
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          {/* Background Image Wrapper */}
          <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat" />
          {/* Dark/Green Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-emerald-950/40 to-slate-900/90" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Revolusi Agrikultur Indonesia
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl md:text-4xl md:text-6xl sm:text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-emerald-400 font-plus tracking-tighter mb-6 pb-2"
          >
            FreshChain
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl font-medium leading-relaxed mb-10"
          >
            Hubungkan modal cerdas, rantai pasok transparan, dan panen terbaik dalam satu ekosistem terdesentralisasi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button variant="primary" size="lg" className="rounded-full !px-8 !py-4 font-bold gap-2">
              Jelajahi Ekosistem <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-semibold">Scroll ke bawah</span>
          <span className="material-symbols-outlined">south</span>
        </motion.div>
      </section>

      {/* Main Content Area (Landing Page Body) */}
      <main className="relative z-20 bg-slate-50 pb-24">
        {/* Soft UI Decorators */}

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 overflow-hidden font-inter"
            >
              {/* Decorative shapes inside modal */}
              <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-emerald-400/20 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[60px] pointer-events-none" />

              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100/50 hover:bg-slate-200 text-slate-500 transition-colors z-10"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="relative z-10 text-center mb-8">
                <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-emerald-100">
                  <span className="material-symbols-outlined text-[24px]">compost</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 font-plus tracking-tight mb-1">Selamat Datang</h2>
                <p className="text-sm font-medium text-slate-500">Masuk ke akun FreshChain Anda.</p>
              </div>

              <form className="relative z-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">mail</span>
                    <input 
                      type="email" 
                      placeholder="Masukkan alamat email"
                      className="w-full bg-white/80 border border-slate-200/60 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kata Sandi</label>
                    <a href="#" className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">Lupa sandi?</a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">lock</span>
                    <input 
                      type="password" 
                      placeholder="Masukkan kata sandi"
                      className="w-full bg-white/80 border border-slate-200/60 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  className="!py-3.5 !rounded-2xl mt-2 font-bold"
                >
                  <span className="relative z-10">Masuk ke Dashboard</span>
                </Button>
              </form>

              <div className="relative z-10 mt-6 pt-6 border-t border-slate-200/60">
                <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-sm">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  <span className="text-sm">Lanjutkan dengan Google</span>
                </button>
                
                <p className="text-center text-xs text-slate-500 mt-6">
                  Belum punya akun? <a href="#join" onClick={() => setIsLoginModalOpen(false)} className="font-bold text-emerald-600 hover:text-emerald-700">Daftar sekarang</a>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent opacity-10 pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-emerald-main/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[60%] left-[-10%] w-[30%] h-[30%] bg-blockchain-blue/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-6 lg:px-4 sm:px-6 lg:px-10 pt-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-16 items-start"
          >
            
            {/* Left Column: Journey Intro */}
            <div className="w-full lg:w-5/12 space-y-10 lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div>
                <h2 className="text-2xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 font-plus leading-tight tracking-tight mb-4">
                  Mulai perjalanan<br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">agrikultur Anda</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium">
                  Amankan masa depan Anda dengan terhubung langsung ke sumber pertumbuhan yang berkelanjutan.
                </p>
              </div>

              {/* Vertical Stepper */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-200 before:via-slate-200 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-500 text-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                    1
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-white/60 backdrop-blur-xl border border-white rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800">Pilihan Role</h4>
                    <p className="text-sm text-slate-500 mt-1">Tentukan jalur ekosistem Anda</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-400 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                    2
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl">
                    <h4 className="font-bold text-slate-600">Detail Akun</h4>
                    <p className="text-sm text-slate-400 mt-1">Pengaturan Email & Keamanan</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-30">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-400 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                    3
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl">
                    <h4 className="font-bold text-slate-600">Verifikasi KYC</h4>
                    <p className="text-sm text-slate-400 mt-1">Pemeriksaan Identitas Otomatis</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/80 backdrop-blur-md border border-blue-100 p-5 rounded-2xl flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-600 mt-0.5">verified_user</span>
                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                  "FreshChain menggunakan enkripsi standar bank dan identitas terdesentralisasi untuk memastikan data Anda aman dan privat."
                </p>
              </div>
            </div>

            {/* Right Column: Role Selection */}
            <div className="w-full lg:w-7/12 space-y-8">
              
              <div className="bg-white/60 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-slate-800 font-plus mb-2">Pilih Peran Anda</h2>
                  <p className="text-slate-500 font-medium">Pilih profil yang paling menjelaskan tujuan Anda di platform kami.</p>
                </div>

                <div className="space-y-4">
                  {/* Petani */}
                  <div 
                    onClick={() => setSelectedRole('petani')}
                    className={`group relative border p-5 rounded-2xl cursor-pointer overflow-hidden transition-all hover:shadow-lg ${selectedRole === 'petani' ? 'bg-emerald-50/50 border-emerald-500 shadow-md shadow-emerald-500/10' : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-emerald-500/10'}`}
                  >
                    {selectedRole === 'petani' && (
                      <div className="absolute right-4 top-4 z-20">
                        <span className="material-symbols-outlined text-emerald-500" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      </div>
                    )}
                    <div className="absolute right-[-10%] top-[-20%] text-slate-50 group-hover:text-emerald-50 transition-colors">
                      <span className="material-symbols-outlined text-[120px]" style={{fontVariationSettings: "'FILL' 1"}}>agriculture</span>
                    </div>
                    <div className="relative z-10 flex gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selectedRole === 'petani' ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/40' : 'bg-orange-50 text-orange-600 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                        <span className="material-symbols-outlined text-[28px]">agriculture</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-lg font-bold transition-colors ${selectedRole === 'petani' ? 'text-emerald-800' : 'text-slate-800 group-hover:text-emerald-700'}`}>Petani & Produsen</h3>
                        </div>
                        <p className={`text-sm mb-4 pr-10 ${selectedRole === 'petani' ? 'text-emerald-700/80' : 'text-slate-500'}`}>Daftarkan proyek Anda, raih pendanaan, dan pantau produksi menggunakan pencatatan terdesentralisasi.</p>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${selectedRole === 'petani' ? 'bg-emerald-200/50' : 'bg-slate-100'}`}>
                          <div className={`h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 ease-out ${selectedRole === 'petani' ? 'w-2/3 bg-emerald-500' : 'w-0 group-hover:w-full'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Investor */}
                  <div 
                    onClick={() => setSelectedRole('investor')}
                    className={`group relative border p-5 rounded-2xl cursor-pointer overflow-hidden transition-all hover:shadow-lg ${selectedRole === 'investor' ? 'bg-emerald-50/50 border-emerald-500 shadow-md shadow-emerald-500/10' : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-emerald-500/10'}`}
                  >
                    {selectedRole === 'investor' && (
                      <div className="absolute right-4 top-4 z-20">
                        <span className="material-symbols-outlined text-emerald-500" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      </div>
                    )}
                    <div className="absolute right-[-10%] top-[-20%] text-slate-50 group-hover:text-emerald-50 transition-colors">
                      <span className="material-symbols-outlined text-[120px]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance</span>
                    </div>
                    <div className="relative z-10 flex gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selectedRole === 'investor' ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/40' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                        <span className="material-symbols-outlined text-[28px]">account_balance</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-lg font-bold transition-colors ${selectedRole === 'investor' ? 'text-emerald-800' : 'text-slate-800 group-hover:text-emerald-700'}`}>Investor Terverifikasi</h3>
                        </div>
                        <p className={`text-sm mb-4 pr-10 ${selectedRole === 'investor' ? 'text-emerald-700/80' : 'text-slate-500'}`}>Diversifikasikan portofolio Anda ke permodalan agrikultur aset hijau dunia nyata. Pantau ROI teraman.</p>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${selectedRole === 'investor' ? 'bg-emerald-200/50' : 'bg-slate-100'}`}>
                          <div className={`h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 ease-out ${selectedRole === 'investor' ? 'w-2/3 bg-emerald-500' : 'w-0 group-hover:w-full'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Konsumen */}
                  <div 
                    onClick={() => setSelectedRole('konsumen')}
                    className={`group relative border p-5 rounded-2xl cursor-pointer overflow-hidden transition-all hover:shadow-lg ${selectedRole === 'konsumen' ? 'bg-blue-50/50 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-blue-500/10'}`}
                  >
                    {selectedRole === 'konsumen' && (
                      <div className="absolute right-4 top-4 z-20">
                        <span className="material-symbols-outlined text-blue-500" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                      </div>
                    )}
                    <div className="absolute right-[-10%] top-[-20%] text-slate-50 group-hover:text-blue-50 transition-colors">
                      <span className="material-symbols-outlined text-[120px]" style={{fontVariationSettings: "'FILL' 1"}}>shopping_basket</span>
                    </div>
                    <div className="relative z-10 flex gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selectedRole === 'konsumen' ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/40' : 'bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                        <span className="material-symbols-outlined text-[28px]">shopping_basket</span>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-lg font-bold transition-colors ${selectedRole === 'konsumen' ? 'text-blue-800' : 'text-slate-800 group-hover:text-blue-700'}`}>Konsumen</h3>
                        </div>
                        <p className={`text-sm mb-4 pr-10 ${selectedRole === 'konsumen' ? 'text-blue-700/80' : 'text-slate-500'}`}>Akses langsung ke hasil bumi organik yang bisa dilacak asal mulanya melalui verifikasi blockchain.</p>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${selectedRole === 'konsumen' ? 'bg-blue-200/50' : 'bg-slate-100'}`}>
                          <div className={`h-full bg-gradient-to-r from-blue-400 to-sky-400 transition-all duration-500 ease-out ${selectedRole === 'konsumen' ? 'w-2/3 bg-blue-500' : 'w-0 group-hover:w-full'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Akun Preview Box */}
              <div className="bg-white/60 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Detail Akun</h3>
                <p className="text-sm text-slate-500 mb-6">Pengaturan Email & Keamanan</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Nama Lengkap</label>
                      <input type="text" placeholder="Sesuai Identitas" className="w-full bg-transparent outline-none text-sm text-slate-800 font-medium placeholder-slate-400" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email Anda</label>
                      <input type="email" placeholder="akun@email.com" className="w-full bg-transparent outline-none text-sm text-slate-800 font-medium placeholder-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Nomor HP</label>
                      <input type="tel" placeholder="08123456789" className="w-full bg-transparent outline-none text-sm text-slate-800 font-medium placeholder-slate-400" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Tanggal Lahir</label>
                      <input type="date" className="w-full bg-transparent outline-none text-sm text-slate-800 font-medium text-slate-400" />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Alamat Lengkap</label>
                    <textarea rows={2} placeholder="Masukkan alamat lengkap" className="w-full bg-transparent outline-none text-sm text-slate-800 font-medium placeholder-slate-400 resize-none"></textarea>
                  </div>
                </div>
              </div>

              {/* KYC Security Preview Box */}
              <div className="bg-slate-100/50 border border-slate-200/60 rounded-3xl p-4 sm:p-6 lg:p-4 sm:p-6 lg:p-8 relative overflow-hidden backdrop-blur-lg">
                <div className="absolute top-0 right-0 p-4">
                   <span className="bg-slate-800 text-white px-3 py-1 text-xs font-bold rounded-full tracking-wide">WAJIB KYC</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1">Verifikasi KYC</h3>
                <p className="text-sm text-slate-500 mb-6">Pemeriksaan Identitas Otomatis bagi <strong className={selectedRole === 'konsumen' ? 'text-blue-600' : 'text-emerald-600'}>{currentRole.roleName}</strong></p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-3 shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">{currentRole.doc1Icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{currentRole.doc1Title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{currentRole.doc1Desc}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-3 shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100 shrink-0">
                      <span className="material-symbols-outlined text-[20px]">{currentRole.doc2Icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{currentRole.doc2Title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{currentRole.doc2Desc}</p>
                    </div>
                  </div>
                </div>
              </div>

               {/* Action Footer */}
              <div className="flex flex-col items-center sm:flex-row justify-between gap-4 pt-6 border-t border-slate-200/60 mt-10">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Melanjutkan berarti Anda menyetujui <a href="#" className="font-bold text-emerald-600 hover:underline">Syarat Layanan</a> dan <a href="#" className="font-bold text-emerald-600 hover:underline">Kebijakan Privasi</a>.
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-6 py-3 font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    Kembali
                  </button>
                  <Link href={currentRole.href} className="flex-1 sm:flex-none">
                    <button className={`w-full px-8 py-3 font-bold text-white border shadow-sm rounded-xl transition-colors ${selectedRole === 'konsumen' ? 'bg-blue-600 border-blue-500 shadow-blue-500/20 hover:bg-blue-700' : 'bg-emerald-600 border-emerald-500 shadow-emerald-500/20 hover:bg-emerald-700'}`}>
                      Lanjutkan
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </main>

    </div>
  );
}
