export default function HomePage() {
  return (
    <main className="min-h-screen bg-wave-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gradient-to-b from-wave-black via-wave-charcoal to-wave-black cinematic-overlay flex items-center justify-center">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            WAVE <span className="text-accent">MEDIA</span>
          </h1>
          <p className="text-xl md:text-2xl text-wave-gray mb-8 tracking-widest">
            Crafting Stories With Intent
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-primary">Explore Portfolio</button>
            <button className="btn-secondary">Get In Touch</button>
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
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-wave-dark rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-full h-64 bg-gradient-to-br from-wave-gold/10 to-wave-dark flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">▶</div>
                    <p className="text-wave-gold">Portfolio Item {item}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project Title</h3>
                  <p className="text-wave-gray text-sm">
                    Cinematography • 2024
                  </p>
                </div>
              </div>
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
            {["Cinematography", "Photography", "Event Production", "Retainer Programs"].map(
              (service, idx) => (
                <div
                  key={idx}
                  className="bg-wave-charcoal p-8 rounded-lg border border-wave-dark hover:border-wave-gold transition-colors"
                >
                  <div className="text-4xl text-accent mb-4">★</div>
                  <h3 className="text-2xl font-bold mb-3">{service}</h3>
                  <p className="text-wave-gray">
                    Premium production services tailored to your vision and
                    objectives.
                  </p>
                </div>
              )
            )}
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
            Let's create something extraordinary together.
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Schedule Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
