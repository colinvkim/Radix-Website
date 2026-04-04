import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className, delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 50 }}
          animate={visible ? {
            opacity: 1,
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            y: [50, -5, 0]
          } : {}}
          transition={{
            duration: 0.35,
            delay: delay + wordIndex * 0.1,
            ease: 'easeOut',
          }}
          className="inline-block mr-2"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
      {/* Hidden text for accessibility */}
      <span className="sr-only">{text}</span>
    </div>
  );
};