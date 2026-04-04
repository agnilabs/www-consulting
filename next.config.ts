import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trqxlmj192.ufs.sh",
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "append",
          properties: { className: ["anchor-link"], ariaHidden: true, tabIndex: -1 },
          content: { type: "text", value: "#" },
        },
      ],
      ["rehype-pretty-code", { theme: "github-dark", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
