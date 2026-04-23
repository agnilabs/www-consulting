import "server-only";

import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");
const POST_FILE_EXTENSION = ".mdx";
const WORDS_PER_MINUTE = 220;
const TAG_ACRONYMS: Record<string, string> = {
  ai: "AI",
  api: "API",
  crm: "CRM",
  llm: "LLM",
  seo: "SEO",
  saas: "SaaS",
};

export type BlogPostMeta = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  tags: string[];
  updatedAt?: string;
  coverImage?: string;
  draft?: boolean;
};

export type BlogPost = BlogPostMeta & {
  readingTimeMinutes: number;
  url: string;
};

type BlogPostModule = {
  default: React.ComponentType;
  metadata: BlogPostMeta;
};

function isDateString(value: string) {
  return !Number.isNaN(Date.parse(value));
}

function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) {
    throw new Error("Frontmatter field 'tags' must be an array of strings.");
  }

  return value.map((tag) => {
    if (typeof tag !== "string" || tag.trim().length === 0) {
      throw new Error("Each tag must be a non-empty string.");
    }

    return tag.trim();
  });
}

function parseMetadata(slugFromFile: string, data: Record<string, unknown>): BlogPostMeta {
  const { title, description, slug, publishedAt, tags, updatedAt, coverImage, draft } = data;

  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error(`Post '${slugFromFile}' is missing a valid 'title'.`);
  }

  if (typeof description !== "string" || description.trim().length === 0) {
    throw new Error(`Post '${slugFromFile}' is missing a valid 'description'.`);
  }

  if (typeof slug !== "string" || slug.trim().length === 0) {
    throw new Error(`Post '${slugFromFile}' is missing a valid 'slug'.`);
  }

  if (slug !== slugFromFile) {
    throw new Error(`Post '${slugFromFile}' has a slug mismatch in frontmatter.`);
  }

  if (typeof publishedAt !== "string" || !isDateString(publishedAt)) {
    throw new Error(`Post '${slugFromFile}' is missing a valid 'publishedAt' date.`);
  }

  if (updatedAt !== undefined && (typeof updatedAt !== "string" || !isDateString(updatedAt))) {
    throw new Error(`Post '${slugFromFile}' has an invalid 'updatedAt' date.`);
  }

  if (coverImage !== undefined && typeof coverImage !== "string") {
    throw new Error(`Post '${slugFromFile}' has an invalid 'coverImage'.`);
  }

  if (draft !== undefined && typeof draft !== "boolean") {
    throw new Error(`Post '${slugFromFile}' has an invalid 'draft' flag.`);
  }

  return {
    title: title.trim(),
    description: description.trim(),
    slug,
    publishedAt,
    tags: normalizeTags(tags),
    updatedAt,
    coverImage,
    draft,
  };
}

function calculateReadingTimeMinutes(source: string) {
  const words = source
    .replace(/export const metadata = \{[\s\S]*?\n\};?/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function isVisible(post: BlogPostMeta) {
  return process.env.NODE_ENV !== "production" || post.draft !== true;
}

const readPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}${POST_FILE_EXTENSION}`);

  try {
    const [source, module] = await Promise.all([
      fs.readFile(filePath, "utf8"),
      getPostModule(slug),
    ]);
    const meta = parseMetadata(slug, module.metadata);

    return {
      ...meta,
      readingTimeMinutes: calculateReadingTimeMinutes(source),
      url: `/blog/${meta.slug}`,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
});

const readAllPosts = cache(async () => {
  const entries = await fs.readdir(POSTS_DIRECTORY, { withFileTypes: true });
  const slugs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(POST_FILE_EXTENSION))
    .map((entry) => entry.name.slice(0, -POST_FILE_EXTENSION.length));

  const posts = await Promise.all(slugs.map((slug) => readPost(slug)));

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
});

export const getAllPosts = cache(async () => {
  const posts = await readAllPosts();
  return posts.filter(isVisible);
});

export const getAllPostSlugs = cache(async () => {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
});

export const getPostBySlug = cache(async (slug: string) => {
  const post = await readPost(slug);

  if (!post || !isVisible(post)) {
    return null;
  }

  return post;
});

export const getPostModule = cache(async (slug: string): Promise<BlogPostModule> => {
  return import(`@content/blog/${slug}.mdx`);
});

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatBlogTag(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => {
      const normalizedPart = part.toLowerCase();
      return TAG_ACRONYMS[normalizedPart] ?? `${normalizedPart[0].toUpperCase()}${normalizedPart.slice(1)}`;
    })
    .join(" ");
}
