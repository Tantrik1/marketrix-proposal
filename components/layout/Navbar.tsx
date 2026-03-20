"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Process", href: "#process" },
    { label: "Portfolio", href: "#portfolio" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-[var(--bg-primary)]/80 backdrop-blur-md border-[var(--border)] py-3 shadow-sm"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 relative z-50">
            <Image
              src="/marketrix-logo.png"
              alt="Marketrix"
              width={40}
              height={40}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold font-syne text-white tracking-tight leading-snug">
                Marketrix
              </span>
              <span className="text-[10px] text-[var(--text-muted)] leading-snug hidden sm:block">
                Proposal for Real HR Soft
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#pricing"
              className="px-5 py-2.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] transition-colors rounded-lg font-bold text-sm shadow-md shadow-orange-500/20"
            >
              View Proposal
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white relative z-50 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] pt-24 px-6 md:hidden flex flex-col items-center gap-6"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold font-syne text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-8 py-4 w-full bg-[var(--accent)] text-white font-bold text-center rounded-xl shadow-md shadow-orange-500/20"
            >
              View Proposal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
