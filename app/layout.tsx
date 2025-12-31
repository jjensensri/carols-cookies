import '@lib/startup';
import '@styles/globals.scss';

import type { Metadata } from 'next';
import { Palanquin, Calistoga } from 'next/font/google';
import { ReactNode } from 'react';

import { CheckoutProvider } from '@app/checkout-context';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { baseUrl } from '@utils/utils';
import data from '@data/woocommerce.json';

const { NEXT_PUBLIC_SITE_NAME } = process.env;

// Font
const calistoga = Calistoga({
  variable: '--font-calistoga',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});
const palanquin = Palanquin({
  variable: '--font-palanquin',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: NEXT_PUBLIC_SITE_NAME!,
    template: `%s | ${NEXT_PUBLIC_SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // todo: fetch data from WooCommerce postMessage

  return (
    <html lang="en" className={`${calistoga.variable} ${palanquin.variable}`}>
      <head>
        <script async src="https://javelin.runpayments.io/javascripts/latest/runner.js"></script>
      </head>
      <body className="page-wrapper">
        <CheckoutProvider data={data}>
          <Header />
          {children}
          <Footer />
        </CheckoutProvider>
      </body>
    </html>
  );
}
