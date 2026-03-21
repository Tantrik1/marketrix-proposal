"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud, Blocks, Code2 } from "lucide-react";

const techStack = [
  {
    icon: Blocks,
    name: "Next.js",
    desc: "Lightning-fast, SEO-optimized frontend framework",
  },
  {
    icon: Server,
    name: "Node.js / NestJS",
    desc: "Robust, scalable backend architecture",
  },
  {
    icon: Database,
    name: "PostgreSQL",
    desc: "Secure, reliable relational database",
  },
  {
    icon: Cloud,
    name: "Microsoft Azure",
    desc: "Enterprise-grade cloud hosting & uptime",
  },
];

export default function TechStack() {
  return (
    <section className="py-24 bg-[var(--bg-primary)] border-b border-[var(--border)]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Code2 size={14} />
            Production-Grade Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-white mb-4"
          >
            Built With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-1 inline-block">
              Modern Technology
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed"
          >
            Every tool chosen for performance, security, and long-term scalability — the same stack powering enterprise SaaS globally.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:border-[var(--accent)] transition-all duration-300 shadow-md hover:shadow-orange-500/10"
              >
                <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center text-[var(--accent)] mb-4 border border-[var(--border)]">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold font-syne text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                  {tech.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
