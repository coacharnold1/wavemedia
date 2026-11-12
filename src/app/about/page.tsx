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
              I&apos;m Lorenzo Williams, a New Jersey filmmaker, photographer, educator, and head boys varsity basketball coach at Hillside High School. I founded WAVE Media to tell stories about people and the work they care about. That might mean capturing the energy of a team on media day, showing the craftsmanship behind a small business, or recording a family celebration so they can come back to it years later.
            </p>
            <p>
              Coaching and teaching have shaped the way I work behind the camera. I listen first, give clear direction, and help people feel comfortable being themselves on camera. Some of my favorite moments come between takes, when people settle in and you get to see who they really are.
            </p>
            <p>
              Through WAVE Media, I produce brand films, social media reels, athlete highlights, team media days, and photo and video coverage for weddings and events. I also served as co-cinematographer on <em>91%: A Story of Triumph</em>, which won Best Documentary at the New York International Film Awards.
            </p>
            <p>
              Every project starts with a conversation about who you want to reach and what you want them to remember. From planning the shoot to delivering the final edit, I keep that goal in view so the finished work feels true to you.
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
              <strong className="text-wave-white">We craft stories with intent.</strong> Every frame is purposeful. Every project is a conversation about who you want to reach and what you want them to remember.
            </p>
            <p>
              From planning through final delivery, I keep that goal in view so your story feels authentic and true to you.
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
          <h2 className="text-4xl font-bold mb-6">Have a project in mind?</h2>
          <p className="text-wave-gray mb-8">Let&apos;s talk about what you want to capture.</p>
          <a href="/contact" className="btn-primary text-lg">Get In Touch</a>
        </div>
      </section>
    </main>
  );
}
