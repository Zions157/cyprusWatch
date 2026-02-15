'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ShoppingCart, Search, Filter, SlidersHorizontal, X, Gem } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function ETAPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

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
      // Filter only watch products using productType
      const watchProducts = (Array.isArray(data) ? data : []).filter(
        p => p.productType === 'watch' || (!p.productType && p.category !== 'Gözlük')
      );
      setProducts(watchProducts);
    } catch (error) {
      console.error('Ürünler yüklenemedi:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
    return ['all', ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    // Saatleri filtrele
    let result = products.filter(p => 
      p.productType === 'watch' || (!p.productType && p.category !== 'Gözlük')
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (genderFilter !== 'all') {
      result = result.filter(p => p.gender === genderFilter || p.gender === 'unisex');
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'name-desc':
        result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('default');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || sortBy !== 'default';

  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        items.push(1, 2, 3, 4, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        items.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Page Header */}
      <div className="pt-24 pb-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Clock className="h-10 w-10 text-amber-500" />
            <div>
              <h1 className="text-4xl font-bold text-white">Saatler</h1>
              <p className="text-gray-400">Lüks saat koleksiyonumuzu keşfedin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Saat ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-black/50 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Filter className="h-5 w-5 text-gray-400" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-[180px] bg-black/50 border-white/20 text-white">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'Tüm Kategoriler' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Filter className="h-5 w-5 text-gray-400" />
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full lg:w-[150px] bg-black/50 border-white/20 text-white">
                  <SelectValue placeholder="Cinsiyet" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="male">Erkek</SelectItem>
                  <SelectItem value="female">Kadın</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <SlidersHorizontal className="h-5 w-5 text-gray-400" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[200px] bg-black/50 border-white/20 text-white">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="default">Varsayılan</SelectItem>
                  <SelectItem value="price-asc">Fiyat: Düşükten Yükseğe</SelectItem>
                  <SelectItem value="price-desc">Fiyat: Yüksekten Düşüğe</SelectItem>
                  <SelectItem value="name-asc">İsim: A-Z</SelectItem>
                  <SelectItem value="name-desc">İsim: Z-A</SelectItem>
                  <SelectItem value="newest">En Yeni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <X className="h-4 w-4 mr-1" />
                Temizle
              </Button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-400">
            <span>
              {filteredProducts.length} ürün bulundu
              {hasActiveFilters && ' (filtrelendi)'}
            </span>
            <span>
              Sayfa {currentPage} / {totalPages || 1}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-white/5 border-white/10">
                <CardHeader className="p-0">
                  <div className="h-48 bg-gray-700 rounded-t-lg"></div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white/5 border-white/10 hover:border-amber-500/50 transition-all duration-300 cursor-pointer group"
                >
                  <CardHeader className="p-0">
                    <div
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="relative h-44 bg-gray-800 rounded-t-lg overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.stock < 10 && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-xs">
                          Son {product.stock}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <CardTitle
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="text-sm font-semibold mb-1 line-clamp-1 text-white group-hover:text-amber-500 transition-colors"
                    >
                      {product.name}
                    </CardTitle>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-500">
                        {formatPrice(product.price)} ₺
                      </span>
                      <Badge variant="secondary" className="text-xs bg-white/10 text-gray-300">
                        {product.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      size="sm"
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black text-sm"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Sepete Ekle
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-gray-400 hover:text-white`}
                      />
                    </PaginationItem>

                    {getPaginationItems().map((item, index) => (
                      <PaginationItem key={index}>
                        {item === 'ellipsis' ? (
                          <PaginationEllipsis className="text-gray-400" />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(item);
                            }}
                            isActive={currentPage === item}
                            className={`cursor-pointer ${currentPage === item ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white'}`}
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-gray-400 hover:text-white`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-600 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-400 mb-4">Arama kriterlerinize uygun ürün bulunamadı.</p>
            <Button onClick={clearFilters} variant="outline" className="border-amber-500 text-amber-500">
              Filtreleri Temizle
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
