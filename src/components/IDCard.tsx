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
            {/* SUPER LONG LANYARD - Extends from sky (above viewport) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-6 flex flex-col items-center" style={{ height: '400px' }}>
                {/* Long strap going up into the sky */}
                <div className="w-3 flex-1 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 rounded-t-full">
                    {/* Grey accent lines */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-zinc-400/50 via-zinc-500/30 to-transparent" />
                </div>
            </div>

            {/* Card container with origin at top for pendulum */}
            <div className="flex flex-col items-center origin-top">
                {/* Connector clip - Grey metallic */}
                <div className="w-8 h-6 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-lg shadow-lg mb-[-2px] z-10 flex items-center justify-center">
                    <div className="w-4 h-2 bg-zinc-400 rounded-full" />
                </div>

                {/* Short visible strap */}
                <div className="w-3 h-8 bg-gradient-to-b from-zinc-800 to-zinc-900 mb-[-2px]" />

                {/* Tag Badge - Black/Grey */}
                <motion.div
                    className="px-5 py-2.5 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 rounded-xl flex items-center justify-center shadow-2xl border border-zinc-600 cursor-pointer mb-2 z-10"
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-xs text-zinc-300 tracking-[0.25em] font-mono font-bold">LABS</span>
                </motion.div>

                {/* Connector to card - Grey */}
                <div className="w-10 h-4 bg-gradient-to-b from-zinc-500 to-zinc-600 rounded-b-xl shadow-md flex items-center justify-center mb-[-8px] z-10">
                    <div className="w-5 h-1.5 bg-zinc-400 rounded-full" />
                </div>

                {/* Card - Black/Grey Dual Tone */}
                <motion.div
                    ref={cardRef}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="w-[280px] bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-850 dark:to-zinc-900 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-700 overflow-hidden relative"
                >
                    {/* Card Header - Dark grey gradient */}
                    <div className="h-28 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,_#666_1px,_transparent_0)] bg-[size:8px_8px]" />
                        {/* Grey accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
                        <div className="text-zinc-200 font-bold tracking-widest text-lg z-10 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/40" />
                            ENGINEER
                        </div>
                    </div>

                    {/* Photo Container */}
                    <div className="relative flex justify-center" style={{ marginTop: "-48px" }}>
                        <div className="w-24 h-24 bg-gradient-to-br from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 rounded-xl p-1 shadow-xl rotate-3 overflow-hidden border-2 border-zinc-400 dark:border-zinc-500">
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
                        <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight mb-1">
                            Madhu Goutham Reddy Ambati
                        </h2>
                        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide uppercase mb-4">
                            Senior Data Scientist
                        </div>

                        <div className="flex justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-4">
                            <span>ID: 1212</span>
                            <span>EXP: 6+ YRS</span>
                        </div>

                        {/* Barcode - Grey tones */}
                        <div className="h-6 w-full flex justify-center gap-[2px] opacity-40">
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-zinc-800 dark:bg-zinc-400"
                                    style={{ width: "2px", height: `${25 + Math.random() * 75}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
