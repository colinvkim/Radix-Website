import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Zap, Palette, BarChart3, Shield } from 'lucide-react';
import { BlurText } from './components/BlurText';
import { LiquidGlassContainer } from './components/LiquidGlassContainer';
import { LiquidGlassStrongContainer } from './components/LiquidGlassStrongContainer';
import { SectionBadge } from './components/SectionBadge';
import { VideoBackground } from './components/VideoBackground';
import { VideoFade } from './components/VideoFade';

const App: React.FC = () => {
  return (
    <div className="bg-black overflow-visible min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-visible h-[1000px] flex flex-col">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
            poster="/images/hero_bg.jpeg"
            top="20%"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/5 z-0" />
          <VideoFade position="bottom" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 pt-[150px]">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <LiquidGlassContainer className="px-4 py-2 inline-flex items-center gap-3">
              <div className="px-2 py-1 bg-white text-black rounded-full text-xs font-medium">Native macOS</div>
              <span className="text-xs font-medium text-white">See your disk space in a whole new way.</span>
            </LiquidGlassContainer>
          </motion.div>

          <BlurText
            text="Your Mac's Disk Space, Beautifully Visualized"
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-heading text-white leading-[0.8] tracking-[-4px] text-center mb-8"
            delay={0.3}
          />

          <motion.p
            className="max-w-3xl mx-auto text-center text-white/60 font-body font-light text-sm mb-12"
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Radix is a native macOS disk space analyzer that scans folders quickly and visualizes results through an interactive sunburst chart and sortable file browser. Built in Swift/SwiftUI for blazing performance.
          </motion.p>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <LiquidGlassStrongContainer className="px-8 py-3">
              <button className="flex items-center gap-2 text-sm font-medium text-white">
                Download Radix
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </LiquidGlassStrongContainer>

            <button className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
              <span>View on GitHub</span>
              <Play className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Built With */}
        <div className="mt-auto pb-8 pt-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <LiquidGlassContainer className="px-4 py-2 mb-8">
              <span className="text-xs font-medium text-white">Built with</span>
            </LiquidGlassContainer>
            <div className="flex items-center gap-12">
              <span className="text-2xl md:text-3xl font-heading text-white">Swift</span>
              <span className="text-2xl md:text-3xl font-heading text-white">SwiftUI</span>
              <span className="text-2xl md:text-3xl font-heading text-white">macOS</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative min-h-[700px] py-32 px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
            className="w-full h-full"
          />
          <VideoFade position="top" />
          <VideoFade position="bottom" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px]">
          <SectionBadge>How It Works</SectionBadge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white text-center mb-6">
            Scan, Visualize, Discover
          </h2>
          <p className="max-w-3xl mx-auto text-center text-white/60 font-body font-light text-sm mb-8">
            Drag and drop any folder to instantly see a beautiful sunburst visualization of your disk space. Click any segment to drill down and explore your files with unprecedented clarity.
          </p>
          <LiquidGlassStrongContainer className="px-8 py-3">
            <button className="flex items-center gap-2 text-sm font-medium text-white">
              Try Radix Now
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </LiquidGlassStrongContainer>
        </div>
      </section>

      {/* Features Chess */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Capabilities</SectionBadge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-16">
            Native power. Beautiful design.
          </h2>

          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-heading text-white mb-4">
                Interactive Sunburst Visualization
              </h3>
              <p className="text-white/60 font-body font-light text-sm mb-8">
                Navigate your disk space through an intuitive circular visualization. Each ring represents a directory, each sector a file. Click to drill down, hover for details, and discover what's eating your space.
              </p>
              <LiquidGlassStrongContainer className="px-6 py-2 inline-block">
                <button className="text-sm font-medium text-white">View Screenshot</button>
              </LiquidGlassStrongContainer>
            </div>
            <div className="flex-1">
              <LiquidGlassContainer className="rounded-2xl p-2 overflow-hidden h-96">
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <span className="text-white/60">GIF Placeholder</span>
                </div>
              </LiquidGlassContainer>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-heading text-white mb-4">
                Lightning-Fast Scanning Engine
              </h3>
              <p className="text-white/60 font-body font-light text-sm mb-8">
                Built with Swift and native macOS APIs, Radix uses iterative traversal to scan millions of files in seconds. Real-time progress updates show you exactly what's happening.
              </p>
              <LiquidGlassStrongContainer className="px-6 py-2 inline-block">
                <button className="text-sm font-medium text-white">See Performance</button>
              </LiquidGlassStrongContainer>
            </div>
            <div className="flex-1">
              <LiquidGlassContainer className="rounded-2xl p-2 overflow-hidden h-96">
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <span className="text-white/60">GIF Placeholder</span>
                </div>
              </LiquidGlassContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Why Radix</SectionBadge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-16">
            The difference is everything.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LiquidGlassContainer className="p-6">
              <LiquidGlassStrongContainer className="w-10 h-10 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-white" />
              </LiquidGlassStrongContainer>
              <h3 className="text-lg font-heading text-white mb-2">Native macOS App</h3>
              <p className="text-white/60 font-body font-light text-sm">
                Built in Swift and SwiftUI for unprecedented performance. No Electron, no compromises.
              </p>
            </LiquidGlassContainer>

            <LiquidGlassContainer className="p-6">
              <LiquidGlassStrongContainer className="w-10 h-10 flex items-center justify-center mb-4">
                <Palette className="w-5 h-5 text-white" />
              </LiquidGlassStrongContainer>
              <h3 className="text-lg font-heading text-white mb-2">Privacy-First</h3>
              <p className="text-white/60 font-body font-light text-sm">
                Permission-aware scanning keeps your data secure. Nothing leaves your Mac.
              </p>
            </LiquidGlassContainer>

            <LiquidGlassContainer className="p-6">
              <LiquidGlassStrongContainer className="w-10 h-10 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-white" />
              </LiquidGlassStrongContainer>
              <h3 className="text-lg font-heading text-white mb-2">Real-Time Scanning</h3>
              <p className="text-white/60 font-body font-light text-sm">
                Watch progress live as Radix discovers and visualizes your files in real-time.
              </p>
            </LiquidGlassContainer>

            <LiquidGlassContainer className="p-6">
              <LiquidGlassStrongContainer className="w-10 h-10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-white" />
              </LiquidGlassStrongContainer>
              <h3 className="text-lg font-heading text-white mb-2">MIT Licensed</h3>
              <p className="text-white/60 font-body font-light text-sm">
                Open source and transparent. No subscriptions, no tracking.
              </p>
            </LiquidGlassContainer>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
            className="w-full h-full"
            style={{ filter: 'saturate(0)' }}
          />
          <VideoFade position="top" />
          <VideoFade position="bottom" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <LiquidGlassContainer className="rounded-3xl p-12 md:p-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <BlurText
                  text="10k+"
                  className="text-4xl md:text-5xl lg:text-6xl font-heading text-white inline-block"
                  delay={0}
                />
                <p className="text-white/60 font-body font-light text-sm">Downloads</p>
              </div>
              <div>
                <BlurText
                  text="99%"
                  className="text-4xl md:text-5xl lg:text-6xl font-heading text-white inline-block"
                  delay={0}
                />
                <p className="text-white/60 font-body font-light text-sm">Crash-free</p>
              </div>
              <div>
                <BlurText
                  text="10x"
                  className="text-4xl md:text-5xl lg:text-6xl font-heading text-white inline-block"
                  delay={0}
                />
                <p className="text-white/60 font-body font-light text-sm">Faster than web apps</p>
              </div>
              <div>
                <BlurText
                  text="500k+"
                  className="text-4xl md:text-5xl lg:text-6xl font-heading text-white inline-block"
                  delay={0}
                />
                <p className="text-white/60 font-body font-light text-sm">Folders scanned</p>
              </div>
            </div>
          </LiquidGlassContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionBadge>Loved by Users</SectionBadge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-16">
            Keeping Macs clean worldwide.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LiquidGlassContainer className="p-8">
              <p className="text-white/80 font-body font-light text-sm italic mb-4">
                "Finally a native macOS disk analyzer that doesn't feel like a Windows port. The sunburst visualization is intuitive and beautiful."
              </p>
              <p className="text-white font-body font-medium text-sm">Alex Thompson</p>
              <p className="text-white/50 font-body font-light text-xs">iOS Developer</p>
            </LiquidGlassContainer>

            <LiquidGlassContainer className="p-8">
              <p className="text-white/80 font-body font-light text-sm italic mb-4">
                "Scans my entire 4TB drive in seconds. Way faster than any web-based tool or Electron app I've tried."
              </p>
              <p className="text-white font-body font-medium text-sm">Maya Patel</p>
              <p className="text-white/50 font-body font-light text-xs">Photographer</p>
            </LiquidGlassContainer>

            <LiquidGlassContainer className="p-8">
              <p className="text-white/80 font-body font-light text-sm italic mb-4">
                "The permission system is thoughtful. I can scan my home folder without worrying about system files."
              </p>
              <p className="text-white font-body font-medium text-sm">Jordan Lee</p>
              <p className="text-white/50 font-body font-light text-xs">Designer</p>
            </LiquidGlassContainer>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-24 px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            className="w-full h-full"
          />
          <VideoFade position="top" />
          <VideoFade position="bottom" />
        </div>

        <div className="relative z-10 text-center">
          <BlurText
            text="See what Radix can find."
            className="text-5xl md:text-6xl lg:text-7xl font-heading text-white text-center mb-6"
          />
          <p className="max-w-2xl mx-auto text-white/60 font-body font-light text-sm mb-8">
            Download Radix today and reclaim your disk space. Open source and free forever.
          </p>
          <div className="flex items-center gap-6 justify-center mb-24">
            <LiquidGlassStrongContainer className="px-8 py-3">
              <button className="flex items-center gap-2 text-sm font-medium text-white">
                Download for macOS
              </button>
            </LiquidGlassStrongContainer>
            <button className="px-8 py-3 bg-white text-black rounded-full flex items-center gap-2 text-sm font-medium">
              View on GitHub
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-32 pt-8 border-t border-white/10 px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">© 2026 Radix</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">Terms</a>
              <a href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;