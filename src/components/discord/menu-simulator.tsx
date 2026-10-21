"use client";

import { useState } from "react";
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

interface DiscordMenuSimulatorProps {
  /** Comando que abre o menu, ex.: "/configuracoes". */
  command?: string;
  start: string;
  screens: Record<string, MenuScreen>;
  modals?: Record<string, MenuModal>;
  ephemeral?: boolean;
  /** Texto de ajuda acima do simulador. */
  hint?: string;
}

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
}: DiscordMenuSimulatorProps) {
  const [history, setHistory] = useState<string[]>([start]);
  const [modal, setModal] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const current = history[history.length - 1];
  const screen = screens[current] ?? screens[start];

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

  function jumpTo(index: number) {
    setToast(null);
    setHistory((h) => h.slice(0, index + 1));
  }

  const activeModal = modal ? modals[modal] : null;

  return (
    <figure className="not-prose my-6 flex flex-col gap-2">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs text-fd-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {hint}
        </span>
        {history.length > 1 && (
          <button
            type="button"
            onClick={() => jumpTo(0)}
            className="rounded-md border px-2 py-0.5 hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            ↺ Reiniciar
          </button>
        )}
      </figcaption>

      {history.length > 1 && (
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
                    last
                      ? "bg-fd-primary/10 font-medium text-fd-primary"
                      : "text-fd-muted-foreground hover:bg-fd-accent",
                  )}
                >
                  {screens[id]?.title ?? id}
                </button>
              </span>
            );
          })}
        </nav>
      )}

      <div className="relative">
        <DiscordMessage command={command} ephemeral={ephemeral}>
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
              run({ goto: activeModal.goto, toast: activeModal.toast });
            }}
          />
        )}
      </div>
    </figure>
  );
}

function Block({ block, onAction }: { block: MenuBlock; onAction: (a: MenuAction) => void }) {
  if (typeof block === "string") return <DiscordMarkdown content={block} />;

  if ("separator" in block) return <DiscordSeparator hidden={block.hidden} />;

  if ("buttons" in block)
    return (
      <DcActionRow>
        {block.buttons.map((button) => (
          <DcButton
            key={button.label}
            label={button.label}
            emoji={button.emoji}
            style={button.style}
            disabled={button.disabled}
            onClick={() => onAction(button)}
          />
        ))}
      </DcActionRow>
    );

  if ("section" in block)
    return (
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <DiscordMarkdown content={block.section} />
        </div>
        <DcButton
          label={block.button.label}
          emoji={block.button.emoji}
          style={block.button.style}
          disabled={block.button.disabled}
          onClick={() => onAction(block.button)}
        />
      </div>
    );

  const { select } = block;
  return (
    <DiscordSelect
      placeholder={select.placeholder}
      options={select.options}
      multiple={select.multiple}
      defaultValues={select.defaultValues}
      disabled={select.disabled}
      keepSelection={select.multiple ?? false}
      onSelect={(option) => onAction(option as MenuSelectOption)}
    />
  );
}
