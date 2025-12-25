"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";

const BASE_PATH = "/portfolios";

export default function IDCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    // Motion values for interaction
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth "hanging" feel
    const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), {
        stiffness: 150,
        damping: 20,
        mass: 1.5,
    });

    const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), {
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
            className="perspective-1000 relative z-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Lanyard String */}
            <div className="absolute -top-[20rem] left-1/2 -translate-x-1/2 w-4 h-[20rem] bg-zinc-900 border-x border-zinc-800 origin-bottom flex flex-col items-center justify-end z-[-1]">
                {/* Tag on lanyard */}
                <div className="absolute bottom-32 w-8 h-12 bg-zinc-800 rounded flex items-center justify-center hover:bg-zinc-700 hover:scale-110 transition-all cursor-pointer">
                    <span className="text-[10px] text-zinc-500 rotate-90 tracking-widest font-mono">LABS</span>
                </div>
                {/* Clip */}
                <div className="w-8 h-8 border-4 border-zinc-800 rounded-lg mb-[-20px] bg-zinc-900" />
            </div>

            <motion.div
                ref={cardRef}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-[300px] h-[450px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative"
            >
                {/* Card Header */}
                <div className="h-32 bg-zinc-950 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,_#333_1px,_transparent_0)] bg-[size:16px_16px]" />
                    <div className="text-white font-bold tracking-widest text-xl z-10 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        ENGINEER
                    </div>
                </div>

                {/* Photo Container */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-white dark:bg-zinc-900 rounded-xl p-1 shadow-lg rotate-3 overflow-hidden z-20">
                    <Image
                        src={`${BASE_PATH}/profile.jpg`}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-lg bg-zinc-100"
                        priority
                    />
                </div>

                {/* Info */}
                <div className="pt-64 pb-8 px-6 text-center space-y-2 relative z-10">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Madhu Goutham
                    </h2>
                    <div className="text-sm font-medium text-zinc-500 tracking-wide uppercase">
                        Senior Data Scientist
                    </div>

                    <div className="pt-6 flex justify-center gap-4">
                        <div className="text-xs text-zinc-400 font-mono">
                            ID: 8492-42
                        </div>
                        <div className="text-xs text-zinc-400 font-mono">
                            EXP: 6+ YRS
                        </div>
                    </div>

                    <div className="pt-6 w-full flex justify-center">
                        {/* Barcode simulation */}
                        <div className="h-8 w-4/5 flex justify-between items-end opacity-50">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={`bg-zinc-900 dark:bg-zinc-100 w-[2px]`} style={{ height: Math.random() * 100 + "%" }} />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
