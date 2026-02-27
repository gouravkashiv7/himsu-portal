"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Calendar, Heart } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from "@/components/ui/motion-wrapper";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Active Members",
    value: 50000,
    suffix: "+",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Blood Units Donated",
    value: 1200,
    suffix: "+",
    icon: Heart,
    color: "text-red-500",
  },
  {
    label: "Events Organized",
    value: 250,
    suffix: "+",
    icon: Calendar,
    color: "text-amber-500",
  },
  {
    label: "Awards Won",
    value: 15,
    suffix: "+",
    icon: Trophy,
    color: "text-purple-500",
  },
];

export function Showcase() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Legacy of <span className="text-shimmer">Leadership & Service</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            HIMSU has been at the forefront of student welfare, cultural
            preservation, and social service in Chandigarh since 2002.
          </p>
        </FadeIn>

        {/* Stats Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20"
        >
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center p-4 sm:p-6 bg-muted/50 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="p-2.5 sm:p-3 bg-background rounded-full shadow-sm mb-3 sm:mb-4 ring-1 ring-border/50">
                  <stat.icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`}
                  />
                </div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Gallery Placeholder with parallax hover */}
        <FadeIn delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative aspect-21/9 overflow-hidden rounded-2xl border bg-muted shadow-inner group cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <span className="font-medium text-sm sm:text-base">
                Gallery Showcase Coming Soon
              </span>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent p-4 sm:p-6 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-white">
                Cultural Night 2025
              </h3>
              <p className="opacity-80 text-white text-sm sm:text-base">
                Celebrating the spirit of Himachal with music and dance.
              </p>
            </div>

            {/* Animated border glow on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-500" />
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
