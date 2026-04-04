import React from 'react';
import { cn } from '../lib/utils';

interface LiquidGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const LiquidGlassContainer: React.FC<LiquidGlassContainerProps> = ({
  children,
  className,
  rounded = 'lg'
}) => {
  const roundedClasses: Record<string, string> = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <div className={cn('liquid-glass', roundedClasses[rounded] || roundedClasses.lg, className)}>
      {children}
    </div>
  );
};
