import type { Metadata } from "next";
import PortfolioGallery from "@/components/PortfolioGallery";
import { getItemsByType, photographyCategories } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Photography | WAVE Media",
  description:
    "Sports, portrait, event, corporate and lifestyle photography from WAVE Media.",
};

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      <section className="py-24">
        <div className="container-wave">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            <span className="text-accent">Photography</span>
          </h1>
          <p className="text-xl text-wave-gray text-center mb-16 max-w-2xl mx-auto">
            Still images with a cinematic eye.
          </p>
          <PortfolioGallery
            items={getItemsByType("photo")}
            categories={photographyCategories}
          />
        </div>
      </section>
    </main>
  );
}
