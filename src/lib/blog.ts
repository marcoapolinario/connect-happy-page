import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type BlogCategory = Database["public"]["Tables"]["blog_categories"]["Row"];

export type BlogPostWithCategory = BlogPost & {
  blog_categories: Pick<BlogCategory, "slug" | "name"> | null;
};

export async function fetchPublishedPosts(opts?: { categorySlug?: string; limit?: number }) {
  let query = supabase
    .from("blog_posts")
    .select("*, blog_categories(slug, name)")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (opts?.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) throw error;

  let posts = (data ?? []) as BlogPostWithCategory[];
  if (opts?.categorySlug) {
    posts = posts.filter((p) => p.blog_categories?.slug === opts.categorySlug);
  }
  return posts;
}

export async function fetchPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(slug, name)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as BlogPostWithCategory | null;
}

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as BlogCategory[];
}

export async function fetchAllPostsAdmin() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(slug, name)")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPostWithCategory[];
}

export const slugify = (str: string) =>
  str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const calcReadingMinutes = (markdown: string) => {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};
