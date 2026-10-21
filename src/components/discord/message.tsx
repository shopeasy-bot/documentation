import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ggsans } from "./font";

/* ------------------------------------------------------------------ */
/* Markdown do Discord (subconjunto usado pelo ShopEasy)               */
/* ------------------------------------------------------------------ */

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|~~[^~]+~~|`[^`]+`|<#[^>]+>|<@&[^>]+>|<@[^>]+>|\*[^*]+\*)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE_PATTERN).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={key} className="font-bold text-dc-header">
          {renderInline(part.slice(2, -2), key)}
        </strong>
      );
    if (part.startsWith("~~") && part.endsWith("~~"))
      return <s key={key}>{part.slice(2, -2)}</s>;
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={key}
          className="rounded bg-dc-darker px-1 py-0.5 text-[0.85em] text-dc-text"
        >
          {part.slice(1, -1)}
        </code>
      );
    if (part.startsWith("<#"))
      return <Mention key={key}>#{part.slice(2, -1)}</Mention>;
    if (part.startsWith("<@&"))
      return <Mention key={key}>@{part.slice(3, -1)}</Mention>;
    if (part.startsWith("<@"))
      return <Mention key={key}>@{part.slice(2, -1)}</Mention>;
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*"))
      return <em key={key}>{part.slice(1, -1)}</em>;
    return <span key={key}>{part}</span>;
  });
}

function Mention({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-dc-mention px-0.5 font-medium text-[#c9cdfb]">
      {children}
    </span>
  );
}

/**
 * Renderiza texto no formato de mensagem do Discord:
 * `# ## ###` títulos, `-#` subtexto, `>` e `>>>` citação,
 * `**negrito**`, `~~riscado~~`, `` `código` ``, `<#canal>`, `<@usuário>` e `<@&cargo>`.
 */
export function DiscordMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let quoteAll = false;

  lines.forEach((raw, index) => {
    const key = `l-${index}`;
    let line = raw;
    let quoted = quoteAll;

    if (line.startsWith(">>> ")) {
      quoteAll = true;
      quoted = true;
      line = line.slice(4);
    } else if (line.startsWith("> ")) {
      quoted = true;
      line = line.slice(2);
    } else if (line === ">") {
      quoted = true;
      line = "";
    }

    let node: ReactNode;
    if (line.startsWith("### "))
      node = (
        <div className="mt-1 text-base font-bold text-dc-header">
          {renderInline(line.slice(4), key)}
        </div>
      );
    else if (line.startsWith("## "))
      node = (
        <div className="mt-1 text-xl font-bold text-dc-header">
          {renderInline(line.slice(3), key)}
        </div>
      );
    else if (line.startsWith("# "))
      node = (
        <div className="mt-1 text-2xl font-extrabold text-dc-header">
          {renderInline(line.slice(2), key)}
        </div>
      );
    else if (line.startsWith("-# "))
      node = (
        <div className="text-xs text-dc-muted">
          {renderInline(line.slice(3), key)}
        </div>
      );
    else if (line.startsWith("- "))
      node = (
        <div className="flex gap-2">
          <span aria-hidden>•</span>
          <span>{renderInline(line.slice(2), key)}</span>
        </div>
      );
    else if (line === "") node = <div className="h-2" />;
    else node = <div>{renderInline(line, key)}</div>;

    nodes.push(
      quoted ? (
        <div key={key} className="flex gap-2">
          <span className="w-1 shrink-0 rounded bg-dc-grey" aria-hidden />
          <div className="min-w-0 flex-1">{node}</div>
        </div>
      ) : (
        <div key={key}>{node}</div>
      ),
    );
  });

  return (
    <div className="text-[15px] leading-[1.375rem] text-dc-text break-words">
      {nodes}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mensagem                                                            */
/* ------------------------------------------------------------------ */

interface DiscordMessageProps {
  children: ReactNode;
  /** Nome exibido no cabeçalho (padrão: ShopEasy). */
  author?: string;
  avatar?: string;
  /** Mostra a etiqueta APP ao lado do nome. */
  bot?: boolean;
  /** Mensagem efêmera: só quem usou o comando vê. */
  ephemeral?: boolean;
  /** Comando que originou a resposta, exibido acima da mensagem. */
  command?: string;
  user?: string;
  timestamp?: string;
  className?: string;
}

export function DiscordMessage({
  children,
  author = "ShopEasy",
  avatar = "/shopeasy.svg",
  bot = true,
  ephemeral = false,
  command,
  user = "você",
  timestamp = "Hoje às 12:00",
  className,
}: DiscordMessageProps) {
  return (
    <div
      className={cn(
        ggsans.className,
        "not-prose rounded-lg bg-dc-chat px-4 py-3 text-dc-text",
        className,
      )}
    >
      {command && (
        <div className="mb-1 flex items-center gap-1.5 pl-12 text-[13px] text-dc-muted">
          <span className="font-medium text-dc-header/80">@{user}</span>
          <span>usou</span>
          <span className="font-medium text-dc-link">{command}</span>
        </div>
      )}
      <div className="flex gap-4">
        <img
          src={avatar}
          alt=""
          className="mt-0.5 size-10 shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-dc-header">{author}</span>
            {bot && (
              <span className="rounded bg-dc-blurple px-1 py-px text-[10px] font-semibold leading-tight text-white">
                APP
              </span>
            )}
            <span className="text-xs text-dc-muted">{timestamp}</span>
          </div>
          <div className="mt-1 flex flex-col gap-2">{children}</div>
          {ephemeral && (
            <div className="mt-1.5 flex items-center gap-1 text-xs text-dc-muted">
              <EyeIcon />
              <span>Somente você pode ver esta mensagem •</span>
              <span className="text-dc-link">Ignorar mensagem</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M12 5C5.648 5 1 12 1 12s4.648 7 11 7 11-7 11-7-4.648-7-11-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Container (Components V2)                                           */
/* ------------------------------------------------------------------ */

interface DiscordContainerProps {
  children?: ReactNode;
  /** Cor da barra lateral (hex). Padrão: cor da loja. */
  accent?: string;
  /** Atalho para conteúdo em Markdown do Discord. */
  content?: string;
  className?: string;
}

export function DiscordContainer({
  children,
  accent = "#5865F2",
  content,
  className,
}: DiscordContainerProps) {
  return (
    <div
      className={cn(
        "relative flex max-w-[600px] flex-col gap-2 overflow-hidden rounded-lg border border-dc-border bg-dc-container py-3 pl-5 pr-4",
        className,
      )}
    >
      <span
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      {content && <DiscordMarkdown content={content} />}
      {children}
    </div>
  );
}

export function DiscordSeparator({ hidden = false }: { hidden?: boolean }) {
  return hidden ? (
    <div className="h-1" />
  ) : (
    <hr className="my-1 border-0 border-t border-dc-border" />
  );
}
