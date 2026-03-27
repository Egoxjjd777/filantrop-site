import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AccessibilityProvider } from '@/context/AccessibilityContext';

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'БФ «Филантроп» — Поддержка людей с инвалидностью в сфере культуры и искусства',
  description: 'Благотворительный фонд «Филантроп» поддерживает людей с инвалидностью в сфере культуры и искусства, способствуя их реабилитации и социальной интеграции через творчество.',
  keywords: ['благотворительный фонд', 'филантроп', 'инвалидность', 'культура', 'искусство', 'премия', 'реабилитация'],
  authors: [{ name: 'БФ Филантроп' }],
  openGraph: {
    title: 'БФ «Филантроп» — Поддержка людей с инвалидностью',
    description: 'Благотворительный фонд «Филантроп» поддерживает людей с инвалидностью в сфере культуры и искусства.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'БФ Филантроп',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'БФ «Филантроп»',
    description: 'Поддержка людей с инвалидностью в сфере культуры и искусства',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-primary antialiased">
        <AccessibilityProvider>
          <a href="#main-content" className="skip-link">
            Перейти к основному контенту
          </a>
          <Header />
          {children}
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
