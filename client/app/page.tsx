import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";
import { Features } from "@/components/home/features";
import { CTASection } from "@/components/home/cta-section";
import { BloodDonationWidget } from "@/components/home/blood-widget";
import { AlertTicker } from "@/components/home/ticker";

// JSON-LD Structured Data for the organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HIMSU – Himachal Students Union",
  url: "https://himsu.in",
  logo: "https://himsu.in/logo.jpg",
  description:
    "Official student union portal for Himachali students in Chandigarh — admissions, welfare, blood donation, and community support.",
  foundingDate: "2002",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chandigarh",
    addressRegion: "Chandigarh",
    addressCountry: "IN",
  },
  sameAs: ["https://www.instagram.com/himsu_official/"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Student Support",
    email: "contact@himsu.org",
    availableLanguage: ["English", "Hindi"],
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col min-h-screen">
        {/* Alerts Ticker */}
        <AlertTicker />

        {/* Hero Section */}
        <Hero />

        {/* Why HIMSU */}
        <Features />

        {/* Showcase Section */}
        <Showcase />

        {/* Call to Action */}
        <CTASection />

        {/* Floating Widget */}
        <BloodDonationWidget />
      </div>
    </>
  );
}
