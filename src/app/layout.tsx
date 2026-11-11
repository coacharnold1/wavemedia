import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  return (
    <html lang="en">
      <body className="bg-wave-black text-wave-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
