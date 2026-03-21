"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, TrendingUp, Trophy, Rocket } from "lucide-react";

/* ── SEO Win Cards ─────────────────────────────────────────────────── */
const seoWins = [
  {
    keyword: "Best Business Automation Company in Nepal",
    client: "Tantrik Tech Solutions",
    niche: "Business Automation",
    image: "/portfolios/best business automation comapny in nepal.png",
  },
  {
    keyword: "Best Himalayan White Tea in Dallas",
    client: "Danfe Tea",
    niche: "Tea · E-Commerce",
    image: "/portfolios/Best himalayan white tea in dallas.png",
  },
  {
    keyword: "Best Moringa Tea in Nepal",
    client: "Nepal Tea Exchange",
    niche: "Tea · E-Commerce",
    image: "/portfolios/Best Moringa Tea in Nepal.png",
  },
  {
    keyword: "Best Spearmint Tea in Nepal",
    client: "Nepal Tea Exchange",
    niche: "Tea · E-Commerce",
    image: "/portfolios/best spearmint tea in nepal.png",
  },
  {
    keyword: "PSD Purple Cash Boxers in Nepal",
    client: "Mozamandu",
    niche: "Apparel · Retail",
    image: "/portfolios/PSD Purple Cash Boxers In Nepal.png",
  },
  {
    keyword: "Best Japanese Educational Consultancy in Kathmandu",
    client: "Iroha Education Consultancy",
    niche: "Education · Consultancy",
    image: "/portfolios/best japanese educational consultancy in kathmandu.png",
  },
];

/* ── Website Cards ─────────────────────────────────────────────────── */
const websites = [
  {
    name: "Bluegrass Drycleaners",
    desc: "Corporate Site + POS Integration",
    url: "https://bluegrassdrycleaners.com/",
    image: "/portfolios/Bluegrass Dry Cleaners USA.png",
    tag: "Corporate + POS",
  },
  {
    name: "Shangrila Distillery",
    desc: "E-Commerce + Age Verification",
    url: "https://shangriladistillery.com/",
    image: "/portfolios/Shangrila Distillery.png",
    tag: "E-Commerce",
  },
  {
    name: "Medtronix Nepal",
    desc: "Medical Device Catalog",
    url: "https://www.medtronix.com.np/",
    image: "/portfolios/Medtronix Nepal.png",
    tag: "Medical Catalog",
  },
  {
    name: "Mozamandu",
    desc: "Restaurant Platform + Ordering",
    url: "https://mozamandu.com/",
    image: "/portfolios/Mozamandu.png",
    tag: "Restaurant",
  },
  {
    name: "Trekking Fun",
    desc: "Travel Booking Platform",
    url: "https://hamrotourist.com/",
    image: "/portfolios/Trekking Fun.png",
    tag: "Travel Booking",
  },
  {
    name: "Hamro Tourist",
    desc: "Directory & Ticketing",
    url: "https://hamrotourist.com/",
    image: "/portfolios/Hamro Tourist.png",
    tag: "Directory",
  },
];

/* ── Sub-section Header ───────────────────────────────────────────── */
function SubHeader({
  badge,
  badgeIcon,
  title,
  highlight,
  subtitle,
}: {
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  highlight: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
        {badgeIcon}
        {badge}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold font-syne text-white mb-2 leading-snug">
        {title}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-1 inline-block">
          {highlight}
        </span>
      </h3>
      <p className="text-[var(--text-muted)] text-sm max-w-lg leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

/* ── Component ─────────────────────────────────────────────────────── */
export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-[var(--bg-primary)] border-b border-[var(--border)]">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <TrendingUp size={14} />
            Real Results, Real Businesses
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-syne text-white mb-4"
          >
            Proof It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 pb-1 inline-block">
              Works
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-lg text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed"
          >
            From Page 1 Google rankings to fully operational platforms — here&apos;s what we&apos;ve shipped.
          </motion.p>
        </div>

        <div className="space-y-20">

          {/* ── SEO Rankings ── */}
          <div>
            <SubHeader
              badge="SEO Rankings"
              badgeIcon={<Trophy size={12} />}
              title="Ranked #1 by Google —"
              highlight="Not by Luck."
              subtitle="Every keyword below holds position #1 on Google Search, earned through technical SEO, structured data, and content strategy — not paid ads."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {seoWins.map((win, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 28 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: idx * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/8 transition-all duration-300"
                >
                  {/* 16:9 image */}
                  <div className="relative w-full aspect-video overflow-hidden bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={win.image}
                      alt={win.keyword}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* #1 badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[var(--accent)] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-lg shadow-orange-500/30">
                      🥇 #1 Google
                    </div>

                    {/* Niche tag */}
                    <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-sm text-zinc-300 text-[10px] font-semibold px-2 py-1 rounded-lg border border-white/10">
                      {win.niche}
                    </div>

                    {/* Client name */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-xs font-bold leading-snug drop-shadow-md">{win.client}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-4 py-3.5">
                    <p className="text-white text-sm font-semibold leading-snug mb-2">
                      &ldquo;{win.keyword}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                      <p className="text-xs text-green-400 font-medium">Ranked #1 on Google Search</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Websites Built ── */}
          <div>
            <SubHeader
              badge="Websites Built"
              badgeIcon={<Rocket size={12} />}
              title="Platforms That"
              highlight="Convert."
              subtitle="Responsive, fast, and built to last — live websites we've designed, developed, and deployed for real businesses around the world."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((site, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 28 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open(site.url, "_blank", "noopener,noreferrer")}
                >
                  {/* Browser chrome + screenshot */}
                  <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden">
                    {/* Browser top bar */}
                    <div className="absolute top-0 left-0 right-0 z-10 h-7 bg-zinc-800/95 backdrop-blur-sm flex items-center gap-1.5 px-3 border-b border-zinc-700/60">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <div className="ml-2 flex-1 bg-zinc-700 rounded-full flex items-center px-2 py-[3px] overflow-hidden">
                        <span className="text-[9px] text-zinc-500 truncate">
                          {site.url.replace(/https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                      </div>
                    </div>

                    {/* Screenshot below chrome */}
                    <div className="absolute inset-0 top-7">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={site.image}
                        alt={site.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/8 transition-colors duration-300" />

                    {/* Tag badge */}
                    <div className="absolute top-9 right-2 z-10 bg-black/65 backdrop-blur-sm text-[10px] text-zinc-300 px-2 py-1 rounded-md font-semibold border border-white/10">
                      {site.tag}
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="px-4 py-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold font-syne text-white truncate">{site.name}</h4>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{site.desc}</p>
                      </div>
                      <ExternalLink
                        size={15}
                        className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-0.5"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <Globe size={10} className="text-[var(--text-muted)] shrink-0" />
                      <span className="text-[10px] text-[var(--text-muted)] truncate">
                        {site.url.replace(/https?:\/\//, "").replace(/\/$/, "")}
                      </span>
                    </div>
                  </div>

                  {/* Hover CTA strip */}
                  <div className="border-t border-[var(--border)] px-4 py-2.5 flex items-center justify-between bg-[var(--bg-secondary)] group-hover:bg-[var(--accent)] transition-colors duration-300">
                    <span className="text-xs font-semibold text-[var(--text-muted)] group-hover:text-white transition-colors">
                      Visit Website
                    </span>
                    <ExternalLink size={13} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
