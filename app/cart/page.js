'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus, Package } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Cyprus Watch</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Alışverişe Devam Et
        </Button>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Alışveriş Sepetim</h2>

        {cart.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Sepetiniz boş</h3>
            <p className="text-gray-500 mb-4">Ürün eklemek için alışverişe başlayın</p>
            <Button onClick={() => router.push('/')} className="bg-indigo-600 hover:bg-indigo-700">
              Ürünlere Git
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sepet Ürünleri */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-1">{item.description}</p>
                        <p className="text-indigo-600 font-bold text-xl">{item.price.toFixed(2)} ₺</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg mb-2">{(item.price * item.quantity).toFixed(2)} ₺</p>
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
                className="w-full"
              >
                Sepeti Temizle
              </Button>
            </div>

            {/* Sipariş Özeti */}
            <div>
              <Card className="sticky top-4">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold mb-4">Sipariş Özeti</h3>

                  <div className="space-y-2 pb-4 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam:</span>
                      <span>{totalAmount.toFixed(2)} ₺</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo:</span>
                      <span className="text-green-600 font-semibold">Ücretsiz</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Toplam:</span>
                    <span className="text-indigo-600">{totalAmount.toFixed(2)} ₺</span>
                  </div>

                  <Button
                    onClick={() => router.push('/checkout')}
                    className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700"
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