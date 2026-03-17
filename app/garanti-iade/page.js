'use client';

import Navbar from '@/components/Navbar';
import { Shield } from 'lucide-react';

export default function GarantiIadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Garanti ve İade Koşulları</h1>
              <p className="text-gray-500">Ürün garantisi ve iade politikamız</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          {/* İÇERİK BURAYA EKLENECEK */}
          {/* Aşağıdaki metinleri kendi içeriğinizle değiştirin */}
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Garanti Kapsamı</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya garanti kapsamı ile ilgili bilgileri yazın. Hangi ürünlerin garanti kapsamında olduğunu, garanti süresini ve koşullarını belirtin.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. İade Koşulları</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya iade koşullarını yazın. Hangi durumlarda iade kabul edildiğini, iade süresi ve prosedürünü açıklayın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Değişim Politikası</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya ürün değişim politikanızı yazın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              Garanti ve iade ile ilgili sorularınız için bizimle iletişime geçin:<br />
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
