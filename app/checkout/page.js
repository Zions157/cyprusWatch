'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Building2, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [transferInfo, setTransferInfo] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  useEffect(() => {
    loadCart();
    loadUserInfo();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const loadUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const user = await response.json();
        setFormData(prevData => ({
          ...prevData,
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || ''
        }));
      }
    } catch (error) {
      console.error('Kullanıcı bilgileri yüklenemedi:', error);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Sipariş oluştur
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          items: cart,
          totalAmount,
          customerInfo: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
          },
          paymentMethod
        })
      });

      const order = await orderResponse.json();

      if (paymentMethod === 'bank') {
        // Banka API ile ödeme (Mock)
        const paymentResponse = await fetch('/api/payment/bank', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            amount: totalAmount,
            cardInfo: {
              number: formData.cardNumber,
              expiry: formData.cardExpiry,
              cvv: formData.cardCvv
            }
          })
        });

        const paymentResult = await paymentResponse.json();

        if (paymentResult.success) {
          setOrderComplete(true);
          localStorage.removeItem('cart');
        } else {
          alert('Ödeme başarısız: ' + paymentResult.message);
        }
      } else if (paymentMethod === 'transfer') {
        // IBAN/Havale ödemesi
        const paymentResponse = await fetch('/api/payment/transfer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id
          })
        });

        const paymentResult = await paymentResponse.json();
        setTransferInfo(paymentResult);
        setOrderComplete(true);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Ödeme hatası:', error);
      alert('Bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Card className="p-8 text-center bg-white border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz boş</h2>
            <Button onClick={() => router.push('/watches')} className="bg-[#006039] hover:bg-[#004d2d] text-white">
              Alışverişe Başla
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Card className="max-w-md p-8 text-center bg-white border-gray-200 shadow-sm">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h2>

            {transferInfo ? (
              <div className="text-left space-y-4 mb-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-gray-700">
                  <p className="font-semibold mb-2">Havale Bilgileri:</p>
                  <p className="text-sm"><strong>IBAN:</strong> {transferInfo.iban}</p>
                  <p className="text-sm"><strong>Hesap Adı:</strong> {transferInfo.accountName}</p>
                  <p className="text-sm"><strong>Tutar:</strong> {formatPrice(totalAmount)} ₺</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Lütfen açıklama kısmına sipariş numaranızı yazınız.
                  </p>
                </AlertDescription>
              </Alert>
              <p className="text-sm text-gray-600">
                Ödemeniz onaylandığında tarafınıza bilgi verilecektir.
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">
              Ödemeniz başarıyla tamamlandı. Siparişiniz hazırlanıyor.
            </p>
          )}

          <Button
            onClick={() => router.push('/')}
            className="w-full bg-[#006039] hover:bg-[#004d2d] text-white"
          >
            Ana Sayfaya Dön
          </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        <Button
          onClick={() => router.push('/cart')}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Sepete Geri Dön
        </Button>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ödeme</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Alanları */}
            <div className="lg:col-span-2 space-y-6">
              {/* Müşteri Bilgileri */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Müşteri Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700">Ad Soyad *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Adınız ve soyadınız"
                      className="bg-gray-50 border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700">E-posta *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="ornek@email.com"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700">Telefon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="0555 555 55 55"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-700">Adres *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Teslimat adresiniz"
                      className="bg-gray-50 border-gray-300 text-gray-900"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Ödeme Yöntemi */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Ödeme Yöntemi</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer flex items-center text-gray-700">
                        <CreditCard className="h-5 w-5 mr-2 text-[#006039]" />
                        Kredi/Banka Kartı ile Ödeme
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex-1 cursor-pointer flex items-center text-gray-700">
                        <Building2 className="h-5 w-5 mr-2 text-[#006039]" />
                        IBAN/Havale ile Ödeme
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Kart Bilgileri (Sadece Banka API seçiliyse) */}
                  {paymentMethod === 'bank' && (
                    <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber" className="text-gray-700">Kart Numarası *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="bg-white border-gray-300 text-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry" className="text-gray-700">Son Kullanma Tarihi *</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            required
                            placeholder="MM/YY"
                            maxLength="5"
                            className="bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv" className="text-gray-700">CVV *</Label>
                          <Input
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                            maxLength="3"
                            className="bg-white border-gray-300 text-gray-900"
                          />
                        </div>
                      </div>
                      <Alert className="bg-yellow-50 border-yellow-200">
                        <AlertDescription className="text-sm text-yellow-700">
                          Bu bir demo uygulamadır. Gerçek kart bilgisi girmeyiniz.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {/* IBAN/Havale Bilgileri */}
                  {paymentMethod === 'transfer' && (
                    <Alert className="mt-6 bg-blue-50 border-blue-200">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-gray-700">
                        <p className="font-semibold mb-3">Havale/EFT Bilgileri:</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between border-b border-blue-100 pb-2">
                            <span className="text-gray-600">Banka:</span>
                            <span className="font-medium text-gray-900">Ziraat Bankası</span>
                          </div>
                          <div className="flex justify-between border-b border-blue-100 pb-2">
                            <span className="text-gray-600">Hesap Sahibi:</span>
                            <span className="font-medium text-gray-900">E-Ticaret Şirketi A.Ş.</span>
                          </div>
                          <div className="flex justify-between border-b border-blue-100 pb-2">
                            <span className="text-gray-600">IBAN:</span>
                            <span className="font-medium text-gray-900">TR33 0006 1005 1978 6457 8413 26</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tutar:</span>
                            <span className="font-bold text-[#006039]">{formatPrice(totalAmount)} ₺</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                          ℹ️ Sipariş tamamlandıktan sonra havale yapabilirsiniz. Açıklama kısmına sipariş numaranızı yazmayı unutmayın.
                        </p>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sipariş Özeti */}
            <div>
              <Card className="sticky top-24 bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)} ₺
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam:</span>
                      <span>{formatPrice(totalAmount)} ₺</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo:</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Toplam:</span>
                    <span className="text-[#006039]">{formatPrice(totalAmount)} ₺</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-lg bg-[#006039] hover:bg-[#004d2d] text-white"
                  >
                    {loading ? 'İşleniyor...' : 'Siparişi Tamamla'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Siparişi tamamlayarak <a href="#" className="underline text-[#006039]">Kullanım Koşulları</a>'nı kabul etmiş olursunuz.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
