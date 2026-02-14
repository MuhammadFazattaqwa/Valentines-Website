# ⭐ Bonus Features

## 🎯 Features yang Sudah Diimplementasikan

### ✅ 1. Admin Dashboard
**Lokasi:** `/admin`

**Fitur:**
- View semua surprises yang dibuat
- Lihat replies untuk setiap surprise
- Copy link surprise dengan 1 klik
- Statistics dashboard (total surprises, replies, created today)
- Real-time data dari Supabase

**Cara Akses:**
```
http://localhost:3000/admin
```

**Screenshot Flow:**
1. List semua surprises dengan info recipient & code
2. Klik surprise untuk lihat replies
3. Copy link untuk share
4. View stats di bottom

---

## 🚀 Features Tambahan yang Bisa Ditambahkan

### 2. Generate Link Surprise Unik

**Implementasi:**

1. **Buat API endpoint untuk generate surprise:**

```typescript
// backend/src/controllers/surpriseController.ts
export const createSurprise = async (req: Request, res: Response) => {
  try {
    const { recipient_name, message } = req.body;
    
    // Generate unique code
    const code = Math.random().toString(36).substring(2, 10);
    
    const { data, error } = await supabase
      .from('surprises')
      .insert([{ code, recipient_name, message }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json({
      ...data,
      link: `${process.env.FRONTEND_URL}/s/${code}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create surprise' });
  }
};
```

2. **Tambahkan route:**
```typescript
router.post('/surprise', createSurprise);
```

3. **Buat form di frontend:**
```tsx
// CreateSurprisePage.tsx
const CreateSurprisePage = () => {
  const [formData, setFormData] = useState({
    recipient_name: '',
    message: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/api/surprise', formData);
    alert(`Link created: ${response.data.link}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

---

### 3. Love Meter Animation

**Implementasi:**

```tsx
// components/LoveMeter.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoveMeter = () => {
  const [percentage, setPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(Math.floor(Math.random() * 20) + 80); // 80-100%
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h3 className="text-2xl font-bold text-center mb-4">
        Love Meter 💖
      </h3>
      
      <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-valentine-rose to-valentine-red"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>
      
      <motion.p
        className="text-center text-4xl font-bold text-valentine-rose mt-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        {percentage}%
      </motion.p>
      
      <p className="text-center text-gray-600 mt-2">
        {percentage >= 90 ? 'Perfect Match! 💕' : 'Great Chemistry! 💖'}
      </p>
    </div>
  );
};

export default LoveMeter;
```

**Tambahkan ke SurprisePage:**
```tsx
// Tambahkan step baru
{step === 5 && <LoveMeter onNext={() => setStep(6)} />}
```

---

### 4. Countdown Valentine

**Implementasi:**

```tsx
// components/ValentineCountdown.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ValentineCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const valentine = new Date(new Date().getFullYear(), 1, 14); // Feb 14
      if (valentine < new Date()) {
        valentine.setFullYear(valentine.getFullYear() + 1);
      }
      
      const difference = valentine.getTime() - new Date().getTime();
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 className="text-3xl font-bold text-gradient mb-6">
        Countdown to Valentine's Day 💖
      </h2>
      
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            className="bg-valentine-light rounded-lg p-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl font-bold text-valentine-rose">
              {value}
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {unit}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ValentineCountdown;
```

---

### 5. Background Particle Hearts

**Implementasi:**

```tsx
// components/ParticleHearts.tsx
import { useEffect, useRef } from 'react';

const ParticleHearts = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      emoji: string;
    }> = [];
    
    const emojis = ['💖', '💕', '💗', '💓', '💝'];
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.font = `${particle.size}px Arial`;
        ctx.fillText(particle.emoji, particle.x, particle.y);
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleHearts;
```

---

### 6. Email Notification untuk Replies

**Implementasi:**

1. **Install dependencies:**
```bash
cd backend
npm install nodemailer @types/nodemailer
```

2. **Setup email service:**
```typescript
// backend/src/services/emailService.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendReplyNotification = async (
  recipientEmail: string,
  senderName: string,
  message: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: '💌 You got a Valentine reply!',
    html: `
      <h2>Someone replied to your Valentine surprise! 💖</h2>
      <p><strong>From:</strong> ${senderName}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <br>
      <p>Check your admin dashboard for more details!</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};
```

3. **Update controller:**
```typescript
// backend/src/controllers/surpriseController.ts
import { sendReplyNotification } from '../services/emailService.js';

export const createReply = async (req: Request, res: Response) => {
  // ... existing code ...
  
  // Get surprise creator email
  const { data: surprise } = await supabase
    .from('surprises')
    .select('creator_email')
    .eq('id', surprise_id)
    .single();
  
  if (surprise?.creator_email) {
    await sendReplyNotification(
      surprise.creator_email,
      sender_name,
      message
    );
  }
  
  // ... rest of code ...
};
```

4. **Update database schema:**
```sql
ALTER TABLE surprises ADD COLUMN creator_email VARCHAR(255);
```

---

### 7. QR Code Generator

**Implementasi:**

```bash
npm install qrcode @types/qrcode
```

```tsx
// components/QRCodeGenerator.tsx
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  url: string;
}

const QRCodeGenerator = ({ url }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 256,
        color: {
          dark: '#FF1744',
          light: '#FFF0F5'
        }
      });
    }
  }, [url]);
  
  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Share via QR Code</h3>
      <canvas ref={canvasRef} className="mx-auto" />
      <p className="text-sm text-gray-600 mt-2">
        Scan to open surprise
      </p>
    </div>
  );
};

export default QRCodeGenerator;
```

---

## 📱 Mobile Optimization

Tambahkan meta tags di `index.html`:

```html
<meta name="theme-color" content="#FF69B4">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="/heart-icon.png">
```

---

## 🎨 Theme Customization

Buat theme switcher:

```tsx
// components/ThemeSelector.tsx
const themes = {
  classic: {
    pink: '#FFB6C1',
    rose: '#FF69B4',
    red: '#FF1744'
  },
  purple: {
    pink: '#E1BEE7',
    rose: '#9C27B0',
    red: '#6A1B9A'
  },
  blue: {
    pink: '#BBDEFB',
    rose: '#2196F3',
    red: '#1565C0'
  }
};

const ThemeSelector = () => {
  const [theme, setTheme] = useState('classic');
  
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([key, value]) => {
      root.style.setProperty(`--valentine-${key}`, value);
    });
  }, [theme]);
  
  return (
    <div className="flex gap-2">
      {Object.keys(themes).map(t => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-4 py-2 rounded ${
            theme === t ? 'bg-valentine-rose text-white' : 'bg-gray-200'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};
```

---

## 🔒 Authentication (Optional)

Untuk protect admin page:

```bash
npm install @supabase/auth-helpers-react
```

```tsx
// pages/AdminPage.tsx
import { useSession } from '@supabase/auth-helpers-react';

const AdminPage = () => {
  const session = useSession();
  
  if (!session) {
    return <LoginPage />;
  }
  
  // ... rest of admin page
};
```

---

**Pilih features yang kamu butuhkan dan implementasikan sesuai kebutuhan! 🚀**
