"use client";

import { motion } from "framer-motion";
import {
  Kanban, Headphones, Clock, Video, GitBranch, Users2, ArrowRight,
} from "lucide-react";

const pillars = [
  {
    icon: <Kanban size={22} />,
    title: "Real-time Kanban Collaboration",
    desc: "You get full visibility into every task, every sprint, every day. Move cards, leave comments, and watch your platform take shape in real time — no status-update meetings needed.",
    tag: "Transparency",
    color: "from-blue-500/15 to-blue-600/5 border-blue-500/20",
    iconColor: "bg-blue-500/15 text-blue-400",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    icon: <Headphones size={22} />,
    title: "Dedicated Support Ticket Platform",
    desc: "Every bug report, change request, or question goes into a shared ticketing system. Track status, assign priority, and get real-time resolution updates — no lost emails.",
    tag: "Accountability",
    color: "from-purple-500/15 to-purple-600/5 border-purple-500/20",
    iconColor: "bg-purple-500/15 text-purple-400",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    icon: <Clock size={22} />,
    title: "24/7 Priority Support",
    desc: "Critical issues don't wait for business hours. Our team is on call around the clock for anything that affects your live platform — response within 2 hours, resolution within 24.",
    tag: "Always On",
    color: "from-orange-500/15 to-orange-600/5 border-orange-500/20",
    iconColor: "bg-orange-500/15 text-orange-400",
    tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  {
    icon: <Video size={22} />,
    title: "Weekly Progress Demos",
    desc: "Every week we run a live walkthrough of what was built — you see it working in a real browser, ask questions, and approve before we move forward. No surprises at launch.",
    tag: "Aligned",
    color: "from-green-500/15 to-green-600/5 border-green-500/20",
    iconColor: "bg-green-500/15 text-green-400",
    tagColor: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    icon: <GitBranch size={22} />,
    title: "Full Version History & Changelogs",
    desc: "Every change is logged, versioned, and reversible. You always know what was updated, when, and why — and we can roll back anything at any time. Your codebase, your control.",
    tag: "Traceability",
    color: "from-teal-500/15 to-teal-600/5 border-teal-500/20",
    iconColor: "bg-teal-500/15 text-teal-400",
    tagColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  },
  {
    icon: <Users2 size={22} />,
    title: "Direct Developer Access",
    desc: "No account managers. No middle layers. You talk directly to the engineers building your platform. Faster decisions, faster fixes, and a team that actually understands your product.",
    tag: "No Middlemen",
    color: "from-rose-500/15 to-rose-600/5 border-rose-500/20",
    iconColor: "bg-rose-500/15 text-rose-400",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
];

export default function WorkWithYou() {
  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-b border-[var(--border)] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Users2 size={14} />
            Partnership, Not Just a Project
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-white mb-4"
          >
            We Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-1 inline-block">
              With You
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto"
          >
            We don&apos;t disappear after kickoff. From first wireframe to post-launch, you
            have a dedicated team working in lockstep with Real HR Soft.
          </motion.p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 28 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group flex flex-col gap-4 p-6 rounded-2xl border bg-gradient-to-br ${p.color} hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              {/* Icon + tag row */}
              <div className="flex items-start justify-between gap-3">
                <div className={`p-2.5 rounded-xl ${p.iconColor} shrink-0`}>
                  {p.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${p.tagColor}`} style={{ lineHeight: 1.4 }}>
                  {p.tag}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-bold font-syne text-white mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]"
        >
          <div>
            <p className="text-white font-bold text-lg font-syne">
              Ready to see this in action?
            </p>
            <p className="text-[var(--text-muted)] text-sm mt-0.5">
              Accept the proposal and your dedicated team is assigned within 24 hours.
            </p>
          </div>
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-orange-500/20 whitespace-nowrap shrink-0"
          >
            View Proposal
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
