"use client"; // Needed for carousel interactivity later

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Calendar, Heart } from "lucide-react";

const stats = [
  { label: "Active Members", value: "50,000+", icon: Users },
  { label: "Blood Units Donated", value: "1,200+", icon: Heart },
  { label: "Events Organized", value: "250+", icon: Calendar },
  { label: "Awards Won", value: "15+", icon: Trophy },
];

export function Showcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Legacy of <span className="text-primary">Leadership & Service</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            HIMSU has been at the forefront of student welfare, cultural
            preservation, and social service in Chandigarh since 2002.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-fade-in">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="p-3 bg-background rounded-full shadow-sm mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Placeholder (To be replaced with dynamic carousel) */}
        <div className="relative aspect-21/9 overflow-hidden rounded-xl border bg-muted shadow-inner group">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            {/* Placeholder for Gallery Image */}
            <span className="font-medium">Gallery Showcase Coming Soon</span>
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-2xl font-bold mb-2">Cultural Night 2025</h3>
            <p className="opacity-90">
              Celebrating the spirit of Himachal with music and dance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
