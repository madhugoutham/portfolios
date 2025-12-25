"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ============== DATA ==============
const projectsData: Record<string, {
    title: string;
    tagline: string;
    category: string;
    overview: string;
    problem: { title: string; description: string; painPoints: string[] };
    approach: { title: string; description: string; steps: string[] };
    techDecisions: { question: string; answer: string }[];
    architecture: { description: string };
    metrics: { label: string; value: string; description: string }[];
    results: string[];
    lessonsLearned: string[];
    technologies: string[];
    github?: string;
    timeline: string;
}> = {
    "fraud-detection": {
        title: "Multi-Agent Fraud Detection System",
        tagline: "Real-time ensemble model saving $2.1M annually",
        category: "Production ML",
        timeline: "6 months",
        overview: "Built a production fraud detection system processing 250K+ daily transactions with 95% accuracy and 45ms latency, saving $2.1M annually in prevented fraud losses.",
        problem: {
            title: "The Problem",
            description: "Legacy rule-based systems failed to catch sophisticated fraud while generating 15% false positives, causing significant customer friction and operational overhead.",
            painPoints: [
                "15% false positive rate causing excessive manual reviews",
                "200ms+ latency delaying transaction processing",
                "Inability to adapt to new fraud patterns quickly",
            ],
        },
        approach: {
            title: "The Approach",
            description: "Executed a multi-agent ensemble architecture combining XGBoost, LSTM, and rule-based models to balance accuracy, speed, and explainability.",
            steps: [
                "Analyzed 6 months of transaction data for pattern discovery",
                "Developed ensemble model architecture (XGBoost + LSTM)",
                "Implemented real-time feature engineering with Kafka",
                "Deployed on SageMaker with sub-50ms inference latency",
            ],
        },
        techDecisions: [
            { question: "Why Ensemble?", answer: "Single models overfit. The ensemble captures rule-based patterns, feature interactions (Trees), and sequences (LSTM) simultaneously." },
            { question: "Why Kafka?", answer: "Required sub-100ms end-to-end latency. Kafka handles 50K+ TPS while maintaining strict ordering for session analysis." },
        ],
        architecture: {
            description: "Kafka Ingestion → Real-time Feature Store (Redis) → Ensemble Inference (SageMaker) → Voting Logic → Decision API",
        },
        metrics: [
            { label: "Accuracy", value: "95%", description: "vs 82% legacy" },
            { label: "Latency", value: "45ms", description: "P99 response" },
            { label: "False Positives", value: "2.1%", description: "Reduced from 15%" },
            { label: "Savings", value: "$2.1M", description: "Annual fraud prevention" },
        ],
        results: [
            "Reduced false positives to 2.1%, significantly improving UX",
            "Achieved 45ms P99 latency for real-time blocking",
            "Saved $2.1M annually in direct fraud losses",
            "System handles 250K+ daily transactions with 99.9% uptime",
        ],
        lessonsLearned: [
            "Explainability is crucial for compliance; added feature importance APIs",
            "Feature engineering contributed 60% of model performance gains",
            "Data drift monitoring is essential for production ML stability",
        ],
        technologies: ["PyTorch", "XGBoost", "Kafka", "Redis", "SageMaker", "Docker"],
        github: "https://github.com/madhugoutham",
    },
    "rag-credit": {
        title: "RAG-Enhanced Credit Risk",
        tagline: "LLM-powered document analysis with 87% accuracy",
        category: "GenAI",
        timeline: "4 months",
        overview: "Developed a Retrieval-Augmented Generation system reducing credit document review time from 4 hours to 3 seconds while maintaining 87% accuracy and providing full explainability.",
        problem: {
            title: "The Problem",
            description: "Manual review of 15+ different financial document types was slow, inconsistent, and lacked audit trails for risk decisions.",
            painPoints: [
                "4+ hours manual review time per application",
                "Inconsistent risk assessments across analysts",
                "Lack of standardized audit trails for decisions",
            ],
        },
        approach: {
            title: "The Approach",
            description: "Built a RAG pipeline utilizing GPT-4 and Pinecone to retrieve relevant context and generate cited risk assessments from unstructured documents.",
            steps: [
                "Implemented semantic chunking for financial documents",
                "Created vector index with Pinecone for fast retrieval",
                "Engineered prompts with citation requirements for explainability",
                "Built FastAPI service for real-time document analysis",
            ],
        },
        techDecisions: [
            { question: "Why RAG?", answer: "Regulatory requirement for explainability. RAG provides exact source citations for every risk factor identified." },
            { question: "Why Pinecone?", answer: "Managed service offered best-in-class latency (<50ms) and scalability without maintenance overhead." },
        ],
        architecture: {
            description: "Document Upload → Text Extraction → Chunking & Embedding → Pinecone Index → GPT-4 Querying → Risk Report Generation",
        },
        metrics: [
            { label: "Accuracy", value: "87%", description: "Risk identification" },
            { label: "Speed", value: "3s", description: "Per document" },
            { label: "Efficiency", value: "75%", description: "Time saved" },
            { label: "Scale", value: "15+", description: "Doc types supported" },
        ],
        results: [
            "Reduced analysis time from 4 hours to 3 seconds",
            "Achieved 87% accuracy in risk factor identification",
            "Standardized risk assessment across the organization",
            "Enabled full auditability with source citations",
        ],
        lessonsLearned: [
            "Chunking strategy impacts retrieval quality significantly",
            "Citations are non-negotiable for trust in financial AI",
            "Prompt engineering is an iterative testing process",
        ],
        technologies: ["LangChain", "GPT-4", "Pinecone", "FastAPI", "Python"],
        github: "https://github.com/madhugoutham",
    },
    // Add other projects similarly (shorthand for brevity in this rewrite, but full content can be added if needed)
    "environmental-ai": {
        title: "AI Environmental Mapping",
        tagline: "Satellite imagery analysis with 93.6% F1-score",
        category: "Computer Vision",
        timeline: "12 months",
        overview: "Developed U-Net++ model for surface water detection from Sentinel-2 imagery, winning 3rd prize at IIN 2024.",
        problem: { title: "Challenge", description: "Manual mapping was slow and inconsistent.", painPoints: ["Weeks of manual work", "Inconsistent data"] },
        approach: { title: "Approach", description: "U-Net++ with attention gates.", steps: ["Curated dataset", "Trained model", "Published results"] },
        techDecisions: [{ question: "Why U-Net++?", answer: "Better boundary detection for diffuse water edges." }],
        architecture: { description: "Sentinel-2 → Preprocessing → U-Net++ → Water Mask" },
        metrics: [{ label: "F1-Score", value: "93.6%", description: "State of the art" }, { label: "IoU", value: "88%", description: "Segmentation" }],
        results: ["Published in IAHS journal", "Won IIN 2024 prize", "Used by 10+ research groups"],
        lessonsLearned: ["Data quality > Model complexity", "Domain knowledge is key"],
        technologies: ["PyTorch", "U-Net++", "Google Earth Engine"],
        github: "https://github.com/madhugoutham",
    },
    "real-time-scoring": {
        title: "Real-Time Fraud Scoring",
        tagline: "50M monthly events with 99ms latency",
        category: "Streaming",
        timeline: "8 months",
        overview: "High-throughput fraud scoring system processing 50M events/month at Experian.",
        problem: { title: "Challenge", description: "Batch processing was too slow for real-time fraud.", painPoints: ["4-hour delay", "Missed fraud"] },
        approach: { title: "Approach", description: "Flink streaming pipeline + Redis feature store.", steps: ["Designed pipeline", "Implemented Flink jobs", "Deployed to K8s"] },
        techDecisions: [{ question: "Why Flink?", answer: "True event-time processing and exactly-once semantics." }],
        architecture: { description: "Kafka → Flink → Redis → TF Serving → Output" },
        metrics: [{ label: "Latency", value: "99ms", description: "P99" }, { label: "Volume", value: "50M", description: "Events/mo" }],
        results: ["Processed 50M events/mo", "Reduced fraud 38%", "99ms latency"],
        lessonsLearned: ["Streaming requires different mindset", "Monitoring is critical"],
        technologies: ["Flink", "Kafka", "Redis", "TensorFlow", "K8s"],
        github: "https://github.com/madhugoutham",
    }
};

// ============== COMPONENTS ==============

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

// ============== PAGE ==============

export default function ProjectDetailClient({ slug }: { slug: string }) {
    const project = projectsData[slug];

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) document.documentElement.setAttribute("data-theme", saved);
    }, []);

    if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-32">
            {/* Header */}
            <header className="fixed top-0 w-full bg-[var(--background)]/80 backdrop-blur-md z-50 border-b border-[var(--border)]">
                <div className="max-w-[960px] mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="text-sm font-medium hover:text-[var(--foreground-muted)] transition-colors">
                        ← Back
                    </Link>
                    <span className="text-sm font-medium">Madhu Goutham Reddy Ambati</span>
                    <span className="text-xs uppercase tracking-widest text-[var(--foreground-muted)]">{project.category}</span>
                </div>
            </header>

            <div className="max-w-[960px] mx-auto px-6" style={{ paddingTop: '120px' }}>
                {/* Hero */}
                <Reveal>
                    <div className="mb-20">
                        <div className="flex gap-2 text-sm text-[var(--foreground-muted)] mb-6">
                            <span>Case Study</span>
                            <span>/</span>
                            <span>{project.timeline}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">{project.title}</h1>
                        <p className="text-xl text-[var(--foreground-secondary)] leading-relaxed">{project.overview}</p>
                    </div>
                </Reveal>

                {/* Metrics Grid */}
                <Reveal delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-[var(--border)] py-8">
                        {project.metrics.map((m) => (
                            <div key={m.label}>
                                <div className="text-3xl font-bold mb-1">{m.value}</div>
                                <div className="text-sm text-[var(--foreground-muted)]">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* Content Sections */}
                <div className="space-y-24">
                    {/* Problem */}
                    <Reveal delay={0.2}>
                        <section>
                            <h3 className="section-label">Challenge</h3>
                            <h2 className="text-2xl font-medium mb-6">{project.problem.title}</h2>
                            <p className="body-text mb-8">{project.problem.description}</p>
                            <ul className="space-y-4">
                                {project.problem.painPoints.map((point, i) => (
                                    <li key={i} className="flex gap-4 text-[var(--foreground-secondary)]">
                                        <span className="text-[var(--foreground-muted)]">—</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </Reveal>

                    {/* Approach */}
                    <Reveal delay={0.3}>
                        <section>
                            <h3 className="section-label">Solution</h3>
                            <h2 className="text-2xl font-medium mb-6">{project.approach.title}</h2>
                            <p className="body-text mb-8">{project.approach.description}</p>
                            <div className="pl-6 border-l border-[var(--border)] space-y-6">
                                {project.approach.steps.map((step, i) => (
                                    <div key={i} className="item">
                                        <span className="block text-xs font-mono text-[var(--foreground-muted)] mb-1">0{i + 1}</span>
                                        <p className="text-[var(--foreground)]">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Reveal>

                    {/* Tech Decisions */}
                    <Reveal delay={0.4}>
                        <section>
                            <h3 className="section-label">Decisions</h3>
                            <div className="grid gap-8">
                                {project.techDecisions.map((decision, i) => (
                                    <div key={i}>
                                        <h4 className="font-medium mb-2">{decision.question}</h4>
                                        <p className="body-text">{decision.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Reveal>

                    {/* Architecture */}
                    <Reveal delay={0.5}>
                        <section className="bg-[var(--background-secondary)] p-8 rounded-lg border border-[var(--border)]">
                            <h3 className="section-label mb-4">Architecture</h3>
                            <div className="font-mono text-sm text-[var(--foreground-secondary)] leading-relaxed">
                                {project.architecture.description}
                            </div>
                        </section>
                    </Reveal>

                    {/* Results */}
                    <Reveal delay={0.6}>
                        <section>
                            <h3 className="section-label">Outcome</h3>
                            <ul className="space-y-4">
                                {project.results.map((result, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="text-[var(--foreground)] font-medium">✓</span>
                                        <span className="text-[var(--foreground-secondary)]">{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </Reveal>
                </div>

                {/* Footer Nav */}
                <Reveal delay={0.7}>
                    <div className="mt-24 pt-12 border-t border-[var(--border)] flex justify-between items-center">
                        <Link href="/" className="text-sm font-medium hover:text-[var(--foreground-muted)]">
                            ← Back to Portfolio
                        </Link>
                        {project.github && (
                            <a href={project.github} className="text-sm font-medium hover:text-[var(--foreground-muted)]">
                                View Code ↗
                            </a>
                        )}
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
