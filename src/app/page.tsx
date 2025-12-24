"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

// ============== CONSTANTS ==============
const BASE_PATH = "/portfolios";

const navLinks = [
  { id: "about", label: "About" },
  { id: "impact", label: "Impact" },
  { id: "methodology", label: "Approach" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/madhu-goutham-reddy-ambati-257241232", icon: "linkedin" },
  { name: "GitHub", href: "https://github.com/madhugoutham", icon: "github" },
  { name: "Email", href: "mailto:madhuambati9999@gmail.com", icon: "email" },
];

// Impact metrics with context
const impactMetrics = [
  {
    value: 2.3, prefix: "$", suffix: "M", label: "Annual Savings",
    context: "Fraud losses prevented at Experian through ensemble ML models",
    icon: "💰"
  },
  {
    value: 50, suffix: "M", label: "Events/Month",
    context: "Real-time transaction scoring with 99ms latency",
    icon: "⚡"
  },
  {
    value: 38, suffix: "%", label: "Fraud Reduction",
    context: "YoY improvement through iterative model optimization",
    icon: "🛡️"
  },
  {
    value: 93.6, suffix: "%", label: "F1-Score",
    context: "Award-winning U-Net++ model for satellite imagery",
    icon: "🎯"
  },
];

// Methodology steps
const methodologySteps = [
  {
    step: "01",
    title: "Problem Definition",
    description: "Deep dive into business context. What's the real problem? Who's affected? What does success look like?",
    icon: "🔍"
  },
  {
    step: "02",
    title: "Data Exploration",
    description: "Understand signal vs. noise. EDA, feature importance, data quality assessment, and bias detection.",
    icon: "📊"
  },
  {
    step: "03",
    title: "Baseline First",
    description: "Start simple with heuristics or basic models. Establish benchmarks before complex approaches.",
    icon: "📈"
  },
  {
    step: "04",
    title: "Production-Ready",
    description: "Monitoring, logging, drift detection. A model in a notebook isn't a model in production.",
    icon: "🚀"
  },
  {
    step: "05",
    title: "Continuous Improvement",
    description: "A/B testing, model updates, feedback loops. ML is never 'done'.",
    icon: "🔄"
  },
];

// Experience with detailed descriptions
const experiences = [
  {
    company: "KeyBank",
    role: "Senior Data Scientist",
    period: "Nov 2024 — Present",
    location: "Remote, USA",
    description: "Leading fraud detection ML initiatives by architecting ensemble models with PyTorch and XGBoost. Reduced false positives from 5% to 2%, improving customer experience and reducing false declines by 40%. Built real-time feature store processing 100K+ daily transactions with sub-100ms latency.",
    achievements: ["5% → 2% false positives", "0.85 AUC loan model", "Lead 5-person team"],
    technologies: ["PyTorch", "XGBoost", "AWS SageMaker", "Kubernetes", "Redis"],
  },
  {
    company: "Northern Illinois University",
    role: "Data Scientist (GRA)",
    period: "Aug 2023 — Oct 2024",
    location: "Illinois, USA",
    description: "Published peer-reviewed research on environmental AI. Developed U-Net++ CNN achieving 93.6% F1-score for surface water detection from Sentinel-2 satellite imagery. Created USS-Water dataset now used by 10+ research groups. Won 3rd prize at IIN 2024 Sustainability Conference.",
    achievements: ["93.6% F1-Score", "Published in IAHS", "3rd Prize IIN 2024"],
    technologies: ["PyTorch", "TensorFlow", "Google Earth Engine", "GeoPandas"],
  },
  {
    company: "TCS / Experian",
    role: "Data Scientist",
    period: "May 2021 — Jul 2023",
    location: "India",
    description: "Built production fraud scoring system processing 50M monthly events with 99ms average latency. Designed ensemble architecture (XGBoost + LSTM + Rules) that reduced fraud losses by 38%, saving $2.3M annually. Implemented real-time feature engineering with Apache Kafka and Flink.",
    achievements: ["$2.3M saved annually", "38% fraud reduction", "99ms latency"],
    technologies: ["Python", "Apache Kafka", "Apache Flink", "TensorFlow", "AWS"],
  },
  {
    company: "Stanley Black & Decker",
    role: "Data Scientist",
    period: "Mar 2019 — Apr 2021",
    location: "India",
    description: "Developed marketing campaign prediction models achieving 85% accuracy, enabling data-driven budget allocation. Optimized ETL pipelines reducing processing time by 40%. Built executive dashboards tracking $50M+ marketing spend across 15 product lines.",
    achievements: ["85% prediction accuracy", "40% faster ETL", "$50M spend tracked"],
    technologies: ["Python", "SQL", "Tableau", "XGBoost", "Spark"],
  },
];

// Projects with detailed case study structure
const projects = [
  {
    id: "fraud-detection",
    title: "Multi-Agent Fraud Detection System",
    tagline: "Real-time ensemble model saving $2.1M annually",
    category: "Production ML",
    problem: "Legacy rule-based system had 15% false positive rate, causing customer friction and missed fraud.",
    approach: "Designed ensemble of XGBoost + LSTM + Rule-based models with voting mechanism. Implemented real-time feature engineering with Kafka streams.",
    techDecisions: [
      { decision: "Why ensemble?", reason: "Single models overfit to specific fraud patterns. Ensemble captures diverse attack vectors." },
      { decision: "Why Kafka?", reason: "Need sub-100ms latency for real-time scoring. Batch processing missed time-sensitive fraud." },
    ],
    results: ["95% accuracy", "45ms latency", "$2.1M saved", "2.1% false positives"],
    technologies: ["PyTorch", "XGBoost", "Kafka", "Redis", "AWS SageMaker"],
    github: "https://github.com/madhugoutham",
  },
  {
    id: "rag-credit",
    title: "RAG-Enhanced Credit Risk Assessment",
    tagline: "LLM-powered document analysis with 87% accuracy",
    category: "GenAI / LLM",
    problem: "Credit analysts spent 4+ hours per application reviewing unstructured financial documents manually.",
    approach: "Built RAG pipeline with GPT-4 and Pinecone vector DB. Chunked 15+ document types with semantic embeddings.",
    techDecisions: [
      { decision: "Why RAG over fine-tuning?", reason: "Regulatory compliance requires explainability. RAG provides source citations." },
      { decision: "Why Pinecone?", reason: "Managed vector DB with sub-50ms retrieval. No infra overhead." },
    ],
    results: ["87% accuracy", "3s processing", "75% time saved", "15+ doc types"],
    technologies: ["LangChain", "GPT-4", "Pinecone", "FastAPI", "AWS Bedrock"],
    github: "https://github.com/madhugoutham",
  },
  {
    id: "environmental-ai",
    title: "AI-Driven Environmental Mapping",
    tagline: "Award-winning satellite imagery analysis",
    category: "Computer Vision",
    problem: "Manual satellite analysis for flood risk was slow, inconsistent, and couldn't scale to climate monitoring needs.",
    approach: "Developed U-Net++ with attention gates for precise water segmentation. Created USS-Water dataset from Sentinel-2.",
    techDecisions: [
      { decision: "Why U-Net++?", reason: "Nested skip connections capture fine-grained boundaries better than vanilla U-Net." },
      { decision: "Why Sentinel-2?", reason: "Free, global coverage, 10m resolution. Ideal for large-scale environmental monitoring." },
    ],
    results: ["93.6% F1-Score", "0.92 AUC", "100K+ images", "3rd Prize IIN"],
    technologies: ["PyTorch", "U-Net++", "Google Earth Engine", "GeoPandas"],
    github: "https://github.com/madhugoutham",
  },
  {
    id: "real-time-scoring",
    title: "Real-Time Fraud Scoring at Scale",
    tagline: "50M monthly events with 99ms latency",
    category: "Streaming ML",
    problem: "Batch processing couldn't catch fraud in time. Transactions were approved before models could score them.",
    approach: "Built streaming pipeline with Apache Flink. Model quantization for low-latency inference. Feature store for real-time aggregations.",
    techDecisions: [
      { decision: "Why Flink over Spark Streaming?", reason: "True event-time processing with exactly-once semantics. Critical for financial accuracy." },
      { decision: "Why model quantization?", reason: "INT8 inference reduced latency by 60% with <1% accuracy loss." },
    ],
    results: ["50M events/month", "99ms latency", "38% fraud reduction", "$2.3M saved"],
    technologies: ["Python", "Apache Flink", "TensorFlow Serving", "Kubernetes"],
    github: "https://github.com/madhugoutham",
  },
];

// Skills with proficiency levels
const skillCategories = [
  {
    name: "ML/Deep Learning",
    icon: "🧠",
    skills: [
      { name: "PyTorch", level: "Expert", years: 4 },
      { name: "TensorFlow", level: "Expert", years: 5 },
      { name: "XGBoost", level: "Expert", years: 5 },
      { name: "Scikit-learn", level: "Expert", years: 6 },
    ]
  },
  {
    name: "LLM/GenAI",
    icon: "🤖",
    skills: [
      { name: "LangChain", level: "Advanced", years: 2 },
      { name: "GPT-4/Claude", level: "Advanced", years: 2 },
      { name: "RAG Systems", level: "Advanced", years: 2 },
      { name: "Prompt Engineering", level: "Expert", years: 2 },
    ]
  },
  {
    name: "Cloud/MLOps",
    icon: "☁️",
    skills: [
      { name: "AWS SageMaker", level: "Expert", years: 4 },
      { name: "Kubernetes", level: "Advanced", years: 3 },
      { name: "Docker", level: "Expert", years: 5 },
      { name: "Apache Kafka", level: "Advanced", years: 3 },
    ]
  },
  {
    name: "Data Engineering",
    icon: "🔧",
    skills: [
      { name: "Python", level: "Expert", years: 6 },
      { name: "SQL", level: "Expert", years: 6 },
      { name: "Apache Spark", level: "Advanced", years: 4 },
      { name: "Apache Flink", level: "Advanced", years: 2 },
    ]
  },
];

const certifications = [
  { name: "AWS Solutions Architect – Associate", issuer: "Amazon", year: 2024 },
  { name: "AWS Cloud Practitioner", issuer: "Amazon", year: 2023 },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: 2023 },
  { name: "MLOps Specialization", issuer: "DeepLearning.AI", year: 2024 },
  { name: "Generative AI with LLMs", issuer: "AWS", year: 2024 },
];

// ============== HOOKS ==============

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
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

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(target * (1 - Math.pow(1 - progress, 4)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return progress;
}

// ============== ICON COMPONENTS ==============

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    linkedin: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    github: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>,
    email: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    calendar: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    download: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    arrow: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    check: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>,
    external: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  };
  return <>{icons[name]}</>;
}

// ============== COMPONENTS ==============

function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-[var(--background-tertiary)] z-[100]">
      <div
        className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function MetricCard({ metric, index }: { metric: typeof impactMetrics[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const count = useCountUp(metric.value, 2000, isVisible);
  const [showContext, setShowContext] = useState(false);

  return (
    <div
      ref={ref}
      className="metric-card group relative cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setShowContext(true)}
      onMouseLeave={() => setShowContext(false)}
    >
      <div className="text-2xl mb-2">{metric.icon}</div>
      <div className="text-3xl sm:text-4xl font-bold text-[var(--accent)]">
        {metric.prefix}{count.toFixed(metric.value % 1 === 0 ? 0 : 1)}{metric.suffix}
      </div>
      <div className="text-sm text-[var(--foreground-secondary)] mt-2">{metric.label}</div>

      {/* Context tooltip */}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-xs text-center max-w-[200px] transition-all duration-200 ${showContext ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {metric.context}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--border)]" />
      </div>
    </div>
  );
}

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

function Sidebar({ activeSection, theme, onToggleTheme }: { activeSection: string; theme: string; onToggleTheme: () => void }) {
  return (
    <aside className="sidebar hidden lg:flex">
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--accent)]/30">
          <Image src={`${BASE_PATH}/profile.jpg`} alt="Madhu Goutham" width={56} height={56} className="w-full h-full object-cover object-top" priority />
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <div className="mb-4">
        <h1 className="text-lg font-bold">Madhu Goutham</h1>
        <p className="text-sm text-[var(--accent)]">Senior Data Scientist</p>
        <p className="text-xs text-[var(--foreground-muted)] mt-1">6+ years • 10+ ML systems • $2M+ impact</p>
      </div>

      <div className="status-badge mb-6">
        <span className="w-2 h-2 rounded-full bg-green-500 breathe" />
        <span>Open to opportunities</span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={`nav-link ${activeSection === link.id ? "active" : ""}`}>
                <span className={`w-1.5 h-1.5 rounded-full transition-all ${activeSection === link.id ? "bg-[var(--accent)]" : "bg-transparent"}`} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pt-4 border-t border-[var(--border)] space-y-3">
        <div className="flex gap-2">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--background-tertiary)] transition-all" aria-label={link.name}>
              <Icon name={link.icon} />
            </a>
          ))}
        </div>
        <a href={`${BASE_PATH}/resume.pdf`} download className="btn-secondary w-full justify-center text-sm">
          <Icon name="download" />
          Download Resume
        </a>
      </div>
    </aside>
  );
}

function MobileHeader({ theme, onToggleTheme }: { theme: string; onToggleTheme: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[var(--accent)]/30">
            <Image src={`${BASE_PATH}/profile.jpg`} alt="Madhu" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-bold text-sm block">Madhu Goutham</span>
            <span className="text-xs text-[var(--accent)]">Data Scientist</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="px-4 py-4 bg-[var(--background-secondary)] border-t border-[var(--border)]">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)] transition-all">{link.label}</a>
            ))}
          </div>
          <div className="pt-4 border-t border-[var(--border)] space-y-2">
            <a href={`${BASE_PATH}/resume.pdf`} download className="btn-secondary w-full justify-center">
              <Icon name="download" />
              Download Resume
            </a>
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
              <Icon name="calendar" />
              Schedule a Call
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const categoryColors: Record<string, string> = {
    "Production ML": "bg-blue-500/10 text-blue-400",
    "GenAI / LLM": "bg-purple-500/10 text-purple-400",
    "Computer Vision": "bg-green-500/10 text-green-400",
    "Streaming ML": "bg-orange-500/10 text-orange-400",
  };

  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <Link href={`/projects/${project.id}`} className="block group">
        <div className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] overflow-hidden hover:border-[var(--accent)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/5">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${categoryColors[project.category] || "bg-[var(--accent)]/10 text-[var(--accent)]"}`}>
                {project.category}
              </span>
              <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View Case Study
                <Icon name="arrow" />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
            <p className="text-sm text-[var(--foreground-secondary)] mb-4">{project.tagline}</p>

            <div className="mb-4">
              <p className="text-sm text-[var(--foreground-muted)] mb-2"><strong className="text-[var(--foreground-secondary)]">Problem:</strong> {project.problem}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.results.slice(0, 3).map((result) => (
                <span key={result} className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--accent)]/10 rounded text-xs text-[var(--accent)]">
                  <Icon name="check" />
                  {result}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function SkillCard({ category }: { category: typeof skillCategories[0] }) {
  const { ref, isVisible } = useScrollReveal();
  const levelColors: Record<string, string> = {
    "Expert": "bg-[var(--accent)]",
    "Advanced": "bg-[var(--accent)]/60",
    "Intermediate": "bg-[var(--accent)]/30",
  };

  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="font-bold">{category.name}</h3>
      </div>
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">{skill.name}</span>
              <span className="text-xs text-[var(--foreground-muted)]">{skill.years}y</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${levelColors[skill.level]} ${skill.level === "Expert" ? "text-white" : "text-[var(--foreground)]"}`}>
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== MAIN PAGE ==============

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");

  const handleScroll = useCallback(() => {
    const sections = navLinks.map((link) => document.getElementById(link.id));
    const scrollPosition = window.scrollY + 200;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(navLinks[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <ScrollProgress />
      <MobileHeader theme={theme} onToggleTheme={toggleTheme} />
      <Sidebar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

      <main className="main-content">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-20">

          {/* ===== HERO ===== */}
          <section id="about" className="min-h-[80vh] flex flex-col justify-center py-12">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 breathe" />
                Open to opportunities
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-4">
                I build ML systems that<br />
                <span className="text-[var(--accent)]">work in production.</span>
              </h1>
            </RevealSection>

            <RevealSection delay={0.15}>
              <p className="text-lg md:text-xl text-[var(--foreground-secondary)] font-medium mb-2">
                6+ years. 10+ ML systems. <span className="text-[var(--accent)]">$2M+</span> in measurable impact.
              </p>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-base text-[var(--foreground-muted)] mb-8 max-w-lg leading-relaxed">
                Senior Data Scientist specialized in fraud detection, real-time scoring, and GenAI.
                Currently at KeyBank, previously Experian.
              </p>
            </RevealSection>

            <RevealSection delay={0.25}>
              <div className="flex flex-wrap gap-3 mb-12">
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn-cta" aria-label="Schedule a call to discuss opportunities">
                  <Icon name="calendar" />
                  Schedule a Call
                </a>
                <a href="#projects" className="btn-secondary">
                  View Projects
                </a>
                <a href={`${BASE_PATH}/resume.pdf`} download className="btn-secondary">
                  <Icon name="download" />
                  Resume
                </a>
              </div>
            </RevealSection>

            {/* ABOUT NARRATIVE */}
            <RevealSection delay={0.3}>
              <div className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                <h2 className="text-lg font-bold mb-3">My Story</h2>
                <div className="text-[var(--foreground-secondary)] space-y-3 text-sm leading-relaxed">
                  <p>
                    I became obsessed with ML when I realized a single model could save companies millions.
                    At TCS/Experian, my fraud detection system caught <strong className="text-[var(--foreground)]">38% more fraud</strong> with
                    only <strong className="text-[var(--foreground)]">2% false positives</strong>—affecting real people&apos;s financial security.
                  </p>
                  <p>
                    That&apos;s where my passion comes from: <strong className="text-[var(--accent)]">building ML systems that work reliably at scale,
                      not just in notebooks.</strong> I care about latency, monitoring, and what happens when your model meets the real world.
                  </p>
                  <p>
                    When I&apos;m not building production ML, I&apos;m publishing research—my work on satellite image analysis
                    won 3rd prize at IIN 2024 and was published in IAHS.
                  </p>
                </div>
              </div>
            </RevealSection>
          </section>

          {/* ===== IMPACT ===== */}
          <section id="impact" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-black mb-2">Impact</h2>
              <p className="text-[var(--foreground-secondary)] mb-8">Measurable results, not just metrics. Hover for context.</p>
            </RevealSection>

            <div className="grid grid-cols-2 gap-4">
              {impactMetrics.map((metric, i) => (
                <MetricCard key={metric.label} metric={metric} index={i} />
              ))}
            </div>
          </section>

          {/* ===== METHODOLOGY ===== */}
          <section id="methodology" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-black mb-2">How I Build ML Systems</h2>
              <p className="text-[var(--foreground-secondary)] mb-8">My approach to production machine learning.</p>
            </RevealSection>

            <div className="space-y-4">
              {methodologySteps.map((step, i) => (
                <RevealSection key={step.step} delay={i * 0.1}>
                  <div className="flex gap-4 p-4 bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-lg">
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-[var(--accent)] font-mono">{step.step}</span>
                        <h3 className="font-bold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-[var(--foreground-secondary)]">{step.description}</p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </section>

          {/* ===== EXPERIENCE ===== */}
          <section id="experience" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-black mb-2">Experience</h2>
              <p className="text-[var(--foreground-secondary)] mb-8">Building at scale across industries.</p>
            </RevealSection>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <RevealSection key={index} delay={index * 0.1}>
                  <div className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{exp.role}</h3>
                        <p className="text-[var(--accent)]">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-[var(--foreground-muted)]">
                        <div>{exp.period}</div>
                        <div>{exp.location}</div>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--foreground-secondary)] mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.achievements.map((a) => (
                        <span key={a} className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--accent)]/10 rounded text-xs text-[var(--accent)]">
                          <Icon name="check" />
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (<span key={tech} className="tag">{tech}</span>))}
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </section>

          {/* ===== PROJECTS ===== */}
          <section id="projects" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-black mb-2">Featured Projects</h2>
              <p className="text-[var(--foreground-secondary)] mb-8">Click any project for the full case study with architecture diagrams and lessons learned.</p>
            </RevealSection>

            <div className="grid gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>

          {/* ===== SKILLS ===== */}
          <section id="skills" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-black mb-2">Skills & Credentials</h2>
              <p className="text-[var(--foreground-secondary)] mb-8">Technical expertise with proficiency levels.</p>
            </RevealSection>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {skillCategories.map((category) => (
                <SkillCard key={category.name} category={category} />
              ))}
            </div>

            <RevealSection delay={0.3}>
              <div className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                <h3 className="font-bold mb-4">Certifications</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="flex items-center justify-between p-3 bg-[var(--background-tertiary)] rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{cert.name}</div>
                        <div className="text-xs text-[var(--foreground-muted)]">{cert.issuer}</div>
                      </div>
                      <span className="text-xs text-[var(--foreground-muted)]">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={0.4}>
              <div className="mt-4 bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                <h3 className="font-bold mb-3">Education</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">M.S. Computer Science</div>
                    <div className="text-sm text-[var(--foreground-muted)]">Northern Illinois University</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[var(--foreground-muted)]">2024</div>
                    <div className="text-sm text-[var(--accent)]">GPA: 3.67</div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </section>

          {/* ===== CONTACT ===== */}
          <section id="contact" className="py-20">
            <RevealSection>
              <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-3xl p-8 md:p-12 border border-[var(--accent)]/20">
                <h2 className="text-3xl font-black mb-3 text-center">Let&apos;s Work Together</h2>
                <p className="text-[var(--foreground-secondary)] mb-8 text-center max-w-md mx-auto">
                  Looking for a Data Scientist who ships production ML? Let&apos;s chat.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
                  <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                    <Icon name="calendar" />
                    Schedule a 30-min Call
                  </a>
                  <a href="mailto:madhuambati9999@gmail.com" className="btn-secondary justify-center">
                    <Icon name="email" />
                    Send a Message
                  </a>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <a href={`${BASE_PATH}/resume.pdf`} download className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors">
                    <Icon name="download" />
                    Download Resume
                  </a>
                  <a href="https://github.com/madhugoutham" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors">
                    <Icon name="github" />
                    View GitHub
                  </a>
                  <a href="https://linkedin.com/in/madhu-goutham-reddy-ambati-257241232" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors">
                    <Icon name="linkedin" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </RevealSection>
          </section>

          <footer className="py-8 text-center border-t border-[var(--border)]">
            <p className="text-sm text-[var(--foreground-muted)]">
              © {new Date().getFullYear()} Madhu Goutham Reddy Ambati
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
