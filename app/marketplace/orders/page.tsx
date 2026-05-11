"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

type OrderStatus = 'pending' | 'packed' | 'shipped' | 'completed';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('pending');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Default dummy data if backend is not ready
  useEffect(() => {
    // In a real app, fetch from API
    // fetch('/api/orders').then(res => res.json()).then(data => setOrders(data));
    
    // Using mock data for now
    const mockOrders: Order[] = [
      {
        _id: "1",
        orderNumber: "ORD-20231015-001",
        totalAmount: 150000,
        status: "pending",
        createdAt: new Date().toISOString(),
        items: [{ productId: "p1", name: "Beras Organik 5kg", quantity: 1, price: 150000 }]
      },
      {
        _id: "2",
        orderNumber: "ORD-20231014-002",
        totalAmount: 45000,
        status: "packed",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        items: [{ productId: "p2", name: "Sayur Bayam Hidroponik", quantity: 3, price: 15000 }]
      },
      {
        _id: "3",
        orderNumber: "ORD-20231012-003",
        totalAmount: 250000,
        status: "shipped",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        items: [{ productId: "p3", name: "Buah Naga Merah 2kg", quantity: 1, price: 250000 }]
      },
      {
        _id: "4",
        orderNumber: "ORD-20231010-004",
        totalAmount: 75000,
        status: "completed",
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        items: [{ productId: "p4", name: "Tomat Ceri Organik", quantity: 2, price: 37500 }]
      }
    ];
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const tabs = [
    { id: 'pending', label: 'Belum Dibayar / Keranjang' },
    { id: 'packed', label: 'Dikemas' },
    { id: 'shipped', label: 'Dikirim' },
    { id: 'completed', label: 'Selesai' }
  ];

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Kelola Pesanan</h1>
            <Link 
              href="/marketplace" 
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              Lanjut Belanja &rarr;
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as OrderStatus)}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 inline-flex items-center justify-center bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {orders.filter(o => o.status === tab.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-green-600"></div>
              <p className="mt-2 text-gray-500">Memuat pesanan...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Pemesanan: <span className="font-medium text-gray-900">{formatDate(order.createdAt)}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        No. Invoice: <span className="font-medium text-gray-900">{order.orderNumber}</span>
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-gray-200 sm:border-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'packed' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {tabs.find(t => t.id === order.status)?.label || order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Belanja</p>
                      <p className="text-lg font-bold text-gray-900">{formatPrice(order.totalAmount)}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                      {order.status === 'pending' && (
                        <button className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                          Bayar Sekarang
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                          Pesanan Diterima
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Beli Lagi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pesanan</h3>
              <p className="text-gray-500 mb-6">Anda belum memiliki pesanan dengan status "{tabs.find(t => t.id === activeTab)?.label}".</p>
              <Link
                href="/marketplace"
                className="inline-flex py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              >
                Mulai Belanja
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}