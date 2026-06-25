import Image from "next/image";
import Link from "next/link";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { FaDiscord } from "react-icons/fa6";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const sections = [
  {
    title: "Produto",
    links: [
      { label: "Planos", href: "/plans" },
      { label: "Documentação", href: "/docs" },
      { label: "Bot exclusivo", href: "/bot-exclusivo" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Termos de uso", href: "/terms" },
      { label: "Suporte", href: "/support" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20">
      <div className="max-w-6xl mx-auto w-full px-4 py-12 flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 text-left">
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/shopeasy.svg" alt="ShopEasy" width={28} height={28} />
              <span className={`${poppins.className} text-lg text-neutral-800 dark:text-neutral-100`}>
                ShopEasy
              </span>
            </Link>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Bot de vendas para Discord. Monte sua loja, receba pagamentos e venda sem pagar comissão.
            </p>
            <Link
              href="/discord"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 transition-colors"
            >
              <FaDiscord className="w-4 h-4" />
              Comunidade no Discord
            </Link>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500`}>
                  {section.title}
                </span>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-neutral-200/10 dark:border-neutral-800/50 text-xs text-neutral-500 dark:text-neutral-500">
          <span>© {new Date().getFullYear()} ShopEasy. Todos os direitos reservados.</span>
          <span>0% de comissão em todas as vendas</span>
        </div>
      </div>
    </footer>
  );
}
