'use client';

import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Globe, Shield, Star, Clock } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Mutlu Müşteri' },
    { icon: Clock, value: '15+', label: 'Yıllık Tecrübe' },
    { icon: Globe, value: '50+', label: 'Ülkeye Gönderim' },
    { icon: Award, value: '100+', label: 'Marka' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Güvenilirlik',
      description: 'Tüm saatlerimiz %100 orijinal ve garantilidir.',
    },
    {
      icon: Star,
      title: 'Kalite',
      description: 'Dünyanın en prestijli markalarını sizler için bir araya getiriyoruz.',
    },
    {
      icon: Users,
      title: 'Müşteri Odaklılık',
      description: 'Satış öncesi ve sonrası profesyonel destek ekibimizle her zaman yanınızdayız.',
    },
    {
      icon: Globe,
      title: 'Global Hizmet',
      description: 'Dünya genelinde 50den fazla ülkeye güvenli ve hızlı kargo imkanı sunuyoruz.',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Hakkımızda</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Cyprus Watch olarak 15 yılı aşkın tecrübemizle lüks saat ve gözlük sektöründe 
            güvenilir ve kaliteli hizmet sunmaya devam ediyoruz.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-br from-amber-500 to-yellow-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-black" />
                  </div>
                  <div className="text-3xl font-bold text-amber-500 mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Hikayemiz</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  2010 yılında Kıbrıs'ta küçük bir saat dükkânı olarak başlayan yolculuğumuz, 
                  bugün binlerce müşteriye hizmet veren köklü bir markaya dönüştü.
                </p>
                <p>
                  Saat ve gözlük tutkunları için en iyi ürünleri en uygun fiyatlarla sunma 
                  vizyonuyla yola çıktık. Yıllar içinde koleksiyonumuzu genişleterek 
                  dünyanın en prestijli markalarını müşterilerimizle buluşturduk.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl p-8 text-black">
                <h3 className="text-2xl font-bold mb-4">Vizyonumuz</h3>
                <p className="mb-6 opacity-90">
                  Akdeniz'in en güvenilir lüks saat ve gözlük satıcısı olmak.
                </p>
                <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
                <p className="opacity-90">
                  Orijinal ve kaliteli ürünleri rekabetçi fiyatlarla sunarak, 
                  müşteri memnuniyetini en üst düzeyde tutmak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Değerlerimiz</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Müşterilerimize en iyi hizmeti sunmak için benimsediğimiz temel değerler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-white/5 border-white/10 hover:border-amber-500/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-amber-500 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
