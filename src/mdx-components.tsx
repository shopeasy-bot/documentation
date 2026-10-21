import * as calloutComponents from "@/components/callout";
import * as cardComponents from "@/components/card";
import * as twoslashComponents from "fumadocs-twoslash/ui";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import * as AccordionComponents from "fumadocs-ui/components/accordion";
import * as bannerComponents from "fumadocs-ui/components/banner";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import * as headingComponents from "fumadocs-ui/components/heading";
import * as imageComponents from "fumadocs-ui/components/image-zoom";
import { ImageZoom, type ImageZoomProps } from "fumadocs-ui/components/image-zoom";
import { TypeTable } from "fumadocs-ui/components/type-table";
import * as inlineComponents from "fumadocs-ui/components/inline-toc";
import * as stepsComponents from "fumadocs-ui/components/steps";
import { Link } from "./components/link";
import { CodeBlock, CodeBlockTab, CodeBlockTabs, CodeBlockTabsList, CodeBlockTabsTrigger, Pre } from "./components/codeblock";
import { DiscordButton } from "./components/discord/button";
import { DiscordActionRow } from "./components/discord/row";
import { DiscordSlashCommand } from "./components/discord/slash";
import { File, Files, Folder } from "./components/files";
import { Tab, Tabs } from "./components/tabs";
import { DiscordEmbed } from './components/discord/embed';
import { DiscordProductCard } from './components/discord/productCart';
import { DiscordProductConfig } from './components/discord/productConfig';
import { DiscordContainer, DiscordMarkdown, DiscordMessage, DiscordSeparator } from "./components/discord/message";
import { DcActionRow, DcButton, DiscordModal, DiscordSelect } from "./components/discord/controls";
import { DiscordMenuSimulator } from "./components/discord/menu-simulator";
import { CommandExplorer } from "./components/command-explorer";
import { PlanComparator } from "./components/plan-comparator";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ...twoslashComponents,
    ...AccordionComponents,
    ...bannerComponents,
    ...calloutComponents,
    ...cardComponents,
    GithubInfo,
    ...headingComponents,
    ...imageComponents,
    img: (props) => <ImageZoom {...(props as ImageZoomProps)} />,
    TypeTable,
    ...inlineComponents,
    ...stepsComponents,
    Tab, Tabs,
    a: props => <Link {...props}/>, Link,
    DiscordButton,
    DiscordActionRow,
    DiscordProductCard,
    DiscordProductConfig,
    DiscordEmbed,
    DiscordSlashCommand,
    DiscordMessage,
    DiscordContainer,
    DiscordMarkdown,
    DiscordSeparator,
    DiscordSelect,
    DiscordModal,
    DcButton,
    DcActionRow,
    DiscordMenuSimulator,
    CommandExplorer,
    PlanComparator,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    File, Files, Folder,
    CodeBlockTabs, CodeBlockTabsList,
    CodeBlockTab, CodeBlockTabsTrigger
  };
}