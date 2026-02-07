# 🚀 E-Ticaret Sitesi - Hızlı Kurulum Rehberi

## 📋 Gereksinimler

Sisteminizde aşağıdakilerin kurulu olması gerekiyor:
- **Node.js** (v18 veya üzeri) → [İndir](https://nodejs.org/)
- **MongoDB** → [İndir](https://www.mongodb.com/try/download/community)
- **Yarn** → Kurulum: `npm install -g yarn`

## ⚡ 3 Adımda Kurulum

### 1️⃣ Projeyi Çıkartın
```bash
# ZIP veya tar.gz dosyasını çıkartın
tar -xzf eticaret-sitesi.tar.gz
cd app
```

### 2️⃣ Bağımlılıkları Yükleyin
```bash
yarn install
```
⏱️ Bu işlem 2-3 dakika sürebilir.

### 3️⃣ MongoDB'yi Başlatın ve Uygulamayı Çalıştırın

#### Windows:
```bash
# MongoDB'yi başlatın (ayrı terminal)
mongod

# Uygulamayı başlatın
yarn dev
```

#### Mac/Linux:
```bash
# MongoDB'yi başlatın (ayrı terminal)
mongod

# Uygulamayı başlatın
yarn dev
```

### ✅ Tamamlandı!

Tarayıcınızda şu adresi açın: **http://localhost:3000**

---

## 🎯 İlk Adımlar

### 1. Admin Paneline Giriş
- Sağ üstteki **Admin** butonuna tıklayın
- **Kullanıcı Adı**: `admin`
- **Şifre**: `admin123`

### 2. Ürün Ekleyin
- Admin panelinde **Yeni Ürün Ekle** butonuna tıklayın
- Ürün bilgilerini doldurun
- Görsel için URL kullanabilirsiniz (örn: Unsplash)

### 3. Test Edin
- Ana sayfada ürünleri görün
- Sepete ekleyin
- Ödeme işlemini test edin

---

## 🔧 Ayarlar

### Ortam Değişkenleri (.env)
```env
MONGO_URL=mongodb://localhost:27017
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Port Değiştirme
`package.json` dosyasında `--port 3000` kısmını değiştirin.

---

## 💳 Ödeme Entegrasyonu

Gerçek banka API'si eklemek için:

1. `/app/api/[[...path]]/route.js` dosyasını açın
2. `POST /api/payment/bank` fonksiyonunu bulun
3. Mock kodunu gerçek API çağrısıyla değiştirin
4. API anahtarınızı `.env` dosyasına ekleyin

---

## 📱 Özellikler

✅ Ürün listeleme ve detay sayfaları
✅ Alışveriş sepeti
✅ 2 farklı ödeme yöntemi (Kart + Havale)
✅ Admin paneli (CRUD işlemleri)
✅ Responsive tasarım
✅ Modern UI (Tailwind + shadcn/ui)

---

## 🐛 Sorun Giderme

### MongoDB bağlanamıyor
```bash
# MongoDB'nin çalıştığını kontrol edin
mongo --eval "db.stats()"
```

### Port zaten kullanımda
```bash
# Farklı port kullanın veya mevcut process'i kill edin
lsof -i :3000
kill -9 [PID]
```

### Sayfalar yüklenmiyor
```bash
# node_modules ve .next klasörlerini silin, tekrar yükleyin
rm -rf node_modules .next
yarn install
yarn dev
```

---

## 📞 Destek

Sorularınız için:
- README.md dosyasına bakın
- API dokümantasyonunu inceleyin
- MongoDB loglarını kontrol edin

---

## 🎉 Başarılar!

Artık kendi e-ticaret siteniz hazır! Özelleştirin ve geliştirin.

**Önemli Not**: Bu bir demo projesidir. Production için:
- Gerçek authentication ekleyin (JWT, OAuth)
- HTTPS kullanın
- Güvenlik önlemleri alın
- Rate limiting ekleyin
- Loglama sistemi kurun
