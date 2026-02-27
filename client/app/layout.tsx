import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HIMSU – Chandigarh Govt & Private College Admissions",
    template: "%s | HIMSU",
  },
  description:
    "Official HIMSU student portal for admission to Panjab University (PU), DAV, SD, & GC-11 Chandigarh. Get real-time updates, resources, and community support.",
  keywords: [
    "HIMSU",
    "Himachal Students Union",
    "Chandigarh college admissions",
    "Govt colleges in Chandigarh",
    "Private colleges in Chandigarh",
    "PU Chandigarh Admissions",
    "Panjab University admission",
    "DAV College Chandigarh Admission",
    "SD College Chandigarh",
    "GC-11 Admissions",
    "student union Chandigarh",
    "blood donation Chandigarh",
  ],
  authors: [{ name: "HIMSU", url: "https://himsu.in" }],
  creator: "HIMSU",
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
    title: "HIMSU – Chandigarh Govt & Private College Admissions",
    description:
      "Official HIMSU student portal for admission to Panjab University (PU), DAV, SD, & GC-11 Chandigarh. Get real-time updates, resources, and community support.",
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
    title: "HIMSU – Chandigarh College Admissions",
    description:
      "Your one-stop HIMSU portal for college admissions in Chandigarh. Join 50,000+ students.",
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
