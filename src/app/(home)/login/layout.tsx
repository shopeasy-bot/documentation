import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login - ShopEasy",
  description: "Acesse o painel da sua loja ShopEasy. Faça login para gerenciar produtos, vendas e configurações.",
  openGraph: {
    title: "Login - ShopEasy",
    description: "Acesse o painel da sua loja ShopEasy. Faça login para gerenciar produtos, vendas e configurações.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
  },
  twitter: {
    title: "Login - ShopEasy",
    description: "Acesse o painel da sua loja ShopEasy. Faça login para gerenciar produtos, vendas e configurações.",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
