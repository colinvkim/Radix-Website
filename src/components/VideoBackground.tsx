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
  /** Vertical offset. When undefined, video fills container with `inset: 0`. */
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
  top,
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

    let hls: Hls | null = null;

    if (isHlsSupported()) {
      // Use native HLS in Safari
      video.src = src;
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay was prevented
        });
      }
    } else if (Hls.isSupported()) {
      // Use hls.js for other browsers
      hls = new Hls();
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
    } else {
      // Fallback: neither native HLS nor hls.js is supported
      console.warn('HLS is not supported in this browser');
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      hlsRef.current = null;
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
      style={{
        position: 'absolute',
        objectFit: 'cover',
        backgroundColor: '#0a0a0a',
        ...(top !== undefined
          ? { top }
          : { top: 0, left: 0, right: 0, bottom: 0 }),
        ...style,
      }}
    />
  );
};