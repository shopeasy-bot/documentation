import { Analytics } from '@vercel/analytics/next';
import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { absoluteUrl, siteUrl } from '@/lib/site';
import { JsonLd } from '@/components/json-ld';
import { UserProvider } from '@/context/user';
import { CrispChat, HelpBubble } from '@/components/crisp';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ShopEasy - Bot vendas Gratis',
  description: 'Compre e venda produtos diretamente no Discord com segurança. Bot de vendas gratuito sem taxas ou burocracia. Ideal para ecommerce e serviços!',
  applicationName: 'ShopEasy',
  keywords: ['bot de vendas discord', 'ecommerce discord', 'vendas online', 'loja virtual discord', 'shop easy', 'shopeasybot', 'sistema de vendas', 'bot gratuito', 'serviços digitais'],
  authors: [{ name: 'Zyven Studio', url: absoluteUrl('/support') }],
  publisher: 'ShopEasy',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  metadataBase: new URL(siteUrl),

  icons: {
    icon: [
      { url: '/shopeasy.svg' },
    ],
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Bot de Vendas para Discord Gratuito | ShopEasy',
    description: 'Solução definitiva para automatizar suas vendas no Discord, com controle total, segurança e eficiência. Expanda seu negócio sem complicações.',
    siteName: 'ShopEasy',
    images: [{
      url: '/docs-og/image.png',
      width: 1430,
      height: 660,
      alt: 'ShopEasy - Bot de Vendas para Discord',
    }],
    locale: 'pt_BR',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Bot de Vendas para Discord Gratuito | ShopEasy',
    description: 'Monte sua loja virtual no Discord em minutos com o melhor sistema gratuito de vendas',
    images: ['/docs-og/image.png'],
  },

  alternates: {
    canonical: './',
    languages: {
      'pt-BR': './',
    },
    types: {
      'text/plain': absoluteUrl('/llms.txt'),
    },
  },
};

const organizationJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ShopEasy',
    url: siteUrl,
    logo: absoluteUrl('/shopeasy.svg'),
    foundingDate: '2023',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ShopEasy',
    url: siteUrl,
    inLanguage: 'pt-BR',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ShopEasy',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Discord',
    url: siteUrl,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" data-theme="dark" className={`${inter.className} dark`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <JsonLd data={organizationJsonLd} />
        <RootProvider    
           i18n={{
            locale: 'pt',
            translations: {
              toc: 'Índice',
              search: 'Pesquisar',
              lastUpdate: 'Última atualização',
              searchNoResult: 'Nenhum resultado',
              previousPage: 'Anterior',
              nextPage: 'Próximo',
              chooseLanguage: 'Escolher idioma'
            }
          }}
            theme={{
               defaultTheme: "dark",
               forcedTheme: "dark",
            }}>
              
            <UserProvider>
            {children}
            <CrispChat />
            <HelpBubble />
          </UserProvider>
               <Analytics />
            </RootProvider>
      </body>
    </html>
  );
}
