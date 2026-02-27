"use client";

import { Shield, BookOpen, HeartHandshake, Megaphone } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion-wrapper";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Admission Portal",
    description:
      "Simplified admission process for PU, DAV, PPGC-11, and SD College with real-time tracking.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: HeartHandshake,
    title: "Student Welfare",
    description:
      "From blood donation drives to emergency support — we're always here for you.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: Megaphone,
    title: "Community & Events",
    description:
      "Cultural nights, sports events, and networking opportunities for Himachali students.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Trusted Since 2002",
    description:
      "HIMSU has been serving the student community in Chandigarh for over two decades.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export function Features() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Why HIMSU?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need,{" "}
            <span className="text-gradient">One Platform</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            We bring together admissions, welfare, and community under one roof
            to make your college journey seamless.
          </p>
        </FadeIn>

        {/* Features Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`}
                  />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
