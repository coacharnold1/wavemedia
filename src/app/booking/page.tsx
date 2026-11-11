import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Project | WAVE Media",
  description: "Tell WAVE Media about your project and request a custom quote.",
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-wave-black pt-20">
      <section className="py-24">
        <div className="container-wave max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Book a <span className="text-accent">Project</span>
          </h1>
          <p className="text-xl text-wave-gray text-center mb-12">
            Share a few details and we&apos;ll get back to you within 24 hours.
          </p>
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
