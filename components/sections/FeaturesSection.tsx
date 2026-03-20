"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  MonitorSmartphone,
  Sparkles,
  LayoutDashboard,
  CheckCircle2,
  FileCheck2,
  Code2,
  MessageSquare,
  PlaySquare,
  Users,
  BoxSelect,
  Briefcase,
  FileText,
  Settings,
  Package,
} from "lucide-react";

// Tab 1 Data
const mainWebsiteFeatures = [
  {
    title: "Core Pages",
    icon: MonitorSmartphone,
    items: ["Home (Conversion-focused)", "About Us", "Team", "Products/Services", "Contact Page"],
  },
  {
    title: "Legal & Compliance",
    icon: FileCheck2,
    items: ["Terms & Conditions", "Privacy Policy", "Refund Policy", "CCPA Compliance", "Cookie Consent"],
  },
  {
    title: "SEO & Technical",
    icon: Code2,
    items: ["XML Sitemap", "robots.txt Setup", "On-page SEO Optimization", "Fast Page Loads", "Mobile Responsive"],
  },
];

// Tab 3 Data
const adminModules = [
  { icon: LayoutDashboard, name: "Dashboard", desc: "Key metrics and charts at a glance." },
  { icon: Users, name: "Customer Management", desc: "Database of leads with search and filters." },
  { icon: BoxSelect, name: "AI Leads", desc: "Automated tracking of potential customers." },
  { icon: MessageSquare, name: "Contact Forms", desc: "Searchable form submissions with statuses." },
  { icon: Briefcase, name: "Jobs Management", desc: "Post jobs and move applicants through pipeline." },
  { icon: FileText, name: "Blog System", desc: "Publish SEO-ready articles from the admin." },
  { icon: Settings, name: "Settings Panel", desc: "Edit site info and toggle features easily." },
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<"website" | "advanced" | "admin">("website");

  return (
    <section id="features" className="py-24 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Package size={14} />
            Full-Stack Delivery
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-white mb-4"
          >
            Everything{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              You Get
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed"
          >
            One platform. Every tool Real HR Soft needs to attract, convert, and retain clients.
          </motion.p>
        </div>

        {/* Tabs — horizontal scroll on mobile, centered row on desktop */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--border)] overflow-x-auto scrollbar-none w-full max-w-max mx-auto">
            {([
              { id: "website", label: "Main Website", icon: MonitorSmartphone },
              { id: "advanced", label: "Advanced Features", icon: Sparkles },
              { id: "admin", label: "Admin Panel", icon: LayoutDashboard },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap shrink-0 text-sm sm:text-base",
                  activeTab === tab.id
                    ? "bg-[var(--accent)] text-white shadow-md"
                    : "text-[var(--text-muted)] hover:text-white"
                )}
              >
                <tab.icon size={16} className="shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Main Website Tab */}
          {activeTab === "website" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {mainWebsiteFeatures.map((col, idx) => (
                <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6">
                  <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                    <col.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-syne text-white mb-4">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--text-muted)]">
                        <CheckCircle2 size={18} className="text-[var(--accent-light)] shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}

          {/* Advanced Features Tab */}
          {activeTab === "advanced" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden group hover:border-[var(--accent)] transition-colors">
                <div className="absolute top-6 right-6 bg-orange-500/20 text-[var(--accent)] text-xs font-bold px-3 py-1.5 rounded-full border border-orange-500/30 leading-none">
                  Optional Add-on
                </div>
                <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center text-[var(--accent)] mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare size={28} />
                </div>
                <h3 className="text-2xl font-bold font-syne text-white mb-4">AI Chatbot</h3>
                <ul className="space-y-4">
                  {[
                    "Answers questions 24/7 automatically",
                    "Learns from your business data & FAQs",
                    "Qualifies leads instantly",
                    "Filters serious clients from visitors",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--text-muted)]">
                      <CheckCircle2 size={18} className="text-[var(--accent-light)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden group hover:border-[var(--accent)] transition-colors">
                <div className="absolute top-6 right-6 bg-orange-500/20 text-[var(--accent)] text-xs font-bold px-3 py-1.5 rounded-full border border-orange-500/30 leading-none">
                  Optional Add-on
                </div>
                <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center text-[var(--accent)] mb-6 group-hover:scale-110 transition-transform">
                  <PlaySquare size={28} />
                </div>
                <h3 className="text-2xl font-bold font-syne text-white mb-4">Interactive Demo</h3>
                <ul className="space-y-4">
                  {[
                    "Working preview of admin system",
                    "Visitors test drive before buying",
                    "Dramatically increases trust",
                    "Real feel accelerates conversions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--text-muted)]">
                      <CheckCircle2 size={18} className="text-[var(--accent-light)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Admin Panel Tab */}
          {activeTab === "admin" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {adminModules.map((mod, idx) => (
                <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 hover:bg-[var(--bg-secondary)] transition-colors cursor-default">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)]">
                      <mod.icon size={20} />
                    </div>
                    <h4 className="font-bold font-syne text-white">{mod.name}</h4>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm">{mod.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
