import React from 'react';
import { cn } from '../lib/utils';

interface LiquidGlassStrongContainerProps {
  children: React.ReactNode;
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const LiquidGlassStrongContainer: React.FC<LiquidGlassStrongContainerProps> = ({
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
    <div className={cn('liquid-glass-strong', roundedClasses[rounded] || roundedClasses.lg, className)}>
      {children}
    </div>
  );
};
