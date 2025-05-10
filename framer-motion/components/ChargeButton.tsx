"use client";

import { motion, useAnimation } from "framer-motion";
import { Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChargeButton() {
  const chargeControls = useAnimation();
  const [isHolding, setIsHolding] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chargeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    setIsHolding(true);
    setChargeLevel(0); 

    chargeIntervalRef.current = setInterval(() => {
      setChargeLevel(prev => Math.min(prev + 10, 100));
    }, 100);

    holdTimeoutRef.current = setTimeout(() => {
      if (isHolding) { 
        chargeControls.start({
          scale: [1, 1.2, 1], // Slightly reduced scale effect
          transition: { duration: 0.4, times: [0, 0.5, 1] }
        });
        console.log("Held!");
      }
      if (chargeIntervalRef.current) clearInterval(chargeIntervalRef.current);
    }, 1000); 
  };

  const handlePointerUpOrLeave = () => {
    setIsHolding(false);
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (chargeIntervalRef.current) {
      clearInterval(chargeIntervalRef.current);
      chargeIntervalRef.current = null;
    }
    chargeControls.start({
      scale: 1,
      transition: { duration: 0.2 }
    });
    if (chargeLevel < 100) {
        setChargeLevel(0);
    }
  };

  return (
    <motion.div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave} 
      animate={chargeControls}
      style={{
        width: 100, // Adjusted size to better fit card
        height: 100,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'grab',
        textAlign: 'center',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden', // Ensure overlay is contained
      }}
      className="bg-gradient-to-br from-accent to-primary text-primary-foreground shadow-md"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-primary/70"
        initial={{height: '0%'}}
        animate={{height: `${chargeLevel}%`}}
        transition={{duration: 0.1, ease: "linear"}}
        style={{ borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%' }} // Ensure overlay matches parent curve
      />
      <div style={{position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Zap size={24}/> {/* Adjusted icon size */}
        <div className="text-sm">Hold Me!</div>
        <div style={{fontSize: '0.6rem', marginTop: '3px'}}>Charge: {chargeLevel}%</div>
      </div>
    </motion.div>
  );
}
