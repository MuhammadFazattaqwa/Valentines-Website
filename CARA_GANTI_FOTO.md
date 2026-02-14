# 📸 Cara Mengganti Foto Gallery

## 🎯 Cara 1: Upload ke Supabase Storage (Recommended)

### Step 1: Upload Foto ke Supabase

1. **Buka Supabase Dashboard:** https://supabase.com
2. **Pilih project:** valentine-website
3. **Klik "Storage"** (sidebar kiri)
4. **Klik bucket:** `valentine-gallery`
5. **Klik "Upload file"**
6. **Pilih foto-foto Anda** (bisa multiple)
7. **Tunggu upload selesai**

### Step 2: Copy URL Foto

Untuk setiap foto yang diupload:
1. **Klik foto** di list
2. **Klik "Copy URL"** atau klik kanan > Copy URL
3. **Save URL** di notepad

URL akan seperti:
```
https://hegichngbykjrxfpoifn.supabase.co/storage/v1/object/public/valentine-gallery/foto1.jpg
```

### Step 3: Update Database

1. **Buka "SQL Editor"** di Supabase
2. **Hapus foto lama:**
```sql
DELETE FROM gallery WHERE surprise_id = (SELECT id FROM surprises WHERE code = 'demo');
```

3. **Insert foto baru:**
```sql
INSERT INTO gallery (surprise_id, image_url, caption) VALUES
((SELECT id FROM surprises WHERE code = 'demo'), 'URL_FOTO_1', 'Caption foto 1 💕'),
((SELECT id FROM surprises WHERE code = 'demo'), 'URL_FOTO_2', 'Caption foto 2 🌹'),
((SELECT id FROM surprises WHERE code = 'demo'), 'URL_FOTO_3', 'Caption foto 3 💖');
```

4. **Ganti `URL_FOTO_1`, `URL_FOTO_2`, dll** dengan URL yang Anda copy
5. **Klik "Run"**

---

## 🎯 Cara 2: Pakai URL Foto dari Internet

### Step 1: Upload Foto ke Image Hosting

Upload foto Anda ke salah satu:
- **Imgur:** https://imgur.com (gratis, mudah)
- **ImgBB:** https://imgbb.com (gratis)
- **Cloudinary:** https://cloudinary.com (gratis tier)
- **Google Drive:** (set public, copy direct link)

### Step 2: Copy Direct Image URL

Pastikan URL adalah **direct link** ke gambar, contoh:
```
✅ https://i.imgur.com/abc123.jpg
✅ https://i.ibb.co/xyz789/photo.png
❌ https://imgur.com/gallery/abc123 (ini bukan direct link)
```

### Step 3: Update Database

Sama seperti Cara 1 Step 3.

---

## 🎯 Cara 3: Edit via Supabase Table Editor (Paling Mudah)

### Step 1: Upload Foto (Cara 1 atau 2)

### Step 2: Edit di Table Editor

1. **Buka Supabase Dashboard**
2. **Klik "Table Editor"**
3. **Pilih tabel:** `gallery`
4. **Klik row yang mau diedit**
5. **Edit kolom `image_url`** dengan URL foto baru
6. **Edit kolom `caption`** dengan caption baru
7. **Klik "Save"**

Atau **tambah foto baru:**
1. **Klik "Insert row"**
2. **Isi:**
   - `surprise_id`: Copy dari row lain (atau dari tabel surprises)
   - `image_url`: URL foto Anda
   - `caption`: Caption foto
3. **Klik "Save"**

---

## 📝 Contoh Lengkap

### Upload ke Supabase Storage:

```sql
-- 1. Hapus foto lama
DELETE FROM gallery WHERE surprise_id = (SELECT id FROM surprises WHERE code = 'demo');

-- 2. Insert foto baru (ganti URL dengan URL Anda)
INSERT INTO gallery (surprise_id, image_url, caption) VALUES
((SELECT id FROM surprises WHERE code = 'demo'), 
 'https://hegichngbykjrxfpoifn.supabase.co/storage/v1/object/public/valentine-gallery/foto-kita-1.jpg', 
 'Kenangan pertama kita 💕'),
 
((SELECT id FROM surprises WHERE code = 'demo'), 
 'https://hegichngbykjrxfpoifn.supabase.co/storage/v1/object/public/valentine-gallery/foto-kita-2.jpg', 
 'Momen spesial 🌹'),
 
((SELECT id FROM surprises WHERE code = 'demo'), 
 'https://hegichngbykjrxfpoifn.supabase.co/storage/v1/object/public/valentine-gallery/foto-kita-3.jpg', 
 'Selalu bersamamu 💖');
```

### Pakai Imgur:

```sql
DELETE FROM gallery WHERE surprise_id = (SELECT id FROM surprises WHERE code = 'demo');

INSERT INTO gallery (surprise_id, image_url, caption) VALUES
((SELECT id FROM surprises WHERE code = 'demo'), 'https://i.imgur.com/abc123.jpg', 'Foto 1 💕'),
((SELECT id FROM surprises WHERE code = 'demo'), 'https://i.imgur.com/def456.jpg', 'Foto 2 🌹'),
((SELECT id FROM surprises WHERE code = 'demo'), 'https://i.imgur.com/ghi789.jpg', 'Foto 3 💖');
```

---

## 🎨 Tips Foto

### Ukuran Foto:
- **Recommended:** 800x800px atau 1200x1200px
- **Max:** 5MB per foto
- **Format:** JPG, PNG, WebP

### Compress Foto (Agar Loading Cepat):
- **TinyPNG:** https://tinypng.com
- **Squoosh:** https://squoosh.app
- **Compress JPEG:** https://compressjpeg.com

### Jumlah Foto:
- **Minimum:** 3 foto
- **Recommended:** 6-9 foto
- **Maximum:** Unlimited (tapi loading jadi lambat)

---

## 🔄 Update Foto Tanpa Hapus Lama

Jika mau **tambah foto** tanpa hapus yang lama:

```sql
-- Tambah foto baru saja
INSERT INTO gallery (surprise_id, image_url, caption) VALUES
((SELECT id FROM surprises WHERE code = 'demo'), 'URL_FOTO_BARU', 'Caption baru 💕');
```

---

## ✅ Verification

Setelah update foto:

1. **Refresh website:** http://localhost:3000/s/demo
2. **Klik "Buka Kejutan"** sampai ke Gallery page
3. **Foto baru harus muncul**
4. **Klik foto** untuk preview modal

---

## 🐛 Troubleshooting

### Foto tidak muncul?

**Check:**
1. ✅ URL foto benar (copy-paste ke browser, harus bisa dibuka)
2. ✅ Bucket `valentine-gallery` di-set **public**
3. ✅ URL adalah **direct link** ke gambar
4. ✅ Format foto: JPG, PNG, WebP (bukan PDF, HEIC, dll)

### Foto muncul tapi broken?

**Fix:**
1. Check URL di database (Table Editor > gallery)
2. Buka URL di browser baru
3. Jika error 403/404, re-upload foto
4. Pastikan bucket public

### Foto terlalu besar/lambat?

**Compress:**
1. Upload ke TinyPNG.com
2. Download hasil compress
3. Re-upload ke Supabase

---

## 📱 Untuk Surprise Baru

Jika mau buat surprise baru dengan foto sendiri:

```sql
-- 1. Buat surprise baru
INSERT INTO surprises (code, recipient_name, message) 
VALUES ('untuk-sayang', 'Nama Dia', 'Pesan romantis...')
RETURNING id;

-- 2. Copy ID yang muncul, lalu insert foto
INSERT INTO gallery (surprise_id, image_url, caption) VALUES
('PASTE_ID_DISINI', 'URL_FOTO_1', 'Caption 1'),
('PASTE_ID_DISINI', 'URL_FOTO_2', 'Caption 2');
```

---

**Sekarang foto Anda sudah bisa muncul di gallery! 📸💖**
