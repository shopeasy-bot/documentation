import { Analytics } from '@vercel/analytics/next';
import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'ShopEasy - Bot vendas Gratis',
  description: 'Compre e venda produtos diretamente no Discord com segurança. Bot de vendas gratuito sem taxas ou burocracia. Ideal para ecommerce e serviços!',
  keywords: 'bot de vendas discord, ecommerce discord, vendas online, loja virtual discord, shop easy, shopeasybot, sistema de vendas, bot gratuito, serviços digitais',
  authors: [{ name: 'Zyven Studio', url: `${process.env.NEXT_PUBLIC_SITE_URL}/support` }],
  publisher: 'ShopEasy',
  robots: 'index, follow',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),

  icons: {
    icon: [
      { url: '/shopeasy.svg' },
    ],
  },

  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Bot de Vendas para Discord Gratuito | ShopEasy',
    description: 'Solução definitiva para automatizar suas vendas no Discord, com controle total, segurança e eficiência. Expanda seu negócio sem complicações.',
    siteName: 'ShopEasy',
    images: [{
      width: 1200,
      height: 630,
      alt: 'ShopEasy - Interface do Bot de Vendas',
    }],
    locale: 'pt_BR',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Bot de Vendas para Discord Gratuito | ShopEasy',
    description: 'Monte sua loja virtual no Discord em minutos com o melhor sistema gratuito de vendas',
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
    languages: {
      'pt-BR': process.env.NEXT_PUBLIC_SITE_URL,
    },
  },
  

  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ShopEasy",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.svg`,
    sameAs: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/discord`,
    ],
    contactPoint: [{
      "@type": "ContactPoint",
      telephone: "+5521989580068",
      contactType: "suporte",
      areaServed: "BR",
      availableLanguage: "Portuguese"
    }],
    foundingDate: "2023",
    founders: [{
      "@type": "Person",
      name: "jean"
    }]
  }
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" data-theme="dark" className={`${inter.className} dark`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
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
              
            {children}
               <Analytics />
            </RootProvider>
      </body>
    </html>
  );
}
