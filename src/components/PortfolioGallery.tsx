"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PortfolioItem } from "@/lib/portfolio";
import VideoPlayer from "@/components/VideoPlayer";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  categories: string[];
}

export default function PortfolioGallery({ items, categories }: PortfolioGalleryProps) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => category === "All" || i.category === category)
      .filter(
        (i) =>
          !q ||
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
      .sort((a, b) => (sort === "newest" ? b.year - a.year : a.year - b.year));
  }, [items, category, query, sort]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                category === c
                  ? "bg-wave-gold text-wave-black border-wave-gold"
                  : "border-wave-dark text-wave-gray hover:border-wave-gold hover:text-wave-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            aria-label="Search projects"
            className="bg-wave-charcoal border border-wave-dark rounded-lg px-4 py-2 text-sm text-wave-white focus:outline-none focus:border-wave-gold"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            aria-label="Sort projects"
            className="bg-wave-charcoal border border-wave-dark rounded-lg px-3 py-2 text-sm text-wave-white focus:outline-none focus:border-wave-gold"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-wave-gray py-16">No projects match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((item) => (
            <button
              key={item.slug}
              onClick={() => setActive(item)}
              className="text-left bg-wave-charcoal rounded-lg overflow-hidden border border-wave-dark hover:border-wave-gold transition-colors group"
            >
              <div className="relative w-full h-64 bg-gradient-to-br from-wave-gold/10 to-wave-dark flex items-center justify-center">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                )}
                {item.type === "video" && (
                  <span className="relative text-4xl text-wave-gold group-hover:scale-110 transition-transform">
                    ▶
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-wave-gray text-sm">
                  {item.category} • {item.year}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-wave-charcoal rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-3 right-4 text-2xl text-wave-gray hover:text-wave-gold"
            >
              ×
            </button>
            {active.type === "video" ? (
              <VideoPlayer url={active.videoUrl} title={active.title} poster={active.image} />
            ) : (
              <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-gradient-to-br from-wave-gold/10 to-wave-dark">
                {active.image && (
                  <Image src={active.image} alt={active.title} fill className="object-contain" />
                )}
              </div>
            )}
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{active.title}</h3>
                <p className="text-wave-gray text-sm mb-2">
                  {active.category} • {active.year}
                </p>
                <p className="text-wave-gray">{active.description}</p>
              </div>
              <Link
                href={`/work/${active.slug}`}
                className="btn-secondary whitespace-nowrap text-sm"
              >
                View project
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
