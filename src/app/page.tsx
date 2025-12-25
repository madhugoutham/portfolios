"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import IDCard from "@/components/IDCard";

// ============== CONSTANTS ==============
const BASE_PATH = "/portfolios";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/madhu-goutham-reddy-ambati-257241232", icon: "linkedin" },
  { name: "GitHub", href: "https://github.com/madhugoutham", icon: "github" },
  { name: "Email", href: "mailto:madhuambati9999@gmail.com", icon: "email" },
];

const experiences = [
  {
    company: "KeyBank",
    role: "Senior Data Scientist",
    period: "2024 — Present",
    description: "Leading fraud detection ML initiatives, reducing false positives to 2%",
  },
  {
    company: "Northern Illinois University",
    role: "Data Scientist (GRA)",
    period: "2023 — 2024",
    description: "Published research on environmental AI, won 3rd prize at IIN 2024",
  },
  {
    company: "TCS / Experian",
    role: "Data Scientist",
    period: "2021 — 2023",
    description: "Built fraud scoring system saving $2.3M annually",
  },
  {
    company: "Stanley Black & Decker",
    role: "Data Scientist",
    period: "2019 — 2021",
    description: "Developed marketing prediction models with 85% accuracy",
  },
];

const projects = [
  {
    id: "fraud-detection",
    title: "Multi-Agent Fraud Detection",
    description: "Real-time ensemble model processing 250K+ daily transactions with 95% accuracy",
    category: "Production ML",
  },
  {
    id: "rag-credit",
    title: "RAG-Enhanced Credit Risk",
    description: "LLM-powered document analysis reducing review time from 4 hours to 3 seconds",
    category: "GenAI / LLM",
  },
  {
    id: "environmental-ai",
    title: "AI-Driven Environmental Mapping",
    description: "Award-winning U-Net++ model for satellite imagery with 93.6% F1-score",
    category: "Computer Vision",
  },
  {
    id: "real-time-scoring",
    title: "Real-Time Fraud Scoring at Scale",
    description: "50M monthly events with 99ms latency at Experian",
    category: "Streaming ML",
  },
];

const stats = [
  { value: "$2.3M", label: "Annual Savings" },
  { value: "50M+", label: "Events Processed" },
  { value: "38%", label: "Fraud Reduction" },
  { value: "93.6%", label: "F1-Score" },
];

const research = [
  {
    title: "Surface Water Detection using U-Net++ with Attention Mechanism",
    venue: "IAHS Scientific Assembly",
    year: "2024",
    link: "#"
  },
  {
    title: "AI-Driven Environmental Mapping for Sustainability",
    venue: "IIN Sustainability Conference (3rd Prize)",
    year: "2024",
    link: "#"
  }
];

// ============== HOOKS ==============

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };
  return { theme, toggleTheme };
}

// ============== ICONS ==============

function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    linkedin: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    github: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
    email: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    arrow: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    download: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  };
  return <>{icons[name]}</>;
}

// ============== COMPONENTS ==============

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="theme-toggle" aria-label="Toggle theme">
      {theme === "dark" ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

// Scroll reveal wrapper
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ============== MAIN PAGE ==============

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md">
        <div className="container-narrow flex items-center justify-between h-14">
          <span className="text-sm font-medium">Madhu Goutham</span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <div className="container-narrow pt-32 pb-24">
        {/* ===== HERO ===== */}
        <section className="mb-32 min-h-[80vh] flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8 md:gap-12">
          <div className="flex-1 md:pt-16 min-w-0">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Open to opportunities</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="hero-name mb-8">
                Senior Data Scientist<br />
                <span className="text-[var(--foreground-muted)]">building ML systems</span><br />
                <span className="text-[var(--foreground-muted)]">that work.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="body-text mb-8">
                6+ years deploying ML at scale. Currently at KeyBank,
                previously Experian. Specialized in fraud detection, real-time scoring, and GenAI.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center gap-4">
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn bg-[var(--foreground)] text-[var(--background)] border-transparent hover:opacity-90">
                  Schedule a Call
                </a>
                <div className="flex gap-4 px-4 border-l border-[var(--border)]">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="social-icon hover:scale-110 transition-transform"
                      aria-label={link.name}
                    >
                      <Icon name={link.icon} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="hidden md:block pt-12 flex-shrink-0">
              <IDCard />
            </div>
            {/* Mobile Fallback */}
            <div className="block md:hidden w-40 h-40 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 rotate-3 mx-auto">
              <Image
                src={`${BASE_PATH}/profile.jpg`}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </section>

        {/* ===== RESEARCH ===== */}
        <section className="mb-32">
          <Reveal>
            <p className="section-label">Research</p>
          </Reveal>
          <div className="space-y-6">
            {research.map((paper, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <a href={paper.link} className="block group">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-lg font-medium group-hover:underline decoration-zinc-400 underline-offset-4 transition-all">
                      {paper.title}
                    </h3>
                    <span className="text-sm font-mono text-[var(--foreground-muted)] flex-shrink-0">{paper.year}</span>
                  </div>
                  <p className="text-sm text-[var(--foreground-muted)] mt-1 group-hover:text-[var(--foreground-secondary)] transition-colors">
                    {paper.venue}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="mb-32">
          <Reveal>
            <p className="section-label">Impact</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div>
                  <div className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--foreground-muted)]">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section className="mb-32">
          <Reveal>
            <p className="section-label">Experience</p>
          </Reveal>
          <div>
            {experiences.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 0.05}>
                <div className="experience-item group">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-medium">{exp.role}</span>
                      <span className="text-[var(--foreground-muted)]">·</span>
                      <span className="text-[var(--foreground-muted)]">{exp.company}</span>
                    </div>
                    <p className="text-sm text-[var(--foreground-muted)] group-hover:text-[var(--foreground-secondary)] transition-colors">
                      {exp.description}
                    </p>
                  </div>
                  <span className="text-sm text-[var(--foreground-muted)] whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section className="mb-32">
          <Reveal>
            <p className="section-label">Projects</p>
          </Reveal>
          <div>
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.05}>
                <Link href={`/projects/${project.id}`} className="project-card group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-medium group-hover:underline">{project.title}</span>
                        <span className="badge">{project.category}</span>
                      </div>
                      <p className="text-sm text-[var(--foreground-muted)] group-hover:text-[var(--foreground-secondary)] transition-colors">
                        {project.description}
                      </p>
                    </div>
                    <Icon name="arrow" className="w-4 h-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section>
          <Reveal>
            <p className="section-label">Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text mb-6">
              Open to new opportunities and collaborations.
              Feel free to reach out directly.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="mailto:madhuambati9999@gmail.com"
              className="link text-lg font-medium"
            >
              madhuambati9999@gmail.com
            </a>
          </Reveal>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="container-narrow py-6 flex items-center justify-between">
          <span className="text-sm text-[var(--foreground-muted)]">
            © {new Date().getFullYear()} Madhu Goutham
          </span>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label={link.name}
              >
                <Icon name={link.icon} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
