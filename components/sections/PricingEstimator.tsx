"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info, Check, Plus, Minus, Zap, Shield, Star,
  Globe, Bot, BarChart2, Layers, Link2, SearchCheck, Monitor, ArrowRight,
  Sparkles, Loader2, X, Receipt, ChevronRight, ChevronDown, Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Data ─────────────────────────────────────────────────────────── */

const PACKAGE = {
  id: "standard",
  name: "Standard Package",
  price: 79999,
  tagline: "Full website + admin panel",
  featureGroups: [
    {
      label: "Website",
      items: ["Full Multi-Page Website", "Mobile Responsive Design", "Contact & Lead Forms"],
    },
    {
      label: "Admin",
      items: ["Complete Admin Panel", "Google Analytics Setup"],
    },
    {
      label: "Foundation",
      items: ["SEO Foundation Setup", "Domain + Hosting (Year 1)"],
    },
  ],
};

const ADDONS = [
  {
    id: "demo_website",
    name: "Interactive Demo Website",
    price: 35000,
    type: "highlight",
    icon: <Monitor size={16} />,
    tooltip: "A live, immersive demo of your HR software — animations, 3D previews & real interactions that convert visitors.",
    note: "Most requested for SaaS",
  },
  {
    id: "ai_chatbot",
    name: "AI Chatbot",
    price: 49999,
    isYearly: true,
    type: "ai",
    icon: <Bot size={16} />,
    tooltip: "24/7 automated lead qualification tailored to your data.",
  },
  {
    id: "ai_leads",
    name: "AI Leads System",
    price: 20000,
    type: "ai",
    icon: <Sparkles size={16} />,
    tooltip: "Auto-categorizes and tracks potential customers via AI.",
  },
  {
    id: "product_page",
    name: "Product Page Management",
    price: 10000,
    type: "core",
    icon: <Layers size={16} />,
    tooltip: "Add, edit, and manage products from your admin panel.",
  },
  {
    id: "service_page",
    name: "Service Page Management",
    price: 15000,
    type: "core",
    icon: <Globe size={16} />,
    tooltip: "Manage services, pricing packages, and details natively.",
  },
  {
    id: "advanced_seo",
    name: "Advanced SEO",
    price: 15000,
    type: "marketing",
    icon: <SearchCheck size={16} />,
    tooltip: "Deep on-page optimizations, structured data, advanced keyword targeting.",
  },
  {
    id: "conversion_tracking",
    name: "Conversion Tracking",
    price: 10000,
    type: "marketing",
    icon: <BarChart2 size={16} />,
    tooltip: "Google Analytics, Tag Manager, and Facebook Pixel properly configured.",
  },
  {
    id: "crm_integration",
    name: "CRM Integration",
    price: 25000,
    type: "marketing",
    icon: <Link2 size={16} />,
    tooltip: "Connect your website to HubSpot, Salesforce, or Zoho.",
  },
];

const ADDON_GROUP_ORDER = ["highlight", "ai", "core", "marketing"];
const ADDON_GROUP_LABEL: Record<string, string> = {
  highlight: "Recommended for SaaS",
  ai: "AI & Automation",
  core: "Content Management",
  marketing: "Marketing & Growth",
};

/* ─── Component ─────────────────────────────────────────────────────── */

export default function PricingEstimator() {
  const router = useRouter();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [componentCount, setComponentCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [packageExpanded, setPackageExpanded] = useState(false);

  const addonsPrice = selectedAddons.reduce((acc, id) => {
    return acc + (ADDONS.find((a) => a.id === id)?.price || 0);
  }, 0);
  const componentPrice = componentCount * 15000;
  const subtotal = PACKAGE.price + addonsPrice + componentPrice;

  const appliedDiscount = useMemo(() => {
    const rules = [
      {
        condition: selectedAddons.includes("demo_website") && selectedAddons.includes("ai_chatbot") && selectedAddons.includes("ai_leads"),
        rate: 0.08, name: "SaaS Bundle Discount",
      },
      {
        condition: selectedAddons.includes("crm_integration") && selectedAddons.includes("advanced_seo"),
        rate: 0.10, name: "Pro Business Bundle",
      },
      {
        condition: selectedAddons.length >= 3,
        rate: 0.05, name: "Multi-feature Discount",
      },
    ];
    return rules.filter(r => r.condition).sort((a, b) => b.rate - a.rate)[0] || null;
  }, [selectedAddons]);

  const discountAmount = appliedDiscount ? Math.round(subtotal * appliedDiscount.rate) : 0;
  const total = subtotal - discountAmount;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleAccept = async () => {
    setSubmitting(true);
    try {
      const proposalState = {
        addonIds: selectedAddons,
        componentCount,
        discountName: appliedDiscount?.name ?? null,
        discountAmount,
        total,
      };
      sessionStorage.setItem("marketrix_proposal", JSON.stringify(proposalState));

      fetch("/api/accept-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: PACKAGE.name,
          packagePrice: PACKAGE.price,
          addons: selectedAddons.map(id => {
            const a = ADDONS.find(x => x.id === id);
            return { id, name: a?.name ?? id, price: a?.price ?? 0, isYearly: (a as typeof a & { isYearly?: boolean })?.isYearly ?? false };
          }),
          componentCount,
          componentPrice,
          subtotal,
          discountName: appliedDiscount?.name ?? null,
          discountAmount,
          total,
        }),
      }).catch(console.error);

      router.push("/proposal-accepted");
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const groupedAddons = ADDON_GROUP_ORDER.map(type => ({
    type,
    label: ADDON_GROUP_LABEL[type],
    items: ADDONS.filter(a => a.type === type),
  }));

  const totalItems = selectedAddons.length + (componentCount > 0 ? 1 : 0);

  return (
    <section id="pricing" className="py-24 bg-[var(--bg-primary)] border-b border-[var(--border)] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">

        {/* ── Section Header ── */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Star size={13} className="fill-orange-400" />
            Transparent · No Hidden Costs · One-Time Investment
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-white mb-3"
          >
            Your Investment Breakdown
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-[var(--text-muted)] text-lg max-w-xl mx-auto"
          >
            Handcrafted exclusively for Real HR Soft. Customise below and see your total update live.
          </motion.p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 xl:gap-12 items-start">

          {/* ─ Left: Builder ─ */}
          <div className="space-y-8 pb-32 lg:pb-0">

            {/* Base Package Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border-2 border-[var(--accent)] shadow-xl shadow-orange-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 via-orange-900/20 to-transparent rounded-[14px] pointer-events-none" />

              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="text-[11px] font-bold px-3 py-2 rounded-full bg-[var(--accent)] text-white tracking-widest uppercase" style={{ lineHeight: 1 }}>
                    Base Package
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[var(--accent)] text-white shadow-md shadow-orange-500/30">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-syne text-white">{PACKAGE.name}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{PACKAGE.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5 shrink-0">
                    <span className="text-[var(--text-muted)] text-base font-medium mb-2">NPR</span>
                    <span className="text-4xl sm:text-5xl font-bold font-syne text-white leading-[1.15] pb-0.5">
                      {PACKAGE.price.toLocaleString()}
                    </span>
                    <span className="text-[var(--text-muted)] text-xs mb-2">one-time</span>
                  </div>
                </div>

                {/* Features grouped */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {PACKAGE.featureGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold mb-2.5">{group.label}</p>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center shrink-0">
                              <Check size={10} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Add-ons */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center text-sm shadow-md shadow-orange-500/20">+</div>
                <h3 className="text-xl font-bold font-syne text-white">Enhance Your Package</h3>
                <span className="text-xs text-[var(--text-muted)] bg-[var(--card-bg)] border border-[var(--border)] px-2 py-1 rounded-full">Optional</span>
              </div>

              <div className="space-y-5">
                {groupedAddons.map(({ type, label, items }) => (
                  <div key={type}>
                    <p className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3 pl-1">{label}</p>
                    <div className={cn(
                      "gap-3",
                      type === "highlight" ? "flex flex-col" : "grid sm:grid-cols-2"
                    )}>
                      {items.map((addon) => {
                        const isSelected = selectedAddons.includes(addon.id);
                        const isHighlight = addon.type === "highlight";
                        return (
                          <motion.button
                            key={addon.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleAddon(addon.id)}
                            className={cn(
                              "group w-full text-left flex items-start gap-4 rounded-xl border transition-all duration-200 cursor-pointer",
                              isHighlight ? "p-5" : "p-4",
                              isSelected && isHighlight
                                ? "border-[var(--accent)] bg-gradient-to-r from-orange-900/40 to-orange-800/10 shadow-md shadow-orange-500/10"
                                : isSelected
                                ? "border-[var(--accent)] bg-[var(--accent)]/5 shadow-sm shadow-orange-500/10"
                                : isHighlight
                                ? "border-orange-500/30 bg-orange-500/5 hover:border-[var(--accent)]/60"
                                : "border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/40"
                            )}
                          >
                            {/* Checkbox */}
                            <div className={cn(
                              "mt-0.5 w-5 h-5 rounded-md border flex shrink-0 items-center justify-center transition-all",
                              isSelected ? "bg-[var(--accent)] border-[var(--accent)] shadow-sm shadow-orange-500/20" : "border-zinc-600"
                            )}>
                              <AnimatePresence>
                                {isSelected && (
                                  <motion.span
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                  >
                                    <Check size={12} className="text-white" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={cn(isSelected ? "text-[var(--accent)]" : "text-[var(--text-muted)]")}>
                                  {addon.icon}
                                </span>
                                <span className={cn("font-semibold", isHighlight ? "text-base text-white" : "text-sm text-white")}>
                                  {addon.name}
                                </span>
                                {addon.note && (
                                  <span className="text-[10px] bg-orange-500/20 border border-orange-500/30 text-orange-400 px-2 py-1 rounded-full font-bold leading-none">
                                    {addon.note}
                                  </span>
                                )}
                                <span className="relative flex cursor-help group/tip">
                                  <Info size={12} className="text-zinc-600 hover:text-zinc-400" />
                                  <span className="invisible opacity-0 group-hover/tip:visible group-hover/tip:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-3 bg-[var(--bg-secondary)] border border-[var(--border)] text-xs text-[var(--text-muted)] rounded-xl shadow-2xl z-30 pointer-events-none transition-all text-left">
                                    {addon.tooltip}
                                  </span>
                                </span>
                              </div>
                              {isHighlight && (
                                <p className="text-xs text-[var(--text-muted)] mt-1 mb-2 leading-relaxed">
                                  A live, interactive preview of Real HR Soft with animations, 3D showcases & real interactions.
                                </p>
                              )}
                              <p className={cn("font-bold mt-1", isHighlight ? "text-sm text-[var(--accent)]" : "text-xs text-[var(--accent)]")}>
                                + NPR {addon.price.toLocaleString()} {addon.isYearly ? "/ year" : ""}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* 3D Components Stepper */}
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3 pl-1">Premium Components</p>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/30 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">3D Animation Component</span>
                        <span className="relative flex cursor-help group/tip">
                          <Info size={12} className="text-zinc-600 hover:text-zinc-400" />
                          <span className="invisible opacity-0 group-hover/tip:visible group-hover/tip:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-[var(--bg-secondary)] border border-[var(--border)] text-xs text-[var(--text-muted)] rounded-xl shadow-2xl z-30 pointer-events-none transition-all">
                            Premium 3D web elements — spinning product models, interactive data graphs, immersive hero animations.
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-[var(--accent)] font-bold mt-1">+ NPR 15,000 per component</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <button
                        onClick={() => setComponentCount(prev => Math.max(0, prev - 1))}
                        disabled={componentCount === 0}
                        className="w-9 h-9 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white hover:border-[var(--accent)]/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-8 text-center font-bold font-syne text-xl text-white tabular-nums">{componentCount}</span>
                      <button
                        onClick={() => setComponentCount(prev => Math.min(10, prev + 1))}
                        className="w-9 h-9 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white hover:border-[var(--accent)]/40 transition-all"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure — free year */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-green-500/25 bg-green-500/5">
              <div className="p-2 bg-green-500/15 text-green-400 rounded-lg shrink-0 mt-0.5">
                <Shield size={18} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-0.5">Domain + Hosting — First Year Included</h4>
                <p className="text-green-400 text-xs font-medium">Fully covered at no extra cost. No setup fees.</p>
                <p className="text-[var(--text-muted)] text-xs mt-1">Renewal from Year 2: NPR 15,000 / year</p>
              </div>
            </div>
          </div>

          {/* ─ Right: Sticky Proposal Summary (desktop only) ─ */}
          <div className="lg:sticky lg:top-[100px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-2xl overflow-hidden"
            >
              {/* Summary header */}
              <div className="px-6 py-5 border-b border-[var(--border)] bg-gradient-to-r from-orange-500/8 to-transparent">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-bold">Investment Summary</span>
                  <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-1 rounded-full leading-none">Live Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-xs">M</div>
                    <span className="text-xs text-[var(--text-muted)]">Marketrix Nepal</span>
                  </div>
                  <ArrowRight size={12} className="text-[var(--text-muted)]" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white font-bold text-xs">R</div>
                    <span className="text-xs text-[var(--text-muted)]">Real HR Soft</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Base line */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white text-sm font-semibold">{PACKAGE.name}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{PACKAGE.tagline}</p>
                  </div>
                  <p className="text-white text-sm font-bold whitespace-nowrap ml-3">NPR {PACKAGE.price.toLocaleString()}</p>
                </div>

                {/* Selected add-ons */}
                <AnimatePresence>
                  {selectedAddons.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-[var(--border)]/50 space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">Add-ons Selected</p>
                        {selectedAddons.map(id => {
                          const ad = ADDONS.find(a => a.id === id);
                          return (
                            <div key={id} className="flex justify-between items-center text-xs">
                              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                                <span className="text-[var(--accent)]">{ad?.icon}</span>
                                {ad?.name}
                              </span>
                              <span className="text-white font-medium">+{ad?.price?.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3D components */}
                <AnimatePresence>
                  {componentCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex justify-between items-center text-xs pt-3 border-t border-[var(--border)]/50">
                        <span className="text-[var(--text-muted)]">{componentCount}× 3D Component{componentCount > 1 ? "s" : ""}</span>
                        <span className="text-white font-medium">+{componentPrice.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Discount */}
                <AnimatePresence>
                  {appliedDiscount && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-xs p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <span className="text-green-400 font-semibold flex items-center gap-1.5">
                          <Check size={12} />
                          {appliedDiscount.name}
                        </span>
                        <span className="text-green-400 font-bold">−{discountAmount.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Total */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm text-[var(--text-muted)]">Total Investment</span>
                    {appliedDiscount && (
                      <span className="text-sm text-zinc-600 line-through">NPR {subtotal.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex items-end justify-end gap-1">
                    <span className="text-sm text-[var(--text-muted)] mb-1.5">NPR</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0.5, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-bold font-syne text-[var(--accent)] leading-[1.15] pb-0.5"
                    >
                      {total.toLocaleString()}
                    </motion.span>
                  </div>
                  <p className="text-right text-[10px] text-[var(--text-muted)] mt-1">one-time · no hidden fees</p>
                </div>

                {/* Accept CTA */}
                <button
                  onClick={handleAccept}
                  disabled={submitting}
                  className="group w-full flex items-center justify-center gap-2 py-4 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Accept This Proposal
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-zinc-600">
                  A confirmation email will be sent on acceptance
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE SIDE DRAWER (cart-style)
      ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/75 backdrop-blur-sm z-[60]"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220, mass: 0.9 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-[92vw] max-w-[420px] bg-[var(--bg-secondary)] z-[61] flex flex-col shadow-2xl shadow-black/50 border-l border-[var(--border)]"
            >
              {/* ── Drawer Header ── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-gradient-to-r from-orange-500/8 to-transparent shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-md shadow-orange-500/30">
                      <Receipt size={17} className="text-white" />
                    </div>
                    <AnimatePresence>
                      {totalItems > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <span className="text-[10px] font-bold text-white">{totalItems}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <h3 className="font-bold text-white font-syne text-base leading-tight">Your Proposal</h3>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      {totalItems === 0 ? "No add-ons yet" : `${selectedAddons.length} add-on${selectedAddons.length !== 1 ? "s" : ""}${componentCount > 0 ? ` + ${componentCount} 3D` : ""}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-9 h-9 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)]/40 transition-all active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Proposal flow label ── */}
              <div className="flex items-center gap-2 px-5 py-3 bg-[var(--card-bg)]/50 border-b border-[var(--border)]/50 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[var(--accent)] flex items-center justify-center text-white font-bold text-[10px]">M</div>
                  <span className="text-[11px] text-[var(--text-muted)]">Marketrix Nepal</span>
                </div>
                <ArrowRight size={11} className="text-[var(--text-muted)]" />
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white font-bold text-[10px]">R</div>
                  <span className="text-[11px] text-[var(--text-muted)]">Real HR Soft</span>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-[var(--text-muted)]">Live</span>
                </div>
              </div>

              {/* ── Scrollable Content ── */}
              <div className="flex-1 overflow-y-auto overscroll-contain">

                {/* Base Package — accordion */}
                <div className="border-b border-[var(--border)]/50">
                  <button
                    onClick={() => setPackageExpanded(e => !e)}
                    className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] shrink-0">
                      <Zap size={15} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-white">{PACKAGE.name}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{PACKAGE.tagline}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <p className="text-sm font-bold text-white">NPR {PACKAGE.price.toLocaleString()}</p>
                      <motion.div animate={{ rotate: packageExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={15} className="text-[var(--text-muted)]" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {packageExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 space-y-3">
                          {PACKAGE.featureGroups.map((group) => (
                            <div key={group.label}>
                              <p className="text-[9px] uppercase tracking-widest text-[var(--accent)] font-bold mb-1.5">{group.label}</p>
                              <ul className="space-y-1.5">
                                {group.items.map((item) => (
                                  <li key={item} className="flex items-center gap-2 text-xs text-white/75">
                                    <span className="w-3.5 h-3.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center shrink-0">
                                      <Check size={8} />
                                    </span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add-ons Section */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center text-xs">+</div>
                    <h4 className="text-sm font-bold font-syne text-white">Enhance Your Package</h4>
                    <span className="text-[10px] text-[var(--text-muted)] bg-[var(--card-bg)] border border-[var(--border)] px-1.5 py-0.5 rounded-full">Optional</span>
                  </div>

                  <div className="space-y-5">
                    {groupedAddons.map(({ type, label, items }, groupIdx) => (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: groupIdx * 0.06 }}
                      >
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-2.5 pl-0.5">{label}</p>
                        <div className="space-y-2">
                          {items.map((addon) => {
                            const isSelected = selectedAddons.includes(addon.id);
                            const isHighlight = addon.type === "highlight";
                            return (
                              <motion.button
                                key={addon.id}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => toggleAddon(addon.id)}
                                className={cn(
                                  "w-full text-left flex items-center gap-3 rounded-xl border transition-all duration-200 p-3",
                                  isSelected && isHighlight
                                    ? "border-[var(--accent)] bg-gradient-to-r from-orange-900/40 to-orange-800/10 shadow-sm shadow-orange-500/10"
                                    : isSelected
                                    ? "border-[var(--accent)] bg-[var(--accent)]/8"
                                    : isHighlight
                                    ? "border-orange-500/30 bg-orange-500/5 hover:border-[var(--accent)]/60"
                                    : "border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/30"
                                )}
                              >
                                {/* Checkbox */}
                                <div className={cn(
                                  "w-5 h-5 rounded-md border flex shrink-0 items-center justify-center transition-all",
                                  isSelected ? "bg-[var(--accent)] border-[var(--accent)]" : "border-zinc-600"
                                )}>
                                  <AnimatePresence>
                                    {isSelected && (
                                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                        <Check size={11} className="text-white" />
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </div>

                                {/* Icon */}
                                <span className={cn(
                                  "shrink-0 transition-colors",
                                  isSelected ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                                )}>
                                  {addon.icon}
                                </span>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-sm font-semibold text-white leading-tight">{addon.name}</span>
                                    {addon.note && (
                                      <span className="text-[9px] bg-orange-500/20 border border-orange-500/30 text-orange-400 px-1.5 py-0.5 rounded-full font-bold leading-none whitespace-nowrap">
                                        {addon.note}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[var(--accent)] font-bold mt-0.5">
                                    + NPR {addon.price.toLocaleString()}{addon.isYearly ? " / yr" : ""}
                                  </p>
                                </div>

                                {/* Chevron */}
                                <ChevronRight size={14} className={cn(
                                  "shrink-0 transition-all",
                                  isSelected ? "text-[var(--accent)] rotate-90" : "text-zinc-700"
                                )} />
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}

                    {/* 3D Components Stepper */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 }}
                    >
                      <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-2.5 pl-0.5">Premium Components</p>
                      <div className={cn(
                        "flex items-center justify-between p-3 rounded-xl border transition-all duration-200",
                        componentCount > 0
                          ? "border-[var(--accent)] bg-[var(--accent)]/8"
                          : "border-[var(--border)] bg-[var(--card-bg)]"
                      )}>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">3D Animation Component</p>
                          <p className="text-[11px] text-[var(--accent)] font-bold mt-0.5">+ NPR 15,000 / component</p>
                        </div>
                        <div className="flex items-center gap-2.5 ml-3 shrink-0">
                          <button
                            onClick={() => setComponentCount(prev => Math.max(0, prev - 1))}
                            disabled={componentCount === 0}
                            className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white hover:border-[var(--accent)]/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                          >
                            <Minus size={13} />
                          </button>
                          <motion.span
                            key={componentCount}
                            initial={{ scale: 1.3, opacity: 0.6 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-7 text-center font-bold font-syne text-lg text-white tabular-nums"
                          >
                            {componentCount}
                          </motion.span>
                          <button
                            onClick={() => setComponentCount(prev => Math.min(10, prev + 1))}
                            className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-white hover:border-[var(--accent)]/40 transition-all active:scale-90"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Infrastructure note */}
                <div className="mx-5 mb-5 flex items-start gap-3 p-3.5 rounded-xl border border-green-500/25 bg-green-500/5">
                  <Shield size={15} className="text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Domain + Hosting — Year 1 Included</p>
                    <p className="text-[11px] text-green-400 font-medium mt-0.5">No setup fees. Renews at NPR 15,000 / yr.</p>
                  </div>
                </div>

                {/* Breakdown summary */}
                <div className="mx-5 mb-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--border)]/60 bg-[var(--bg-secondary)]/50">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Breakdown</p>
                  </div>
                  <div className="p-4 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[var(--text-muted)]">Standard Package</span>
                      <span className="text-white font-semibold">NPR {PACKAGE.price.toLocaleString()}</span>
                    </div>

                    <AnimatePresence>
                      {selectedAddons.map(id => {
                        const ad = ADDONS.find(a => a.id === id);
                        return (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex justify-between items-center text-xs pt-0.5">
                              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                                <span className="text-[var(--accent)]">{ad?.icon}</span>
                                {ad?.name}
                              </span>
                              <span className="text-white font-semibold">+{ad?.price?.toLocaleString()}</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    <AnimatePresence>
                      {componentCount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex justify-between items-center text-xs pt-0.5">
                            <span className="text-[var(--text-muted)]">{componentCount}× 3D Component{componentCount > 1 ? "s" : ""}</span>
                            <span className="text-white font-semibold">+{componentPrice.toLocaleString()}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {appliedDiscount && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center justify-between text-xs p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg mt-1">
                            <span className="text-green-400 font-semibold flex items-center gap-1.5">
                              <Tag size={11} />
                              {appliedDiscount.name}
                            </span>
                            <span className="text-green-400 font-bold">−{discountAmount.toLocaleString()}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Spacer for sticky footer */}
                <div className="h-4" />
              </div>

              {/* ── Sticky Drawer Footer ── */}
              <div className="shrink-0 border-t border-[var(--border)] bg-[var(--bg-secondary)] px-5 pt-4 pb-6 shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
                {/* Total row */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">Total Investment</p>
                    {appliedDiscount && (
                      <p className="text-xs text-zinc-600 line-through mt-0.5">NPR {subtotal.toLocaleString()}</p>
                    )}
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-sm text-[var(--text-muted)] mb-1">NPR</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0.4, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", damping: 14 }}
                      className="text-3xl font-bold font-syne text-[var(--accent)] leading-none"
                    >
                      {total.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                {/* Accept CTA */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAccept}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-orange-500/25 text-sm disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

                  {submitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Accept This Proposal
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-[10px] text-zinc-600 mt-2.5">
                  A confirmation email will be sent on acceptance
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE STICKY BOTTOM BAR
      ══════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)]/95 backdrop-blur-md border-t border-[var(--border)] px-4 py-3 shadow-2xl z-40">
        <div className="flex items-center gap-3">
          {/* Total display */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-bold">Total</p>
            <div className="flex items-end gap-1">
              <span className="text-[11px] text-[var(--text-muted)] mb-0.5">NPR</span>
              <motion.span
                key={total}
                initial={{ opacity: 0.4, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 14 }}
                className="text-xl font-bold font-syne text-[var(--accent)]"
              >
                {total.toLocaleString()}
              </motion.span>
              {appliedDiscount && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-0.5 ml-1 text-[10px] bg-green-500/15 text-green-400 border border-green-500/25 px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap"
                >
                  {Math.round(appliedDiscount.rate * 100)}% off
                </motion.span>
              )}
            </div>
          </div>

          {/* See Details button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 px-5 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 text-sm transition-all duration-200 overflow-hidden group shrink-0"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
            <Receipt size={15} className="shrink-0" />
            <span>See Details</span>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-white text-[var(--accent)] text-[10px] font-black flex items-center justify-center shrink-0"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
