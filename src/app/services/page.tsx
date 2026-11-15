import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | WAVE Media",
  description:
    "Cinematography, photography, event production and monthly retainer packages from WAVE Media.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-wave-charcoal to-wave-black">
        <div className="container-wave">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl text-wave-gray max-w-3xl">
            WAVE Media creates films, photography, and social content for businesses, schools, sports programs, and private clients. Book a standalone shoot, combine photo and video coverage, or set up a monthly retainer for ongoing content. We&apos;re based in New Jersey and available to travel for projects.
          </p>
        </div>
      </section>

      {/* Photography Services */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave">
          <h2 className="text-4xl font-bold mb-12">
            <span className="text-accent">Photography</span>
          </h2>
          <p className="text-wave-gray text-lg mb-12 max-w-3xl">
            From a portrait session to a full event, WAVE Media offers posed portraits, candid coverage, and commercial photography.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Individual Portraits & Headshots",
                description: "Personal portraits, professional headshots, and branding photos for entrepreneurs, creatives, and professionals.",
              },
              {
                title: "Family & Couples Portraits",
                description: "Family sessions, parent-and-child portraits, couples portraits, and group photos for milestone occasions or multigenerational gatherings.",
              },
              {
                title: "Event Photography & Portraits",
                description: "Posed portraits of hosts, honorees, and guests, along with group photos, candid moments, and venue details. Available for birthdays, private celebrations, conferences, and community gatherings.",
              },
              {
                title: "Sports & Media Day Photography",
                description: "Individual athlete portraits, team photos, and media day imagery for roster graphics, senior spotlights, and season announcements.",
              },
              {
                title: "School & Organization Photography",
                description: "Staff portraits, group photos, and coverage of school programs and community events.",
              },
              {
                title: "Product & Brand Photography",
                description: "Product close-ups, detail shots, and lifestyle imagery for websites, social media, and promotional materials.",
              },
            ].map((service) => (
              <div key={service.title} className="bg-wave-black p-6 rounded-lg border border-wave-dark">
                <h3 className="text-xl font-bold text-wave-gold mb-2">{service.title}</h3>
                <p className="text-wave-gray">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Services */}
      <section className="py-24">
        <div className="container-wave space-y-24">
          {/* Brand & Product Videography */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Brand & Product <span className="text-accent">Videography</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              Show customers what you make, how you make it, and who&apos;s behind it. We film brand promos, product showcases, behind-the-scenes features, and customer testimonials. A project can focus on the finished product, the process behind it, or both.
            </p>
            <p className="text-wave-gray">
              <span className="text-wave-gold font-semibold">Featured work:</span> H.E.M. Customs luxury humidor films.
            </p>
          </div>

          {/* Sports Videography */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Sports Videography & <span className="text-accent">Media Days</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              Give athletes and teams footage they can use for recruiting, program promotion, and social media. We create athlete highlight reels, player introductions, team promos, and media day videos. Photo and video coverage can be planned together for team announcements and player features.
            </p>
            <p className="text-wave-gray">
              <span className="text-wave-gold font-semibold">Featured work:</span> Hillside Comets basketball promo, Hillside football media day, and baseball, basketball, and lacrosse athlete highlights.
            </p>
          </div>

          {/* Event Videography */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Event <span className="text-accent">Videography</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              We film conferences, community gatherings, and private celebrations. Coverage can focus on a keynote, a milestone moment, or the atmosphere of the day. Highlight recaps give you something to share with guests or use to promote future events.
            </p>
            <p className="text-wave-gray">
              <span className="text-wave-gold font-semibold">Featured work:</span> The Squad&apos;s Kentucky Derby and Breast Cancer Awareness events and Monica&apos;s 50th birthday celebration.
            </p>
          </div>

          {/* Wedding Films */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-accent">Wedding</span> Films
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              We create wedding highlight films that bring the celebration and the people who shared it with you back into view. Your film is designed to be easy to share with loved ones and worth returning to on an anniversary.
            </p>
            <p className="text-wave-gray">
              <span className="text-wave-gold font-semibold">Featured work:</span> Brandon &amp; Victoria&apos;s wedding film.
            </p>
          </div>

          {/* Speaker Reels */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Speaker Reels, Interviews & <span className="text-accent">Testimonials</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              We film live presentations and sit-down interviews, then edit the footage for the audience you want to reach. Speakers can share a short reel with event planners, while businesses and organizations can use testimonials to let clients describe their experiences in their own words.
            </p>
            <p className="text-wave-gray">
              <span className="text-wave-gold font-semibold">Featured work:</span> Mandy Enright&apos;s speaker reel and presentations with client testimonials.
            </p>
          </div>

          {/* School & Community */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              School & Community <span className="text-accent">Video</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              Help families see what&apos;s happening across your school, district, or organization. We produce event recaps, program launch videos, and features that spotlight students, staff, and community initiatives.
            </p>
            <p className="text-wave-gray">
              <span className="text-wave-gold font-semibold">Featured work:</span> Hillside Opening Day and Felician University Baccalaureate Mass coverage.
            </p>
          </div>

          {/* Documentary */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Documentary <span className="text-accent">Cinematography</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              WAVE Media provides cinematography for documentaries and interview-led projects, including on-camera interviews and supporting footage that gives the story context.
            </p>
            <p className="text-wave-gray">
              <span className="text-wave-gold font-semibold">Featured work:</span> Lorenzo Williams served as co-cinematographer on <em>91%: A Story of Triumph</em>.
            </p>
          </div>

          {/* Video Editing */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Video Editing & Social <span className="text-accent">Reels</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              Turn footage from a shoot, presentation, or event into videos ready for your website or social channels. We edit short-form reels, highlight cuts, branded intros, and speaker graphics.
            </p>
          </div>

          {/* Monthly Retainers */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Monthly Content <span className="text-accent">Retainers</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              Keep fresh content on hand for your website, social channels, and campaigns. We build monthly retainers around your schedule and the deliverables you need, from recurring photo and video shoots to short-form reels, product features, and client testimonials.
            </p>
          </div>

          {/* Travel */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Travel & Destination <span className="text-accent">Projects</span>
            </h2>
            <p className="text-wave-gray text-lg mb-6 max-w-3xl">
              WAVE Media is available to travel for weddings, events, commercial shoots, and other productions. Share your location and dates so we can include travel in your quote.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave text-center">
          <h2 className="text-4xl font-bold mb-6">
            Request a <span className="text-accent">Quote</span>
          </h2>
          <p className="text-wave-gray text-lg mb-8 max-w-2xl mx-auto">
            Tell us what you&apos;re planning, where and when it&apos;s happening, and how you&apos;d like to use the finished photos or video. If you need ongoing content, let us know what you&apos;d like to produce each month.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-4 inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
