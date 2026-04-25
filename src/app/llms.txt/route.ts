import { botSource, devSource } from '@/lib/sourcer';

export const revalidate = false;

export function GET() {
  const base = 'https://shopeasy.site';

  const botPages = botSource.getPages().map(
    (p) => `- [${p.data.title}](${base}${p.url}): ${p.data.description ?? ''}`,
  );
  const devPages = devSource.getPages().map(
    (p) => `- [${p.data.title}](${base}${p.url}): ${p.data.description ?? ''}`,
  );

  const body = [
    '# ShopEasy Docs',
    '',
    '> Bot de vendas para Discord. Documentação oficial.',
    '',
    '## Guia do Bot',
    botPages.join('\n'),
    '',
    '## API para Desenvolvedores',
    devPages.join('\n'),
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
