import Image from "next/image";
import { cn } from "@/lib/cn";
import { BiBarChartAlt2, BiBox, BiCart, BiCog, BiHome, BiPurchaseTag } from "react-icons/bi";

// Composição estática do produto para a página /v4: dashboard no navegador,
// mensagem do bot no Discord e notificações no celular. Valores ilustrativos.

const WEEK = [38, 52, 44, 61, 57, 74, 92];
const DAYS = ["S", "T", "Q", "Q", "S", "S", "D"];

const TOP_PRODUCTS = [
  { name: "Conta Premium", sales: 128, price: "R$ 19,90" },
  { name: "Pacote de Moedas", sales: 96, price: "R$ 9,90" },
  { name: "Assinatura Anual", sales: 41, price: "R$ 149,90" },
];

function Browser() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/60">
      <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900/80 px-4 py-3">
        <span className="size-2.5 rounded-full bg-neutral-700" />
        <span className="size-2.5 rounded-full bg-neutral-700" />
        <span className="size-2.5 rounded-full bg-neutral-700" />
        <span className="mx-auto rounded-md bg-neutral-800/80 px-3 py-1 font-mono text-[11px] text-neutral-400">
          shopeasy.site/dashboard
        </span>
      </div>
      <div className="flex">
        <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-white/5 p-3 text-xs text-neutral-400 sm:flex">
          {[
            [BiHome, "Início", true],
            [BiBox, "Produtos"],
            [BiCart, "Vendas"],
            [BiPurchaseTag, "Cupons"],
            [BiBarChartAlt2, "Relatórios"],
            [BiCog, "Configurações"],
          ].map(([Icon, label, active]) => {
            const I = Icon as typeof BiHome;
            return (
              <span
                key={label as string}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5",
                  active && "bg-emerald-500/10 text-emerald-400",
                )}
              >
                <I className="size-3.5" /> {label as string}
              </span>
            );
          })}
        </aside>
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              ["Vendas hoje", "38", "+18%"],
              ["Faturamento", "R$ 2.418", "+24%"],
              ["Ticket médio", "R$ 63,65", "+5%"],
            ].map(([label, value, delta]) => (
              <div key={label} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-left sm:p-3">
                <p className="truncate text-[10px] text-neutral-500 sm:text-[11px]">{label}</p>
                <p className="mt-1 truncate text-sm font-semibold text-neutral-100 sm:text-lg">{value}</p>
                <p className="text-[10px] text-emerald-400">{delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-5">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left sm:col-span-3">
              <p className="text-[11px] text-neutral-500">Vendas da semana</p>
              <div className="mt-3 flex h-28 items-end gap-2">
                {WEEK.map((v, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full flex-1 items-end">
                    <div
                      className={cn(
                        "w-full rounded-t-md",
                        i === WEEK.length - 1 ? "bg-emerald-400" : "bg-emerald-500/25",
                      )}
                      style={{ height: `${v}%` }}
                    />
                    </div>
                    <span className="text-[9px] text-neutral-600">{DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left sm:col-span-2 sm:block">
              <p className="text-[11px] text-neutral-500">Mais vendidos</p>
              <ul className="mt-2 flex flex-col gap-2">
                {TOP_PRODUCTS.map((p, i) => (
                  <li key={p.name} className="flex items-center gap-2 text-[11px]">
                    <span className="flex size-5 items-center justify-center rounded bg-white/5 text-neutral-400">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-neutral-200">{p.name}</span>
                    <span className="text-neutral-500">{p.sales}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscordCard() {
  return (
    <div className="w-80 rounded-xl border border-white/10 bg-dc-chat p-3 text-left shadow-2xl shadow-black/60">
      <div className="flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-dc-darker">
          <Image src="/shopeasy.svg" alt="" width={22} height={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm">
            <span className="font-medium text-dc-header">ShopEasy</span>
            <span className="rounded bg-dc-blurple px-1 text-[9px] font-semibold text-white">APP</span>
            <span className="text-[10px] text-dc-muted">agora</span>
          </p>
          <div className="mt-1.5 rounded border-l-4 border-emerald-500 bg-dc-container p-2.5">
            <p className="text-[13px] font-semibold text-dc-header">✅ Pagamento aprovado</p>
            <p className="mt-1 text-xs text-dc-text">Conta Premium · 1 unidade</p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-dc-muted">Total</span>
              <span className="font-semibold text-dc-header">R$ 19,90</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const NOTIFICATIONS = [
  ["Nova venda", "Conta Premium · R$ 19,90", "agora"],
  ["PIX aguardando aprovação", "Pacote de Moedas · R$ 9,90", "2 min"],
  ["Estoque baixo", "Assinatura Anual: 3 unidades", "15 min"],
];

function Phone() {
  return (
    <div className="w-56 rounded-[2.4rem] border border-white/15 bg-neutral-950 p-2 shadow-2xl shadow-black/70">
      <div className="relative h-[26rem] overflow-hidden rounded-[2rem] bg-gradient-to-b from-emerald-950 via-neutral-950 to-neutral-950 px-3 pt-3">
        <div className="mx-auto h-5 w-20 rounded-full bg-black" />
        <p className="mt-6 text-center text-4xl font-light text-white">12:00</p>
        <p className="text-center text-[11px] text-neutral-400">novembro de 2026</p>
        <div className="mt-6 flex flex-col gap-2">
          {NOTIFICATIONS.map(([title, text, time]) => (
            <div key={title} className="rounded-2xl bg-white/10 p-2.5 text-left backdrop-blur">
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-300">
                <span className="flex size-4 items-center justify-center rounded bg-neutral-900">
                  <Image src="/shopeasy.svg" alt="" width={10} height={10} />
                </span>
                ShopEasy
                <span className="ml-auto text-neutral-500">{time}</span>
              </div>
              <p className="mt-1 text-[11px] font-semibold text-white">{title}</p>
              <p className="text-[10px] text-neutral-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductShot() {
  return (
    <div className="relative mx-auto w-full max-w-5xl md:px-16 md:pb-20">
      <div
        aria-hidden
        className="absolute inset-x-10 top-10 -z-10 h-2/3 rounded-full bg-emerald-500/20 blur-[120px]"
      />
      <Browser />
      <div className="absolute bottom-0 left-0 hidden animate-v4-float md:block">
        <DiscordCard />
      </div>
      <div className="absolute -bottom-6 right-0 hidden animate-v4-float [animation-delay:-3s] md:block">
        <Phone />
      </div>
    </div>
  );
}
