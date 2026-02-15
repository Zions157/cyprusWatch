import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL = process.env.SENDER_EMAIL;

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

// Helper: Verify JWT Token
function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Helper: Generate Invoice HTML
function generateInvoiceHTML(order, user) {
  const totalAmount = order.totalAmount || 0;
  const itemsHTML = order.items.map(item => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left;">${item.name}</td>
      <td style="padding: 12px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right;">${item.price?.toFixed(2) || '0.00'} ₺</td>
      <td style="padding: 12px; text-align: right; font-weight: bold;">${((item.price || 0) * (item.quantity || 0)).toFixed(2)} ₺</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 650px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%); color: #000; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
        .invoice-details { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: bold; }
        .total { background: #fef3c7; padding: 15px; text-align: right; font-size: 18px; font-weight: bold; border-radius: 8px; margin-top: 20px; }
        .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 32px;">🕐 Cyprus Watch</h1>
          <p style="margin: 5px 0 0 0;">Lüks Saat ve Gözlük</p>
        </div>
        
        <div class="content">
          <h2 style="color: #f59e0b; margin-top: 0;">Fatura</h2>
          
          <div class="invoice-details">
            <p><strong>Sipariş No:</strong> ${order.id}</p>
            <p><strong>Tarih:</strong> ${new Date(order.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            <p><strong>Müşteri:</strong> ${order.customerInfo?.fullName || user?.fullName || 'N/A'}</p>
            <p><strong>E-posta:</strong> ${order.customerInfo?.email || user?.email || 'N/A'}</p>
            <p><strong>Telefon:</strong> ${order.customerInfo?.phone || user?.phone || 'N/A'}</p>
            <p><strong>Adres:</strong> ${order.customerInfo?.address || user?.address || 'N/A'}</p>
            <p><strong>Ödeme Yöntemi:</strong> ${order.paymentMethod === 'bank' ? 'Kredi/Banka Kartı' : 'IBAN/Havale'}</p>
            <p><strong>Durum:</strong> ${order.status === 'paid' ? '✅ Ödendi' : order.status === 'awaiting_transfer' ? '⏳ Havale Bekleniyor' : '📦 Beklemede'}</p>
          </div>

          <h3>Sipariş Detayları</h3>
          <table>
            <thead>
              <tr style="background: #f3f4f6;">
                <th>Ürün</th>
                <th style="text-align: center;">Adet</th>
                <th style="text-align: right;">Birim Fiyat</th>
                <th style="text-align: right;">Toplam</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>

          <div class="total">
            Toplam Tutar: ${totalAmount.toFixed(2)} ₺
          </div>

          ${order.paymentMethod === 'transfer' ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #f59e0b;">
              <h4 style="margin-top: 0; color: #92400e;">Havale Bilgileri</h4>
              <p><strong>IBAN:</strong> TR33 0006 1005 1978 6457 8413 26</p>
              <p><strong>Hesap Adı:</strong> E-Ticaret Şirketi A.Ş.</p>
              <p><strong>Banka:</strong> Ziraat Bankası</p>
              <p style="font-size: 12px; color: #92400e; margin-bottom: 0;">⚠️ Lütfen açıklama kısmına sipariş numaranızı yazınız: <strong>${order.id}</strong></p>
            </div>
          ` : ''}
        </div>

        <div class="footer">
          <p><strong>Cyprus Watch</strong> | info@cypruswatch.com | +90 533 123 4123</p>
          <p>Kıbrıs, Lefkoşa | www.cypruswatch.com</p>
          <p style="margin-top: 10px;">Teşekkür ederiz! 🎉</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper: Send Invoice Email
async function sendInvoiceEmail(order, user) {
  try {
    const invoiceHTML = generateInvoiceHTML(order, user);
    const recipientEmail = order.customerInfo?.email || user?.email;
    
    if (!recipientEmail) {
      console.error('No recipient email found for order:', order.id);
      return { success: false, error: 'No recipient email' };
    }

    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [recipientEmail],
      subject: `🎉 Cyprus Watch - Siparişiniz Alındı! (${order.id})`,
      html: invoiceHTML,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, emailId: data.id };
  } catch (error) {
    console.error('Failed to send invoice email:', error);
    return { success: false, error: error.message };
  }
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

    // GET /api/auth/me - Kullanıcı bilgilerini getir (JWT gerekli)
    if (path === 'auth/me') {
      const userData = verifyToken(request);
      if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const user = await db.collection('users').findOne({ id: userData.userId });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    // GET /api/favorites - Favori ürünleri getir (JWT gerekli)
    if (path === 'favorites' || path === 'favorites/') {
      const userData = verifyToken(request);
      if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const user = await db.collection('users').findOne({ id: userData.userId });
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      // Favori ürünlerin detaylarını çek
      const favoriteIds = user.favoriteProducts || [];
      const favoriteProducts = await db.collection('products')
        .find({ id: { $in: favoriteIds } })
        .toArray();
      
      return NextResponse.json(favoriteProducts);
    }

    // GET /api/orders/my - Kullanıcının siparişleri (JWT gerekli)
    if (path === 'orders/my') {
      const userData = verifyToken(request);
      if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const orders = await db.collection('orders')
        .find({ userId: userData.userId })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json(orders);
    }

    // GET /api/admin/orders - Tüm siparişler (Admin için)
    if (path === 'admin/orders') {
      const orders = await db.collection('orders')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json(orders);
    }

    // GET /api/users - Tüm kullanıcıları listele (Admin)
    if (path === 'users' || path === 'users/') {
      const users = await db.collection('users')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      // Şifreleri kaldır
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      return NextResponse.json(usersWithoutPasswords);
    }

    // GET /api/users/:id - Kullanıcı detayı (Admin)
    if (path.startsWith('users/') && path.split('/').length === 2) {
      const id = path.split('/')[1];
      const user = await db.collection('users').findOne({ id });
      if (!user) {
        return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
      }
      const { password, ...userWithoutPassword } = user;
      
      // Kullanıcının siparişlerini de getir
      const userOrders = await db.collection('orders')
        .find({ userId: id })
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json({
        ...userWithoutPassword,
        orders: userOrders
      });
    }

    // GET /api/reviews/:productId - Ürün değerlendirmelerini getir
    if (path.startsWith('reviews/') && path.split('/').length === 2) {
      const productId = path.split('/')[1];
      const product = await db.collection('products').findOne({ id: productId });
      if (!product) {
        return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
      }
      return NextResponse.json(product.reviews || []);
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

    // POST /api/auth/register - Kullanıcı kaydı
    if (path === 'auth/register') {
      const { email, password, fullName, phone, address } = body;

      // Email kontrolü
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'Bu email zaten kayıtlı' }, { status: 400 });
      }

      // Password hash
      const hashedPassword = await bcrypt.hash(password, 10);

      // Yeni kullanıcı
      const newUser = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        fullName,
        phone: phone || '',
        address: address || '',
        favoriteProducts: [],
        createdAt: new Date().toISOString()
      };

      await db.collection('users').insertOne(newUser);

      // JWT token oluştur
      const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '30d' });

      const { password: _, ...userWithoutPassword } = newUser;
      return NextResponse.json({ success: true, token, user: userWithoutPassword });
    }

    // POST /api/auth/login - Kullanıcı girişi
    if (path === 'auth/login') {
      const { email, password } = body;

      const user = await db.collection('users').findOne({ email });
      if (!user) {
        return NextResponse.json({ error: 'Email veya şifre hatalı' }, { status: 401 });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json({ error: 'Email veya şifre hatalı' }, { status: 401 });
      }

      // JWT token oluştur
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({ success: true, token, user: userWithoutPassword });
    }

    // POST /api/login/login - Admin girişi
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
        productType: body.productType || 'watch', // 'watch', 'eyewear', 'eta'
        gender: body.gender || 'unisex', // 'male', 'female', 'unisex'
        brand: body.brand || '',
        specs: {
          glassType: body.specs?.glassType || '',
          machineType: body.specs?.machineType || '',
          dialColor: body.specs?.dialColor || '',
          strapType: body.specs?.strapType || '',
          caseSize: body.specs?.caseSize || '',
          caseMaterial: body.specs?.caseMaterial || '',
          functions: body.specs?.functions || '',
          calendar: body.specs?.calendar || '',
          features: body.specs?.features || '',
          warranty: body.specs?.warranty || ''
        },
        reviews: [],
        createdAt: new Date().toISOString()
      };
      await db.collection('products').insertOne(product);
      return NextResponse.json(product);
    }

    // POST /api/orders - Sipariş oluştur
    if (path === 'orders' || path === 'orders/') {
      const userData = verifyToken(request);
      const userId = userData ? userData.userId : null;

      const order = {
        id: uuidv4(),
        userId: userId,
        items: body.items,
        totalAmount: parseFloat(body.totalAmount),
        customerInfo: body.customerInfo,
        paymentMethod: body.paymentMethod,
        status: 'pending',
        emailSent: false,
        createdAt: new Date().toISOString()
      };
      await db.collection('orders').insertOne(order);
      return NextResponse.json(order);
    }

    // POST /api/payment/bank - Mock banka ödemesi
    if (path === 'payment/bank') {
      const { orderId, amount, cardInfo } = body;

      // Simüle edilmiş ödeme işlemi
      const success = Math.random() > 0.2; // %80 başarı oranı

      if (success) {
        // Sipariş durumunu güncelle
        const order = await db.collection('orders').findOne({ id: orderId });
        await db.collection('orders').updateOne(
          { id: orderId },
          { $set: { status: 'paid', paidAt: new Date().toISOString() } }
        );

        // Fatura emaili gönder
        const updatedOrder = await db.collection('orders').findOne({ id: orderId });
        let user = null;
        if (updatedOrder.userId) {
          user = await db.collection('users').findOne({ id: updatedOrder.userId });
        }
        
        const emailResult = await sendInvoiceEmail(updatedOrder, user);
        if (emailResult.success) {
          await db.collection('orders').updateOne(
            { id: orderId },
            { $set: { emailSent: true, invoiceEmailId: emailResult.emailId } }
          );
        }

        return NextResponse.json({
          success: true,
          transactionId: uuidv4(),
          message: 'Ödeme başarılı! Fatura email adresinize gönderildi.'
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
      const order = await db.collection('orders').findOne({ id: orderId });
      await db.collection('orders').updateOne(
        { id: orderId },
        { $set: { status: 'awaiting_transfer', requestedAt: new Date().toISOString() } }
      );

      // Fatura emaili gönder
      const updatedOrder = await db.collection('orders').findOne({ id: orderId });
      let user = null;
      if (updatedOrder.userId) {
        user = await db.collection('users').findOne({ id: updatedOrder.userId });
      }
      
      const emailResult = await sendInvoiceEmail(updatedOrder, user);
      if (emailResult.success) {
        await db.collection('orders').updateOne(
          { id: orderId },
          { $set: { emailSent: true, invoiceEmailId: emailResult.emailId } }
        );
      }

      return NextResponse.json({
        success: true,
        iban: 'TR33 0006 1005 1978 6457 8413 26',
        accountName: 'E-Ticaret Şirketi A.Ş.',
        message: 'Havale bilgileri email adresinize gönderildi.'
      });
    }

    // POST /api/favorites/add - Favorilere ekle (JWT gerekli)
    if (path === 'favorites/add') {
      const userData = verifyToken(request);
      if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { productId } = body;
      await db.collection('users').updateOne(
        { id: userData.userId },
        { $addToSet: { favoriteProducts: productId } }
      );

      return NextResponse.json({ success: true, message: 'Favorilere eklendi' });
    }

    // POST /api/reviews/:productId - Değerlendirme ekle
    if (path.startsWith('reviews/') && path.split('/').length === 2) {
      const productId = path.split('/')[1];
      const userData = verifyToken(request);
      
      if (!userData) {
        return NextResponse.json({ error: 'Değerlendirme yapmak için giriş yapmalısınız' }, { status: 401 });
      }

      const { rating, comment } = body;
      
      if (!rating || rating < 1 || rating > 5) {
        return NextResponse.json({ error: 'Geçersiz puan (1-5 arası)' }, { status: 400 });
      }

      const user = await db.collection('users').findOne({ id: userData.userId });
      
      const review = {
        id: uuidv4(),
        userId: userData.userId,
        userName: user.fullName || user.email,
        rating: parseInt(rating),
        comment: comment || '',
        createdAt: new Date().toISOString()
      };

      await db.collection('products').updateOne(
        { id: productId },
        { $push: { reviews: review } }
      );

      return NextResponse.json({ success: true, review });
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

    // PUT /api/auth/profile - Profil güncelleme (JWT gerekli)
    if (path === 'auth/profile') {
      const userData = verifyToken(request);
      if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { fullName, phone, address } = body;
      await db.collection('users').updateOne(
        { id: userData.userId },
        { $set: { fullName, phone, address, updatedAt: new Date().toISOString() } }
      );

      return NextResponse.json({ success: true, message: 'Profil güncellendi' });
    }

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
        gender: body.gender || 'unisex',
        brand: body.brand || '',
        specs: {
          glassType: body.specs?.glassType || '',
          machineType: body.specs?.machineType || '',
          dialColor: body.specs?.dialColor || '',
          strapType: body.specs?.strapType || '',
          caseSize: body.specs?.caseSize || '',
          caseMaterial: body.specs?.caseMaterial || '',
          functions: body.specs?.functions || '',
          calendar: body.specs?.calendar || '',
          features: body.specs?.features || '',
          warranty: body.specs?.warranty || ''
        },
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

    // PUT /api/admin/orders/:id - Sipariş durumu güncelleme (Admin)
    if (path.startsWith('admin/orders/') && path.split('/').length === 3) {
      const id = path.split('/')[2];
      const { status } = body;

      const result = await db.collection('orders').updateOne(
        { id },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Sipariş durumu güncellendi' });
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

    // DELETE /api/favorites/remove - Favorilerden çıkar (JWT gerekli)
    if (path === 'favorites/remove') {
      const userData = verifyToken(request);
      if (!userData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const body = await request.json();
      const { productId } = body;

      await db.collection('users').updateOne(
        { id: userData.userId },
        { $pull: { favoriteProducts: productId } }
      );

      return NextResponse.json({ success: true, message: 'Favorilerden çıkarıldı' });
    }

    return NextResponse.json({ error: 'Endpoint bulunamadı' }, { status: 404 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
