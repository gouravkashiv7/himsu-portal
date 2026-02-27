import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";
import { Features } from "@/components/home/features";
import { CTASection } from "@/components/home/cta-section";
import { BloodDonationWidget } from "@/components/home/blood-widget";
import { AlertTicker } from "@/components/home/ticker";

// JSON-LD Structured Data
const jsonLd = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HIMSU – Chandigarh Govt & Private College Admissions",
    url: "https://himsu.in",
    description: "Portal for admission to PU, DAV, SD, & GC-11 Chandigarh.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://himsu.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Colleges",
        description: "Explore Govt and Private colleges in Chandigarh.",
        url: "https://himsu.in/#colleges",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Resources",
        description: "Study materials, PYQs, and notes.",
        url: "https://himsu.in/resources",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Events",
        description: "Upcoming student events in Chandigarh.",
        url: "https://himsu.in/events",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "FAQ",
        description: "Frequently asked questions for admission.",
        url: "https://himsu.in/faq",
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Blood Donation",
        description: "Emergency blood donation network.",
        url: "https://himsu.in/blood-donation",
      },
    ],
  },
];

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
