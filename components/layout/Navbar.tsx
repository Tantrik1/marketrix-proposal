"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const links = [
    { label: "About",     href: "#about" },
    { label: "Features",  href: "#features" },
    { label: "Process",   href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
  ];

  return (
    <>
      {/* ── Main Nav ── */}
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.06] py-2.5 shadow-[0_1px_40px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-b border-transparent py-4"
        )}
      >
        {/* Hairline top accent — visible only when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent origin-center"
            />
          )}
        </AnimatePresence>

        <div className="container mx-auto px-5 sm:px-6 max-w-7xl flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            {/* Logo badge */}
            <div className="relative shrink-0">
              {/* Subtle navy glow behind the logo to blend navy bg with site bg */}
              <div className="absolute inset-0 rounded-xl bg-[#0d1b2e]/80 blur-md scale-110 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/marketrix-logo-main.jpeg"
                alt="Marketrix Nepal"
                width={44}
                height={44}
                className="relative h-10 w-10 rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300"
                priority
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-7 bg-white/10" />

            {/* Text lockup */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/90">
                Marketrix Nepal
              </span>
              <span className="text-[10px] tracking-wider text-white/35 mt-0.5 font-medium">
                Proposal for Real HR Soft
              </span>
            </div>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                {/* Animated underline dot */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform duration-200" />
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-2" />

            {/* CTA */}
            <Link
              href="#pricing"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-sm transition-all duration-200 shadow-[0_2px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_28px_rgba(249,115,22,0.45)] hover:-translate-y-px"
            >
              View Proposal
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden relative z-50 w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu (full-screen overlay) ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Blurred dark backdrop */}
            <div className="absolute inset-0 bg-[#09090b]/97 backdrop-blur-xl" />

            {/* Navy accent blob (mirrors logo bg) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#0d1b2e]/50 rounded-full blur-[80px] pointer-events-none" />

            {/* Content */}
            <div className="relative flex flex-col min-h-screen pt-24 pb-12 px-8">
              {/* Links */}
              <nav className="flex flex-col gap-2 flex-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-white/[0.07] text-2xl font-bold font-syne text-white/80 hover:text-white transition-colors group"
                    >
                      {link.label}
                      <ArrowRight size={18} className="text-zinc-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-8 space-y-3"
              >
                <Link
                  href="#pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base rounded-xl shadow-[0_4px_30px_rgba(249,115,22,0.35)]"
                >
                  View Proposal
                  <ArrowRight size={16} />
                </Link>
                <p className="text-center text-[11px] text-zinc-600">
                  Proposal exclusively prepared for Real HR Soft
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
