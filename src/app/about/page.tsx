import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WAVE Media | Our Story",
  description: "Learn about WAVE Media's story, mission, and creative philosophy.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-wave-charcoal to-wave-black">
        <div className="container-wave text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-accent">WAVE</span>
          </h1>
          <p className="text-xl text-wave-gray max-w-2xl mx-auto">
            Crafting Stories With Intent
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container-wave max-w-3xl">
          <h2 className="text-4xl font-bold mb-8 text-accent">Our Story</h2>
          <div className="space-y-6 text-wave-gray leading-relaxed">
            <p>
              WAVE Media was founded with a single mission: to create premium visual content that
              tells compelling stories for our clients.
            </p>
            <p>
              We believe that great cinematography and photography go beyond capturing moments—they
              convey emotion, intent, and meaning.
            </p>
            <p>
              Our team brings together years of experience in commercial production, documentary
              filmmaking, sports media, and creative direction.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave max-w-3xl">
          <h2 className="text-4xl font-bold mb-8 text-accent">Our Philosophy</h2>
          <div className="space-y-6 text-wave-gray leading-relaxed">
            <p>
              <strong className="text-wave-white">We craft stories with intent.</strong> Every frame,
              every shot, every edit serves a purpose.
            </p>
            <p>
              We work with brands, organizations, and individuals who are serious about their
              image and their message.
            </p>
            <p>
              Whether it's a commercial, documentary, music video, or corporate project, we
              approach each production with the professionalism and vision it deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24">
        <div className="container-wave">
          <h2 className="text-4xl font-bold mb-12 text-center text-accent">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Cinematography", desc: "Commercial, documentary, and branded films" },
              { title: "Photography", desc: "Sports, portraits, events, and corporate work" },
              { title: "Production", desc: "Full-service event and project production" },
              { title: "Content", desc: "Recurring content and social media production" },
            ].map((service, i) => (
              <div key={i} className="bg-wave-charcoal p-6 rounded-lg border border-wave-gold/10">
                <h3 className="text-xl font-bold mb-2 text-wave-gold">{service.title}</h3>
                <p className="text-wave-gray">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to create something great?</h2>
          <p className="text-wave-gray mb-8">Let's discuss your project.</p>
          <button className="btn-primary text-lg">Get In Touch</button>
        </div>
      </section>
    </main>
  );
}
