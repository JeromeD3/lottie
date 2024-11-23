'use client'
import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

type Coordinates = {
  x: number;
  y: number;
};

const GradientMaskedImage: React.FC = () => {
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(true);

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const percentX = ((offsetX / rect.width) * 100).toFixed(2);
    const percentY = ((offsetY / rect.height) * 100).toFixed(2);

    setCoords({ x: parseFloat(percentX), y: parseFloat(percentY) });
  };

  const handleMouseOut = () => {
    setIsVisible(false);
  };

  const container = "relative m-auto w-[350px] h-[500px] rounded-3xl transition-all z-3"
  const img = `absolute inset-0 rounded-3xl bg-no-repeat bg-cover bg-center bg-[url('https://oss.aiyuzhou8.com/2023/05/08-.jpg')]`

  return (
    <div className={container} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
      {isVisible && (
        <div className={img}
          style={{ maskImage: `radial-gradient(circle at ${coords.x}% ${coords.y}%, #000, #000, transparent, transparent, transparent)` }}
        >
        </div>
      )}
    </div>
  );
};


export default function HoverPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background flex-col gap-8">
      <motion.h1 
        className="text-7xl font-bold text-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        hover 下方
      </motion.h1>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="p-4 hover:shadow-xl transition-shadow">
          <GradientMaskedImage />
        </Card>
      </motion.div>
    </div>
  )
}
