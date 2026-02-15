'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Clock, Glasses, Info, Phone, ShoppingCart, Menu, User, LogOut, Heart, Package, Gem, ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Dropdown menü olan kategoriler
const categoryDropdowns = {
  watches: {
    name: 'Saatler',
    href: '/watches',
    icon: Clock,
    subItems: [
      { name: 'Tüm Saatler', href: '/watches' },
      { name: 'Erkek Saatleri', href: '/watches?gender=male' },
      { name: 'Kadın Saatleri', href: '/watches?gender=female' },
    ]
  },
  eyewear: {
    name: 'Gözlükler',
    href: '/eyewear',
    icon: Glasses,
    subItems: [
      { name: 'Tüm Gözlükler', href: '/eyewear' },
      { name: 'Erkek Gözlükleri', href: '/eyewear?gender=male' },
      { name: 'Kadın Gözlükleri', href: '/eyewear?gender=female' },
    ]
  },
  eta: {
    name: 'ETA',
    href: '/eta',
    icon: Gem,
    subItems: [
      { name: 'Tüm ETA', href: '/eta' },
      { name: 'Erkek ETA', href: '/eta?gender=male' },
      { name: 'Kadın ETA', href: '/eta?gender=female' },
    ]
  }
};

const simpleNavItems = [
  { name: 'Anasayfa', href: '/', icon: Home },
  { name: 'Hakkımızda', href: '/about', icon: Info },
  { name: 'İletişim', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

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

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black/80 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Logo size={32} className="group-hover:scale-105 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
              Cyprus Watch
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
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Anasayfa</span>
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
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                      <ChevronDown className="h-3 w-3 ml-1 transition-transform group-hover:rotate-180" />
                    </Button>
                  </Link>
                  
                  {/* Hover Dropdown */}
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {category.subItems.map((subItem) => (
                        <Link key={subItem.href} href={subItem.href}>
                          <div className="px-4 py-2 text-gray-300 hover:text-white hover:bg-amber-500/20 transition-colors cursor-pointer">
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
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Info className="h-4 w-4" />
                <span>Hakkımızda</span>
              </Button>
            </Link>

            {/* İletişim - Simple link */}
            <Link href="/contact">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 text-base font-medium px-4 py-2 ${
                  pathname === '/contact'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>İletişim</span>
              </Button>
            </Link>
          </nav>

          {/* Cart & User Menu */}
          <div className="flex items-center space-x-3">
            {/* User Menu or Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                    <User className="h-5 w-5 mr-2" />
                    <span className="hidden md:inline">{user.fullName?.split(' ')[0] || 'Hesabım'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 border-white/20">
                  <DropdownMenuLabel className="text-white">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer">
                    <Package className="h-4 w-4 mr-2" />
                    Siparişlerim
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorilerim
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profil Ayarları
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => router.push('/login')}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <User className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Giriş Yap</span>
              </Button>
            )}

            <Link href="/cart">
              <Button className="relative bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-black border-l border-amber-500/20">
                <div className="flex flex-col space-y-2 mt-8">
                  {/* Anasayfa */}
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start space-x-3 ${
                        pathname === '/'
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Home className="h-5 w-5" />
                      <span>Anasayfa</span>
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
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                                : 'text-gray-300 hover:text-white hover:bg-white/10'
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
                                className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10"
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
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Info className="h-5 w-5" />
                      <span>Hakkımızda</span>
                    </Button>
                  </Link>

                  {/* İletişim */}
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start space-x-3 ${
                        pathname === '/contact'
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Phone className="h-5 w-5" />
                      <span>İletişim</span>
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
