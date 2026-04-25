import { botSource, devSource } from '@/lib/sourcer';
import { getLLMText } from '@/lib/get-llm-text';

export const revalidate = false;

export async function GET() {
  const pages = [
    ...botSource.getPages(),
    ...devSource.getPages(),
  ];
  const scanned = await Promise.all(pages.map(getLLMText));
  return new Response(scanned.join('\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
