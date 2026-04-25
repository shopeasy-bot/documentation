import { botSource, devSource } from '@/lib/sourcer';
import type { InferPageType } from 'fumadocs-core/source';

type AnyPage = InferPageType<typeof botSource> | InferPageType<typeof devSource>;

export async function getLLMText(page: AnyPage) {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
