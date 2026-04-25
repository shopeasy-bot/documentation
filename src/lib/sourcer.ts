import { botDocs, devDocs, blogCollection } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import icons from "./icons";
import { createElement } from 'react';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

const iconPlugin = {
  plugins: [lucideIconsPlugin()],
  icon(key: string | undefined) {
    if (key && key in icons) return createElement(icons[key]);
  },
};

export const botSource = loader({
  baseUrl: '/docs',
  source: botDocs.toFumadocsSource(),
  ...iconPlugin,
});

export const devSource = loader({
  baseUrl: '/docs/dev',
  source: devDocs.toFumadocsSource(),
  ...iconPlugin,
});

export function getPageImage(page: InferPageType<typeof botSource>) {
  const segments = [...page.slugs, 'image.png'];
  return { segments, url: `/docs-og/${segments.join('/')}` };
}

export function getDevPageImage(page: InferPageType<typeof devSource>) {
  const segments = ['dev', ...page.slugs, 'image.png'];
  return { segments, url: `/docs-og/${segments.join('/')}` };
}

export async function getLLMText(page: InferPageType<typeof botSource>) {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title}\n\n${processed}`;
}

export const source = botSource;

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogCollection, [])
});

export type BlogPost = NonNullable<ReturnType<typeof blog.getPage>>;