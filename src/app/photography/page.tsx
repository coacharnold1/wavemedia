import type { Metadata } from "next";
import PortfolioGallery from "@/components/PortfolioGallery";
import { photographyCategories } from "@/lib/portfolio";
import { getItemsByTypeFromDatabase } from "@/lib/portfolio-db";

export const metadata: Metadata = {
  title: "Photography | WAVE Media",
  description:
    "Sports, portrait, event, corporate and lifestyle photography from WAVE Media.",
};

// Don't cache this page - always fetch fresh data from database
export const revalidate = 0;

export default async function PhotographyPage() {
  const photos = await getItemsByTypeFromDatabase('photo');
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
            items={photos}
            categories={photographyCategories}
          />
        </div>
      </section>
    </main>
  );
}
