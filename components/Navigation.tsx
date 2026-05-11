'use client';

import Link from "next/link";
import styles from "./Navigation.module.css";
import { Button } from "./ui/Button";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";

export default function Navigation() {
    const { cartCount } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.brand}>
                FreshChain
            </Link>
            <div className={styles.links}>
                <Link href="/petani/dashboard" className={styles.link}>Dashboard Petani</Link>
                <Link href="/crowdfunding" className={styles.link}>Crowdfunding</Link>
                <Link href="/marketplace" className={styles.link}>Marketplace</Link>
            </div>
            <div className={styles.actions}>
                <Link href="/investor/dashboard" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-main bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm mr-2">
                    <span className="material-symbols-outlined text-[18px]">show_chart</span>
                    Kelola Investasi
                </Link>
                <Link href="/marketplace/orders" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors shadow-sm mr-4">
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    Pesanan Saya
                </Link>
                <Link href="/marketplace/orders" className="sm:hidden relative mr-4 flex items-center text-blue-700">
                    <span className="material-symbols-outlined text-3xl">receipt_long</span>
                </Link>
                <Link href="/cart" className="relative mr-4 flex items-center">
                    <span className="material-symbols-outlined text-green-800 text-3xl">shopping_cart</span>
                    {mounted && cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <Link href="/wallet">
                    <Button variant="secondary" size="md">Saldo</Button>
                </Link>
                <Link href="/register">
                    <Button variant="primary" size="md">Daftar / Login</Button>
                </Link>
            </div>
        </nav>
    );
}
