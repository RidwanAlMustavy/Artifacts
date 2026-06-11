import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BackLink } from "@/components/BackLink";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Codex`, description: post.excerpt };
}

const catClass = (cat: string) => {
  if (cat === "Engineering") return "cat-engineering";
  if (cat === "Design") return "cat-design";
  return "cat-product";
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const dateStr = post.date
    ? format(new Date(post.date), "MMMM d, yyyy")
    : "";

  return (
    <>
      <ReadingProgress />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <BackLink />

          {/* Category */}
          <div style={{ marginBottom: "1.25rem" }}>
            <span
              className={catClass(post.category)}
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "0.3rem 0.75rem",
                borderRadius: 999,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "1.25rem",
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid var(--border)",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366F1, #F59E0B)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                  }}
                >
                  {post.author}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                  {dateStr} · {post.readTime}
                </div>
              </div>
            </div>
          </div>

          {/* Article content */}
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {/* Footer */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
