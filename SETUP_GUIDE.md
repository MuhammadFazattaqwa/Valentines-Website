# 📖 Panduan Setup Valentine Website

## 🎯 Langkah-langkah Setup Lengkap

### Step 1: Setup Supabase Database

1. **Buat Project Supabase**
   - Kunjungi https://supabase.com
   - Klik "New Project"
   - Isi nama project: `valentine-website`
   - Pilih region terdekat
   - Buat password database yang kuat
   - Tunggu hingga project selesai dibuat (~2 menit)

2. **Setup Database Schema**
   - Buka project Supabase
   - Klik "SQL Editor" di sidebar
   - Klik "New Query"
   - Copy seluruh isi file `supabase-schema.sql`
   - Paste ke SQL Editor
   - Klik "Run" atau tekan Ctrl+Enter
   - Pastikan muncul pesan sukses

3. **Insert Data Demo**
   - Masih di SQL Editor
   - Klik "New Query" lagi
   - Copy seluruh isi file `supabase-seed.sql`
   - Paste dan Run
   - Verifikasi data masuk dengan query:
     ```sql
     SELECT * FROM surprises;
     SELECT * FROM gallery;
     SELECT * FROM quiz_questions;
     ```

4. **Setup Storage Bucket**
   - Klik "Storage" di sidebar
   - Klik "Create a new bucket"
   - Nama bucket: `valentine-gallery`
   - Centang "Public bucket"
   - Klik "Create bucket"

5. **Ambil API Credentials**
   - Klik "Settings" > "API"
   - Copy:
     - Project URL (contoh: https://xxxxx.supabase.co)
     - anon public key (untuk frontend)
     - service_role key (untuk backend) - JANGAN SHARE!

### Step 2: Setup Backend

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

3. **Edit file .env**
   ```
   PORT=5000
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_KEY=eyJhbGc...your-service-key
   NODE_ENV=development
   ```

4. **Run Backend**
   ```bash
   npm run dev
   ```
   
   Jika berhasil, akan muncul:
   ```
   Server running on port 5000
   ```

5. **Test Backend**
   Buka browser atau Postman:
   ```
   GET http://localhost:5000/health
   ```
   Response: `{"status":"ok"}`

### Step 3: Setup Frontend

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   # Windows
   copy .env.example .env
   
   # Mac/Linux
   cp .env.example .env
   ```

3. **Edit file .env**
   ```
   VITE_API_URL=http://localhost:5000
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
   ```

4. **Run Frontend**
   ```bash
   npm run dev
   ```
   
   Jika berhasil, akan muncul:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:3000/
   ```

5. **Test Website**
   - Buka http://localhost:3000
   - Akan redirect ke http://localhost:3000/s/demo
   - Seharusnya muncul landing page Valentine

### Step 4: Verifikasi Semua Berjalan

✅ **Checklist:**
- [ ] Backend running di port 5000
- [ ] Frontend running di port 3000
- [ ] Landing page muncul dengan animasi hearts
- [ ] Bisa klik "Buka Kejutan"
- [ ] Pesan muncul di halaman kedua
- [ ] Gallery menampilkan foto
- [ ] Quiz bisa dijawab
- [ ] Form reply bisa disubmit
- [ ] Confetti muncul setelah submit

## 🎨 Membuat Surprise Sendiri

### Cara 1: Via SQL Editor (Mudah)

1. **Buka Supabase SQL Editor**

2. **Insert Surprise Baru**
   ```sql
   INSERT INTO surprises (code, recipient_name, message) 
   VALUES (
     'untuk-sayang',  -- ganti dengan code unik
     'Sarah',         -- nama penerima
     'Pesan romantis kamu di sini...'
   )
   RETURNING id;
   ```
   
   Copy ID yang muncul (contoh: `123e4567-e89b-12d3-a456-426614174000`)

3. **Upload Foto ke Storage**
   - Klik "Storage" > "valentine-gallery"
   - Klik "Upload file"
   - Upload foto-foto kenangan
   - Copy URL setiap foto (klik foto > Copy URL)

4. **Insert Gallery**
   ```sql
   INSERT INTO gallery (surprise_id, image_url, caption) VALUES
   ('123e4567-e89b-12d3-a456-426614174000', 'https://...foto1.jpg', 'Caption 1'),
   ('123e4567-e89b-12d3-a456-426614174000', 'https://...foto2.jpg', 'Caption 2'),
   ('123e4567-e89b-12d3-a456-426614174000', 'https://...foto3.jpg', 'Caption 3');
   ```

5. **Insert Quiz**
   ```sql
   INSERT INTO quiz_questions (surprise_id, question, options, answer_index) VALUES
   ('123e4567-e89b-12d3-a456-426614174000', 
    'Apa makanan favorit aku?', 
    '["Pizza", "Sushi", "Nasi Goreng", "Mie Ayam"]', 
    2),
   ('123e4567-e89b-12d3-a456-426614174000', 
    'Warna favorit aku?', 
    '["Merah", "Biru", "Pink", "Hitam"]', 
    0);
   ```

6. **Share Link**
   ```
   http://localhost:3000/s/untuk-sayang
   ```

### Cara 2: Via Supabase Table Editor (Lebih Mudah)

1. **Klik "Table Editor"** di Supabase
2. **Pilih tabel "surprises"**
3. **Klik "Insert row"**
4. **Isi form:**
   - code: `untuk-sayang`
   - recipient_name: `Sarah`
   - message: `Pesan kamu...`
5. **Klik "Save"**
6. **Ulangi untuk tabel gallery dan quiz_questions**

## 🚀 Deploy ke Production

### Deploy Backend ke Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Deploy**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set SUPABASE_URL=https://xxxxx.supabase.co
   railway variables set SUPABASE_SERVICE_KEY=your-service-key
   railway variables set NODE_ENV=production
   ```

5. **Get URL**
   ```bash
   railway domain
   ```
   Copy URL (contoh: `https://valentine-backend.railway.app`)

### Deploy Frontend ke Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables**
   - Buka Vercel Dashboard
   - Pilih project
   - Settings > Environment Variables
   - Tambahkan:
     ```
     VITE_API_URL=https://valentine-backend.railway.app
     VITE_SUPABASE_URL=https://xxxxx.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Redeploy**
   ```bash
   vercel --prod
   ```

5. **Get URL**
   Copy URL dari Vercel (contoh: `https://valentine.vercel.app`)

## 🎵 Mengganti Background Music

1. **Cari musik royalty-free:**
   - YouTube Audio Library
   - Pixabay Music
   - Free Music Archive

2. **Upload ke Supabase Storage:**
   - Buat bucket baru: `valentine-music`
   - Upload file MP3
   - Copy URL

3. **Edit MusicToggle.tsx:**
   ```tsx
   <source src="https://your-supabase-url/storage/v1/object/public/valentine-music/song.mp3" type="audio/mpeg" />
   ```

## 🎨 Customisasi Warna

Edit `frontend/tailwind.config.js`:

```js
colors: {
  valentine: {
    pink: '#FFB6C1',    // Light pink
    rose: '#FF69B4',    // Hot pink
    red: '#FF1744',     // Red
    pastel: '#FFC0CB',  // Pastel pink
    light: '#FFF0F5'    // Lavender blush
  }
}
```

Ganti dengan warna favorit:
- Pink tua: `#FF1493`
- Ungu: `#9C27B0`
- Merah marun: `#880E4F`

## ❓ Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan file `.env` ada
- Cek nama variable sesuai (VITE_ prefix untuk frontend)
- Restart dev server setelah edit .env

### Error: "Surprise not found"
- Cek code di URL sesuai dengan database
- Verifikasi data ada di tabel surprises
- Cek RLS policies di Supabase

### Gallery foto tidak muncul
- Pastikan bucket `valentine-gallery` public
- Cek URL foto valid
- Verifikasi CORS settings di Supabase

### Backend tidak connect ke Supabase
- Gunakan service_role key, bukan anon key
- Cek URL Supabase benar
- Verifikasi network/firewall

### Frontend tidak bisa hit backend
- Pastikan backend running
- Cek VITE_API_URL di .env
- Verifikasi CORS enabled di backend

## 📞 Support

Jika ada masalah:
1. Cek console browser (F12)
2. Cek terminal backend untuk error logs
3. Verifikasi semua environment variables
4. Pastikan Supabase project aktif

---

**Selamat mencoba! 💖**
