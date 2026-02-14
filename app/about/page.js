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
      description: 'Tüm saatlerimiz %100 orijinal ve garantilidir. Sertifikalı ürünlerle güvenle alışveriş yapın.',
    },
    {
      icon: Star,
      title: 'Kalite',
      description: 'Dünyanın en prestijli saat markalarını sizler için bir araya getiriyoruz.',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Hakkımızda</h1>
          <p className="text-indigo-200 text-lg max-w-3xl mx-auto">
            Cyprus Watch olarak 15 yılı aşkın tecrübemizle lüks saat sektöründe 
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
              <Card key={index} className="bg-white shadow-xl border-0">
                <CardContent className="p-6 text-center">
                  <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  2010 yılında Kıbrıs'ta küçük bir saat dükkânı olarak başlayan yolculuğumuz, 
                  bugün binlerce müşteriye hizmet veren köklü bir markaya dönüştü.
                </p>
                <p>
                  Saat tutkunları için en iyi ürünleri en uygun fiyatlarla sunma 
                  vizyonuyla yola çıktık. Yıllar içinde koleksiyonumuzu genişleterek 
                  dünyanın en prestijli markalarını müşterilerimizle buluşturduk.
                </p>
                <p>
                  Cyprus Watch ailesi olarak her saatin bir hikaye taşıdığına inanıyoruz. 
                  Bu nedenle size sadece bir saat değil, zamansız bir değer sunuyoruz.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Vizyonumuz</h3>
                <p className="text-indigo-100 mb-6">
                  Akdeniz'in en güvenilir lüks saat satıcısı olmak ve müşterilerimize 
                  unutulmaz bir alışveriş deneyimi yaşatmak.
                </p>
                <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
                <p className="text-indigo-100">
                  Orijinal ve kaliteli saatleri rekabetçi fiyatlarla sunarak, 
                  müşteri memnuniyetini en üst düzeyde tutmak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Müşterilerimize en iyi hizmeti sunmak için benimsediğimiz temel değerler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Koleksiyonumuzu Keşfedin</h2>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Yüzlerce model arasından size en uygun saati bulun. 
              Ücretsiz kargo ve güvenli ödeme seçenekleriyle alışverişin keyfini çıkarın.
            </p>
            <a
              href="/watches"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Saatleri İncele
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
