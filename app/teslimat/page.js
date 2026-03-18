'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PaymentMethods from '@/components/PaymentMethods';
import { Truck, ChevronDown, ChevronUp, Phone, Mail, Clock, MapPin, Package, AlertCircle } from 'lucide-react';

export default function TeslimatPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Ürünüm hangi zaman aralıklarında bana teslim edilir?',
      answer: 'Sipariş verdiğiniz ürün sipariş tarihinizden itibaren 1-5 iş günü içerisinde kargo firmasına teslim edilmektedir. Kargo firması siparişinizi bizden teslim aldıktan sonra en kısa sürede adresinize teslim edecektir.'
    },
    {
      question: 'Teslimat adresini ya da alıcı ismini değiştirebiliyor muyum?',
      answer: 'Bu gibi talepleriniz için hafta içi 09:00 - 17:00 arasında +90 542 857 27 26 numaralı Müşteri Hizmetleri hattımız ile görüşebilir veya info@cypruswatch.com adresi ile iletişime geçerek destek alabilirsiniz.'
    },
    {
      question: 'Hangi kargo şirketiyle çalışıyorsunuz?',
      answer: 'Siparişleriniz Yurtiçi Kargo ile teslim edilmektedir.'
    },
    {
      question: 'Siparişim ulaştığında belirtilen adreste olmadığım takdirde ne gibi bir durum ile karşılaşırım?',
      answer: 'Teslimat anında adreste bulunmadığınız takdirde kargonuz tarafımıza iade olarak geri dönmektedir.'
    },
    {
      question: 'Siparişimi mağazadan teslim almak için ne yapmalıyım?',
      answer: 'Size gelen "Siparişiniz Alındı" mailinden sonra seçtiğiniz mağazaya gidip, size mail ile iletilen online sipariş numarasını mağaza görevlisine belirterek siparişinizi mağazadan teslim alabilirsiniz.'
    },
    {
      question: 'Siparişim teslimat için mağazada kaç gün bekletilir?',
      answer: 'Mağazaya ulaşan siparişinizi 7 gün içerisinde almanız gerekmektedir.'
    },
    {
      question: 'Siparişimi mağazadan teslim alırken ürünlerim için hediye paketi yapılır mı?',
      answer: 'Mağazadan teslim aldığınız siparişiniz için hediye paketi ve hediye notu hazırlanır.'
    },
    {
      question: 'Siparişimdeki ürün hasarlı ise ne yapılır?',
      answer: 'Hasarlı gönderilen ürünler için, size ulaştığı günden itibaren 48 saat içerisinde iade talep formunu doldurarak talep oluşturmanız gerekmektedir. Gönder butonuna bastıktan sonra ekranda çıkan bilgilere göre hareket ediniz. 48 saat içerisinde talep oluşturulmayan veya gönderilmeyen ürün hasarlı olarak kabul edilmeyecektir. Ürünü iade ederken faturanızı pakete eklemeyi unutmayınız.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Truck className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Teslimat</h1>
              <p className="text-gray-500">Kargo ve teslimat bilgileri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <Package className="h-10 w-10 text-[#006039] mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Hızlı Teslimat</h3>
            <p className="text-gray-500 text-sm">1-5 iş günü içinde kargoya teslim</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <Truck className="h-10 w-10 text-[#006039] mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Yurtiçi Kargo</h3>
            <p className="text-gray-500 text-sm">Güvenilir kargo partneri</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <MapPin className="h-10 w-10 text-[#006039] mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Mağazadan Teslim</h3>
            <p className="text-gray-500 text-sm">Mağazadan teslim alma seçeneği</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sıkça Sorulan Sorular</h2>
          
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#006039] flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 bg-[#006039] rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">Başka Sorunuz mu Var?</h2>
              <p className="text-white/80">Müşteri hizmetlerimizle iletişime geçin</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+905428572726"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#006039] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                +90 542 857 27 26
              </a>
              <a
                href="mailto:info@cypruswatch.com"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                <Mail className="h-5 w-5" />
                E-posta Gönder
              </a>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-amber-800 text-sm">
              <strong>Önemli:</strong> Müşteri Hizmetleri hattımız hafta içi 09:00 - 17:00 saatleri arasında hizmet vermektedir.
            </div>
          </div>
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
