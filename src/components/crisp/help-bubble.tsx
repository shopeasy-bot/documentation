"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { cn } from "@/lib/cn";
import { openCrispChat, useCrispChatOpen } from "./store";

const DISMISS_KEY = "shopeasy-help-bubble-dismissed";
const SHOW_DELAY_MS = 8000;
const SCROLL_TRIGGER = 0.45;
const TYPING_MS = 1400;
const AUTO_HIDE_MS = 25000;

interface Topic {
  message: string;
  chips: string[];
}

// Mensagens por área da documentação. A primeira que casar com o caminho é usada.
const TOPICS: [prefix: string, topic: Topic][] = [
  ["/docs/pagamentos", {
    message: "Vi que você está configurando pagamentos. Quer ajuda para conectar um gateway?",
    chips: ["Como conectar o PIX Manual?", "Qual gateway usar no meu plano?", "O pagamento não foi aprovado"],
  }],
  ["/docs/carrinho", {
    message: "Dúvidas sobre o carrinho ou o checkout? Posso te ajudar com isso.",
    chips: ["O carrinho não foi criado", "Como funciona a entrega?", "O carrinho expirou rápido demais"],
  }],
  ["/docs/products", {
    message: "Montando seus produtos? Posso ajudar com estoque, imagens ou catálogos.",
    chips: ["Como adicionar estoque automático?", "Como criar um catálogo?", "Minha imagem não aparece"],
  }],
  ["/docs/configs", {
    message: "Configurando a loja? Me conte onde travou que eu te ajudo.",
    chips: ["Quais canais preciso configurar?", "Como dar permissão à equipe?", "As alterações não salvaram"],
  }],
  ["/docs/plans", {
    message: "Em dúvida sobre qual plano escolher? Posso te ajudar a decidir.",
    chips: ["Qual plano é ideal para mim?", "Como ativar um código de plano?", "Quero falar sobre o Enterprise"],
  }],
  ["/docs/comprar-plano", {
    message: "Precisa de ajuda para adquirir ou renovar o plano?",
    chips: ["Paguei e o plano não ativou", "Como renovar meu plano?", "Como resgatar um código?"],
  }],
  ["/docs/bot-exclusivo", {
    message: "Quer colocar seu próprio bot no ar? Posso te guiar.",
    chips: ["Como configurar o bot exclusivo?", "Onde pego o token do bot?", "Como funcionam as automações?"],
  }],
  ["/docs/tickets", {
    message: "Configurando os tickets? Posso ajudar.",
    chips: ["Os tickets não abrem", "Como definir cargos de suporte?", "Como mudar o painel de ticket?"],
  }],
  ["/docs/dev", {
    message: "Integrando com a API do ShopEasy? Tire suas dúvidas por aqui.",
    chips: ["Como gerar uma chave de API?", "Tenho um erro na API", "Preciso de um endpoint novo"],
  }],
  ["/docs", {
    message: "Oi! Posso te ajudar a encontrar algo na documentação?",
    chips: ["Como começar minha loja?", "Encontrei um problema no bot", "Quero falar com o suporte"],
  }],
];

const DEFAULT_TOPIC: Topic = {
  message: "Oi! Precisa de ajuda com o ShopEasy?",
  chips: ["Como começar minha loja?", "Dúvida sobre planos", "Quero falar com o suporte"],
};

function topicFor(pathname: string): Topic {
  return TOPICS.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1] ?? DEFAULT_TOPIC;
}

function wasDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberDismiss() {
  try {
    sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // armazenamento indisponível (aba anônima, cookies bloqueados): só não lembra
  }
}

type Phase = "hidden" | "typing" | "message";

export function HelpBubble() {
  const pathname = usePathname() ?? "/";
  const topic = topicFor(pathname);
  const chatOpen = useCrispChatOpen();
  const [phase, setPhase] = useState<Phase>("hidden");
  const [hovered, setHovered] = useState(false);
  const triggered = useRef(false);

  const dismiss = useCallback(() => {
    setPhase("hidden");
    rememberDismiss();
  }, []);

  // Aparece após alguns segundos ou quando o leitor rola boa parte da página.
  useEffect(() => {
    if (wasDismissed()) return;

    function trigger() {
      if (triggered.current) return;
      triggered.current = true;
      setPhase("typing");
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER) trigger();
    }

    const timer = setTimeout(trigger, SHOW_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    const timer = setTimeout(() => setPhase("message"), TYPING_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "message" || hovered) return;
    const timer = setTimeout(dismiss, AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [phase, hovered, dismiss]);

  function ask(text?: string) {
    openCrispChat({ message: text, page: pathname });
    dismiss();
  }

  // Com o chat aberto o balão some, para não ficar por cima da janela do Crisp.
  if (chatOpen) return null;

  const open = phase !== "hidden";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="Assistente ShopEasy"
          aria-live="polite"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          className={cn(
            "relative w-80 max-w-[calc(100vw-2rem)] animate-dc-pop rounded-2xl border p-4 shadow-2xl",
            "border-fd-border bg-fd-popover text-fd-popover-foreground",
          )}
        >
          <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-fd-border bg-fd-popover" />

          <button
            type="button"
            onClick={dismiss}
            aria-label="Fechar assistente"
            className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <FiX className="size-3.5" />
          </button>

          <div className="flex items-center gap-2 pr-6">
            <span className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
              <HiSparkles className="size-4" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-fd-popover bg-emerald-400" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Assistente ShopEasy</p>
              <p className="text-[11px] text-fd-muted-foreground">Online agora</p>
            </div>
          </div>

          <div className="mt-3 min-h-10 rounded-xl rounded-tl-sm bg-fd-muted px-3 py-2.5 text-sm">
            {phase === "typing" ? (
              <span className="flex h-5 items-center gap-1" aria-label="Digitando">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="size-1.5 animate-dc-typing rounded-full bg-fd-muted-foreground"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </span>
            ) : (
              <p className="animate-dc-in">{topic.message}</p>
            )}
          </div>

          {phase === "message" && (
            <div className="mt-3 flex animate-dc-in flex-col gap-1.5">
              {topic.chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => ask(chip)}
                  className="rounded-full border border-emerald-500/40 px-3 py-1.5 text-left text-xs text-emerald-700 transition-colors hover:bg-emerald-500/10 dark:text-emerald-300"
                >
                  {chip}
                </button>
              ))}
              <button
                type="button"
                onClick={() => ask()}
                className="mt-1 text-left text-xs text-fd-muted-foreground underline-offset-2 hover:underline"
              >
                Escrever outra pergunta →
              </button>
            </div>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => ask()}
        aria-label="Precisa de ajuda? Abrir chat"
        className={cn(
          "group relative flex h-12 w-12 items-center justify-center rounded-full text-white sm:h-14 sm:w-14",
          "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20",
          "transition-transform duration-300 hover:scale-105 hover:shadow-emerald-500/40 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent",
        )}
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-20 motion-reduce:animate-none" />
        )}
        <FiMessageCircle className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}
