"use client";

import { useEffect, useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { cn } from "@/lib/cn";

function remaining(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { done: diff === 0, parts: [d, h, m, s] };
}

function Countdown({ date }: { date: string }) {
  const target = new Date(`${date}T12:00:00-03:00`).getTime();
  // Só calcula no navegador, para o HTML do servidor não divergir do cliente.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now !== null && remaining(target, now).done) {
    return <p className="font-mono text-xs text-emerald-400">Liberado. Atualize a página.</p>;
  }

  const parts = now === null ? null : remaining(target, now).parts;
  return (
    <div className="flex gap-1.5 font-mono" aria-label="Tempo até a revelação">
      {["d", "h", "m", "s"].map((unit, i) => (
        <span
          key={unit}
          className="flex min-w-11 flex-col items-center rounded-lg border border-white/10 bg-black/40 px-1.5 py-1"
        >
          <span className="text-base font-semibold tabular-nums text-neutral-100">
            {parts ? String(parts[i]).padStart(2, "0") : "--"}
          </span>
          <span className="text-[9px] uppercase text-neutral-500">{unit}</span>
        </span>
      ))}
    </div>
  );
}

interface MysteryCardProps {
  code: string;
  /** Dica opcional. Sem dica, o card fica totalmente tarjado. */
  hint?: string;
  /** Plataforma, se já puder ser revelada. */
  platform?: string;
  /** Data da revelação (AAAA-MM-DD). Sem data, mostra só o período. */
  reveal?: string;
  period?: string;
  className?: string;
}

const REDACTED_LINES = ["w-11/12", "w-8/12", "w-10/12"];

export function MysteryCard({ code, hint, platform, reveal, period, className }: MysteryCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 p-5 text-left",
        "transition-colors duration-300 hover:border-emerald-500/40",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">{code}</span>
        <span className="flex size-8 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors group-hover:border-emerald-500/40 group-hover:text-emerald-400">
          <BiLockAlt className="size-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div aria-hidden className="h-6 w-2/3 rounded bg-neutral-100/90" />
        {hint ? (
          <p className="text-sm leading-relaxed text-neutral-300">{hint}</p>
        ) : (
          <div aria-hidden className="flex flex-col gap-2">
            {REDACTED_LINES.map((w) => (
              <span key={w} className={cn("h-3 rounded-sm bg-neutral-700/80", w)} />
            ))}
          </div>
        )}
        <span className="sr-only">{hint ? "Novidade parcialmente revelada." : "Novidade confidencial."}</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-neutral-500">{reveal ? "Revela em" : "Previsão"}</span>
          {reveal ? <Countdown date={reveal} /> : <span className="font-mono text-sm text-neutral-200">{period}</span>}
        </div>
        <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-neutral-400">
          {platform ?? "???"}
        </span>
      </div>
    </article>
  );
}
