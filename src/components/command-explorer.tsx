"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { COMMANDS, type CommandCategory } from "@/lib/shopeasy-data";

const CATEGORIES: ("Todos" | CommandCategory)[] = [
  "Todos",
  "Loja",
  "Pagamentos",
  "Vendas",
  "Clientes",
  "Atendimento",
  "Conta e bot",
];

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function CommandExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [freeOnly, setFreeOnly] = useState(false);

  const results = useMemo(() => {
    const q = normalize(query.trim().replace(/^\//, ""));
    return COMMANDS.filter((cmd) => {
      if (category !== "Todos" && cmd.category !== category) return false;
      if (freeOnly && cmd.plan !== "—") return false;
      if (!q) return true;
      const haystack = normalize(
        [cmd.name, ...(cmd.subcommands ?? []), cmd.description, cmd.permission].join(" "),
      );
      return q.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [query, category, freeOnly]);

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border bg-fd-card">
      <div className="flex flex-col gap-3 border-b p-3">
        <div className="flex items-center gap-2 rounded-lg border bg-fd-background px-3 focus-within:ring-2 focus-within:ring-fd-primary/40">
          <span className="font-mono text-fd-muted-foreground" aria-hidden>
            /
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque um comando, subcomando ou permissão…"
            aria-label="Buscar comandos"
            className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-fd-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                category === c
                  ? "border-fd-primary bg-fd-primary text-fd-primary-foreground"
                  : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
              )}
            >
              {c}
            </button>
          ))}
          <label className="ml-auto flex cursor-pointer items-center gap-1.5 text-xs text-fd-muted-foreground">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="accent-fd-primary"
            />
            Só plano gratuito
          </label>
        </div>
      </div>

      <ul className="divide-y" aria-live="polite">
        {results.map((cmd) => (
          <li key={`${cmd.name}-${cmd.subcommands?.join("-") ?? ""}`}>
            <Link
              href={cmd.href}
              className="group flex flex-col gap-1.5 px-4 py-3 transition-colors hover:bg-fd-accent/50 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-sm">
                  <span className="font-semibold text-fd-foreground">/{cmd.name}</span>
                  {cmd.subcommands?.map((sub) => (
                    <span
                      key={sub}
                      className="rounded bg-fd-muted px-1.5 py-0.5 text-xs text-fd-muted-foreground"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
                <p className="mt-0.5 text-sm text-fd-muted-foreground">{cmd.description}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-1.5 text-xs">
                <span className="rounded-md border px-2 py-0.5" title="Permissão exigida">
                  🔐 {cmd.permission === "—" ? "Qualquer membro" : cmd.permission}
                </span>
                <span
                  className={cn(
                    "rounded-md border px-2 py-0.5",
                    cmd.plan !== "—" && "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
                  )}
                  title="Plano mínimo"
                >
                  👑 {cmd.plan === "—" ? "Todos os planos" : cmd.plan}
                </span>
              </div>
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-fd-muted-foreground">
            Nenhum comando encontrado para “{query}”.
          </li>
        )}
      </ul>
      <div className="border-t px-4 py-2 text-xs text-fd-muted-foreground">
        {results.length} de {COMMANDS.length} entradas
      </div>
    </div>
  );
}
