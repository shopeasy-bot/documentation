import type { ReactNode } from "react";
import { BiBot, BiCodeAlt, BiDesktop, BiLockAlt, BiMobileAlt } from "react-icons/bi";
import { cn } from "@/lib/cn";

const PLATFORMS = {
  bot: { label: "Bot", icon: BiBot },
  dashboard: { label: "Dashboard", icon: BiDesktop },
  mobile: { label: "App mobile", icon: BiMobileAlt },
  api: { label: "API", icon: BiCodeAlt },
} as const;

type Platform = keyof typeof PLATFORMS;

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PlatformBadge({ name }: { name: Platform }) {
  const { label, icon: Icon } = PLATFORMS[name];
  return (
    <span className="inline-flex items-center gap-1 rounded-md border bg-fd-secondary px-2 py-0.5 text-xs font-medium text-fd-secondary-foreground">
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

interface ReleaseProps {
  /** Data no formato AAAA-MM-DD. */
  date: string;
  version?: string;
  platforms?: Platform[];
  /** Destaque curto, ex.: "Lançamento". */
  tag?: string;
  children: ReactNode;
}

/** Uma entrada do histórico de atualizações. Use o título como `##` logo antes. */
export function Release({ date, version, platforms = [], tag, children }: ReleaseProps) {
  return (
    <section className="-mt-2 mb-12 border-s ps-5">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-fd-muted-foreground">
        <time dateTime={date}>{formatDate(date)}</time>
        {version && (
          <span className="rounded-md bg-fd-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-fd-primary">
            {version}
          </span>
        )}
        {tag && (
          <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {tag}
          </span>
        )}
        {platforms.length > 0 && <span className="mx-1 hidden h-4 w-px bg-fd-border sm:block" />}
        {platforms.map((p) => (
          <PlatformBadge key={p} name={p} />
        ))}
      </div>
      <div className="[&>*:first-child]:mt-0">{children}</div>
    </section>
  );
}

/** Grade de novidades ainda bloqueadas. */
export function Spoilers({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">{children}</div>;
}

interface SpoilerProps {
  /** Dica visível sobre o que vem por aí. */
  hint: string;
  platform?: Platform;
  /** Previsão, ex.: "Novembro". */
  eta?: string;
}

/** Atualização que ainda não saiu: título escondido e cadeado. */
export function Spoiler({ hint, platform, eta }: SpoilerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed bg-fd-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-fd-muted text-fd-muted-foreground">
          <BiLockAlt className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div aria-hidden className="mb-2 flex gap-1.5">
            <span className="h-3.5 w-24 rounded bg-fd-muted" />
            <span className="h-3.5 w-14 rounded bg-fd-muted" />
          </div>
          <p className="text-sm text-fd-muted-foreground">
            <span className="sr-only">Novidade bloqueada. </span>
            {hint}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-fd-muted-foreground">
            {platform && <PlatformBadge name={platform} />}
            <span className={cn("rounded-md border px-2 py-0.5", !eta && "hidden")}>Previsão: {eta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
