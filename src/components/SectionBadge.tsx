import React from 'react';
import { Glass } from './Glass';

interface SectionBadgeProps {
  children: React.ReactNode;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ children }) => (
  <Glass variant="subtle" rounded="rounded-full" className="inline-block px-4 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#a09888] font-body mb-6">
    {children}
  </Glass>
);
