'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Package, Minus, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 animate-spin mx-auto text-indigo-600 mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Ürün bulunamadı</h2>
          <Button onClick={() => router.push('/')} className="bg-indigo-600 hover:bg-indigo-700">
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
          Ürünlere Geri Dön
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ürün Görseli */}
          <Card className="overflow-hidden">
            <div className="relative h-96 bg-gray-100">
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
            </div>
          </Card>

          {/* Ürün Detayları */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-5xl font-bold text-indigo-600">{product.price.toFixed(2)} ₺</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Adet:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Package className="h-5 w-5" />
                  <span>Stok: {product.stock} adet</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Sepete Ekle - {(product.price * quantity).toFixed(2)} ₺
                </Button>
                <Button
                  onClick={() => router.push('/cart')}
                  variant="outline"
                  className="w-full h-12 text-lg"
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