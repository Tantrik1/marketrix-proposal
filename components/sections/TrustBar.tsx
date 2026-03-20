const logos = [
  "Bluegrass Drycleaners",
  "Shangrila Distillery",
  "Medtronix",
  "Mozamandu",
  "Trekking Fun",
  "Hamro Tourist",
];

export default function TrustBar() {
  return (
    <section className="bg-[var(--bg-secondary)] border-y border-[var(--border)] py-4 overflow-hidden flex flex-col items-center">
      <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-3">
        Trusted by businesses across Nepal & beyond
      </div>
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll whitespace-nowrap">
          {logos.map((logo, index) => (
            <li
              key={index}
              className="text-xl md:text-2xl font-bold text-[var(--text-muted)]/50 grayscale font-syne"
            >
              {logo}
            </li>
          ))}
          {/* Duplicate for seamless looping */}
          {logos.map((logo, index) => (
            <li
              key={`dup-${index}`}
              className="text-xl md:text-2xl font-bold text-[var(--text-muted)]/50 grayscale font-syne"
            >
              {logo}
            </li>
          ))}
          {logos.map((logo, index) => (
            <li
              key={`dup2-${index}`}
              className="text-xl md:text-2xl font-bold text-[var(--text-muted)]/50 grayscale font-syne"
            >
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
