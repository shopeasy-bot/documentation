"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { FiArrowUp, FiHeadphones, FiX } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { cn } from "@/lib/cn";
import { openCrispChat } from "@/components/crisp";
import { AnswerMarkdown } from "@/components/ai/answer-markdown";

const GREETED_KEY = "shopeasy-assistant-greeted";
const TROUBLE_KEY = "shopeasy-assistant-trouble";
const SHOW_DELAY_MS = 3500;
const SCROLL_TRIGGER = 0.25;
const TYPING_MS = 1100;
const CHAR_MS = 18;
const AUTO_HIDE_MS = 30000;

/** Evento para abrir o assistente de qualquer lugar: `window.dispatchEvent(new CustomEvent(ASSISTANT_EVENT, { detail: { question } }))`. */
export const ASSISTANT_EVENT = "shopeasy:assistant";

interface Topic {
  message: string;
  chips: string[];
}

// Mensagens por área da documentação. A primeira que casar com o caminho é usada.
const TOPICS: [prefix: string, topic: Topic][] = [
  ["/docs/pagamentos", {
    message: "Vi que você está configurando pagamentos. Quer ajuda para conectar um gateway?",
    chips: ["Como conectar o PIX Manual?", "Qual gateway posso usar no plano grátis?", "O pagamento não foi aprovado, e agora?"],
  }],
  ["/docs/carrinho", {
    message: "Dúvidas sobre o carrinho ou o checkout? Posso te ajudar com isso.",
    chips: ["Por que o carrinho não foi criado?", "Como funciona a entrega?", "Como aumentar o tempo do carrinho?"],
  }],
  ["/docs/products", {
    message: "Montando seus produtos? Posso ajudar com estoque, imagens ou catálogos.",
    chips: ["Como adicionar estoque automático?", "Como criar um catálogo?", "Quantas imagens posso ter na galeria?"],
  }],
  ["/docs/configs", {
    message: "Configurando a loja? Me conte onde travou que eu te ajudo.",
    chips: ["Quais canais preciso configurar?", "Como dar permissão à equipe?", "Por que minhas alterações sumiram?"],
  }],
  ["/docs/plans", {
    message: "Em dúvida sobre qual plano escolher? Posso te ajudar a decidir.",
    chips: ["Qual plano libera o Mercado Pago?", "O que muda no plano Completo?", "Como ganho a recompensa de 10 vendas?"],
  }],
  ["/docs/comprar-plano", {
    message: "Precisa de ajuda para adquirir ou renovar o plano?",
    chips: ["Como comprar um plano?", "Como renovar meu plano?", "Como resgatar um código?"],
  }],
  ["/docs/bot-exclusivo", {
    message: "Quer colocar seu próprio bot no ar? Posso te guiar.",
    chips: ["Como configurar o bot exclusivo?", "O que são as automações?", "Quais gateways são exclusivos?"],
  }],
  ["/docs/tickets", {
    message: "Configurando os tickets? Posso ajudar.",
    chips: ["Como enviar o painel de tickets?", "Como definir cargos de suporte?", "Quantos tickets um usuário pode abrir?"],
  }],
  ["/docs/dev", {
    message: "Integrando com a API do ShopEasy? Tire suas dúvidas por aqui.",
    chips: ["Como gerar uma chave de API?", "Como autenticar na API?", "Quais endpoints existem?"],
  }],
  ["/docs", {
    message: "Oi! 👋 Sou o assistente do ShopEasy. Posso te ajudar a montar sua loja?",
    chips: ["Como começar minha loja?", "Quais pagamentos são aceitos?", "O ShopEasy cobra comissão?"],
  }],
];

const DEFAULT_TOPIC: Topic = {
  message: "Oi! 👋 Precisa de ajuda com o ShopEasy?",
  chips: ["Como começar minha loja?", "Quais são os planos?", "Quero falar com o suporte"],
};

// Reação quando o leitor chega a uma seção de erros ou problemas.
const TROUBLE_TOPIC: Topic = {
  message: "Percebi que você está na parte de problemas. Me conta o que está acontecendo?",
  chips: ["O bot não responde aos comandos", "Recebi uma mensagem de erro", "O carrinho não abre"],
};
const TROUBLE_HEADING = /problema|erro|solução|não está|não foi|não consigo/i;

function topicFor(pathname: string): Topic {
  return TOPICS.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1] ?? DEFAULT_TOPIC;
}

function readFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeFlag(key: string) {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    // armazenamento indisponível (aba anônima, cookies bloqueados): só não lembra
  }
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Phase = "hidden" | "typing" | "writing" | "done";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
  question?: string;
}

export function HelpFab() {
  const pathname = usePathname() ?? "/";
  const [topic, setTopic] = useState<Topic>(() => topicFor(pathname));
  const [phase, setPhase] = useState<Phase>("hidden");
  const [written, setWritten] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [unread, setUnread] = useState(false);
  const [aiEnabled, setAiEnabled] = useState<boolean | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const shownRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const busy = chat.some((m) => m.pending);

  // Descobre se o assistente de IA está configurado no servidor.
  useEffect(() => {
    fetch("/api/ask")
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d: { enabled?: boolean }) => setAiEnabled(Boolean(d.enabled)))
      .catch(() => setAiEnabled(false));
  }, []);

  const show = useCallback((next: Topic, flag?: string) => {
    if (flag) {
      if (readFlag(flag)) return;
      writeFlag(flag);
    }
    shownRef.current = true;
    setTopic(next);
    setWritten(0);
    setUnread(false);
    setPhase(prefersReducedMotion() ? "done" : "typing");
  }, []);

  // Saudação: após alguns segundos ou quando o leitor rola um pouco a página.
  useEffect(() => {
    if (readFlag(GREETED_KEY)) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      show(topicFor(pathname), GREETED_KEY);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_TRIGGER) fire();
    };
    const timer = setTimeout(fire, SHOW_DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, show]);

  // Reage ao que está sendo lido: seções de erros e problemas.
  useEffect(() => {
    if (readFlag(TROUBLE_KEY)) return;
    const headings = [...document.querySelectorAll("article h2, article h3")].filter((h) =>
      TROUBLE_HEADING.test(h.textContent ?? ""),
    );
    if (!headings.length) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          // Dá um tempo para a pessoa começar a ler antes de oferecer ajuda.
          timer = setTimeout(() => {
            if (phase === "hidden") show(TROUBLE_TOPIC, TROUBLE_KEY);
          }, 2500);
        }
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pathname, show, phase]);

  useEffect(() => {
    if (phase !== "typing") return;
    const timer = setTimeout(() => setPhase("writing"), TYPING_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "writing") return;
    if (written >= topic.message.length) {
      setPhase("done");
      return;
    }
    const timer = setTimeout(() => setWritten((w) => w + 1), CHAR_MS);
    return () => clearTimeout(timer);
  }, [phase, written, topic.message]);

  // Some sozinho só se a pessoa não interagiu.
  useEffect(() => {
    if (phase !== "done" || hovered || chat.length) return;
    const timer = setTimeout(() => {
      setPhase("hidden");
      setUnread(true);
    }, AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [phase, hovered, chat.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [chat]);

  const ask = useCallback(
    async (question: string) => {
      const q = question.trim();
      if (!q) return;
      setPhase("done");
      setWritten(topic.message.length);
      setInput("");

      if (!aiEnabled) {
        openCrispChat({ message: q, page: pathname });
        return;
      }

      const history = chat
        .filter((m) => !m.pending && m.content)
        .map(({ role, content }) => ({ role, content }));
      setChat((c) => [...c, { role: "user", content: q }, { role: "assistant", content: "", pending: true, question: q }]);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const update = (fn: (m: ChatMessage) => ChatMessage) =>
        setChat((c) => c.map((m, i) => (i === c.length - 1 ? fn(m) : m)));

      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q, page: pathname, history }),
          signal: controller.signal,
        });
        if (!response.ok || !response.body) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error ?? "Não consegui responder agora.");
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          update((m) => ({ ...m, content: m.content + chunk }));
        }
        update((m) => ({ ...m, pending: false }));
      } catch (error) {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : "Não consegui responder agora.";
        update((m) => ({ ...m, pending: false, content: `${message} Você pode falar com o suporte.` }));
      }
    },
    [aiEnabled, chat, pathname, topic.message.length],
  );

  // Abre o assistente a partir de outros lugares da página.
  useEffect(() => {
    function onOpen(event: Event) {
      const question = (event as CustomEvent<{ question?: string }>).detail?.question;
      shownRef.current = true;
      setUnread(false);
      setPhase("done");
      setWritten(topic.message.length);
      if (question) void ask(question);
    }
    window.addEventListener(ASSISTANT_EVENT, onOpen);
    return () => window.removeEventListener(ASSISTANT_EVENT, onOpen);
  }, [ask, topic.message.length]);

  function toggle() {
    if (phase === "hidden") {
      shownRef.current = true;
      setUnread(false);
      setPhase("done");
      setWritten(topic.message.length);
    } else setPhase("hidden");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!busy) void ask(input);
  }

  const open = phase !== "hidden";
  const greeting = phase === "done" ? topic.message : topic.message.slice(0, written);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="Assistente ShopEasy"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          className={cn(
            "relative max-w-[calc(100vw-2rem)] origin-bottom-right animate-se-pop-in transition-[width] duration-300",
            chat.length ? "w-[26rem]" : "w-[22rem]",
          )}
        >
          <div className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-emerald-400/60 via-indigo-500/40 to-fuchsia-500/60 opacity-80 blur-[2px]" />
          <div className="relative flex max-h-[min(36rem,calc(100vh-8rem))] flex-col rounded-[1.3rem] border border-white/10 bg-neutral-950/95 text-neutral-100 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            <header className="flex items-center gap-3 px-4 pb-2 pt-4 pr-10">
              <Orb size="md" />
              <div className="leading-tight">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  Assistente ShopEasy
                  {aiEnabled && (
                    <span className="rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-black">
                      IA
                    </span>
                  )}
                </p>
                <p className="flex items-center gap-1 text-[11px] text-emerald-300/80">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {phase === "typing" || busy ? "digitando…" : "online agora"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPhase("hidden")}
                aria-label="Fechar assistente"
                className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FiX className="size-4" />
              </button>
            </header>

            <div ref={scrollRef} aria-live="polite" className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-2 text-sm leading-relaxed">
              <Bubble>
                {phase === "typing" ? (
                  <TypingDots />
                ) : (
                  <p>
                    {greeting}
                    {phase === "writing" && (
                      <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-se-blink bg-emerald-300" />
                    )}
                  </p>
                )}
              </Bubble>

              {phase === "done" && chat.length === 0 && (
                <div className="flex flex-col gap-1.5">
                  {topic.chips.map((chip, i) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => void ask(chip)}
                      style={{ animationDelay: `${i * 90}ms` }}
                      className="group flex animate-dc-in items-center justify-between gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.04] px-3 py-2 text-left text-xs text-emerald-100 opacity-0 [animation-fill-mode:forwards] transition-colors hover:border-emerald-400/60 hover:bg-emerald-400/15"
                    >
                      {chip}
                      <span className="text-emerald-300 transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
                  ))}
                </div>
              )}

              {chat.map((message, i) =>
                message.role === "user" ? (
                  <p
                    key={i}
                    className="ml-8 animate-dc-in self-end rounded-2xl rounded-br-md bg-gradient-to-br from-emerald-500 to-teal-600 px-3.5 py-2 text-white"
                  >
                    {message.content}
                  </p>
                ) : (
                  <div key={i} className="flex animate-dc-in flex-col gap-1.5">
                    <Bubble>
                      {message.pending && !message.content ? (
                        <TypingDots />
                      ) : (
                        <>
                          <AnswerMarkdown text={message.content} />
                          {message.pending && (
                            <span className="ml-0.5 inline-block h-4 w-0.5 animate-se-blink bg-emerald-300" />
                          )}
                        </>
                      )}
                    </Bubble>
                    {!message.pending && (
                      <button
                        type="button"
                        onClick={() => openCrispChat({ message: message.question, page: pathname })}
                        className="ml-1 inline-flex w-fit items-center gap-1.5 text-[11px] text-neutral-400 hover:text-emerald-300"
                      >
                        <FiHeadphones className="size-3" /> Não resolveu? Falar com uma pessoa
                      </button>
                    )}
                  </div>
                ),
              )}
            </div>

            {phase === "done" && (
              <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={600}
                  placeholder={aiEnabled ? "Pergunte qualquer coisa sobre o ShopEasy…" : "Escreva sua dúvida para o suporte…"}
                  aria-label="Sua pergunta"
                  className="h-10 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm outline-none placeholder:text-neutral-500 focus:border-emerald-400/60"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Enviar pergunta"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white transition-opacity disabled:opacity-40"
                >
                  <FiArrowUp className="size-4" />
                </button>
              </form>
            )}
            {phase === "done" && aiEnabled && (
              <p className="px-4 pb-3 text-[10px] text-neutral-500">
                Respostas geradas por IA com base nesta documentação. Podem conter erros.
              </p>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Fechar assistente" : "Abrir assistente de ajuda"}
        aria-expanded={open}
        className={cn(
          "group relative flex size-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          !open && "animate-se-float",
        )}
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30 motion-reduce:animate-none" />
        )}
        <Orb size="lg" />
        {unread && (
          <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full border-2 border-black bg-rose-500 text-[10px] font-bold text-white">
            1
          </span>
        )}
      </button>
    </div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return <div className="mr-6 rounded-2xl rounded-tl-md bg-white/[0.06] px-3.5 py-2.5">{children}</div>;
}

function TypingDots() {
  return (
    <span className="flex h-5 items-center gap-1" aria-label="Digitando">
      {[0, 150, 300].map((delay) => (
        <span key={delay} className="size-2 animate-dc-typing rounded-full bg-emerald-300" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  );
}

/** Avatar animado do assistente: orbe com anel girando. */
function Orb({ size }: { size: "md" | "lg" }) {
  return (
    <span className={cn("relative flex shrink-0 items-center justify-center", size === "lg" ? "size-14" : "size-10")}>
      <span className="absolute inset-0 animate-se-spin rounded-full bg-[conic-gradient(from_0deg,#34d399,#6366f1,#d946ef,#34d399)] motion-reduce:animate-none" />
      <span className="absolute inset-[3px] rounded-full bg-neutral-950" />
      <span className="absolute inset-[5px] rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-indigo-600 opacity-90" />
      <HiSparkles className={cn("relative text-white drop-shadow", size === "lg" ? "size-6" : "size-4")} />
    </span>
  );
}
