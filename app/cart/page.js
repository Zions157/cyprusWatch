'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';

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
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        <Button
          onClick={() => router.push('/watches')}
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Alışverişe Devam Et
        </Button>

        <h2 className="text-3xl font-bold text-white mb-8">Alışveriş Sepetim</h2>

        {cart.length === 0 ? (
          <Card className="p-12 text-center bg-white/5 border-white/10">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Sepetiniz boş</h3>
            <p className="text-gray-400 mb-4">Ürün eklemek için alışverişe başlayın</p>
            <Button onClick={() => router.push('/watches')} className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black">
              Ürünlere Git
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-white">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-1">{item.description}</p>
                        <p className="text-amber-500 font-bold text-xl">{item.price?.toFixed(2)} ₺</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="border-white/20 text-gray-300 hover:bg-white/10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold w-12 text-center text-white">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-white/20 text-gray-300 hover:bg-white/10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg mb-2 text-white">{(item.price * item.quantity).toFixed(2)} ₺</p>
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
                className="w-full border-white/20 text-gray-300 hover:bg-white/10"
              >
                Sepeti Temizle
              </Button>
            </div>

            <div>
              <Card className="sticky top-24 bg-white/5 border-white/10">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold mb-4 text-white">Sipariş Özeti</h3>

                  <div className="space-y-2 pb-4 border-b border-white/10">
                    <div className="flex justify-between text-gray-400">
                      <span>Ara Toplam:</span>
                      <span>{totalAmount.toFixed(2)} ₺</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Kargo:</span>
                      <span className="text-green-500 font-semibold">Ücretsiz</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span className="text-white">Toplam:</span>
                    <span className="text-amber-500">{totalAmount.toFixed(2)} ₺</span>
                  </div>

                  <Button
                    onClick={() => router.push('/checkout')}
                    className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
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
