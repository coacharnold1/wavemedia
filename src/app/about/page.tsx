import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WAVE Media | Our Story",
  description: "Learn about WAVE Media's story, mission, and the team behind the work.",
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

      {/* About WAVE Media */}
      <section className="py-24">
        <div className="container-wave max-w-3xl">
          <h2 className="text-4xl font-bold mb-8 text-accent">About WAVE Media</h2>
          <div className="space-y-6 text-wave-gray leading-relaxed">
            <p>
              WAVE Media is a New Jersey-based cinematography and photography studio dedicated to telling stories about people and the work they care about. Whether you&apos;re launching a product, celebrating a milestone, building a team, or capturing a moment you want to return to, we create films, photographs, and content designed to resonate.
            </p>
            <p>
              Founded on the principle of &quot;Crafting Stories With Intent,&quot; every project begins with a clear conversation about who you want to reach and what you want them to remember. From pre-production planning through final delivery, we keep that goal in view so your story feels authentic and true to you.
            </p>
            <p>
              Our team brings decades of combined experience in television, education, coaching, and production. We specialize in commercial films, documentaries, brand content, sports videography, event coverage, wedding films, and photography across all genres. We also travel for projects and offer monthly retainer packages for businesses seeking consistent, high-quality content.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave">
          <h2 className="text-4xl font-bold mb-16 text-center text-accent">Our Team</h2>

          {/* Lorenzo Williams */}
          <div className="max-w-3xl mx-auto mb-20 pb-20 border-b border-wave-gold/20">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="bg-wave-charcoal rounded-lg aspect-square flex items-center justify-center border border-wave-gold/20">
                  {/* Headshot will go here: /public/team/lorenzo-williams.jpg */}
                  <p className="text-wave-gray text-sm text-center px-4">Headshot placeholder</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-3xl font-bold mb-4">Lorenzo Williams</h3>
                <p className="text-wave-gold font-semibold mb-6">Founder, Cinematographer & Filmmaker</p>
                <div className="space-y-6 text-wave-gray leading-relaxed">
                  <p>
                    Lorenzo is a filmmaker, photographer, educator, and head boys varsity basketball coach at Hillside High School. His coaching and teaching experience shapes how he works behind the camera—he listens first, gives clear direction, and helps people feel comfortable being themselves on film.
                  </p>
                  <p>
                    Through WAVE Media, Lorenzo produces brand films, social media content, athlete highlights, team media days, and photo and video coverage for weddings and events. He served as co-cinematographer on <em>91%: A Story of Triumph</em>, which won Best Documentary at the New York International Film Awards.
                  </p>
                  <p>
                    Some of Lorenzo&apos;s favorite moments happen between takes, when people settle in and you get to see who they really are. He believes that every project starts with understanding your audience and what you want them to remember, and that goal guides every creative decision from planning through delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tim Arnold */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="bg-wave-charcoal rounded-lg aspect-square flex items-center justify-center border border-wave-gold/20">
                  {/* Headshot will go here: /public/team/tim-arnold.jpg */}
                  <p className="text-wave-gray text-sm text-center px-4">Headshot placeholder</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-3xl font-bold mb-4">Tim Arnold</h3>
                <p className="text-wave-gold font-semibold mb-6">Photographer & Creative Partner</p>
                <div className="space-y-6 text-wave-gray leading-relaxed">
                  <p>
                    Tim brings 25 years of experience in television and multimedia production to WAVE Media. After years working in broadcasting and then transitioning into education and coaching, he has dedicated himself full-time to photography as his creative calling.
                  </p>
                  <p>
                    Tim specializes in event photography, portraits, landscapes, and concert photography—work that celebrates the energy and emotion of the moment. His philosophy is simple: capture the beauty and feeling of the moment with authenticity and care. Whether it&apos;s an intimate portrait, the atmosphere of a live event, or the majesty of a landscape, Tim&apos;s work focuses on finding the human element and the story within the frame.
                  </p>
                  <p>
                    His deep background in broadcast and multimedia, combined with his years in education, gives him a unique ability to work with diverse clients and adapt to any environment. Tim&apos;s calm, collaborative approach puts subjects at ease and helps tell their story in a way that feels genuine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="container-wave max-w-3xl">
          <h2 className="text-4xl font-bold mb-8 text-accent">Our Philosophy</h2>
          <div className="space-y-6 text-wave-gray leading-relaxed">
            <p>
              <strong className="text-wave-white">We craft stories with intent.</strong> Every frame is purposeful. Every project is a conversation about who you want to reach and what you want them to remember.
            </p>
            <p>
              We listen first. We ask the right questions. We bring experience from coaching, teaching, broadcasting, and years of creative work. We help you feel comfortable on camera and capture who you really are.
            </p>
            <p>
              From planning through final delivery, we keep your goal in view so your story feels authentic, true, and worth coming back to.
            </p>
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
