# 🚨 SETUP REQUIRED - Baca Ini Dulu!

## Error: Missing Supabase environment variables

Kamu perlu setup Supabase terlebih dahulu. Ikuti langkah berikut:

---

## ⚡ Quick Setup (5 Menit)

### 1️⃣ Buat Supabase Project

1. Buka https://supabase.com
2. Sign up / Login
3. Klik "New Project"
4. Isi:
   - Name: `valentine-website`
   - Database Password: (buat password kuat)
   - Region: (pilih terdekat)
5. Klik "Create new project"
6. Tunggu ~2 menit

### 2️⃣ Setup Database

1. Di Supabase Dashboard, klik **"SQL Editor"** (sidebar kiri)
2. Klik **"New Query"**
3. Copy SEMUA isi file `supabase-schema.sql`
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Tunggu hingga selesai (muncul "Success")

### 3️⃣ Insert Demo Data

1. Masih di SQL Editor, klik **"New Query"** lagi
2. Copy SEMUA isi file `supabase-seed.sql`
3. Paste ke SQL Editor
4. Klik **"Run"**
5. Tunggu hingga selesai

### 4️⃣ Buat Storage Bucket

1. Klik **"Storage"** (sidebar kiri)
2. Klik **"Create a new bucket"**
3. Isi:
   - Name: `valentine-gallery`
   - Public bucket: **CENTANG** ✅
4. Klik **"Create bucket"**

### 5️⃣ Ambil API Credentials

1. Klik **"Settings"** (sidebar kiri bawah)
2. Klik **"API"**
3. Copy 3 values ini:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public key:** (untuk frontend)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**service_role key:** (untuk backend) ⚠️ JANGAN SHARE!
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 6️⃣ Update .env Files

**Backend (.env):**
```env
PORT=5000
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 7️⃣ Run Lagi

```bash
npm run dev
```

---

## ✅ Verification

Setelah setup, cek:

1. **Backend running:** http://localhost:5000/health
   - Response: `{"status":"ok"}`

2. **Frontend running:** http://localhost:3000
   - Redirect ke: http://localhost:3000/s/demo

3. **Demo surprise works:**
   - Landing page muncul
   - Bisa klik "Buka Kejutan"
   - Semua steps berjalan

---

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- ✅ File `.env` sudah dibuat di `backend/` dan `frontend/`
- ✅ Isi dengan credentials dari Supabase
- ✅ Restart server setelah edit .env

### Error: "Surprise not found"
- ✅ Jalankan `supabase-seed.sql` di SQL Editor
- ✅ Cek tabel `surprises` ada data dengan code='demo'

### Error: "Failed to fetch"
- ✅ Backend running di port 5000
- ✅ Check VITE_API_URL di frontend/.env

### Gallery foto tidak muncul
- ✅ Bucket `valentine-gallery` sudah dibuat
- ✅ Bucket di-set sebagai public

---

## 📞 Need Help?

1. Baca **SETUP_GUIDE.md** untuk detail lengkap
2. Baca **FAQ.md** untuk troubleshooting
3. Check console browser (F12) untuk error messages

---

**Setelah setup Supabase, website akan berjalan sempurna! 🚀💖**
