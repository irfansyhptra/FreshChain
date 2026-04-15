import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.brand}>
                FreshChain
            </Link>
            <div className={styles.links}>
                <Link href="/petani/dashboard" className={styles.link}>Dashboard Petani</Link>
                <Link href="/investor/dashboard" className={styles.link}>Dashboard Investor</Link>
                <Link href="/crowdfunding" className={styles.link}>Crowdfunding</Link>
                <Link href="/marketplace" className={styles.link}>Marketplace</Link>
            </div>
            <div className={styles.actions}>
                <Link href="/wallet">
                    <button className={styles.btnSecondary}>Connect Wallet</button>
                </Link>
                <Link href="/register">
                    <button className={styles.btnPrimary}>Daftar KYC</button>
                </Link>
            </div>
        </nav>
    );
}
