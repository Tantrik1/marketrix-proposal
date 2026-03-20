"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, Clock, Users, Zap, Shield, Sparkles, X, Send, Loader2 } from "lucide-react";
import { useState } from "react";

const trustPoints = [
  { icon: <CheckCircle size={15} />, text: "No hidden costs" },
  { icon: <Clock size={15} />, text: "4-week delivery" },
  { icon: <Shield size={15} />, text: "Satisfaction guaranteed" },
  { icon: <Users size={15} />, text: "38+ businesses served" },
];

const stats = [
  { value: "38+", label: "Clients Delivered" },
  { value: "99%", label: "System Uptime" },
  { value: "4 wks", label: "Avg. Delivery" },
  { value: "Page 1", label: "SEO Results" },
];

function FeatureRequestModal({ onClose }: { onClose: () => void }) {
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!features.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feature-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-lg bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold font-syne text-white mb-2">Request Received!</h3>
            <p className="text-[var(--text-muted)] text-sm">
              We&apos;ll review your feature request and get back to you soon.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold rounded-xl transition-colors text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-syne text-white">Request a Feature</h3>
                <p className="text-xs text-[var(--text-muted)]">We&apos;ll review and reach out to discuss</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold text-[var(--text-muted)] mb-2">
                What features specifically are you looking for?
              </label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="e.g. Custom employee leave tracker, Payroll export to Excel, Mobile app for field staff..."
                rows={5}
                className="w-full bg-[var(--bg-primary)] border border-[var(--border)] focus:border-orange-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-[var(--text-muted)]/50 resize-none transition-colors"
                required
              />

              {status === "error" && (
                <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
              )}

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-5 py-3 border border-[var(--border)] hover:border-[var(--accent)]/40 text-[var(--text-muted)] hover:text-white font-semibold text-sm rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "sending" || !features.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.25)]"
                >
                  {status === "sending" ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Submit Request</>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function FinalCTA() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <AnimatePresence>
      {showModal && <FeatureRequestModal onClose={() => setShowModal(false)} />}
    </AnimatePresence>
    <section className="relative pt-32 overflow-hidden bg-[var(--bg-primary)]">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-orange-600/5 rounded-full blur-[80px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-orange-400 text-sm font-semibold px-5 py-2.5 rounded-full">
            <Zap size={14} className="fill-orange-400" />
            Limited Slots Available — Book Your Spot Now
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-syne text-white text-center mb-6 leading-snug"
        >
          Ready to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Dominate
          </span>{" "}
          Your Market?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Get a fully custom AI-powered platform built for your business — transparent pricing,
          no fluff, launched in 4 weeks or less.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4 text-center hover:border-orange-500/30 transition-colors">
              <div className="text-2xl font-bold font-syne text-[var(--accent)] mb-0.5">{s.value}</div>
              <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-base rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Build My Package
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="mailto:info@marketrixnepal.com.np?subject=Let%27s%20Talk%20%E2%80%93%20Real%20HR%20Soft%20Proposal&body=Hi%20Marketrix%20Nepal%2C%0A%0AWe%27d%20like%20to%20schedule%20a%20call%20to%20discuss%20the%20proposal.%0A%0ARegards%2C%0AReal%20HR%20Soft"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[var(--border)] hover:border-[var(--accent)]/50 text-white font-semibold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Phone size={16} />
            Schedule Free Call
          </a>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5 text-orange-400 font-semibold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Sparkles size={16} />
            Ask for More Features
          </button>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          {trustPoints.map((point, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] bg-[var(--card-bg)] border border-[var(--border)] px-3 py-1.5 rounded-full">
              <span className="text-green-400">{point.icon}</span>
              {point.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
}
