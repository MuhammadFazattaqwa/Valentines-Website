# ❓ Frequently Asked Questions (FAQ)

## 🚀 Getting Started

### Q: Apakah website ini gratis?
**A:** Ya! Semua tools yang digunakan memiliki free tier:
- Supabase: 500MB database, 1GB storage
- Vercel: Unlimited deployments
- Railway: $5 credit/month
- Semuanya cukup untuk personal use

### Q: Apakah saya perlu coding experience?
**A:** Basic knowledge membantu, tapi dokumentasi sudah sangat detail. Follow step-by-step guide dan kamu bisa setup dalam 5-10 menit.

### Q: Berapa lama setup?
**A:** 
- Setup Supabase: 2 menit
- Setup Backend: 1 menit
- Setup Frontend: 1 menit
- Testing: 1 menit
- **Total: ~5 menit**

---

## 🛠️ Technical

### Q: Kenapa menggunakan Supabase?
**A:** 
- Free tier generous
- PostgreSQL (reliable)
- Built-in storage
- Real-time capabilities
- Easy to use
- Good documentation

### Q: Bisa pakai database lain?
**A:** Ya, tapi perlu modifikasi:
- MongoDB: Ganti Supabase client dengan MongoDB driver
- MySQL: Ganti dengan MySQL client
- Firebase: Ganti dengan Firebase SDK

### Q: Kenapa TypeScript?
**A:**
- Type safety
- Better IDE support
- Catch errors early
- Better documentation
- Industry standard

### Q: Bisa pakai JavaScript biasa?
**A:** Ya, hapus semua type annotations dan ganti `.ts`/`.tsx` ke `.js`/`.jsx`. Tapi TypeScript lebih recommended.

---

## 🎨 Customization

### Q: Bagaimana ganti warna?
**A:** Edit `frontend/tailwind.config.js`:
```js
colors: {
  valentine: {
    pink: '#YOUR_COLOR',
    rose: '#YOUR_COLOR',
    red: '#YOUR_COLOR',
  }
}
```

### Q: Bagaimana ganti background music?
**A:** Edit `frontend/src/components/MusicToggle.tsx`:
```tsx
<source src="YOUR_MUSIC_URL.mp3" type="audio/mpeg" />
```

### Q: Bisa tambah lebih banyak steps?
**A:** Ya! Edit `SurprisePage.tsx`:
1. Tambah state untuk step baru
2. Buat component page baru
3. Tambah kondisi render
4. Update totalSteps

### Q: Bagaimana ganti font?
**A:** 
1. Import font di `index.css`
2. Update Tailwind config
```js
fontFamily: {
  sans: ['Your Font', 'sans-serif']
}
```

---

## 📸 Gallery & Media

### Q: Format foto apa yang didukung?
**A:** Semua format umum: JPG, PNG, GIF, WebP

### Q: Berapa ukuran maksimal foto?
**A:** Supabase free tier: 50MB per file. Recommended: < 5MB per foto untuk loading cepat.

### Q: Bagaimana compress foto?
**A:** Gunakan tools:
- TinyPNG.com
- Squoosh.app
- ImageOptim (Mac)

### Q: Bisa pakai video?
**A:** Ya, tapi perlu modifikasi:
1. Upload video ke Supabase Storage
2. Ganti `<img>` dengan `<video>` di GalleryPage
3. Add video controls

---

## 🔐 Security & Privacy

### Q: Apakah data aman?
**A:** 
- Data disimpan di Supabase (secure)
- HTTPS encryption
- Environment variables untuk secrets
- RLS policies untuk access control

### Q: Siapa yang bisa akses surprise?
**A:** Siapa saja yang punya link. Link bersifat private (tidak ada listing public).

### Q: Bagaimana protect admin page?
**A:** Tambahkan authentication:
```tsx
import { useSession } from '@supabase/auth-helpers-react';

const AdminPage = () => {
  const session = useSession();
  if (!session) return <LoginPage />;
  // ... rest
};
```

### Q: Bisa hapus surprise?
**A:** Ya, via Supabase dashboard atau tambahkan delete function di admin page.

---

## 🚀 Deployment

### Q: Dimana deploy backend?
**A:** Recommended:
1. Railway (easiest)
2. Render (good free tier)
3. Heroku (paid)
4. VPS (advanced)

### Q: Dimana deploy frontend?
**A:** Recommended:
1. Vercel (best for React)
2. Netlify (easy)
3. Cloudflare Pages (fast)
4. GitHub Pages (static only)

### Q: Berapa biaya deploy?
**A:** 
- **Free tier:** $0/month (cukup untuk personal use)
- **Paid:** ~$5-20/month untuk production dengan traffic tinggi

### Q: Apakah perlu custom domain?
**A:** Tidak wajib. Free subdomain sudah cukup:
- Vercel: `your-app.vercel.app`
- Railway: `your-app.railway.app`

### Q: Bagaimana setup custom domain?
**A:**
1. Beli domain (Namecheap, GoDaddy, dll)
2. Add domain di Vercel/Railway dashboard
3. Update DNS records
4. Wait for propagation (~24 hours)

---

## 🐛 Troubleshooting

### Q: Error "Missing Supabase environment variables"
**A:**
1. Check file `.env` exists
2. Verify variable names (VITE_ prefix untuk frontend)
3. Restart dev server after editing .env

### Q: Backend tidak connect ke Supabase
**A:**
1. Use service_role key (bukan anon key)
2. Check Supabase URL correct
3. Verify project is active
4. Check network/firewall

### Q: Frontend tidak bisa hit backend
**A:**
1. Pastikan backend running
2. Check VITE_API_URL di .env
3. Verify CORS enabled
4. Check browser console for errors

### Q: Gallery foto tidak muncul
**A:**
1. Pastikan bucket `valentine-gallery` public
2. Check image URLs valid
3. Verify CORS settings
4. Check browser console

### Q: Build error saat deploy
**A:**
1. Clear cache: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Check TypeScript errors: `npm run build`
4. Verify environment variables

### Q: 502 Bad Gateway
**A:**
1. Check backend logs
2. Verify start command correct
3. Check PORT environment variable
4. Restart service

---

## 💡 Features

### Q: Bagaimana tambah lebih banyak quiz questions?
**A:** Insert ke database:
```sql
INSERT INTO quiz_questions (surprise_id, question, options, answer_index)
VALUES ('your-surprise-id', 'Question?', '["A","B","C","D"]', 0);
```

### Q: Bisa kirim email notification?
**A:** Ya! Lihat FEATURES.md untuk implementasi dengan Nodemailer.

### Q: Bagaimana generate QR code?
**A:** Install `qrcode` package dan lihat implementasi di FEATURES.md.

### Q: Bisa tambah countdown timer?
**A:** Ya! Lihat implementasi di FEATURES.md.

### Q: Bagaimana track analytics?
**A:** Integrate dengan:
- Google Analytics
- Vercel Analytics
- Plausible Analytics

---

## 📱 Mobile

### Q: Apakah mobile-friendly?
**A:** Ya! Responsive design untuk semua screen sizes.

### Q: Bisa jadi PWA?
**A:** Ya, tambahkan:
1. Service worker
2. Manifest.json
3. Icons
4. Install prompt

### Q: Bagaimana optimize untuk mobile?
**A:**
1. Compress images
2. Lazy load components
3. Reduce animations
4. Use mobile-first design

---

## 🎯 Use Cases

### Q: Bisa untuk occasion lain?
**A:** Ya! Ganti theme untuk:
- Birthday
- Anniversary
- Wedding
- Graduation
- Any celebration

### Q: Bisa untuk multiple recipients?
**A:** Ya! Buat surprise baru untuk setiap recipient dengan code unik.

### Q: Berapa banyak surprise bisa dibuat?
**A:** Unlimited (dalam batas Supabase free tier: 500MB database).

### Q: Bisa reuse surprise?
**A:** Ya, tapi better buat baru untuk setiap occasion agar lebih personal.

---

## 💰 Costs

### Q: Kapan perlu upgrade?
**A:** Jika:
- Database > 500MB
- Storage > 1GB
- Traffic > 50k users/month
- Butuh 24/7 uptime

### Q: Berapa biaya upgrade?
**A:**
- Supabase Pro: $25/month
- Vercel Pro: $20/month
- Railway: Pay as you go (~$5-20/month)

### Q: Bisa monetize?
**A:** Ya! Ideas:
- Charge untuk custom surprises
- Offer premium templates
- Add ads (not recommended)
- Sell as service

---

## 🔄 Updates

### Q: Bagaimana update code?
**A:**
```bash
git pull origin main
npm install
npm run build
```

### Q: Apakah auto-update?
**A:** Jika deploy via Vercel/Railway dengan GitHub integration, yes! Auto-deploy on push.

### Q: Bagaimana backup data?
**A:**
1. Supabase: Settings > Database > Backup
2. Export tables via SQL
3. Download storage files

---

## 🤝 Support

### Q: Dimana dapat help?
**A:**
1. Baca dokumentasi lengkap
2. Check console errors
3. Search GitHub issues
4. Create new issue
5. Join community discussions

### Q: Bisa request feature?
**A:** Ya! Create GitHub issue dengan label "feature request".

### Q: Bisa contribute?
**A:** Absolutely! Read CONTRIBUTING.md untuk guidelines.

---

## 📚 Learning Resources

### Q: Belajar React dimana?
**A:**
- React.dev (official docs)
- FreeCodeCamp
- Scrimba
- YouTube tutorials

### Q: Belajar TypeScript dimana?
**A:**
- TypeScript Handbook
- TypeScript Deep Dive
- Execute Program
- Frontend Masters

### Q: Belajar Supabase dimana?
**A:**
- Supabase Docs
- Supabase YouTube
- Supabase Examples
- Community tutorials

---

**Tidak menemukan jawaban? Create GitHub issue! 💬**
