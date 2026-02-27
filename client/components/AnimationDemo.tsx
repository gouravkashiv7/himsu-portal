"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const AnimationDemo = () => {
  const gsapBoxRef = useRef(null);

  useEffect(() => {
    // GSAP Animation
    gsap.to(gsapBoxRef.current, {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-12 bg-zinc-950 text-white min-h-100 rounded-3xl border border-zinc-800">
      <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Animation Libraries Ready
      </h2>

      <div className="flex gap-20 items-center">
        {/* Framer Motion Demo */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-mono text-zinc-400">Framer Motion</p>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              borderRadius: ["20%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          />
        </div>

        {/* GSAP Demo */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-mono text-zinc-400">GSAP</p>
          <div
            ref={gsapBoxRef}
            className="w-24 h-24 bg-purple-600 shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center font-bold text-2xl"
          >
            G
          </div>
        </div>
      </div>

      <p className="text-zinc-500 text-center max-w-md">
        Both libraries have been successfully installed and are ready to be used
        to create a premium, interactive experience.
      </p>
    </div>
  );
};

export default AnimationDemo;
