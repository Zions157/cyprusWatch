'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ShoppingCart, Package, Minus, Plus, Clock, Glasses, Heart, Star, Truck, RefreshCw, CreditCard, Shield, Gem, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
      fetchReviews(params.id);
    }
    checkFavoriteStatus();
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

  const fetchReviews = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}`);
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Değerlendirmeler yüklenemedi:', error);
    }
  };

  const checkFavoriteStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    
    setIsLoggedIn(true);
    
    try {
      const response = await fetch('/api/favorites', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const favorites = await response.json();
        const isFav = favorites.some(f => f.id === params.id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error('Favori kontrolü hatası:', error);
    }
  };

  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Favori eklemek için giriş yapmalısınız!');
      router.push('/login');
      return;
    }

    try {
      if (isFavorite) {
        const response = await fetch('/api/favorites/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id })
        });

        if (response.ok) {
          setIsFavorite(false);
          alert('Favorilerden çıkarıldı!');
        }
      } else {
        const response = await fetch('/api/favorites/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id })
        });

        if (response.ok) {
          setIsFavorite(true);
          alert('Favorilere eklendi!');
        }
      }
    } catch (error) {
      console.error('Favori işlemi hatası:', error);
      alert('Bir hata oluştu!');
    }
  };

  const submitReview = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Değerlendirme yapmak için giriş yapmalısınız!');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${product.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newReview)
      });

      if (response.ok) {
        alert('Değerlendirmeniz kaydedildi!');
        setNewReview({ rating: 5, comment: '' });
        fetchReviews(product.id);
      } else {
        alert('Değerlendirme eklenemedi!');
      }
    } catch (error) {
      console.error('Değerlendirme hatası:', error);
      alert('Bir hata oluştu!');
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('Ürün sepete eklendi!');
  };

  // Görsel listesini oluştur
  const getProductImages = () => {
    if (!product) return [];
    
    // Eğer images array varsa ve dolu ise onu kullan
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    
    // Yoksa sadece ana görseli kullan
    if (product.image) {
      return [product.image];
    }
    
    return [];
  };

  const productImages = product ? getProductImages() : [];

  // Sonraki görsel
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  // Önceki görsel
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  // Belirli bir görsele git
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl">Ürün bulunamadı</div>
      </div>
    );
  }

  const isEyewear = product.productType === 'eyewear' || product.category === 'Gözlük';
  const isETA = product.productType === 'eta';
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri Dön
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Sol: Görsel Galerisi */}
          <div className="space-y-4">
            {/* Ana Görsel */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm group">
              <img
                src={productImages[currentImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Navigasyon Okları - Sadece birden fazla görsel varsa göster */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  
                  {/* Görsel Sayacı */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {productImages.length}
                  </div>
                </>
              )}
              
              {/* Stok Durumu */}
              {product.stock < 10 && product.stock > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  Son {product.stock} Adet!
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge className="absolute top-4 left-4 bg-gray-500 text-white">
                  Stokta Yok
                </Badge>
              )}
            </div>

            {/* Küçük Resimler (Thumbnails) - Sadece birden fazla görsel varsa göster */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-[#006039] ring-2 ring-[#006039]/30' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Dot Göstergeleri (Mobil için) - Sadece birden fazla görsel varsa göster */}
            {productImages.length > 1 && (
              <div className="flex justify-center gap-2 lg:hidden">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-[#006039] w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sağ: Detay + Özellikler */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className={
                isETA ? 'bg-green-500 text-white' :
                isEyewear ? 'bg-purple-500 text-white' : 
                'bg-[#006039] text-white'
              }>
                {product.category}
              </Badge>
              <Badge variant="outline" className="border-gray-400 text-gray-600">
                {product.gender === 'male' ? 'Erkek' : product.gender === 'female' ? 'Kadın' : 'Unisex'}
              </Badge>
              {product.brand && <Badge variant="outline" className="border-[#006039] text-[#006039]">{product.brand}</Badge>}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= avgRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({reviews.length} değerlendirme)</span>
            </div>

            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="bg-gradient-to-r from-[#006039]/10 to-green-500/10 p-6 rounded-xl border border-[#006039]/30 mb-6">
              <div className="text-4xl font-bold text-[#006039]">
                {formatPrice(product.price)} ₺
              </div>
              <p className="text-gray-600 text-sm mt-1">KDV Dahil</p>
            </div>

            {/* Özellikler Tablosu */}
            {product.specs && Object.values(product.specs).some(v => v) && (
              <Card className="bg-white border-gray-200 mb-6 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Ürün Özellikleri</h3>
                  <div className="space-y-2">
                    {product.specs.glassType && (
                      <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">CAM CİNSİ</span>
                        <span className="text-gray-900 font-medium">{product.specs.glassType}</span>
                      </div>
                    )}
                    {product.specs.machineType && (
                      <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">MAKİNE CİNSİ</span>
                        <span className="text-gray-900 font-medium">{product.specs.machineType}</span>
                      </div>
                    )}
                    {product.specs.dialColor && (
                      <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">KADRAN RENGİ</span>
                        <span className="text-gray-900 font-medium">{product.specs.dialColor}</span>
                      </div>
                    )}
                    {product.specs.strapType && (
                      <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">KORDON CİNSİ</span>
                        <span className="text-gray-900 font-medium">{product.specs.strapType}</span>
                      </div>
                    )}
                    {product.specs.caseSize && (
                      <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">KASA ÇAPI</span>
                        <span className="text-gray-900 font-medium">{product.specs.caseSize}</span>
                      </div>
                    )}
                    {product.specs.caseMaterial && (
                      <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">KASA</span>
                        <span className="text-gray-900 font-medium">{product.specs.caseMaterial}</span>
                      </div>
                    )}
                    {product.specs.calendar && (
                      <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-500">TAKVİM</span>
                        <span className="text-gray-900 font-medium">{product.specs.calendar}</span>
                      </div>
                    )}
                    {product.specs.warranty && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">GARANTİ</span>
                        <span className="text-gray-900 font-medium">{product.specs.warranty}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Adet Seçimi */}
            <div className="mb-6">
              <Label className="text-gray-700 mb-2 block">Adet</Label>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  variant="outline"
                  size="icon"
                  className="border-[#006039] text-[#006039] hover:bg-[#006039] hover:text-white"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <div className="text-2xl font-bold text-gray-900 w-16 text-center">
                  {quantity}
                </div>
                <Button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  variant="outline"
                  size="icon"
                  className="border-[#006039] text-[#006039] hover:bg-[#006039] hover:text-white"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Butonlar */}
            <div className="space-y-3">
              <Button
                onClick={addToCart}
                disabled={product.stock === 0}
                className="w-full h-12 text-lg bg-[#006039] hover:bg-[#004d2d] text-white"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Sepete Ekle - {formatPrice(product.price * quantity)} ₺
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => router.push('/cart')}
                  variant="outline"
                  className="h-12 border-[#006039] text-[#006039] hover:bg-[#006039] hover:text-white"
                >
                  Sepete Git
                </Button>
                <Button
                  onClick={toggleFavorite}
                  variant="outline"
                  className={`h-12 ${
                    isFavorite 
                      ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white' 
                      : 'border-gray-400 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorilerde' : 'Favorilere Ekle'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Açıklama, Değerlendirmeler, Ödeme, İade */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 bg-gray-100 p-1 h-auto">
            <TabsTrigger value="description" className="data-[state=active]:bg-[#006039] data-[state=active]:text-white flex items-center justify-center gap-1 py-2 px-2 text-xs md:text-sm">
              <Package className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">AÇIKLAMA</span>
              <span className="sm:hidden">AÇIKLAMA</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-[#006039] data-[state=active]:text-white flex items-center justify-center gap-1 py-2 px-2 text-xs md:text-sm">
              <Star className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">DEĞERLENDİRME</span>
              <span className="sm:hidden">YORUM</span>
              <span className="text-xs">({reviews.length})</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-[#006039] data-[state=active]:text-white flex items-center justify-center gap-1 py-2 px-2 text-xs md:text-sm">
              <CreditCard className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">ÖDEME</span>
              <span className="sm:hidden">ÖDEME</span>
            </TabsTrigger>
            <TabsTrigger value="return" className="data-[state=active]:bg-[#006039] data-[state=active]:text-white flex items-center justify-center gap-1 py-2 px-2 text-xs md:text-sm">
              <RefreshCw className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">İADE</span>
              <span className="sm:hidden">İADE</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ürün Açıklaması</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                
                {product.brand && (
                  <div className="mt-6 p-4 bg-[#006039]/10 border border-[#006039]/30 rounded-lg">
                    <h4 className="font-bold text-[#006039] mb-2">Marka</h4>
                    <p className="text-gray-900">{product.brand}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Müşteri Değerlendirmeleri</h3>
                
                {/* Değerlendirme Formu */}
                {isLoggedIn && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-3">Değerlendirme Yap</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-gray-700 text-sm mb-2 block">Puan</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="text-3xl"
                            >
                              <Star
                                className={`h-8 w-8 ${star <= newReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-700 text-sm mb-2 block">Yorumunuz</label>
                        <Textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          placeholder="Ürün hakkındaki düşüncelerinizi paylaşın..."
                          rows={4}
                          className="bg-white border-gray-300 text-gray-900"
                        />
                      </div>
                      <Button
                        onClick={submitReview}
                        className="bg-[#006039] hover:bg-[#004d2d] text-white"
                      >
                        Değerlendirmeyi Gönder
                      </Button>
                    </div>
                  </div>
                )}

                {/* Değerlendirme Listesi */}
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Henüz değerlendirme yok. İlk değerlendirmeyi siz yapın!</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-[#006039] flex items-center justify-center text-white font-bold">
                            {review.userName?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium">{review.userName}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-500 text-xs">
                                {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ödeme Seçenekleri</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="h-8 w-8 text-[#006039] flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Kredi Kartı / Banka Kartı</h4>
                      <p className="text-gray-600 text-sm">Tüm kredi kartları ve banka kartlarıyla güvenli ödeme. Tek çekim veya taksit seçenekleriyle.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Shield className="h-8 w-8 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Havale / EFT</h4>
                      <p className="text-gray-600 text-sm">Banka havalesi veya EFT ile güvenli ödeme. Havale bilgileri sipariş sonrası email ile gönderilir.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Truck className="h-8 w-8 text-blue-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Güvenli Ödeme</h4>
                      <p className="text-gray-600 text-sm">Tüm ödemeleriniz 256-bit SSL sertifikası ile korunmaktadır. Kart bilgileriniz saklanmaz.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="return">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">İade & Değişim Koşulları</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-[#006039] mb-2 flex items-center gap-2">
                      <RefreshCw className="h-5 w-5" />
                      İade Süresi
                    </h4>
                    <p className="text-gray-600">
                      Ürünü teslim aldığınız tarihten itibaren 14 gün içerisinde cayma hakkınızı kullanarak iade edebilirsiniz.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#006039] mb-2 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      İade Koşulları
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Ürün kullanılmamış ve orijinal ambalajında olmalıdır</li>
                      <li>Ürünle birlikte gelen tüm aksesuarlar eksiksiz olmalıdır</li>
                      <li>Fatura ve garanti belgesi iade edilmelidir</li>
                      <li>Ürün üzerinde hasar veya değişiklik olmamalıdır</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#006039] mb-2">Değişim</h4>
                    <p className="text-gray-600">
                      Satın aldığınız ürünü aynı kategorideki başka bir ürünle değiştirebilirsiniz. Kargo ücreti tarafımızca karşılanır.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-bold text-blue-700 mb-2">Garanti</h4>
                    <p className="text-gray-600 text-sm">
                      Tüm ürünlerimiz {product.specs?.warranty || '1 yıl'} garanti kapsamındadır. Üretici garantisi geçerlidir.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
