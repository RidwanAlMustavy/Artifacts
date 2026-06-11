"use client";
import Link from "next/link";
import { Post } from "@/lib/posts";
import { format } from "date-fns";

const catClass = (cat: string) => {
  if (cat === "Engineering") return "cat-engineering";
  if (cat === "Design") return "cat-design";
  return "cat-product";
};

export function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  const dateStr = post.date
    ? format(new Date(post.date), "MMM d, yyyy")
    : "";

  return (
    <Link
      href={`/post/${post.slug}`}
      className="post-card"
      style={{
        display: "block",
        background: "var(--bg-card)",
        borderRadius: 12,
        border: "1px solid var(--border)",
        padding: featured ? "2rem" : "1.5rem",
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 30px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Category + read time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          marginBottom: "0.875rem",
        }}
      >
        <span
          className={catClass(post.category)}
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "0.25rem 0.625rem",
            borderRadius: 999,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {post.category}
        </span>
        <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: featured ? "1.5rem" : "1.125rem",
          fontWeight: 600,
          lineHeight: 1.25,
          marginBottom: "0.625rem",
          color: "var(--text-primary)",
          letterSpacing: "-0.01em",
        }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          marginBottom: "1.25rem",
          display: "-webkit-box",
          WebkitLineClamp: featured ? 3 : 2,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }}
      >
        {post.excerpt}
      </p>

      {/* Author + date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "0.875rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #6366F1, #F59E0B)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6875rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {post.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>
            {post.author}
          </span>
        </div>
        <time style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          {dateStr}
        </time>
      </div>
    </Link>
  );
}
