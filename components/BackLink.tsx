"use client";
import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        fontSize: "0.875rem",
        color: "var(--text-muted)",
        textDecoration: "none",
        marginBottom: "2.5rem",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
    >
      ← All posts
    </Link>
  );
}
