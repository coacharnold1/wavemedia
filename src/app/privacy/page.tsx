import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | WAVE Media",
  description: "How WAVE Media collects and uses information.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20">
      <div className="container-wave max-w-3xl space-y-6 text-wave-gray">
        <h1 className="text-4xl font-bold text-wave-white">Privacy Policy</h1>
        <p className="text-sm">DRAFT: pending legal review before launch.</p>
        <h2 className="text-2xl text-wave-white">Information we collect</h2>
        <p>
          When you submit our contact or booking forms we collect the details you provide, such as your
          name, email, phone number and project information. We may also collect anonymous usage
          statistics through analytics tools.
        </p>
        <h2 className="text-2xl text-wave-white">How we use it</h2>
        <p>
          We use your information to respond to your inquiry, provide quotes and deliver our services.
          We do not sell your personal information.
        </p>
        <h2 className="text-2xl text-wave-white">Service providers</h2>
        <p>
          We may use third-party services (for example email delivery, scheduling, CRM and analytics)
          to operate our business. They process data only to provide those services.
        </p>
        <h2 className="text-2xl text-wave-white">Your choices</h2>
        <p>
          To request access to or deletion of your information, email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-wave-gold">{siteConfig.email}</a>.
        </p>
      </div>
    </main>
  );
}
