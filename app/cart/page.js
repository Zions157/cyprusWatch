'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        <Button
          onClick={() => router.push('/watches')}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Alışverişe Devam Et
        </Button>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Alışveriş Sepetim</h2>

        {cart.length === 0 ? (
          <Card className="p-12 text-center bg-white border-gray-200 shadow-sm">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sepetiniz boş</h3>
            <p className="text-gray-600 mb-4">Ürün eklemek için alışverişe başlayın</p>
            <Button onClick={() => router.push('/watches')} className="bg-[#006039] hover:bg-[#004d2d] text-white">
              Ürünlere Git
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-1">{item.description}</p>
                        <p className="text-[#006039] font-bold text-xl">{formatPrice(item.price)} ₺</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-9 w-9 bg-gray-200 hover:bg-gray-300 text-gray-700 border-0"
                        >
                          <Minus className="h-5 w-5" />
                        </Button>
                        <span className="text-xl font-bold w-12 text-center text-gray-900 bg-gray-100 py-1.5 rounded-lg">{item.quantity}</span>
                        <Button
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-9 w-9 bg-[#006039] hover:bg-[#004d2d] text-white border-0"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg mb-2 text-gray-900">{formatPrice(item.price * item.quantity)} ₺</p>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Sepeti Temizle
              </Button>
            </div>

            <div>
              <Card className="sticky top-24 bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Sipariş Özeti</h3>

                  <div className="space-y-2 pb-4 border-b border-gray-200">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam:</span>
                      <span>{formatPrice(totalAmount)} ₺</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo:</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span className="text-gray-900">Toplam:</span>
                    <span className="text-[#006039]">{formatPrice(totalAmount)} ₺</span>
                  </div>

                  <Button
                    onClick={() => router.push('/checkout')}
                    className="w-full h-12 text-lg bg-[#006039] hover:bg-[#004d2d] text-white"
                  >
                    Ödemeye Geç
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Güvenli ödeme sistemi ile korumalı alışveriş
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
