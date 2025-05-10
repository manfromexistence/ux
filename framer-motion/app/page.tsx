"use client";

import { motion, useAnimation, AnimationControls } from "framer-motion"; // Added AnimationControls
import { Replace } from "lucide-react";
import { useState } from "react";

// Import new components
import RotationBox from "../components/RotationBox";
import ChargeButton from "../components/ChargeButton";
import AnimatedList from "../components/AnimatedList";
import DraggableSquare from "../components/DraggableSquare";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [isRotated, setIsRotated] = useState(false);
  const boxControls: AnimationControls = useAnimation(); // Explicitly typed

  const handleButtonClick = () => {
    setIsRotated(!isRotated);
    boxControls.start({
      rotate: isRotated ? 0 : 405,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    });
  };

  const examples = [
    {
      title: "Rotation Box",
      component: <RotationBox controls={boxControls} />,
      action: (
        <Button onClick={handleButtonClick} variant="secondary" size="lg">
          <Replace size={20} className="mr-2 h-4 w-4" />
          Toggle Rotation
        </Button>
      ),
      id: "rotation-box"
    },
    {
      title: "Charge Button",
      component: <ChargeButton />,
      id: "charge-button"
    },
    {
      title: "Animated List",
      component: <AnimatedList />,
      id: "animated-list"
    },
    {
      title: "Draggable Square",
      component: <DraggableSquare />,
      id: "draggable-square"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center gap-8 p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1, color: 'hsl(var(--primary))' }}
        whileTap={{ scale: 0.9 }}
        style={{ cursor: 'pointer' }}
        className="text-3xl md:text-4xl font-bold my-4 md:my-8 text-center" // Reduced margin a bit
      >
        Learning Framer Motion with Shadcn/UI
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"> {/* Increased max-w */}
        {examples.map((example) => (
          <Card key={example.id} className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-xl">{example.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 min-h-[250px] p-6"> {/* Adjusted min-h and padding */}
              {example.component}
              {example.action && <div className="mt-auto pt-4">{example.action}</div>} {/* Pushed action to bottom */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
