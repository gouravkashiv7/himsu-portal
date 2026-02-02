import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";
import { BloodDonationWidget } from "@/components/home/blood-widget";
import { AlertTicker } from "@/components/home/ticker";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Alerts Ticker */}
      <AlertTicker />

      {/* Hero Section */}
      <Hero />

      {/* Showcase Section */}
      <Showcase />

      {/* Floating Widget */}
      <BloodDonationWidget />
    </div>
  );
}
