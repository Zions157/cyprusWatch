'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Package, Heart, Settings, LogOut, ShoppingBag, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phone: '',
    address: ''
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      // Kullanıcı bilgilerini çek
      const userResponse = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!userResponse.ok) {
        throw new Error('Unauthorized');
      }

      const userData = await userResponse.json();
      setUser(userData);
      setProfileForm({
        fullName: userData.fullName || '',
        phone: userData.phone || '',
        address: userData.address || ''
      });

      // Siparişleri çek
      const ordersResponse = await fetch('/api/orders/my', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const ordersData = await ordersResponse.json();
      setOrders(Array.isArray(ordersData) ? ordersData : []);

      // Favorileri çek
      const favoritesResponse = await fetch('/api/favorites', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const favoritesData = await favoritesResponse.json();
      setFavorites(Array.isArray(favoritesData) ? favoritesData : []);

    } catch (error) {
      console.error('Auth error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });

      const data = await response.json();
      if (data.success) {
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
        checkAuth();
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const removeFavorite = async (productId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('/api/favorites/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });

      if (response.ok) {
        setFavorites(favorites.filter(p => p.id !== productId));
      }
    } catch (error) {
      console.error('Remove favorite error:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'paid': { label: 'Ödendi', color: 'bg-green-500' },
      'awaiting_transfer': { label: 'Havale Bekleniyor', color: 'bg-yellow-500' },
      'pending': { label: 'Beklemede', color: 'bg-gray-500' },
      'shipped': { label: 'Kargoda', color: 'bg-blue-500' },
      'delivered': { label: 'Teslim Edildi', color: 'bg-green-600' },
      'cancelled': { label: 'İptal Edildi', color: 'bg-red-500' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={`${config.color} text-white`}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Hesabım</h1>
          <p className="text-gray-400">Hoş geldiniz, {user?.fullName || user?.email}</p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
            <TabsTrigger value="orders" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Package className="h-4 w-4 mr-2" />
              Siparişlerim
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Heart className="h-4 w-4 mr-2" />
              Favorilerim
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <Settings className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              <User className="h-4 w-4 mr-2" />
              Hesap
            </TabsTrigger>
          </TabsList>

          {/* Siparişlerim */}
          <TabsContent value="orders">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Sipariş Geçmişi</h2>
                <Badge className="bg-amber-500 text-black">{orders.length} Sipariş</Badge>
              </div>
              
              {orders.length === 0 ? (
                <Card className="bg-gray-900 border-white/10 p-12 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Henüz siparişiniz yok</h3>
                  <p className="text-gray-400 mb-4">Alışverişe başlayın ve siparişlerinizi burada takip edin</p>
                  <Button onClick={() => router.push('/watches')} className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black">
                    Alışverişe Başla
                  </Button>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="bg-gray-900 border-white/10 hover:border-amber-500/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white flex items-center gap-2">
                            <Package className="h-5 w-5 text-amber-500" />
                            Sipariş #{order.id.slice(0, 8)}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4" />
                            {new Date(order.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          <div className="text-2xl font-bold text-amber-500 mt-2">
                            {formatPrice(order.totalAmount)} ₺
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{item.name} x {item.quantity}</span>
                            <span className="text-gray-400">{formatPrice(item.price * item.quantity)} ₺</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                        <CreditCard className="h-4 w-4" />
                        {order.paymentMethod === 'bank' ? 'Kredi/Banka Kartı' : 'IBAN/Havale'}
                        {order.emailSent && (
                          <Badge variant="outline" className="ml-auto border-green-500 text-green-500">
                            <Mail className="h-3 w-3 mr-1" />
                            Fatura Gönderildi
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Favorilerim */}
          <TabsContent value="favorites">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Favori Ürünlerim</h2>
                <Badge className="bg-amber-500 text-black">{favorites.length} Ürün</Badge>
              </div>

              {favorites.length === 0 ? (
                <Card className="bg-gray-900 border-white/10 p-12 text-center">
                  <Heart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Favori ürününüz yok</h3>
                  <p className="text-gray-400 mb-4">Beğendiğiniz ürünleri favorilere ekleyin</p>
                  <Button onClick={() => router.push('/watches')} className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black">
                    Ürünleri Keşfet
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((product) => (
                    <Card key={product.id} className="bg-gray-900 border-white/10 hover:border-amber-500/50 transition-colors overflow-hidden group">
                      <div className="relative h-48 bg-gray-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-amber-500">{formatPrice(product.price)} ₺</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => router.push(`/product/${product.id}`)}
                            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
                          >
                            İncele
                          </Button>
                          <Button
                            onClick={() => removeFavorite(product.id)}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Profil Ayarları */}
          <TabsContent value="profile">
            <Card className="bg-gray-900 border-white/10 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">Profil Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  {updateSuccess && (
                    <Alert className="bg-green-500/20 border-green-500 text-green-500">
                      <AlertDescription>Profil başarıyla güncellendi!</AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <Label htmlFor="fullName" className="text-gray-300">
                      <User className="h-4 w-4 inline mr-2" />
                      Ad Soyad
                    </Label>
                    <Input
                      id="fullName"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-gray-300">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Adres
                    </Label>
                    <Input
                      id="address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold"
                  >
                    Güncelle
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hesap Bilgileri */}
          <TabsContent value="account">
            <Card className="bg-gray-900 border-white/10 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">Hesap Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="text-gray-400 text-sm">E-posta</p>
                    <p className="text-white font-medium">{user?.email}</p>
                  </div>
                  <Mail className="h-5 w-5 text-amber-500" />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="text-gray-400 text-sm">Kayıt Tarihi</p>
                    <p className="text-white font-medium">
                      {new Date(user?.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <Calendar className="h-5 w-5 text-amber-500" />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="text-gray-400 text-sm">Toplam Sipariş</p>
                    <p className="text-white font-medium">{orders.length} sipariş</p>
                  </div>
                  <Package className="h-5 w-5 text-amber-500" />
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Çıkış Yap
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
