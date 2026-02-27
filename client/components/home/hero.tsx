"use client";

import Link from "next/link";
import { Search, ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
} from "@/components/ui/motion-wrapper";

const colleges = [
  {
    name: "Panjab University",
    slug: "pu",
    gradient: "from-purple-600 to-purple-800",
    icon: "🎓",
    description: "Premier institution for higher education & research.",
  },
  {
    name: "DAV College",
    slug: "dav",
    gradient: "from-red-500 to-red-700",
    icon: "📚",
    description: "Excellence in education at Sector 10, Chandigarh.",
  },
  {
    name: "PPGC-11",
    slug: "ppgc-11",
    gradient: "from-blue-500 to-blue-700",
    icon: "🏛️",
    description: "Post Graduate Government College, Sector 11.",
  },
  {
    name: "SD College",
    slug: "sd",
    gradient: "from-orange-500 to-orange-700",
    icon: "🌟",
    description: "GGDSD College, Sector 32. A legacy of quality.",
  },
];

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center py-16 md:py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/15 via-background to-background dark:from-green-950/30 dark:to-background" />

        {/* Floating particles */}
        <div className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-primary/20 animate-float" />
        <div
          className="absolute top-40 right-[15%] w-2 h-2 rounded-full bg-accent/20 animate-float-reverse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-[20%] w-4 h-4 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-60 right-[30%] w-2 h-2 rounded-full bg-primary/15 animate-float-reverse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-48 right-[10%] w-3 h-3 rounded-full bg-accent/15 animate-float"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
        {/* Badge */}
        <FadeIn delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
            Admissions Open 2026-27
          </motion.div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl leading-[1.1]">
            Your Gateway to <br />
            <span className="text-shimmer">Top Colleges in Chandigarh</span>
          </h1>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.35}>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            One portal for all your admission needs. Simplified process,
            real-time updates, and student support by HIMSU.
          </p>
        </FadeIn>

        {/* Quick Search */}
        <FadeIn delay={0.45}>
          <div className="w-full max-w-xl relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/10 to-primary/20 rounded-full blur-xl transition-all group-hover:from-primary/30 group-hover:via-accent/20 group-hover:to-primary/30 opacity-60 group-hover:opacity-100" />
            <div className="relative glass rounded-full flex items-center p-1.5 sm:p-2 pl-4 sm:pl-6 shadow-lg">
              <Search className="w-5 h-5 text-muted-foreground mr-2 sm:mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Search courses, colleges, deadlines..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base min-w-0"
              />
              <Button size="sm" className="rounded-full px-4 sm:px-6 shrink-0">
                Search
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.55}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/join?tab=member">
              <Button
                size="lg"
                className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow w-full sm:w-auto"
              >
                Join HIMSU Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 w-full sm:w-auto"
              >
                Browse Resources
              </Button>
            </Link>
          </div>
        </FadeIn>

        {/* College Cards Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full pt-8 md:pt-12"
        >
          {colleges.map((college) => (
            <StaggerItem key={college.slug}>
              <Link href={`/college/${college.slug}`} className="block h-full">
                <ScaleOnHover className="h-full">
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative group">
                    <div
                      className={`h-20 md:h-24 bg-linear-to-br ${college.gradient} flex items-center justify-center relative`}
                    >
                      <span className="text-3xl md:text-4xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        {college.icon}
                      </span>
                      {/* Glow on hover */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                    </div>
                    <CardContent className="p-4 md:p-6 text-left relative z-10 bg-card">
                      <h3 className="font-bold text-base md:text-lg mb-1.5 group-hover:text-primary transition-colors">
                        {college.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                        {college.description}
                      </p>
                      <div className="mt-3 md:mt-4 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Portal <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
