# 🚀 Panduan Deployment

## Pilihan Platform Deployment

### Backend Options:
1. **Railway** (Recommended) - Gratis, mudah, auto-deploy
2. **Render** - Gratis tier tersedia
3. **Heroku** - Berbayar
4. **AWS/GCP/Azure** - Lebih kompleks

### Frontend Options:
1. **Vercel** (Recommended) - Gratis, optimized untuk React
2. **Netlify** - Gratis, mudah
3. **Cloudflare Pages** - Gratis, cepat
4. **GitHub Pages** - Gratis (static only)

---

## 🚂 Deploy Backend ke Railway

### Persiapan

1. **Push code ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/valentine-backend.git
   git push -u origin main
   ```

### Deploy via Railway Dashboard (Mudah)

1. **Buat akun di Railway.app**
   - Kunjungi https://railway.app
   - Sign up dengan GitHub

2. **Create New Project**
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - Pilih repository backend
   - Railway akan auto-detect Node.js

3. **Configure Build**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Root Directory: `/` (atau `/backend` jika monorepo)

4. **Add Environment Variables**
   - Klik tab "Variables"
   - Add variable:
     ```
     SUPABASE_URL=https://xxxxx.supabase.co
     SUPABASE_SERVICE_KEY=your-service-key
     NODE_ENV=production
     PORT=5000
     ```

5. **Generate Domain**
   - Klik "Settings"
   - Scroll ke "Domains"
   - Klik "Generate Domain"
   - Copy URL (contoh: `valentine-backend-production.up.railway.app`)

6. **Deploy**
   - Railway akan auto-deploy
   - Tunggu hingga status "Active"
   - Test: `https://your-domain.railway.app/health`

### Deploy via Railway CLI

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
cd backend
railway init

# Link to project (jika sudah ada)
railway link

# Add environment variables
railway variables set SUPABASE_URL=https://xxxxx.supabase.co
railway variables set SUPABASE_SERVICE_KEY=your-key
railway variables set NODE_ENV=production

# Deploy
railway up

# Get domain
railway domain
```

---

## ▲ Deploy Frontend ke Vercel

### Persiapan

1. **Push code ke GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/valentine-frontend.git
   git push -u origin main
   ```

### Deploy via Vercel Dashboard (Mudah)

1. **Buat akun di Vercel**
   - Kunjungi https://vercel.com
   - Sign up dengan GitHub

2. **Import Project**
   - Klik "Add New" > "Project"
   - Import repository frontend
   - Vercel akan auto-detect Vite

3. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: `/` (atau `/frontend` jika monorepo)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend.railway.app
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Deploy**
   - Klik "Deploy"
   - Tunggu build selesai (~2 menit)
   - Copy URL (contoh: `valentine.vercel.app`)

### Deploy via Vercel CLI

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy (development)
cd frontend
vercel

# Set environment variables
vercel env add VITE_API_URL
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

---

## 🎯 Deploy Backend ke Render

### Via Render Dashboard

1. **Buat akun di Render**
   - Kunjungi https://render.com
   - Sign up dengan GitHub

2. **Create Web Service**
   - Klik "New" > "Web Service"
   - Connect repository backend
   - Pilih branch `main`

3. **Configure Service**
   ```
   Name: valentine-backend
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_KEY=your-service-key
   NODE_ENV=production
   ```

5. **Create Web Service**
   - Pilih Free tier
   - Klik "Create Web Service"
   - Tunggu deploy selesai
   - Copy URL

---

## 🌐 Deploy Frontend ke Netlify

### Via Netlify Dashboard

1. **Buat akun di Netlify**
   - Kunjungi https://netlify.com
   - Sign up dengan GitHub

2. **Import Project**
   - Klik "Add new site" > "Import an existing project"
   - Connect to GitHub
   - Pilih repository frontend

3. **Configure Build**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables**
   - Site settings > Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-backend.railway.app
     VITE_SUPABASE_URL=https://xxxxx.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

5. **Deploy**
   - Klik "Deploy site"
   - Copy URL

---

## 🔧 Post-Deployment Setup

### 1. Update CORS di Backend

Jika deploy terpisah, update CORS di `backend/src/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://valentine.vercel.app',  // tambahkan domain production
  ],
  credentials: true
}));
```

### 2. Update Supabase Settings

1. **Buka Supabase Dashboard**
2. **Settings > API**
3. **URL Configuration**
   - Tambahkan domain production ke allowed origins

### 3. Test Production

```bash
# Test backend
curl https://your-backend.railway.app/health

# Test frontend
# Buka browser: https://valentine.vercel.app/s/demo
```

### 4. Setup Custom Domain (Optional)

#### Vercel:
1. Settings > Domains
2. Add domain
3. Update DNS records di domain provider

#### Railway:
1. Settings > Domains
2. Add custom domain
3. Update CNAME record

---

## 🔄 Auto-Deploy Setup

### GitHub Actions (Optional)

Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd backend && npm install
      - run: cd backend && npm run build
      # Add deploy steps

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd frontend && npm install
      - run: cd frontend && npm run build
      # Add deploy steps
```

---

## 📊 Monitoring & Logs

### Railway
- Dashboard > Deployments > View Logs
- Real-time logs
- Metrics: CPU, Memory, Network

### Vercel
- Dashboard > Deployments > Function Logs
- Analytics
- Performance insights

### Render
- Dashboard > Logs
- Metrics
- Health checks

---

## 🐛 Troubleshooting Deployment

### Build Failed

**Frontend:**
```bash
# Clear cache
rm -rf node_modules .next dist
npm install
npm run build
```

**Backend:**
```bash
# Check TypeScript errors
npm run build

# Test locally
npm start
```

### Environment Variables Not Working

- Pastikan prefix `VITE_` untuk frontend
- Restart service setelah update env vars
- Check typo di nama variable

### CORS Error in Production

Update backend CORS:
```typescript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend.vercel.app']
    : ['http://localhost:3000']
}));
```

### Database Connection Error

- Verifikasi Supabase URL & keys
- Check Supabase project status
- Verify RLS policies

### 502 Bad Gateway

- Check backend logs
- Verify start command
- Check port configuration (Railway uses PORT env var)

---

## 💰 Cost Estimation

### Free Tier Limits:

**Railway:**
- $5 credit/month
- ~500 hours runtime
- Cukup untuk hobby project

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- Gratis untuk personal

**Render:**
- Free tier: 750 hours/month
- Auto-sleep after 15 min inactive

**Supabase:**
- 500MB database
- 1GB file storage
- 50,000 monthly active users

### Upgrade Jika:
- Traffic tinggi (>10k visitors/month)
- Butuh custom domain
- Butuh 24/7 uptime
- Storage >1GB

---

## ✅ Deployment Checklist

- [ ] Backend deployed & running
- [ ] Frontend deployed & accessible
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Storage bucket accessible
- [ ] CORS configured correctly
- [ ] Custom domain setup (optional)
- [ ] SSL/HTTPS enabled
- [ ] Test all features:
  - [ ] Landing page loads
  - [ ] Message displays
  - [ ] Gallery shows images
  - [ ] Quiz works
  - [ ] Reply form submits
  - [ ] Confetti animation works
- [ ] Monitor logs for errors
- [ ] Setup analytics (optional)

---

**Selamat! Website Valentine kamu sudah live! 🎉💖**
