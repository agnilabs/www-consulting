import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

function ArticleLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return <Link href={href} {...props} />;
  }

  return <a href={href} target="_blank" rel="noreferrer" {...props} />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ArticleLink,
    ...components,
  };
}
