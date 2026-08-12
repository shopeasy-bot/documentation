"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { WHATSAPP_SUPPORT_URL } from "@/lib/contacts";
import { JetBrains_Mono, Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

type FeedbackType = "reclamacao" | "sugestao";
type Accent = "emerald" | "red";

const inputClass = cn(
  "w-full rounded-xl border px-4 py-3 text-sm transition-shadow",
  "border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20",
  "text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500",
  "focus:outline-none focus:ring-2 focus:ring-emerald-500/40",
);

export function FeedbackForm({
  type,
  accent = "emerald",
}: {
  type: FeedbackType;
  accent?: Accent;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (message.trim().length < 10) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, contact, message, website }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setContact("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center max-w-xl w-full">
        <p className={`${poppins.className} text-neutral-800 dark:text-neutral-100`}>
          Recebemos sua mensagem!
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Obrigado por nos ajudar a melhorar o ShopEasy. Vamos analisar com atenção.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl w-full text-left">
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-neutral-500 dark:text-neutral-400">Nome (opcional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={120}
          className={inputClass}
          placeholder="Como podemos te chamar?"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-neutral-500 dark:text-neutral-400">
          E-mail ou WhatsApp (opcional, para retorno)
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          maxLength={200}
          className={inputClass}
          placeholder="seu@email.com ou (00) 00000-0000"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-neutral-500 dark:text-neutral-400">Mensagem</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={10}
          maxLength={2000}
          rows={6}
          className={cn(inputClass, "resize-none")}
          placeholder={
            type === "reclamacao"
              ? "Conte o que aconteceu, com o máximo de detalhes..."
              : "Conte sua ideia, com o máximo de detalhes..."
          }
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">
          Não conseguimos enviar agora. Tente de novo ou fale com a gente pelo{" "}
          <Link href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="underline">
            WhatsApp
          </Link>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          jetbrains.className,
          "text-xs uppercase tracking-widest rounded-xl px-5 py-3 border transition-all duration-300 disabled:opacity-50",
          accent === "red"
            ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
        )}
      >
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
