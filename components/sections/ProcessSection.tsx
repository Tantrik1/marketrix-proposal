"use client";

import { motion } from "framer-motion";
import { Search, Code2, ServerCog, Rocket } from "lucide-react";

const steps = [
  {
    week: "Week 1",
    phase: "Planning & Design",
    desc: "We understand your business, map out the entire system architecture, and design pixel-perfect layouts that reflect your brand.",
    icon: <Search size={22} />,
    deliverables: ["Wireframes", "Brand alignment", "Tech scoping"],
    color: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/15 text-blue-400",
  },
  {
    week: "Week 2",
    phase: "Frontend Development",
    desc: "Your public-facing website is built — every page, every section, with responsive layouts and smooth animations.",
    icon: <Code2 size={22} />,
    deliverables: ["All core pages", "Responsive UI", "Animations"],
    color: "from-purple-500/20 to-purple-600/5",
    borderColor: "border-purple-500/30",
    iconBg: "bg-purple-500/15 text-purple-400",
  },
  {
    week: "Week 3",
    phase: "Backend + Admin Panel",
    desc: "The control room is engineered and connected — manage leads, content, and analytics from one powerful dashboard.",
    icon: <ServerCog size={22} />,
    deliverables: ["Admin panel", "API integration", "Database setup"],
    color: "from-orange-500/20 to-orange-600/5",
    borderColor: "border-orange-500/30",
    iconBg: "bg-orange-500/15 text-orange-400",
  },
  {
    week: "Week 4",
    phase: "Testing & Launch",
    desc: "Everything is rigorously tested across all devices. Then we go live — with performance tuned and SEO fully configured.",
    icon: <Rocket size={22} />,
    deliverables: ["QA testing", "SEO setup", "Live deployment"],
    color: "from-green-500/20 to-green-600/5",
    borderColor: "border-green-500/30",
    iconBg: "bg-green-500/15 text-green-400",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[var(--bg-secondary)] border-b border-[var(--border)] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            <Rocket size={14} />
            Zero to Live in 4 Weeks
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-white mb-4"
          >
            Our Build Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-muted)] text-lg max-w-xl mx-auto"
          >
            A clear roadmap with weekly milestones. You always know what&apos;s happening next.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/60 via-[var(--accent)]/20 to-transparent" />

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative flex gap-6 group"
              >
                {/* Node */}
                <div className="relative shrink-0 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full border-2 border-[var(--accent)] bg-[var(--card-bg)] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(249,115,22,0.2)] group-hover:shadow-[0_0_28px_rgba(249,115,22,0.35)] transition-all duration-300`}>
                    <span className="text-[var(--accent)] font-bold font-syne text-lg">{idx + 1}</span>
                  </div>
                  {/* Glow pulse on node */}
                  <div className="absolute inset-0 rounded-full bg-[var(--accent)]/10 scale-150 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                </div>

                {/* Card */}
                <div className={`flex-1 mb-2 rounded-2xl border bg-gradient-to-br ${step.color} ${step.borderColor} p-5 md:p-6 group-hover:shadow-lg transition-all duration-300`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {/* Week + phase */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                          {step.week}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <div className={`p-1.5 rounded-lg ${step.iconBg}`}>
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold font-syne text-white mb-2">{step.phase}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Deliverables */}
                    <div className="sm:shrink-0 sm:ml-4">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2">Deliverables</p>
                      <ul className="space-y-1">
                        {step.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs text-white/70">
                            <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
