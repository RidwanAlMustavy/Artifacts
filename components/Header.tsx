"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export function Header() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--bg)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "1.375rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366F1, #F59E0B)",
            }}
          />
          Artifacts
        </Link>

        {/* Nav - desktop */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          className="hidden-mobile"
        >
          {["Engineering", "Design", "Product", "Culture"].map((cat) => (
            <Link
              key={cat}
              href={`/?category=${cat}`}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {cat}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}
