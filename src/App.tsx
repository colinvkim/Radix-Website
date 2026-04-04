import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Palette, BarChart3, Shield, Download, ChevronRight } from 'lucide-react';
import { BlurText } from './components/BlurText';
import { Glass } from './components/Glass';
import { SectionBadge } from './components/SectionBadge';
import { VideoBackground } from './components/VideoBackground';
import { VideoFade } from './components/VideoFade';
import { AnimatedCounter } from './components/AnimatedCounter';
import { Header } from './components/Header';
import { useGitHubStats, formatCompactNumber } from './hooks/useGitHubStats';

// Inline GitHub icon — removed from lucide-react v1
const GithubIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
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
  window.gtag?.('event', 'download_click', {
    event_category: 'CTA',
    event_label: label,
  });
};

const DOWNLOAD_URL = 'https://github.com/colinvkim/Radix/releases/latest/download/Radix.zip';
const GITHUB_URL = 'https://github.com/colinvkim/Radix';

// ─── Animation Variants ───────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
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

const GlassButton: React.FC<GlassButtonProps> = ({ href, children, className = '', fullWidth, trackLabel }) => (
  <Glass
    variant="strong"
    rounded="rounded-lg"
    className={`px-8 py-4 glow-button text-center ${fullWidth ? 'w-full sm:w-auto' : ''} ${className}`}
  >
    <a
      href={href}
      className="flex items-center justify-center gap-2.5 text-[15px] font-semibold text-[#f5f0eb] tracking-wide"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLabel && trackClick(trackLabel)}
    >
      {children}
    </a>
  </Glass>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div variants={fadeInUp} whileHover="hover" initial="rest" animate="rest">
    <motion.div variants={cardHover}>
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
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="text-center">
    <BlurText text={value} className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] inline-block" delay={0} />
    <p className="text-[#a09888] font-body font-light text-sm mt-2">{label}</p>
  </div>
);

interface DynamicStatItemProps {
  targetValue: number;
  label: string;
  formatFn?: (value: number) => string;
  suffix?: string;
  prefix?: string;
}

const DynamicStatItem: React.FC<DynamicStatItemProps> = ({
  targetValue,
  label,
  formatFn = formatCompactNumber,
  suffix = '',
  prefix = '',
}) => (
  <div className="text-center">
    <AnimatedCounter
      targetValue={targetValue}
      formatFn={formatFn}
      suffix={suffix}
      prefix={prefix}
      className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] inline-block"
    />
    <p className="text-[#a09888] font-body font-light text-sm mt-2">{label}</p>
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────────

const StatsContent: React.FC = () => {
  const { stats, loading, error } = useGitHubStats();

  // Fallback display values when loading or on error
  const displayDownloads = stats?.totalDownloads ?? 0;
  const displayReleases = stats?.releaseCount ?? 0;

  // Crash-free rate: we show 99% as a static claim (can't measure from GitHub)
  // Performance multiplier: also a static claim
  // These are architectural claims, not measurable metrics

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        <StatItem value="..." label="Downloads" />
        <StatItem value="..." label="Releases" />
        <StatItem value="99%" label="Crash-free" />
        <StatItem value="..." label="Versions" />
      </div>
    );
  }

  if (error) {
    // Graceful fallback: show static reasonable values
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        <StatItem value={formatCompactNumber(displayDownloads)} label="Downloads" />
        <StatItem value={displayReleases.toString()} label="Releases" />
        <StatItem value="99%" label="Crash-free" />
        <StatItem value="10x" label="Faster than web apps" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
      <DynamicStatItem
        targetValue={displayDownloads}
        label="Downloads"
      />
      <DynamicStatItem
        targetValue={displayReleases}
        label="Releases"
      />
      <StatItem value="99%" label="Crash-free" />
      <StatItem value="10x" label="Faster than web apps" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen relative">

      {/* ═══════════════════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════════════════ */}
      <Header />

      {/* ═══════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[1000px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="/videos/hero.mp4"
            poster="/images/hero_bg.jpeg"
            top="20%"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/40 z-0" />
          <VideoFade position="bottom" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 pt-[150px]">
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
            text="Your Mac's Disk Space, Beautifully Visualized"
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-display italic text-[#f5f0eb] leading-[0.8] tracking-[-4px] text-center mb-8"
            delay={0.3}
          />

          <motion.p
            className="max-w-2xl mx-auto text-center text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-12"
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Radix is a native macOS disk space analyzer that scans millions of files in seconds
            and visualizes results through an interactive sunburst chart. Built in Swift/SwiftUI
            for blazing performance.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <GlassButton href={DOWNLOAD_URL} trackLabel="Hero Download">
              <Download className="w-5 h-5 text-[#d4a054]" />
              Download Radix
            </GlassButton>

            <Glass
              variant="strong"
              rounded="rounded-lg"
              className="px-8 py-4 w-full sm:w-auto text-center opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <a
                href={GITHUB_URL}
                className="flex items-center justify-center gap-2 text-[15px] font-medium text-[#f5f0eb] tracking-wide"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Radix on GitHub"
              >
                <GithubIcon className="w-5 h-5" />
                View on GitHub
              </a>
            </Glass>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[700px] py-32 px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
          <VideoFade position="top" />
          <VideoFade position="bottom" />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center min-h-[500px] text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}><SectionBadge>How It Works</SectionBadge></motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] mb-6 leading-[1]">
            Scan, Visualize, Discover
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-center text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-10">
            Drag and drop any folder to instantly see a beautiful sunburst visualization of your
            disk space. Click any segment to drill down and explore your files with unprecedented
            clarity.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <GlassButton href={DOWNLOAD_URL} trackLabel="How It Works">
              Try Radix Now
              <ArrowUpRight className="w-4 h-4 text-[#d4a054]" />
            </GlassButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES — ALTERNATING ROWS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Capabilities</SectionBadge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] mb-20 leading-[1]">
            Native power. Beautiful design.
          </h2>

          {[
            {
              number: '01',
              title: 'Interactive Sunburst Visualization',
              description:
                'Navigate your disk space through an intuitive circular visualization. Each ring represents a directory, each sector a file. Click to drill down, hover for details, and discover what\'s consuming your space.',
              cta: 'View Screenshot',
            },
            {
              number: '02',
              title: 'Lightning-Fast Scanning Engine',
              description:
                'Built with Swift and native macOS APIs, Radix uses iterative traversal to scan millions of files in seconds. Real-time progress updates show you exactly what\'s happening.',
              cta: 'See Performance',
            },
          ].map((feature, i) => (
            <div
              key={feature.number}
              className={`flex flex-col lg:flex-row items-center gap-16 ${i === 0 ? 'mb-28' : ''}`}
            >
              <div className={`flex-1 ${i === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-[#d4a054] font-body text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
                  {feature.number}
                </span>
                <h3 className="text-3xl md:text-4xl font-display text-[#f5f0eb] mb-5 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-8 max-w-lg">
                  {feature.description}
                </p>
                <Glass variant="strong" rounded="rounded-lg" className="px-6 py-2.5 inline-block glow-button">
                  <button className="flex items-center gap-2 text-sm font-medium text-[#f5f0eb]">
                    {feature.cta}
                    <ChevronRight className="w-4 h-4 text-[#d4a054]" />
                  </button>
                </Glass>
              </div>
              <div className={`flex-1 ${i === 1 ? 'lg:order-0' : ''}`}>
                <Glass className="rounded-2xl p-2 overflow-hidden h-[400px]">
                  <div className="w-full h-full placeholder-pattern rounded-xl flex items-center justify-center relative z-10">
                    <span className="text-[#6b6560] text-sm">GIF Placeholder</span>
                  </div>
                </Glass>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="section-divider" />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES GRID
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-16 lg:px-24">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}><SectionBadge>Why Radix</SectionBadge></motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] mb-16 leading-[1]">
            The difference is everything.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard icon={<Zap className="w-6 h-6 text-[#d4a054]" />} title="Sunburst Visualization" description="Explore your disk with an interactive circular chart. Click any segment to drill down into nested directories." />
            <FeatureCard icon={<Palette className="w-6 h-6 text-[#d4a054]" />} title="Sort & Filter" description="Sort files by size, name, or date. Filter by file type to quickly find what's taking up space." />
            <FeatureCard icon={<BarChart3 className="w-6 h-6 text-[#d4a054]" />} title="Drop to Scan" description="Drag and drop any folder to instantly scan. See real-time progress as Radix traverses your files." />
            <FeatureCard icon={<Shield className="w-6 h-6 text-[#d4a054]" />} title="Privacy-First" description="Everything runs locally on your Mac. No data collection, no telemetry, no account required." />
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
            style={{ filter: 'saturate(0)' }}
          />
          <div className="absolute inset-0 bg-black/60 z-0" />
          <VideoFade position="top" />
          <VideoFade position="bottom" />
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <Glass className="rounded-2xl p-12 md:p-16">
            <StatsContent />
          </Glass>
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
          <div className="absolute bottom-0 left-0 right-0 z-[1]" style={{ height: '120px', background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)' }} aria-hidden="true" />
        </div>

        <motion.div
          className="relative z-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <BlurText text="See what Radix can find." className="text-5xl md:text-6xl lg:text-7xl font-display text-[#f5f0eb] text-center mb-8 leading-[1]" />
          </motion.div>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-10">
            Download Radix today and reclaim your disk space. Open source and free forever.
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
            <p className="text-[#6b6560] text-sm">© {new Date().getFullYear()} Radix</p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Privacy</a>
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Terms</a>
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Contact</a>
              <a href={GITHUB_URL} className="flex items-center gap-1.5 text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
