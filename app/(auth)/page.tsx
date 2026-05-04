"use client";
import { useState } from "react";
import styles from "./Register.module.css";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            
            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");
            
            if (password !== confirmPassword) {
                setError("Kata Sandi dan Konfirmasi Kata Sandi tidak cocok.");
                setLoading(false);
                return;
            }

            if (selectedRole) {
                formData.append("role", selectedRole);
            }

            let endpoint = "";
            if (selectedRole === "Petani") endpoint = "/api/auth/register/petani";
            else if (selectedRole === "Investor") endpoint = "/api/auth/register/investor";
            else if (selectedRole === "Konsumen") endpoint = "/api/auth/register/konsumen";
            else throw new Error("Invalid role selected");

            const res = await fetch(endpoint, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Gagal melakukan registrasi");
                setLoading(false);
                return;
            }

            // Redirect automatically upon success registration
            const r = data.user?.role?.toLowerCase();
            if (r === "petani") {
                window.location.href = "/petani/dashboard";
            } else if (r === "investor") {
                window.location.href = "/investor/dashboard";
            } else if (r === "konsumen") {
                window.location.href = "/marketplace";
            } else {
                window.location.href = "/";
            }
        } catch (err: any) {
            console.error(err);
            setError("Terjadi kesalahan jaringan.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-50 font-inter">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-800 font-plus mb-2">Registrasi Ekosistem FreshChain</h1>
                    <p className="text-slate-500">Lengkapi data Anda secara bertahap untuk memulai perjalanan cerdas ini.</p>
                </div>

                {/* 1. Pilihan Role */}
                <div className={styles.card}>
                    <h2 className="text-xl font-bold text-slate-700 mb-2 font-plus">1. Pilihan Role</h2>
                    <p className="text-sm text-slate-500 mb-6">Tentukan jalur ekosistem Anda</p>
                    
                    <div className={styles.roleSelection}>
                        <div 
                            className={`${styles.roleCard} ${selectedRole === 'Petani' ? styles.activeRole : ''}`}
                            onClick={() => handleRoleSelect('Petani')}
                        >
                            <div className={styles.roleIcon}>🌾</div>
                            <h3>Petani</h3>
                            <p>Daftarkan lahan & dapatkan pendanaan</p>
                        </div>
                        <div 
                            className={`${styles.roleCard} ${selectedRole === 'Investor' ? styles.activeRole : ''}`}
                            onClick={() => handleRoleSelect('Investor')}
                        >
                            <div className={styles.roleIcon}>📈</div>
                            <h3>Investor</h3>
                            <p>Danai proyek & pantau portofolio</p>
                        </div>
                        <div 
                            className={`${styles.roleCard} ${selectedRole === 'Konsumen' ? styles.activeRole : ''}`}
                            onClick={() => handleRoleSelect('Konsumen')}
                        >
                            <div className={styles.roleIcon}>🛒</div>
                            <h3>Konsumen</h3>
                            <p>Beli produk dengan traceability</p>
                        </div>
                    </div>
                </div>

                {/* Optional: Show remaining steps if role is selected */}
                {selectedRole && (
                    <form className="space-y-8 animate-[slideUpFade_0.4s_ease_forwards]" onSubmit={handleRegister}>
                        {error && <div className="p-4 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}
                        {/* 2. Detail Akun */}
                        <div className={styles.card}>
                            <h2 className="text-xl font-bold text-slate-700 mb-2 font-plus">2. Detail Akun</h2>
                            <p className="text-sm text-slate-500 mb-6">Pengaturan Email & Keamanan</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Nama Lengkap (Sesuai Identitas)</label>
                                    <input id="name" name="name" type="text" className={styles.input} placeholder="Contoh: Budi Santoso" required />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Alamat Email</label>
                                    <input id="email" name="email" type="email" className={styles.input} placeholder="budi@email.com" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Nomor HP / WhatsApp Aktif</label>
                                    <input id="phone" name="phone" type="tel" className={styles.input} placeholder="Contoh: 08123456789" required />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="dob">Tanggal Lahir</label>
                                    <input id="dob" name="dob" type="date" className={styles.input} required />
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className={styles.formGroup}>
                                    <label htmlFor="address">Alamat Lengkap</label>
                                    <textarea id="address" name="address" className={styles.input} rows={2} placeholder="Masukkan alamat lengkap Anda..." required></textarea>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Kata Sandi</label>
                                    <input id="password" name="password" type="password" className={styles.input} placeholder="Minimal 8 Karakter" required minLength={8} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                                    <input id="confirmPassword" name="confirmPassword" type="password" className={styles.input} placeholder="Konfirmasi Kata Sandi" required minLength={8} />
                                </div>
                            </div>
                        </div>

                        {/* 3. Verifikasi KYC (Spesifik Role) */}
                        <div className={styles.card}>
                            <h2 className="text-xl font-bold text-slate-700 mb-2 font-plus">3. Verifikasi KYC</h2>
                            <p className="text-sm text-slate-500 mb-6">Pemeriksaan Identitas Otomatis & Data Spesifik {selectedRole}</p>

                            {selectedRole === 'Petani' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="nik">NIK (Nomor Induk Kependudukan)</label>
                                            <input id="nik" name="nik" type="text" className={styles.input} placeholder="16 Digit NIK KTP" required maxLength={16} minLength={16} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="groupName">Nama Kelompok Tani (Opsional)</label>
                                            <input id="groupName" name="groupName" type="text" className={styles.input} placeholder="Contoh: Tani Maju Bersama" />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="location">Lokasi Lahan Detail</label>
                                        <textarea id="location" name="location" className={styles.input} rows={2} placeholder="Sebutkan Dusun, Desa, Kecamatan, Kab/Kota" required></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="commodity">Komoditas Utama (Fokus Penanaman)</label>
                                            <input id="commodity" name="commodity" type="text" className={styles.input} placeholder="Contoh: Padi, Kopi Arabika, Tomat" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="area">Luas Lahan Produktif (Hektar/m²)</label>
                                            <input id="area" name="area" type="number" step="0.01" className={styles.input} placeholder="Contoh: 2.5 Hektar" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="kycKTP">Unggah Foto KTP</label>
                                            <input id="kycKTP" name="kycKTP" type="file" className={styles.input} accept="image/jpeg,image/png" required />
                                            <p className="text-xs text-slate-500 mt-1">Pastikan tulisan terbaca jelas tanpa pantulan cahaya.</p>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="kycLand">Bukti Penguasaan Lahan (Sertifikat/Girik)</label>
                                            <input id="kycLand" name="kycLand" type="file" className={styles.input} accept="image/*,.pdf" required />
                                            <p className="text-xs text-slate-500 mt-1">Format PDF/JPG/PNG maks. 10MB</p>
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedRole === 'Investor' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="nikPaspor">Nomor NIK / Paspor</label>
                                            <input id="nikPaspor" name="nikPaspor" type="text" className={styles.input} placeholder="No. Identitas Resmi" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="npwp">Nomor NPWP</label>
                                            <input id="npwp" name="npwp" type="text" className={styles.input} placeholder="00.000.000.0-000.000" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="income">Sumber Dana Investasi</label>
                                            <select id="income" name="income" className={styles.input} required>
                                                <option value="">Pilih Sumber Dana...</option>
                                                <option value="Gaji">Gaji / Penghasilan Rutin</option>
                                                <option value="Hasil Usaha">Keuntungan Hasil Usaha</option>
                                                <option value="Tabungan">Tabungan / Deposito</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="risk">Profil Risiko Investasi</label>
                                            <select id="risk" name="risk" className={styles.input} required>
                                                <option value="">Pilih profil risiko...</option>
                                                <option value="Konservatif">Konservatif (Cenderung Aman - Bunga Rendah)</option>
                                                <option value="Moderat">Moderat (Risiko Menengah - Diversifikasi)</option>
                                                <option value="Agresif">Agresif (Siap Kehilangan Sebagian Pokok)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="kycInvestorDoc">KTP / Paspor Resmi (Investor)</label>
                                            <input id="kycInvestorDoc" name="kycInvestorDoc" type="file" className={styles.input} accept="image/jpeg,image/png,.pdf" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="kycInvestorSelfie">Swafoto Liveness / Selfie dengan KTP</label>
                                            <input id="kycInvestorSelfie" name="kycInvestorSelfie" type="file" className={styles.input} accept="image/jpeg,image/png" required />
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedRole === 'Konsumen' && (
                                <>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="deliveryAddress">Alamat Pengiriman Utama (Default)</label>
                                        <textarea id="deliveryAddress" name="deliveryAddress" className={styles.input} rows={3} placeholder="Nama Jalan, RT/RW, Patokan (Bila ada)..." required></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="provinsi">Provinsi</label>
                                            <input id="provinsi" name="provinsi" type="text" className={styles.input} placeholder="Contoh: Jawa Barat" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="kota">Kota/Kabupaten</label>
                                            <input id="kota" name="kota" type="text" className={styles.input} placeholder="Contoh: Kota Bandung" required />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="kodepos">Kode Pos</label>
                                            <input id="kodepos" name="kodepos" type="text" className={styles.input} placeholder="Contoh: 40123" required />
                                        </div>
                                    </div>

                                    <div className={`${styles.formGroup} mt-6`}>
                                        <label htmlFor="kyc">Upload Dokumen KYC (KTP)</label>
                                        <input id="kyc" name="kyc" type="file" className={styles.input} accept="image/*,.pdf" required />
                                    </div>
                                </>
                            )}
                            
                            {/* Submit & TOC */}
                            <div className="mt-8 border-t border-slate-200/50 pt-6">
                                <div className="mb-6 flex items-start gap-3">
                                    <input type="checkbox" id="terms" name="terms" className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" required />
                                    <label htmlFor="terms" className="text-sm text-slate-600">
                                        Saya setuju dengan <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700 transition">Syarat Layanan</a> dan <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700 transition">Kebijakan Privasi</a> yang berlaku dalam jaringan FreshChain, termasuk konfirmasi keabsahan dokumen untuk validasi KYC Smart Contract.
                                    </label>
                                </div>

                                <Button type="submit" variant="primary" fullWidth className="!py-4 text-lg font-bold shadow-emerald-600/30" disabled={!selectedRole || loading}>
                                    {loading ? 'Memproses...' : selectedRole === 'Konsumen' ? 'Verifikasi & Buat Akun' : 'Ajukan Verifikasi KYC & Daftar'}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
