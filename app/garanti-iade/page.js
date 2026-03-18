'use client';

import Navbar from '@/components/Navbar';
import PaymentMethods from '@/components/PaymentMethods';
import { Shield, MapPin, Phone } from 'lucide-react';

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
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-4">Garanti Koşulları</h2>
            <p className="text-gray-600 leading-relaxed">
              Tüm ürünler distribütör firmaların garantisi altındadır. Garanti koşullarının geçerli olabilmesi için kargo teslimatı esnasında ürünü mutlaka kontrol ediniz. Herhangi bir hasar gördüğünüzde tutanak tutturarak ürünü teslim almayınız. Ürün üzerinde yapılan değişiklikler, ürünün deforme olması ya da ürünün orijinal dizaynının bozulması garanti kapsamı dışındadır.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#006039] mb-4">Ürün Değişim / İade Koşulları</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Sitemiz üzerinden satın aldığınız ürünün hatalı çıkması halinde; teslimat tarihinden itibaren en geç <strong>7 gün</strong> içerisinde sayfamızdaki iletişim bölümünden bizimle iletişim kurmanız gerekmektedir. Bu bilgileri takiben <strong>YURTİÇİ KARGO</strong> şirketi ile <strong>ALICI ÖDEMELİ/CYPRUSWATCH</strong> olarak bize ulaştıracağınız hatalı ürün talebinize ve stok/tedarik durumuna göre yenisi ile değiştirilecek yada iade alınacaktır.
              </p>
              <p>
                Sipariş edilen ürün hatası müşteri kullanımından oluşmuşsa veya <strong>14 günlük</strong> süre içerisinde ürün deneme haricinde kullanılmışsa ürünün iade ve değişimi yapılamaz. Ürün iadesi ve değiştirme şartları olarak, 4077 sayılı Tüketicinin Korunması Hakkında Kanun gereği uygulamalar esastır.
              </p>
              <p>
                Sitemiz üzerinden satın aldığınız üründe hata yoksa ve değişim yada iade talebinde bulunulursa; teslimat tarihinden itibaren en geç <strong>14 gün</strong> içerisinde sayfamızdaki iletişim bölümünden bizimle iletişim kurmanız gerekmektedir.
              </p>
              <p>
                Bu bilgileri takiben <strong>YURTİÇİ KARGO</strong> kargo şirketi ile <strong>GÖNDERİCİ PEŞİN ÖDEMELİ</strong> olarak <strong>KARGO ÜCRETİNİ ÖDEYEREK</strong> bize ulaştırabilirsiniz.
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-[#006039] mb-4">Kargo Gönderileriniz ve İade-Değişim İletişimi İçin Adres</h2>
            <p className="text-gray-600 mb-6">
              Geri göndereceğiniz ürünler için Kargo firmasına adresi aşağıdaki şekilde verebilirsiniz.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-6 w-6 text-[#006039] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                  <p className="text-gray-600">Fenerbahçe, Operatör Cemil Topuzlu Cd. No: 9 D:11A, 34726 Kadıköy/İstanbul</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-[#006039] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                  <p className="text-gray-600">+90 542 857 27 26</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>Önemli:</strong> Kargo gönderilerinize taleplerinizi, varsa sorunları, ad-soyad ve iletişim bilgilerinizi eklemeyi unutmayınız.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-900 py-8 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4">
          <PaymentMethods />
          <div className="text-center text-gray-500 mt-8">
            <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
