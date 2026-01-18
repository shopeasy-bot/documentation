import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import z from 'zod';

export const blogCollection = defineCollections({
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    date: z.coerce.date().or(z.date()).optional(),
    tags: z.array(z.string()).optional(),
  }),
  type: "doc"
});

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
