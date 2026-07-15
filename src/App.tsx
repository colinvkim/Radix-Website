import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Zap,
  Palette,
  BarChart3,
  Shield,
  Download,
  Terminal,
  Copy,
  Check,
  Maximize2,
  Star,
  X,
} from "lucide-react";
import { BlurText } from "./components/BlurText";
import { Glass } from "./components/Glass";
import { SectionBadge } from "./components/SectionBadge";
import { VideoBackground } from "./components/VideoBackground";
import { VideoFade } from "./components/VideoFade";
import { Header } from "./components/Header";
import { formatCompactNumber, useGitHubStats } from "./hooks/useGitHubStats";

// Inline GitHub icon — removed from lucide-react v1
const GithubIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────
const trackClick = (label: string) => {
  window.gtag?.("event", "download_click", {
    event_category: "CTA",
    event_label: label,
  });
};

const DOWNLOAD_URL =
  "https://github.com/colinvkim/Radix/releases/latest/download/Radix.zip";
const GITHUB_URL = "https://github.com/colinvkim/Radix";
const HOMEBREW_COMMAND = "brew install --cask radix";

// ─── Animation Variants ───────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardHover = {
  rest: { y: 0, transition: { duration: 0.3, ease: EASE } },
  hover: { y: -4, transition: { duration: 0.3, ease: EASE } },
};

// ─── Shared Components ────────────────────────────────────────────────

interface GlassButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  trackLabel?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  href,
  children,
  className = "",
  fullWidth,
  trackLabel,
}) => (
  <a
    href={href}
    className={`liquid-glass-strong rounded-lg glow-button px-8 py-4 items-center justify-center gap-2.5 text-center text-[15px] font-semibold text-[#f5f0eb] tracking-wide ${fullWidth ? "flex w-full sm:inline-flex sm:w-auto" : "inline-flex"} ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackLabel && trackClick(trackLabel)}
  >
    {children}
  </a>
);

interface HomebrewInstallProps {
  trackLabel: string;
}

const HomebrewInstall: React.FC<HomebrewInstallProps> = ({ trackLabel }) => {
  const [copied, setCopied] = useState(false);

  const copyWithFallback = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(HOMEBREW_COMMAND);
        return true;
      } catch {
        // Fall back for browsers that deny clipboard writes outside HTTPS.
      }
    }

    const textArea = document.createElement("textarea");
    textArea.value = HOMEBREW_COMMAND;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const copyCommand = async () => {
    if (await copyWithFallback()) {
      setCopied(true);
      trackClick(trackLabel);
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      setCopied(false);
    }
  };

  return (
    <div className="hero-frosted-glass liquid-glass-strong flex w-full max-w-[390px] items-center gap-3 rounded-lg px-4 py-3 text-left sm:w-auto">
      <Terminal className="h-4 w-4 shrink-0 text-[#d4a054]" />
      <code className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[13px] font-medium text-[#f5f0eb]">
        {HOMEBREW_COMMAND}
      </code>
      <button
        type="button"
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 text-[#a09888] transition-colors hover:border-amber-500/40 hover:text-[#d4a054]"
        onClick={copyCommand}
        aria-label={copied ? "Homebrew command copied" : "Copy Homebrew command"}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
};

interface FeatureCardProps {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  icon,
  title,
  description,
}) => (
  <motion.div
    id={id}
    className="h-full scroll-mt-28"
    variants={fadeInUp}
    whileHover="hover"
    initial="rest"
    animate="rest"
  >
    <motion.div className="h-full" variants={cardHover}>
      <Glass className="p-8 group h-full flex flex-col">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 group-hover:border-amber-500/40 group-hover:shadow-[0_0_24px_rgba(212,160,84,0.12)] transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-display text-[#f5f0eb] mb-3">{title}</h3>
        <p className="text-[#a09888] font-body font-light text-sm leading-relaxed flex-grow">
          {description}
        </p>
      </Glass>
    </motion.div>
  </motion.div>
);

interface StatItemProps {
  href: string;
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ href, icon, value, label }) => (
  <a
    href={href}
    className="group liquid-glass rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-[#d4a054] transition-all duration-300 group-hover:border-amber-500/40 group-hover:bg-amber-500/15">
      {icon}
    </div>
    <BlurText
      text={value}
      className="block w-full text-center text-5xl md:text-6xl lg:text-7xl font-display text-[#f5f0eb]"
      delay={0}
    />
    <p className="mt-3 text-sm font-medium tracking-[0.16em] text-[#a09888] uppercase">
      {label}
    </p>
  </a>
);

// ─── Main App ─────────────────────────────────────────────────────────

const StatsContent: React.FC = () => {
  const { stats, loading } = useGitHubStats();
  const loadingValue = loading ? "..." : "--";

  return (
    <div className="grid grid-cols-1 gap-5 text-center md:grid-cols-2 md:gap-6">
      <StatItem
        href={GITHUB_URL}
        icon={<Star className="h-5 w-5" />}
        value={stats ? formatCompactNumber(stats.starCount) : loadingValue}
        label="GitHub stars"
      />
      <StatItem
        href={`${GITHUB_URL}/releases`}
        icon={<Download className="h-5 w-5" />}
        value={stats ? formatCompactNumber(stats.totalDownloads) : loadingValue}
        label="Release downloads"
      />
    </div>
  );
};

// ─── Screenshot Modal ─────────────────────────────────────────────────

interface ScreenshotModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  src,
  alt,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      key="backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        key="modal"
        className="relative w-full max-w-[min(96vw,1500px)]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-[#a09888] hover:text-[#f5f0eb] transition-colors"
          aria-label="Close screenshot"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
};

interface ProductShowcase {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const productShowcases: ProductShowcase[] = [
  {
    number: "01",
    eyebrow: "Explore without losing context",
    title: "Everything you need, in one view.",
    description:
      "Move from a whole drive to a single file while Smart Locations, the visualization, file table, inspector, and cleanup tools stay in sync.",
    image: "/images/radix-sunburst.png",
    alt: "Radix showing a sunburst visualization with Smart Locations, file table, inspector, and Discard Pile",
  },
  {
    number: "02",
    eyebrow: "Choose the clearest perspective",
    title: "Switch from hierarchy to scale.",
    description:
      "Use the sunburst to follow directory structure or switch to the treemap to make oversized folders immediately obvious. The surrounding browser and inspector remain connected to your selection.",
    image: "/images/radix-treemap.png",
    alt: "Radix showing a treemap visualization of disk usage",
  },
  {
    number: "03",
    eyebrow: "Compare scans over time",
    title: "See what changed, not just what is large.",
    description:
      "Compare two scans to find files and folders that grew, shrank, appeared, or disappeared. Search the results and trace every change back through its directory hierarchy.",
    image: "/images/radix-scan-comparison.png",
    alt: "Radix scan comparison showing files and folders that changed over time",
  },
];

interface ProductScreenshotProps {
  showcase: ProductShowcase;
  onExpand: () => void;
}

const ProductScreenshot: React.FC<ProductScreenshotProps> = ({
  showcase,
  onExpand,
}) => (
  <article>
    <div className="mb-9 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
      <div>
        <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a054]">
          {showcase.number} · {showcase.eyebrow}
        </span>
        <h3 className="max-w-xl font-display text-3xl leading-tight text-[#f5f0eb] md:text-4xl lg:text-5xl">
          {showcase.title}
        </h3>
      </div>
      <p className="mb-0 max-w-2xl font-body text-[15px] font-light leading-relaxed text-[#a09888] lg:justify-self-end">
        {showcase.description}
      </p>
    </div>

    <button
      type="button"
      className="group block w-full cursor-zoom-in text-left"
      onClick={onExpand}
      aria-label={`Enlarge ${showcase.title} screenshot`}
    >
      <div className="relative aspect-[3074/2024] overflow-hidden rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <img
          src={showcase.image}
          alt={showcase.alt}
          width={3074}
          height={2024}
          className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.005]"
          loading="lazy"
        />

        <span className="absolute bottom-3 right-3 z-30 hidden items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-xs font-medium text-white/80 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:inline-flex">
          <Maximize2 className="h-3.5 w-3.5 text-[#d4a054]" />
          Enlarge
        </span>
      </div>
    </button>

  </article>
);

const App: React.FC = () => {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <div className="bg-[#0a0a0a] min-h-screen relative">
      {/* ═══════════════════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════════════════ */}
      <Header />

      {/* ═══════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[860px] flex-col pt-24 md:min-h-[900px]">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="/videos/hero.mp4"
            top="20%"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/40 z-0" />
          <VideoFade position="bottom" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-16 md:px-8 lg:px-12">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Glass className="px-5 py-2.5 inline-flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-[#d4a054] text-[#0a0a0a] rounded-full text-[10px] font-semibold tracking-wide uppercase">
                Open Source
              </span>
              <span className="text-xs font-medium text-white/90 tracking-wide">
                See your disk space in a whole new way
              </span>
            </Glass>
          </motion.div>

          <BlurText
            as="h1"
            text="Your Mac's Disk Space, Beautifully Visualized"
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-display italic text-[#f5f0eb] leading-[0.8] tracking-[-4px] text-center mb-8"
            delay={0.3}
          />

          <div className="hero-copy-spotlight relative mb-12 w-full max-w-5xl">
            <motion.p
              className="relative z-10 mx-auto max-w-5xl text-center font-body text-base font-normal leading-[1.75] text-[#d4cec5] [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <span className="lg:block">
                Radix scans millions of files and turns your Mac’s storage into
                a clear, interactive map.
              </span>{" "}
              <span className="lg:block">
                Explore with sunburst and treemap views, compare changes over
                time, and safely review what to clean up — all locally on your
                Mac.
              </span>
            </motion.p>
          </div>

          <motion.div
            className="flex w-full flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
            style={{ willChange: "opacity, transform" }}
          >
            <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
              <GlassButton
                href={DOWNLOAD_URL}
                trackLabel="Hero Download"
                className="hero-frosted-glass"
              >
                <Download className="w-5 h-5 text-[#d4a054]" />
                Download Radix
              </GlassButton>

              <a
                href={GITHUB_URL}
                className="hero-frosted-glass liquid-glass-strong inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-center text-[15px] font-semibold tracking-wide text-[#f5f0eb] sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Radix on GitHub"
              >
                <GithubIcon className="w-5 h-5" />
                View on GitHub
              </a>
            </div>

            <HomebrewInstall trackLabel="Hero Homebrew Copy" />

            <p className="text-center font-body text-xs font-medium tracking-wide text-[#8f8779]">
              Requires macOS 14 or later.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[560px] px-6 py-20 md:px-16 md:py-24 lg:px-24">
        <div
          className="how-it-works-backdrop absolute inset-0 z-0"
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 flex min-h-[400px] flex-col items-center justify-center text-center md:min-h-[420px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <SectionBadge>How It Works</SectionBadge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] mb-6 leading-[1]"
          >
            Scan, Visualize, Discover
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-10"
          >
            Choose a folder or volume to scan. Explore it with sunburst and
            treemap views, search and inspect files, compare scans over time,
            and review cleanup candidates before moving anything to the Trash.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <GlassButton href={DOWNLOAD_URL} trackLabel="How It Works" className="cta-pulse">
              Try Radix Now
              <ArrowUpRight className="h-4 w-4 text-[#d4a054]" />
            </GlassButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES — ALTERNATING ROWS
          ═══════════════════════════════════════════════════════════ */}
      <section id="product" className="scroll-mt-28 px-6 pb-28 pt-16 md:px-16 md:pt-20 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Capabilities</SectionBadge>
          <h2 className="mb-8 max-w-4xl font-display text-4xl leading-[1] text-[#f5f0eb] md:text-5xl lg:text-6xl">
            See Radix at work.
          </h2>
          <p className="mb-20 max-w-2xl font-body text-[15px] font-light leading-relaxed text-[#a09888]">
            Radix keeps the map, browser, inspector, and cleanup tools together,
            so you can move from discovery to a decision without losing your place.
          </p>

          <div className="space-y-24 md:space-y-32">
            {productShowcases.map((showcase) => (
              <ProductScreenshot
                key={showcase.number}
                showcase={showcase}
                onExpand={() =>
                  setModalImage({ src: showcase.image, alt: showcase.alt })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="section-divider" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES GRID
          ═══════════════════════════════════════════════════════════ */}
      <section id="features" className="scroll-mt-28 py-28 px-6 md:px-16 lg:px-24">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <SectionBadge>Why Radix</SectionBadge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] mb-16 leading-[1]"
          >
            The difference is everything.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-[#d4a054]" />}
              title="Sunburst Visualization"
              description="Explore your disk with an interactive circular chart. Click any segment to drill down into nested directories."
            />
            <FeatureCard
              icon={<Palette className="w-6 h-6 text-[#d4a054]" />}
              title="Sort & Filter"
              description="Sort files by size, name, or date. Filter by file type to quickly find what's taking up space."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-[#d4a054]" />}
              title="Drop to Scan"
              description="Drag and drop any folder to instantly scan. See real-time progress as Radix traverses your files."
            />
            <FeatureCard
              id="privacy"
              icon={<Shield className="w-6 h-6 text-[#d4a054]" />}
              title="Privacy-First"
              description="Everything runs locally on your Mac. No data collection, no telemetry, no account required."
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
            className="w-full h-full"
            style={{ filter: "saturate(0)" }}
          />
          <div className="absolute inset-0 bg-black/60 z-0" />
          <VideoFade position="top" />
          <VideoFade position="bottom" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <StatsContent />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-0 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 overflow-hidden">
            <VideoBackground
              src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 z-0" />
          <VideoFade position="top" />
          <div
            className="absolute bottom-0 left-0 right-0 z-[1]"
            style={{
              height: "120px",
              background:
                "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        <motion.div
          className="relative z-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <BlurText
              text="See what Radix can find."
              className="text-5xl md:text-6xl lg:text-7xl font-display text-[#f5f0eb] text-center mb-8 leading-[1]"
            />
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-10"
          >
            Download Radix today and reclaim your disk space. Open source and
            free forever.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <GlassButton href={DOWNLOAD_URL} trackLabel="Footer Download">
              <Download className="w-5 h-5 text-[#d4a054]" />
              Download for macOS
              <ArrowUpRight className="w-4 h-4" />
            </GlassButton>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="relative z-10 px-4 md:px-8 lg:px-12 py-16">
          <div className="section-divider mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#6b6560] text-sm">
              © {new Date().getFullYear()} Colin Kim
            </p>
            <div className="flex items-center gap-8">
              <a
                href={GITHUB_URL}
                className="flex items-center gap-1.5 text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Modal */}
      <AnimatePresence>
        {modalImage && (
          <ScreenshotModal
            src={modalImage.src}
            alt={modalImage.alt}
            onClose={() => setModalImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
