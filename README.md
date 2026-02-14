# 💖 Valentine Surprise Website

Website Valentine fullstack yang romantis dan interaktif untuk memberikan kejutan spesial kepada orang tersayang.

## 🎯 Fitur

- ✨ Landing page dengan animasi floating hearts
- 💌 Pesan romantis personal
- 📸 Galeri foto kenangan
- 🎯 Mini quiz pasangan
- 🎉 Halaman final dengan confetti animation
- 🎵 Background music toggle
- 📊 Progress indicator
- 💬 Form kirim pesan balik

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animasi)
- React Query (state management)
- React Router
- Canvas Confetti

### Backend
- Node.js + TypeScript
- Express
- Supabase (PostgreSQL + Storage)
- Rate Limiting

## 📁 Struktur Project

```
valentines-website/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── types/           # TypeScript types
│   │   ├── lib/             # Utilities & API client
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/                  # Express backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   └── index.ts
│   └── package.json
├── supabase-schema.sql      # Database schema
└── supabase-seed.sql        # Demo data
```

## 🚀 Setup & Installation

### 1. Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Buka SQL Editor dan jalankan `supabase-schema.sql`
3. Jalankan `supabase-seed.sql` untuk data demo
4. Buat storage bucket:
   - Nama: `valentine-gallery`
   - Public: Yes
5. Copy URL dan API keys dari Settings > API

### 2. Setup Backend

```bash
cd backend
npm install

# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan credentials Supabase
# PORT=5000
# SUPABASE_URL=your_supabase_url
# SUPABASE_SERVICE_KEY=your_supabase_service_key
# NODE_ENV=development

# Run development server
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install

# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan credentials
# VITE_API_URL=http://localhost:5000
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run development server
npm run dev
```

### 4. Akses Website

Buka browser dan akses:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Demo surprise: http://localhost:3000/s/demo

## 📝 Cara Menggunakan

### Membuat Surprise Baru

1. Insert data ke tabel `surprises`:
```sql
INSERT INTO surprises (code, recipient_name, message) 
VALUES ('my-code', 'Nama Penerima', 'Pesan romantis kamu...');
```

2. Upload foto ke Supabase Storage bucket `valentine-gallery`

3. Insert data gallery:
```sql
INSERT INTO gallery (surprise_id, image_url, caption) 
VALUES ('surprise-id', 'url-foto', 'Caption foto');
```

4. Insert quiz questions:
```sql
INSERT INTO quiz_questions (surprise_id, question, options, answer_index) 
VALUES ('surprise-id', 'Pertanyaan?', '["A", "B", "C", "D"]', 0);
```

5. Share link: `https://your-domain.com/s/my-code`

## 🌐 Deployment

### Deploy Backend (Railway/Render)

#### Railway:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd backend
railway init
railway up
```

#### Render:
1. Push code ke GitHub
2. Buat Web Service baru di Render
3. Connect repository
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Tambahkan environment variables

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Production
vercel --prod
```

Atau via Vercel Dashboard:
1. Import project dari GitHub
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Tambahkan environment variables

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Database Schema

### surprises
- id (UUID, PK)
- code (VARCHAR, UNIQUE)
- recipient_name (VARCHAR)
- message (TEXT)
- created_at (TIMESTAMP)

### gallery
- id (UUID, PK)
- surprise_id (UUID, FK)
- image_url (TEXT)
- caption (TEXT)
- created_at (TIMESTAMP)

### quiz_questions
- id (UUID, PK)
- surprise_id (UUID, FK)
- question (TEXT)
- options (JSONB)
- answer_index (INTEGER)
- created_at (TIMESTAMP)

### replies
- id (UUID, PK)
- surprise_id (UUID, FK)
- sender_name (VARCHAR)
- message (TEXT)
- created_at (TIMESTAMP)

## 🎨 Customization

### Warna
Edit `tailwind.config.js`:
```js
colors: {
  valentine: {
    pink: '#FFB6C1',
    rose: '#FF69B4',
    red: '#FF1744',
    pastel: '#FFC0CB',
    light: '#FFF0F5'
  }
}
```

### Background Music
Edit `MusicToggle.tsx` dan ganti URL musik:
```tsx
<source src="your-music-url.mp3" type="audio/mpeg" />
```

## 🐛 Troubleshooting

### CORS Error
Pastikan backend menggunakan `cors()` middleware dan frontend menggunakan proxy yang benar di `vite.config.ts`.

### Supabase Connection Error
- Cek environment variables
- Pastikan RLS policies sudah di-setup
- Cek API keys (gunakan service key untuk backend, anon key untuk frontend)

### Build Error
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT License - Feel free to use for personal projects!

## 💝 Credits

Dibuat dengan ❤️ untuk Valentine's Day

---

**Happy Valentine's Day! 💖**
