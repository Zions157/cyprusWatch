'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ShoppingCart, ChevronRight, Star, Clock, Award, Truck } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      
      // İlk 4 ürünü featured olarak al (swiper için)
      setFeaturedProducts(data.slice(0, 4));
      
      // Random shuffle ve göster
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setRandomProducts(shuffled);
    } catch (error) {
      console.error('Ürünler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Navbar />

      {/* Hero Section with Carousel */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Lüks Saatlerde Yeni Dönem
            </h1>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
              Dünyanın en prestijli saat markalarını keşfedin
            </p>
          </div>

          {/* Featured Products Carousel */}
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="max-w-5xl mx-auto">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                        <CardHeader className="p-0">
                          <div
                            onClick={() => router.push(`/product/${product.id}`)}
                            className="relative h-56 rounded-t-lg overflow-hidden"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">
                              Öne Çıkan
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <CardTitle className="text-white text-lg mb-2 line-clamp-1">
                            {product.name}
                          </CardTitle>
                          <p className="text-indigo-200 text-sm line-clamp-2 mb-3">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-yellow-400">
                              {product.price?.toFixed(2)} ₺
                            </span>
                            <Badge variant="secondary" className="bg-white/20 text-white">
                              {product.category}
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button
                            onClick={() => addToCart(product)}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Sepete Ekle
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
                <CarouselNext className="-right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
              </Carousel>
            </div>
          ) : null}

          <div className="text-center mt-8">
            <Button
              onClick={() => router.push('/watches')}
              size="lg"
              className="bg-white text-indigo-900 hover:bg-indigo-100 font-semibold"
            >
              Tüm Saatleri Gör
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4 p-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ücretsiz Kargo</h3>
                <p className="text-sm text-gray-500">500₺ üzeri siparişlerde</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Orijinal Ürün</h3>
                <p className="text-sm text-gray-500">%100 Garanti</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">7/24 Destek</h3>
                <p className="text-sm text-gray-500">Her zaman yanınızdayız</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Müşteri Memnuniyeti</h3>
                <p className="text-sm text-gray-500">10.000+ Mutlu Müşteri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Random Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Tüm Saatler</h2>
              <p className="text-gray-600 mt-1">En kaliteli saatleri keşfedin</p>
            </div>
            <Button
              onClick={() => router.push('/watches')}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Tümünü Gör
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-48 bg-gray-200 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {randomProducts.slice(0, 8).map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md">
                  <CardHeader className="p-0">
                    <div
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="relative h-52 bg-gray-100 rounded-t-lg overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.stock < 10 && (
                        <Badge className="absolute top-2 right-2 bg-red-500">Son {product.stock} adet</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="text-lg mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors"
                    >
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-indigo-600">
                        {product.price?.toFixed(2)} ₺
                      </span>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      onClick={() => router.push(`/product/${product.id}`)}
                      variant="outline"
                      className="flex-1"
                    >
                      Detay
                    </Button>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Ekle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Cyprus Watch</h3>
              <p className="text-gray-400">Lüks ve kaliteli saatlerin adresi</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Anasayfa</a></li>
                <li><a href="/watches" className="hover:text-white transition-colors">Saatler</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@cypruswatch.com</li>
                <li>+90 533 123 4567</li>
                <li>Kıbrıs, Lefkoşa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Çalışma Saatleri</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Pazartesi - Cuma: 09:00 - 18:00</li>
                <li>Cumartesi: 10:00 - 16:00</li>
                <li>Pazar: Kapalı</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
