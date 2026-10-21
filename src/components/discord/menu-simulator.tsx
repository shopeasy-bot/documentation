"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minimize2, Play, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  DcActionRow,
  DcButton,
  type DcButtonStyle,
  type DcModalField,
  DiscordModal,
  DiscordSelect,
  type DcSelectOption,
} from "./controls";
import { DiscordContainer, DiscordMarkdown, DiscordMessage, DiscordSeparator } from "./message";
import { ggsans } from "./font";

/* ------------------------------------------------------------------ */
/* Tipos (dados vindos do MDX)                                         */
/* ------------------------------------------------------------------ */

interface MenuAction {
  /** Tela para onde navegar. */
  goto?: string;
  /** Modal para abrir. */
  modal?: string;
  /** Mensagem curta exibida como resposta do bot. */
  toast?: string;
}

export interface MenuButton extends MenuAction {
  label: string;
  emoji?: string;
  style?: DcButtonStyle;
  disabled?: boolean;
}

export interface MenuSelectOption extends DcSelectOption, MenuAction {}

export type MenuBlock =
  | string
  | { separator: true; hidden?: boolean }
  | { buttons: MenuButton[] }
  | {
      select: {
        placeholder?: string;
        options: MenuSelectOption[];
        multiple?: boolean;
        defaultValues?: string[];
        disabled?: boolean;
      };
    }
  | { section: string; button: MenuButton };

export interface MenuScreen {
  /** Rótulo da tela no trilho de navegação. */
  title?: string;
  accent?: string;
  blocks: MenuBlock[];
}

export interface MenuModal {
  title: string;
  fields: DcModalField[];
  note?: string;
  /** Tela exibida depois de enviar. */
  goto?: string;
  toast?: string;
}

export interface TourStep {
  /** Rótulo do botão, da opção ou o placeholder do seletor que deve ser clicado. */
  target: string;
  /** Instrução exibida ao leitor. */
  text: string;
  /** "submit" avança quando o formulário aberto é enviado. */
  on?: "click" | "submit";
}

interface DiscordMenuSimulatorProps {
  /** Comando que abre o menu, ex.: "/configuracoes". */
  command?: string;
  start: string;
  screens: Record<string, MenuScreen>;
  modals?: Record<string, MenuModal>;
  ephemeral?: boolean;
  /** Texto de ajuda acima do simulador. */
  hint?: string;
  /** Passos do tour guiado. */
  tour?: TourStep[];
  /** Nome do canal exibido no modo tela cheia. */
  channel?: string;
}

/* ------------------------------------------------------------------ */
/* Tour                                                                */
/* ------------------------------------------------------------------ */

interface TourState {
  target?: string;
  hit: (label: string, kind: "click" | "submit") => void;
}

const TourContext = createContext<TourState>({ hit: () => {} });

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */

export function DiscordMenuSimulator({
  command,
  start,
  screens,
  modals = {},
  ephemeral = true,
  hint = "Simulação interativa: clique nos botões e menus para navegar.",
  tour,
  channel = "loja",
}: DiscordMenuSimulatorProps) {
  const [history, setHistory] = useState<string[]>([start]);
  const [modal, setModal] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = history[history.length - 1];
  const screen = screens[current] ?? screens[start];
  const activeModal = modal ? modals[modal] : null;
  const step = tour && tourStep !== null ? tour[tourStep] : undefined;
  const tourDone = tour && tourStep !== null && tourStep >= tour.length;

  useEffect(() => {
    if (!fullscreen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !modal) setFullscreen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, modal]);

  function run(action: MenuAction) {
    setToast(action.toast ?? null);
    if (action.modal && modals[action.modal]) {
      setModal(action.modal);
      return;
    }
    if (action.goto && screens[action.goto] && action.goto !== current) {
      setHistory((h) => [...h, action.goto as string]);
    }
  }

  function reset() {
    setToast(null);
    setModal(null);
    setHistory([start]);
  }

  function jumpTo(index: number) {
    setToast(null);
    setHistory((h) => h.slice(0, index + 1));
  }

  function startTour() {
    reset();
    setTourStep(0);
  }

  const tourState: TourState = {
    target: step?.target,
    hit(label, kind) {
      if (!step || tourStep === null) return;
      if (label === step.target && (step.on ?? "click") === kind) setTourStep(tourStep + 1);
    },
  };

  const toolbar = (
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-fd-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        {hint}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {tour && (
          <ToolbarButton onClick={startTour} highlight={tourStep === null}>
            <Play className="size-3" /> {tourStep === null ? "Tour guiado" : "Reiniciar tour"}
          </ToolbarButton>
        )}
        {history.length > 1 && (
          <ToolbarButton onClick={reset}>
            <RotateCcw className="size-3" /> Reiniciar
          </ToolbarButton>
        )}
        <ToolbarButton onClick={() => setFullscreen((v) => !v)}>
          {fullscreen ? <Minimize2 className="size-3" /> : <Maximize2 className="size-3" />}
          {fullscreen ? "Sair da tela cheia" : "Tela cheia"}
        </ToolbarButton>
      </div>
    </div>
  );

  const tourBar = tour && tourStep !== null && (
    <div
      role="status"
      className={cn(
        "flex animate-dc-in items-center gap-3 rounded-xl border px-3 py-2 text-sm",
        tourDone
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          : "border-yellow-400/40 bg-yellow-400/10 text-yellow-100",
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black",
          tourDone ? "bg-emerald-400" : "bg-yellow-400",
        )}
      >
        {tourDone ? "✓" : tourStep + 1}
      </span>
      <span className="flex-1">
        {tourDone ? "Pronto! Você fez o fluxo completo. Explore à vontade." : boldText(step?.text ?? "")}
      </span>
      {!tourDone && (
        <span className="hidden text-xs opacity-70 sm:inline">
          {tourStep + 1}/{tour.length}
        </span>
      )}
      <button
        type="button"
        aria-label="Encerrar tour"
        onClick={() => setTourStep(null)}
        className="rounded p-1 opacity-70 hover:bg-white/10 hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );

  const breadcrumb = history.length > 1 && (
    <nav aria-label="Caminho no menu" className="flex flex-wrap items-center gap-1 text-xs">
      {history.map((id, index) => {
        const last = index === history.length - 1;
        return (
          <span key={`${id}-${index}`} className="flex items-center gap-1">
            {index > 0 && <span className="text-fd-muted-foreground">›</span>}
            <button
              type="button"
              disabled={last}
              onClick={() => jumpTo(index)}
              className={cn(
                "rounded px-1.5 py-0.5",
                last ? "bg-fd-primary/10 font-medium text-fd-primary" : "text-fd-muted-foreground hover:bg-fd-accent",
              )}
            >
              {screens[id]?.title ?? id}
            </button>
          </span>
        );
      })}
    </nav>
  );

  const message = (
    <div className="relative">
      <DiscordMessage command={command} ephemeral={ephemeral} className={fullscreen ? "rounded-none bg-transparent" : undefined}>
        <div key={current} className="animate-dc-in">
          <DiscordContainer accent={screen.accent}>
            {screen.blocks.map((block, index) => (
              <Block key={`${current}-${index}`} block={block} onAction={run} />
            ))}
          </DiscordContainer>
        </div>
        {toast && (
          <div
            role="status"
            className="max-w-[600px] animate-dc-in rounded-lg border border-dc-border bg-dc-container px-3 py-2"
          >
            <DiscordMarkdown content={toast} />
          </div>
        )}
      </DiscordMessage>

      {activeModal && (
        <DiscordModal
          inline={false}
          title={activeModal.title}
          fields={activeModal.fields}
          note={activeModal.note}
          onClose={() => setModal(null)}
          onSubmit={() => {
            setModal(null);
            tourState.hit(activeModal.title, "submit");
            run({ goto: activeModal.goto, toast: activeModal.toast });
          }}
        />
      )}
    </div>
  );

  const inline = (
    <figure className="not-prose my-6 flex flex-col gap-2">
      {toolbar}
      {tourBar}
      {breadcrumb}
      {fullscreen ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-fd-muted-foreground">
          Aberto em tela cheia
        </div>
      ) : (
        message
      )}
    </figure>
  );

  return (
    <TourContext.Provider value={tourState}>
      {inline}
      {fullscreen &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Simulação de ${command ?? "menu"}`}
            className="fixed inset-0 z-[70] flex animate-dc-pop items-center justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-6"
          >
            <DiscordFrame channel={channel} command={command} onClose={() => setFullscreen(false)}>
              <div className="flex flex-col gap-2 p-3 sm:p-4">
                {tourBar}
                {breadcrumb}
              </div>
              <div className="flex-1 overflow-y-auto pb-6">{message}</div>
              <div className="border-t border-black/30 p-3">
                <div className="flex items-center gap-2 rounded-lg bg-[#383a40] px-4 py-2.5 text-sm text-dc-muted">
                  <span className="text-lg leading-none">＋</span>
                  Conversar em #{channel}
                </div>
              </div>
            </DiscordFrame>
          </div>,
          document.body,
        )}
    </TourContext.Provider>
  );
}

/** Converte **negrito** em <strong>. */
function boldText(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

function ToolbarButton({
  children,
  onClick,
  highlight,
}: {
  children: ReactNode;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground",
        highlight && "border-yellow-400/50 bg-yellow-400/10 text-yellow-200 hover:bg-yellow-400/20",
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Moldura do Discord (tela cheia)                                     */
/* ------------------------------------------------------------------ */

const CHANNELS = ["anúncios", "loja", "vendas", "avaliações", "suporte"];

function DiscordFrame({
  children,
  channel,
  command,
  onClose,
}: {
  children: ReactNode;
  channel: string;
  command?: string;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        ggsans.className,
        "flex h-full max-h-[860px] w-full max-w-[1200px] overflow-hidden rounded-xl border border-white/10 bg-dc-chat text-dc-text shadow-2xl",
      )}
    >
      {/* Servidores */}
      <div className="hidden w-[72px] shrink-0 flex-col items-center gap-2 bg-dc-darker py-3 sm:flex">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-dc-blurple text-xl">💬</span>
        <span className="h-0.5 w-8 rounded bg-dc-border" />
        <span className="relative">
          <span className="absolute -left-3 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r bg-white" />
          <img src="/shopeasy.svg" alt="" className="size-12 rounded-2xl bg-dc-container p-1.5" />
        </span>
        {["🎮", "🎨", "🛍️"].map((e) => (
          <span key={e} className="flex size-12 items-center justify-center rounded-full bg-dc-container text-xl opacity-60">
            {e}
          </span>
        ))}
      </div>

      {/* Canais */}
      <div className="hidden w-60 shrink-0 flex-col bg-dc-container md:flex">
        <div className="flex h-12 items-center border-b border-black/30 px-4 font-semibold text-dc-header shadow-sm">
          Minha Loja
        </div>
        <div className="flex flex-col gap-0.5 p-2">
          <span className="px-2 pb-1 pt-3 text-xs font-semibold uppercase text-dc-muted">Canais de texto</span>
          {(CHANNELS.includes(channel) ? CHANNELS : [channel, ...CHANNELS]).map((c) => (
            <span
              key={c}
              className={cn(
                "flex items-center gap-1.5 rounded px-2 py-1.5 text-[15px]",
                c === channel ? "bg-dc-hover text-dc-header" : "text-dc-muted",
              )}
            >
              <span className="text-lg leading-none opacity-70">#</span> {c}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 bg-dc-darker/60 p-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">V</span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-dc-header">você</p>
            <p className="text-xs text-dc-muted">Online</p>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-black/30 px-4 shadow-sm">
          <span className="text-xl text-dc-muted">#</span>
          <span className="font-semibold text-dc-header">{channel}</span>
          {command && (
            <span className="ml-2 hidden truncate border-l border-dc-border pl-3 text-sm text-dc-muted sm:inline">
              Simulação de <span className="text-dc-link">{command}</span>
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar tela cheia"
            className="ml-auto rounded p-1.5 text-dc-muted hover:bg-dc-hover hover:text-dc-header"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Blocos                                                              */
/* ------------------------------------------------------------------ */

function TourTarget({ active, children }: { active: boolean; children: ReactNode }) {
  return <span className={cn("inline-flex", active && "se-tour-ring")}>{children}</span>;
}

function Block({ block, onAction }: { block: MenuBlock; onAction: (a: MenuAction) => void }) {
  const tour = useContext(TourContext);

  if (typeof block === "string") return <DiscordMarkdown content={block} />;

  if ("separator" in block) return <DiscordSeparator hidden={block.hidden} />;

  const button = (b: MenuButton) => (
    <TourTarget key={b.label} active={tour.target === b.label}>
      <DcButton
        label={b.label}
        emoji={b.emoji}
        style={b.style}
        disabled={b.disabled}
        onClick={() => {
          tour.hit(b.label, "click");
          onAction(b);
        }}
      />
    </TourTarget>
  );

  if ("buttons" in block) return <DcActionRow>{block.buttons.map(button)}</DcActionRow>;

  if ("section" in block)
    return (
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <DiscordMarkdown content={block.section} />
        </div>
        {button(block.button)}
      </div>
    );

  const { select } = block;
  const placeholder = select.placeholder ?? "Selecione uma opção";
  const optionTarget = select.options.find((o) => o.label === tour.target)?.label;
  return (
    <DiscordSelect
      placeholder={placeholder}
      options={select.options}
      multiple={select.multiple}
      defaultValues={select.defaultValues}
      disabled={select.disabled}
      keepSelection={select.multiple ?? false}
      highlight={tour.target === placeholder || optionTarget !== undefined}
      highlightOption={optionTarget}
      onOpenChange={(open) => open && tour.hit(placeholder, "click")}
      onSelect={(option) => {
        tour.hit(option.label, "click");
        onAction(option as MenuSelectOption);
      }}
    />
  );
}
