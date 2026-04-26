import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProductBenefitsProps {
  benefits: string[];
  productName: string;
  benefitsTitle?: string;
}

const BENEFIT_ICONS = [
  <svg key="1" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4 h8 v3 h-8 z" /><path d="M11 7 h10 v18 a3 3 0 0 1-3 3 h-4 a3 3 0 0 1-3-3 z" /><path d="M14 14 h4 M16 12 v4" />
  </svg>,
  <svg key="2" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 4 L8 18 H15 L14 28 L24 14 H17 Z" />
  </svg>,
  <svg key="3" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="11" /><path d="M16 10 v6 l4 2" />
  </svg>,
  <svg key="4" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="11" /><path d="M11 16 L15 20 L22 12" />
  </svg>,
  <svg key="5" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4 L26 8 V16 C26 22 21 26 16 28 C11 26 6 22 6 16 V8 Z" />
    <path d="M12 16 L15 19 L21 13" />
  </svg>,
  <svg key="6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 26 V21 M11 26 V16 M17 26 V11 M23 26 V6" /><path d="M3 28 H27" /><path d="M19 8 L23 6 L22 10" />
  </svg>,
];

const ProductBenefits = ({ benefits, productName, benefitsTitle }: ProductBenefitsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0.2, 0.9], [100, -30]);
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <div
      ref={sectionRef}
      style={{
        background: 'hsl(var(--pl-dark))',
        borderTop: '1px solid rgba(255,255,255,.04)',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated grid */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, y: bgGridY,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glow */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', top: '20%', left: '50%', x: '-50%', y: glowY, opacity: glowOpacity,
          width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
          pointerEvents: 'none', filter: 'blur(50px)',
        }}
      />

      {/* Vertical accent line */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', left: '50%', top: '15%', bottom: '15%', width: 1,
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.35) 50%, transparent 100%)',
          scaleY: lineScale, transformOrigin: 'top',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header with parallax */}
        <motion.div style={{ y: headerY, opacity: headerOpacity, textAlign: 'center', marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, letterSpacing: '14px' }}
            whileInView={{ opacity: 1, letterSpacing: '6px' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
              color: 'hsl(var(--primary))', textTransform: 'uppercase', marginBottom: 18,
            }}
          >
            — {benefitsTitle || `Why ${productName}?`} —
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 6vw, 68px)',
              lineHeight: 0.9, letterSpacing: 1, color: 'hsl(var(--pl-white))', marginBottom: 16,
            }}
          >
            THE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>BENEFITS</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-ui)', fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: 'rgba(255,255,255,.45)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7,
            }}
          >
            Every ingredient serves a purpose. Every benefit is by design.
          </motion.p>
        </motion.div>

        {/* Benefits grid with parallax */}
        <motion.div
          style={{
            y: gridY,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 14,
          }}
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, borderColor: 'rgba(255,90,0,0.35)' }}
              style={{
                background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 16,
                padding: '38px 26px 32px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.3s ease',
              }}
            >
              {/* Top accent line */}
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 50%, transparent 100%)',
                opacity: 0.4,
              }} />

              {/* Number marker */}
              <div aria-hidden style={{
                position: 'absolute', top: 14, right: 18,
                fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 2,
                color: 'rgba(255,255,255,0.15)', fontWeight: 700,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon tile */}
              <motion.div
                whileHover={{ rotate: -4, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: 'rgba(255,90,0,0.08)',
                  border: '1px solid rgba(255,90,0,0.2)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: 'hsl(var(--primary))', marginBottom: 22,
                }}
              >
                <div style={{ width: 28, height: 28 }}>{BENEFIT_ICONS[i % BENEFIT_ICONS.length]}</div>
              </motion.div>

              <div style={{
                fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700,
                letterSpacing: 3, color: 'hsl(var(--primary))', textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                Benefit {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>
                {b}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductBenefits;