import styles from "./project-detail.module.css";
import Link from "next/link";

export default function CrowdfundingProjectDetail({ params }: { params: { slug: string } }) {
    return (
        <div className={styles.bodyLayout}>
            {/* Top Navbar */}
            <nav className={styles.navContainer}>
                <div className={styles.navLeft}>
                    <span className={`${styles.navBrand} ${styles.fontHeadline}`}>FreshChain</span>
                    <div className={styles.navLinks}>
                        <Link href="/marketplace" className={styles.navLink}>Marketplace</Link>
                        <Link href="/crowdfunding" className={`${styles.navLink} ${styles.active}`}>Projects</Link>
                        <Link href="#" className={styles.navLink}>Learn</Link>
                    </div>
                </div>
                <div className={styles.navRight}>
                    <div className={styles.navIcons}>
                        <span className={`material-symbols-outlined ${styles.iconBtn}`}>notifications</span>
                        <span className={`material-symbols-outlined ${styles.iconBtn}`}>settings</span>
                    </div>
                    <button className={styles.btnConnect}>Saldo</button>
                    <div className={styles.avatarWrap}>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1tjYEPPx4sTAlv0XDWEFrBN-Jh4RJwSzGYGZ_wNe_zBnbghSoKoBS6Kj67XKW1HdSZEffklV7lNl5oWjd4Mn7BzmuBdHLTf-CxKEJbB3qh1uMXZcZirqpfIO8PlN9EzRFDVST5CJb5R60qOTzKs167uK10HrmojAATnqSw04k2GNQb8xXxzKj8nVbaVH1KEwQiqoqn9PdTq7U182hvCsYobv88f3Wd5ZwwJVinwADRTHid8csQsM7-ZVqs8qpsX71e2qrWh73wCk" alt="Avatar" />
                    </div>
                </div>
            </nav>

            <main className={styles.main}>
                <div className={styles.layoutGrid}>

                    {/* Left Column */}
                    <div className={styles.colLeft}>
                        {/* Hero Image */}
                        <div className={styles.heroMedia}>
                            <img className={styles.heroImg} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOevhOc58Lb6JpSc7xIGZ4cX-WZ8gaqVB5ADD6KN6_C6o5iAtvc9mrv4rqk3DQzTVoDW1P_zvEYZwnrYsHPjgHzJVN_pamws6kFA_B5npKjU4QkM3jlEPz_B1RJg0x6h_pGAdhsFkNs7JGI7RSUvfq1tEASlzHB-gjpGIHhR16hdWVslf-CQD-rzV7NayTA-I7gyENo9MG49xnhEHSacmaGBsKKjaHfzWIEDJ7yo-DSibpBVBS3hBxDiqwKPq9L_76VQ9kPa0srak" alt="Farm Hero" />
                            <div className={styles.heroGradient}></div>
                            <div className={styles.heroTextWrap}>
                                <span className={styles.heroBadge}>Agriculture Tech</span>
                                <h1 className={`${styles.heroTitle} ${styles.fontHeadline}`}>Eco-Harvest Vertical Farm #12</h1>
                            </div>
                        </div>

                        {/* Stats Overview */}
                        <div className={styles.statsGrid}>
                            <div className={styles.statBox}>
                                <p className={styles.statLabel}>Target Raise</p>
                                <h3 className={`${styles.statVal} ${styles.primary} ${styles.fontHeadline}`}>$2,500,000</h3>
                            </div>
                            <div className={`${styles.statBox} ${styles.tertiary}`}>
                                <p className={styles.statLabel}>Min. Entry</p>
                                <h3 className={`${styles.statVal} ${styles.tertiary} ${styles.fontHeadline}`}>$100,000</h3>
                            </div>
                            <div className={`${styles.statBox} ${styles.secondary}`}>
                                <p className={styles.statLabel}>Investors</p>
                                <h3 className={`${styles.statVal} ${styles.secondary} ${styles.fontHeadline}`}>142</h3>
                            </div>
                            <div className={`${styles.statBox} ${styles.neutral}`}>
                                <p className={styles.statLabel}>Days Left</p>
                                <h3 className={`${styles.statVal} ${styles.neutral} ${styles.fontHeadline}`}>14d 08h</h3>
                            </div>
                        </div>

                        {/* Description Details */}
                        <div className={styles.overviewBlock}>
                            <h2 className={`${styles.obTitle} ${styles.fontHeadline}`}>Project Overview</h2>
                            <p className={styles.obDesc}>
                                The Eco-Harvest Vertical Farm initiative integrates high-efficiency LED lighting systems and automated nutrient delivery protocols to produce 40% more yield than traditional hydroponics. Located in the tech-hub periphery, this project leverages IoT sensors to monitor crop health in real-time, ensuring maximum efficiency and zero waste.
                            </p>

                            <div className={styles.obGrid}>
                                <div className={styles.assetList}>
                                    <h4 className={`${styles.assetTitle} ${styles.fontHeadline}`}>RAB Details (Real Asset Backing)</h4>
                                    <div className={styles.alItem}>
                                        <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontVariationSettings: "'FILL' 1", fontSize: "14px" }}>verified</span>
                                        <span>Verified Land Title: Asset ID #7721-XA</span>
                                    </div>
                                    <div className={styles.alItem}>
                                        <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontVariationSettings: "'FILL' 1", fontSize: "14px" }}>verified</span>
                                        <span>Insurance Cover: AgriShield Premium</span>
                                    </div>
                                    <div className={styles.alItem}>
                                        <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontVariationSettings: "'FILL' 1", fontSize: "14px" }}>verified</span>
                                        <span>Yield Projection: 12.4% Fixed APY</span>
                                    </div>
                                </div>

                                <div className={styles.scBlock}>
                                    <h4 className={`${styles.scTitle} ${styles.fontHeadline}`}>Sistem Escrow</h4>
                                    <p className={styles.scHash}>ESCROW-REFERENCE</p>
                                    <div className={styles.scAudit}>
                                        <span className={`material-symbols-outlined ${styles.scAuditIcon}`}>security</span>
                                        <span className={styles.scAuditText}>Tercatat di audit log</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Milestone Stepper */}
                        <div className={styles.milestoneBlock}>
                            <h2 className={`${styles.msTitle} ${styles.fontHeadline}`}>Milestone Plan</h2>
                            <div className={styles.msTimeline}>
                                <div className={styles.msLine}></div>

                                <div className={styles.msItem}>
                                    <div className={styles.msCircle}>
                                        <span className="material-symbols-outlined" style={{ color: "white", fontSize: "12px" }}>check</span>
                                    </div>
                                    <div>
                                        <h4 className={`${styles.msContentTitle} ${styles.fontHeadline}`}>Phase 1: Site Preparation & Foundation</h4>
                                        <p className={styles.msContentDesc}>Completed. Foundation and structural frame established. Water rights secured.</p>
                                        <span className={`${styles.msBadge} ${styles.completed}`}>Completed</span>
                                    </div>
                                </div>

                                <div className={styles.msItem}>
                                    <div className={styles.msCircle}>
                                        <span className="material-symbols-outlined" style={{ color: "white", fontSize: "12px" }}>sync</span>
                                    </div>
                                    <div>
                                        <h4 className={`${styles.msContentTitle} ${styles.fontHeadline}`}>Phase 2: Hydroponic System Installation</h4>
                                        <p className={styles.msContentDesc}>In Progress. Installation of proprietary nutrient delivery arrays and IoT sensor mesh.</p>
                                        <span className={`${styles.msBadge} ${styles.active}`}>Active</span>
                                    </div>
                                </div>

                                <div className={styles.msItem}>
                                    <div className={`${styles.msCircle} ${styles.inactive}`}>
                                        <div className={styles.dot}></div>
                                    </div>
                                    <div>
                                        <h4 className={`${styles.msContentTitle} ${styles.fontHeadline}`}>Phase 3: Seed Planting & Scale-up</h4>
                                        <p className={styles.msContentDesc}>Pending funding completion. Scheduled for Q4 2024.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sticky) */}
                    <aside className={styles.colRight}>
                        <div className={styles.stickyWrap}>

                            <div className={styles.investPanel}>
                                <h2 className={`${styles.ipTitle} ${styles.fontHeadline}`}>Investment Portal</h2>

                                {/* Funding Progress Bar */}
                                <div className={styles.progBlock}>
                                    <div className={styles.progHeader}>
                                        <span className={styles.progPct}>68% Funded</span>
                                        <span className={styles.progAmt}>$1,700,000 Raised</span>
                                    </div>
                                    <div className={styles.progTrack}>
                                        <div className={styles.progFill} style={{ width: "68%" }}></div>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className={styles.ipFormGroup}>
                                    <label className={styles.ipLabel}>Investment Amount</label>
                                    <div className={styles.moneyInputWrap}>
                                        <span className={styles.moneySymbol}>$</span>
                                        <input type="number" className={styles.moneyInput} placeholder="100,000" defaultValue="100000" min="100000" />
                                    </div>
                                    <p className={styles.inputHint}>Minimum contribution: $100,000.00 USD</p>
                                </div>

                                <div className={styles.ipFormGroup}>
                                    <label className={styles.ipLabel}>Payment Method</label>
                                    <div className={styles.payMethods}>
                                        <label className={styles.payOption}>
                                            <div className={styles.payLeft}>
                                                <span className={`material-symbols-outlined ${styles.payIcon}`}>account_balance</span>
                                                <span className={styles.payText}>Bank Transfer</span>
                                            </div>
                                            <input type="radio" name="pay" className={styles.payInput} />
                                        </label>
                                        <label className={styles.payOption}>
                                            <div className={styles.payLeft}>
                                                <span className={`material-symbols-outlined ${styles.payIcon}`}>wallet</span>
                                                <span className={styles.payText}>E-wallet</span>
                                            </div>
                                            <input type="radio" name="pay" className={styles.payInput} />
                                        </label>
                                        <label className={styles.payOption}>
                                            <div className={styles.payLeft}>
                                                <span className={`material-symbols-outlined ${styles.payIcon}`}>qr_code_2</span>
                                                <span className={styles.payText}>QRIS</span>
                                            </div>
                                            <input type="radio" name="pay" className={styles.payInput} />
                                        </label>
                                    </div>
                                </div>

                                <button className={styles.btnInvest}>Invest Now</button>
                                <div className={styles.secureBadge}>
                                    <span className={`material-symbols-outlined ${styles.secureBadgeIcon}`}>lock</span>
                                    <span className={styles.secureBadgeText}>Dilindungi oleh sistem escrow & audit log</span>
                                </div>
                            </div>

                            {/* Yield Card */}
                            <div className={styles.yieldCard}>
                                <div className={styles.ycHeader}>
                                    <div className={styles.ycIcon}>
                                        <span className="material-symbols-outlined">trending_up</span>
                                    </div>
                                    <div>
                                        <h4 className={`${styles.ycTitle} ${styles.fontHeadline}`}>Estimated Yield</h4>
                                        <p className={styles.ycSub}>Projected returns for this phase</p>
                                    </div>
                                </div>
                                <div className={styles.ycBody}>
                                    <span className={`${styles.ycVal} ${styles.fontHeadline}`}>12.4%</span>
                                    <span className={styles.ycLabel}>Fixed Annual Rate</span>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>
            </main>

            {/* FAB Mobile */}
            <div className={styles.fab}>
                <span className="material-symbols-outlined">add_shopping_cart</span>
            </div>
        </div>
    );
}
