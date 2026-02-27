import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HIMSU – Himachal Students Union | Chandigarh",
    template: "%s | HIMSU",
  },
  description:
    "Official portal of Himachal Students Union (HIMSU) — your one-stop platform for college admissions to PU, DAV, PPGC-11 & SD College in Chandigarh. Get real-time updates, study resources, blood donation support, and community events.",
  keywords: [
    "HIMSU",
    "Himachal Students Union",
    "Chandigarh colleges",
    "PU admissions",
    "DAV College",
    "PPGC-11",
    "SD College",
    "student portal",
    "blood donation Chandigarh",
    "college admissions 2026",
    "Panjab University",
    "Himachali students",
  ],
  authors: [{ name: "HIMSU", url: "https://himsu.in" }],
  creator: "Codefinite",
  publisher: "HIMSU – Himachal Students Union",
  metadataBase: new URL("https://himsu.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://himsu.in",
    siteName: "HIMSU – Himachal Students Union",
    title: "HIMSU – Your Gateway to Top Colleges in Chandigarh",
    description:
      "One portal for PU, DAV, PPGC-11 & SD College admissions. Real-time updates, study resources, and student welfare by HIMSU.",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "HIMSU Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIMSU – Himachal Students Union",
    description:
      "Your one-stop portal for college admissions in Chandigarh. Join 50,000+ students.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    // Add your Google Search Console / Bing Webmaster verification codes here
    // google: "your-google-verification-code",
    // other: { "msvalidate.01": "your-bing-code" },
  },
};

import { Footer } from "@/components/layout/footer";
import { WhatsAppWidget } from "@/components/communication/whatsapp-widget";
import { SplineBackground } from "@/components/layout/SplineBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <SplineBackground />
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  );
}
