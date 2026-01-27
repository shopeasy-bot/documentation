"use client";

import { useMemo } from "react";

export function OpenChatGPTButton({
  markdownUrl,
  label = "Abrir no ChatGPT",
}: {
  markdownUrl: string;
  label?: string;
}) {
  const href = useMemo(() => {
    const absolute = new URL(markdownUrl, window.location.origin).toString();
    const text = `Leia ${absolute}, quero fazer perguntas sobre isso.`;
    return `https://chatgpt.com/?hints=search&q=${encodeURIComponent(text)}`;
  }, [markdownUrl]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted"
    >
      <img
        src="/images/chatgpt.svg"
        alt="ChatGPT"
        className="h-4 w-4"
      />
      {label}
    </a>
  );
}
