import { Glass } from './Glass';
import { Download } from 'lucide-react';

const DOWNLOAD_URL =
  'https://github.com/colinvkim/Radix/releases/latest/download/Radix.zip';
const GITHUB_URL = 'https://github.com/colinvkim/Radix';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 ${className}`}>
      <Glass className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 md:px-4">
        <a href="#" className="flex shrink-0 items-center gap-3" aria-label="Radix home">
          <img src="/icon-512x512.png" alt="" className="h-8 w-8 object-contain" />
          <span className="hidden text-lg font-display font-semibold tracking-wide text-[#f5f0eb] sm:inline">
            Radix
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          <a href="#product" className="text-sm font-medium text-[#a09888] transition-colors hover:text-[#f5f0eb]">
            Product
          </a>
          <a href="#features" className="text-sm font-medium text-[#a09888] transition-colors hover:text-[#f5f0eb]">
            Features
          </a>
          <a href="#privacy" className="text-sm font-medium text-[#a09888] transition-colors hover:text-[#f5f0eb]">
            Privacy
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={GITHUB_URL}
            className="px-2 py-2 text-xs font-medium text-[#a09888] transition-colors hover:text-[#f5f0eb] sm:px-3 sm:text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={DOWNLOAD_URL}
            className="liquid-glass-strong glow-button inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-semibold tracking-wide text-[#f5f0eb] sm:px-5 sm:text-sm"
          >
            <Download className="h-4 w-4 text-[#d4a054]" aria-hidden="true" />
            Download
          </a>
        </div>
      </Glass>
    </header>
  );
};
