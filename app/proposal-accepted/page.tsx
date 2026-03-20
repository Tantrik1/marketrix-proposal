"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Mail, Calendar, Users, Zap, Monitor, Bot, BarChart2, Layers, Globe, SearchCheck, Link2, Sparkles } from "lucide-react";
import Link from "next/link";

/* Mirror of PACKAGE and ADDONS from PricingEstimator */
const PACKAGE = {
  name: "Standard Package",
  price: 79999,
  tagline: "Full website + admin panel",
  features: [
    "Full Multi-Page Website",
    "Mobile Responsive Design",
    "Contact & Lead Forms",
    "Complete Admin Panel",
    "Google Analytics Setup",
    "SEO Foundation Setup",
    "Domain + Hosting (Year 1)",
  ],
};

const ADDON_MAP: Record<string, { name: string; price: number; isYearly?: boolean; icon: React.ReactNode }> = {
  demo_website:       { name: "Interactive Demo Website",    price: 35000, icon: <Monitor size={15} /> },
  ai_chatbot:         { name: "AI Chatbot",                  price: 49999, isYearly: true, icon: <Bot size={15} /> },
  ai_leads:           { name: "AI Leads System",             price: 20000, icon: <Sparkles size={15} /> },
  product_page:       { name: "Product Page Management",     price: 10000, icon: <Layers size={15} /> },
  service_page:       { name: "Service Page Management",     price: 15000, icon: <Globe size={15} /> },
  advanced_seo:       { name: "Advanced SEO",                price: 15000, icon: <SearchCheck size={15} /> },
  conversion_tracking:{ name: "Conversion Tracking",         price: 10000, icon: <BarChart2 size={15} /> },
  crm_integration:    { name: "CRM Integration",             price: 25000, icon: <Link2 size={15} /> },
};

interface ProposalState {
  addonIds: string[];
  componentCount: number;
  discountName: string | null;
  discountAmount: number;
  total: number;
}

const steps = [
  { icon: <Mail size={18} />, title: "Confirmation Email", desc: "You'll receive a confirmation email at your inbox within the next few minutes." },
  { icon: <Users size={18} />, title: "Team Assignment", desc: "Your dedicated Marketrix team is assigned within 24 hours of acceptance." },
  { icon: <Calendar size={18} />, title: "Kickoff Call", desc: "We'll schedule a project kickoff call to align on scope, timeline, and goals." },
  { icon: <Zap size={18} />, title: "Build Begins", desc: "Week 1 starts: planning, wireframes, and design. You'll see progress immediately." },
];

export default function ProposalAccepted() {
  const [proposal, setProposal] = useState<ProposalState | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("marketrix_proposal");
    if (raw) {
      try {
        setProposal(JSON.parse(raw));
      } catch {
        /* ignore parse errors */
      }
    }
  }, []);

  const addons = proposal ? proposal.addonIds.map(id => ADDON_MAP[id]).filter(Boolean) : [];
  const componentPrice = proposal ? proposal.componentCount * 15000 : 0;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-24 px-4 sm:px-6">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-500/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative">

        {/* ── Hero: Success state ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Animated tick */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl scale-150" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="relative w-24 h-24 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center"
              >
                <Check size={40} className="text-green-400" strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Check size={14} />
              Proposal Accepted — Reference: MX-RHS-2025
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-syne text-white leading-snug mb-4">
              Welcome aboard,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                Real HR Soft!
              </span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
              Your proposal has been confirmed. A confirmation email is on its way to your inbox.
              The Marketrix team will reach out within <strong className="text-white">24 hours</strong>.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Two-column: Summary + Next Steps ── */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 mb-12">

          {/* Proposal Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-[var(--border)] bg-gradient-to-r from-orange-500/8 to-transparent">
              <h2 className="text-lg font-bold font-syne text-white">Your Accepted Proposal</h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">From Marketrix Nepal → Real HR Soft</p>
            </div>

            <div className="p-6 space-y-5">
              {/* Base package */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">Base Package</p>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold">{PACKAGE.name}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{PACKAGE.tagline}</p>
                  </div>
                  <p className="text-white font-bold text-sm whitespace-nowrap ml-4">NPR {PACKAGE.price.toLocaleString()}</p>
                </div>

                {/* Feature list */}
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                  {PACKAGE.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span className="w-3.5 h-3.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center shrink-0">
                        <Check size={8} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add-ons */}
              {addons.length > 0 && (
                <div className="pt-4 border-t border-[var(--border)]/50">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">Add-ons</p>
                  <div className="space-y-2">
                    {addons.map((a, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2 text-[var(--text-muted)]">
                          <span className="text-[var(--accent)]">{a.icon}</span>
                          {a.name}{a.isYearly ? " (yearly)" : ""}
                        </span>
                        <span className="text-white font-medium">NPR {a.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3D components */}
              {proposal && proposal.componentCount > 0 && (
                <div className="flex justify-between items-center text-sm pt-4 border-t border-[var(--border)]/50">
                  <span className="text-[var(--text-muted)]">3D Components ({proposal.componentCount}×)</span>
                  <span className="text-white font-medium">NPR {componentPrice.toLocaleString()}</span>
                </div>
              )}

              {/* Infrastructure */}
              <div className="flex items-center gap-3 p-3 bg-green-500/8 border border-green-500/20 rounded-xl pt-4 border-t-0 mt-0">
                <Check size={14} className="text-green-400 shrink-0" />
                <span className="text-xs text-green-400 font-medium">Domain + Hosting — Year 1 included at no cost</span>
              </div>

              {/* Discount */}
              {proposal?.discountName && (
                <div className="flex justify-between text-sm p-3 bg-green-500/8 border border-green-500/20 rounded-xl">
                  <span className="text-green-400 font-semibold flex items-center gap-1.5">
                    <Check size={13} /> {proposal.discountName}
                  </span>
                  <span className="text-green-400 font-bold">−NPR {proposal.discountAmount.toLocaleString()}</span>
                </div>
              )}

              {/* Total */}
              <div className="pt-4 border-t border-[var(--border)] flex justify-between items-end">
                <span className="text-[var(--text-muted)] text-sm">Total Investment</span>
                <div className="text-right">
                  <p className="text-3xl font-bold font-syne text-[var(--accent)] leading-none pb-0.5">
                    NPR {proposal ? proposal.total.toLocaleString() : PACKAGE.price.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1">one-time · no hidden fees</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-bold font-syne text-white px-1">What Happens Next</h2>
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 p-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/30 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 border border-[var(--accent)]/20">
                  {step.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-snug">{step.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}

            {/* Email notice */}
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={14} className="text-[var(--accent)] shrink-0" />
                <p className="text-white text-sm font-semibold">Confirmation email sent to</p>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono">info@marketrixnepal.com.np</p>
              <p className="text-xs text-[var(--text-muted)] font-mono">info@tantriktech.com.np</p>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="text-center"
        >
          <p className="text-[var(--text-muted)] text-sm mb-6">
            Questions? Reach us directly at{" "}
            <a href="mailto:info@marketrixnepal.com.np" className="text-[var(--accent)] hover:underline font-medium">
              info@marketrixnepal.com.np
            </a>
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/25 hover:-translate-y-0.5"
          >
            Back to Proposal
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
