import { botSource, devSource } from '@/lib/sourcer';
import type { InferPageType } from 'fumadocs-core/source';

type AnyPage = InferPageType<typeof botSource> | InferPageType<typeof devSource>;

// Componentes interativos não fazem sentido em texto: viram uma nota curta.
// O mesmo conteúdo está nas tabelas e listas da própria página.
const INTERACTIVE: [RegExp, string][] = [
  [/<DiscordMenuSimulator[\s\S]*?\n\/>/g, '_(Simulação interativa do menu do bot, disponível na versão HTML desta página.)_'],
  [/<CommandExplorer\s*\/>/g, '_(Explorador interativo de comandos, disponível na versão HTML. A tabela abaixo traz os mesmos dados.)_'],
  [/<PlanComparator\s*\/>/g, '_(Comparador interativo de planos, disponível na versão HTML. A tabela abaixo traz os mesmos dados.)_'],
];

export async function getLLMText(page: AnyPage) {
  let processed = await page.data.getText('processed');
  for (const [pattern, note] of INTERACTIVE) processed = processed.replace(pattern, note);
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
