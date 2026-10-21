"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { PLAN_FEATURES, PLAN_ORDER, PLANS, type PlanId } from "@/lib/shopeasy-data";

const GROUPS = Array.from(new Set(PLAN_FEATURES.map((f) => f.group)));

function includes(plan: PlanId, min: PlanId) {
  return PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf(min);
}

/**
 * Comparador de planos: o leitor marca os recursos que precisa
 * e o componente destaca o menor plano que atende a todos.
 */
export function PlanComparator() {
  const [wanted, setWanted] = useState<string[]>([]);

  const recommended = useMemo<PlanId>(() => {
    let index = 0;
    for (const label of wanted) {
      const feature = PLAN_FEATURES.find((f) => f.label === label);
      if (feature) index = Math.max(index, PLAN_ORDER.indexOf(feature.minPlan));
    }
    return PLAN_ORDER[index];
  }, [wanted]);

  function toggle(label: string) {
    setWanted((w) => (w.includes(label) ? w.filter((x) => x !== label) : [...w, label]));
  }

  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const active = plan.id === recommended;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-xl border p-3 transition-all",
                active
                  ? "border-fd-primary bg-fd-primary/5 shadow-md ring-2 ring-fd-primary/30"
                  : "bg-fd-card opacity-80",
              )}
            >
              {active && (
                <span className="absolute -top-2.5 left-3 rounded-full bg-fd-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fd-primary-foreground">
                  {wanted.length ? "Recomendado" : "Comece aqui"}
                </span>
              )}
              <div className="text-sm font-semibold">{plan.name}</div>
              <div className="text-lg font-bold">{plan.price}</div>
              <div className="text-xs text-fd-muted-foreground">{plan.tagline}</div>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-fd-muted/50 text-xs">
            <tr>
              <th className="px-3 py-2 text-left font-medium">
                Marque o que você precisa
                {wanted.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setWanted([])}
                    className="ml-2 text-fd-primary underline-offset-2 hover:underline"
                  >
                    limpar
                  </button>
                )}
              </th>
              {PLANS.map((plan) => (
                <th
                  key={plan.id}
                  className={cn(
                    "px-2 py-2 text-center font-medium",
                    plan.id === recommended && "text-fd-primary",
                  )}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          {GROUPS.map((group) => (
            <tbody key={group} className="border-t">
              <tr>
                <th
                  colSpan={PLANS.length + 1}
                  className="bg-fd-muted/20 px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-fd-muted-foreground"
                >
                  {group}
                </th>
              </tr>
              {PLAN_FEATURES.filter((f) => f.group === group).map((feature) => {
                const checked = wanted.includes(feature.label);
                return (
                  <tr
                    key={feature.label}
                    className={cn("border-t transition-colors", checked && "bg-fd-primary/5")}
                  >
                    <td className="px-3 py-2">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(feature.label)}
                          className="accent-fd-primary"
                        />
                        {feature.label}
                      </label>
                    </td>
                    {PLANS.map((plan) => {
                      const value = feature.values?.[plan.id];
                      const ok = includes(plan.id, feature.minPlan);
                      return (
                        <td
                          key={plan.id}
                          className={cn(
                            "px-2 py-2 text-center",
                            plan.id === recommended && "bg-fd-primary/5",
                          )}
                        >
                          {value ?? (ok ? <span aria-label="Incluído">✅</span> : <span className="text-fd-muted-foreground" aria-label="Não incluído">—</span>)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ))}
        </table>
      </div>

      <p className="text-sm text-fd-muted-foreground">
        {wanted.length === 0
          ? "Marque os recursos acima para ver o plano ideal."
          : recommended === "basic"
            ? "Tudo o que você marcou funciona no plano gratuito."
            : (
              <>
                Você precisa do plano <strong className="text-fd-foreground">{PLANS.find((p) => p.id === recommended)?.name}</strong>.{" "}
                <Link href="/docs/comprar-plano" className="text-fd-primary underline-offset-2 hover:underline">
                  Veja como adquirir →
                </Link>
              </>
            )}
      </p>
    </div>
  );
}
