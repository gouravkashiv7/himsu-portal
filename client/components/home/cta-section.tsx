"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion-wrapper";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-accent/5 animate-gradient" />

      {/* Floating accents */}
      <div className="absolute top-10 right-[20%] w-32 h-32 md:w-64 md:h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-10 left-[15%] w-24 h-24 md:w-48 md:h-48 rounded-full bg-accent/5 blur-3xl animate-float-reverse" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 md:mb-6">
              Ready to Start Your{" "}
              <span className="text-shimmer">College Journey?</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
              Join thousands of students who trust HIMSU for their admission
              needs. Get started today — it&apos;s completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/join?tab=member">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full px-8 md:px-10 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow text-base w-full sm:w-auto"
                  >
                    Join HIMSU Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/faq">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 md:px-10 text-base w-full sm:w-auto"
                  >
                    Have Questions?
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
