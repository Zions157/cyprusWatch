'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState(null);

  // SSS LİSTESİ - Buraya kendi sorularınızı ekleyin
  const faqs = [
    {
      question: 'Siparişim ne zaman teslim edilir?',
      answer: 'Buraya cevabı yazın. Teslimat süresi, kargo bilgileri vb.'
    },
    {
      question: 'Ödeme seçenekleri nelerdir?',
      answer: 'Buraya cevabı yazın. Kredi kartı, havale, kapıda ödeme vb.'
    },
    {
      question: 'Ürünler orijinal mi?',
      answer: 'Buraya cevabı yazın. Ürün orijinalliği garantisi hakkında bilgi.'
    },
    {
      question: 'İade ve değişim nasıl yapılır?',
      answer: 'Buraya cevabı yazın. İade prosedürü, süre ve koşullar.'
    },
    {
      question: 'Garanti süresi ne kadardır?',
      answer: 'Buraya cevabı yazın. Garanti kapsamı ve süresi hakkında bilgi.'
    },
    {
      question: 'Kargo ücreti ne kadar?',
      answer: 'Buraya cevabı yazın. Kargo ücretleri ve ücretsiz kargo limiti.'
    },
    {
      question: 'Siparişimi nasıl takip edebilirim?',
      answer: 'Buraya cevabı yazın. Sipariş takip yöntemleri.'
    },
    {
      question: 'Ürün fiyatlarına KDV dahil mi?',
      answer: 'Buraya cevabı yazın. Fiyatlandırma politikası.'
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
            <HelpCircle className="h-10 w-10 text-[#006039]" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Sıkça Sorulan Sorular</h1>
              <p className="text-gray-500">En çok merak edilen sorular ve cevapları</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
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
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#006039]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
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
        <div className="max-w-4xl mx-auto mt-12 bg-[#006039] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Sorunuz mu var?</h2>
          <p className="text-white/80 mb-4">Aradığınız cevabı bulamadıysanız bizimle iletişime geçin.</p>
          <a
            href="/contact"
            className="inline-block bg-white text-[#006039] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            İletişime Geç
          </a>
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
