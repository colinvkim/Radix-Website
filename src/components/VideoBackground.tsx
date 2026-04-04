import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  style?: React.CSSProperties;
  top?: string | number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  className,
  poster,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  style,
  top = '20%'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Test if the browser supports HLS natively (Safari)
    const isHlsSupported = () => {
      return Boolean(video.canPlayType('application/vnd.apple.mpegurl'));
    };

    if (isHlsSupported()) {
      // Use native HLS in Safari
      video.src = src;
    } else if (Hls.isSupported()) {
      // Use hls.js for other browsers
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch(() => {
            // Autoplay was prevented
          });
        }
      });

      return () => {
        hls.destroy();
      };
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
      playsInline={playsInline}
      poster={poster}
      style={{ position: 'absolute', top, objectFit: 'cover', ...style }}
    />
  );
};