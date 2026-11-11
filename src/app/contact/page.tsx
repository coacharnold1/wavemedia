import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact WAVE Media | Get In Touch",
  description: "Contact WAVE Media for inquiries, consultations, and project discussions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      <section className="py-24">
        <div className="container-wave">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-xl text-wave-gray text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it. Reach out and let's discuss how
            we can bring your vision to life.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Email</h3>
                <a
                  href="mailto:contact@wavemedianj.com"
                  className="text-wave-white hover:text-wave-gold transition-colors text-lg"
                >
                  contact@wavemedianj.com
                </a>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Phone</h3>
                <a
                  href="tel:+1234567890"
                  className="text-wave-white hover:text-wave-gold transition-colors text-lg"
                >
                  +1 (123) 456-7890
                </a>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-wave-gold hover:text-wave-gold-light transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-wave-gold hover:text-wave-gold-light transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6 bg-wave-charcoal p-8 rounded-lg border border-wave-gold/10">
              <div>
                <label className="block text-wave-white font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full bg-wave-dark text-wave-white px-4 py-3 rounded-lg border border-wave-gold/20 focus:border-wave-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-wave-white font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full bg-wave-dark text-wave-white px-4 py-3 rounded-lg border border-wave-gold/20 focus:border-wave-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-wave-white font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                  className="w-full bg-wave-dark text-wave-white px-4 py-3 rounded-lg border border-wave-gold/20 focus:border-wave-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-wave-white font-semibold mb-2">Message *</label>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className="w-full bg-wave-dark text-wave-white px-4 py-3 rounded-lg border border-wave-gold/20 focus:border-wave-gold focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn-primary text-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
