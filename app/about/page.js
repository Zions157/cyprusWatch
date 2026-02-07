'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Package, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">E-Ticaret Mağazam</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.push('/')}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Ana Sayfaya Dön
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hakkımızda</h2>
            <p className="text-xl text-gray-600">Kaliteli ürünleri en uygun fiyatlarla sunuyoruz</p>
          </div>

          {/* Hikayemiz */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hikayemiz</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                E-Ticaret Mağazam, 2024 yılında müşterilerimize en iyi alışveriş deneyimini sunmak amacıyla kuruldu. 
                Kaliteli ürünleri, uygun fiyatlarla ve hızlı teslimatla bir araya getirerek sektörde fark yaratmayı hedefliyoruz.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Müşteri memnuniyetini her zaman ön planda tutarak, güvenilir ve kaliteli hizmet sunmaya devam ediyoruz. 
                Geniş ürün yelpazemiz ve kolay kullanımlı platformumuz ile alışverişi daha keyifli hale getiriyoruz.
              </p>
            </CardContent>
          </Card>

          {/* Değerlerimiz */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Değerlerimiz</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Kalite</h4>
                  <p className="text-gray-600 text-sm">
                    Sadece kaliteli ve güvenilir ürünleri müşterilerimize sunuyoruz.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Hız</h4>
                  <p className="text-gray-600 text-sm">
                    Hızlı kargo ve teslimat ile ürünleriniz kısa sürede elinizde.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Destek</h4>
                  <p className="text-gray-600 text-sm">
                    7/24 müşteri desteği ile her zaman yanınızdayız.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Bize Ulaşın</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Adres</h4>
                    <p className="text-gray-600">
                      Örnek Mahallesi, E-Ticaret Caddesi No:123<br />
                      34000 İstanbul, Türkiye
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefon</h4>
                    <p className="text-gray-600">+90 (555) 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">E-posta</h4>
                    <p className="text-gray-600">info@eticaretmagazam.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Çalışma Saatleri</h4>
                    <p className="text-gray-600">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 10:00 - 16:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Hemen Alışverişe Başlayın!</h3>
              <p className="text-indigo-100 mb-6">
                Binlerce ürün arasından size en uygun olanları bulun
              </p>
              <Button
                onClick={() => router.push('/')}
                variant="secondary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Ürünleri Keşfedin
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2024 E-Ticaret Mağazam. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}