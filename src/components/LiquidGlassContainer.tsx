import React from 'react';
import { cn } from '../lib/utils';

interface LiquidGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  rounded?: 'full' | '2xl' | '3xl';
}

export const LiquidGlassContainer: React.FC<LiquidGlassContainerProps> = ({
  children,
  className,
  rounded = 'full'
}) => {
  const roundedClass = rounded === 'full' ? 'rounded-full' : rounded === '2xl' ? 'rounded-2xl' : 'rounded-3xl';

  return (
    <div className={cn('liquid-glass', roundedClass, className)}>
      {children}
    </div>
  );
};