import { GridDecoration } from "@/components/decoration/Grid";
import { MysteryCard } from "@/components/v4/mystery";
import { ProductShot } from "@/components/v4/product-shot";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
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

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn(jetbrains.className, "text-xs uppercase tracking-[0.25em] text-emerald-400", className)}>
      {children}
    </span>
  );
}

function Tile({
  icon: Icon,
  label,
  title,
  text,
  children,
  className,
}: {
  icon: typeof BiBot;
  label: string;
  title: string;
  text: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 p-6 text-left sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <span className="flex items-center gap-2 text-sm text-neutral-400">
          <Icon className="size-4 text-emerald-400" /> {label}
        </span>
        <h3 className={cn(poppins.className, "text-2xl font-semibold text-neutral-100 sm:text-3xl")}>{title}</h3>
        <p className="max-w-md text-neutral-400">{text}</p>
      </div>
      {children}
    </article>
  );
}

export default function V4Page() {
  return (
    <main className="relative flex flex-1 flex-col items-center overflow-x-clip bg-neutral-950 text-neutral-100">
      {/* Topo */}
      <section className="relative flex w-full flex-col items-center gap-10 px-4 pt-20 pb-16 sm:pt-28">
        <GridDecoration
          width={60}
          height={60}
          className="[mask-image:radial-gradient(ellipse_at_top,white,transparent_70%)] opacity-40"
        />
        <div className="flex flex-col items-center gap-5 text-center">
          <Eyebrow>Lançamento · 21 de outubro de 2026</Eyebrow>
          <h1 className={cn(poppins.className, "flex flex-col items-center leading-none")}>
            <span className="text-2xl font-medium text-neutral-300 sm:text-3xl">ShopEasy</span>
            <span
              className={cn(
                "animate-v4-sheen bg-[length:250%_100%] bg-clip-text text-[9rem] font-bold tracking-tighter text-transparent sm:text-[13rem]",
                "bg-[linear-gradient(110deg,#f5f5f5_40%,#34d399_50%,#f5f5f5_60%)]",
              )}
            >
              v4
            </span>
          </h1>
          <p className={cn(poppins.className, "max-w-2xl text-xl text-neutral-300 sm:text-2xl")}>
            Sua loja em todo lugar. Venda pelo bot, gerencie pelo navegador e acompanhe tudo pelo celular.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/invite"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              Adicionar o ShopEasy <FiArrowRight />
            </Link>
            <Link
              href="/docs/novidades"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/5"
            >
              <FiBookOpen /> Ver todas as mudanças
            </Link>
          </div>
        </div>

        <div className="w-full">
          <ProductShot />
        </div>
      </section>

      {/* Novidades */}
      <section aria-labelledby="novidades" className="flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
        <div className="flex flex-col gap-3">
          <Eyebrow>O que chegou</Eyebrow>
          <h2 id="novidades" className={cn(poppins.className, "max-w-2xl text-4xl font-semibold sm:text-5xl")}>
            Três jeitos de cuidar da sua loja.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          <Tile
            icon={BiDesktop}
            label="Dashboard"
            title="A loja inteira no navegador."
            text="Edite produtos, preços, estoque e imagens sem abrir o Discord. Vendas do dia e da semana na página inicial."
            className="md:col-span-4"
          >
            <div className="mt-auto grid gap-3 sm:grid-cols-3">
              {[
                ["Nova página inicial", "Vendas, faturamento e mais vendidos."],
                ["Produtos pelo navegador", "Título, preço, estoque e imagens."],
                ["Exportação de vendas", "Planilha por período e produto."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-sm font-medium text-neutral-100">{t}</p>
                  <p className="mt-1 text-sm text-neutral-500">{d}</p>
                </div>
              ))}
            </div>
          </Tile>

          <Tile
            icon={BiBot}
            label="Bot"
            title="2x mais rápido."
            text="Os menus de /configuracoes e /produto configurar abrem e salvam na metade do tempo."
            className="md:col-span-2"
          >
            <p className={cn(poppins.className, "mt-auto text-7xl font-bold text-emerald-400")}>2x</p>
          </Tile>

          <Tile
            icon={BiMobileAlt}
            label="App mobile"
            title="Aprove PIX do sofá."
            text="Receba um aviso a cada venda e aprove pagamentos do PIX Manual direto pelo celular."
            className="md:col-span-2"
          >
            <div className="mt-auto rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs text-neutral-500">PIX Manual · Pedido #4821</p>
              <p className="mt-1 text-lg font-semibold">R$ 19,90</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <span className="rounded-lg bg-emerald-500 py-2 text-center font-medium text-black">Aprovar</span>
                <span className="rounded-lg border border-white/10 py-2 text-center text-neutral-300">Recusar</span>
              </div>
            </div>
          </Tile>

          <Tile
            icon={BiBot}
            label="Bot"
            title="O cliente sabe o que está pagando."
            text="Antes do pagamento, o carrinho mostra um resumo com produto, quantidade, cupom e valor final. E a equipe é avisada quando o estoque está acabando."
            className="md:col-span-4"
          >
            <div className="mt-auto max-w-md rounded-xl border-l-4 border-emerald-500 bg-dc-container p-4">
              <p className="text-sm font-semibold text-dc-header">🛒 Resumo do pedido</p>
              <dl className="mt-3 grid grid-cols-[1fr_auto] gap-y-1.5 text-sm">
                <dt className="text-dc-muted">Conta Premium × 2</dt>
                <dd className="text-dc-text">R$ 39,80</dd>
                <dt className="text-dc-muted">Cupom BEMVINDO</dt>
                <dd className="text-emerald-400">− R$ 3,98</dd>
                <dt className="font-semibold text-dc-header">Total</dt>
                <dd className="font-semibold text-dc-header">R$ 35,82</dd>
              </dl>
            </div>
          </Tile>
        </div>
      </section>

      {/* Mistérios */}
      <section aria-labelledby="confidencial" className="relative w-full border-y border-white/5 bg-black/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              <Eyebrow className="text-amber-400">Confidencial</Eyebrow>
              <h2 id="confidencial" className={cn(poppins.className, "text-4xl font-semibold sm:text-5xl")}>
                Ainda não podemos contar.
              </h2>
            </div>
            <p className="max-w-sm text-neutral-400">
              A v4 é só o começo. Cada arquivo abaixo será revelado na data marcada.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MysteryCard code="Arquivo 01" platform="Bot" reveal="2026-11-04" hint="Uma nova forma de vender para quem ainda nem entrou no seu servidor." />
            <MysteryCard code="Arquivo 02" reveal="2026-11-18" />
            <MysteryCard code="Arquivo 03" platform="Dashboard" reveal="2026-12-02" hint="Relatórios que respondem antes de você perguntar." />
            <MysteryCard code="Arquivo 04" reveal="2026-12-09" />
            <MysteryCard code="Arquivo 05" platform="App mobile" reveal="2026-12-16" hint="O app vai ganhar algo que hoje só existe no Discord." />
            <MysteryCard code="Arquivo 06" period="2027" />
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="flex flex-col items-center gap-6 px-4 py-24 text-center">
        <h2 className={cn(poppins.className, "max-w-2xl text-4xl font-semibold sm:text-5xl")}>
          Já está na sua loja.
        </h2>
        <p className="max-w-md text-neutral-400">
          Quem usa o ShopEasy recebe a v4 automaticamente. Não precisa reinstalar nada.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/invite"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
          >
            Adicionar o ShopEasy <FiArrowRight />
          </Link>
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/5"
          >
            Conhecer os planos <FiArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
