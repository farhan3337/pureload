import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin scroll-linked progress bar fixed to the top of the viewport.
 * Driven directly by window scroll progress for smooth, frame-accurate motion.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(24, 100%, 60%))',
        zIndex: 9999,
        pointerEvents: 'none',
        boxShadow: '0 0 12px hsl(var(--primary) / 0.6)',
      }}
    />
  );
};

export default ScrollProgress;
