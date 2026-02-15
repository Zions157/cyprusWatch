'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Package, Lock, Clock, Glasses, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

// Saat kategorileri
const WATCH_CATEGORIES = ['Lüks', 'Spor', 'Klasik', 'Dijital', 'Akıllı Saat'];
// Gözlük kategorileri
const EYEWEAR_CATEGORIES = ['Güneş Gözlüğü', 'Optik', 'Spor Gözlük', 'Moda'];

const ITEMS_PER_PAGE = 5;

export default function AdminPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Lüks',
    productType: 'watch', // 'watch' veya 'eyewear'
    image: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      fetchProducts();
      fetchOrders();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        setIsLoggedIn(true);
        fetchProducts();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Giriş başarısız: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    router.push('/');
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Ürünler yüklenemedi:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductTypeChange = (type) => {
    // Ürün tipi değişince kategoriyi de güncelle
    const newCategory = type === 'watch' ? WATCH_CATEGORIES[0] : EYEWEAR_CATEGORIES[0];
    setFormData({
      ...formData,
      productType: type,
      category: newCategory
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploadingImage(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
        alert('Görsel başarıyla yüklendi!');
      } else {
        alert('Görsel yüklenemedi: ' + data.error);
      }
    } catch (error) {
      alert('Görsel yüklenirken hata oluştu: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        image: formData.image,
        productType: formData.productType, // 'watch' veya 'eyewear'
        category: formData.category
      };

      if (editingProduct) {
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        });
        const data = await response.json();
        if (data.success) {
          alert('Ürün güncellendi!');
        }
      } else {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData)
        });
        if (response.ok) {
          alert('Ürün eklendi!');
        }
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', stock: '', category: 'Lüks', productType: 'watch', image: '' });
      setImagePreview('');
      fetchProducts();
    } catch (error) {
      alert('Hata: ' + error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      productType: product.productType || 'watch',
      image: product.image
    });
    setImagePreview(product.image);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Ürünü silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (data.success) {
        await fetchProducts();
        alert('Ürün başarıyla silindi!');
      }
    } catch (error) {
      alert('Silme hatası: ' + error.message);
    }
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', stock: '', category: 'Lüks', productType: 'watch', image: '' });
    setImagePreview('');
    setIsDialogOpen(true);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (filterType === 'all') return true;
      if (filterType === 'watch') return p.productType === 'watch' || (!p.productType && p.category !== 'Gözlük');
      if (filterType === 'eyewear') return p.productType === 'eyewear' || p.category === 'Gözlük';
      return true;
    });

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, filterType, searchQuery]);

  // Pagination hesaplamaları
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Filtre veya arama değişince sayfayı sıfırla
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchQuery]);

  // Mevcut kategorileri say
  const watchCount = products.filter(p => p.productType === 'watch' || (!p.productType && p.category !== 'Gözlük')).length;
  const eyewearCount = products.filter(p => p.productType === 'eyewear' || p.category === 'Gözlük').length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900 border-white/10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo size={60} />
            </div>
            <CardTitle className="text-2xl flex items-center justify-center text-white">
              <Lock className="h-6 w-6 mr-2 text-amber-500" />
              Admin Girişi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                  placeholder="Kullanıcı adınız"
                  className="bg-black/50 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  placeholder="Şifreniz"
                  className="bg-black/50 border-white/20 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black">
                Giriş Yap
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full border-white/20 text-gray-300 hover:bg-white/10"
              >
                Ana Sayfaya Dön
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Admin - Ürün Yönetimi</h2>
            <p className="text-gray-400">
              Toplam {products.length} ürün • {watchCount} Saat • {eyewearCount} Gözlük
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Buttons */}
            <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg">
              <Button
                variant={filterType === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterType('all')}
                className={filterType === 'all' 
                  ? 'bg-amber-500 text-black font-bold hover:bg-amber-600' 
                  : 'bg-gray-700 text-white hover:bg-gray-600 border-0'}
              >
                Tümü ({products.length})
              </Button>
              <Button
                variant={filterType === 'watch' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterType('watch')}
                className={filterType === 'watch' 
                  ? 'bg-amber-500 text-black font-bold hover:bg-amber-600' 
                  : 'bg-gray-700 text-white hover:bg-gray-600 border-0'}
              >
                <Clock className="h-4 w-4 mr-1" /> Saatler ({watchCount})
              </Button>
              <Button
                variant={filterType === 'eyewear' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterType('eyewear')}
                className={filterType === 'eyewear' 
                  ? 'bg-purple-500 text-white font-bold hover:bg-purple-600' 
                  : 'bg-gray-700 text-white hover:bg-gray-600 border-0'}
              >
                <Glasses className="h-4 w-4 mr-1" /> Gözlükler ({eyewearCount})
              </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog} className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Ürün Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl">
                    {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Product Type Selection - Büyük ve Net */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-xl border border-white/10">
                    <Label className="text-amber-500 font-bold text-lg mb-4 block">Ürün Tipi Seçin *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleProductTypeChange('watch')}
                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                          formData.productType === 'watch' 
                            ? 'border-amber-500 bg-amber-500/20 text-amber-500' 
                            : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        <Clock className="h-10 w-10" />
                        <span className="font-bold text-lg">SAAT</span>
                        <span className="text-xs opacity-70">Kol saati, akıllı saat vb.</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleProductTypeChange('eyewear')}
                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                          formData.productType === 'eyewear' 
                            ? 'border-purple-500 bg-purple-500/20 text-purple-500' 
                            : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
                        }`}
                      >
                        <Glasses className="h-10 w-10" />
                        <span className="font-bold text-lg">GÖZLÜK</span>
                        <span className="text-xs opacity-70">Güneş gözlüğü, optik vb.</span>
                      </button>
                    </div>
                  </div>

                  {/* Kategori Seçimi - Ürün tipine göre değişir */}
                  <div>
                    <Label htmlFor="category" className="text-gray-300">
                      {formData.productType === 'watch' ? 'Saat Kategorisi' : 'Gözlük Kategorisi'} *
                    </Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                      <SelectTrigger className="bg-black/50 border-white/20 text-white">
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {(formData.productType === 'watch' ? WATCH_CATEGORIES : EYEWEAR_CATEGORIES).map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name" className="text-gray-300">Ürün Adı *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder={formData.productType === 'watch' ? 'Örn: Rolex Submariner' : 'Örn: Ray-Ban Aviator'}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">Açıklama *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      placeholder="Ürün hakkında detaylı bilgi..."
                      rows={3}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-gray-300">Fiyat (₺) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        placeholder="0.00"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock" className="text-gray-300">Stok Adedi *</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        placeholder="0"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="imageFile" className="text-gray-300">Ürün Görseli *</Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploadingImage}
                      className="cursor-pointer bg-black/50 border-white/20 text-white file:bg-amber-500 file:text-black file:border-0 file:rounded file:mr-3"
                    />
                    {uploadingImage && (
                      <p className="text-sm text-amber-500 mt-1 animate-pulse">Görsel yükleniyor...</p>
                    )}
                  </div>

                  {imagePreview && (
                    <div>
                      <Label className="text-gray-300">Görsel Önizleme</Label>
                      <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-white/20" />
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      className={`flex-1 ${
                        formData.productType === 'watch' 
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      } text-white font-bold`}
                    >
                      {editingProduct ? 'Güncelle' : (formData.productType === 'watch' ? 'Saat Ekle' : 'Gözlük Ekle')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1 border-white/20 text-gray-300"
                    >
                      İptal
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Button onClick={handleLogout} variant="destructive">
              Çıkış Yap
            </Button>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Ürün ara... (isim, açıklama, kategori)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <Card className="p-12 text-center bg-white/5 border-white/10">
            <Package className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchQuery ? 'Arama sonucu bulunamadı' : filterType === 'all' ? 'Henüz ürün yok' : filterType === 'watch' ? 'Saat bulunamadı' : 'Gözlük bulunamadı'}
            </h3>
            <p className="text-gray-400 mb-4">
              {searchQuery ? `"${searchQuery}" için sonuç yok` : 'Yeni ürün ekleyerek başlayın'}
            </p>
          </Card>
        ) : (
          <>
            {/* Sayfa bilgisi */}
            <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
              <span>
                {filteredProducts.length} üründen {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} arası gösteriliyor
              </span>
              <span>Sayfa {currentPage} / {totalPages}</span>
            </div>

            <div className="grid gap-4">
              {paginatedProducts.map((product) => {
                const isEyewear = product.productType === 'eyewear' || product.category === 'Gözlük';
                return (
                  <Card key={product.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-white">{product.name}</h3>
                          <Badge className={isEyewear ? 'bg-purple-500 text-white' : 'bg-amber-500 text-black'}>
                            {isEyewear ? (
                              <><Glasses className="h-3 w-3 mr-1" /> Gözlük</>
                            ) : (
                              <><Clock className="h-3 w-3 mr-1" /> Saat</>
                            )}
                          </Badge>
                          <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                            {product.category}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="font-bold text-amber-500 text-lg">{formatPrice(product.price)} ₺</span>
                          <span className="text-gray-500">Stok: {product.stock}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          onClick={() => handleEdit(product)}
                          size="icon"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Önceki
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page 
                      ? 'bg-amber-500 text-black hover:bg-amber-600 min-w-[40px]' 
                      : 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700 min-w-[40px]'}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
              >
                Sonraki
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
        )}
      </main>
    </div>
  );
}
