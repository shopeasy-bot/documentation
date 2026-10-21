"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { DcButton } from "@/components/discord/controls";
import { DiscordContainer, DiscordMarkdown, DiscordMessage } from "@/components/discord/message";

interface Stage {
  label: string;
  caption: string;
  command?: string;
  accent?: string;
  content: string;
  buttons?: { label: string; emoji?: string; style?: "primary" | "secondary" | "success" | "danger" }[];
  /** Índice do botão "clicado" pelo cursor animado. */
  click?: number;
}

// Textos reais dos menus do bot (src/menus/products, carts e carts/payment).
const STAGES: Stage[] = [
  {
    label: "Produto",
    caption: "O produto publicado no canal da loja",
    content: "## Conta Premium\n> Acesso completo por 30 dias.\n### R$ 19,90\n-# **25** unidades disponiveis",
    buttons: [{ label: "Comprar", emoji: "🛒", style: "success" }],
    click: 0,
  },
  {
    label: "Carrinho",
    caption: "Um canal privado é criado para o cliente",
    content:
      "## 🛒 Carrinho de Compras\n> Ola <@cliente>, seja bem vindo ao seu carrinho de compras, a baixo você pode gerenciar os produtos!\n### Conta Premium\n> 💲 **Unitário:** R$ 19,90\n-# 1 no carrinho · 25 disponíveis",
    buttons: [
      { label: "Cupom", emoji: "🏷️" },
      { label: "Continuar", emoji: "➡️", style: "success" },
      { label: "Cancelar", emoji: "✖️", style: "danger" },
    ],
    click: 1,
  },
  {
    label: "PIX",
    caption: "QR Code e Copia e Cola gerados na hora",
    content:
      "# 💲 Pagamento via PIX\n-# Complete seu pagamento para receber seus produtos\n### ℹ️ Informações do Pagamento\n>>> **💲 Valor Total:**\nR$ 19,90\n**🕒 Expira em:**\nem 15 minutos",
    buttons: [{ label: "Copiar Código PIX" }, { label: "Já Realizei o Pagamento", style: "success" }],
  },
  {
    label: "Aprovado",
    caption: "Gateways automáticos detectam o pagamento sozinhos",
    accent: "#23a55a",
    content: "# ✅ Pagamento Aprovado\n### ℹ️ Informações do Pagamento\n>>> **💲 Valor Total:**\nR$ 19,90",
  },
  {
    label: "Entregue",
    caption: "Estoque automático entregue por mensagem direta",
    accent: "#23a55a",
    content: "## 📦 Entrega\n> Os itens do estoque automático são enviados ao cliente por mensagem direta, e o cargo de clientes é atribuído.",
  },
];

const STAGE_MS = 3200;

export function LiveSale({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pressing, setPressing] = useState(false);
  const stage = STAGES[index];

  useEffect(() => {
    if (paused) return;
    const press = setTimeout(() => setPressing(true), STAGE_MS - 700);
    const next = setTimeout(() => {
      setPressing(false);
      setIndex((i) => (i + 1) % STAGES.length);
    }, STAGE_MS);
    return () => {
      clearTimeout(press);
      clearTimeout(next);
    };
  }, [index, paused]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-600/30 via-fuchsia-500/10 to-emerald-500/30 blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-dc-chat shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-black/30 bg-dc-container px-4 py-2.5 text-sm">
          <span className="text-dc-muted">#</span>
          <span className="font-semibold text-dc-header">
            {index === 0 ? "produtos" : index === 4 ? "mensagens-diretas" : "🛒・carrinho-cliente"}
          </span>
          <span className="ml-auto flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ed6a5e]" />
            <span className="size-2.5 rounded-full bg-[#f5bf4f]" />
            <span className="size-2.5 rounded-full bg-[#61c554]" />
          </span>
        </div>

        <div className="relative h-[300px] overflow-hidden">
          <div key={index} className="animate-dc-in">
            <DiscordMessage timestamp="agora" className="rounded-none">
              <DiscordContainer accent={stage.accent}>
                <DiscordMarkdown content={stage.content} />
                {stage.buttons && (
                  <div className="flex flex-wrap gap-2">
                    {stage.buttons.map((b, i) => (
                      <span
                        key={b.label}
                        className={cn(
                          "relative transition-transform",
                          stage.click === i && pressing && "scale-95",
                        )}
                      >
                        <DcButton label={b.label} emoji={b.emoji} style={b.style} />
                        {stage.click === i && (
                          <span
                            className="pointer-events-none absolute -bottom-4 right-1 animate-dc-in text-2xl drop-shadow-lg"
                            aria-hidden
                          >
                            👆
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </DiscordContainer>
            </DiscordMessage>
          </div>
        </div>

        <div className="border-t border-black/30 bg-dc-container px-4 py-3">
          <p key={index} className="mb-2.5 animate-dc-in text-xs text-dc-muted">
            {stage.caption}
          </p>
          <div className="flex gap-1.5" role="tablist" aria-label="Etapas da venda">
            {STAGES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className="group flex flex-1 flex-col gap-1.5 text-left"
              >
                <span className="relative h-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    key={i === index ? `active-${index}` : "idle"}
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400",
                      i < index ? "w-full" : "w-0",
                    )}
                    style={
                      i === index
                        ? {
                            animation: `se-progress ${STAGE_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }
                        : undefined
                    }
                  />
                </span>
                <span
                  className={cn(
                    "text-[11px] transition-colors",
                    i === index ? "font-semibold text-dc-header" : "text-dc-muted group-hover:text-dc-text",
                  )}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
