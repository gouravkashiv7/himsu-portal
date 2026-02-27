import { Metadata } from "next";
import { EventsContent } from "@/components/home/events-content";

export const metadata: Metadata = {
  title: "Community Events - HIMSU",
  description:
    "Stay updated with the latest events, workshops, and seminars organized by the Himachal Students Union in Chandigarh.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-10">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-gradient">
            Community <br /> Events
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
            Explore and participate in our upcoming gatherings, educational
            seminars, and cultural festivals.
          </p>
        </div>

        <EventsContent />
      </div>
    </div>
  );
}
