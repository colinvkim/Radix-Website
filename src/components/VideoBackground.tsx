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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isHlsSource = /\.m3u8(?:$|\?)/i.test(src);
    const canPlayHlsNatively = () => {
      return Boolean(video.canPlayType('application/vnd.apple.mpegurl'));
    };

    let hls: Hls | null = null;

    const playIfNeeded = () => {
      if (!autoPlay) return;
      video.play().catch(() => {
        // Autoplay was prevented
      });
    };

    if (!isHlsSource) {
      video.src = src;
      playIfNeeded();
    } else if (canPlayHlsNatively()) {
      video.src = src;
      playIfNeeded();
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, playIfNeeded);
    } else {
      console.warn('HLS is not supported in this browser');
    }

    return () => {
      if (hls) {
        hls.destroy();
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
