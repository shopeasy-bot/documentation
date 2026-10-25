"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { DiscordContainer, DiscordMessage } from "./discord/message";

interface Hsv {
  h: number; // 0-360
  s: number; // 0-1
  v: number; // 0-1
}

const PRESETS = ["#23A55A", "#5865F2", "#ED4245", "#FEE75C", "#EB459E", "#F47B67", "#02C497", "#FFFFFF", "#000000"];

function hsvToHex({ h, s, v }: Hsv): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    const c = v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    return Math.round(c * 255).toString(16).padStart(2, "0");
  };
  return `#${f(5)}${f(3)}${f(1)}`.toUpperCase();
}

function hexToHsv(hex: string): Hsv | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  let raw = m[1];
  if (raw.length === 3) raw = raw.split("").map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => Number.parseInt(raw.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max ? d / max : 0, v: max };
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/** Arrasta o ponteiro dentro de um elemento e devolve a posição relativa (0-1). */
function useDrag(onMove: (x: number, y: number) => void) {
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      onMove(clamp((e.clientX - rect.left) / rect.width), clamp((e.clientY - rect.top) / rect.height));
    },
    [onMove],
  );

  return {
    ref,
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      update(e);
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e);
    },
  };
}

export function ColorPicker({ defaultColor = "#23A55A" }: { defaultColor?: string }) {
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(defaultColor) ?? { h: 145, s: 0.79, v: 0.65 });
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const hex = hsvToHex(hsv);

  const area = useDrag(useCallback((x, y) => setHsv((c) => ({ ...c, s: x, v: 1 - y })), []));
  const hue = useDrag(useCallback((x) => setHsv((c) => ({ ...c, h: x * 360 })), []));

  function nudge(e: KeyboardEvent, apply: (dx: number, dy: number) => void) {
    const step = e.shiftKey ? 0.1 : 0.01;
    const keys: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = keys[e.key];
    if (!delta) return;
    e.preventDefault();
    apply(...delta);
  }

  function setFromHex(value: string) {
    const parsed = hexToHsv(value);
    if (parsed) setHsv(parsed);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // área de transferência bloqueada: o código continua visível para copiar à mão
    }
  }

  const draftInvalid = draft !== null && !hexToHsv(draft);

  return (
    <div className="not-prose my-6 grid gap-4 rounded-xl border bg-fd-card p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <div
          {...area}
          role="slider"
          tabIndex={0}
          aria-label="Saturação e brilho"
          aria-valuetext={hex}
          onKeyDown={(e) => nudge(e, (dx, dy) => setHsv((c) => ({ ...c, s: clamp(c.s + dx), v: clamp(c.v - dy) })))}
          className="relative h-44 w-full cursor-crosshair touch-none select-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          style={{
            backgroundColor: `hsl(${hsv.h} 100% 50%)`,
            backgroundImage: "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
          }}
        >
          <span
            className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,.4)]"
            style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, backgroundColor: hex }}
          />
        </div>

        <div
          {...hue}
          role="slider"
          tabIndex={0}
          aria-label="Matiz"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(hsv.h)}
          onKeyDown={(e) => nudge(e, (dx) => setHsv((c) => ({ ...c, h: (c.h + dx * 360 + 360) % 360 })))}
          className="relative h-4 w-full cursor-pointer touch-none select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          style={{ background: "linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }}
        >
          <span
            className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,.4)]"
            style={{ left: `${(hsv.h / 360) * 100}%`, backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
          />
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Cores prontas">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              title={preset}
              aria-label={`Usar ${preset}`}
              onClick={() => {
                setFromHex(preset);
                setDraft(null);
              }}
              className={cn(
                "size-7 rounded-md border transition-transform hover:scale-110",
                preset === hex && "ring-2 ring-emerald-400 ring-offset-2 ring-offset-fd-card",
              )}
              style={{ backgroundColor: preset }}
            />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Código HEX
          <div className="flex gap-2">
            <input
              value={draft ?? hex}
              onChange={(e) => {
                setDraft(e.target.value);
                setFromHex(e.target.value);
              }}
              onBlur={() => setDraft(null)}
              spellCheck={false}
              maxLength={7}
              aria-invalid={draftInvalid}
              className={cn(
                "min-w-0 flex-1 rounded-md border bg-fd-background px-3 py-2 font-mono text-sm uppercase outline-none focus:ring-2 focus:ring-emerald-400",
                draftInvalid && "border-red-500 focus:ring-red-500",
              )}
            />
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              {copied ? <FiCheck className="size-4" /> : <FiCopy className="size-4" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          {draftInvalid && <span className="text-xs font-normal text-red-400">Use # e 6 caracteres de 0 a 9 ou A a F.</span>}
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Prévia no Discord</span>
          <DiscordMessage>
            <DiscordContainer
              accent={hex}
              content={`### 📦 Seu produto\nÉ assim que a cor **${hex}** aparece na barra lateral das mensagens da loja.`}
            />
          </DiscordMessage>
        </div>
      </div>
    </div>
  );
}
