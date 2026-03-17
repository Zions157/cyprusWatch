'use client';

import Navbar from '@/components/Navbar';
import { Cookie } from 'lucide-react';

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Cookie className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Çerez Politikası</h1>
              <p className="text-gray-500">Web sitemizde kullanılan çerezler hakkında</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          {/* İÇERİK BURAYA EKLENECEK */}
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Çerez Nedir?</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya çerezlerin ne olduğunu açıklayan bir metin yazın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Kullandığımız Çerez Türleri</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya kullandığınız çerez türlerini yazın:<br />
              - Zorunlu çerezler<br />
              - Performans çerezleri<br />
              - İşlevsellik çerezleri<br />
              - Hedefleme/reklam çerezleri
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya çerezlerin nasıl yönetileceğini ve devre dışı bırakılacağını yazın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              Çerez politikamız hakkında sorularınız için:<br />
              E-posta: info@cypruswatch.com<br />
              Telefon: +90 542 857 27 26
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-900 py-8 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
