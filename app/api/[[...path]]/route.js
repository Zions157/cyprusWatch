import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const uri = process.env.MONGO_URL;
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

// Admin credentials (basit auth)
const ADMIN_USERNAME = 'admin123';
const ADMIN_PASSWORD = 'Zion157359_-_.?';

// Helper: Get DB
async function getDB() {
  const client = await connectToDatabase();
  return client.db('ecommerce');
}

// GET handler
export async function GET(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    const db = await getDB();

    // GET /api/products - Tüm ürünleri listele
    if (path === 'products' || path === 'products/') {
      const products = await db.collection('products').find({}).toArray();
      return NextResponse.json(products);
    }

    // GET /api/products/:id - Tek ürün detayı
    if (path.startsWith('products/') && path.split('/').length === 2) {
      const id = path.split('/')[1];
      const product = await db.collection('products').findOne({ id });
      if (!product) {
        return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    // GET /api/orders - Tüm siparişleri listele
    if (path === 'orders' || path === 'orders/') {
      const orders = await db.collection('orders').find({}).toArray();
      return NextResponse.json(orders);
    }

    return NextResponse.json({ error: 'Endpoint bulunamadı' }, { status: 404 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST handler
export async function POST(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    // POST /api/upload - Dosya yükleme (FormData kullanır, JSON değil)
    if (path === 'upload' || path === 'upload/') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
          return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
        }

        // Dosya uzantısını kontrol et
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json({ error: 'Sadece resim dosyaları yüklenebilir (jpg, png, webp, gif)' }, { status: 400 });
        }

        // Dosya boyutunu kontrol et (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan küçük olmalıdır' }, { status: 400 });
        }

        // Benzersiz dosya adı oluştur
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = join(process.cwd(), 'public', 'uploads', fileName);

        // Dosyayı kaydet
        await writeFile(filePath, buffer);

        // URL'i döndür
        const fileUrl = `/uploads/${fileName}`;
        return NextResponse.json({ url: fileUrl, success: true });
      } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Dosya yüklenirken hata oluştu: ' + error.message }, { status: 500 });
      }
    }

    const db = await getDB();
    const body = await request.json();

    // POST /api/admin/login - Admin girişi
    if (path === 'login/login') {
      const { username, password } = body;
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return NextResponse.json({ success: true, message: 'Giriş başarılı' });
      }
      return NextResponse.json({ error: 'Kullanıcı adı veya şifre hatalı' }, { status: 401 });
    }

    // POST /api/products - Yeni ürün ekle
    if (path === 'products' || path === 'products/') {
      const product = {
        id: uuidv4(),
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        image: body.image || 'https://via.placeholder.com/400x300?text=Ürün+Görseli',
        stock: parseInt(body.stock) || 100,
        category: body.category || 'Genel',
        productType: body.productType || 'watch', // 'watch' veya 'eyewear'
        createdAt: new Date().toISOString()
      };
      await db.collection('products').insertOne(product);
      return NextResponse.json(product);
    }

    // POST /api/orders - Sipariş oluştur
    if (path === 'orders' || path === 'orders/') {
      const order = {
        id: uuidv4(),
        items: body.items,
        totalAmount: parseFloat(body.totalAmount),
        customerInfo: body.customerInfo,
        paymentMethod: body.paymentMethod,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      await db.collection('orders').insertOne(order);
      return NextResponse.json(order);
    }

    // POST /api/payment/bank - Mock banka ödemesi
    if (path === 'payment/bank') {
      // Gerçek banka API'si buraya entegre edilecek
      // Şimdilik mock response
      const { orderId, amount, cardInfo } = body;

      // Simüle edilmiş ödeme işlemi
      const success = Math.random() > 0.2; // %80 başarı oranı

      if (success) {
        // Sipariş durumunu güncelle
        await db.collection('orders').updateOne(
          { id: orderId },
          { $set: { status: 'paid', paidAt: new Date().toISOString() } }
        );

        return NextResponse.json({
          success: true,
          transactionId: uuidv4(),
          message: 'Ödeme başarılı! (Demo)'
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Ödeme reddedildi (Demo)'
        }, { status: 400 });
      }
    }

    // POST /api/payment/transfer - IBAN/Havale ödemesi
    if (path === 'payment/transfer') {
      const { orderId } = body;

      // Havale bekliyor durumuna al
      await db.collection('orders').updateOne(
        { id: orderId },
        { $set: { status: 'awaiting_transfer', requestedAt: new Date().toISOString() } }
      );

      return NextResponse.json({
        success: true,
        iban: 'TR33 0006 1005 1978 6457 8413 26',
        accountName: 'E-Ticaret Şirketi A.Ş.',
        message: 'Havale bilgileri gönderildi. Ödeme onayı bekleniyor.'
      });
    }

    return NextResponse.json({ error: 'Endpoint bulunamadı' }, { status: 404 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT handler
export async function PUT(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    const db = await getDB();
    const body = await request.json();

    // PUT /api/products/:id - Ürün güncelle
    if (path.startsWith('products/') && path.split('/').length === 2) {
      const id = path.split('/')[1];
      const updateData = {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        image: body.image,
        stock: parseInt(body.stock),
        category: body.category,
        productType: body.productType || 'watch',
        updatedAt: new Date().toISOString()
      };

      const result = await db.collection('products').updateOne(
        { id },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Ürün güncellendi' });
    }

    return NextResponse.json({ error: 'Endpoint bulunamadı' }, { status: 404 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  try {
    const db = await getDB();

    // DELETE /api/products/:id - Ürün sil
    if (path.startsWith('products/') && path.split('/').length === 2) {
      const id = path.split('/')[1];
      const result = await db.collection('products').deleteOne({ id });

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Ürün silindi' });
    }

    return NextResponse.json({ error: 'Endpoint bulunamadı' }, { status: 404 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}