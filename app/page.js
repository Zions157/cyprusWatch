'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ShoppingCart, ChevronRight, ChevronLeft, Star, Clock, Award, Truck, Sparkles } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://media.rolex.com/image/upload/q_auto:eco/f_auto/c_limit,w_1920/v1/catalogue/2025/upright-c/m136668lb-0001.jpg',
    title: 'Rolex Deepsea',
    subtitle: 'M136668LB-0001 - 18 karat sarı altın',
  },
  {
    image: 'https://patek-res.cloudinary.com/dfsmedia/0906caea301d42b3b8bd23bd656d1711/202222-51887',
    title: 'Patek Philippe Nautilus',
    subtitle: '5726/1A-014 - Annual Calendar',
  },
  {
    image: 'https://images.bobswatches.com/images/Used-Rolex-Yacht-Master-II-116680-SKU185896.jpg?q=50&ef=2&h=950&sh=true&dpr=2',
    title: 'Rolex Yacht-Master II',
    subtitle: '116680 - Çelik, Beyaz Kadran',
  },
  {
    image: 'https://dynamicmedia.audemarspiguet.com/is/image/audemarspiguet/watch-1031?size=1920,0&wid=1920&fmt=avif-alpha&dpr=off',
    title: 'Audemars Piguet Royal Oak',
    subtitle: '26730ST - Selfwinding Flying Tourbillon',
  },
  {
    image: 'https://static.ticimax.cloud/cdn-cgi/image/width=1888,quality=85/49839/uploads/urunresimleri/buyuk/gucci-1869s-001-53-erkek-gunes-gozlugu--9062-.png',
    title: 'Gucci Eyewear',
    subtitle: 'GG 1869S 001 - Erkek Güneş Gözlüğü',
  },
  {
    image: 'https://www.prada.com/content/dam/pradanux/common_assets/brand/products/F/SPS/B07/M1BO/FE70U/SPSB07_M1BO_FE70U_S_000_SLF.jpg',
    title: 'Prada Linea Rossa',
    subtitle: 'Active - Erkek Güneş Gözlüğü',
  },
  {
    image: 'https://stn-atasun.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/gu032087-rb-3548n-001-5121145-638755903607437429.jpg',
    title: 'Ray-Ban Hexagonal',
    subtitle: 'RB 3548N - Klasik Altın Çerçeve',
  },
];

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
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

  // Features with translations
  const features = [
    { icon: Truck, titleKey: 'home.freeShipping', descKey: 'home.freeShippingDesc' },
    { icon: Award, titleKey: 'home.originalProduct', descKey: 'home.originalProductDesc' },
    { icon: Clock, titleKey: 'home.support247', descKey: 'home.support247Desc' },
    { icon: Star, titleKey: 'home.premiumQuality', descKey: 'home.premiumQualityDesc' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Slider - 50% smaller, starts below navbar */}
      <section className="relative h-[28vh] mt-16 overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 mb-4">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => router.push('/watches')}
                      size="sm"
                      className="bg-[#006039] hover:bg-[#004d2d] text-white font-bold px-6"
                    >
                      {t('home.discoverWatches')}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => router.push('/eyewear')}
                      size="sm"
                      variant="outline"
                      className="border-[#006039] text-[#006039] hover:bg-[#006039] hover:text-white px-6"
                    >
                      {t('home.viewEyewear')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-[#006039] w-6'
                  : 'bg-gray-400/50 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1);
          }}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-[#006039] hover:bg-[#004d2d] text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Önceki"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1);
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-[#006039] hover:bg-[#004d2d] text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Sonraki"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* Features Section - Compact on mobile */}
      <section className="py-4 md:py-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 md:space-x-4 p-2 md:p-6 rounded-lg md:rounded-xl bg-gray-50 border border-gray-200 hover:border-[#006039] transition-colors">
                <div className="bg-gradient-to-br from-[#006039] to-[#007a47] p-2 md:p-3 rounded-lg flex-shrink-0">
                  <item.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-xs md:text-base truncate">{t(item.titleKey)}</h3>
                  <p className="text-xs text-gray-500 hidden md:block">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-[#006039]" />
                {t('home.featuredProducts')}
              </h2>
              <p className="text-gray-500 mt-2">{t('home.featuredProductsDesc')}</p>
            </div>
            <Button
              onClick={() => router.push('/watches')}
              variant="outline"
              className="border-[#006039] text-[#006039] hover:bg-[#006039] hover:text-white"
            >
              {t('home.viewAll')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="animate-pulse bg-gray-100 border-gray-200">
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
              {products.slice(0, 8).map((product) => (
                <Card key={product.id} className="bg-white border-gray-200 hover:border-[#006039] hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden">
                  <CardHeader className="p-0">
                    <div
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="relative h-52 bg-gray-100 overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {product.stock < 10 && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                          {t('product.lastItems').replace('{count}', product.stock)}
                        </Badge>
                      )}
                      <Badge className={`absolute top-2 left-2 text-white ${
                        product.productType === 'eyewear' ? 'bg-purple-500' :
                        product.productType === 'eta' ? 'bg-green-600' :
                        'bg-[#006039]'
                      }`}>
                        {product.productType === 'eyewear' ? t('nav.eyewear') :
                         product.productType === 'eta' ? 'ETA' :
                         t('nav.watches')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="text-lg mb-2 line-clamp-1 text-gray-900 group-hover:text-[#006039] transition-colors"
                    >
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#006039]">
                        {formatPrice(product.price)} ₺
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button
                      onClick={() => router.push(`/product/${product.id}`)}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:border-[#006039] hover:text-[#006039]"
                    >
                      {t('product.description')}
                    </Button>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-gradient-to-r from-[#006039] to-[#007a47] hover:from-amber-600 hover:to-yellow-600 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {t('home.addToCart')}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Green Theme */}
      <section className="py-20 bg-[#006039]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{t('home.specialOffers')}</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('home.specialOffersDesc')}
          </p>
          <Button
            onClick={() => router.push('/watches')}
            size="lg"
            className="bg-white text-[#006039] hover:bg-gray-100 px-12 font-bold"
          >
            {t('dashboard.startShopping')}
          </Button>
        </div>
      </section>

      {/* Footer - White Theme */}
      <footer className="bg-white text-gray-900 py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#006039]">Cyprus Watch</h3>
              <p className="text-gray-600">{t('about.visionDesc')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">{t('nav.home')}</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/" className="hover:text-[#006039] transition-colors">{t('nav.home')}</a></li>
                <li><a href="/watches" className="hover:text-[#006039] transition-colors">{t('nav.watches')}</a></li>
                <li><a href="/eyewear" className="hover:text-[#006039] transition-colors">{t('nav.eyewear')}</a></li>
                <li><a href="/about" className="hover:text-[#006039] transition-colors">{t('nav.about')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">{t('nav.contact')}</h4>
              <ul className="space-y-2 text-gray-600">
                <li>info@cypruswatch.com</li>
                <li>+90 533 123 4123</li>
                <li>Kıbrıs, Lefkoşa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">{t('contact.workingHours')}</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Mon - Fri: 09:00 - 18:00</li>
                <li>Sat: 10:00 - 16:00</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>© 2026 Cyprus Watch. {t('common.allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
