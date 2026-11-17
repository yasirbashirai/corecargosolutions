import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { businessSchema } from "@/lib/schema";
import "./globals.css";

// Brand typography, self-hosted so builds and page loads never depend on Google Fonts
const montserrat = localFont({ src: "../fonts/montserrat-latin.woff2", weight: "500 900", variable: "--font-montserrat", display: "swap" });
const inter = localFont({ src: "../fonts/inter-latin.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Same Day Freight Delivery & Urgent Transport UK | Core Cargo Solutions",
    template: "%s | Core Cargo Solutions",
  },
  description:
    "Core Cargo Solutions Ltd provides urgent, same day and next day dedicated transport across the UK from Manchester. Collections within the hour, 24/7. Get a quote.",
  keywords: ["same day freight delivery", "dedicated transport services", "urgent transport services", "same day courier Manchester", "urgent freight UK", "transport consultancy"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    images: [{ url: "/images/og-core-cargo.jpg", width: 1200, height: 630, alt: "Core Cargo Solutions dedicated transport" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#03438F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={businessSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
