"use client";

import { motion } from "framer-motion";

const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const items = ["Item 1", "Item 2", "Item 3"];

export default function AnimatedList() {
  return (
    <motion.ul
      style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem' }}
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((text, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="p-2 bg-white/10 rounded-md"
        >
          {text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
