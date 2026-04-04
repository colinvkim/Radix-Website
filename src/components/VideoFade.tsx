import React from 'react';

interface VideoFadeProps {
  position?: 'top' | 'bottom';
}

export const VideoFade: React.FC<VideoFadeProps> = ({ position = 'bottom' }) => {
  const gradientStyle = {
    background: position === 'top'
      ? 'linear-gradient(to bottom, black, transparent)'
      : 'linear-gradient(to top, black, transparent)'
  };

  return (
    <div
      className={`absolute ${position}-0 left-0 right-0 z-[1]`}
      style={{ height: '200px', ...gradientStyle }}
    />
  );
};