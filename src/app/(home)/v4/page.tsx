import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { Spoiler } from "@/components/changelog";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import type { IconType } from "react-icons";
import { BiBot, BiDesktop, BiMobileAlt } from "react-icons/bi";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import type { Metadata } from "next";

const title = "ShopEasy v4";
const description = "Sua loja no Discord, no navegador e no celular. Conheça tudo o que chegou na versão 4.";

export const metadata: Metadata = {
  title: `${title} - ShopEasy`,
  description,
  alternates: { canonical: "/v4" },
  openGraph: { title, description, url: `${process.env.NEXT_PUBLIC_SITE_URL}/v4` },
  twitter: { title, description },
};

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const cardClass = cn(
  "flex flex-col gap-5 p-6 rounded-2xl border backdrop-blur-sm text-left",
  "border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20",
);

interface Platform {
  icon: IconType;
  name: string;
  summary: string;
  items: { title: string; text: string }[];
}

const PLATFORMS: Platform[] = [
  {
    icon: BiBot,
    name: "Bot",
    summary: "Mais rápido para você, mais claro para o cliente.",
    items: [
      { title: "Menus mais rápidos", text: "/configuracoes e /produto configurar abrem e salvam até 2x mais rápido." },
      { title: "Carrinho com resumo", text: "Antes de pagar, o cliente vê produto, quantidade, cupom e valor final." },
      { title: "Aviso de estoque baixo", text: "A equipe é avisada no canal de logs quando um produto chega ao mínimo." },
    ],
  },
  {
    icon: BiDesktop,
    name: "Dashboard",
    summary: "Toda a loja pelo navegador, sem abrir o Discord.",
    items: [
      { title: "Nova página inicial", text: "Vendas do dia, faturamento da semana e produtos mais vendidos." },
      { title: "Produtos pelo navegador", text: "Edite título, preço, estoque e imagens de qualquer lugar." },
      { title: "Exportação de vendas", text: "Baixe o histórico em planilha, filtrando por período e produto." },
    ],
  },
  {
    icon: BiMobileAlt,
    name: "App mobile",
    summary: "Sua loja no bolso, para Android e iOS.",
    items: [
      { title: "Notificação de venda", text: "Um aviso no celular a cada pagamento aprovado." },
      { title: "Aprovação de PIX Manual", text: "Aprove ou recuse pagamentos direto pelo app." },
      { title: "Resumo da loja", text: "Acompanhe vendas e estoque sem precisar do computador." },
    ],
  },
];

export default function V4Page() {
  return (
    <main className="relative flex flex-1 flex-col z-10 items-center gap-24 px-4 pt-24 pb-24">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />

      <header className="flex max-w-3xl flex-col items-center gap-6 text-center motion-preset-expand motion-delay-[100ms]">
        <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400`}>
          Lançamento · 21 de outubro de 2026
        </span>
        <h1 className={`${poppins.className} text-5xl font-semibold tracking-tight text-neutral-800 sm:text-7xl dark:text-neutral-100`}>
          ShopEasy <span className="text-emerald-500 dark:text-emerald-400">v4</span>
        </h1>
        <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
          Sua loja deixa de viver só no Discord. Agora você vende pelo bot, gerencia pelo navegador e acompanha
          tudo pelo celular.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/invite"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            Adicionar o ShopEasy <FiArrowRight />
          </Link>
          <Link
            href="/docs/novidades"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200/10 px-5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100/10 dark:border-neutral-800 dark:text-neutral-200"
          >
            <FiBookOpen /> Ver todas as mudanças
          </Link>
        </div>
      </header>

      <section aria-labelledby="plataformas" className="w-full max-w-6xl motion-preset-expand motion-delay-[200ms]">
        <h2 id="plataformas" className="sr-only">
          O que mudou
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {PLATFORMS.map(({ icon: Icon, name, summary, items }) => (
            <article key={name} className={cardClass}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                  <Icon className="size-5" />
                </span>
                <h3 className={`${poppins.className} text-xl text-neutral-800 dark:text-neutral-100`}>{name}</h3>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{summary}</p>
              <ul className="flex flex-col gap-4 border-t border-neutral-200/10 pt-5 dark:border-neutral-800/50">
                {items.map((item) => (
                  <li key={item.title}>
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{item.title}</p>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{item.text}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="vem-ai" className="flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-neutral-500`}>
            Ainda não podemos contar
          </span>
          <h2 id="vem-ai" className={`${poppins.className} text-3xl text-neutral-800 dark:text-neutral-100`}>
            Vem aí
          </h2>
        </div>
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Spoiler platform="bot" eta="Novembro" hint="Uma nova forma de vender para quem ainda não entrou no seu servidor." />
          <Spoiler platform="dashboard" eta="Novembro" hint="Relatórios que respondem antes de você perguntar." />
          <Spoiler platform="mobile" eta="Dezembro" hint="O app vai ganhar algo que hoje só existe no Discord." />
          <Spoiler platform="api" eta="2027" hint="Mais liberdade para quem constrói em cima do ShopEasy." />
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 text-center">
        <h2 className={`${poppins.className} text-2xl text-neutral-800 dark:text-neutral-100`}>
          Já disponível para todas as lojas
        </h2>
        <p className="max-w-md text-sm text-neutral-500 dark:text-neutral-400">
          Quem já usa o ShopEasy recebe a v4 automaticamente. Não precisa reinstalar nada.
        </p>
        <Link
          href="/plans"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-500 hover:underline dark:text-emerald-400"
        >
          Conhecer os planos <FiArrowRight />
        </Link>
      </section>
    </main>
  );
}
