import React from 'react';
import { cn } from '../lib/utils';

interface LiquidGlassStrongContainerProps {
  children: React.ReactNode;
  className?: string;
  rounded?: 'full' | '2xl' | '3xl';
}

export const LiquidGlassStrongContainer: React.FC<LiquidGlassStrongContainerProps> = ({
  children,
  className,
  rounded = 'full'
}) => {
  const roundedClass = rounded === 'full' ? 'rounded-full' : rounded === '2xl' ? 'rounded-2xl' : 'rounded-3xl';

  return (
    <div className={cn('liquid-glass-strong', roundedClass, className)}>
      {children}
    </div>
  );
};