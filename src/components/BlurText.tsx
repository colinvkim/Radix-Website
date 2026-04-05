import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className,
  delay = 0,
}) => {
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
      { threshold: 0.1 },
    );

    const element = containerRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, []);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`w-full ${className ?? ""}`}>
      <span className="flex w-full flex-wrap justify-center gap-x-[0.25em] text-center">
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
            animate={
              visible
                ? {
                    opacity: 1,
                    filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
                    y: [30, -4, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.4,
              delay: delay + wordIndex * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </div>
  );
};
