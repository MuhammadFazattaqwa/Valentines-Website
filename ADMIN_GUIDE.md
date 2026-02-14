# 🎯 Admin Page - Panduan Lengkap

## ✅ Fitur Baru Admin Page

Sekarang Anda bisa **edit semua konten** langsung dari browser tanpa perlu SQL!

### 📸 **Gallery Management**
- ✅ Tambah foto baru
- ✅ Hapus foto
- ✅ Lihat semua foto

### 🎯 **Quiz Management**
- ✅ Tambah pertanyaan baru
- ✅ Hapus pertanyaan
- ✅ Lihat semua quiz dengan jawaban

### 💌 **Replies**
- ✅ Lihat semua balasan
- ✅ Filter per surprise

---

## 🚀 Cara Menggunakan

### 1. Buka Admin Page

```
http://localhost:3000/admin
```

### 2. Pilih Surprise

Klik salah satu surprise di panel kiri untuk mengelola kontennya.

### 3. Pilih Tab

- **💌 Replies** - Lihat pesan balasan
- **📸 Gallery** - Kelola foto
- **🎯 Quiz** - Kelola pertanyaan

---

## 📸 Mengelola Foto

### Tambah Foto Baru

1. Klik tab **"📸 Gallery"**
2. Klik tombol **"+ Add Photo"**
3. Masukkan **URL foto** (dari Supabase Storage atau Imgur)
4. Masukkan **caption**
5. Foto langsung muncul!

### Hapus Foto

1. Hover mouse di atas foto
2. Klik tombol **"🗑️ Delete"**
3. Konfirmasi
4. Foto terhapus!

### Upload Foto ke Supabase

**Cara dapat URL foto:**

1. Buka Supabase Dashboard
2. Storage > valentine-gallery
3. Upload file
4. Klik foto > Copy URL
5. Paste URL di admin page

**Atau pakai Imgur:**

1. Upload ke https://imgur.com
2. Klik kanan foto > Copy image address
3. Paste URL di admin page

---

## 🎯 Mengelola Quiz

### Tambah Pertanyaan

1. Klik tab **"🎯 Quiz"**
2. Klik **"+ Add Question"**
3. Masukkan:
   - **Pertanyaan:** "Apa warna favorit aku?"
   - **Opsi A:** "Merah"
   - **Opsi B:** "Biru"
   - **Opsi C:** "Pink"
   - **Opsi D:** "Hijau"
   - **Jawaban:** 2 (untuk opsi C)
4. Pertanyaan langsung muncul!

### Hapus Pertanyaan

1. Klik tombol **🗑️** di kanan atas pertanyaan
2. Konfirmasi
3. Pertanyaan terhapus!

### Lihat Jawaban

Jawaban benar ditandai dengan:
- ✅ Background hijau
- ✓ Tanda centang

---

## 💡 Tips & Tricks

### URL Foto yang Valid

✅ **Good:**
```
https://hegichngbykjrxfpoifn.supabase.co/storage/v1/object/public/valentine-gallery/foto.jpg
https://i.imgur.com/abc123.jpg
https://i.ibb.co/xyz789/photo.png
```

❌ **Bad:**
```
https://imgur.com/gallery/abc123 (bukan direct link)
C:\Users\foto.jpg (local path)
```

### Format Quiz Answer

- **0** = Opsi A
- **1** = Opsi B
- **2** = Opsi C
- **3** = Opsi D

### Jumlah Ideal

- **Foto:** 6-9 foto
- **Quiz:** 5-10 pertanyaan

---

## 🔄 Workflow Lengkap

### Membuat Surprise Baru

1. **Buat surprise di Supabase:**
   ```sql
   INSERT INTO surprises (code, recipient_name, message) 
   VALUES ('untuk-dia', 'Nama Dia', 'Pesan romantis...');
   ```

2. **Buka admin page:** http://localhost:3000/admin

3. **Pilih surprise baru** di panel kiri

4. **Tambah foto:**
   - Tab Gallery > + Add Photo
   - Masukkan URL & caption
   - Ulangi untuk semua foto

5. **Tambah quiz:**
   - Tab Quiz > + Add Question
   - Masukkan pertanyaan & opsi
   - Ulangi untuk semua pertanyaan

6. **Share link:**
   - Klik "Copy Link"
   - Kirim ke orang spesial!

---

## 🎨 Contoh Lengkap

### Contoh Foto

**URL Foto 1:**
```
https://hegichngbykjrxfpoifn.supabase.co/storage/v1/object/public/valentine-gallery/foto1.jpg
```
**Caption:**
```
Kenangan pertama kita 💕
```

**URL Foto 2:**
```
https://i.imgur.com/abc123.jpg
```
**Caption:**
```
Momen spesial bersama 🌹
```

### Contoh Quiz

**Pertanyaan:**
```
Apa makanan favorit kita berdua?
```

**Opsi:**
- A: Pizza
- B: Sushi
- C: Pasta
- D: Burger

**Jawaban:** 0 (Pizza)

---

## 🐛 Troubleshooting

### Foto tidak muncul?

**Check:**
1. URL foto valid (buka di browser baru)
2. Bucket valentine-gallery public
3. Format: JPG, PNG, WebP

### Quiz tidak tersimpan?

**Check:**
1. Semua field diisi
2. Answer index: 0-3
3. Refresh page

### Button tidak berfungsi?

**Fix:**
1. Refresh page
2. Check console (F12)
3. Pastikan backend running

---

## ✅ Keuntungan Admin Page

### Sebelum (Manual SQL):
```sql
DELETE FROM gallery WHERE id = 'xxx';
INSERT INTO gallery (surprise_id, image_url, caption) 
VALUES ('yyy', 'url', 'caption');
```

### Sekarang (Admin Page):
1. Klik Delete
2. Klik Add Photo
3. Masukkan URL & caption
4. Done! ✨

**Jauh lebih mudah dan cepat!** 🚀

---

## 📱 Mobile Friendly

Admin page juga responsive! Bisa diakses dari:
- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

---

**Sekarang Anda bisa manage semua konten dengan mudah! 🎉💖**
