import React from 'react';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'subtle' | 'strong';
  rounded?: string;
}

export const Glass: React.FC<GlassProps> = ({
  children,
  className = '',
  variant = 'subtle',
  rounded = 'rounded-lg',
}) => {
  const baseClass = variant === 'strong' ? 'liquid-glass-strong' : 'liquid-glass';
  return (
    <div className={`${baseClass} ${rounded} ${className}`.trim()}>
      {children}
    </div>
  );
};
