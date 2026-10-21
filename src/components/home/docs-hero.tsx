"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { LiveSale } from "./live-sale";

const TYPED_COMMANDS = [
  "/produto criar referencia:conta-premium",
  "/pagamento configurar",
  "/configuracoes",
  "/cupom criar referencia:BEMVINDO10",
  "/vendas relatorio",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [word, setWord] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    const full = words[word];
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const delay = done ? 1800 : empty ? 300 : deleting ? 22 : 55;
    const timer = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setWord((w) => (w + 1) % words.length);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, word, deleting, words]);

  return text;
}

export function DocsHero() {
  const typed = useTypewriter(TYPED_COMMANDS);

  return (
    <section className="not-prose relative -mx-1 mb-12 mt-2">
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />

      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <Sparkles className="size-3.5" />
            Documentação oficial · atualizada com o bot
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Sua loja inteira{" "}
            <span className="animate-se-gradient bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              dentro do Discord
            </span>
          </h1>

          <p className="max-w-xl text-base text-fd-muted-foreground sm:text-lg">
            Produtos, carrinhos privados, PIX, entrega automática, cupons e tickets. Aprenda a configurar
            tudo no ShopEasy em poucos minutos, sem comissão sobre as suas vendas.
          </p>

          <div className="flex items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm shadow-inner">
            <span className="text-emerald-400">❯</span>
            <span className="truncate text-fd-foreground">{typed}</span>
            <span className="-ml-1 h-5 w-2 shrink-0 animate-se-blink bg-emerald-400" aria-hidden />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/primeiros-passos"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/50 hover:brightness-110"
            >
              Começar agora
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs/comandos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <BookOpen className="size-4" />
              Ver comandos
            </Link>
          </div>

          <dl className="grid max-w-lg grid-cols-3 gap-3 pt-2">
            <Stat value={22} label="comandos" />
            <Stat value={9} label="gateways" />
            <Stat value={0} suffix="%" label="de comissão" />
          </dl>
        </div>

        <LiveSale />
      </div>
    </section>
  );
}

function Stat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 900);
        setShown(Math.round(value * (1 - (1 - t) ** 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <dt className="sr-only">{label}</dt>
      <dd className="text-2xl font-bold tabular-nums">
        {shown}
        {suffix}
      </dd>
      <dd className="text-xs text-fd-muted-foreground">{label}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cards com luz que acompanha o mouse                                 */
/* ------------------------------------------------------------------ */

interface SpotlightCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  /** Ocupa duas colunas no grid. */
  wide?: boolean;
  badge?: string;
  color?: string;
}

export function SpotlightGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function SpotlightCard({
  title,
  description,
  href,
  icon,
  wide,
  badge,
  color = "99 102 241",
}: SpotlightCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(event: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      style={{ "--c": color } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-[rgb(var(--c)/0.5)] hover:shadow-[0_8px_40px_-12px_rgb(var(--c)/0.5)]",
        wide && "sm:col-span-2",
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(320px circle at var(--x) var(--y), rgb(var(--c) / 0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative flex items-start gap-4">
        {icon && (
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg] [&_svg]:size-5"
            style={{ background: "rgb(var(--c) / 0.15)", color: "rgb(var(--c))" }}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-fd-foreground">{title}</h3>
            {badge && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-fd-muted-foreground">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
        </div>
        <ArrowRight className="ml-auto size-4 shrink-0 -translate-x-1 text-fd-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
}
