import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-white/[0.06] pt-14 pb-10 overflow-hidden">
      {/* Navy ambient glow matching logo palette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#0d1b2e]/40 rounded-full blur-[80px] pointer-events-none" />
      {/* Hairline orange top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* ── Brand ── */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="group flex items-center gap-4">
              {/* Logo badge with navy glow */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-[#0d1b2e]/90 blur-lg scale-110 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/marketrix-logo-main.jpeg"
                  alt="Marketrix Nepal"
                  width={64}
                  height={64}
                  className="relative h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300"
                />
              </div>

              {/* Text lockup */}
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-[0.15em] uppercase text-white/90">
                  Marketrix Nepal
                </span>
                <span className="text-[11px] tracking-wider text-white/35 mt-1 font-medium">
                  AI-Powered Business Platforms
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-xs text-zinc-600 max-w-[220px] text-center md:text-left leading-relaxed">
              Building world-class digital experiences for modern businesses.
            </p>
          </div>

          {/* ── Contact & legal ── */}
          <div className="flex flex-col items-center md:items-end gap-3 text-sm">
            <a
              href="mailto:info@marketrixnepal.com.np"
              className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60 group-hover:bg-orange-400 transition-colors" />
              info@marketrixnepal.com.np
            </a>

            <div className="w-full md:w-auto h-px bg-white/[0.06] my-1" />

            <p className="text-[11px] text-zinc-600 text-center md:text-right">
              Proposal prepared exclusively for{" "}
              <span className="text-zinc-500 font-medium">Real HR Soft</span>
            </p>
            <p className="text-[11px] text-zinc-700">
              &copy; {new Date().getFullYear()} Marketrix Nepal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
