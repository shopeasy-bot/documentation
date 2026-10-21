import { botSource, devSource } from '@/lib/sourcer';
import { markdownUrl } from '@/lib/docs-seo';
import { absoluteUrl } from '@/lib/site';
import type { Node as PageTreeNode } from 'fumadocs-core/page-tree';

export const revalidate = false;

type Page = ReturnType<typeof botSource.getPages>[number] | ReturnType<typeof devSource.getPages>[number];

function line(page: Page) {
  const description = page.data.description ? `: ${page.data.description}` : '';
  return `- [${page.data.title}](${absoluteUrl(markdownUrl(page))})${description}`;
}

export function GET() {
  // Segue a ordem do menu lateral: separadores e pastas viram seções.
  const byUrl = new Map(botSource.getPages().map((page) => [page.url, page]));
  const groups: [string, Page[]][] = [['Guia do Bot', []]];
  const add = (url: string | undefined) => {
    const page = url ? byUrl.get(url) : undefined;
    if (page) groups[groups.length - 1][1].push(page);
  };
  const walk = (nodes: PageTreeNode[]) => {
    for (const node of nodes) {
      if (node.type === 'separator') groups.push([String(node.name ?? ''), []]);
      else if (node.type === 'page') add(node.url);
      else if (node.type === 'folder') {
        groups.push([String(node.name ?? ''), []]);
        add(node.index?.url);
        walk(node.children);
      }
    }
  };
  walk(botSource.pageTree.children);

  const body = [
    '# ShopEasy Docs',
    '',
    '> ShopEasy é um bot de vendas para Discord: produtos com estoque automático, carrinhos em canais privados, pagamentos via PIX e outros gateways, cupons, tickets, relatórios e planos. Esta é a documentação oficial, em português do Brasil.',
    '',
    `Cada link abaixo aponta para a versão em Markdown da página. A versão HTML fica no mesmo caminho sem o prefixo \`/llms.mdx\`. O conteúdo completo em um único arquivo está em ${absoluteUrl('/llms-full.txt')}.`,
    '',
    'Observações para respostas corretas:',
    '- Os comandos são slash commands do Discord em português (ex.: `/produto criar`, `/pagamento configurar`).',
    '- Planos: Básico (grátis), Essencial, Profissional, Completo e Enterprise. Veja a página de Planos para preços e recursos.',
    '- Alguns gateways e as automações só funcionam no bot exclusivo (plano Completo ou Enterprise).',
    '',
    ...groups.filter(([, pages]) => pages.length).flatMap(([name, pages]) => [`## ${name}`, '', ...pages.map(line), '']),
    '## API para Desenvolvedores',
    '',
    ...devSource.getPages().map(line),
    '',
    '## Optional',
    '',
    `- [Documentação completa](${absoluteUrl('/llms-full.txt')}): todas as páginas em um único arquivo de texto`,
    `- [Planos e preços](${absoluteUrl('/plans')})`,
    `- [Suporte](${absoluteUrl('/support')})`,
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
