"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap } from "lucide-react";

const included = [
  "Multi-Page Site",
  "Admin Panel",
  "SEO Ready",
  "Lead Engine",
  "Career Management",
  "Domain + Hosting"
];

export default function HeroSection() {
  const [leads, setLeads] = useState(0);
  const [clients, setClients] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeads((prev) => (prev < 142 ? prev + 2 : prev));
      setClients((prev) => (prev < 38 ? prev + 1 : prev));
      setUptime((prev) => (prev < 99 ? prev + 1 : 99));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[var(--bg-primary)] overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-500/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-orange-600/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 z-10 max-w-7xl pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left Side ── */}
          <div className="flex flex-col">
            {/* Exclusive badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-7 self-start"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]" />
              </span>
              <span className="text-sm font-semibold text-[var(--accent)] tracking-wide font-syne uppercase">
                Exclusive Proposal for Real HR Soft
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-syne leading-[1.1] mb-6"
            >
              We&apos;ve thought of a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 pb-1 inline-block">
                SaaS Landing Page
              </span>{" "}
              for{" "}
              <span className="underline decoration-orange-500/50 decoration-2 underline-offset-4">
                Real HR Soft
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mb-8 leading-relaxed"
            >
              A fully custom, AI-enhanced platform — built to showcase your HR software,
              capture qualified leads, and convert visitors into paying clients.
            </motion.p>

            {/* What you get — inline chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mb-10"
            >
              <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">Everything included</p>
              <div className="flex flex-wrap gap-2">
                {included.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs bg-[var(--card-bg)] border border-[var(--border)] text-white/80 px-3 py-1.5 rounded-full"
                  >
                    <CheckCircle size={11} className="text-[var(--accent)] shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="#features"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] transition-all duration-200 rounded-xl font-bold text-base shadow-lg shadow-orange-500/25 hover:-translate-y-0.5"
              >
                See What&apos;s Included
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-[var(--border)] text-white hover:border-[var(--accent)]/50 hover:bg-[var(--bg-secondary)] transition-all duration-200 rounded-xl font-semibold text-base"
              >
                Build My Package
              </Link>
            </motion.div>
          </div>

          {/* ── Right Side: Admin Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-orange-500/8 rounded-3xl blur-xl" />

            <div className="relative border border-[var(--border)] bg-[var(--card-bg)] rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="ml-3 flex-1 bg-[var(--card-bg)] rounded-md flex items-center px-3 py-1.5">
                  <span className="text-[10px] text-[var(--text-muted)] font-mono leading-none">admin.realhrsoft.com.np</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5 space-y-5">
                {/* Top metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Leads", value: leads, icon: <TrendingUp size={14} />, color: "text-[var(--accent)]" },
                    { label: "Total Clients", value: clients, icon: <Users size={14} />, color: "text-blue-400" },
                    { label: "Uptime", value: `${uptime}%`, icon: <Zap size={14} />, color: "text-green-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-[var(--bg-secondary)] rounded-xl p-3 border border-[var(--border)]/60">
                      <div className={`${m.color} mb-1.5 flex items-center gap-1`}>
                        {m.icon}
                        <span className="text-[10px] font-medium text-[var(--text-muted)]">{m.label}</span>
                      </div>
                      <div className={`text-2xl font-bold font-syne ${m.color}`}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--border)]/60">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-white">Lead Activity</span>
                    <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-1 rounded-full leading-none">↑ 24% this month</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-orange-600/80 to-orange-400/60 transition-all"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent leads list */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">Recent Leads</p>
                  {[
                    { name: "Apex Solutions Pvt.", status: "Hot", dot: "bg-orange-400" },
                    { name: "Himalayan Ventures", status: "New", dot: "bg-blue-400" },
                    { name: "Summit Corp Ltd.", status: "Warm", dot: "bg-yellow-400" },
                  ].map((lead, i) => (
                    <div key={i} className="flex items-center justify-between bg-[var(--bg-secondary)] rounded-lg px-3 py-2 border border-[var(--border)]/40">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                          {lead.name.charAt(0)}
                        </div>
                        <span className="text-xs text-white font-medium">{lead.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${lead.dot}`} />
                        <span className="text-[10px] text-[var(--text-muted)]">{lead.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
        >
          {[
            { value: "38+", label: "Websites Built" },
            { value: "99.99%", label: "Avg System Uptime" },
            { value: "4 Weeks", label: "Delivery Timeline" },
            { value: "#1", label: "On Google Rankings" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-bold font-syne text-white mb-1">{stat.value}</div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
