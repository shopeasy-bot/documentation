import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s — Blog ShopEasy",
    default: "Blog — ShopEasy",
  },
  description: "Fique por dentro das novidades, atualizações e melhorias da plataforma ShopEasy.",
  openGraph: {
    type: "article",
    siteName: "ShopEasy",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
