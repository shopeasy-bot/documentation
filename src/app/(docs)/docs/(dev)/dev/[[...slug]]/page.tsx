import { devSource } from "@/lib/sourcer";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { ViewOptions } from "@/components/page-actions";

export default async function Page(props: PageProps<"/docs/dev/[[...slug]]">) {
  const params = await props.params;
  const page = devSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        <ViewOptions markdownUrl={`${page.url}.mdx`} />
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
