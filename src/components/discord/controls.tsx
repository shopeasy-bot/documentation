"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ggsans } from "./font";

/* ------------------------------------------------------------------ */
/* Botão                                                               */
/* ------------------------------------------------------------------ */

export type DcButtonStyle = "primary" | "secondary" | "success" | "danger" | "link";

const BUTTON_STYLES: Record<DcButtonStyle, string> = {
  primary: "bg-dc-blurple hover:bg-[#4752c4]",
  secondary: "bg-dc-grey hover:bg-[#6d6f78]",
  success: "bg-dc-green hover:bg-[#1a6334]",
  danger: "bg-dc-red hover:bg-[#a12828]",
  link: "bg-dc-grey hover:bg-[#6d6f78]",
};

interface DcButtonProps {
  label: string;
  emoji?: string;
  style?: DcButtonStyle;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
}

export function DcButton({
  label,
  emoji,
  style = "secondary",
  disabled,
  onClick,
  title,
}: DcButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 min-w-[60px] items-center justify-center gap-1.5 rounded-[8px] px-4 text-sm font-medium text-white transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dc-link",
        BUTTON_STYLES[style],
        disabled && "cursor-not-allowed opacity-50 hover:bg-inherit",
      )}
    >
      {emoji && <span aria-hidden>{emoji}</span>}
      <span>{label}</span>
      {style === "link" && <ExternalIcon />}
    </button>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M15 2a1 1 0 0 0 0 2h3.59l-7.3 7.3a1 1 0 1 0 1.42 1.4L20 5.42V9a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1h-6ZM5 3a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h13a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Select menu                                                         */
/* ------------------------------------------------------------------ */

export interface DcSelectOption {
  label: string;
  value?: string;
  description?: string;
  emoji?: string;
}

interface DiscordSelectProps {
  placeholder?: string;
  options: DcSelectOption[];
  disabled?: boolean;
  /** Permite marcar várias opções (como "Opções do Carrinho"). */
  multiple?: boolean;
  defaultValues?: string[];
  onSelect?: (option: DcSelectOption, index: number) => void;
  onChange?: (values: string[]) => void;
  /** Mantém a opção escolhida exibida após a seleção. */
  keepSelection?: boolean;
  /** Destaca o seletor (tour guiado). */
  highlight?: boolean;
  /** Rótulo da opção destacada quando a lista está aberta (tour guiado). */
  highlightOption?: string;
  onOpenChange?: (open: boolean) => void;
}

export function DiscordSelect({
  placeholder = "Selecione uma opção",
  options,
  disabled,
  multiple = false,
  defaultValues = [],
  onSelect,
  onChange,
  keepSelection = true,
  highlight = false,
  highlightOption,
  onOpenChange,
}: DiscordSelectProps) {
  const [open, setOpen] = useState(false);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;

  useEffect(() => {
    onOpenChangeRef.current?.(open);
  }, [open]);
  const [selected, setSelected] = useState<string[]>(defaultValues);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const valueOf = (option: DcSelectOption) => option.value ?? option.label;
  const selectedOptions = options.filter((o) => selected.includes(valueOf(o)));

  function choose(option: DcSelectOption, index: number) {
    const value = valueOf(option);
    if (multiple) {
      const next = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      setSelected(next);
      onChange?.(next);
      return;
    }
    if (keepSelection) setSelected([value]);
    setOpen(false);
    onSelect?.(option, index);
  }

  return (
    <div ref={ref} className="relative w-full max-w-[460px]">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-h-10 w-full items-center gap-2 rounded-[8px] border border-dc-darker bg-dc-darker px-3 py-2 text-left text-[15px] transition-colors",
          "hover:border-black focus-visible:outline-2 focus-visible:outline-dc-link",
          open && "rounded-b-none border-black",
          disabled && "cursor-not-allowed opacity-50",
          highlight && !open && "se-tour-ring",
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          {selectedOptions.length ? (
            <span className="text-dc-text">
              {selectedOptions
                .map((o) => `${o.emoji ? `${o.emoji} ` : ""}${o.label}`)
                .join(", ")}
            </span>
          ) : (
            <span className="text-dc-muted">{placeholder}</span>
          )}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={cn("size-5 shrink-0 text-dc-text transition-transform", open && "rotate-180")}
          fill="currentColor"
          aria-hidden
        >
          <path d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable={multiple}
          className="absolute z-30 max-h-72 w-full animate-dc-pop overflow-y-auto rounded-b-[8px] border border-t-0 border-black bg-dc-container py-1 shadow-xl"
        >
          {options.map((option, index) => {
            const isSelected = selected.includes(valueOf(option));
            return (
              <li key={`${option.label}-${index}`} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => choose(option, index)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-dc-hover",
                    isSelected && "bg-dc-hover",
                    highlightOption === option.label && "se-tour-option",
                  )}
                >
                  {option.emoji && (
                    <span className="text-lg leading-none" aria-hidden>
                      {option.emoji}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] text-dc-header">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="block truncate text-[13px] text-dc-muted">
                        {option.description}
                      </span>
                    )}
                  </span>
                  {multiple && (
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded border",
                        isSelected
                          ? "border-dc-blurple bg-dc-blurple text-white"
                          : "border-dc-muted",
                      )}
                      aria-hidden
                    >
                      {isSelected && "✓"}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modal (formulário)                                                  */
/* ------------------------------------------------------------------ */

export interface DcModalField {
  label: string;
  description?: string;
  placeholder?: string;
  value?: string;
  /** short = uma linha; paragraph = várias linhas. */
  style?: "short" | "paragraph";
  kind?: "text" | "select" | "file";
  options?: string[];
  maxLength?: number;
  required?: boolean;
}

interface DiscordModalProps {
  title: string;
  fields: DcModalField[];
  /** Texto extra exibido no fim do formulário. */
  note?: string;
  /** Renderiza inline (sem sobrepor a página). */
  inline?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  submitLabel?: string;
}

export function DiscordModal({
  title,
  fields,
  note,
  inline = true,
  onSubmit,
  onClose,
  submitLabel = "Enviar",
}: DiscordModalProps) {
  const [values, setValues] = useState<string[]>(fields.map((f) => f.value ?? ""));
  const [submitted, setSubmitted] = useState(false);

  const missing = fields.some(
    (f, i) => f.required !== false && f.kind !== "file" && !values[i]?.trim(),
  );

  function submit() {
    if (missing) return;
    if (onSubmit) onSubmit();
    else setSubmitted(true);
  }

  const body = (
    <div
      role="dialog"
      aria-label={title}
      className={cn(
        ggsans.className,
        "not-prose w-full max-w-[440px] animate-dc-pop overflow-hidden rounded-lg bg-dc-chat text-dc-text shadow-2xl",
      )}
    >
      <div className="flex items-start justify-between gap-4 px-4 pt-4">
        <h4 className="text-xl font-semibold text-dc-header">{title}</h4>
        {onClose && (
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="text-dc-muted hover:text-dc-header"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto px-4 py-4">
        {fields.map((field, index) => {
          const value = values[index] ?? "";
          const inputClass =
            "w-full rounded-[8px] border border-dc-darker bg-dc-darker px-3 py-2 text-[15px] text-dc-text outline-none placeholder:text-dc-muted focus:border-dc-link";
          const fieldId = `${title}-${index}`;
          return (
            <div key={field.label} className="flex flex-col gap-1.5">
              <label htmlFor={fieldId} className="text-sm font-semibold text-dc-header">
                {field.label}
                {field.required !== false && <span className="ml-1 text-dc-red">*</span>}
              </label>
              {field.description && (
                <span className="-mt-1 text-xs text-dc-muted">{field.description}</span>
              )}

              {field.kind === "select" ? (
                <select
                  id={fieldId}
                  value={value}
                  onChange={(e) =>
                    setValues((v) => v.map((x, i) => (i === index ? e.target.value : x)))
                  }
                  className={inputClass}
                >
                  <option value="">{field.placeholder ?? "Clique aqui para selecionar"}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.kind === "file" ? (
                <div className="flex h-20 items-center justify-center rounded-[8px] border-2 border-dashed border-dc-border text-sm text-dc-muted">
                  📎 Arraste ou clique para enviar um arquivo
                </div>
              ) : field.style === "paragraph" ? (
                <textarea
                  id={fieldId}
                  rows={4}
                  maxLength={field.maxLength}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) =>
                    setValues((v) => v.map((x, i) => (i === index ? e.target.value : x)))
                  }
                  className={cn(inputClass, "resize-none")}
                />
              ) : (
                <input
                  id={fieldId}
                  maxLength={field.maxLength}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) =>
                    setValues((v) => v.map((x, i) => (i === index ? e.target.value : x)))
                  }
                  className={inputClass}
                />
              )}

              {field.maxLength && field.kind !== "select" && field.kind !== "file" && (
                <span className="self-end text-[11px] text-dc-muted">
                  {value.length}/{field.maxLength}
                </span>
              )}
            </div>
          );
        })}
        {note && <p className="text-sm text-dc-muted">{note}</p>}
      </div>

      <div className="flex items-center justify-end gap-2 bg-dc-container px-4 py-3">
        {submitted ? (
          <span className="mr-auto text-sm text-[#23a55a]">✓ Formulário enviado (simulação)</span>
        ) : missing ? (
          <span className="mr-auto text-xs text-dc-muted">Preencha os campos obrigatórios</span>
        ) : null}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-[8px] px-4 text-sm font-medium text-dc-header hover:underline"
          >
            Cancelar
          </button>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={missing}
          className="h-9 rounded-[8px] bg-dc-blurple px-5 text-sm font-medium text-white hover:bg-[#4752c4] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );

  if (inline) return body;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center rounded-xl bg-black/70 p-3 backdrop-blur-[1px]">
      {body}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Linha de ações                                                      */
/* ------------------------------------------------------------------ */

export function DcActionRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}
