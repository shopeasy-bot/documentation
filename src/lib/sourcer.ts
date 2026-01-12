import { docs, blogCollection } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import icons from "./icons";
import { createElement } from 'react';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
    icon(key) {
    if (key && key in icons) {
      return createElement(icons[key]);
    }
  },
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/docs-og/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}

export const blog = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogCollection, [])
});

export type BlogPost = NonNullable<ReturnType<typeof blog.getPage>>;