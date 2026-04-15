
# 📄 skill.md — AI Agent FreshChain (Full Next.js Stack)

## 🎯 Objective

AI agent bertugas membangun sistem **FreshChain** menggunakan pendekatan:

> **Fullstack Next.js (App Router) + Blockchain Integration**

Platform mencakup:

* Crowdfunding pertanian berbasis smart contract
* Marketplace hasil panen
* Traceability berbasis blockchain
* Sistem end-to-end (frontend + backend dalam Next.js)

---

## 🧠 Core Mindset

AI agent harus:

* Berpikir sebagai **Fullstack Next.js Engineer + Web3 Developer**
* Fokus pada:

  * Server Actions & API Routes (bukan backend terpisah)
  * Clean architecture dalam satu repo
* Semua keputusan harus mengacu ke requirement sistem 

---

## 🏗️ Arsitektur Utama (WAJIB)

### 🧩 1. Framework Utama

* Next.js (App Router)
* TypeScript (WAJIB)

---

### 🖥️ 2. Frontend + Backend (Unified)

Semua logic berada di Next.js:

* Server Components → data fetching
* Client Components → interaksi UI
* Server Actions → handle form & mutation
* Route Handlers (`/app/api`) → API endpoint

---

### 🗄️ 3. Database

* MongoDB Atlas (WAJIB) 

---

### 🔗 4. Blockchain Layer

* Ethereum (testnet)
* Smart contract:

  * Solidity
* Integration:

  * Ethers.js / Viem
  * Wallet:

    * MetaMask
    * WalletConnect

---

### ☁️ 5. Storage

* Cloud storage / IPFS untuk:

  * File KYC
  * Gambar produk
  * Bukti milestone

---

## 👥 Role System (HARUS ADA)

1. Petani
2. Investor
3. Konsumen
4. Admin

Semua page & logic HARUS role-based.

---

## ⚙️ Modul Sistem (MANDATORY)

### 🔐 1. Auth & User Management

* NextAuth / Auth.js
* Multi-role register
* KYC upload
* 2FA (OTP untuk transaksi)
* Wallet connection

---

### 💰 2. Crowdfunding (Web3)

* Petani:

  * create project
* Sistem:

  * deploy smart contract otomatis
* Investor:

  * funding (crypto / fiat)
* Smart contract:

  * escrow
  * milestone release
  * auto refund
  * profit distribution

---

### 🛒 3. Marketplace

* CRUD produk (petani)
* Search & filter
* Cart & checkout
* Payment integration
* Order tracking
* Review & rating

---

### 🔗 4. Traceability

* Generate QR code
* Tracking produk:

  * asal
  * proses tanam
  * panen
  * distribusi
* Data immutable di blockchain
* Public page tanpa login

---

### 🔔 5. Notifikasi & Komunikasi

* Email + in-app
* Real-time update (optional: WebSocket / Pusher)
* Chat petani ↔ investor

---

## 🧱 Struktur Project (WAJIB DIHASILKAN AI)

```bash
/app
  /(auth)
  /(dashboard)
    /petani
    /investor
    /konsumen
    /admin
  /marketplace
  /crowdfunding
  /traceability
  /api

/components
/lib
  /db
  /blockchain
  /auth
  /utils

/prisma
/contracts
```

---

## 🧩 Pola Development

### ✅ Data Fetching

* Server Component (default)
* Hindari client fetch jika tidak perlu

### ✅ Mutations

* Gunakan:

  * Server Actions (prioritas)
  * atau Route Handler

### ✅ State Management

* Minimal (React state / Zustand)

---

## 🔐 Security Rules (WAJIB)

AI harus memastikan:

* Validasi input (Zod)
* Auth middleware
* Protect API routes
* Enkripsi data KYC
* Smart contract aman

---

## ⚡ Performance Rules

* Gunakan:

  * caching (Next.js)
  * lazy loading
* Target:

  * < 3 detik load
* Optimasi image (Next Image)

---

## 📱 UI/UX Rules

* Mobile-first (petani)
* Bahasa Indonesia
* UI sederhana:

  * tombol besar
  * alur jelas
* Gunakan:

  * TailwindCSS
  * Shadcn UI

---

## 🧠 AI Agent Capabilities

AI HARUS bisa:

### 1. Generate Code

* Next.js fullstack
* Prisma schema
* Smart contract Solidity

### 2. Design System

* Folder structure
* API design
* Database schema

### 3. Blockchain Integration

* Deploy contract
* Interact contract via frontend

### 4. Debugging

* Fix error
* Improve performance

---

## 🚫 Constraints

AI TIDAK BOLEH:

* Membuat backend terpisah (Express/Nest)
* Mengabaikan role system
* Mengabaikan blockchain layer
* Menggunakan arsitektur lama (pages router)

---

## ✅ Output Standard

Setiap output:

* Siap pakai (production-ready)
* Tidak pseudo-code
* Mengikuti best practice Next.js

---

## 🔄 Workflow AI

1. Analisis requirement
2. Mapping ke module
3. Design schema & API
4. Implement di Next.js
5. Integrasi blockchain
6. Testing & optimasi

---

## 🚀 Goal

Membangun:

> FreshChain berbasis **Full Next.js + Web3**
> yang scalable, secure, dan mudah digunakan petani Indonesia

