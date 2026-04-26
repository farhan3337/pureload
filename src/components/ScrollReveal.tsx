import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionStyle } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  /** Strength of the parallax translation in pixels (default 60) */
  parallax?: number;
  /** Whether to fade in based on scroll position */
  fade?: boolean;
  className?: string;
  style?: MotionStyle;
}

/**
 * Wraps children with a scroll-linked parallax + fade effect.
 * Motion is tied directly to the element's position in the viewport,
 * so it animates continuously as the user scrolls (not just on enter).
 */
const ScrollReveal = ({
  children,
  parallax = 60,
  fade = true,
  className,
  style,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fade ? [0.4, 1, 1, 0.6] : [1, 1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y, opacity, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
