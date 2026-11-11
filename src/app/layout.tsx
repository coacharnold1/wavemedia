import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "WAVE Media - Premium Cinematography & Photography",
  description:
    "Premium cinematography, photography, and creative production services. WAVE Media creates compelling stories for brands, athletes, and organizations.",
  keywords: [
    "cinematography",
    "photography",
    "video production",
    "creative media",
    "commercial production",
  ],
  viewport: "width=device-width, initial-scale=1",
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
      <body className="bg-wave-black text-wave-white">{children}</body>
    </html>
  );
}
