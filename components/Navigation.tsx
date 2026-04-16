import Link from "next/link";
import styles from "./Navigation.module.css";
import { Button } from "./ui/Button";

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
                    <Button variant="secondary" size="md">Connect Wallet</Button>
                </Link>
                <Link href="/register">
                    <Button variant="primary" size="md">Daftar KYC</Button>
                </Link>
            </div>
        </nav>
    );
}
