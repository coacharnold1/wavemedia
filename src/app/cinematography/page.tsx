import type { Metadata } from "next";
import PortfolioGallery from "@/components/PortfolioGallery";
import { cinematographyCategories } from "@/lib/portfolio";
import { getItemsByTypeFromDatabase } from "@/lib/portfolio-db";

export const metadata: Metadata = {
  title: "Cinematography | WAVE Media",
  description:
    "Commercials, documentaries, music videos and branded content from WAVE Media.",
};

export default async function CinematographyPage() {
  const videos = await getItemsByTypeFromDatabase('video');
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      <section className="py-24">
        <div className="container-wave">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            <span className="text-accent">Cinematography</span>
          </h1>
          <p className="text-xl text-wave-gray text-center mb-16 max-w-2xl mx-auto">
            Motion work built around story, light and intent.
          </p>
          <PortfolioGallery
            items={videos}
            categories={cinematographyCategories}
          />
        </div>
      </section>
    </main>
  );
}
