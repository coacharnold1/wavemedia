import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WAVE Academy | Coming Soon",
  description: "WAVE Academy is coming soon. Learn cinematography and photography with WAVE Media.",
};

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      <section className="py-32">
        <div className="container-wave text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            WAVE <span className="text-accent">Academy</span>
          </h1>
          <p className="text-xl text-wave-gray mb-10">
            Coming soon. Workshops and training in cinematography and photography are on the way.
            Get in touch to be the first to hear about it.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Get Notified
          </Link>
        </div>
      </section>
    </main>
  );
}
