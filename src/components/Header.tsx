import { Glass } from './Glass';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 ${className}`}>
      <Glass className="px-4 py-2.5 inline-flex items-center gap-3">
        <img src="/icon.png" alt="Radix" className="w-8 h-8 object-contain" />
        <span className="text-lg font-display text-[#f5f0eb] font-semibold tracking-wide">
          Radix
        </span>
      </Glass>
    </header>
  );
};
