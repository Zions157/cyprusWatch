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
import { useLanguage } from '@/lib/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
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
        setError(data.error || t('common.error'));
      }
    } catch (error) {
      setError(t('common.error') + ': ' + error.message);
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
        setSuccess(t('login.registerSuccess'));
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError(data.error || t('common.error'));
      }
    } catch (error) {
      setError(t('common.error') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('login.welcome')}</h1>
            <p className="text-gray-600">{t('login.welcomeDesc')}</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#006039] data-[state=active]:text-white">
                <LogIn className="h-4 w-4 mr-2" />
                {t('login.login')}
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-[#006039] data-[state=active]:text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                {t('login.register')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">{t('login.loginTitle')}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {t('login.loginDesc')}
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
                      <Label htmlFor="login-email" className="text-gray-700">
                        <Mail className="h-4 w-4 inline mr-2" />
                        {t('login.email')}
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                        placeholder="example@email.com"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="login-password" className="text-gray-700">
                        <Lock className="h-4 w-4 inline mr-2" />
                        {t('login.password')}
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#006039] hover:bg-[#004d2d] text-white font-bold"
                    >
                      {loading ? t('login.loggingIn') : t('login.login')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">{t('login.registerTitle')}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {t('login.registerDesc')}
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
                      <Alert className="bg-green-50 border-green-500 text-green-700">
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div>
                      <Label htmlFor="register-fullName" className="text-gray-700">
                        <User className="h-4 w-4 inline mr-2" />
                        {t('login.fullName')} *
                      </Label>
                      <Input
                        id="register-fullName"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        required
                        placeholder={t('login.fullName')}
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-email" className="text-gray-700">
                        <Mail className="h-4 w-4 inline mr-2" />
                        {t('login.email')} *
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                        placeholder="example@email.com"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-password" className="text-gray-700">
                        <Lock className="h-4 w-4 inline mr-2" />
                        {t('login.password')} *
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        minLength={6}
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-phone" className="text-gray-700">
                        <Phone className="h-4 w-4 inline mr-2" />
                        {t('login.phone')}
                      </Label>
                      <Input
                        id="register-phone"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        placeholder="0555 555 55 55"
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>

                    <div>
                      <Label htmlFor="register-address" className="text-gray-700">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        {t('login.address')}
                      </Label>
                      <Input
                        id="register-address"
                        value={registerForm.address}
                        onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                        placeholder={t('login.deliveryAddress')}
                        className="bg-gray-50 border-gray-300 text-gray-900"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#006039] hover:bg-[#004d2d] text-white font-bold"
                    >
                      {loading ? t('login.registering') : t('login.register')}
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
              className="text-gray-600 hover:text-gray-900"
            >
              {t('login.goHome')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
