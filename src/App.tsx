import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Palette, BarChart3, Shield, Download, Github, ChevronRight, FileCode, Layout, Monitor } from 'lucide-react';
import { BlurText } from './components/BlurText';
import { Glass } from './components/Glass';
import { SectionBadge } from './components/SectionBadge';
import { VideoBackground } from './components/VideoBackground';
import { VideoFade } from './components/VideoFade';

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
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardHover = {
  rest: { y: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  hover: { y: -4, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
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
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, delay }) => (
  <div className="text-center">
    <BlurText text={value} className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] inline-block" delay={delay} />
    <p className="text-[#a09888] font-body font-light text-sm mt-2">{label}</p>
  </div>
);

interface TechBadgeProps {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ icon, name, description }) => (
  <div className="flex flex-col items-center text-center gap-3">
    <Glass className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center">
      {icon}
    </Glass>
    <div>
      <h4 className="text-base md:text-lg font-display italic text-[#f5f0eb]">{name}</h4>
      <p className="text-[11px] text-[#6b6560] font-body font-light">{description}</p>
    </div>
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────────
const App: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen relative">

      {/* ═══════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[1000px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
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
                Native
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
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </Glass>
          </motion.div>
        </div>

        <div className="mt-auto pb-10 pt-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <Glass className="px-4 py-2 mb-8">
              <span className="text-[11px] font-medium text-white/70 tracking-widest uppercase">Built with</span>
            </Glass>
            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl">
              <TechBadge icon={<FileCode className="w-7 h-7 md:w-8 md:h-8 text-[#d4a054]" />} name="Swift" description="Native binary" />
              <TechBadge icon={<Layout className="w-7 h-7 md:w-8 md:h-8 text-[#d4a054]" />} name="SwiftUI" description="Declarative UI" />
              <TechBadge icon={<Monitor className="w-7 h-7 md:w-8 md:h-8 text-[#d4a054]" />} name="macOS" description="Native APIs" />
            </div>
          </div>
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
            <FeatureCard icon={<Zap className="w-6 h-6 text-[#d4a054]" />} title="Native macOS App" description="Built in Swift and SwiftUI for unprecedented performance. No Electron, no compromises." />
            <FeatureCard icon={<Palette className="w-6 h-6 text-[#d4a054]" />} title="Privacy-First" description="Permission-aware scanning keeps your data secure. Nothing leaves your Mac, ever." />
            <FeatureCard icon={<BarChart3 className="w-6 h-6 text-[#d4a054]" />} title="Real-Time Scanning" description="Watch progress live as Radix discovers and visualizes your files in real-time." />
            <FeatureCard icon={<Shield className="w-6 h-6 text-[#d4a054]" />} title="MIT Licensed" description="Open source and transparent. No subscriptions, no tracking, no hidden costs." />
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              <StatItem value="10k+" label="Downloads" delay={0} />
              <StatItem value="99%" label="Crash-free" delay={0.1} />
              <StatItem value="10x" label="Faster than web apps" delay={0.2} />
              <StatItem value="500k+" label="Folders scanned" delay={0.3} />
            </div>
          </Glass>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA FOOTER
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
          <VideoFade position="top" />
          <VideoFade position="bottom" />
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

        <div className="relative z-10 mt-32 pt-8 px-4 md:px-8 lg:px-12">
          <div className="section-divider mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#6b6560] text-sm">© {new Date().getFullYear()} Radix</p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Privacy</a>
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Terms</a>
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Contact</a>
              <a href={GITHUB_URL} className="flex items-center gap-1.5 text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="w-3.5 h-3.5" />
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
