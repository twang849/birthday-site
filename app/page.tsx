"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react";

const balloonColors = [
  "#f87171", // red
  "#fbbf24", // yellow
  "#34d399", // green
  "#60a5fa", // blue
  "#a78bfa", // purple
  "#f472b6", // pink
  "#facc15", // gold
];

const balloons = [
  { left: "10%", delay: 0, color: balloonColors[0] },
  { left: "30%", delay: 0.5, color: balloonColors[1] },
  { left: "50%", delay: 1, color: balloonColors[2] },
  { left: "70%", delay: 1.5, color: balloonColors[3] },
  { left: "85%", delay: 0.8, color: balloonColors[4] },
];

function Balloon({ left, delay, color }: { left: string; delay: number; color: string }) {
  return (
    <motion.div
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: [400, -50, -30, -50], opacity: 1 }}
      transition={{
        duration: 2.5,
        delay,
        type: "tween",
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{ left }}
      className="absolute bottom-0"
    >
      <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
        <ellipse cx="30" cy="40" rx="28" ry="35" fill={color} />
        <path d="M30 75 Q32 90 30 100 Q28 90 30 75" stroke="#555" strokeWidth="2" fill="none" />
      </svg>
    </motion.div>
  );
}

function Confetti() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  // Simple confetti using motion.divs
  const confetti = Array.from({ length: 30 });
  return (
    <div>
      {confetti.map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 20 + 5}%`,
            background: ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"][i % 5],
          }}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: [400, 420, 400], opacity: [1, 0.7, 1] }}
          transition={{
            duration: 2.5 + Math.random(),
            delay: Math.random() * 1.5,
            type: "tween", // changed from spring to tween
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  // Use fixed pixel values for fireworks positions for consistent placement
  const fireworkPositions = [
    { top: "10%", left: "20%" },
    { top: "30%", left: "70%" },
    { top: "60%", left: "40%" },
    { top: "80%", left: "80%" },
    { top: "50%", left: "10%" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-green-500 overflow-hidden">
      {/* Confetti */}
      <Confetti />
      {/* Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((b, i) => (
          <Balloon key={i} left={b.left} delay={b.delay} color={b.color} />
        ))}
      </div>
      {/* Main Message */}
      <motion.h1
        initial={false}
        animate="show"
        variants={{}}
        className="z-10 text-5xl md:text-9xl font-extrabold drop-shadow-lg text-center mt-20 flex flex-wrap justify-center"
      >
        {(() => {
          const text = "Happy 23rd Birthday";
          const colors = [
            "text-red-500",
            "text-orange-500",
            "text-yellow-400",
            "text-green-600",
            "text-blue-500",
            "text-indigo-500",
            "text-violet-500",
          ];
          return text.split("").map((char, i) => {
            if (char === " ") return <span key={i}>&nbsp;</span>;
            const color = colors[i % colors.length];
            return (
              <motion.span
                key={i}
                className={color}
                initial={{ y: -80, scale: 0.5, opacity: 0 }}
                animate={{ y: 0, scale: 1.2, opacity: 1 }}
                whileHover={{ scale: 1.4 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 12,
                  delay: 0.2 + i * 0.08,
                  scale: { type: "tween", duration: 0.4, ease: "easeInOut" },
                }}
              >
                {char}
              </motion.span>
            );
          });
        })()}
      </motion.h1>
      <motion.span
        className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, type: "tween" }}
      >
        Tian Tian!
      </motion.span>
      <motion.span
        className="font-black text-1xl lg:text-3xl text-black font-normal mb-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8, type: "tween" }}
      >
        - from Tony
      </motion.span>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="z-10 text-xl md:text-2xl text-gray-700 mt-6 text-center"
      >
      </motion.p>
    </div>
  );
}
