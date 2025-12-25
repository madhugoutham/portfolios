"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const BASE_PATH = "/portfolios";
const COPPER = "#a83b00";

export default function IDCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth "hanging" feel
  const rotateX = useSpring(useTransform(y, [-100, 100], [4, -4]), {
    stiffness: 100,
    damping: 12,
    mass: 0.8,
  });

  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), {
    stiffness: 100,
    damping: 12,
    mass: 0.8,
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      // Dramatic drop from sky
      initial={{ y: -600, rotate: -30, opacity: 0 }}
      animate={{
        y: 0,
        rotate: [null, 25, -18, 12, -7, 4, 0],
        opacity: 1
      }}
      transition={{
        y: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 3, ease: "easeOut", times: [0, 0.12, 0.28, 0.45, 0.65, 0.82, 1] },
        opacity: { duration: 0.5 }
      }}
    >
      {/* SUPER LONG LANYARD - Extends from sky */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-6 flex flex-col items-center" style={{ height: '400px' }}>
        <div className="w-3 flex-1 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 rounded-t-full">
          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-zinc-400/50 via-zinc-500/30 to-transparent" />
        </div>
      </div>

      {/* Card container */}
      <div className="flex flex-col items-center origin-top">
        {/* Connector clip - Grey metallic */}
        <div className="w-8 h-6 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-lg shadow-lg mb-[-2px] z-10 flex items-center justify-center">
          <div className="w-4 h-2 bg-zinc-400 rounded-full" />
        </div>

        {/* Short visible strap */}
        <div className="w-3 h-8 bg-gradient-to-b from-zinc-800 to-zinc-900 mb-[-2px]" />

        {/* Tag Badge - AMGR with copper accent */}
        <motion.div
          className="px-5 py-2.5 rounded-xl flex items-center justify-center shadow-2xl cursor-pointer mb-2 z-10"
          style={{
            background: `linear-gradient(135deg, #3f3f46 0%, #27272a 50%, #18181b 100%)`,
            border: `1px solid ${COPPER}40`
          }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs tracking-[0.25em] font-mono font-bold" style={{ color: COPPER }}>AMGR</span>
        </motion.div>

        {/* Connector to card */}
        <div className="w-10 h-4 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-b-xl shadow-md flex items-center justify-center mb-[-8px] z-10">
          <div className="w-5 h-1.5 bg-zinc-400 rounded-full" />
        </div>

        {/* VERTICAL ID Card - Deep grey shining look */}
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-[300px] rounded-xl shadow-2xl overflow-hidden relative"
        >
          {/* Shiny gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(145deg, #404040 0%, #2a2a2a 25%, #1a1a1a 50%, #252525 75%, #333333 100%)'
            }}
          />

          {/* Shine overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 40%, transparent 60%)'
            }}
          />

          {/* Card Header with copper accent */}
          <div className="relative h-24 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,_#555_0.5px,_transparent_0)] bg-[size:6px_6px]" />
            {/* Copper accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${COPPER}, transparent)` }} />
            <div className="font-bold tracking-widest text-base z-10 flex items-center gap-2" style={{ color: '#e4e4e7' }}>
              <span className="w-2 h-2 rounded-full animate-pulse shadow-lg" style={{ backgroundColor: COPPER, boxShadow: `0 0 10px ${COPPER}80` }} />
              ENGINEER
            </div>
          </div>

          {/* Photo Container */}
          <div className="relative flex justify-center" style={{ marginTop: "-36px" }}>
            <div
              className="w-24 h-24 rounded-xl p-1 shadow-xl rotate-2 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3a3a3a, #2a2a2a)',
                border: `2px solid ${COPPER}60`
              }}
            >
              <Image
                src={`${BASE_PATH}/profile.jpg`}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Info with copper text */}
          <div className="relative pt-4 pb-6 px-6 text-center">
            <h2 className="text-lg font-bold tracking-tight leading-tight mb-1" style={{ color: '#fafafa' }}>
              Madhu Goutham Reddy Ambati
            </h2>
            <div className="text-xs font-semibold tracking-wide uppercase mb-4" style={{ color: COPPER }}>
              Senior Data Scientist
            </div>

            <div className="flex justify-center gap-6 text-xs font-mono font-semibold mb-4" style={{ color: '#a1a1aa' }}>
              <span>ID: 1212</span>
              <span>EXP: 6+ YRS</span>
            </div>

            {/* Barcode with copper tint */}
            <div className="h-6 w-full flex justify-center gap-[2px] opacity-50">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "2px",
                    height: `${25 + Math.random() * 75}%`,
                    backgroundColor: i % 5 === 0 ? COPPER : '#71717a'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom copper accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${COPPER}60, transparent)` }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
