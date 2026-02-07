# 🛍️ E-Ticaret Sitesi

Modern ve kullanıcı dostu e-ticaret platformu. Next.js, React ve MongoDB ile geliştirilmiştir.

## ✨ Özellikler

### 📱 Müşteri Tarafı
- **Ürün Listeleme**: Tüm ürünleri kartlar halinde görüntüleme
- **Ürün Detay**: Detaylı ürün bilgileri ve görselleri
- **Alışveriş Sepeti**: Ürün ekleme, çıkarma ve miktar güncelleme
- **Ödeme Sistemi**: 2 farklı ödeme yöntemi
  - 🏦 Banka API ile kart ödemesi (Demo)
  - 💳 IBAN/Havale ile ödeme
- **Hakkımızda Sayfası**: Şirket bilgileri ve iletişim

### ⚙️ Admin Paneli
- Ürün ekleme, düzenleme ve silme
- Stok yönetimi
- Fiyat güncelleme
- Kategori yönetimi
- Basit kimlik doğrulama

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- MongoDB
- Yarn paket yöneticisi

### Adım 1: Projeyi İndirin
\`\`\`bash
# Projeyi klonlayın veya ZIP olarak indirin
cd /app
\`\`\`

### Adım 2: Bağımlılıkları Yükleyin
\`\`\`bash
yarn install
\`\`\`

### Adım 3: Ortam Değişkenlerini Ayarlayın
`.env` dosyası zaten yapılandırılmış durumda:
\`\`\`
MONGO_URL=mongodb://localhost:27017
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### Adım 4: Uygulamayı Başlatın
\`\`\`bash
# Development modunda
yarn dev

# Veya supervisor ile (önerilen)
sudo supervisorctl restart nextjs
\`\`\`

Uygulama şu adreste çalışacaktır: **http://localhost:3000**

## 📦 Teknoloji Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI kütüphanesi
- **Tailwind CSS** - Stil framework
- **shadcn/ui** - UI component kütüphanesi
- **Lucide React** - İkonlar

### Backend
- **Next.js API Routes** - Backend API
- **MongoDB** - Veritabanı
- **Node.js** - Runtime

## 📄 Sayfa Yapısı

```
/                    → Ana sayfa (Ürün listeleme)
/product/[id]        → Ürün detay sayfası
/cart                → Alışveriş sepeti
/checkout            → Ödeme sayfası
/about               → Hakkımızda
/admin               → Admin paneli (Giriş gerekli)
```

## 🔌 API Endpoint'leri

### Ürünler
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/:id` - Tek ürün detayı
- `POST /api/products` - Yeni ürün ekle (Admin)
- `PUT /api/products/:id` - Ürün güncelle (Admin)
- `DELETE /api/products/:id` - Ürün sil (Admin)

### Siparişler
- `GET /api/orders` - Tüm siparişleri listele
- `POST /api/orders` - Yeni sipariş oluştur

### Ödeme
- `POST /api/payment/bank` - Banka kartı ile ödeme (Mock)
- `POST /api/payment/transfer` - IBAN/Havale ile ödeme

### Admin
- `POST /api/admin/login` - Admin girişi

## 🔐 Admin Giriş Bilgileri

```
Kullanıcı Adı: admin
Şifre: admin123
```

## 🗄️ Veritabanı Yapısı

### Products Koleksiyonu
\`\`\`json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "price": "number",
  "image": "string (URL)",
  "stock": "number",
  "category": "string",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
\`\`\`

### Orders Koleksiyonu
\`\`\`json
{
  "id": "uuid",
  "items": [
    {
      "id": "uuid",
      "name": "string",
      "price": "number",
      "quantity": "number"
    }
  ],
  "totalAmount": "number",
  "customerInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "address": "string"
  },
  "paymentMethod": "bank | transfer",
  "status": "pending | paid | awaiting_transfer",
  "createdAt": "ISO date"
}
\`\`\`

## 🧪 Test

### API Testleri
\`\`\`bash
# Ürün ekleme
curl -X POST http://localhost:3000/api/products \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Test Ürün",
    "description": "Test açıklama",
    "price": 100,
    "stock": 10,
    "category": "Test"
  }'

# Ürünleri listeleme
curl http://localhost:3000/api/products

# Admin girişi
curl -X POST http://localhost:3000/api/admin/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin", "password": "admin123"}'
\`\`\`

## 💳 Ödeme Entegrasyonu

### Banka API Entegrasyonu
Gerçek banka API'si eklemek için:

1. `/app/app/api/[[...path]]/route.js` dosyasını açın
2. `POST /api/payment/bank` endpoint'ini bulun
3. Mock kodu yerine gerçek banka API çağrısını ekleyin:

\`\`\`javascript
// Gerçek banka API entegrasyonu örneği
const response = await fetch('https://bank-api.com/payment', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.BANK_API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: amount,
    cardNumber: cardInfo.number,
    // ... diğer parametreler
  })
});
\`\`\`

4. `.env` dosyasına API anahtarını ekleyin:
\`\`\`
BANK_API_KEY=your_api_key_here
\`\`\`

## 📁 Proje Yapısı

\`\`\`
/app/
├── app/
│   ├── api/[[...path]]/route.js    # Backend API
│   ├── page.js                      # Ana sayfa
│   ├── layout.js                    # Layout
│   ├── globals.css                  # Global stiller
│   ├── product/[id]/page.js         # Ürün detay
│   ├── cart/page.js                 # Sepet
│   ├── checkout/page.js             # Ödeme
│   ├── about/page.js                # Hakkımızda
│   └── admin/page.js                # Admin panel
├── components/
│   └── ui/                          # shadcn/ui componentleri
├── lib/
│   └── utils/                       # Yardımcı fonksiyonlar
├── .env                             # Ortam değişkenleri
├── package.json                     # Bağımlılıklar
├── tailwind.config.js               # Tailwind yapılandırması
└── README.md                        # Bu dosya
\`\`\`

## 🔧 Özelleştirme

### Renk Teması
`tailwind.config.js` dosyasından renk temasını özelleştirebilirsiniz.

### Admin Kimlik Bilgileri
`/app/app/api/[[...path]]/route.js` dosyasında admin bilgilerini değiştirebilirsiniz:
\`\`\`javascript
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
\`\`\`

### Ürün Görselleri
Ürün eklerken `image` alanına kendi görsel URL'nizi ekleyebilirsiniz.

## 📥 Projeyi İndirme

### Zip Olarak İndirme
\`\`\`bash
# Proje klasöründen
cd /app
tar -czf eticaret-sitesi.tar.gz --exclude=node_modules --exclude=.next .
\`\`\`

### Git ile Klonlama
Eğer projenizi Git'e push ettiyseniz:
\`\`\`bash
git clone [repository-url]
cd [project-name]
yarn install
\`\`\`

## 🚀 Deployment

### Vercel'e Deploy
\`\`\`bash
# Vercel CLI'yi yükleyin
npm i -g vercel

# Deploy edin
vercel
\`\`\`

### Docker ile Deploy
\`\`\`bash
# Dockerfile oluşturun ve build edin
docker build -t eticaret-sitesi .
docker run -p 3000:3000 eticaret-sitesi
\`\`\`

## 🐛 Sorun Giderme

### Port zaten kullanımda
\`\`\`bash
# Portu kullanımda olan process'i bulun
lsof -i :3000
# Kill edin
kill -9 [PID]
\`\`\`

### MongoDB bağlantı hatası
- MongoDB'nin çalıştığından emin olun
- `.env` dosyasındaki `MONGO_URL`'i kontrol edin

### Sayfa yüklenmiyor
\`\`\`bash
# Servisleri restart edin
sudo supervisorctl restart all

# Logları kontrol edin
tail -f /var/log/supervisor/nextjs.out.log
\`\`\`

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (\`git checkout -b feature/AmazingFeature\`)
3. Değişikliklerinizi commit edin (\`git commit -m 'Add some AmazingFeature'\`)
4. Branch'inizi push edin (\`git push origin feature/AmazingFeature\`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için: info@eticaretmagazam.com

---

**Not**: Bu bir demo projesidir. Gerçek bir e-ticaret sitesi için ek güvenlik önlemleri, ödeme entegrasyonları ve özellikler eklemeniz önerilir.
