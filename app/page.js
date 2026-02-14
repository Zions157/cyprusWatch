'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ShoppingCart, ChevronRight, Star, Clock, Award, Truck, Sparkles } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?w=1920&q=80',
    title: 'Lüks Saatlerin Adresi',
    subtitle: 'Zamansız elegans, modern tasarım',
  },
  {
    image: 'https://images.unsplash.com/photo-1600003014608-c2ccc1570a65?w=1920&q=80',
    title: 'Premium Koleksiyon',
    subtitle: 'Dünyanın en prestijli markaları',
  },
  {
    image: 'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?w=1920&q=80',
    title: 'Özel Seri Saatler',
    subtitle: 'Sınırlı sayıda üretim',
  },
  {
    image: 'https://images.unsplash.com/photo-1762706334838-ea8425b43116?w=1920&q=80',
    title: 'Tasarım Gözlükler',
    subtitle: 'Tarzınızı yansıtın',
  },
  {
    image: 'https://images.unsplash.com/photo-1642792539381-b9d9a32f6e1b?w=1920&q=80',
    title: 'Yeni Sezon',
    subtitle: '2026 koleksiyonu şimdi mağazada',
  },
];

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchProducts();
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Auto slide
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      const productsArray = Array.isArray(data) ? data : [];
      // Shuffle products
      const shuffled = [...productsArray].sort(() => Math.random() - 0.5);
      setProducts(shuffled);
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
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Slider */}
      <section className="relative h-[80vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => router.push('/watches')}
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-8"
                    >
                      Saatleri Keşfet
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      onClick={() => router.push('/eyewear')}
                      size="lg"
                      variant="outline"
                      className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-8"
                    >
                      Gözlükleri Gör
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-amber-500 w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Ücretsiz Kargo', desc: '500₺ üzeri siparişlerde' },
              { icon: Award, title: 'Orijinal Ürün', desc: '%100 Garanti' },
              { icon: Clock, title: '7/24 Destek', desc: 'Her zaman yanınızdayız' },
              { icon: Star, title: 'Premium Kalite', desc: '10.000+ Mutlu Müşteri' },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-3 rounded-lg">
                  <item.icon className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-amber-500" />
                Öne Çıkan Ürünler
              </h2>
              <p className="text-gray-400 mt-2">En çok tercih edilen saat ve gözlükler</p>
            </div>
            <Button
              onClick={() => router.push('/watches')}
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            >
              Tümünü Gör
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="animate-pulse bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="h-48 bg-gray-700 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <Card key={product.id} className="bg-white/5 border-white/10 hover:border-amber-500/50 transition-all duration-300 cursor-pointer group overflow-hidden">
                  <CardHeader className="p-0">
                    <div
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="relative h-52 bg-gray-800 overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {product.stock < 10 && (
                        <Badge className="absolute top-2 right-2 bg-red-500">Son {product.stock} adet</Badge>
                      )}
                      <Badge className="absolute top-2 left-2 bg-amber-500 text-black">
                        {product.category === 'Gözlük' ? 'Gözlük' : 'Saat'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="text-lg mb-2 line-clamp-1 text-white group-hover:text-amber-500 transition-colors"
                    >
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-500">
                        {formatPrice(product.price)} ₺
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      onClick={() => router.push(`/product/${product.id}`)}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-500"
                    >
                      Detay
                    </Button>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Özel Fırsatları Kaçırmayın</h2>
          <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
            Yeni ürünler ve kampanyalardan ilk siz haberdar olun
          </p>
          <Button
            onClick={() => router.push('/watches')}
            size="lg"
            className="bg-black text-white hover:bg-gray-900 px-12"
          >
            Alışverişe Başla
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-500">Cyprus Watch</h3>
              <p className="text-gray-400">Lüks saat ve gözlüklerin adresi</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Hızlı Linkler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-amber-500 transition-colors">Anasayfa</a></li>
                <li><a href="/watches" className="hover:text-amber-500 transition-colors">Saatler</a></li>
                <li><a href="/eyewear" className="hover:text-amber-500 transition-colors">Gözlükler</a></li>
                <li><a href="/about" className="hover:text-amber-500 transition-colors">Hakkımızda</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@cypruswatch.com</li>
                <li>+90 533 123 4567</li>
                <li>Kıbrıs, Lefkoşa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Çalışma Saatleri</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Pazartesi - Cuma: 09:00 - 18:00</li>
                <li>Cumartesi: 10:00 - 16:00</li>
                <li>Pazar: Kapalı</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500">
            <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
