"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function DraggableSquare() {
  const constraintsRef = useRef(null);
  const gridSize = 50; 

  return (
    <div className="w-full max-w-md p-4 mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Draggable Square with Grid Snap</h3>
      <motion.div
        ref={constraintsRef}
        className="w-full h-64 bg-gray-800 rounded-lg relative overflow-hidden flex justify-center items-center border-2 border-dashed border-gray-700"
      >
        <p className="absolute top-2 left-2 text-xs text-gray-500">Drag within this box</p>
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragSnapToOrigin={false} 
          dragElastic={0.1} 
          dragTransition={{
            power: 0, 
            modifyTarget: target => Math.round(target / gridSize) * gridSize
          }}
          whileTap={{ cursor: "grabbing", scale: 1.1 }}
          className="w-20 h-20 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-md shadow-lg cursor-grab flex justify-center items-center"
        >
          <span className="text-sm font-medium text-white">Drag Me</span>
        </motion.div>
      </motion.div>
      <p className="text-xs text-gray-500 mt-2 text-center">Snaps to a {gridSize}px grid.</p>
    </div>
  );
}
