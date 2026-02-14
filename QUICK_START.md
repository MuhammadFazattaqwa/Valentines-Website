# ⚡ Quick Start Guide

Panduan cepat untuk menjalankan website Valentine dalam 5 menit!

## 🚀 Prerequisites

- Node.js 18+ installed
- npm atau yarn
- Akun Supabase (gratis)

## 📝 Step-by-Step (5 Menit)

### 1️⃣ Setup Supabase (2 menit)

```bash
# 1. Buka https://supabase.com dan buat project baru
# 2. Tunggu project selesai dibuat
# 3. Buka SQL Editor
# 4. Copy-paste isi file supabase-schema.sql
# 5. Run query
# 6. Copy-paste isi file supabase-seed.sql
# 7. Run query
# 8. Buka Storage > Create bucket > nama: valentine-gallery > public: yes
# 9. Copy API credentials dari Settings > API
```

### 2️⃣ Setup Backend (1 menit)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan credentials Supabase
npm run dev
```

File `.env`:
```
PORT=5000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...
NODE_ENV=development
```

### 3️⃣ Setup Frontend (1 menit)

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env dengan credentials
npm run dev
```

File `.env`:
```
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4️⃣ Test (1 menit)

```bash
# Buka browser
http://localhost:3000/s/demo

# Test admin page
http://localhost:3000/admin
```

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema created
- [ ] Seed data inserted
- [ ] Storage bucket created
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Demo surprise accessible
- [ ] Admin page accessible

## 🎯 Next Steps

### Buat Surprise Pertama Kamu

1. **Via Supabase Dashboard:**
   - Buka Table Editor
   - Pilih tabel `surprises`
   - Insert row baru
   - Isi: code, recipient_name, message
   - Save

2. **Upload Foto:**
   - Buka Storage > valentine-gallery
   - Upload foto
   - Copy URL
   - Insert ke tabel `gallery` dengan surprise_id

3. **Buat Quiz:**
   - Insert ke tabel `quiz_questions`
   - Format options: `["A", "B", "C", "D"]`
   - answer_index: 0-3

4. **Share Link:**
   ```
   http://localhost:3000/s/your-code
   ```

## 🐛 Troubleshooting Cepat

### Backend tidak jalan?
```bash
# Check port
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Kill process jika ada
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Mac/Linux
```

### Frontend tidak connect ke backend?
```bash
# Check .env file
cat frontend/.env

# Pastikan VITE_API_URL benar
# Restart dev server setelah edit .env
```

### Database error?
```bash
# Check Supabase credentials
# Verify RLS policies enabled
# Check table names match exactly
```

## 📚 Dokumentasi Lengkap

- [README.md](README.md) - Overview & features
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Setup detail
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy ke production
- [FEATURES.md](FEATURES.md) - Bonus features

## 💡 Tips

1. **Development:**
   - Gunakan 2 terminal (backend & frontend)
   - Check console untuk errors
   - Use React DevTools

2. **Testing:**
   - Test di mobile view (responsive)
   - Test semua steps (landing → final)
   - Test form submission

3. **Customization:**
   - Edit warna di `tailwind.config.js`
   - Ganti musik di `MusicToggle.tsx`
   - Customize pesan di database

## 🎨 Customization Cepat

### Ganti Warna
```js
// frontend/tailwind.config.js
colors: {
  valentine: {
    pink: '#YOUR_COLOR',
    rose: '#YOUR_COLOR',
    red: '#YOUR_COLOR',
  }
}
```

### Ganti Musik
```tsx
// frontend/src/components/MusicToggle.tsx
<source src="YOUR_MUSIC_URL.mp3" type="audio/mpeg" />
```

### Ganti Teks
```tsx
// frontend/src/pages/LandingPage.tsx
<h1>YOUR_TITLE 💖</h1>
```

## 🚀 Deploy Cepat

### Vercel (Frontend)
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts
# Add environment variables di dashboard
```

### Railway (Backend)
```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
# Add environment variables di dashboard
```

## 📞 Need Help?

1. Check console errors (F12)
2. Check terminal logs
3. Verify environment variables
4. Read error messages carefully
5. Check Supabase dashboard

## 🎉 You're Ready!

Website Valentine kamu sudah siap digunakan!

**Share link surprise ke orang spesialmu! 💖**

---

**Happy Valentine's Day! 🌹**
