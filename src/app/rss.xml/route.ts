import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((post) => {
      const postUrl = `${siteConfig.url}${post.url}`;
      const pubDate = new Date(post.publishedAt).toUTCString();

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${escapeXml(post.description)}</description>
        </item>
      `.trim();
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}/blog</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
