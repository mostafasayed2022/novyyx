"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-brand via-brand-glow to-cyan-400 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
