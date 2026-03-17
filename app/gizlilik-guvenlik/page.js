'use client';

import Navbar from '@/components/Navbar';
import { Lock } from 'lucide-react';

export default function GizlilikGuvenlikPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Lock className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Gizlilik ve Güvenlik</h1>
              <p className="text-gray-500">Verilerinizin güvenliği bizim için önemli</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          {/* İÇERİK BURAYA EKLENECEK */}
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Gizlilik Politikası</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya gizlilik politikanızı yazın. Kullanıcı verilerinin nasıl toplandığını ve kullanıldığını açıklayın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Veri Güvenliği</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya veri güvenliği önlemlerinizi yazın. SSL şifreleme, güvenli ödeme sistemleri vb.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ödeme Güvenliği</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya ödeme güvenliği ile ilgili bilgileri yazın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              Gizlilik ve güvenlik ile ilgili sorularınız için:<br />
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
