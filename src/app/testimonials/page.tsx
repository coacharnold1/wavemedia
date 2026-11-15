import type { Metadata } from "next";
import { getAllTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | WAVE Media",
  description:
    "Read what our clients say about WAVE Media's cinematography and videography services.",
};

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();

  return (
    <main className="min-h-screen bg-wave-black pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Client <span className="text-accent">Testimonials</span>
          </h1>
          <p className="text-xl text-wave-gray text-center max-w-2xl mx-auto">
            Hear what our clients have to say about working with WAVE Media.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24">
        <div className="container-wave">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-wave-charcoal rounded-lg p-8 border border-wave-gold/20 hover:border-wave-gold/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {testimonial.name}
                    </h3>
                    {testimonial.role && (
                      <p className="text-wave-gray text-sm">{testimonial.role}</p>
                    )}
                  </div>
                  {testimonial.verified && (
                    <div className="bg-wave-gold/10 text-wave-gold px-3 py-1 rounded-full text-xs font-semibold">
                      ✓ Verified
                    </div>
                  )}
                </div>

                <p className="text-wave-gray mb-4 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-wave-gold/10">
                  <p className="text-wave-gray text-sm">{testimonial.date}</p>
                  {testimonial.source && (
                    <p className="text-wave-gold text-xs font-semibold">
                      {testimonial.source}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-wave-charcoal">
        <div className="container-wave text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to tell your <span className="text-accent">story?</span>
          </h2>
          <p className="text-wave-gray text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s create something extraordinary together. Get in touch to discuss your next project.
          </p>
          <a href="/contact" className="btn-primary">
            Start Your Project
          </a>
        </div>
      </section>
    </main>
  );
}
