import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';
import { LanguageProvider } from '@/lib/LanguageContext';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
});

export const metadata = {
  title: 'Cyprus Watch - Luxury Watches',
  description: 'Premium luxury watches and accessories - Your destination for authentic timepieces',
  keywords: 'luxury watches, premium watches, Cyprus Watch, saatler, lüks saatler',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} ${playfair.variable}`}>
        <LanguageProvider>
          {children}
          <WhatsAppButton phoneNumber="905428572726" />
        </LanguageProvider>
      </body>
    </html>
  );
}