"use client";

import { motion, AnimationControls } from "framer-motion";

interface RotationBoxProps {
  controls: AnimationControls;
}

export default function RotationBox({ controls }: RotationBoxProps) {
  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        borderRadius: 10, // Consider using theme border radius if available, e.g. via `rounded-lg`
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="bg-gradient-to-br from-primary to-secondary text-primary-foreground p-4 rounded-lg shadow-md" // Using theme colors for gradient
      variants={{
        initial: { scale: 0.5, opacity: 0, rotate: 0 },
        animate: { scale: 1, opacity: 1 },
      }}
      initial="initial"
      animate={controls}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
    >
      Box
    </motion.div>
  );
}
