'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Lock, Phone, MapPin, LogIn, UserPlus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Giriş başarısız');
      }
    } catch (error) {
      setError('Bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess('Kayıt başarılı! Yönlendiriliyorsunuz...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError(data.error || 'Kayıt başarısız');
      }
    } catch (error) {
      setError('Bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Hoş Geldiniz</h1>
            <p className="text-gray-400">Hesabınıza giriş yapın veya yeni hesap oluşturun</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="login" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <LogIn className="h-4 w-4 mr-2" />
                Giriş Yap
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <UserPlus className="h-4 w-4 mr-2" />
                Kayıt Ol
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-gray-900 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Giriş Yap</CardTitle>
                  <CardDescription className="text-gray-400">
                    Hesabınıza giriş yaparak siparişlerinizi takip edin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div>
                      <Label htmlFor="login-email" className="text-gray-300">
                        <Mail className="h-4 w-4 inline mr-2" />
                        E-posta
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                        placeholder="ornek@email.com"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password" className="text-gray-300">
                        <Lock className="h-4 w-4 inline mr-2" />
                        Şifre
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold"
                    >
                      {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="bg-gray-900 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Kayıt Ol</CardTitle>
                  <CardDescription className="text-gray-400">
                    Yeni hesap oluşturarak alışverişe başlayın
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    {success && (
                      <Alert className="bg-green-500/20 border-green-500 text-green-500">
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div>
                      <Label htmlFor="register-fullName" className="text-gray-300">
                        <User className="h-4 w-4 inline mr-2" />
                        Ad Soyad *
                      </Label>
                      <Input
                        id="register-fullName"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        required
                        placeholder="Adınız ve soyadınız"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-email" className="text-gray-300">
                        <Mail className="h-4 w-4 inline mr-2" />
                        E-posta *
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                        placeholder="ornek@email.com"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-password" className="text-gray-300">
                        <Lock className="h-4 w-4 inline mr-2" />
                        Şifre *
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        minLength={6}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-phone" className="text-gray-300">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Telefon
                      </Label>
                      <Input
                        id="register-phone"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        placeholder="0555 555 55 55"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-address" className="text-gray-300">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Adres
                      </Label>
                      <Input
                        id="register-address"
                        value={registerForm.address}
                        onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                        placeholder="Teslimat adresiniz"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold"
                    >
                      {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button
              onClick={() => router.push('/')}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
