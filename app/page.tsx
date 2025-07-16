"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react";

const balloons = [
  { left: "10%", delay: 0 },
  { left: "30%", delay: 0.5 },
  { left: "50%", delay: 1 },
  { left: "70%", delay: 1.5 },
  { left: "85%", delay: 0.8 },
];

function Balloon({ left, delay }: { left: string; delay: number }) {
  return (
    <motion.div
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: [400, -50, -30, -50], opacity: 1 }}
      transition={{
        duration: 2.5,
        delay,
        type: "tween", // changed from spring to tween
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{ left }}
      className="absolute bottom-0"
    >
      <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
        <ellipse cx="30" cy="40" rx="28" ry="35" fill="#f87171" />
        <ellipse cx="30" cy="40" rx="18" ry="25" fill="#fbbf24" opacity="0.7" />
        <ellipse cx="30" cy="40" rx="10" ry="15" fill="#34d399" opacity="0.7" />
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

function Fireworks() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  // Simple fireworks: animate SVG bursts at random positions
  const fireworkColors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6", "#facc15"];
  const fireworks = Array.from({ length: 5 });
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {fireworks.map((_, i) => {
        const left = Math.random() * 80 + 10; // 10% to 90%
        const top = Math.random() * 40 + 5; // 5% to 45%
        const color = fireworkColors[i % fireworkColors.length];
        return (
          <motion.svg
            key={i}
            width="120"
            height="120"
            viewBox="0 0 120 120"
            style={{ position: "absolute", left: `${left}%`, top: `${top}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1.5] }}
            transition={{
              duration: 2.5 + Math.random(),
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            {[...Array(8)].map((_, j) => (
              <line
                key={j}
                x1="60"
                y1="60"
                x2={60 + 50 * Math.cos((j * Math.PI) / 4)}
                y2={60 + 50 * Math.sin((j * Math.PI) / 4)}
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            <circle cx="60" cy="60" r="10" fill={color} fillOpacity="0.7" />
          </motion.svg>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-yellow-100 overflow-hidden">
      {/* Fireworks */}
      <Fireworks />
      {/* Confetti */}
      <Confetti />
      {/* Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((b, i) => (
          <Balloon key={i} left={b.left} delay={b.delay} />
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
        className="text-9xl font-extrabold text-black mt-5"
        initial={{ color: "#000" }}
      >
        Tian Tian!
      </motion.span>
      <span className="font-black text-3xl text-black font-normal mb-5">
      - from Tony
      </span>
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
