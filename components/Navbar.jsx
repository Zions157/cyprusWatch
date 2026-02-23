'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Home, Clock, Glasses, Info, Phone, ShoppingCart, Menu, User, LogOut, Heart, Package, Gem, ChevronDown, Search, X, Globe } from 'lucide-react';
import Logo from '@/components/Logo';
import { useLanguage } from '@/lib/LanguageContext';
import { languageFlags } from '@/lib/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, changeLanguage, t } = useLanguage();
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Dropdown menü olan kategoriler - with translations
  const categoryDropdowns = {
    watches: {
      name: t('nav.watches'),
      href: '/watches',
      icon: Clock,
      subItems: [
        { name: t('nav.allWatches'), href: '/watches' },
        { name: t('nav.menWatches'), href: '/watches?gender=male' },
        { name: t('nav.womenWatches'), href: '/watches?gender=female' },
      ]
    },
    eyewear: {
      name: t('nav.eyewear'),
      href: '/eyewear',
      icon: Glasses,
      subItems: [
        { name: t('nav.allEyewear'), href: '/eyewear' },
        { name: t('nav.menEyewear'), href: '/eyewear?gender=male' },
        { name: t('nav.womenEyewear'), href: '/eyewear?gender=female' },
      ]
    },
    eta: {
      name: t('nav.eta'),
      href: '/eta',
      icon: Gem,
      subItems: [
        { name: t('nav.allEta'), href: '/eta' },
        { name: t('nav.menEta'), href: '/eta?gender=male' },
        { name: t('nav.womenEta'), href: '/eta?gender=female' },
      ]
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleStorageChange = () => {
      const updatedCart = localStorage.getItem('cart');
      if (updatedCart) {
        setCart(JSON.parse(updatedCart));
      }
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      const updatedCart = localStorage.getItem('cart');
      if (updatedCart) {
        setCart(JSON.parse(updatedCart));
      }
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (error) {
      console.error('Arama hatası:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/product/${productId}`);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Available languages
  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#006039]/95 backdrop-blur-md shadow-lg' : 'bg-[#006039]'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo size={36} className="group-hover:scale-105 transition-transform" />
              <span className="text-xl font-semibold text-white tracking-widest font-[family-name:var(--font-playfair)]" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.15em' }}>
                CYPRUS WATCH
              </span>
            </Link>

            {/* Desktop Navigation - with hover dropdowns */}
            <nav className="hidden md:flex items-center space-x-1 ml-8 flex-1">
              {/* Anasayfa - Simple link */}
              <Link href="/">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 text-base font-medium px-4 py-2 ${
                    pathname === '/'
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>{t('nav.home')}</span>
                </Button>
              </Link>

              {/* Category Dropdowns */}
              {Object.entries(categoryDropdowns).map(([key, category]) => {
                const Icon = category.icon;
                const isActive = pathname === category.href || pathname.startsWith(category.href);
                return (
                  <div key={key} className="relative group">
                    <Link href={category.href}>
                      <Button
                        variant="ghost"
                        className={`flex items-center space-x-2 text-base font-medium px-4 py-2 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{category.name}</span>
                        <ChevronDown className="h-3 w-3 ml-1 transition-transform group-hover:rotate-180" />
                      </Button>
                    </Link>
                    
                    {/* Hover Dropdown */}
                    <div className="absolute top-full left-0 mt-1 w-48 bg-[#006039] border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {category.subItems.map((subItem) => (
                          <Link key={subItem.href} href={subItem.href}>
                            <div className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                              {subItem.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Hakkımızda - Simple link */}
              <Link href="/about">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 text-base font-medium px-4 py-2 ${
                    pathname === '/about'
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Info className="h-4 w-4" />
                  <span>{t('nav.about')}</span>
                </Button>
              </Link>

              {/* İletişim - Simple link */}
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 text-base font-medium px-4 py-2 ${
                    pathname === '/contact'
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  <span>{t('nav.contact')}</span>
                </Button>
              </Link>
            </nav>

            {/* Language, Search, Cart & User Menu */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white hover:bg-white/10 px-2"
                  >
                    <span className="text-lg mr-1">{currentLang.flag}</span>
                    <span className="hidden sm:inline text-sm">{currentLang.code.toUpperCase()}</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-[#006039] border-white/20">
                  <DropdownMenuLabel className="text-white/60 text-xs">
                    {t('nav.search') === 'Search' ? 'Select Language' : 
                     t('nav.search') === 'Αναζήτηση' ? 'Επιλέξτε γλώσσα' :
                     t('nav.search') === 'Поиск' ? 'Выберите язык' : 'Dil Seçin'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/20" />
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`text-white/80 hover:text-white hover:bg-white/10 cursor-pointer ${
                        language === lang.code ? 'bg-white/10 text-white' : ''
                      }`}
                    >
                      <span className="text-lg mr-2">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search Button */}
              <Button
                onClick={() => setSearchOpen(true)}
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User Menu or Login Button */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                      <User className="h-5 w-5 mr-2" />
                      <span className="hidden md:inline">{user.fullName?.split(' ')[0] || t('nav.myAccount')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[#006039] border-white/20">
                    <DropdownMenuLabel className="text-white">{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer">
                      <Package className="h-4 w-4 mr-2" />
                      {t('nav.myOrders')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer">
                      <Heart className="h-4 w-4 mr-2" />
                      {t('nav.myFavorites')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      {t('nav.profileSettings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-300 hover:text-red-200 hover:bg-red-500/20 cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => router.push('/login')}
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  <User className="h-5 w-5 md:mr-2" />
                  <span className="hidden md:inline">{t('nav.login')}</span>
                </Button>
              )}

              <Link href="/cart">
                <Button className="relative bg-white text-[#006039] hover:bg-white/90">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white px-2 py-1 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon" className="border-white bg-white text-[#006039] hover:bg-gray-100">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-[#006039] border-l border-white/20">
                  <div className="flex flex-col space-y-2 mt-8">
                    {/* Mobile Language Selector */}
                    <div className="flex items-center justify-between px-3 py-2 mb-2">
                      <span className="text-white/60 text-sm">
                        {t('nav.search') === 'Search' ? 'Language' : 
                         t('nav.search') === 'Αναζήτηση' ? 'Γλώσσα' :
                         t('nav.search') === 'Поиск' ? 'Язык' : 'Dil'}
                      </span>
                      <div className="flex gap-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`text-xl p-1 rounded transition-all ${
                              language === lang.code 
                                ? 'bg-white/20 scale-110' 
                                : 'opacity-60 hover:opacity-100'
                            }`}
                            title={lang.name}
                          >
                            {lang.flag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Search */}
                    <Button
                      onClick={() => { setIsOpen(false); setSearchOpen(true); }}
                      variant="ghost"
                      className="w-full justify-start space-x-3 text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <Search className="h-5 w-5" />
                      <span>{t('nav.search')}</span>
                    </Button>

                    {/* Anasayfa */}
                    <Link href="/" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start space-x-3 ${
                          pathname === '/'
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Home className="h-5 w-5" />
                        <span>{t('nav.home')}</span>
                      </Button>
                    </Link>

                    {/* Category Items with Sub-links */}
                    {Object.entries(categoryDropdowns).map(([key, category]) => {
                      const Icon = category.icon;
                      return (
                        <div key={key} className="space-y-1">
                          <Link href={category.href} onClick={() => setIsOpen(false)}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start space-x-3 ${
                                pathname === category.href
                                  ? 'bg-white/20 text-white'
                                  : 'text-white/80 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              <span>{category.name}</span>
                            </Button>
                          </Link>
                          <div className="pl-8 space-y-1">
                            {category.subItems.slice(1).map((subItem) => (
                              <Link key={subItem.href} href={subItem.href} onClick={() => setIsOpen(false)}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10"
                                >
                                  <span>{subItem.name}</span>
                                </Button>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {/* Hakkımızda */}
                    <Link href="/about" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start space-x-3 ${
                          pathname === '/about'
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Info className="h-5 w-5" />
                        <span>{t('nav.about')}</span>
                      </Button>
                    </Link>

                    {/* İletişim */}
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start space-x-3 ${
                          pathname === '/contact'
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Phone className="h-5 w-5" />
                        <span>{t('nav.contact')}</span>
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{t('nav.searchTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t('nav.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-300 text-gray-900"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {searchLoading && (
              <div className="text-center py-4 text-gray-500">{t('common.loading')}</div>
            )}

            {!searchLoading && searchResults.length > 0 && (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-[#006039] font-bold">
                      {new Intl.NumberFormat('tr-TR').format(product.price)} ₺
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!searchLoading && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                "{searchQuery}" {t('nav.noResults')}
              </div>
            )}

            {!searchLoading && searchQuery.length < 2 && searchQuery.length > 0 && (
              <div className="text-center py-4 text-gray-500">
                {t('nav.minChars')}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
