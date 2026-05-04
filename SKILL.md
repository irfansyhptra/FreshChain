 1. REFRAME PROJECT (tanpa blockchain)

Dari dokumen kamu:

* tujuan utama:

  * transparansi distribusi pangan
  * traceability produk
  * marketplace petani 

👉 Blockchain hanya alat, bukan tujuan.

---

## 🎯 Versi baru FreshChain:

> **Sistem distribusi pangan + traceability berbasis database**

---

# 🔄 2. Konsep Traceability (tanpa blockchain)

Sebelumnya:

```text
data → blockchain (immutable)
```

Sekarang:

```text
data → database → API → ditampilkan ke user
```

---

## 📌 Perubahan penting

| Sebelumnya | Sekarang  |
| ---------- | --------- |
| blockchain | MongoDB   |
| tx_hash    | record ID |
| immutable  | audit log |
| wallet     | user ID   |

---

# 🏗️ 3. Arsitektur Baru (Simplified)

Dari arsitektur kamu (halaman 31–34):

👉 kita tetap pakai:

* Client-Server
* MVC
* Layered architecture 

---

## 🔥 Versi baru:

```text
Frontend (React)
        ↓
Backend (Node.js / Express)
        ↓
MongoDB
```

👉 Hilangkan:
❌ Web3
❌ Smart contract
❌ Ethereum

---

# 🧱 4. DATABASE DESIGN (CORE)

Kamu sebenarnya sudah punya struktur bagus di dokumen (halaman 24–28) 

👉 kita pakai ulang + sedikit modifikasi

---

## 🔹 Collection: Traceability

```js
{
  _id: ObjectId,
  product_id: ObjectId,
  history: [
    {
      stage: "planting",
      date: Date,
      details: "Tanam cabai",
      location: "Aceh",
      actor: "Petani A"
    },
    {
      stage: "harvest",
      date: Date,
      details: "Panen 100kg",
      location: "Aceh",
      actor: "Petani A"
    }
  ],
  created_at: Date
}
```

👉 ini menggantikan blockchain

---

## 🔹 Collection: Product

```js
{
  _id: ObjectId,
  name: "Cabai Merah",
  farmer_id: ObjectId,
  traceability_id: ObjectId
}
```

---

# ⚙️ 5. BACKEND DESIGN (Core System)

## 🔹 Endpoint utama

### 1. Tambah produk

```http
POST /api/products
```

---

### 2. Tambah traceability

```http
POST /api/trace
```

---

### 3. Ambil history produk

```http
GET /api/trace/:productId
```

---

## 🔹 Contoh implementasi

```js
app.post("/trace", async (req, res) => {
  const { productId, stage, details, location } = req.body;

  const trace = await TraceModel.findOne({ product_id: productId });

  trace.history.push({
    stage,
    details,
    location,
    date: new Date()
  });

  await trace.save();

  res.json({ success: true });
});
```

---

# 🔍 6. FLOW TRACEABILITY (BARU)

Berdasarkan alur di dokumen (halaman 40) 

👉 kita simplify:

---

## 🔄 Flow:

1. Petani input produk
2. Sistem buat record traceability
3. Setiap update:

   * disimpan ke DB
4. Generate QR code
5. Konsumen scan → lihat history

---

# 📱 7. QR CODE (tetap dipakai)

Dari dokumen:

> QR code untuk akses traceability 

---

## 🔹 Contoh:

```text
https://freshchain.id/trace/PRODUCT_ID
```

---

## 🔹 Frontend fetch:

```js
GET /api/trace/123
```

---

# 🔐 8. GANTI “IMMUTABLE” BLOCKCHAIN

Karena tidak pakai blockchain, kamu harus ganti dengan:

## ✅ Audit Log System

```js
{
  action: "UPDATE_TRACE",
  user: "petani123",
  timestamp: Date
}
```

---

## ✅ Role-based access

* petani → input data
* admin → verifikasi
* konsumen → read only

---

# 🚀 9. ROADMAP IMPLEMENTASI

## 🔹 Phase 1 (WAJIB)

* setup backend (Express)
* setup MongoDB
* CRUD produk
* CRUD traceability

---

## 🔹 Phase 2

* QR code
* frontend tracking page

---

## 🔹 Phase 3

* dashboard analytics
* notifikasi

---

# 🎯 10. SUMMARY FINAL (untuk skill.md agent)

Ini yang bisa kamu tulis:

---

## 🧠 FreshChain (No Blockchain Version)

**FreshChain adalah platform distribusi pangan berbasis web yang menyediakan:**

* marketplace produk petani
* sistem traceability berbasis database
* transparansi data distribusi

---

### 🔧 Teknologi:

* Frontend: React.js
* Backend: Node.js (Express)
* Database: MongoDB

---

### 🔍 Traceability System:

* data disimpan dalam collection `traceability`
* setiap produk memiliki riwayat (history)
* data dapat diakses melalui API
* QR code digunakan untuk tracking publik

---

### 🔄 Flow:

```text
Petani input → Database → API → QR → Konsumen lihat history
```

---

### 🎯 Tujuan:

* meningkatkan transparansi distribusi pangan
* mengurangi food loss
* mempermudah monitoring produk

