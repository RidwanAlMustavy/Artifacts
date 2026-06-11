"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: string[];
  totalPosts: number;
}

export function SearchFilter({ categories, totalPosts }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [active, setActive] = useState(params.get("category") || "");

  const update = useCallback(
    (q: string, cat: string) => {
      const p = new URLSearchParams();
      if (q) p.set("q", q);
      if (cat) p.set("category", cat);
      router.push(`/?${p.toString()}`, { scroll: false });
    },
    [router]
  );

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => update(search, active), 300);
    return () => clearTimeout(t);
  }, [search, active, update]);

  const catColor = (cat: string) => {
    if (cat === "Engineering") return "#6366F1";
    if (cat === "Design") return "#D97706";
    return "#059669";
  };

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      {/* Search input */}
      <div style={{ position: "relative", marginBottom: "1.25rem" }}>
        <svg
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 1rem 0.75rem 2.75rem",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            fontSize: "0.9375rem",
            fontFamily: "Inter, sans-serif",
            outline: "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{
              position: "absolute",
              right: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "1rem",
              padding: "0.25rem",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Category pills + count */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActive("")}
          style={{
            padding: "0.375rem 0.875rem",
            borderRadius: 999,
            border: `1px solid ${active === "" ? "var(--accent)" : "var(--border)"}`,
            background: active === "" ? "var(--accent)" : "var(--bg-card)",
            color: active === "" ? "#fff" : "var(--text-secondary)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
            fontFamily: "Inter, sans-serif",
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? "" : cat)}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: 999,
              border: `1px solid ${active === cat ? catColor(cat) : "var(--border)"}`,
              background:
                active === cat
                  ? `${catColor(cat)}18`
                  : "var(--bg-card)",
              color: active === cat ? catColor(cat) : "var(--text-secondary)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          {totalPosts} post{totalPosts !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
