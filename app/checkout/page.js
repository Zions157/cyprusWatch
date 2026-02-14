'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Building2, Package, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
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
      // Sipariş oluştur
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Sepetiniz boş</h2>
          <Button onClick={() => router.push('/')} className="bg-indigo-600 hover:bg-indigo-700">
            Alışverişe Başla
          </Button>
        </Card>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h2>

          {transferInfo ? (
            <div className="text-left space-y-4 mb-6">
              <Alert>
                <AlertDescription>
                  <p className="font-semibold mb-2">Havale Bilgileri:</p>
                  <p className="text-sm"><strong>IBAN:</strong> {transferInfo.iban}</p>
                  <p className="text-sm"><strong>Hesap Adı:</strong> {transferInfo.accountName}</p>
                  <p className="text-sm"><strong>Tutar:</strong> {totalAmount.toFixed(2)} ₺</p>
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
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Ana Sayfaya Dön
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">E-Ticaret Mağazam</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.push('/cart')}
          variant="ghost"
          className="mb-6"
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
              <Card>
                <CardHeader>
                  <CardTitle>Müşteri Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Ad Soyad *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="ornek@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="0555 555 55 55"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Adres *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Teslimat adresiniz"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Ödeme Yöntemi */}
              <Card>
                <CardHeader>
                  <CardTitle>Ödeme Yöntemi</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Kredi/Banka Kartı ile Ödeme
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex-1 cursor-pointer flex items-center">
                        <Building2 className="h-5 w-5 mr-2" />
                        IBAN/Havale ile Ödeme
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Kart Bilgileri (Sadece Banka API seçiliyse) */}
                  {paymentMethod === 'bank' && (
                    <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Kart Numarası *</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Son Kullanma Tarihi *</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            required
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV *</Label>
                          <Input
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                            maxLength="3"
                          />
                        </div>
                      </div>
                      <Alert>
                        <AlertDescription className="text-sm">
                          Bu bir demo uygulamadır. Gerçek kart bilgisi girmeyiniz.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {/* IBAN/Havale Bilgileri */}
                  {paymentMethod === 'transfer' && (
                    <Alert className="mt-6">
                      <Building2 className="h-4 w-4" />
                      <AlertDescription>
                        <p className="font-semibold mb-3">Havale/EFT Bilgileri:</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Banka:</span>
                            <span className="font-medium">Ziraat Bankası</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Hesap Sahibi:</span>
                            <span className="font-medium">E-Ticaret Şirketi A.Ş.</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">IBAN:</span>
                            <span className="font-medium">TR33 0006 1005 1978 6457 8413 26</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tutar:</span>
                            <span className="font-bold text-indigo-600">{totalAmount.toFixed(2)} ₺</span>
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
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-semibold">
                          {(item.price * item.quantity).toFixed(2)} ₺
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam:</span>
                      <span>{totalAmount.toFixed(2)} ₺</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo:</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Toplam:</span>
                    <span className="text-indigo-600">{totalAmount.toFixed(2)} ₺</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700"
                  >
                    {loading ? 'İşleniyor...' : 'Siparişi Tamamla'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Siparişi tamamlayarak <a href="#" className="underline">Kullanım Koşulları</a>'nı kabul etmiş olursunuz.
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