import React from 'react';
import { LiquidGlassContainer } from './LiquidGlassContainer';

interface SectionBadgeProps {
  children: React.ReactNode;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ children }) => {
  return (
    <LiquidGlassContainer
      className="inline-block px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#a09888] font-body mb-6"
      rounded="full"
    >
      {children}
    </LiquidGlassContainer>
  );
};
