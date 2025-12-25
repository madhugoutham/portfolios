"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// ============== DATA ==============
const experiencesData: Record<string, {
    company: string;
    role: string;
    period: string;
    location: string;
    overview: string;
    achievements: { metric: string; label: string; description: string }[];
    architecture: {
        title: string;
        components: { name: string; description: string }[];
        flow: string[];
    };
    projects: { title: string; description: string; impact: string }[];
    technologies: string[];
}> = {
    "keybank": {
        company: "KeyBank",
        role: "Senior Data Scientist",
        period: "2024 — Present",
        location: "Cleveland, OH",
        overview: "Leading enterprise ML initiatives for fraud detection and risk management, building production systems that process 250K+ daily transactions with real-time inference.",
        achievements: [
            { metric: "2%", label: "False Positive Rate", description: "Reduced from 15% using ensemble methods" },
            { metric: "$2.1M", label: "Annual Savings", description: "Direct fraud prevention impact" },
            { metric: "45ms", label: "P99 Latency", description: "Real-time inference performance" },
            { metric: "95%", label: "Model Accuracy", description: "Production fraud detection" },
        ],
        architecture: {
            title: "Real-Time Fraud Detection Pipeline",
            components: [
                { name: "Kafka", description: "Event streaming & ingestion" },
                { name: "Redis", description: "Real-time feature store" },
                { name: "SageMaker", description: "Model hosting & inference" },
                { name: "XGBoost", description: "Ensemble model core" },
            ],
            flow: ["Transaction Event", "Kafka Stream", "Feature Engineering", "Redis Cache", "Model Inference", "Decision API"],
        },
        projects: [
            { title: "Multi-Agent Fraud Detection", description: "Built ensemble architecture combining XGBoost, LSTM, and rule-based models", impact: "95% accuracy, 45ms latency" },
            { title: "Real-Time Feature Store", description: "Designed Redis-based feature store for sub-50ms feature retrieval", impact: "10x faster feature access" },
            { title: "Model Monitoring Dashboard", description: "Implemented drift detection and performance monitoring", impact: "Reduced incident response 60%" },
        ],
        technologies: ["Python", "PyTorch", "XGBoost", "AWS SageMaker", "Kafka", "Redis", "Docker", "Kubernetes"],
    },
    "niu": {
        company: "Northern Illinois University",
        role: "Data Scientist (Graduate Research)",
        period: "2023 — 2024",
        location: "DeKalb, IL",
        overview: "Conducted research on AI-driven environmental mapping using satellite imagery, resulting in published papers and award-winning models.",
        achievements: [
            { metric: "93.6%", label: "F1-Score", description: "Surface water detection model" },
            { metric: "3rd", label: "Prize", description: "IIN Sustainability Conference 2024" },
            { metric: "2", label: "Publications", description: "IAHS journal & conference" },
            { metric: "88%", label: "IoU Score", description: "Segmentation accuracy" },
        ],
        architecture: {
            title: "Satellite Image Segmentation Pipeline",
            components: [
                { name: "Google Earth Engine", description: "Satellite data acquisition" },
                { name: "U-Net++", description: "Segmentation architecture" },
                { name: "Attention Gates", description: "Feature refinement" },
                { name: "PyTorch", description: "Model training framework" },
            ],
            flow: ["Sentinel-2 Imagery", "Preprocessing", "U-Net++ Encoder", "Attention Module", "Decoder", "Water Mask"],
        },
        projects: [
            { title: "Surface Water Detection", description: "U-Net++ with attention mechanism for water body segmentation", impact: "93.6% F1-score, published in IAHS" },
            { title: "Environmental Change Mapping", description: "Temporal analysis of land cover changes", impact: "3rd prize at IIN 2024" },
        ],
        technologies: ["Python", "PyTorch", "Google Earth Engine", "U-Net++", "OpenCV", "NumPy", "Pandas"],
    },
    "tcs-experian": {
        company: "TCS / Experian",
        role: "Data Scientist",
        period: "2021 — 2023",
        location: "Hyderabad, India",
        overview: "Built high-throughput fraud scoring systems processing 50M+ monthly events, implementing streaming ML pipelines with sub-100ms latency.",
        achievements: [
            { metric: "$2.3M", label: "Annual Savings", description: "Fraud prevention at Experian" },
            { metric: "50M+", label: "Events/Month", description: "Production system throughput" },
            { metric: "99ms", label: "P99 Latency", description: "End-to-end scoring time" },
            { metric: "38%", label: "Fraud Reduction", description: "Year-over-year improvement" },
        ],
        architecture: {
            title: "Streaming Fraud Scoring System",
            components: [
                { name: "Apache Kafka", description: "Event ingestion at scale" },
                { name: "Apache Flink", description: "Stream processing engine" },
                { name: "TensorFlow", description: "Deep learning models" },
                { name: "Kubernetes", description: "Container orchestration" },
            ],
            flow: ["Credit Events", "Kafka Topics", "Flink Processing", "Feature Store", "TF Serving", "Score Output"],
        },
        projects: [
            { title: "Real-Time Fraud Scoring", description: "Built streaming pipeline for credit fraud detection", impact: "50M events/mo, 99ms latency" },
            { title: "Feature Engineering Platform", description: "Automated feature generation from raw transactions", impact: "60% faster model development" },
            { title: "A/B Testing Framework", description: "Implemented champion/challenger model deployment", impact: "15% uplift in fraud catch rate" },
        ],
        technologies: ["Python", "TensorFlow", "Apache Flink", "Apache Kafka", "Redis", "PostgreSQL", "Kubernetes", "Docker"],
    },
    "stanley": {
        company: "Stanley Black & Decker",
        role: "Data Scientist",
        period: "2019 — 2021",
        location: "Bangalore, India",
        overview: "Developed marketing analytics and prediction models for demand forecasting and customer segmentation across global markets.",
        achievements: [
            { metric: "85%", label: "Model Accuracy", description: "Marketing response prediction" },
            { metric: "25%", label: "Conversion Lift", description: "Campaign optimization impact" },
            { metric: "12", label: "Markets", description: "Global deployment scope" },
            { metric: "3x", label: "ROI Improvement", description: "Marketing spend efficiency" },
        ],
        architecture: {
            title: "Marketing Analytics Platform",
            components: [
                { name: "Azure ML", description: "Model training & deployment" },
                { name: "Databricks", description: "Data processing & ETL" },
                { name: "Power BI", description: "Dashboard & visualization" },
                { name: "SQL Server", description: "Data warehouse" },
            ],
            flow: ["CRM Data", "Databricks ETL", "Feature Store", "Azure ML", "Predictions", "Power BI Dashboard"],
        },
        projects: [
            { title: "Customer Propensity Model", description: "Predicted purchase likelihood for targeted campaigns", impact: "85% accuracy, 25% conversion lift" },
            { title: "Demand Forecasting", description: "Time-series forecasting for inventory optimization", impact: "20% reduction in stockouts" },
            { title: "Customer Segmentation", description: "Clustering analysis for persona development", impact: "3x ROI on targeted campaigns" },
        ],
        technologies: ["Python", "Azure ML", "Databricks", "PySpark", "SQL", "Power BI", "Scikit-learn"],
    },
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

// Architecture Diagram Component
function ArchitectureDiagram({ flow, components }: { flow: string[]; components: { name: string; description: string }[] }) {
    return (
        <div className="bg-[var(--background-secondary)] rounded-xl p-8 border border-[var(--border)]">
            {/* Flow Diagram */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {flow.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm font-mono">
                            {step}
                        </div>
                        {i < flow.length - 1 && (
                            <span className="text-[var(--foreground-muted)]">→</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {components.map((comp, i) => (
                    <div key={i} className="text-center p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                        <div className="font-medium text-sm mb-1">{comp.name}</div>
                        <div className="text-xs text-[var(--foreground-muted)]">{comp.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============== PAGE ==============

export default function ExperienceDetailClient({ slug }: { slug: string }) {
    const experience = experiencesData[slug];

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) document.documentElement.setAttribute("data-theme", saved);
    }, []);

    if (!experience) return <div className="min-h-screen flex items-center justify-center">Experience not found</div>;

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-32">
            {/* Header */}
            <header className="fixed top-0 w-full bg-[var(--background)]/80 backdrop-blur-md z-50 border-b border-[var(--border)]">
                <div className="max-w-[960px] mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="text-sm font-medium hover:text-[var(--foreground-muted)] transition-colors">
                        ← Back
                    </Link>
                    <span className="text-sm font-medium">Madhu Goutham Reddy Ambati</span>
                    <span className="text-xs uppercase tracking-widest text-[var(--foreground-muted)]">Experience</span>
                </div>
            </header>

            <div className="max-w-[960px] mx-auto px-6" style={{ paddingTop: '120px' }}>
                {/* Hero */}
                <Reveal>
                    <div className="mb-16">
                        <div className="flex gap-2 text-sm text-[var(--foreground-muted)] mb-4">
                            <span>{experience.period}</span>
                            <span>·</span>
                            <span>{experience.location}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-semibold mb-2 tracking-tight">{experience.role}</h1>
                        <h2 className="text-2xl text-[var(--foreground-muted)] mb-6">{experience.company}</h2>
                        <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed max-w-3xl">{experience.overview}</p>
                    </div>
                </Reveal>

                {/* Achievement Metrics */}
                <Reveal delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 border-y border-[var(--border)] py-8">
                        {experience.achievements.map((a, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold mb-1">{a.metric}</div>
                                <div className="text-sm font-medium mb-1">{a.label}</div>
                                <div className="text-xs text-[var(--foreground-muted)]">{a.description}</div>
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* Architecture Section */}
                <Reveal delay={0.2}>
                    <section className="mb-20">
                        <h3 className="section-label">System Architecture</h3>
                        <h4 className="text-2xl font-medium mb-6">{experience.architecture.title}</h4>
                        <ArchitectureDiagram
                            flow={experience.architecture.flow}
                            components={experience.architecture.components}
                        />
                    </section>
                </Reveal>

                {/* Projects */}
                <Reveal delay={0.3}>
                    <section className="mb-20">
                        <h3 className="section-label">Key Projects</h3>
                        <div className="space-y-6">
                            {experience.projects.map((project, i) => (
                                <div key={i} className="p-6 bg-[var(--background-secondary)] rounded-xl border border-[var(--border)]">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-medium">{project.title}</h4>
                                        <span className="text-sm font-mono text-[var(--foreground-muted)] bg-[var(--background)] px-2 py-1 rounded">
                                            {project.impact}
                                        </span>
                                    </div>
                                    <p className="text-[var(--foreground-secondary)]">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* Technologies */}
                <Reveal delay={0.4}>
                    <section className="mb-20">
                        <h3 className="section-label">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                </Reveal>

                {/* Footer Nav */}
                <Reveal delay={0.5}>
                    <div className="pt-12 border-t border-[var(--border)] flex justify-between items-center">
                        <Link href="/" className="text-sm font-medium hover:text-[var(--foreground-muted)]">
                            ← Back to Portfolio
                        </Link>
                    </div>
                </Reveal>
            </div>
        </main>
    );
}
