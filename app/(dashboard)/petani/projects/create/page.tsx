"use client";

import React, { useState } from "react";
import styles from "./create-project.module.css";
import Link from "next/link";

export default function CreateProjectPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [milestones, setMilestones] = useState([
        { id: 1, title: "Milestone 1: Persiapan Lahan & Benih", estimate: "Rp 15.000.000", req: true },
        { id: 2, title: "Milestone 2: Penanaman & Sistem Irigasi", estimate: "Rp 25.000.000", req: false }
    ]);

    const handleNextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const addMilestone = () => {
        setMilestones([...milestones, {
            id: Date.now(),
            title: `Milestone ${milestones.length + 1}: Fase Baru`,
            estimate: "Rp 0",
            req: false
        }]);
    };

    const removeMilestone = (id: number) => {
        setMilestones(milestones.filter((m) => m.id !== id));
    };

    return (
        <div className={styles.bodyLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sbHeader}>
                    <h1 className={`${styles.sbTitle} ${styles.fontHeadline}`}>Project Builder</h1>
                    <p className={styles.sbSub}>Eco-Fintech Portal</p>
                </div>
                <nav className={styles.sbNav}>
                    <div className={styles.navItem}>
                        <span className={`material-symbols-outlined ${styles.navItemIcon}`}>grid_view</span>
                        <span>Dashboard</span>
                    </div>
                    <div className={`${styles.navItem} ${styles.active}`}>
                        <span className={`material-symbols-outlined ${styles.navItemIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>potted_plant</span>
                        <span>Projects</span>
                    </div>
                    <div className={styles.navItem}>
                        <span className={`material-symbols-outlined ${styles.navItemIcon}`}>flag</span>
                        <span>Milestones</span>
                    </div>
                    <div className={styles.navItem}>
                        <span className={`material-symbols-outlined ${styles.navItemIcon}`}>account_tree</span>
                        <span>Budgeting</span>
                    </div>
                    <div className={styles.navItem}>
                        <span className={`material-symbols-outlined ${styles.navItemIcon}`}>lock</span>
                        <span>Security</span>
                    </div>
                </nav>
                <div className={styles.sbFooter}>
                    <div className={styles.navItemSub}>
                        <span className={`material-symbols-outlined ${styles.navItemIcon}`}>help_outline</span>
                        <span>Support</span>
                    </div>
                    <div className={styles.navItemSub}>
                        <span className={`material-symbols-outlined ${styles.navItemIcon}`}>settings</span>
                        <span>Settings</span>
                    </div>
                </div>
            </aside >

            {/* Top Navbar */}
            < header className={styles.topNav} >
                <div className={styles.tnInner}>
                    <div className="flex items-center gap-4">
                        <span className={styles.tnBrand}>Arboretum Finance</span>
                    </div>
                    <div className={styles.tnRight}>
                        <div className={styles.searchBox}>
                            <span className="material-symbols-outlined" style={{ color: "#94a3b8", fontSize: "1.125rem", marginRight: "0.5rem" }}>search</span>
                            <input type="text" placeholder="Cari proyek..." className={styles.searchInput} />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className={styles.btnIcon}>
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className={styles.btnIcon}>
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                            </button>
                            <div className={styles.avatarWrap}>
                                <img className={styles.avatar} src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_K3VbthkuCZzVKaxao1FH6DAbEzJl8ZT4nM_qsQmVr17zl03zBarzZMRYMvl4MHWHloUhJba5lwknv9HclGR6bQhfYLQ9UUVYm64U7-Yq4v6rkYHwUVfh-H0qPi7Xi8xN_qqJIfpVgqSBdNuQfaDzFOvV4le1AlCTL4AwcbO4PBvaGcG6giiy0ENApzn5TKhloUS3bMIGiWGj8-rqG7oC28JOiASKftpabrjkRKkaMuxqsHS_VSptPn40mBHZSnpskLkHmjupnBE" alt="User" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.tnDivider}></div>
            </header >

            {/* Main Content */}
            < main className={styles.main} >
                <div className={styles.content}>
                    {/* Header */}
                    <div className={styles.pageHeader}>
                        <h2 className={`${styles.phTitle} ${styles.fontHeadline}`}>Buat Proyek Crowdfunding Baru</h2>
                        <p className={styles.phDesc}>Bangun masa depan pertanian berkelanjutan melalui pendanaan berbasis blockchain.</p>
                    </div>

                    {/* Stepper */}
                    <div className={styles.stepperWrap}>
                        <div className={styles.stepperLine}></div>
                        <div className={styles.stepperContent}>
                            <div className={styles.step}>
                                <div className={`${styles.stepCircle} ${currentStep >= 1 ? styles.active : styles.inactive}`}>
                                    {currentStep > 1 ? <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'wght' 700" }}>check</span> : <span>1</span>}
                                </div>
                                <span className={`${styles.stepLabel} ${currentStep >= 1 ? styles.active : styles.inactive}`}>Informasi Dasar</span>
                            </div>
                            <div className={styles.step}>
                                <div className={`${styles.stepCircle} ${currentStep >= 2 ? styles.active : styles.inactive}`}>
                                    {currentStep > 2 ? <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'wght' 700" }}>check</span> : <span>2</span>}
                                </div>
                                <span className={`${styles.stepLabel} ${currentStep >= 2 ? styles.active : styles.inactive}`}>RAB & Milestone</span>
                            </div>
                            <div className={styles.step}>
                                <div className={`${styles.stepCircle} ${currentStep >= 3 ? styles.active : styles.inactive}`}>
                                    {currentStep > 3 ? <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'wght' 700" }}>check</span> : <span>3</span>}
                                </div>
                                <span className={`${styles.stepLabel} ${currentStep >= 3 ? styles.active : styles.inactive}`}>Jaminan & Deposit</span>
                            </div>
                            <div className={styles.step}>
                                <div className={`${styles.stepCircle} ${currentStep >= 4 ? styles.active : styles.inactive}`}>
                                    {currentStep > 4 ? <span className="material-symbols-outlined" style={{ fontSize: "14px", fontVariationSettings: "'wght' 700" }}>check</span> : <span>4</span>}
                                </div>
                                <span className={`${styles.stepLabel} ${currentStep >= 4 ? styles.active : styles.inactive}`}>Review & Publish</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.gridRoot}>

                        {/* Left Column (Forms) */}
                        <div className={styles.gridLeft}>

                            {/* Form Info */}
                            <section className={styles.glassCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.chLeft}>
                                        <div className={styles.chIconWrap}>
                                            <span className="material-symbols-outlined">description</span>
                                        </div>
                                        <h3 className={`${styles.chTitle} ${styles.fontHeadline}`}>Rencana RAB & Milestone</h3>
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={`${styles.inputGroup} ${styles.colSpan2}`}>
                                        <label className={styles.label}>Judul Proyek</label>
                                        <input className={styles.input} type="text" defaultValue="Budidaya Cabe Rawit Organik Lahan Gambut" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Komoditas</label>
                                        <select className={styles.input}>
                                            <option>Cabe Rawit</option>
                                            <option>Padi Organik</option>
                                            <option>Jagung Hibrida</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Luas Lahan (Hektar)</label>
                                        <input className={styles.input} type="number" placeholder="0.0" />
                                    </div>
                                    <div className={`${styles.inputGroup} ${styles.colSpan2}`}>
                                        <label className={styles.label}>Lokasi GPS</label>
                                        <div className={styles.inputWithIcon}>
                                            <span className={`material-symbols-outlined ${styles.inputIcon}`}>location_on</span>
                                            <input className={styles.input} type="text" placeholder="-6.2088, 106.8456" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Milestone & Budget Module */}
                            <section className={styles.glassCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.chLeft}>
                                        <div className={styles.chIconWrap}>
                                            <span className="material-symbols-outlined">account_tree</span>
                                        </div>
                                        <h3 className={`${styles.chTitle} ${styles.fontHeadline}`}>Rincian Anggaran & Milestone</h3>
                                    </div>
                                    <button className={styles.btnAdd} onClick={addMilestone}>
                                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>add</span> Tambah Item
                                    </button>
                                </div>

                                <div className={styles.milestoneList}>
                                    {milestones.map((ms) => (
                                        <div key={ms.id} className={`${styles.msItem} ${!ms.req ? styles.disabled : ""}`}>
                                            <div className={styles.msHeader}>
                                                <div>
                                                    <h4 className={styles.msTitle}>{ms.title}</h4>
                                                    <p className={styles.msDesc}>Estimasi pencairan: {ms.estimate}</p>
                                                </div>
                                                {ms.req ? (
                                                    <span className={styles.badgeWarn}>Wajib</span>
                                                ) : (
                                                    <button className={styles.btnDelete} onClick={() => removeMilestone(ms.id)}>
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                )}
                                            </div>
                                            {ms.req && (
                                                <>
                                                    <div className={styles.msGrid}>
                                                        <div className={styles.msGridCol2}>
                                                            <label className={styles.msBoxLabel}>Item Biaya</label>
                                                            <div className={styles.msBoxValue}>Pembelian Benih Cabe Varietas Unggul & Pupuk Kandang</div>
                                                        </div>
                                                        <div>
                                                            <label className={styles.msBoxLabel}>Target Selesai</label>
                                                            <input className={styles.input} type="date" defaultValue="2024-05-20" style={{ padding: "0.5rem", fontSize: "0.75rem" }} />
                                                        </div>
                                                    </div>
                                                    <div className={styles.msProof}>
                                                        <span className={`material-symbols-outlined ${styles.msProofIcon}`}>verified</span>
                                                        <div className={styles.msProofText}>
                                                            Syarat Bukti: <strong>Foto Geotag</strong> & <strong>Nota Pembelian Digital</strong>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* Right Column (Sidebar Content) */}
                        <div className={styles.gridRight}>

                            {/* Smart Contract Banner */}
                            <div className={styles.scBanner}>
                                <div className={styles.scHeader}>
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                                    <h4 className={`${styles.scTitle} ${styles.fontHeadline}`}>Keamanan Escrow</h4>
                                </div>
                                <p className={styles.scDesc}>
                                    RAB yang Anda buat akan langsung di-deploy ke <strong>Smart Contract Escrow</strong>. Dana hanya akan dicairkan per-milestone setelah bukti validasi diverifikasi oleh sistem.
                                </p>
                                <div className={styles.scBadge}>
                                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>info</span> TRANSPARANSI BLOCKCHAIN 100%
                                </div>
                            </div>

                            {/* Stake Jaminan */}
                            <section className={styles.glassCard} style={{ padding: "1.5rem" }}>
                                <h3 className={`${styles.jmHeader} ${styles.fontHeadline}`}>
                                    <span className={`material-symbols-outlined ${styles.jmIcon}`}>account_balance</span>
                                    Stake Jaminan
                                </h3>
                                <p className={styles.jmDesc}>
                                    Sebagai komitmen pengelolaan dana investor, petani diwajibkan melakukan deposit jaminan sebesar 5% dari total RAB.
                                </p>

                                <div className={styles.jmBox}>
                                    <div className={styles.jmRow}>
                                        <span className={styles.jmLabel}>Total Target RAB</span>
                                        <span className={styles.jmVal}>Rp 40.000.000</span>
                                    </div>
                                    <div className={`${styles.jmRow} ${styles.jmDivider}`}>
                                        <span className={styles.jmLabel}>Minimal Jaminan (5%)</span>
                                        <span className={styles.jmVal} style={{ color: "var(--primary)" }}>Rp 2.000.000</span>
                                    </div>
                                    <div className={styles.jmMethod}>
                                        <label className={styles.jmSubLabel}>Metode Deposit</label>
                                        <div className={styles.jmGrid}>
                                            <button className={`${styles.jmBtnMethod} ${styles.active}`}>
                                                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>account_balance_wallet</span> Token
                                            </button>
                                            <button className={`${styles.jmBtnMethod} ${styles.inactive}`}>
                                                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>payments</span> Tunai
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.btnDeposit}>Deposit &amp; Lanjutkan</button>
                                <p className={styles.jmNote}>Jaminan akan dikembalikan saat panen berhasil.</p>
                            </section>

                            {/* Preview Card */}
                            <div className={styles.previewCard}>
                                <div className={styles.prImgWrap}>
                                    <img className={styles.prImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1v2g8RJfOcsjPz_sVRvnZ5PtxiEa7hQfUAEEy4wO5g1O5irkJkEYPwHv24bxQnlkB2Z1lS5rEE042b5_O26MjTHpnd9YKNCAhi0w9yCa645RgRxRqJz3hyxJHJCc--W4YeNnhbLpTPjSXGo7w-7vIsftFVSBQx_8Z-EYKxkH6S9JNW4hqncChDSJuA4ggAm_oNg0722BZbKVR5AzyJ58MArm1V9HxvOWNu4GHORn6-sFC1SYYoAAKYRUheAUyQQWuhTGvLUQIfQM" alt="Preview Lahan" />
                                    <div className={styles.prGradient}></div>
                                    <span className={styles.prBadge}>Preview Proyek</span>
                                </div>
                                <div className={styles.prBody}>
                                    <h5 className={styles.prTitle}>Budidaya Cabe Rawit Organik...</h5>
                                    <div className={styles.prAuthor}>
                                        <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>person</span>
                                        <span>Oleh: Ahmad Santoso</span>
                                    </div>
                                    <div className={styles.prProgress}>
                                        <div className={styles.prFill}></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Action Nav */}
                    <div className={styles.actionNav}>
                        <button className={styles.btnBack} onClick={handlePrevStep} style={{ visibility: currentStep === 1 ? "hidden" : "visible" }}>
                            <span className="material-symbols-outlined">arrow_back</span> Kembali
                        </button>
                        <div className={styles.actionGroup}>
                            <button className={styles.btnDraft}>Simpan Draft</button>
                            <button className={styles.btnNext} onClick={handleNextStep}>
                                {currentStep === 4 ? "Publish Proposal" : "Langkah Selanjutnya"}
                            </button>
                        </div>
                    </div>

                </div>
            </main >
        </div >
    );
}
