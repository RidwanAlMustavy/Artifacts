import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Artifacts - Engineering, Design, Culture & Product",
  description:
    "Thoughtful writing on software engineering, product design, and building great teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <footer
            style={{
              borderTop: "1px solid var(--border)",
              padding: "2rem 1.5rem",
              marginTop: "5rem",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "0.875rem",
            }}
          >
            <span
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Artifacts
            </span>{" "}
            — Built with Next.js & TypeScript
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
