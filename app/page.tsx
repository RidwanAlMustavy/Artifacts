import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { SearchFilter } from "@/components/SearchFilter";
import { Suspense } from "react";

interface SearchParams {
  q?: string;
  category?: string;
}

// Server Component — fetches posts directly
async function PostsList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const allPosts = getAllPosts();
  const { q, category } = await searchParams;

  const filtered = allPosts.filter((post) => {
    const matchCat = !category || post.category === category;
    const matchSearch =
      !q ||
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(q.toLowerCase()) ||
      post.author.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  if (filtered.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "5rem 1rem",
          color: "var(--text-muted)",
        }}
      >
        <p
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "1.5rem",
            marginBottom: "0.5rem",
            color: "var(--text-secondary)",
          }}
        >
          Nothing found
        </p>
        <p style={{ fontSize: "0.9375rem" }}>Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Featured posts */}
      {featured.length > 0 && (
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              marginBottom: "1rem",
            }}
          >
            Featured
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* All posts */}
      {rest.length > 0 && (
        <section>
          {featured.length > 0 && (
            <h2
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              More posts
            </h2>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const params = await searchParams;
  const filteredCount = allPosts.filter((post) => {
    const matchCat = !params.category || post.category === params.category;
    const matchSearch =
      !params.q ||
      post.title.toLowerCase().includes(params.q.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(params.q.toLowerCase());
    return matchCat && matchSearch;
  }).length;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Hero */}
      <div style={{ marginBottom: "3.5rem" }}>
        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--accent)",
            marginBottom: "0.75rem",
          }}
        >
          A publication
        </p>
        <h1
          style={{
            fontFamily: "Fraunces, Georgia, serif",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            maxWidth: "18ch",
            marginBottom: "1rem",
          }}
        >
          Ideas worth
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>building on.</em>
        </h1>
        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--text-secondary)",
            maxWidth: "52ch",
            lineHeight: 1.65,
          }}
        >
          Thoughtful writing on engineering craft, design systems, and product
          thinking — for people who care about how things are made.
        </p>
      </div>

      {/* Search & filter */}
      <Suspense fallback={null}>
        <SearchFilter categories={categories} totalPosts={filteredCount} />
      </Suspense>

      {/* Posts grid — Server Component */}
      <Suspense
        fallback={
          <div style={{ color: "var(--text-muted)", textAlign: "center", padding: "3rem" }}>
            Loading posts…
          </div>
        }
      >
        <PostsList searchParams={params} />
      </Suspense>
    </div>
  );
}
