import { FaDiscord } from "react-icons/fa";

export function BannerDiscordNav() {
  return (
    <a
      href="/discord"
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full mt-4 rounded-xl border border-border bg-muted/30 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:bg-muted/50 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <FaDiscord
          size={18}
          className="text-white transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[3deg]"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
            Entrar no Discord
          </span>
          <span className="text-xs text-muted-foreground opacity-70 leading-none">
            Junte-se à nossa comunidade
          </span>
        </div>
      </div>
    </a>
  );
}