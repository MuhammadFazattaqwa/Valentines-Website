# ✅ Backend Setup - SUDAH BENAR!

## Status Check

✅ File `.env` ada
✅ Supabase URL configured
✅ Service key configured  
✅ Database connected
✅ Tables exist

## 🚀 Cara Menjalankan

### Option 1: Run dari root (Recommended)
```bash
npm run dev
```

### Option 2: Run backend saja
```bash
cd backend
npm run dev
```

### Option 3: Run manual
```bash
cd backend
npx tsx watch src/index.ts
```

## 🧪 Test Backend

Setelah backend running, test di browser atau terminal baru:

**Browser:**
```
http://localhost:5000/health
```

**Terminal (PowerShell):**
```powershell
Invoke-WebRequest -Uri http://localhost:5000/health
```

**Expected response:**
```json
{"status":"ok"}
```

## 🐛 Jika Masih Error

### Error: "Port 5000 already in use"
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

### Error: "Cannot find module"
```bash
cd backend
npm install
```

### Error: "Missing Supabase environment variables"
- Check file `backend/.env` exists
- Verify credentials are correct
- Restart terminal after editing .env

## ✅ Verification

Backend is working if you see:
```
Server running on port 5000
```

Then test:
- http://localhost:5000/health → `{"status":"ok"}`
- http://localhost:5000/api/surprise/demo → Returns surprise data

## 📞 Next Steps

1. ✅ Backend working? → Run frontend: `cd frontend && npm run dev`
2. ✅ Both running? → Open http://localhost:3000
3. ✅ Website loads? → Test demo: http://localhost:3000/s/demo

---

**Your backend is configured correctly! Just run: `npm run dev` from root folder 🚀**
