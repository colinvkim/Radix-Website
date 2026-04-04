import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Palette, BarChart3, Shield, Download, Github, ChevronRight } from 'lucide-react';
import { BlurText } from './components/BlurText';
import { LiquidGlassContainer } from './components/LiquidGlassContainer';
import { LiquidGlassStrongContainer } from './components/LiquidGlassStrongContainer';
import { SectionBadge } from './components/SectionBadge';
import { VideoBackground } from './components/VideoBackground';
import { VideoFade } from './components/VideoFade';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ─── Animation Variants ───────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

// ─── Feature Card Component ───────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => (
  <motion.div
    variants={fadeInUp}
    custom={index}
  >
    <LiquidGlassContainer className="p-8 group h-full flex flex-col">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-display text-[#f5f0eb] mb-3">{title}</h3>
      <p className="text-[#a09888] font-body font-light text-sm leading-relaxed flex-grow">
        {description}
      </p>
    </LiquidGlassContainer>
  </motion.div>
);

// ─── Stat Component ───────────────────────────────────────────────────
interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, delay }) => (
  <div className="text-center">
    <BlurText
      text={value}
      className="text-4xl md:text-5xl lg:text-6xl font-display text-[#f5f0eb] inline-block"
      delay={delay}
    />
    <p className="text-[#a09888] font-body font-light text-sm mt-2">{label}</p>
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────────
const App: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[1000px] flex flex-col">
        {/* Background Video */}
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

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 pt-[150px]">
          {/* Announcement pill */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LiquidGlassContainer className="px-5 py-2.5 inline-flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-[#d4a054] text-[#0a0a0a] rounded-full text-[10px] font-semibold tracking-wide uppercase">
                Native
              </span>
              <span className="text-xs font-medium text-white/90 tracking-wide">
                See your disk space in a whole new way
              </span>
            </LiquidGlassContainer>
          </motion.div>

          {/* Headline */}
          <BlurText
            text="Your Mac's Disk Space, Beautifully Visualized"
            className="text-5xl md:text-6xl lg:text-[5rem] font-display text-[#f5f0eb] leading-[0.9] tracking-[-2px] text-center mb-8"
            delay={0.3}
          />

          {/* Description */}
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

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <LiquidGlassStrongContainer className="px-8 py-4 glow-button">
              <a
                href="https://github.com/colinvkim/Radix/releases/latest/download/Radix.zip"
                className="flex items-center gap-2.5 text-[15px] font-semibold text-[#f5f0eb] tracking-wide"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Radix for macOS"
                onClick={() => {
                  if (window.gtag) {
                    window.gtag('event', 'download_click', {
                      'event_category': 'CTA',
                      'event_label': 'Hero Download Button'
                    });
                  }
                }}
              >
                <Download className="w-5 h-5 text-[#d4a054]" />
                Download Radix
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </LiquidGlassStrongContainer>

            <a
              href="https://github.com/colinvkim/Radix"
              className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-[#d4a054] transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Radix on GitHub"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'github_click', {
                    'event_category': 'CTA',
                    'event_label': 'Hero GitHub Link'
                  });
                }
              }}
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Built With */}
        <div className="mt-auto pb-8 pt-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <LiquidGlassContainer className="px-4 py-2 mb-6">
              <span className="text-[11px] font-medium text-white/70 tracking-widest uppercase">Built with</span>
            </LiquidGlassContainer>
            <div className="flex items-center gap-10 md:gap-16">
              {['Swift', 'SwiftUI', 'macOS'].map((tech) => (
                <span key={tech} className="text-2xl md:text-3xl font-display text-[#a09888] italic">
                  {tech}
                </span>
              ))}
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
            Drag and drop any folder to instantly see a beautiful sunburst visualization of your
            disk space. Click any segment to drill down and explore your files with unprecedented
            clarity.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <LiquidGlassStrongContainer className="px-8 py-3.5 glow-button">
              <a
                href="https://github.com/colinvkim/Radix/releases/latest/download/Radix.zip"
                className="flex items-center gap-2 text-sm font-semibold text-[#f5f0eb] tracking-wide"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try Radix Now
                <ArrowUpRight className="w-4 h-4 text-[#d4a054]" />
              </a>
            </LiquidGlassStrongContainer>
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

          {/* Row 1 — Visualization */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-28">
            <div className="flex-1">
              <span className="text-[#d4a054] font-body text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
                01
              </span>
              <h3 className="text-3xl md:text-4xl font-display text-[#f5f0eb] mb-5 leading-tight">
                Interactive Sunburst Visualization
              </h3>
              <p className="text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-8 max-w-lg">
                Navigate your disk space through an intuitive circular visualization. Each ring
                represents a directory, each sector a file. Click to drill down, hover for details,
                and discover what's consuming your space.
              </p>
              <LiquidGlassStrongContainer className="px-6 py-2.5 inline-block glow-button">
                <button className="flex items-center gap-2 text-sm font-medium text-[#f5f0eb]">
                  View Screenshot
                  <ChevronRight className="w-4 h-4 text-[#d4a054]" />
                </button>
              </LiquidGlassStrongContainer>
            </div>
            <div className="flex-1">
              <LiquidGlassContainer className="rounded-2xl p-2 overflow-hidden h-[400px]">
                <div className="w-full h-full bg-white/[0.03] rounded-xl flex items-center justify-center">
                  <span className="text-[#6b6560] text-sm">GIF Placeholder</span>
                </div>
              </LiquidGlassContainer>
            </div>
          </div>

          {/* Row 2 — Scanning */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1">
              <span className="text-[#d4a054] font-body text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
                02
              </span>
              <h3 className="text-3xl md:text-4xl font-display text-[#f5f0eb] mb-5 leading-tight">
                Lightning-Fast Scanning Engine
              </h3>
              <p className="text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-8 max-w-lg">
                Built with Swift and native macOS APIs, Radix uses iterative traversal to scan
                millions of files in seconds. Real-time progress updates show you exactly what's
                happening.
              </p>
              <LiquidGlassStrongContainer className="px-6 py-2.5 inline-block glow-button">
                <button className="flex items-center gap-2 text-sm font-medium text-[#f5f0eb]">
                  See Performance
                  <ChevronRight className="w-4 h-4 text-[#d4a054]" />
                </button>
              </LiquidGlassStrongContainer>
            </div>
            <div className="flex-1">
              <LiquidGlassContainer className="rounded-2xl p-2 overflow-hidden h-[400px]">
                <div className="w-full h-full bg-white/[0.03] rounded-xl flex items-center justify-center">
                  <span className="text-[#6b6560] text-sm">GIF Placeholder</span>
                </div>
              </LiquidGlassContainer>
            </div>
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
      <section className="py-28 px-6 md:px-16 lg:px-24">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-[#d4a054]" />}
              title="Native macOS App"
              description="Built in Swift and SwiftUI for unprecedented performance. No Electron, no compromises."
              index={0}
            />
            <FeatureCard
              icon={<Palette className="w-6 h-6 text-[#d4a054]" />}
              title="Privacy-First"
              description="Permission-aware scanning keeps your data secure. Nothing leaves your Mac, ever."
              index={1}
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 text-[#d4a054]" />}
              title="Real-Time Scanning"
              description="Watch progress live as Radix discovers and visualizes your files in real-time."
              index={2}
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-[#d4a054]" />}
              title="MIT Licensed"
              description="Open source and transparent. No subscriptions, no tracking, no hidden costs."
              index={3}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS SECTION
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
          <LiquidGlassContainer className="rounded-2xl p-12 md:p-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              <StatItem value="10k+" label="Downloads" delay={0} />
              <StatItem value="99%" label="Crash-free" delay={0.1} />
              <StatItem value="10x" label="Faster than web apps" delay={0.2} />
              <StatItem value="500k+" label="Folders scanned" delay={0.3} />
            </div>
          </LiquidGlassContainer>
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
            <BlurText
              text="See what Radix can find."
              className="text-5xl md:text-6xl lg:text-7xl font-display text-[#f5f0eb] text-center mb-8 leading-[1]"
            />
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-[#a09888] font-body font-light text-[15px] leading-relaxed mb-10"
          >
            Download Radix today and reclaim your disk space. Open source and free forever.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <LiquidGlassStrongContainer className="px-10 py-4 inline-block glow-button">
              <button
                className="flex items-center gap-2.5 text-[15px] font-semibold text-[#f5f0eb] tracking-wide"
                aria-label="Download Radix for macOS"
                onClick={() => {
                  window.open('https://github.com/colinvkim/Radix/releases/latest/download/Radix.zip', '_blank');
                  if (window.gtag) {
                    window.gtag('event', 'download_click', {
                      'event_category': 'CTA',
                      'event_label': 'Footer Download Button'
                    });
                  }
                }}
              >
                <Download className="w-5 h-5 text-[#d4a054]" />
                Download for macOS
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </LiquidGlassStrongContainer>
          </motion.div>
        </motion.div>

        {/* Footer bar */}
        <div className="relative z-10 mt-32 pt-8 px-4 md:px-8 lg:px-12">
          <div className="section-divider mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#6b6560] text-sm">© {new Date().getFullYear()} Radix</p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Privacy</a>
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Terms</a>
              <a href="#" className="text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors">Contact</a>
              <a
                href="https://github.com/colinvkim/Radix"
                className="flex items-center gap-1.5 text-[#6b6560] text-sm hover:text-[#d4a054] transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
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
