'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { HelpCircle, ChevronDown, ChevronUp, Phone, Mail, Truck, CreditCard, FileText, User } from 'lucide-react';

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    // Teslimat Soruları
    {
      category: 'Teslimat',
      question: 'Siparişimin teslimat adresini değiştirebilir miyim?',
      answer: 'Siparişiniz için adres değişikliği talepleriniz için hafta içi 09:00 - 17:00 arasında +90 542 857 27 26 numaralı Müşteri Hizmetleri hattımız ile görüşebilir veya info@cypruswatch.com adresi ile iletişime geçerek destek alabilirsiniz.'
    },
    {
      category: 'Teslimat',
      question: 'Siparişim ben adresimde yokken geldiğinde ne yapmalıyım?',
      answer: 'Kargo firması adresinizde bulunamamanız durumunda paketinizi en yakın şubeden alabileceğinizi bildiren bir not bırakır. 3 gün içerisinde paketinizi belirtilen şubeden almamanız durumunda siparişiniz iade adresimize iade edilmektedir.'
    },
    {
      category: 'Teslimat',
      question: 'Resmi tatil günlerinde teslimat yapılıyor mu?',
      answer: 'Teslimat süreçlerimizde kargo firmalarıyla iş birliği yapıyoruz. Resmi tatil günlerinde kargo firmalarının çalışması bulunmadığından dolayı tatil sonrasındaki ilk iş günü teslimat süreciniz ile ilgili aksiyon alınmaktadır.'
    },
    // Ödeme Soruları
    {
      category: 'Ödeme',
      question: 'Kapıda ödeme seçeneğiniz var mı?',
      answer: 'Kapıda ödeme seçeneğimiz maalesef bulunmamaktadır.'
    },
    {
      category: 'Ödeme',
      question: 'Havale yoluyla ödeme yapabiliyor muyum?',
      answer: 'Alışverişlerinizde Havale seçeneğini kullanabilirsiniz.'
    },
    {
      category: 'Ödeme',
      question: 'Aldığım ürünlerin fiyatlarına KDV dâhil midir?',
      answer: 'Tüm ürünlerin fiyatlarına KDV dahildir.'
    },
    // Fatura Soruları
    {
      category: 'Fatura',
      question: 'Faturamı yeniden gönderebilir misiniz?',
      answer: 'Sipariş numarası ve kullanıcı bilgileri info@cypruswatch.com adresine mail olarak iletilmesi halinde faturanız tarafınıza ulaşacaktır.'
    },
    // Üyelik Soruları
    {
      category: 'Üyelik',
      question: 'Üye olmak ücretli midir?',
      answer: 'CyprusWatch online alışveriş sitesine ücret ödemeden üye olabilirsiniz.'
    },
    {
      category: 'Üyelik',
      question: 'İletişim tercihlerimi nasıl değiştirebilirim?',
      answer: 'Kullanıcı girişi yapıldıktan sonra Üyelik Bilgilerim alanından tüm bilgilerinizi güncelleyebilirsiniz.'
    },
    {
      category: 'Üyelik',
      question: 'Adres bilgilerimi nasıl güncelleyebilirim?',
      answer: 'Adres bilgilerinizi Kullanıcı Giriş sayfasında yer alan Adreslerim kısmından güncelleyebilirsiniz.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Teslimat': return <Truck className="h-4 w-4" />;
      case 'Ödeme': return <CreditCard className="h-4 w-4" />;
      case 'Fatura': return <FileText className="h-4 w-4" />;
      case 'Üyelik': return <User className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Teslimat': return 'bg-blue-100 text-blue-700';
      case 'Ödeme': return 'bg-green-100 text-green-700';
      case 'Fatura': return 'bg-purple-100 text-purple-700';
      case 'Üyelik': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Sıkça Sorulan Sorular</h1>
              <p className="text-gray-500">En çok merak edilen sorular ve cevapları</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Summary */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Teslimat</h3>
            <p className="text-sm text-gray-500">3 Soru</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Ödeme</h3>
            <p className="text-sm text-gray-500">3 Soru</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Fatura</h3>
            <p className="text-sm text-gray-500">1 Soru</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <User className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Üyelik</h3>
            <p className="text-sm text-gray-500">3 Soru</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(faq.category)}`}>
                    {getCategoryIcon(faq.category)}
                    {faq.category}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#006039] flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 ml-0 md:ml-24">
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
              <h2 className="text-2xl font-bold text-white mb-2">Sorunuz mu var?</h2>
              <p className="text-white/80">Aradığınız cevabı bulamadıysanız bizimle iletişime geçin.</p>
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

        {/* Working Hours Note */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <HelpCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-amber-800 text-sm">
              <strong>Müşteri Hizmetleri:</strong> Hafta içi 09:00 - 17:00 saatleri arasında hizmet vermekteyiz.
            </div>
          </div>
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
