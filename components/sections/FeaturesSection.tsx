"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  MonitorSmartphone, LayoutDashboard, CheckCircle2, FileCheck2, Code2,
  PlaySquare, Briefcase, FileText, Settings, Package,
  Rss, BarChart3, Calendar, SearchCheck, Bot, ExternalLink,
  Database, TrendingUp, Send, Shield, Edit3,
  User, PlusCircle, MousePointerClick, Zap,
  Layers, Star, Activity, Target, Link2, Brain,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

type TabId = "website" | "blog" | "admin" | "ai" | "demo";
type AdminMod = "dashboard" | "blog" | "careers" | "seo" | "settings";

/* ─── Chat Data ──────────────────────────────────────────────────── */

const CHAT = [
  { role: "user" as const, text: "Hi! What HR solutions does Real HR Soft offer?" },
  { role: "ai" as const, text: "Welcome! 👋 We offer complete HR management — employee records, payroll, attendance & performance analytics. Want a live demo?" },
  { role: "user" as const, text: "How quickly can you respond to queries?" },
  { role: "ai" as const, text: "Instantly, 24/7! I'm trained on your docs and knowledge base. I can also qualify leads and book calls with your team automatically. 🚀" },
];

/* ─── Sub-Components ──────────────────────────────────────────────── */

function ChatDemo({ chatKey }: { chatKey: number }) {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => { setVisible(0); setTyping(false); }, [chatKey]);

  useEffect(() => {
    if (visible >= CHAT.length) return;
    const isAI = CHAT[visible].role === "ai";
    const delay = visible === 0 ? 700 : isAI ? 900 : 1800;
    const t = setTimeout(() => {
      if (isAI) {
        setTyping(true);
        const t2 = setTimeout(() => { setTyping(false); setVisible(v => v + 1); }, 1400);
        return () => clearTimeout(t2);
      } else {
        setVisible(v => v + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]/60 shrink-0">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/30">
            <Bot size={17} className="text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[var(--card-bg)]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Real HR Soft Assistant</p>
          <p className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Online · AI-Powered
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-1 rounded-full">
          <Brain size={10} className="text-[var(--accent)]" />
          <span className="text-[9px] text-[var(--text-muted)]">200MB KB</span>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 min-h-[200px] flex-1">
        <AnimatePresence>
          {CHAT.slice(0, visible).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn("flex gap-2 items-end", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "ai" && (
                <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Bot size={11} className="text-[var(--accent)]" />
                </div>
              )}
              <div className={cn(
                "max-w-[78%] text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed",
                msg.role === "user"
                  ? "bg-[var(--accent)] text-white rounded-br-sm"
                  : "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)] rounded-bl-sm"
              )}>
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                  <User size={11} className="text-zinc-300" />
                </div>
              )}
            </motion.div>
          ))}

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-end">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                <Bot size={11} className="text-[var(--accent)]" />
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border)] px-3.5 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                {[0, 0.18, 0.36].map((delay, i) => (
                  <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay }}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-[var(--border)] bg-[var(--bg-secondary)]/30 shrink-0">
        <div className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-zinc-600">
          Ask anything about Real HR Soft...
        </div>
        <button className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
          <Send size={13} className="text-white" />
        </button>
      </div>
    </div>
  );
}

/* ─── Admin Panel Content Views ──────────────────────────────────── */

function AdminDashboard() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Total Users", value: "2,481", change: "+12% this week", color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Active Jobs", value: "7", change: "3 new openings", color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Blog Posts", value: "24", change: "+3 this month", color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Form Leads", value: "183", change: "+28 today", color: "text-purple-400", bg: "bg-purple-500/10" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-xl border border-[var(--border)] p-3", s.bg)}>
            <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{s.label}</p>
            <p className={cn("text-xl font-bold font-syne mt-1", s.color)}>{s.value}</p>
            <p className="text-[9px] text-[var(--text-muted)] mt-0.5">{s.change}</p>
          </div>
        ))}
      </div>
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-3">
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">Recent Activity</p>
        {[
          { dot: "bg-green-400", text: "New lead from /pricing — Aarav Sharma" },
          { dot: "bg-blue-400", text: "Blog post scheduled for Mar 25" },
          { dot: "bg-orange-400", text: "3 new job applications" },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[var(--border)]/50 last:border-0">
            <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", a.dot)} />
            <p className="text-[11px] text-[var(--text-muted)]">{a.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBlog() {
  return (
    <div className="space-y-2">
      {[
        { title: "Top HR Trends in 2025", status: "Published", date: "Mar 20", seo: 88 },
        { title: "Why Payroll Automation Matters", status: "Scheduled", date: "Mar 25", seo: 76 },
        { title: "Employee Retention Strategies", status: "Draft", date: "—", seo: 42 },
      ].map((post) => (
        <div key={post.title} className="flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-3 py-2.5">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{post.title}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{post.date} · SEO {post.seo}/100</p>
          </div>
          <span className={cn("text-[9px] font-bold px-2 py-1 rounded-full whitespace-nowrap",
            post.status === "Published" ? "bg-green-500/15 text-green-400" :
            post.status === "Scheduled" ? "bg-blue-500/15 text-blue-400" :
            "bg-zinc-700/50 text-zinc-400"
          )}>{post.status}</span>
        </div>
      ))}
      <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-muted)] text-xs hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all">
        <PlusCircle size={12} /> New Blog Post
      </button>
    </div>
  );
}

function AdminCareers() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: "Applied", count: 12, color: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
          { label: "Screen", count: 5, color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25" },
          { label: "Interview", count: 3, color: "bg-purple-500/15 text-purple-400 border-purple-500/25" },
          { label: "Offer", count: 1, color: "bg-green-500/15 text-green-400 border-green-500/25" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-xl border p-2 text-center", s.color)}>
            <p className="text-lg font-bold font-syne">{s.count}</p>
            <p className="text-[9px] font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {[
          { role: "Full-Stack Developer", apps: 8, status: "Active" },
          { role: "HR Manager", apps: 4, status: "Active" },
          { role: "Product Designer", apps: 6, status: "Closed" },
        ].map((job) => (
          <div key={job.role} className="flex items-center justify-between bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-white">{job.role}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{job.apps} applicants</p>
            </div>
            <span className={cn("text-[9px] font-bold px-2 py-1 rounded-full",
              job.status === "Active" ? "bg-green-500/15 text-green-400" : "bg-zinc-700/50 text-zinc-400"
            )}>{job.status}</span>
          </div>
        ))}
        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-muted)] text-xs hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all">
          <PlusCircle size={12} /> Post a New Job
        </button>
      </div>
    </div>
  );
}

function AdminSEO() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Sessions", value: "12.4K", sub: "↑ 18%" },
          { label: "Users", value: "8.2K", sub: "↑ 12%" },
          { label: "Bounce", value: "34.2%", sub: "↓ 5%" },
        ].map((m) => (
          <div key={m.label} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-2.5 text-center">
            <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{m.label}</p>
            <p className="text-sm font-bold text-white font-syne mt-1">{m.value}</p>
            <p className="text-[9px] text-green-400 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Top Pages</p>
        {[
          { page: "/blog/hr-trends", visits: 2341, pct: 78 },
          { page: "/features", visits: 1892, pct: 62 },
          { page: "/pricing", visits: 1204, pct: 40 },
        ].map((p) => (
          <div key={p.page} className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--text-muted)] truncate max-w-[60%]">{p.page}</span>
              <span className="text-white font-semibold">{p.visits.toLocaleString()}</span>
            </div>
            <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ duration: 0.9, delay: 0.1 }}
                className="h-full bg-[var(--accent)] rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div className="space-y-2">
      {[
        { label: "Site Name", value: "Real HR Soft" },
        { label: "Contact Email", value: "hello@realhrsoft.com" },
        { label: "SEO Title", value: "Real HR Soft — HR Made Simple" },
        { label: "Blog Enabled", value: "✓ Active" },
      ].map((s) => (
        <div key={s.label} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-3 py-2.5">
          <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{s.label}</p>
          <p className="text-xs text-white font-medium mt-0.5">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

function InteractiveAdminPanel() {
  const [active, setActive] = useState<AdminMod>("dashboard");
  const modules: { id: AdminMod; icon: React.ElementType; label: string }[] = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "blog", icon: Rss, label: "Blog" },
    { id: "careers", icon: Briefcase, label: "Careers" },
    { id: "seo", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-md px-3 py-1 text-[10px] text-[var(--text-muted)]">
          admin.realhrsoft.com
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
      </div>

      {/* Admin layout */}
      <div className="flex" style={{ minHeight: 320 }}>
        {/* Sidebar */}
        <div className="w-[110px] sm:w-[130px] border-r border-[var(--border)] bg-[var(--bg-secondary)]/40 p-2 shrink-0">
          <p className="text-[8px] uppercase tracking-widest text-[var(--text-muted)] font-bold px-2 mb-2">Menu</p>
          <nav className="space-y-0.5">
            {modules.map((mod) => (
              <button key={mod.id} onClick={() => setActive(mod.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-all duration-200",
                  active === mod.id
                    ? "bg-[var(--accent)] text-white shadow-sm shadow-orange-500/20"
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                )}
              >
                <mod.icon size={12} className="shrink-0" />
                <span className="text-[10px] font-medium">{mod.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 overflow-hidden">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-xs font-bold text-white font-syne capitalize">{active}</p>
            <span className="text-[9px] text-[var(--text-muted)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-0.5 rounded-full">Real HR Soft</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.14 }}>
              {active === "dashboard" && <AdminDashboard />}
              {active === "blog" && <AdminBlog />}
              {active === "careers" && <AdminCareers />}
              {active === "seo" && <AdminSEO />}
              {active === "settings" && <AdminSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Blog & SEO Mock ────────────────────────────────────────────── */

function BlogEditorMock() {
  const [scheduled, setScheduled] = useState(true);
  const [score] = useState(82);

  return (
    <div className="space-y-4">
      {/* Blog editor */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 size={13} className="text-[var(--accent)]" />
            <span className="text-xs font-bold text-white">Blog Post Editor</span>
          </div>
          <span className="text-[9px] bg-blue-500/15 text-blue-400 border border-blue-500/25 px-2 py-1 rounded-full font-bold">Admin Panel</span>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2">
          <p className="text-[9px] text-[var(--text-muted)] mb-0.5 uppercase tracking-wider">Post Title</p>
          <p className="text-sm text-white font-medium">Top 5 HR Trends You Need in 2025</p>
        </div>

        {/* Schedule toggle */}
        <div className="flex items-center justify-between bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Calendar size={12} className="text-blue-400" />
            <span className="text-xs text-white">Schedule Post</span>
          </div>
          <div className="flex items-center gap-2">
            {scheduled && <span className="text-[10px] text-blue-400">Mar 25 · 10:00 AM</span>}
            <button onClick={() => setScheduled(!scheduled)}
              className={cn("w-8 h-4.5 h-[18px] rounded-full relative transition-all duration-200", scheduled ? "bg-[var(--accent)]" : "bg-zinc-700")}
            >
              <span className={cn("absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all duration-200", scheduled ? "left-[17px]" : "left-0.5")} />
            </button>
          </div>
        </div>

        {/* SEO Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-[var(--text-muted)]"><SearchCheck size={11} /> SEO Score</span>
            <span className="font-bold text-green-400">{score}/100 · Good</span>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${score}%` }} viewport={{ once: true }} transition={{ duration: 1.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
          </div>
          <div className="space-y-1">
            {[
              { ok: true, text: "Title: 52 chars (optimal)" },
              { ok: true, text: "Meta description set" },
              { ok: false, text: "Add 2 more focus keywords" },
            ].map((item) => (
              <p key={item.text} className={cn("text-[10px] flex items-center gap-1.5", item.ok ? "text-green-400" : "text-yellow-400")}>
                {item.ok ? <CheckCircle2 size={10} /> : <span className="text-[9px] font-bold">!</span>}
                {item.text}
              </p>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] text-[11px] hover:border-[var(--accent)]/30 transition-colors">Draft</button>
          <button className="px-3 py-1.5 rounded-lg border border-blue-500/30 text-blue-400 text-[11px] hover:bg-blue-500/10 transition-colors">
            {scheduled ? "Schedule" : "Publish Now"}
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-[11px] shadow-sm shadow-orange-500/20">Publish</button>
        </div>
      </div>

      {/* Analytics mini */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={13} className="text-[var(--accent)]" />
            <span className="text-xs font-bold text-white">Google Analytics</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400">Connected</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Sessions", value: "12.4K" },
            { label: "Users", value: "8.2K" },
            { label: "Bounce", value: "34.2%" },
          ].map((m) => (
            <div key={m.label} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-2 text-center">
              <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{m.label}</p>
              <p className="text-sm font-bold text-white font-syne mt-0.5">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { page: "/blog/hr-trends", pct: 78 },
            { page: "/features", pct: 62 },
            { page: "/pricing", pct: 40 },
          ].map((p) => (
            <div key={p.page} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-[var(--text-muted)]">{p.page}</span>
                <span className="text-white font-semibold">{Math.round(p.pct * 30)}+</span>
              </div>
              <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${p.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
                  className="h-full bg-[var(--accent)] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Demo Mock ──────────────────────────────────────────────────── */

function DemoMock() {
  const [activeDemo, setActiveDemo] = useState<"payroll" | "employees" | "analytics">("employees");
  const demoTabs = [
    { id: "employees" as const, label: "Employees" },
    { id: "payroll" as const, label: "Payroll" },
    { id: "analytics" as const, label: "Analytics" },
  ];

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-md px-3 py-1 text-[10px] text-[var(--text-muted)]">
          demo.realhrsoft.com — Try Live
        </div>
        <span className="text-[9px] text-[var(--accent)] font-bold bg-orange-500/10 border border-orange-500/25 px-2 py-0.5 rounded-full">Interactive</span>
      </div>

      {/* Demo nav */}
      <div className="flex border-b border-[var(--border)] bg-[var(--bg-secondary)]/30">
        {demoTabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveDemo(tab.id)}
            className={cn("flex-1 py-2.5 text-xs font-semibold transition-all",
              activeDemo === tab.id ? "text-white border-b-2 border-[var(--accent)]" : "text-[var(--text-muted)] hover:text-white"
            )}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="p-4" style={{ minHeight: 220 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeDemo} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {activeDemo === "employees" && (
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">Employee Directory</p>
                {[
                  { name: "Aarav Sharma", role: "HR Manager", status: "Active" },
                  { name: "Priya Thakur", role: "Developer", status: "Active" },
                  { name: "Rajan Karki", role: "Designer", status: "On Leave" },
                ].map((emp) => (
                  <div key={emp.name} className="flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-3 py-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center text-[10px] font-bold text-[var(--accent)]">
                      {emp.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">{emp.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{emp.role}</p>
                    </div>
                    <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full",
                      emp.status === "Active" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                    )}>{emp.status}</span>
                  </div>
                ))}
              </div>
            )}
            {activeDemo === "payroll" && (
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">March 2026 Payroll</p>
                {[
                  { name: "Aarav Sharma", amount: "NPR 85,000", status: "Processed" },
                  { name: "Priya Thakur", amount: "NPR 72,000", status: "Pending" },
                  { name: "Rajan Karki", amount: "NPR 65,000", status: "Processed" },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-3 py-2">
                    <p className="text-xs text-white font-semibold">{p.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--accent)]">{p.amount}</span>
                      <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full",
                        p.status === "Processed" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                      )}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeDemo === "analytics" && (
              <div className="space-y-3">
                <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">Performance Overview</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Retention Rate", value: "94%", color: "text-green-400" },
                    { label: "Avg Performance", value: "4.2/5", color: "text-blue-400" },
                    { label: "Open Positions", value: "7", color: "text-orange-400" },
                    { label: "Satisfaction", value: "87%", color: "text-purple-400" },
                  ].map((m) => (
                    <div key={m.label} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-2.5 text-center">
                      <p className={cn("text-base font-bold font-syne", m.color)}>{m.value}</p>
                      <p className="text-[9px] text-[var(--text-muted)] mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--accent)]/30 bg-orange-500/5 text-[var(--accent)] text-xs font-semibold">
          <MousePointerClick size={13} />
          This is an interactive demo — click tabs above to explore
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

const TABS: { id: TabId; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "website", label: "Website", icon: MonitorSmartphone },
  { id: "blog", label: "Blog & SEO", icon: Rss, badge: "New" },
  { id: "admin", label: "Admin Panel", icon: LayoutDashboard },
  { id: "ai", label: "AI Chatbot", icon: Bot, badge: "Hot" },
  { id: "demo", label: "Interactive Demo", icon: PlaySquare },
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<TabId>("website");
  const [chatKey, setChatKey] = useState(0);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    if (id === "ai") setChatKey(k => k + 1);
  };

  return (
    <section id="features" className="py-24 bg-[var(--bg-secondary)] border-b border-[var(--border)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <Package size={14} /> Full-Stack Delivery
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-white mb-4"
          >
            Everything{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-1 inline-block">You Get</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed"
          >
            One platform. Every tool Real HR Soft needs to attract, convert, and retain clients.
          </motion.p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--border)] overflow-x-auto scrollbar-none gap-0.5">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap shrink-0 text-sm",
                  activeTab === tab.id ? "bg-[var(--accent)] text-white shadow-md shadow-orange-500/20" : "text-[var(--text-muted)] hover:text-white"
                )}
              >
                <tab.icon size={15} className="shrink-0" />
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                {tab.badge && (
                  <span className={cn(
                    "text-[8px] font-black px-1.5 py-0.5 rounded-full leading-none",
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-orange-500/20 text-orange-400"
                  )}>{tab.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

            {/* ═══ WEBSITE TAB ═══ */}
            {activeTab === "website" && (
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    title: "Core Pages", icon: MonitorSmartphone,
                    color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20",
                    items: ["Home (Conversion-focused)", "About Us", "Team", "Products/Services", "Contact Page"],
                  },
                  {
                    title: "Legal & Compliance", icon: FileCheck2,
                    color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20",
                    items: ["Terms & Conditions", "Privacy Policy", "Refund Policy", "CCPA Compliance", "Cookie Consent"],
                  },
                  {
                    title: "SEO & Technical", icon: Code2,
                    color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20",
                    items: ["XML Sitemap", "robots.txt Setup", "On-page SEO Optimization", "Fast Page Loads", "Mobile Responsive"],
                  },
                ].map((col) => (
                  <div key={col.title} className={cn("bg-[var(--card-bg)] border rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-colors", col.border)}>
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-5", col.bg)}>
                      <col.icon size={22} className={col.color} />
                    </div>
                    <h3 className="text-lg font-bold font-syne text-white mb-4">{col.title}</h3>
                    <ul className="space-y-2.5">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[var(--text-muted)]">
                          <CheckCircle2 size={15} className={cn("shrink-0 mt-0.5", col.color)} />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* ═══ BLOG & SEO TAB ═══ */}
            {activeTab === "blog" && (
              <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
                {/* Left: Feature list */}
                <div className="space-y-8">
                  {[
                    {
                      icon: Rss, title: "Blog Management", color: "text-orange-400", bg: "bg-orange-500/10",
                      features: [
                        "Write & publish blog posts with rich text editor",
                        "Schedule posts for future dates & times",
                        "Manage drafts, categories, and tags",
                        "Real-time SEO scoring per article (0–100)",
                        "Meta title, description & keyword optimization",
                        "Category-based content organization",
                      ],
                    },
                    {
                      icon: BarChart3, title: "Google Analytics Integration", color: "text-blue-400", bg: "bg-blue-500/10",
                      features: [
                        "One-click Google Analytics connection in admin",
                        "Sessions, users & bounce rate dashboard",
                        "Top performing pages & traffic sources",
                        "Keyword and content performance insights",
                        "Actionable SEO improvement suggestions",
                        "Real-time visitor tracking & behavior flow",
                      ],
                    },
                  ].map((section) => (
                    <div key={section.title}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn("p-2.5 rounded-xl", section.bg)}>
                          <section.icon size={18} className={section.color} />
                        </div>
                        <h4 className="font-bold font-syne text-white text-lg">{section.title}</h4>
                      </div>
                      <ul className="space-y-2.5 pl-1">
                        {section.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                            <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right: Visual mock */}
                <div className="lg:sticky lg:top-[100px]">
                  <BlogEditorMock />
                </div>
              </div>
            )}

            {/* ═══ ADMIN PANEL TAB ═══ */}
            {activeTab === "admin" && (
              <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
                {/* Left: Feature list */}
                <div className="space-y-7">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-purple-500/10">
                        <LayoutDashboard size={18} className="text-purple-400" />
                      </div>
                      <h4 className="font-bold font-syne text-white text-lg">Full Admin Panel</h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: LayoutDashboard, name: "Dashboard", desc: "Key metrics and charts at a glance." },
                        { icon: Rss, name: "Blog System", desc: "Write, schedule & publish SEO-ready articles." },
                        { icon: Briefcase, name: "Careers", desc: "Post jobs, manage applicants through pipeline." },
                        { icon: BarChart3, name: "SEO & Analytics", desc: "Connected Google Analytics, traffic insights." },
                        { icon: FileText, name: "Contact Forms", desc: "Searchable submissions with statuses." },
                        { icon: Settings, name: "Settings Panel", desc: "Edit site info, toggle features instantly." },
                      ].map((mod) => (
                        <div key={mod.name} className="flex items-start gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--accent)]/30 transition-colors cursor-default">
                          <div className="p-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] shrink-0">
                            <mod.icon size={15} />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white text-sm">{mod.name}</h5>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">{mod.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-green-500/10">
                        <Briefcase size={18} className="text-green-400" />
                      </div>
                      <h4 className="font-bold font-syne text-white text-lg">Careers Management</h4>
                    </div>
                    <ul className="space-y-2.5 pl-1">
                      {[
                        "Post and manage job openings from admin panel",
                        "Applicant pipeline: Applied → Screening → Interview → Offer",
                        "Update roles, descriptions, and requirements easily",
                        "View applicant count and move candidates through stages",
                        "Mark positions as Active or Closed instantly",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                          <CheckCircle2 size={15} className="text-green-400 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Interactive admin mock */}
                <div className="lg:sticky lg:top-[100px]">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3 text-center">
                    Click the sidebar to explore ↓
                  </p>
                  <InteractiveAdminPanel />
                </div>
              </div>
            )}

            {/* ═══ AI CHATBOT TAB ═══ */}
            {activeTab === "ai" && (
              <div className="space-y-8">
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Database, label: "Knowledge Base", value: "200 MB", color: "text-blue-400", bg: "bg-blue-500/10" },
                    { icon: Zap, label: "Response Time", value: "< 2 sec", color: "text-yellow-400", bg: "bg-yellow-500/10" },
                    { icon: Activity, label: "Availability", value: "24/7", color: "text-green-400", bg: "bg-green-500/10" },
                    { icon: Target, label: "Lead Conversion", value: "Smart AI", color: "text-purple-400", bg: "bg-purple-500/10" },
                  ].map((s) => (
                    <div key={s.label} className={cn("rounded-2xl border border-[var(--border)] p-4 text-center", s.bg)}>
                      <div className="flex justify-center mb-2">
                        <s.icon size={20} className={s.color} />
                      </div>
                      <p className={cn("text-lg font-bold font-syne", s.color)}>{s.value}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Chat + features */}
                <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
                  {/* Left: Chat demo */}
                  <div className="space-y-4">
                    <ChatDemo chatKey={chatKey} />

                    {/* Live example links */}
                    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3">Live Examples — Real Deployments</p>
                      <div className="space-y-2">
                        {[
                          {
                            href: "https://tantriktech.com.np/chat",
                            name: "TantrikTech AI Chat",
                            desc: "SaaS company — lead qualification & docs bot",
                            badge: "Live",
                          },
                          {
                            href: "https://danfetea.com",
                            name: "Danfe Tea AI Assistant",
                            desc: "E-commerce — product discovery & sales bot",
                            badge: "Live",
                          },
                        ].map((ex) => (
                          <a key={ex.href} href={ex.href} target="_blank" rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-3 bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)]/50 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-[var(--accent)]/5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/25 flex items-center justify-center">
                                <Bot size={14} className="text-[var(--accent)]" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white group-hover:text-[var(--accent)] transition-colors">{ex.name}</p>
                                <p className="text-[10px] text-[var(--text-muted)]">{ex.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[9px] font-bold bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full">{ex.badge}</span>
                              <ExternalLink size={13} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                            </div>
                          </a>
                        ))}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] mt-3 text-center">
                        Your chatbot will be trained on Real HR Soft&apos;s data &amp; docs
                      </p>
                    </div>
                  </div>

                  {/* Right: Features */}
                  <div className="space-y-4">
                    {[
                      {
                        icon: Brain,
                        title: "Documentation AI",
                        color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20",
                        desc: "Trained on your docs, FAQs, and service pages. Visitors get instant, accurate answers without waiting for a human rep.",
                        features: ["Answers questions from your knowledge base", "Up to 200MB of documents supported", "PDF, docs, web pages all accepted"],
                      },
                      {
                        icon: Target,
                        title: "Sales & Conversion Assistant",
                        color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20",
                        desc: "Guides visitors through your offering, qualifies them as leads, and moves them toward booking a call or signing up.",
                        features: ["Smart lead qualification flows", "Auto-routes hot leads to your sales team", "Conversion-optimized response sequences"],
                      },
                      {
                        icon: Zap,
                        title: "Automated Flows",
                        color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20",
                        desc: "Set up trigger-based automations — demo requests, pricing inquiries, and follow-ups happen without manual effort.",
                        features: ["Auto-booking and scheduling integration", "CRM sync for captured leads", "Custom trigger and response rules"],
                      },
                    ].map((card) => (
                      <div key={card.title} className={cn("rounded-2xl border p-5", card.border, card.bg)}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--border)]">
                            <card.icon size={16} className={card.color} />
                          </div>
                          <h4 className="font-bold font-syne text-white text-sm">{card.title}</h4>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">{card.desc}</p>
                        <ul className="space-y-1.5">
                          {card.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                              <CheckCircle2 size={12} className={cn("shrink-0 mt-0.5", card.color)} />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ INTERACTIVE DEMO TAB ═══ */}
            {activeTab === "demo" && (
              <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
                {/* Left: Description */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                      <Star size={11} className="fill-orange-400" /> Optional Add-on · Most Requested for SaaS
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-syne text-white mb-4 leading-tight">
                      Let Visitors<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-1 inline-block">
                        Try Before They Buy
                      </span>
                    </h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      An interactive demo website gives potential clients a hands-on feel of your HR software before committing. Visitors explore real workflows — adding employees, running payroll, viewing analytics — which builds massive trust and dramatically accelerates conversions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: MousePointerClick, color: "text-orange-400", bg: "bg-orange-500/10",
                        title: "Clickable Workflows",
                        desc: "Visitors navigate through real HR flows: onboarding, payroll, reports — all interactive.",
                      },
                      {
                        icon: Layers, color: "text-blue-400", bg: "bg-blue-500/10",
                        title: "3D Animations & Showcases",
                        desc: "Premium 3D elements that make your software look cutting-edge and enterprise-grade.",
                      },
                      {
                        icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10",
                        title: "Converts Visitors to Buyers",
                        desc: "SaaS companies with interactive demos see 40%+ higher trial signups. Show, don't tell.",
                      },
                      {
                        icon: Link2, color: "text-purple-400", bg: "bg-purple-500/10",
                        title: "Separate Demo URL",
                        desc: "Lives at demo.realhrsoft.com — share it in sales calls, emails, and social media.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/30 transition-colors">
                        <div className={cn("p-2.5 rounded-xl shrink-0 mt-0.5", item.bg)}>
                          <item.icon size={16} className={item.color} />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Demo mock */}
                <div className="lg:sticky lg:top-[100px]">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-3 text-center">
                    Interactive preview — click tabs to explore ↓
                  </p>
                  <DemoMock />

                  <div className="mt-4 flex items-center gap-3 p-4 rounded-xl border border-green-500/25 bg-green-500/5">
                    <Shield size={15} className="text-green-400 shrink-0" />
                    <p className="text-xs text-[var(--text-muted)]">
                      <span className="text-green-400 font-semibold">Domain + Hosting included</span> — your demo is hosted at no extra infrastructure cost.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
