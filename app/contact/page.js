'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setLoading(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      content: '+90 533 123 4567',
      subContent: 'Pazartesi - Cumartesi: 09:00 - 18:00',
    },
    {
      icon: Mail,
      title: 'E-posta',
      content: 'info@cypruswatch.com',
      subContent: 'En geç 24 saat içinde yanıt',
    },
    {
      icon: MapPin,
      title: 'Adres',
      content: 'Ledra Caddesi No: 45',
      subContent: 'Lefkoşa, Kuzey Kıbrıs',
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      content: 'Pzt - Cum: 09:00 - 18:00',
      subContent: 'Cmt: 10:00 - 16:00 | Pazar: Kapalı',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">İletişim</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sorularınız için bize ulaşın. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Bize Ulaşın</h2>
            <p className="text-gray-400 mb-8">
              Cyprus Watch olarak müşteri memnuniyetini ön planda tutuyoruz. 
              Her türlü soru, öneri ve talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="bg-white/5 border-white/10 hover:border-amber-500/50 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{item.title}</h3>
                          <p className="text-amber-500 font-medium">{item.content}</p>
                          <p className="text-sm text-gray-500 mt-1">{item.subContent}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Mesaj Gönderin</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Mesajınız Alındı!
                    </h3>
                    <p className="text-gray-400">
                      En kısa sürede size dönüş yapacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Adınız Soyadınız
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Adınız Soyadınız"
                          className="bg-black/50 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          E-posta Adresiniz
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ornek@email.com"
                          className="bg-black/50 border-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Konu
                      </label>
                      <Input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Mesajınızın konusu"
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Mesajınız
                      </label>
                      <Textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Mesajınızı buraya yazın..."
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
                      size="lg"
                    >
                      {loading ? (
                        <span>Gönderiliyor...</span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Send className="h-5 w-5 mr-2" />
                          Mesaj Gönder
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2026 Cyprus Watch. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
