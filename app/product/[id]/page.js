'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Package, Minus, Plus, Clock, Glasses } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Ürün yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      cart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/cart');
  };

  const isEyewear = product?.category === 'Gözlük' || product?.category === 'gözlük' || product?.category === 'Eyewear';

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <Package className="h-12 w-12 animate-spin mx-auto text-amber-500 mb-4" />
            <p className="text-gray-400">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Card className="p-8 text-center bg-white/5 border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Ürün bulunamadı</h2>
            <Button onClick={() => router.push('/watches')} className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black">
              Ürünlere Dön
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        <Button
          onClick={() => router.push(isEyewear ? '/eyewear' : '/watches')}
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isEyewear ? 'Gözlüklere' : 'Saatlere'} Geri Dön
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ürün Görseli */}
          <Card className="overflow-hidden bg-white/5 border-white/10">
            <div className="relative h-96 bg-gray-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock < 10 && product.stock > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500">Son {product.stock} adet</Badge>
              )}
              {product.stock === 0 && (
                <Badge className="absolute top-4 right-4 bg-gray-500">Stokta Yok</Badge>
              )}
              <Badge className="absolute top-4 left-4 bg-amber-500 text-black">
                {isEyewear ? <><Glasses className="h-3 w-3 mr-1" /> Gözlük</> : <><Clock className="h-3 w-3 mr-1" /> Saat</>}
              </Badge>
            </div>
          </Card>

          {/* Ürün Detayları */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2 bg-white/10 text-gray-300">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-5xl font-bold text-amber-500">{formatPrice(product.price)} ₺</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 font-medium">Adet:</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-10 w-10 bg-gray-700 hover:bg-gray-600 text-white border-0 disabled:opacity-50"
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="text-2xl font-bold w-14 text-center text-white bg-gray-800 py-2 rounded-lg">{quantity}</span>
                    <Button
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10 bg-amber-500 hover:bg-amber-600 text-black border-0 disabled:opacity-50"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-400">
                  <Package className="h-5 w-5" />
                  <span>Stok: {product.stock} adet</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Sepete Ekle - {(product.price * quantity).toFixed(2)} ₺
                </Button>
                <Button
                  onClick={() => router.push('/cart')}
                  variant="outline"
                  className="w-full h-12 text-lg border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                >
                  Sepete Git
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
