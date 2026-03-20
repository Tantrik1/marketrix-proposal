"use client";

import { motion } from "framer-motion";
import { Wrench, Search, Bot, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Wrench,
    title: "Built From Scratch",
    desc: "No templates. Every pixel made for your business.",
  },
  {
    icon: Search,
    title: "SEO-Ready",
    desc: "Show up on Google from day one.",
  },
  {
    icon: Bot,
    title: "AI-Powered",
    desc: "Features that work while you sleep.",
  },
  {
    icon: TrendingUp,
    title: "Business-Focused",
    desc: "Built to get and keep customers.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[var(--bg-primary)] border-b border-[var(--border)] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-syne text-white leading-snug mb-4">
              We don&apos;t just build websites.
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-syne text-[var(--accent)]">
              We build systems that work for you.
            </h3>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 flex gap-4 items-start hover:border-[var(--accent-light)] transition-colors"
                >
                  <div className="p-3 rounded-lg bg-[var(--bg-secondary)] text-[var(--accent)] shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-syne text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
