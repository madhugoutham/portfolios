"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const BASE_PATH = "/portfolios";

export default function IDCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion values for interaction
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth "hanging" feel
    const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), {
        stiffness: 150,
        damping: 20,
        mass: 1.5,
    });

    const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), {
        stiffness: 150,
        damping: 20,
        mass: 1.5,
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
        <div
            className="flex flex-col items-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
        >
            {/* Lanyard with Tag - INSIDE NORMAL FLOW */}
            <div className="flex flex-col items-center mb-[-20px] z-10">
                {/* Tag - Horizontal text for visibility */}
                <div className="px-3 py-2 bg-zinc-800 rounded-lg flex items-center justify-center mb-2 hover:bg-zinc-700 hover:scale-105 transition-all cursor-pointer shadow-lg border border-zinc-700">
                    <span className="text-[10px] text-zinc-300 tracking-widest font-mono font-bold">LABS</span>
                </div>
                {/* Lanyard Strap */}
                <div className="w-3 h-16 bg-zinc-900 rounded-sm" />
                {/* Clip */}
                <div className="w-8 h-6 border-4 border-zinc-700 bg-zinc-800 rounded-md" />
            </div>

            {/* Card */}
            <motion.div
                ref={cardRef}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-[280px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative"
            >
                {/* Card Header */}
                <div className="h-28 bg-zinc-950 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,_#444_1px,_transparent_0)] bg-[size:12px_12px]" />
                    <div className="text-white font-bold tracking-widest text-lg z-10 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        ENGINEER
                    </div>
                </div>

                {/* Photo Container - Overlapping Header */}
                <div className="relative flex justify-center" style={{ marginTop: "-48px" }}>
                    <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-xl p-1 shadow-xl rotate-3 overflow-hidden border-4 border-white dark:border-zinc-800">
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

                {/* Info */}
                <div className="pt-4 pb-6 px-6 text-center">
                    <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight mb-1">
                        Madhu Goutham Reddy Ambati
                    </h2>
                    <div className="text-xs font-medium text-zinc-500 tracking-wide uppercase mb-4">
                        Senior Data Scientist
                    </div>

                    <div className="flex justify-center gap-6 text-xs text-zinc-400 font-mono mb-4">
                        <span>ID: 8492-42</span>
                        <span>EXP: 6+ YRS</span>
                    </div>

                    {/* Barcode */}
                    <div className="h-6 w-full flex justify-center gap-[2px] opacity-40">
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-zinc-900 dark:bg-zinc-100"
                                style={{ width: "2px", height: `${20 + Math.random() * 80}%` }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
