import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { phoneHref, siteConfig, socialLinks } from "@/lib/constants";

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
            Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s discuss how
            we can bring your vision to life.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Email</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-wave-white hover:text-wave-gold transition-colors text-lg"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-accent">Phone</h3>
                <a
                  href={phoneHref}
                  className="text-wave-white hover:text-wave-gold transition-colors text-lg"
                >
                  {siteConfig.phone}
                </a>
              </div>
              {socialLinks.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-accent">Social Media</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-wave-gold hover:text-wave-gold-light transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
