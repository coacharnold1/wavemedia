import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | WAVE Media",
  description: "Terms for using the WAVE Media website.",
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-20">
      <div className="container-wave max-w-3xl space-y-6 text-wave-gray">
        <h1 className="text-4xl font-bold text-wave-white">Terms of Service</h1>
        <p className="text-sm">DRAFT: pending legal review before launch.</p>
        <h2 className="text-2xl text-wave-white">Website use</h2>
        <p>
          This website is provided for information about WAVE Media LLC and its services. Content,
          images, video and branding are owned by WAVE Media or its clients and may not be copied or
          reused without permission.
        </p>
        <h2 className="text-2xl text-wave-white">Projects and bookings</h2>
        <p>
          Submitting an inquiry does not create a booking. Project scope, pricing, usage rights and
          schedules are set out in a separate written agreement.
        </p>
        <h2 className="text-2xl text-wave-white">Contact</h2>
        <p>
          Questions: <a href={`mailto:${siteConfig.email}`} className="text-wave-gold">{siteConfig.email}</a>.
        </p>
      </div>
    </main>
  );
}
