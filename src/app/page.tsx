"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

// ============== DATA FROM RESUME ==============

const navLinks = [
  { id: "about", label: "About" },
  { id: "impact", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/madhu-goutham-reddy-ambati-257241232",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/madhuambati",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:madhuambati9999@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// Impact metrics
const impactMetrics = [
  { value: 2.3, prefix: "$", suffix: "M", label: "Annual Savings" },
  { value: 50, suffix: "M", label: "Monthly Events" },
  { value: 99, suffix: "ms", label: "Latency" },
  { value: 38, suffix: "%", label: "Fraud Reduction" },
];

// Experience
const experiences = [
  {
    company: "KeyBank",
    role: "Senior Data Scientist",
    period: "Nov 2024 — Present",
    location: "Remote",
    description: "Leading fraud detection ML initiatives. Reduced false positives from 5% to 2%. Built loan default model with 0.85 AUC.",
    technologies: ["PyTorch", "XGBoost", "AWS"],
  },
  {
    company: "Northern Illinois University",
    role: "Data Scientist (GRA)",
    period: "Aug 2023 — Oct 2024",
    location: "Illinois",
    description: "Published research on environmental AI. Developed U-Net++ CNN achieving 93.6% F1-score for water detection.",
    technologies: ["PyTorch", "TensorFlow", "GEE"],
  },
  {
    company: "TCS / Experian",
    role: "Data Scientist",
    period: "May 2021 — Jul 2023",
    location: "India",
    description: "Built real-time fraud scoring processing 50M monthly events. Reduced fraud losses by 38% ($2.3M annually).",
    technologies: ["Python", "Kafka", "Flink"],
  },
  {
    company: "Stanley Black & Decker",
    role: "Data Scientist",
    period: "Mar 2019 — Apr 2021",
    location: "India",
    description: "Developed marketing prediction model with 85% accuracy. Optimized ETL pipelines reducing time by 40%.",
    technologies: ["Python", "SQL", "Tableau"],
  },
];

// Projects
const projects = [
  {
    id: "fraud-detection",
    title: "Multi-Agent Fraud Detection",
    description: "Real-time ensemble model processing 250K+ daily transactions.",
    impact: "$2.1M saved",
    technologies: ["PyTorch", "XGBoost", "AWS"],
  },
  {
    id: "rag-credit",
    title: "RAG Credit Risk Assessment",
    description: "LLM-powered credit risk analysis with explainable AI.",
    impact: "87% accuracy",
    technologies: ["LangChain", "GPT-4", "Pinecone"],
  },
  {
    id: "environmental-ai",
    title: "Environmental AI Mapping",
    description: "Award-winning U-Net++ for satellite water detection.",
    impact: "93.6% F1",
    technologies: ["PyTorch", "U-Net++", "GEE"],
  },
  {
    id: "real-time-scoring",
    title: "Real-Time Fraud Scoring",
    description: "50M monthly events with 99ms latency at Experian.",
    impact: "$2.3M saved",
    technologies: ["Flink", "TensorFlow", "K8s"],
  },
];

// Skills
const skillCategories = [
  { name: "ML/DL", skills: ["PyTorch", "TensorFlow", "XGBoost", "Scikit-learn"] },
  { name: "LLM/GenAI", skills: ["LangChain", "GPT-4", "RAG", "Pinecone"] },
  { name: "Cloud", skills: ["AWS SageMaker", "Kubernetes", "Docker"] },
  { name: "Data", skills: ["Python", "SQL", "Spark", "Kafka"] },
];

// Certifications
const certifications = [
  "AWS Solutions Architect",
  "AWS Cloud Practitioner",
  "Deep Learning Specialization",
  "MLOps Specialization",
  "Generative AI with LLMs",
];

// Publications
const publications = [
  { title: "USS-Water Dataset and U-Net+ Model", venue: "IAHS", status: "Published" },
  { title: "Building Classification: DenseNet201", venue: "Under Review", status: "In Review" },
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

// ============== COMPONENTS ==============

function MetricCard({ metric, index }: { metric: typeof impactMetrics[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();
  const count = useCountUp(metric.value, 2000, isVisible);
  return (
    <div ref={ref} className="metric-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="text-3xl sm:text-4xl font-bold text-[var(--accent)]">
        {metric.prefix}{count.toFixed(metric.value % 1 === 0 ? 0 : 1)}{metric.suffix}
      </div>
      <div className="text-sm text-[var(--foreground-secondary)] mt-2">{metric.label}</div>
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
      <div className="flex items-center justify-between mb-8">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--accent)]/30">
          <Image src="/portfolios/profile.jpg" alt="Madhu Goutham" width={56} height={56} className="w-full h-full object-cover object-top" priority />
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <div className="mb-6">
        <h1 className="text-lg font-semibold">Madhu Goutham</h1>
        <p className="text-sm text-[var(--accent)]">Senior Data Scientist</p>
      </div>

      <div className="status-badge mb-8">
        <span className="w-2 h-2 rounded-full bg-green-500 breathe" />
        <span>Open to work</span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={`nav-link ${activeSection === link.id ? "active" : ""}`}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pt-6 border-t border-[var(--border)] space-y-4">
        <div className="flex gap-3">
          {socialLinks.map((link) => (
            <a key={link.name} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--background-tertiary)] transition-all" aria-label={link.name}>
              {link.icon}
            </a>
          ))}
        </div>
        <a href="/portfolios/resume.pdf" download className="btn-secondary w-full justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </a>
      </div>
    </aside>
  );
}

function MobileHeader({ theme, onToggleTheme }: { theme: string; onToggleTheme: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[var(--accent)]/30">
            <Image src="/portfolios/profile.jpg" alt="Madhu" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold">Madhu Goutham</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="px-4 py-4 bg-[var(--background-secondary)] border-t border-[var(--border)] space-y-2">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setIsOpen(false)} className="block py-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">{link.label}</a>
          ))}
          <a href="/portfolios/resume.pdf" download className="block py-2 text-[var(--accent)] font-medium">Download Resume</a>
        </nav>
      )}
    </header>
  );
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
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
      <MobileHeader theme={theme} onToggleTheme={toggleTheme} />
      <Sidebar activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} />

      <main className="main-content">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

          {/* ===== HERO ===== */}
          <section id="about" className="min-h-[60vh] flex flex-col justify-center pb-24">
            <RevealSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 breathe" />
                Available for opportunities
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Turning <span className="text-[var(--accent)]">data</span> into<br />
                <span className="text-[var(--accent)]">$2.3M</span> decisions.
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-lg text-[var(--foreground-secondary)] mb-10 max-w-lg leading-relaxed">
                Senior Data Scientist with 6+ years building production ML systems.
                Specialized in fraud detection, real-time scoring, and GenAI applications.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary">
                  View Projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a href="/portfolios/resume.pdf" download className="btn-secondary">
                  Download Resume
                </a>
              </div>
            </RevealSection>
          </section>

          {/* ===== IMPACT ===== */}
          <section id="impact" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-bold mb-4">Business Impact</h2>
              <p className="text-[var(--foreground-secondary)] mb-12">Measurable results that drive ROI</p>
            </RevealSection>

            <div className="grid grid-cols-2 gap-6">
              {impactMetrics.map((metric, i) => (
                <MetricCard key={metric.label} metric={metric} index={i} />
              ))}
            </div>
          </section>

          <div className="divider" />

          {/* ===== EXPERIENCE ===== */}
          <section id="experience" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-bold mb-4">Experience</h2>
              <p className="text-[var(--foreground-secondary)] mb-12">Building at scale across industries</p>
            </RevealSection>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <RevealSection key={index} delay={index * 0.1}>
                  <div className="experience-item group cursor-pointer hover:border-[var(--accent)]/50 transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">{exp.role}</h3>
                        <p className="text-[var(--accent)]">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-[var(--foreground-muted)]">
                        <div>{exp.period}</div>
                        <div>{exp.location}</div>
                      </div>
                    </div>
                    <p className="text-[var(--foreground-secondary)] mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (<span key={tech} className="tag">{tech}</span>))}
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </section>

          <div className="divider" />

          {/* ===== PROJECTS ===== */}
          <section id="projects" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-[var(--foreground-secondary)] mb-12">Click to see detailed case studies</p>
            </RevealSection>

            <div className="grid gap-6">
              {projects.map((project, index) => (
                <RevealSection key={project.id} delay={index * 0.1}>
                  <Link href={`/projects/${project.id}`} className="block">
                    <div className="project-card-enhanced visible group cursor-pointer">
                      <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
                            <span className="text-sm font-semibold text-[var(--accent)]">{project.impact}</span>
                          </div>
                          <p className="text-[var(--foreground-secondary)] mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (<span key={tech} className="tag">{tech}</span>))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-medium">
                          View Details
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              ))}
            </div>
          </section>

          <div className="divider" />

          {/* ===== SKILLS ===== */}
          <section id="skills" className="py-24">
            <RevealSection>
              <h2 className="text-3xl font-bold mb-4">Skills & Credentials</h2>
              <p className="text-[var(--foreground-secondary)] mb-12">Technical expertise & certifications</p>
            </RevealSection>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {skillCategories.map((category, i) => (
                <RevealSection key={category.name} delay={i * 0.1}>
                  <div className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                    <h3 className="font-semibold text-[var(--accent)] mb-4">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 bg-[var(--background-tertiary)] rounded-lg text-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <RevealSection delay={0.3}>
                <div className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--accent)] mb-4">Certifications</h3>
                  <ul className="space-y-3">
                    {certifications.map((cert) => (
                      <li key={cert} className="flex items-center gap-3 text-sm">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>

              <RevealSection delay={0.4}>
                <div className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--accent)] mb-4">Publications</h3>
                  <ul className="space-y-4">
                    {publications.map((pub) => (
                      <li key={pub.title}>
                        <div className="font-medium text-sm">{pub.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-[var(--foreground-muted)]">{pub.venue}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${pub.status === "Published" ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "bg-[var(--foreground-muted)]/10 text-[var(--foreground-muted)]"}`}>
                            {pub.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>

              <RevealSection delay={0.5} className="md:col-span-2">
                <div className="bg-[var(--background-secondary)] rounded-2xl p-6 border border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--accent)] mb-4">Education</h3>
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
            </div>
          </section>

          <div className="divider" />

          {/* ===== CONTACT ===== */}
          <section id="contact" className="py-24">
            <RevealSection>
              <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-3xl p-12 border border-[var(--accent)]/20 text-center">
                <h2 className="text-3xl font-bold mb-4">Let&apos;s Build Together</h2>
                <p className="text-[var(--foreground-secondary)] mb-10 max-w-md mx-auto">
                  Looking for a Data Scientist who delivers measurable impact?
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <a href="mailto:madhuambati9999@gmail.com" className="btn-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Me
                  </a>
                  <a href="/portfolios/resume.pdf" download className="btn-secondary">
                    Download Resume
                  </a>
                </div>

                <div className="text-sm text-[var(--foreground-muted)]">
                  Illinois, USA • madhuambati9999@gmail.com
                </div>
              </div>
            </RevealSection>
          </section>

          <footer className="py-12 text-center">
            <p className="text-sm text-[var(--foreground-muted)]">
              © {new Date().getFullYear()} Madhu Goutham Reddy Ambati
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
