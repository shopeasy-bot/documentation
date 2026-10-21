import Link from "next/link";
import type { ReactNode } from "react";

// Markdown mínimo para as respostas do assistente: parágrafos, listas,
// **negrito**, `código` e [links](/docs/...). Links externos abrem em nova aba.

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

function inline(text: string, key: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const k = `${key}-${i}`;
    if (!part) return null;
    if (part.startsWith("**")) return <strong key={k}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`"))
      return (
        <code key={k} className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-emerald-200">
          {part.slice(1, -1)}
        </code>
      );
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const cls = "font-medium text-emerald-300 underline underline-offset-2 hover:text-emerald-200";
      if (href.startsWith("/"))
        return (
          <Link key={k} href={href} className={cls}>
            {label}
          </Link>
        );
      if (/^https:\/\//.test(href))
        return (
          <a key={k} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {label}
          </a>
        );
      return <span key={k}>{label}</span>;
    }
    return <span key={k}>{part}</span>;
  });
}

export function AnswerMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    blocks.push(
      <Tag
        key={`list-${blocks.length}`}
        className={list.ordered ? "ml-4 list-decimal space-y-1" : "ml-4 list-disc space-y-1"}
      >
        {list.items.map((item, i) => (
          <li key={i}>{inline(item, `li-${blocks.length}-${i}`)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };

  text.split("\n").forEach((raw, index) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flush();
      list ??= { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      return;
    }
    flush();
    if (!line.trim()) return;
    const heading = line.match(/^#{1,4}\s+(.*)$/);
    blocks.push(
      heading ? (
        <p key={`p-${index}`} className="font-semibold text-white">
          {inline(heading[1], `h-${index}`)}
        </p>
      ) : (
        <p key={`p-${index}`}>{inline(line, `p-${index}`)}</p>
      ),
    );
  });
  flush();

  return <div className="space-y-2">{blocks}</div>;
}
