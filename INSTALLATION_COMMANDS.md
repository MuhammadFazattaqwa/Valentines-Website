# 💻 Installation Commands

Copy-paste commands untuk setup cepat!

---

## 🚀 Quick Install (All at Once)

### Windows (PowerShell)

```powershell
# Clone atau navigate ke project
cd "c:\Code\Valentines Website"

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
Copy-Item .env.example .env
cd ..

# Install frontend dependencies
cd frontend
npm install
Copy-Item .env.example .env
cd ..

Write-Host "✅ Installation complete! Edit .env files and run: npm run dev"
```

### Mac/Linux (Bash)

```bash
# Clone atau navigate ke project
cd ~/valentines-website

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cp .env.example .env
cd ..

# Install frontend dependencies
cd frontend
npm install
cp .env.example .env
cd ..

echo "✅ Installation complete! Edit .env files and run: npm run dev"
```

---

## 📦 Step-by-Step Installation

### 1. Install Root Dependencies

```bash
npm install
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env

# Edit .env file (use your editor)
# Windows
notepad .env

# Mac/Linux
nano .env
# or
vim .env
# or
code .env
```

**Backend .env content:**
```env
PORT=5000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_key_here
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env

# Edit .env file
# Windows
notepad .env

# Mac/Linux
nano .env
```

**Frontend .env content:**
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 🗄️ Database Setup

### Supabase SQL Commands

**1. Create Schema (Copy all and run in SQL Editor):**

```sql
-- Create surprises table
CREATE TABLE surprises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  surprise_id UUID REFERENCES surprises(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_questions table
CREATE TABLE quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  surprise_id UUID REFERENCES surprises(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  answer_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create replies table
CREATE TABLE replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  surprise_id UUID REFERENCES surprises(id) ON DELETE CASCADE,
  sender_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_surprises_code ON surprises(code);
CREATE INDEX idx_gallery_surprise_id ON gallery(surprise_id);
CREATE INDEX idx_quiz_surprise_id ON quiz_questions(surprise_id);
CREATE INDEX idx_replies_surprise_id ON replies(surprise_id);

-- Enable RLS
ALTER TABLE surprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON surprises FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON replies FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON replies FOR INSERT WITH CHECK (true);
```

**2. Insert Demo Data (Copy all and run):**

```sql
-- Insert demo surprise
INSERT INTO surprises (code, recipient_name, message) VALUES
('demo', 'Sayang', 'Selamat Hari Valentine! 💖

Aku ingin kamu tahu betapa spesialnya kamu bagiku. Setiap hari bersamamu adalah hadiah yang tak ternilai. Terima kasih sudah menjadi bagian dari hidupku dan membuat setiap momen menjadi lebih indah.

Aku mencintaimu lebih dari kata-kata bisa ungkapkan. Semoga kita bisa terus bersama dan menciptakan lebih banyak kenangan indah bersama.

Happy Valentine''s Day, my love! 💕

Dengan cinta,
Your Special Someone');

-- Insert gallery
INSERT INTO gallery (surprise_id, image_url, caption) VALUES
((SELECT id FROM surprises WHERE code = 'demo'), 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800', 'Kenangan pertama kita 💕'),
((SELECT id FROM surprises WHERE code = 'demo'), 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800', 'Momen spesial bersama 🌹'),
((SELECT id FROM surprises WHERE code = 'demo'), 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800', 'Selalu bersamamu 💖'),
((SELECT id FROM surprises WHERE code = 'demo'), 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800', 'Cinta kita 💑'),
((SELECT id FROM surprises WHERE code = 'demo'), 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800', 'Forever and always 💝'),
((SELECT id FROM surprises WHERE code = 'demo'), 'https://images.unsplash.com/photo-1535478044878-3ed83d5456ef?w=800', 'You and me 💗');

-- Insert quiz
INSERT INTO quiz_questions (surprise_id, question, options, answer_index) VALUES
((SELECT id FROM surprises WHERE code = 'demo'), 'Apa warna favorit aku?', '["Merah", "Biru", "Pink", "Hijau"]', 2),
((SELECT id FROM surprises WHERE code = 'demo'), 'Makanan favorit kita berdua?', '["Pizza", "Sushi", "Pasta", "Burger"]', 0),
((SELECT id FROM surprises WHERE code = 'demo'), 'Tanggal pertama kita bertemu?', '["14 Januari", "14 Februari", "14 Maret", "14 April"]', 1),
((SELECT id FROM surprises WHERE code = 'demo'), 'Lagu favorit kita?', '["Perfect - Ed Sheeran", "All of Me - John Legend", "Thinking Out Loud - Ed Sheeran", "A Thousand Years - Christina Perri"]', 0),
((SELECT id FROM surprises WHERE code = 'demo'), 'Tempat kencan favorit kita?', '["Pantai", "Gunung", "Kafe", "Bioskop"]', 2);
```

---

## 🏃 Run Development Servers

### Option 1: Run Both (Recommended)

```bash
# From root directory
npm run dev
```

This will run both backend and frontend concurrently.

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🧪 Test Installation

### 1. Test Backend

```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri http://localhost:5000/health

# Mac/Linux (curl)
curl http://localhost:5000/health

# Expected response: {"status":"ok"}
```

### 2. Test Frontend

Open browser:
```
http://localhost:3000
```

Should redirect to:
```
http://localhost:3000/s/demo
```

### 3. Test Admin Page

```
http://localhost:3000/admin
```

---

## 🔧 Troubleshooting Commands

### Clear Cache & Reinstall

**Backend:**
```bash
cd backend
rm -rf node_modules package-lock.json  # Mac/Linux
# or
Remove-Item -Recurse -Force node_modules, package-lock.json  # Windows
npm install
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json  # Mac/Linux
# or
Remove-Item -Recurse -Force node_modules, package-lock.json  # Windows
npm install
```

### Check Port Usage

**Windows:**
```powershell
# Check port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Check port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### View Logs

**Backend:**
```bash
cd backend
npm run dev 2>&1 | tee backend.log
```

**Frontend:**
```bash
cd frontend
npm run dev 2>&1 | tee frontend.log
```

---

## 🚀 Build for Production

### Build Both

```bash
# From root
npm run build:all
```

### Build Separately

**Backend:**
```bash
cd backend
npm run build
```

**Frontend:**
```bash
cd frontend
npm run build
```

---

## 🌐 Deploy Commands

### Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Production deploy
vercel --prod
```

### Deploy to Railway (Backend)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
cd backend
railway init

# Deploy
railway up

# Set environment variables
railway variables set SUPABASE_URL=your_url
railway variables set SUPABASE_SERVICE_KEY=your_key
railway variables set NODE_ENV=production
```

---

## 📊 Useful Commands

### Check Versions

```bash
node --version
npm --version
git --version
```

### Update Dependencies

```bash
# Backend
cd backend
npm update

# Frontend
cd frontend
npm update
```

### Check for Outdated Packages

```bash
npm outdated
```

### Audit Security

```bash
npm audit
npm audit fix
```

---

## 🔄 Git Commands

### Initialize Git

```bash
git init
git add .
git commit -m "Initial commit"
```

### Push to GitHub

```bash
git remote add origin https://github.com/username/valentine-website.git
git branch -M main
git push -u origin main
```

### Update from Remote

```bash
git pull origin main
```

---

## 📝 Create New Surprise (SQL)

```sql
-- 1. Insert surprise
INSERT INTO surprises (code, recipient_name, message) 
VALUES ('your-code', 'Recipient Name', 'Your romantic message here')
RETURNING id;

-- 2. Insert gallery (replace surprise_id)
INSERT INTO gallery (surprise_id, image_url, caption) VALUES
('your-surprise-id', 'https://your-image-url.jpg', 'Caption 1'),
('your-surprise-id', 'https://your-image-url.jpg', 'Caption 2');

-- 3. Insert quiz (replace surprise_id)
INSERT INTO quiz_questions (surprise_id, question, options, answer_index) VALUES
('your-surprise-id', 'Question 1?', '["A", "B", "C", "D"]', 0),
('your-surprise-id', 'Question 2?', '["A", "B", "C", "D"]', 1);
```

---

## ✅ Verification Checklist

Run these commands to verify everything:

```bash
# 1. Check Node.js
node --version  # Should be 18+

# 2. Check npm
npm --version   # Should be 9+

# 3. Check backend dependencies
cd backend && npm list

# 4. Check frontend dependencies
cd frontend && npm list

# 5. Check .env files exist
ls backend/.env
ls frontend/.env

# 6. Test backend
curl http://localhost:5000/health

# 7. Test frontend
curl http://localhost:3000
```

---

**All commands ready to copy-paste! 🚀**
