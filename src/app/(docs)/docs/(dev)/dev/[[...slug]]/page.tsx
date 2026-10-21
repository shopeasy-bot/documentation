import { devSource, getDevPageImage } from "@/lib/sourcer";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { JsonLd } from "@/components/json-ld";
import { docsJsonLd, docsMetadata, markdownUrl } from "@/lib/docs-seo";
import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/docs/dev/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = devSource.getPage(params.slug);
  if (!page) return {};

  return docsMetadata(page, getDevPageImage(page), "API para Desenvolvedores");
}

export function generateStaticParams() {
  return devSource.generateParams();
}

export default async function Page(props: PageProps<"/docs/dev/[[...slug]]">) {
  const params = await props.params;
  const page = devSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const jsonLd = docsJsonLd(page, devSource, { name: "API para Desenvolvedores", url: "/docs/dev" }, getDevPageImage(page));

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd data={jsonLd} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        <LLMCopyButton markdownUrl={markdownUrl(page)} />
        <ViewOptions markdownUrl={markdownUrl(page)} />
      </div>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(devSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}
