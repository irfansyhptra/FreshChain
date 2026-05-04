# FreshChain (No-Blockchain)

FreshChain adalah platform distribusi pangan + traceability berbasis **database (MongoDB)**. Semua jejak perubahan disimpan sebagai **riwayat (history)** dan **audit log** di database (tanpa smart contract / blockchain).

## Requirements

- Node.js (LTS)
- MongoDB

## Setup

Copy environment:

```bash
cp .env.example .env
```

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

## Database

Project memakai Mongoose + MongoDB.

- **Mongo connection**: `lib/mongodb/client.ts`
- **Traceability model**: `lib/models/Traceability.ts`
- **Audit log model**: `lib/models/AuditLog.ts`

## Seed (optional)

Jalankan seed untuk membuat user demo:

```bash
npm run db:seed
```

## API

- **POST** `app/api/traceability/route.ts`
  - Input minimal: `batchId`, `status`, `location`
  - Sistem akan upsert record traceability berdasarkan `batchId` dan push ke `history[]`
  - Response berisi `recordId`

- **POST** `app/api/farmers/route.ts`
  - Menyimpan data farmer ke MongoDB dan mencatat audit log

