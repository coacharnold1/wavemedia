import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import PlaceholderArt from "@/components/PlaceholderArt";
import { getPortfolioFromDatabase, getItemFromDatabase } from "@/lib/portfolio-db";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const items = await getPortfolioFromDatabase();
    return items.map((item) => ({ slug: item.slug }));
  } catch (error) {
    console.warn('Failed to generate static params from database:', error);
    // Return empty array to disable static generation - pages will be SSG instead
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const item = await getItemFromDatabase(slug);
    if (!item) return {};
    return {
      title: `${item.title} | WAVE Media`,
      description: item.description || '',
    };
  } catch (error) {
    console.warn('Failed to generate metadata:', error);
    return {};
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const item = await getItemFromDatabase(slug);
  if (!item) notFound();

  const isVideo = item.type === "video";

  return (
    <main className="min-h-screen bg-wave-black pt-20">
      <section className="py-16">
        <div className="container-wave max-w-4xl">
          <Link
            href={isVideo ? "/cinematography" : "/photography"}
            className="text-wave-gold hover:text-wave-gold-light text-sm"
          >
            ← Back to {isVideo ? "Cinematography" : "Photography"}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-2">{item.title}</h1>
          <p className="text-wave-gray mb-8">
            {item.category} • {item.year}
            {item.client ? ` • ${item.client}` : ""}
          </p>

          {isVideo ? (
            <VideoPlayer url={item.videoUrl} title={item.title} poster={item.image} />
          ) : (
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-contain" />
              ) : (
                <PlaceholderArt label={item.category} />
              )}
            </div>
          )}

          <p className="text-wave-gray text-lg leading-relaxed mt-8 mb-10">{item.description}</p>
          <Link href="/booking" className="btn-primary inline-block">
            Start a similar project
          </Link>
        </div>
      </section>
    </main>
  );
}
