import { cn } from "fumadocs-ui/utils/cn";
import { ggsans } from "./font";

interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface DiscordEmbedProps {
  author?: string;
  title: string;
  description?: string;
  color?: string; // hex: "#5865F2"
  fields?: EmbedField[];
  footer?: string;
}

export function DiscordEmbed({
  author = "ShopEasy",
  title,
  description,
  color = "#5865F2",
  fields = [],
  footer,
}: DiscordEmbedProps) {
  return (
    <div className={cn(
      ggsans.className,
      "bg-[#2b2d31] rounded-md p-4 max-w-xl border-l-4 shadow-md"
    )} style={{ borderColor: color }}>
      
      {/* Autor */}
      <div className="text-sm font-semibold text-white/80 mb-1">
        {author}
      </div>

      {/* Título */}
      <div className="text-base font-bold text-indigo-400 mb-1">
        {title}
      </div>

      {/* Descrição */}
      {description && (
        <div className="text-sm text-white/70 mb-3 whitespace-pre-line">
          {description}
        </div>
      )}

      {/* Campos */}
      {fields.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {fields.map((field, i) => (
            <div
              key={i}
              className={cn(
                "text-sm",
                field.inline ? "" : "col-span-2"
              )}
            >
              <div className="font-semibold text-white/80">
                {field.name}
              </div>
              <div className="text-white/70 whitespace-pre-line">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rodapé */}
      {footer && (
        <div className="mt-3 text-xs text-white/40">
          {footer}
        </div>
      )}
    </div>
  );
}
