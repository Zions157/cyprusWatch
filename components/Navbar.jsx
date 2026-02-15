'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Clock, Glasses, Info, Phone, ShoppingCart, Menu, User, LogOut, Heart, Package } from 'lucide-react';
import Logo from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { name: 'Anasayfa', href: '/', icon: Home },
  { name: 'Saatler', href: '/watches', icon: Clock },
  { name: 'Gözlükler', href: '/eyewear', icon: Glasses },
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
            <span className="text-lg font-semibold text-white">Cyprus Watch</span>
          </Link>

          {/* Desktop Navigation - Moved left */}
          <nav className="hidden md:flex items-center space-x-1 ml-8 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 text-base font-medium px-4 py-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-3">
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
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-start space-x-3 ${
                            isActive
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
