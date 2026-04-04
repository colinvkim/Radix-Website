import React from 'react';
import { LiquidGlassContainer } from './LiquidGlassContainer';

interface SectionBadgeProps {
  children: React.ReactNode;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ children }) => {
  return (
    <LiquidGlassContainer
      className="inline-block px-3.5 py-1 text-xs font-medium text-white font-body mb-4"
      rounded="full"
    >
      {children}
    </LiquidGlassContainer>
  );
};