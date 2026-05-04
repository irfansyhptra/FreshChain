"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = 'petani' | 'investor' | 'konsumen';
type KycStep = 'doc1' | 'doc2' | null;
type StepStatus = 'upcoming' | 'active' | 'done';

interface KycDoc {
  icon: string;
  title: string;
  desc: string;
  formType: 'upload' | 'camera' | 'input';
  inputLabel?: string;
  inputPlaceholder?: string;
  acceptTypes?: string;
}

interface RoleConfig {
  href: string;
  roleName: string;
  accentColor: string;
  doc1: KycDoc;
  doc2: KycDoc;
}

// ─── Role Configurations ──────────────────────────────────────────────────────
const ROLES: Record<Role, RoleConfig> = {
  petani: {
    href: '/petani/dashboard',
    roleName: 'Petani & Produsen',
    accentColor: 'emerald',
    doc1: {
      icon: 'badge',
      title: 'KTP & Surat Tanah',
      desc: 'Unggah foto/scan KTP dan sertifikat kepemilikan lahan yang masih berlaku.',
      formType: 'upload',
      acceptTypes: 'image/*,.pdf',
    },
    doc2: {
      icon: 'face_retouching_natural',
      title: 'Swafoto Liveness',
      desc: 'Ambil foto wajah langsung untuk verifikasi biometrik real-time.',
      formType: 'camera',
    },
  },
  investor: {
    href: '/investor/dashboard',
    roleName: 'Investor',
    accentColor: 'violet',
    doc1: {
      icon: 'credit_card',
      title: 'KTP / Paspor Resmi',
      desc: 'Unggah foto dokumen identitas resmi. Maks 10MB (JPG, PNG, PDF).',
      formType: 'upload',
      acceptTypes: 'image/*,.pdf',
    },
    doc2: {
      icon: 'face_retouching_natural',
      title: 'Swafoto Liveness',
      desc: 'Ambil foto wajah langsung untuk verifikasi biometrik real-time.',
      formType: 'camera',
    },
  },
  konsumen: {
    href: '/marketplace',
    roleName: 'Konsumen',
    accentColor: 'sky',
    doc1: {
      icon: 'contact_mail',
      title: 'Email & No. HP',
      desc: 'Masukkan email aktif dan nomor HP untuk verifikasi OTP.',
      formType: 'input',
      inputLabel: 'Nomor HP',
      inputPlaceholder: '+62 812 3456 7890',
    },
    doc2: {
      icon: 'local_shipping',
      title: 'Alamat Pengiriman',
      desc: 'Isi alamat lengkap sebagai tujuan distribusi produk Anda.',
      formType: 'input',
      inputLabel: 'Alamat Lengkap',
      inputPlaceholder: 'Jl. Contoh No. 1, Kota, Provinsi',
    },
  },
};

// ─── Color Map ────────────────────────────────────────────────────────────────
const COLOR: Record<string, Record<string, string>> = {
  emerald: {
    bg50: 'bg-emerald-50', bg100: 'bg-emerald-100', bg500: 'bg-emerald-500', bg600: 'bg-emerald-600',
    border200: 'border-emerald-200', border500: 'border-emerald-500',
    text600: 'text-emerald-600', text700: 'text-emerald-700', text800: 'text-emerald-800',
    ring: 'ring-emerald-500', shadow: 'shadow-emerald-500/25', btn: 'bg-emerald-600 hover:bg-emerald-700',
    btnGrad: 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
    badge: 'bg-emerald-500 text-white border-emerald-500', tag: 'bg-emerald-100 text-emerald-700',
    cardBody: 'bg-emerald-50/80',
    strip: 'bg-emerald-50 border-emerald-200 text-emerald-800', stripIcon: 'text-emerald-500',
    formBorder: 'focus-within:border-emerald-400', svgStroke: '#10b981',
    gradFrom: 'from-emerald-400', gradVia: 'via-green-500', gradTo: 'to-teal-600',
    hex: '#10b981', hexLight: '#d1fae5', hexDark: '#065f46',
  },
  violet: {
    bg50: 'bg-violet-50', bg100: 'bg-violet-100', bg500: 'bg-violet-500', bg600: 'bg-violet-600',
    border200: 'border-violet-200', border500: 'border-violet-500',
    text600: 'text-violet-600', text700: 'text-violet-700', text800: 'text-violet-800',
    ring: 'ring-violet-500', shadow: 'shadow-violet-500/25', btn: 'bg-violet-600 hover:bg-violet-700',
    btnGrad: 'from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600',
    badge: 'bg-violet-500 text-white border-violet-500', tag: 'bg-violet-100 text-violet-700',
    cardBody: 'bg-violet-50/80',
    strip: 'bg-violet-50 border-violet-200 text-violet-800', stripIcon: 'text-violet-500',
    formBorder: 'focus-within:border-violet-400', svgStroke: '#8b5cf6',
    gradFrom: 'from-violet-400', gradVia: 'via-purple-500', gradTo: 'to-indigo-600',
    hex: '#8b5cf6', hexLight: '#ede9fe', hexDark: '#4c1d95',
  },
  sky: {
    bg50: 'bg-sky-50', bg100: 'bg-sky-100', bg500: 'bg-sky-500', bg600: 'bg-sky-600',
    border200: 'border-sky-200', border500: 'border-sky-500',
    text600: 'text-sky-600', text700: 'text-sky-700', text800: 'text-sky-800',
    ring: 'ring-sky-500', shadow: 'shadow-sky-500/25', btn: 'bg-sky-600 hover:bg-sky-700',
    btnGrad: 'from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600',
    badge: 'bg-sky-500 text-white border-sky-500', tag: 'bg-sky-100 text-sky-700',
    cardBody: 'bg-sky-50/80',
    strip: 'bg-sky-50 border-sky-200 text-sky-800', stripIcon: 'text-sky-500',
    formBorder: 'focus-within:border-sky-400', svgStroke: '#0ea5e9',
    gradFrom: 'from-sky-400', gradVia: 'via-blue-500', gradTo: 'to-cyan-600',
    hex: '#0ea5e9', hexLight: '#e0f2fe', hexDark: '#0c4a6e',
  },
};

// ─── Role Confirm Dialog ──────────────────────────────────────────────────────
function RoleConfirmDialog({
  role, onConfirm, onCancel
}: { role: Role; onConfirm: () => void; onCancel: () => void }) {
  const rc = ROLES[role];
  const c = COLOR[rc.accentColor];
  const roleIcons: Record<Role, string> = { petani: 'agriculture', investor: 'account_balance', konsumen: 'shopping_basket' };
  const roleGrads: Record<Role, string> = {
    petani: 'from-emerald-400 via-green-500 to-teal-600',
    investor: 'from-violet-400 via-purple-500 to-indigo-600',
    konsumen: 'from-sky-400 via-blue-500 to-cyan-600',
  };
  const roleDescs: Record<Role, string> = {
    petani: 'Anda akan mendaftarkan diri sebagai Petani & Produsen. Anda memerlukan dokumen KTP, sertifikat lahan, dan verifikasi wajah.',
    investor: 'Anda akan mendaftarkan diri sebagai Investor. Anda memerlukan dokumen KTP/Paspor resmi dan verifikasi wajah.',
    konsumen: 'Anda akan mendaftarkan diri sebagai Konsumen. Anda memerlukan nomor HP aktif dan alamat pengiriman.',
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-slate-900/25 overflow-hidden"
      >
        {/* Top gradient banner */}
        <div className={`h-28 bg-linear-to-br ${roleGrads[role]} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 right-4 w-20 h-20 bg-white/30 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
          </div>
          <span className="material-symbols-outlined text-white text-[56px] relative z-10 drop-shadow-md"
            style={{ fontVariationSettings: "'FILL' 1" }}>{roleIcons[role]}</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-extrabold text-slate-900 font-plus text-center mb-1">
            Pilih sebagai {rc.roleName}?
          </h3>
          <p className="text-sm text-slate-500 text-center leading-relaxed mb-5">
            {roleDescs[role]}
          </p>

          <div className={`flex items-start gap-2.5 px-3.5 py-3 ${c.bg50} rounded-2xl border ${c.border200} mb-5`}>
            <span className={`material-symbols-outlined text-[15px] ${c.text600} mt-0.5 shrink-0`}
              style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            <p className={`text-xs ${c.text700} leading-relaxed font-medium`}>
              Setelah memilih, peran tidak dapat diubah selama proses pendaftaran ini. Pastikan pilihan Anda sudah benar.
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-3 rounded-xl font-bold text-sm text-white bg-linear-to-r ${c.gradFrom} ${c.gradTo} shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}
            >
              Ya, Konfirmasi
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Step Badge ───────────────────────────────────────────────────────────────
function StepBadge({ n, label, sub, status, accentColor }: {
  n: number; label: string; sub: string; status: StepStatus; accentColor: string;
}) {
  const c = COLOR[accentColor];
  const isDone = status === 'done';
  const isActive = status === 'active';

  return (
    <motion.div
      animate={{ opacity: status === 'upcoming' ? 0.4 : 1 }}
      transition={{ duration: 0.4 }}
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-sm border border-slate-100' : ''}`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm shadow-sm transition-all duration-500
        ${isDone
          ? `bg-linear-to-br ${c.gradFrom} ${c.gradTo} text-white`
          : isActive
            ? `bg-linear-to-br ${c.gradFrom} ${c.gradTo} text-white ring-4 ring-offset-2`
            : 'bg-slate-200 text-slate-400'}`}

      >
        {isDone
          ? <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
          : n
        }
      </div>
      <div>
        <p className={`font-bold text-sm ${isActive || isDone ? 'text-slate-800' : 'text-slate-600'}`}>{label}</p>
        <p className={`text-xs mt-0.5 ${isActive || isDone ? 'text-slate-500' : 'text-slate-400'}`}>{sub}</p>
      </div>
      {isDone && (
        <div className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${c.bg100} ${c.text700}`}>
          Selesai
        </div>
      )}
    </motion.div>
  );
}

// ─── KYC Card Component ───────────────────────────────────────────────────────
function KycCard({
  doc, stepKey, activeStep, onToggle, accentColor, uploaded, onUploaded,
}: {
  doc: KycDoc; stepKey: KycStep; activeStep: KycStep; onToggle: (k: KycStep) => void;
  accentColor: string; uploaded: boolean; onUploaded: () => void;
}) {
  const c = COLOR[accentColor];
  const isOpen = activeStep === stepKey;
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [captured, setCaptured] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFileName(f.name); onUploaded(); }
  };

  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch { /* permission denied */ }
  };

  const capturePhoto = () => {
    setCaptured(true);
    setCameraActive(false);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
    onUploaded();
  };

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden
      ${isOpen
        ? `ring-2 ${c.ring} shadow-lg ${c.shadow} border-transparent`
        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md'}`}
    >
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : stepKey)}
        className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${isOpen ? c.bg50 : 'bg-white hover:bg-slate-50/80'}`}
      >
        <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border transition-all
          ${isOpen ? `${c.bg100} ${c.border200} ${c.text600} shadow-sm` : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{doc.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm leading-tight ${isOpen ? c.text800 : 'text-slate-800'}`}>{doc.title}</p>
          <p className={`text-xs mt-0.5 leading-relaxed ${isOpen ? c.text700 : 'text-slate-500'}`}>{doc.desc}</p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {uploaded ? (
            <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${c.bg100} ${c.text700} border ${c.border200}`}>
              <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Lengkap
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Diperlukan
            </span>
          )}
          <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${isOpen ? `${c.text600} rotate-180` : 'text-slate-400'}`}>
            expand_more
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 pt-1 border-t ${c.border200} ${c.bg50}/60`}>
              {doc.formType === 'upload' && (
                <div className="mt-4 space-y-3">
                  <input ref={fileRef} type="file" accept={doc.acceptTypes} className="hidden" onChange={handleFile} />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className={`w-full group flex flex-col items-center justify-center gap-3 py-8 rounded-2xl border-2 border-dashed transition-all duration-200
                      ${fileName ? `${c.border500} ${c.bg50}` : `border-slate-200 hover:${c.border200} hover:${c.bg50} bg-white`}`}
                  >
                    {fileName ? (
                      <>
                        <div className={`w-10 h-10 rounded-full ${c.bg100} flex items-center justify-center`}>
                          <span className={`material-symbols-outlined text-[22px] ${c.text600}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                        <div className="text-center">
                          <p className={`text-sm font-bold ${c.text700}`}>{fileName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Klik untuk ganti file</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[22px] text-slate-500">upload_file</span>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-700">Klik untuk unggah dokumen</p>
                          <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, atau PDF • Maks 10MB</p>
                        </div>
                      </>
                    )}
                  </button>
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50/70 rounded-xl border border-amber-100">
                    <span className="material-symbols-outlined text-amber-500 text-[15px] mt-0.5 shrink-0">info</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">Pastikan dokumen terbaca jelas, tidak blur, dan semua sudut terlihat penuh.</p>
                  </div>
                </div>
              )}

              {doc.formType === 'camera' && (
                <div className="mt-4 space-y-3">
                  {!cameraActive && !captured && (
                    <button
                      type="button"
                      onClick={startCamera}
                      className={`w-full flex flex-col items-center justify-center gap-3 py-8 rounded-2xl border-2 border-dashed border-slate-200 hover:${c.border200} hover:${c.bg50} bg-white transition-all duration-200 group`}
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[22px] text-slate-500">camera_alt</span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-700">Aktifkan kamera</p>
                        <p className="text-xs text-slate-400 mt-0.5">Izinkan akses kamera untuk swafoto</p>
                      </div>
                    </button>
                  )}
                  {cameraActive && (
                    <div className="space-y-3">
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900">
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-32 h-40 rounded-full border-2 border-white/50 border-dashed" />
                        </div>
                      </div>
                      <button type="button" onClick={capturePhoto} className={`w-full py-3 rounded-xl font-bold text-white text-sm ${c.btn} transition-all`}>
                        <span className="flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">camera</span>
                          Ambil Foto Sekarang
                        </span>
                      </button>
                    </div>
                  )}
                  {captured && (
                    <div className={`flex flex-col items-center gap-3 py-8 rounded-2xl ${c.bg50} border ${c.border200}`}>
                      <div className={`w-12 h-12 rounded-full ${c.bg100} flex items-center justify-center`}>
                        <span className={`material-symbols-outlined text-[26px] ${c.text600}`} style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                      </div>
                      <div className="text-center">
                        <p className={`text-sm font-extrabold ${c.text800}`}>Swafoto berhasil diambil!</p>
                        <button type="button" onClick={() => { setCaptured(false); }} className={`text-xs ${c.text600} mt-1 hover:underline`}>
                          Ulangi foto
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50/70 rounded-xl border border-amber-100">
                    <span className="material-symbols-outlined text-amber-500 text-[15px] mt-0.5 shrink-0">info</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">Pastikan wajah Anda berada di tengah frame, cahaya cukup, dan tidak menggunakan kacamata gelap.</p>
                  </div>
                </div>
              )}

              {doc.formType === 'input' && (
                <div className="mt-4 space-y-3">
                  <div className={`rounded-2xl bg-white border border-slate-200 ${c.formBorder} focus-within:ring-4 focus-within:ring-slate-500/10 focus-within:shadow-md transition-all p-4`}>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{doc.inputLabel}</label>
                    {doc.inputLabel === 'Alamat Lengkap' ? (
                      <textarea rows={3} placeholder={doc.inputPlaceholder} className="w-full bg-transparent outline-none text-sm text-slate-800 font-semibold placeholder-slate-400 resize-none"
                        onChange={(e) => { if (e.target.value.length > 5) onUploaded(); }} />
                    ) : (
                      <input type="tel" placeholder={doc.inputPlaceholder} className="w-full bg-transparent outline-none text-sm text-slate-800 font-semibold placeholder-slate-400"
                        onChange={(e) => { if (e.target.value.length > 5) onUploaded(); }} />
                    )}
                  </div>
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50/70 rounded-xl border border-amber-100">
                    <span className="material-symbols-outlined text-amber-500 text-[15px] mt-0.5 shrink-0">info</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">Data ini hanya digunakan untuk keperluan verifikasi dan pengiriman produk.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AppHome() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login gagal");
        setLoginLoading(false);
        return;
      }

      // Redirect based on role
      const role = data.user?.role?.toLowerCase();
      if (role === "petani") {
         window.location.href = "/petani/dashboard";
      } else if (role === "investor") {
         window.location.href = "/investor/dashboard";
      } else if (role === "konsumen") {
         window.location.href = "/marketplace";
      } else if (role === "admin") {
         window.location.href = "/admin";
      } else {
         window.location.href = "/petani/dashboard"; // fallback
      }
    } catch (err) {
      console.error(err);
      setLoginError("Terjadi kesalahan jaringan");
      setLoginLoading(false);
    }
  };

  // Role states: null = not picked yet, string = confirmed
  const [pendingRole, setPendingRole] = useState<Role | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [accountFilled, setAccountFilled] = useState(false);
  const [activeKyc, setActiveKyc] = useState<KycStep>(null);
  const [kycUploaded, setKycUploaded] = useState<Record<string, boolean>>({});

  // Account form tracking
  const [accountFields, setAccountFields] = useState({ name: '', email: '', phone: '', dob: '', address: '' });

  const role = selectedRole ? ROLES[selectedRole] : null;
  const c = selectedRole ? COLOR[role!.accentColor] : COLOR['emerald'];
  const kycDone = (kycUploaded['doc1'] ? 1 : 0) + (kycUploaded['doc2'] ? 1 : 0);
  const kycComplete = kycDone === 2;

  // Step statuses
  const step1Status: StepStatus = selectedRole ? 'done' : 'active';
  const step2Status: StepStatus = !selectedRole ? 'upcoming' : accountFilled ? 'done' : 'active';
  const step3Status: StepStatus = !accountFilled ? 'upcoming' : kycComplete ? 'done' : 'active';

  const handleAccountChange = (field: string, value: string) => {
    const updated = { ...accountFields, [field]: value };
    setAccountFields(updated);
    const filled = updated.name.length > 2 && updated.email.includes('@') && updated.phone.length > 6 && updated.address.length > 5;
    setAccountFilled(filled);
  };

  useEffect(() => { setActiveKyc(null); setKycUploaded({}); }, [selectedRole]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const roleIcons: Record<Role, string> = { petani: 'agriculture', investor: 'account_balance', konsumen: 'shopping_basket' };
  const roleBadges: Record<Role, string> = { petani: 'AGRI', investor: 'ROI', konsumen: 'BELI' };
  const roleTags: Record<Role, string[]> = {
    petani: ['Pendanaan', 'Traceability', 'Dashboard'],
    investor: ['Portofolio', 'ROI', 'Aset Hijau'],
    konsumen: ['Organik', 'Tertelusur', 'Langsung'],
  };
  const roleGrads: Record<Role, string> = {
    petani: 'from-emerald-400 via-green-500 to-teal-600',
    investor: 'from-violet-400 via-purple-500 to-indigo-600',
    konsumen: 'from-sky-400 via-blue-500 to-cyan-600',
  };
  const roleDescs: Record<Role, string> = {
    petani: 'Daftarkan lahan, terima pendanaan, dan jual hasil panen langsung ke pasar.',
    investor: 'Investasikan modal ke komoditas pertanian terverifikasi dengan ROI transparan.',
    konsumen: 'Beli produk segar langsung dari petani, bebas perantara.',
  };

  return (
    <div className="bg-slate-50 relative min-h-screen font-inter selection:bg-emerald-500 selection:text-white">

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3 shadow-sm"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isScrolled ? 'bg-emerald-600' : 'bg-white/20 backdrop-blur-md border border-white/30'}`}>
              <span className={`material-symbols-outlined text-[18px] ${isScrolled ? 'text-white' : 'text-emerald-300'}`}>compost</span>
            </div>
            <span className={`font-plus font-extrabold text-xl tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              FreshChain
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`hidden sm:block text-sm font-medium transition-colors ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}>
              Sudah punya akun?
            </span>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${isScrolled
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/25 hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5'
                }`}
            >
              Masuk
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-emerald-950/50 to-slate-900/95" />
        </motion.div>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Revolusi Agrikultur Indonesia
          </motion.div>

          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.35 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-white via-emerald-100 to-emerald-400 font-plus tracking-tighter mb-6 pb-2"
          >
            FreshChain
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.55 }}
            className="text-lg sm:text-xl text-white/75 max-w-2xl font-medium leading-relaxed mb-10"
          >
            Hubungkan modal cerdas, rantai pasok transparan, dan panen terbaik dalam satu ekosistem terdesentralisasi.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/40 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
              Jelajahi Ekosistem
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20 backdrop-blur-md">
              Pelajari Lebih Lanjut
            </button>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: heroOpacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Gulir ke bawah</span>
          <span className="material-symbols-outlined text-[20px]">south</span>
        </motion.div>
      </section>

      {/* ── Main Content ── */}
      <main className="relative z-20 bg-slate-50 pb-36" id="join">

        {/* ── Role Confirm Dialog ── */}
        <AnimatePresence>
          {showConfirm && pendingRole && (
            <RoleConfirmDialog
              role={pendingRole}
              onConfirm={() => {
                setSelectedRole(pendingRole);
                setShowConfirm(false);
                setPendingRole(null);
              }}
              onCancel={() => {
                setShowConfirm(false);
                setPendingRole(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Login Modal ── */}
        <AnimatePresence>
          {isLoginModalOpen && (
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-900/20 p-8 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                <button onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-10"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <div className="relative z-10 text-center mb-8">
                  <div className="w-12 h-12 mx-auto bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-emerald-500/30">
                    <span className="material-symbols-outlined text-white text-[22px]">compost</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-plus tracking-tight mb-1">Selamat Datang</h2>
                  <p className="text-sm text-slate-500">Masuk ke akun FreshChain Anda.</p>
                </div>
                <form className="relative z-10 space-y-4" onSubmit={handleLogin}>
                  {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">mail</span>
                      <input type="email" placeholder="Masukkan alamat email" required autoComplete="username"
                        value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 px-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kata Sandi</label>
                      <a href="#" className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">Lupa sandi?</a>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">lock</span>
                      <input type="password" placeholder="Masukkan kata sandi" required autoComplete="current-password"
                        value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={loginLoading}
                    className="w-full mt-2 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm transition-all shadow-md shadow-emerald-500/25 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {loginLoading ? "Memproses..." : "Masuk ke Dashboard"}
                  </button>
                </form>
                <div className="relative z-10 mt-5 pt-5 border-t border-slate-100">
                  <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                    <span className="text-sm">Lanjutkan dengan Google</span>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-5">
                    Belum punya akun?{" "}
                    <a href="#join" onClick={() => setIsLoginModalOpen(false)} className="font-bold text-emerald-600 hover:text-emerald-700">Daftar sekarang</a>
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-slate-900/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start"
          >

            {/* ── Left: Stepper ── */}
            <div className="w-full lg:w-5/12 space-y-8 lg:sticky lg:top-28">
              <div>
                <div className={`inline-flex items-center gap-1.5 ${c.bg50} border ${c.border200} ${c.text700} text-[10px] font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.bg500} animate-pulse`} />
                  Pendaftaran Ekosistem
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-plus leading-tight tracking-tight mb-4">
                  Mulai perjalanan<br />
                  <span className={`text-transparent bg-clip-text bg-linear-to-r ${c.gradFrom} ${c.gradTo}`}>
                    agrikultur Anda
                  </span>
                </h2>
                <p className="text-base text-slate-500 font-medium leading-relaxed">
                  Amankan masa depan Anda dengan terhubung langsung ke sumber pertumbuhan yang berkelanjutan.
                </p>
              </div>

              {/* Interactive Steps */}
              <div className="space-y-1">
                <StepBadge n={1} label="Pilih Peran" sub="Tentukan jalur ekosistem Anda" status={step1Status} accentColor={role?.accentColor ?? 'emerald'} />

                {/* Connector line */}
                <div className="flex gap-4 pl-4">
                  <div className={`w-0.5 h-6 ml-4 rounded-full transition-all duration-700 ${step1Status === 'done' ? `${c.bg500}` : 'bg-slate-200'}`} />
                </div>

                <StepBadge n={2} label="Detail Akun" sub="Pengaturan Email & Keamanan" status={step2Status} accentColor={role?.accentColor ?? 'emerald'} />

                <div className="flex gap-4 pl-4">
                  <div className={`w-0.5 h-6 ml-4 rounded-full transition-all duration-700 ${step2Status === 'done' ? `${c.bg500}` : 'bg-slate-200'}`} />
                </div>

                <StepBadge n={3} label="Verifikasi KYC" sub="Pemeriksaan Identitas Otomatis" status={step3Status} accentColor={role?.accentColor ?? 'emerald'} />
              </div>

              {/* Progress summary */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">Progress Pendaftaran</p>
                  <span className={`text-xs font-extrabold ${c.text600}`}>
                    {[step1Status === 'done', step2Status === 'done', step3Status === 'done'].filter(Boolean).length}/3 Selesai
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-linear-to-r ${c.gradFrom} ${c.gradTo}`}
                    initial={{ width: '0%' }}
                    animate={{
                      width: `${([step1Status === 'done', step2Status === 'done', step3Status === 'done'].filter(Boolean).length / 3) * 100}%`
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {['Peran', 'Akun', 'KYC'].map((label, i) => {
                    const statuses = [step1Status, step2Status, step3Status];
                    return (
                      <span key={label} className={`text-[10px] font-bold ${statuses[i] === 'done' ? c.text600 : statuses[i] === 'active' ? 'text-slate-700' : 'text-slate-400'}`}>
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Trust badge */}
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-2xl flex items-start gap-3 shadow-sm">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900 mb-0.5">Keamanan Tingkat Bank</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    FreshChain menggunakan enkripsi standar bank dan identitas terdesentralisasi untuk memastikan data Anda aman dan privat.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: Forms ── */}
            <div className="w-full lg:w-7/12 space-y-5">

              {/* ① Role Selection */}
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-3xl p-6 sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <div className={`inline-flex items-center gap-1.5 ${c.bg50} border ${c.border200} ${c.text700} text-[10px] font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.bg500} ${step1Status === 'done' ? '' : 'animate-pulse'}`} />
                      Langkah 1 dari 3
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-plus mb-1">Pilih Peran Anda</h2>
                    <p className="text-slate-500 text-sm">Pilih profil yang paling menjelaskan tujuan Anda di ekosistem FreshChain.</p>
                  </div>
                  {/* Lock indicator when role is selected */}
                  {selectedRole && (
                    <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${c.bg50} ${c.text700} border ${c.border200}`}>
                      <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                      Terkunci
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['petani', 'investor', 'konsumen'] as Role[]).map((r) => {
                    const rc = ROLES[r];
                    const cc = COLOR[rc.accentColor];
                    const isSelected = selectedRole === r;
                    const isLocked = selectedRole !== null && selectedRole !== r;

                    return (
                      <div
                        key={r}
                        onClick={() => {
                          if (selectedRole !== null) return; // locked
                          setPendingRole(r);
                          setShowConfirm(true);
                        }}
                        className={`group relative rounded-2xl overflow-hidden transition-all duration-300
                          ${isSelected
                            ? `ring-2 ${cc.ring} shadow-xl ${cc.shadow} scale-[1.02] cursor-default`
                            : isLocked
                              ? 'border border-slate-200 opacity-35 cursor-not-allowed grayscale'
                              : 'border border-slate-200 hover:border-slate-300 hover:shadow-md hover:scale-[1.01] cursor-pointer'
                          }`}
                      >
                        {/* Top */}
                        <div className={`relative h-28 flex flex-col items-center justify-center gap-2 overflow-hidden
                          bg-linear-to-br ${isSelected ? roleGrads[r] : 'from-slate-100 to-slate-200'} transition-all duration-300`}>
                          <span
                            className={`material-symbols-outlined text-[44px] transition-all duration-300 ${isSelected ? 'text-white drop-shadow-md' : 'text-slate-300'}`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {roleIcons[r]}
                          </span>

                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                              <span className={`material-symbols-outlined ${cc.text600} text-[13px]`} style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                            </div>
                          )}
                          {isLocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                              <span className="material-symbols-outlined text-slate-400 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                            </div>
                          )}
                          {r === 'investor' && !isLocked && (
                            <div className="absolute top-2 left-2">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${isSelected ? 'bg-white/90 text-violet-700' : 'bg-white text-violet-600'}`}>
                                Populer
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Body */}
                        <div className={`p-3.5 transition-colors duration-300 ${isSelected ? cc.cardBody : 'bg-white'}`}>
                          <div className="flex items-start justify-between gap-1 mb-1.5">
                            <h3 className={`font-extrabold text-sm leading-tight ${isSelected ? cc.text800 : 'text-slate-800'}`}>{rc.roleName}</h3>
                            <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${isSelected ? cc.badge : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
                              {roleBadges[r]}
                            </span>
                          </div>
                          <p className={`text-[10px] leading-relaxed mb-2 ${isSelected ? cc.text700 : 'text-slate-400'}`}>{roleDescs[r]}</p>
                          <div className="flex flex-wrap gap-1">
                            {roleTags[r].map(tag => (
                              <span key={tag} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${isSelected ? cc.tag : 'bg-slate-100 text-slate-500'}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selection strip */}
                <AnimatePresence mode="wait">
                  {selectedRole ? (
                    <motion.div
                      key={selectedRole}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-4 flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium ${c.strip}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`material-symbols-outlined text-[17px] ${c.stripIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span>Anda memilih sebagai <strong>{role!.roleName}</strong> — verifikasi disesuaikan untuk peran ini.</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400 text-sm"
                    >
                      <span className="material-symbols-outlined text-[17px]">touch_app</span>
                      <span>Klik salah satu kartu di atas untuk memilih peran Anda</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ② Detail Akun — only enabled after role selected */}
              <motion.div
                animate={{ opacity: selectedRole ? 1 : 0.45, scale: selectedRole ? 1 : 0.99 }}
                transition={{ duration: 0.4 }}
                className={`bg-white border border-slate-200/80 shadow-sm rounded-3xl p-6 sm:p-8 relative ${!selectedRole ? 'pointer-events-none' : ''}`}
              >
                {!selectedRole && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-3xl">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm text-xs font-bold text-slate-500">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                      Pilih peran terlebih dahulu
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${step2Status === 'done' ? `bg-linear-to-br ${c.gradFrom} ${c.gradTo}` : step2Status === 'active' ? `${c.bg100}` : 'bg-slate-100'}`}>
                    {step2Status === 'done'
                      ? <span className="material-symbols-outlined text-white text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      : <span className={`material-symbols-outlined text-[17px] ${step2Status === 'active' ? c.text600 : 'text-slate-400'}`} style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                    }
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 font-plus leading-tight">Detail Akun</h3>
                    <p className="text-xs text-slate-500">Pengaturan email &amp; keamanan akun Anda</p>
                  </div>
                  {step2Status === 'done' && (
                    <div className={`ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full ${c.bg100} ${c.text700} border ${c.border200}`}>
                      Lengkap ✓
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { l: 'Nama Lengkap', t: 'text', p: 'Sesuai identitas', f: 'name' },
                      { l: 'Email', t: 'email', p: 'akun@email.com', f: 'email' }
                    ].map(({ l, t, p, f }) => (
                      <div key={l} className={`relative bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus-within:border-${role?.accentColor ?? 'emerald'}-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-${role?.accentColor ?? 'emerald'}-500/10 focus-within:shadow-sm transition-all`}>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{l}</label>
                        <input type={t} placeholder={p} className="w-full bg-transparent outline-none text-sm text-slate-900 font-semibold placeholder-slate-400"
                          onChange={(e) => handleAccountChange(f, e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { l: 'Nomor HP', t: 'tel', p: '+62 812 3456 7890', f: 'phone' },
                      { l: 'Tanggal Lahir', t: 'date', p: '', f: 'dob' }
                    ].map(({ l, t, p, f }) => (
                      <div key={l} className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/10 focus-within:shadow-sm transition-all">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{l}</label>
                        <input type={t} placeholder={p} className="w-full bg-transparent outline-none text-sm text-slate-900 font-semibold placeholder-slate-400"
                          onChange={(e) => handleAccountChange(f, e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/10 focus-within:shadow-sm transition-all">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Alamat Lengkap</label>
                    <textarea rows={2} placeholder="Jl. Contoh No. 123, Kota, Provinsi" className="w-full bg-transparent outline-none text-sm text-slate-900 font-semibold placeholder-slate-400 resize-none"
                      onChange={(e) => handleAccountChange('address', e.target.value)} />
                  </div>

                  {/* Account completion hint */}
                  <AnimatePresence>
                    {selectedRole && !accountFilled && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="text-xs text-slate-400 text-center pt-1"
                      >
                        Isi semua kolom di atas untuk melanjutkan ke Verifikasi KYC
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ③ KYC Section — only enabled after account filled */}
              <motion.div
                animate={{ opacity: accountFilled ? 1 : 0.45, scale: accountFilled ? 1 : 0.99 }}
                transition={{ duration: 0.4 }}
                className={`bg-white border border-slate-200/80 shadow-sm rounded-3xl p-6 sm:p-8 relative overflow-hidden ${!accountFilled ? 'pointer-events-none' : ''}`}
              >
                {/* Lock overlay */}
                {!accountFilled && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px] rounded-3xl">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm text-xs font-bold text-slate-500">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                      Lengkapi detail akun terlebih dahulu
                    </div>
                  </div>
                )}

                {/* Color blobs */}
                <div className={`absolute -top-12 -right-12 w-40 h-40 ${c.bg100} rounded-full blur-[70px] pointer-events-none opacity-60`} />
                <div className={`absolute -bottom-12 -left-12 w-36 h-36 ${c.bg100} rounded-full blur-[70px] pointer-events-none opacity-40`} />

                {/* Header */}
                <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className={`inline-flex items-center gap-1.5 bg-linear-to-r ${c.gradFrom} ${c.gradTo} text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm mb-3`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                      Wajib KYC
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 font-plus mb-1">Verifikasi Identitas</h3>
                    <p className="text-sm text-slate-600">
                      {role ? <>Untuk <span className={`font-extrabold ${c.text600}`}>{role.roleName}</span> — klik kartu untuk melengkapi dokumen.</> : 'Pilih peran dan lengkapi akun terlebih dahulu.'}
                    </p>
                  </div>
                  {/* Circular progress */}
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <div className="relative w-14 h-14">
                      <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke={c.svgStroke} strokeWidth="3"
                          strokeLinecap="round" strokeDasharray={`${kycDone * 48.8} 97.6`} className="transition-all duration-700" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-700">{kycDone}/2</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide text-center">Selesai</span>
                  </div>
                </div>

                {/* KYC Cards */}
                {role && (
                  <div className="relative z-10 space-y-3">
                    <KycCard
                      doc={role.doc1} stepKey="doc1" activeStep={activeKyc} onToggle={setActiveKyc}
                      accentColor={role.accentColor} uploaded={!!kycUploaded['doc1']}
                      onUploaded={() => setKycUploaded(prev => ({ ...prev, doc1: true }))}
                    />
                    <KycCard
                      doc={role.doc2} stepKey="doc2" activeStep={activeKyc} onToggle={setActiveKyc}
                      accentColor={role.accentColor} uploaded={!!kycUploaded['doc2']}
                      onUploaded={() => setKycUploaded(prev => ({ ...prev, doc2: true }))}
                    />
                  </div>
                )}

                <AnimatePresence>
                  {kycComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`relative z-10 mt-4 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-linear-to-r ${c.gradFrom} ${c.gradTo}`}
                    >
                      <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                      <div>
                        <p className="text-sm font-extrabold text-white">Semua dokumen KYC lengkap!</p>
                        <p className="text-xs text-white/80 mt-0.5">Anda siap melanjutkan pendaftaran.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </main>

      {/* ── Sticky Footer ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-400 text-left leading-relaxed hidden md:block max-w-xs">
                Melanjutkan berarti Anda menyetujui{" "}
                <a href="#" className="font-bold text-emerald-600 hover:underline">Syarat Layanan</a>{" "}
                dan{" "}
                <a href="#" className="font-bold text-emerald-600 hover:underline">Kebijakan Privasi</a>.
              </p>

              <div className="flex items-center gap-3 ml-auto">
                {/* Step indicator pills */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {[
                    { label: 'Peran', done: step1Status === 'done', active: step1Status === 'active' },
                    { label: 'Akun', done: step2Status === 'done', active: step2Status === 'active' },
                    { label: 'KYC', done: step3Status === 'done', active: step3Status === 'active' },
                  ].map(({ label, done, active }) => (
                    <span key={label} className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-full border transition-all duration-500 ${done
                      ? `${c.bg50} ${c.border200} ${c.text700}`
                      : active
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}>
                      {done && <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                      {label}
                    </span>
                  ))}
                </div>

                <button className="px-5 py-2.5 font-bold text-sm text-slate-600 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm whitespace-nowrap">
                  Kembali
                </button>

                <Link href={kycComplete && role ? role.href : '#'}>
                  <button
                    disabled={!kycComplete}
                    className={`relative flex items-center gap-2 px-7 py-2.5 font-bold text-sm text-white rounded-xl transition-all whitespace-nowrap
                      bg-linear-to-r ${c.gradFrom} ${c.gradTo}
                      ${kycComplete
                        ? 'shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] opacity-100'
                        : 'opacity-40 cursor-not-allowed saturate-50'}`}
                  >
                    Lanjutkan Pendaftaran
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}