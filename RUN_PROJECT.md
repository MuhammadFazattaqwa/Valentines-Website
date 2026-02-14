# 🚀 CARA MENJALANKAN PROJECT

## ✅ Setup Sudah Benar!

Saya sudah test - Supabase connection OK, database OK, credentials OK!

---

## 🎯 Jalankan Sekarang

### Buka 2 Terminal:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Tunggu sampai muncul:
```
Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```

Tunggu sampai muncul:
```
Local: http://localhost:3000/
```

### Atau Jalankan Sekaligus (1 Terminal):
```bash
npm run dev
```

---

## 🧪 Test Website

1. **Buka browser:** http://localhost:3000
2. **Akan redirect ke:** http://localhost:3000/s/demo
3. **Klik:** "Buka Kejutan" 
4. **Enjoy!** 💖

---

## 🐛 Troubleshooting

### Backend tidak jalan?

**Check port 5000:**
```powershell
netstat -ano | findstr :5000
```

**Kill process jika ada:**
```powershell
taskkill /PID <PID> /F
```

### Frontend tidak connect?

**Check backend running:**
- Buka: http://localhost:5000/health
- Harus return: `{"status":"ok"}`

### Masih error?

**Reinstall dependencies:**
```bash
# Backend
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install

# Frontend  
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 📱 Akses Website

Setelah kedua server running:

- **Demo Surprise:** http://localhost:3000/s/demo
- **Admin Page:** http://localhost:3000/admin
- **Backend API:** http://localhost:5000/health

---

## ✅ Checklist

- [ ] Backend running di port 5000
- [ ] Frontend running di port 3000
- [ ] http://localhost:5000/health returns OK
- [ ] http://localhost:3000 loads
- [ ] Demo surprise works

---

**Semua sudah siap! Tinggal run `npm run dev` 🚀💖**
