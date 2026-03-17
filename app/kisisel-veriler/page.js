'use client';

import Navbar from '@/components/Navbar';
import { FileText } from 'lucide-react';

export default function KisiselVerilerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <FileText className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Kişisel Verilerin İşlenmesi</h1>
              <p className="text-gray-500">KVKK kapsamında aydınlatma metni</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          {/* İÇERİK BURAYA EKLENECEK */}
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Veri Sorumlusu</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya veri sorumlusu bilgilerini yazın. Şirket adı, adresi ve iletişim bilgileri.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. İşlenen Kişisel Veriler</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya hangi kişisel verilerin işlendiğini yazın. Ad, soyad, e-posta, telefon, adres vb.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Verilerin İşlenme Amacı</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya verilerin hangi amaçlarla işlendiğini yazın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Veri Saklama Süresi</h2>
            <p className="text-gray-600 leading-relaxed">
              Buraya verilerin ne kadar süre saklanacağını yazın.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Haklarınız</h2>
            <p className="text-gray-600 leading-relaxed">
              KVKK kapsamındaki haklarınızı buraya yazın. Bilgi edinme, düzeltme, silme hakları vb.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. İletişim</h2>
            <p className="text-gray-600 leading-relaxed">
              Kişisel verileriniz ile ilgili sorularınız için:<br />
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
