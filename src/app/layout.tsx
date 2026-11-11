import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import { siteConfig, socialLinks } from "@/lib/constants";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wavemedianj.com"),
  title: {
    default: "WAVE Media - Premium Cinematography & Photography",
    template: "%s",
  },
  description:
    "Premium cinematography, photography, and creative production services. WAVE Media creates compelling stories for brands, athletes, and organizations.",
  keywords: [
    "cinematography",
    "photography",
    "video production",
    "creative media",
    "commercial production",
  ],
  authors: [{ name: "WAVE Media LLC" }],
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wavemedianj.com",
    title: "WAVE Media - Premium Cinematography & Photography",
    description: "Crafting Stories With Intent",
    siteName: "WAVE Media",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: `${siteConfig.url}/brand/logo-mark.png`,
    slogan: siteConfig.tagline,
    ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.href) } : {}),
  };

  return (
    <html lang="en">
      <body className="bg-wave-black text-wave-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-wave-gold focus:text-wave-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
