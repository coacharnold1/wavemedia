import Image from "next/image";
import PlaceholderArt from "@/components/PlaceholderArt";
import ServiceIcon from "@/components/ServiceIcon";
import Link from "next/link";
import { getFeatured } from "@/lib/portfolio";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-wave-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gradient-to-b from-wave-black via-wave-charcoal to-wave-black cinematic-overlay flex items-center justify-center">
        <div className="text-center z-10">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={398}
            height={256}
            className="mx-auto mb-6 h-28 md:h-36 w-auto mix-blend-lighten"
            priority
          />
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            WAVE <span className="text-accent">MEDIA</span>
          </h1>
          <p className="text-xl md:text-2xl text-wave-gray mb-8 tracking-widest">
            Crafting Stories With Intent
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/cinematography" className="btn-primary">Explore Portfolio</Link>
            <Link href="/contact" className="btn-secondary">Get In Touch</Link>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave">
          <h2 className="text-5xl font-bold mb-12 text-center">
            Featured <span className="text-accent">Work</span>
          </h2>

          {/* Portfolio Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFeatured().map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="bg-wave-dark rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative w-full h-64 flex items-center justify-center">
                  <PlaceholderArt label={item.category} />
                  <div aria-hidden="true" className="relative text-4xl text-wave-gold">
                    {item.type === "video" ? "▶" : "◉"}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-wave-gray text-sm">
                    {item.category} • {item.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-wave-black">
        <div className="container-wave">
          <h2 className="text-5xl font-bold mb-12 text-center">
            Our <span className="text-accent">Services</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Cinematography", icon: "cinematography", href: "/services" },
              { name: "Photography", icon: "photography", href: "/services" },
              { name: "Event Production", icon: "content", href: "/services" },
              { name: "Retainer Programs", icon: "storytelling", href: "/services" },
            ].map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="bg-wave-charcoal p-8 rounded-lg border border-wave-dark hover:border-wave-gold hover:shadow-lg hover:shadow-wave-gold/20 transition-all group"
              >
                <ServiceIcon type={service.icon as any} className="w-14 h-14 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                <p className="text-wave-gray">
                  Premium production services tailored to your vision and
                  objectives.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to tell your story?
          </h2>
          <p className="text-xl text-wave-gray mb-8">
            Let&apos;s create something extraordinary together.
          </p>
          <Link href="/booking" className="btn-primary text-lg px-8 py-4 inline-block">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
