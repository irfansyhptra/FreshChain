'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string | number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    cartSessionId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'freshchain_cart';
const CART_SESSION_STORAGE_KEY = 'freshchain_cart_session';

type ServerCartItem = {
    productId?: string | number;
    id?: string | number;
    name?: string;
    price?: number;
    quantity?: number;
    imageUrl?: string;
};

const createSessionId = () => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getOrCreateCartSessionId = () => {
    if (typeof window === 'undefined') return '';

    const existingSessionId = localStorage.getItem(CART_SESSION_STORAGE_KEY);
    if (existingSessionId) return existingSessionId;

    const sessionId = createSessionId();
    localStorage.setItem(CART_SESSION_STORAGE_KEY, sessionId);
    return sessionId;
};

const readLocalCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];

    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];

    try {
        return JSON.parse(savedCart);
    } catch (e) {
        console.error('Failed to parse cart from local storage', e);
        return [];
    }
};

const mapServerItems = (items: ServerCartItem[] = []): CartItem[] => items.map((item) => ({
    id: String(item.productId || item.id),
    name: String(item.name || ''),
    price: Number(item.price),
    quantity: Number(item.quantity),
    imageUrl: item.imageUrl || undefined,
})).filter((item) => item.id && item.name && item.quantity > 0);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartSessionId] = useState(getOrCreateCartSessionId);
    const [hydrated, setHydrated] = useState(false);
    
    // Load from local storage and reconcile with the server cart on mount.
    useEffect(() => {
        if (!cartSessionId) return;
        let cancelled = false;

        const loadCart = async (initialItems: CartItem[]) => {
            try {
                const res = await fetch(`/api/cart?sessionId=${encodeURIComponent(cartSessionId)}`);
                const json = await res.json();
                const serverCart = json.success ? json.data : null;

                if (cancelled) return;

                if (serverCart?.status === 'checked_out') {
                    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
                    setCartItems([]);
                    return;
                }

                if (initialItems.length === 0 && serverCart?.items?.length > 0) {
                    setCartItems(mapServerItems(serverCart.items));
                }
            } catch (e) {
                console.error('Failed to load cart from server', e);
            } finally {
                if (!cancelled) setHydrated(true);
            }
        };

        queueMicrotask(() => {
            if (cancelled) return;

            const initialItems = readLocalCart();
            if (initialItems.length > 0) setCartItems(initialItems);
            loadCart(initialItems);
        });

        return () => {
            cancelled = true;
        };
    }, [cartSessionId]);

    // Save to local storage and sync the active cart snapshot to MongoDB.
    useEffect(() => {
        if (!hydrated) return;

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));

        if (!cartSessionId) return;

        fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: cartSessionId,
                items: cartItems.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    imageUrl: item.imageUrl,
                    quantity: item.quantity,
                    price: item.price,
                })),
            }),
        }).catch((e) => {
            console.error('Failed to sync cart to server', e);
        });
    }, [cartItems, cartSessionId, hydrated]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i => 
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string | number) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const updateQuantity = (id: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCartItems(prev => prev.map(i => 
            i.id === id ? { ...i, quantity } : i
        ));
    };

    const clearCart = () => {
        setCartItems([]);
        if (!cartSessionId) return;

        fetch(`/api/cart?sessionId=${encodeURIComponent(cartSessionId)}`, {
            method: 'DELETE',
        }).catch((e) => {
            console.error('Failed to clear cart on server', e);
        });
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            cartSessionId
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
