import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] py-12">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-3 mb-2">
            <Image
              src="/marketrix-logo.png"
              alt="Marketrix"
              width={44}
              height={44}
              className="rounded-md"
            />
            <span className="text-xl font-bold font-syne text-white tracking-tight">
              Marketrix
            </span>
          </Link>
          <p className="text-[var(--text-muted)] text-sm mt-1">
            AI-Powered Business Platforms
          </p>
        </div>

        <div className="text-center md:text-right text-[var(--text-muted)] text-sm space-y-2">
          <p>
            Contact:{" "}
            <a
              href="mailto:info@marketrix.com.np"
              className="text-white hover:text-[var(--accent)] transition-colors"
            >
              info@marketrix.com.np
            </a>
          </p>
          <p className="text-xs">Proposal prepared for Real HR Soft by Marketrix Nepal</p>
          <p>&copy; {new Date().getFullYear()} Marketrix Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
