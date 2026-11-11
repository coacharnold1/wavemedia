import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | WAVE Media",
  description:
    "Cinematography, photography, event production and monthly retainer packages from WAVE Media.",
};

const services = [
  {
    id: "cinematography",
    name: "Cinematography",
    summary: "Commercials, documentaries, music videos and branded content.",
    includes: ["Pre-production planning", "Cinema-grade capture", "Editing and color", "Delivery in all formats"],
  },
  {
    id: "photography",
    name: "Photography",
    summary: "Sports, portraits, events, corporate headshots and lifestyle.",
    includes: ["On-location or studio", "Professional retouching", "Online gallery", "Usage-ready exports"],
  },
  {
    id: "events",
    name: "Event Production",
    summary: "Weddings, celebrations, conferences and corporate events.",
    includes: ["Photo and video coverage", "Highlight reel", "Same-week previews", "Full gallery delivery"],
  },
  {
    id: "retainer",
    name: "Monthly Retainers",
    summary: "Recurring video and social content for businesses.",
    includes: ["Monthly shoot day", "Social-ready cutdowns", "Priority scheduling", "Consistent brand look"],
  },
];

const tiers = [
  { name: "Essential", blurb: "A focused shoot for a single deliverable.", points: ["Half-day production", "1 final deliverable", "1 revision round"], highlight: false },
  { name: "Signature", blurb: "Our most popular package for campaigns.", points: ["Full-day production", "Multiple deliverables", "2 revision rounds", "Social cutdowns"], highlight: true },
  { name: "Premium", blurb: "Multi-day, multi-location productions.", points: ["Multi-day production", "Full crew options", "Custom deliverables", "Priority turnaround"], highlight: false },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      <section className="py-24 bg-gradient-to-b from-wave-charcoal to-wave-black">
        <div className="container-wave text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl text-wave-gray max-w-2xl mx-auto">
            Every project is quoted to fit your goals. Pricing is custom — tell us what you need.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wave grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-wave-charcoal p-8 rounded-lg border border-wave-dark hover:border-wave-gold transition-colors"
            >
              <h2 className="text-3xl font-bold mb-3">{s.name}</h2>
              <p className="text-wave-gray mb-4">{s.summary}</p>
              <ul className="space-y-2 mb-6 text-wave-gray">
                {s.includes.map((i) => (
                  <li key={i}>
                    <span className="text-wave-gold mr-2">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
              <Link href={`/booking?service=${s.id}`} className="btn-secondary inline-block">
                Request a quote
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-wave-charcoal">
        <div className="container-wave">
          <h2 className="text-4xl font-bold mb-3 text-center">
            Package <span className="text-accent">Tiers</span>
          </h2>
          <p className="text-wave-gray text-center mb-12">
            Starting points — final scope and quote are always custom.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`p-8 rounded-lg border ${
                  t.highlight ? "border-wave-gold bg-wave-black" : "border-wave-dark bg-wave-black/50"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
                <p className="text-wave-gray mb-4">{t.blurb}</p>
                <ul className="space-y-2 text-wave-gray">
                  {t.points.map((p) => (
                    <li key={p}>
                      <span className="text-wave-gold mr-2">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container-wave">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <Link href="/booking" className="btn-primary text-lg px-8 py-4 inline-block">
            Book a Project
          </Link>
        </div>
      </section>
    </main>
  );
}
