import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Rotas privadas ou transitórias que não devem ser indexadas.
const disallow = ["/api/", "/app", "/auth", "/login", "/adquirir", "/notifications", "/wallet", "/curso/checkout", "/curso/sucesso"];

// Crawlers de IA liberados explicitamente para ler a documentação.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Bytespider",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt", "/llms-full.txt", "/llms.mdx/"], disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
