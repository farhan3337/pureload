import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import heroBg from '../assets/new-image-1.jpeg';

// Custom SVG icons
const ProofIcon = ({ type }: { type: string }) => {
  const common = {
    width: 28, height: 28, viewBox: '0 0 32 32', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  switch (type) {
    case 'no-fillers': return <svg {...common}><circle cx="16" cy="16" r="12" /><path d="M7 7l18 18" /></svg>;
    case 'transparent': return <svg {...common}><circle cx="16" cy="16" r="9" /><circle cx="16" cy="16" r="3" fill="currentColor" /><path d="M3 16h2M27 16h2M16 3v2M16 27v2" /></svg>;
    case 'dosages': return <svg {...common}><path d="M6 22h20M16 22V6M10 12l6-6 6 6" /><circle cx="16" cy="6" r="1.5" fill="currentColor" /></svg>;
    case 'performance': return <svg {...common}><path d="M14 4l-8 14h7l-2 10 9-14h-7l1-10z" /></svg>;
    default: return null;
  }
};

const proofs = [
  { type: 'no-fillers', label: 'No Fillers' },
  { type: 'transparent', label: 'Fully Transparent' },
  { type: 'dosages', label: 'Real Dosages' },
  { type: 'performance', label: 'Performance Driven' },
];

const BuiltDifferent = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Track viewport width reactively so SSR and resize both work correctly
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax on the background image.
  // On mobile: no Y translation (keeps image at natural size/position).
  // On desktop: subtle ±8% parallax.
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['0%', '0%'] : ['-8%', '8%']
  );

  // Header
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Proof strip
  const proofX = useTransform(scrollYProgress, [0.1, 0.4], [-40, 0]);
  const proofOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // Core message
  const coreY = useTransform(scrollYProgress, [0.2, 0.7], [80, -30]);
  const coreOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  // Closing
  const closeScale = useTransform(scrollYProgress, [0.55, 0.85], [0.88, 1]);
  const closeOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 140px) 6vw',
      }}
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          // On mobile: flush with the section edges — no bleed needed because
          // there is no parallax movement, so the image never needs extra room.
          // On desktop: extend -10% top/bottom to give the parallax room to slide.
          inset: isMobile ? '0' : '-10% 0',
          y: bgY,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          // Mobile: center the image so the subject stays in frame.
          // Desktop: keep the original vertical offset.
          backgroundPosition: isMobile ? 'center center' : 'center 40%',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Dark overlay — heavier at top/bottom, lighter in the middle so image shows */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `
  linear-gradient(
    to bottom,
    rgba(0,0,0,0.95) 0%,
    rgba(0,0,0,0.82) 25%,
    rgba(0,0,0,0.72) 50%,
    rgba(0,0,0,0.82) 75%,
    rgba(0,0,0,0.95) 100%
  )
`,
          zIndex: 1,
        }}
      />

      {/* Orange brand tint overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,90,0,0.08) 0%, transparent 70%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>

        {/* ── Header ── */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            initial={{ opacity: 0, letterSpacing: '14px' }}
            whileInView={{ opacity: 1, letterSpacing: '6px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-ui)', fontSize: 11,
              color: 'hsl(var(--primary))', fontWeight: 800,
              textTransform: 'uppercase', marginBottom: 18,
            }}
          >
            — The Difference —
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(44px, 6.5vw, 92px)',
              lineHeight: 0.95, letterSpacing: 1,
              color: 'hsl(var(--pl-white))', marginBottom: 18,
            }}
          >
            BUILT WITH <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>INTENTION.</em>
            <br />
            DESIGNED TO BE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>FELT.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              color: 'rgba(255,255,255,.7)',
              maxWidth: 720, margin: '0 auto', lineHeight: 1.6,
            }}
          >
            No fillers. No shortcuts. No watered-down ingredients. Just performance-driven supplements that
            actually do something.
          </motion.p>
        </motion.div>

        {/* ── Proof strip ── */}
        <motion.div
          style={{
            x: proofX,
            opacity: proofOpacity,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            margin: '60px auto 90px',
            maxWidth: 1000,
          }}
        >
          {proofs.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: 'hsl(var(--primary) / 0.5)' }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '22px 22px', borderRadius: 14,
                border: '1px solid rgba(255,255,255,.12)',
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                fontFamily: 'var(--font-ui)', fontSize: 12,
                fontWeight: 800, letterSpacing: 2,
                color: 'hsl(var(--pl-white))', textTransform: 'uppercase',
                cursor: 'default', transition: 'border-color 0.3s ease',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'rgba(255,90,0,0.12)',
                border: '1px solid rgba(255,90,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'hsl(var(--primary))', flexShrink: 0,
              }}>
                <ProofIcon type={p.type} />
              </div>
              <span>{p.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Core message ── */}
        <motion.div
          style={{
            y: coreY, opacity: coreOpacity,
            maxWidth: 820, margin: '0 auto', textAlign: 'left',
          }}
        >
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(34px, 4.5vw, 60px)',
            lineHeight: 1, letterSpacing: 0.5,
            color: 'hsl(var(--pl-white))',
            marginBottom: 32, textAlign: 'center',
          }}>
            BUILT DIFFERENT <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>FROM THE START</em>
          </h3>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            color: 'rgba(255,255,255,.78)',
            lineHeight: 1.75,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <p>
              Most supplements are built to maximize margins—loaded with cheap ingredients, hidden blends, and
              doses too low to make a difference.
            </p>
            <p style={{ color: 'hsl(var(--pl-white))', fontWeight: 600, fontSize: 'clamp(16px, 1.3vw, 19px)' }}>
              We didn't build PURELOAD that way.
            </p>
            <p>
              Every product is carefully developed with purpose, using ingredients that serve a real function
              in your body—supporting energy, recovery, balance, and performance.
            </p>

            <motion.div style={{
              display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 16,
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(22px, 2.2vw, 32px)',
              color: 'hsl(var(--primary))', letterSpacing: 2,
            }}>
              {['NO FILLER COMPOUNDS.', 'NO GUESSWORK.', 'NO SHORTCUTS.'].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>

            <p style={{ marginTop: 16, color: 'hsl(var(--pl-white))', fontWeight: 600, fontSize: 'clamp(16px, 1.3vw, 19px)' }}>
              Just products built to work.
            </p>
          </div>
        </motion.div>

        {/* ── Closing ── */}
        <motion.div
          style={{
            scale: closeScale, opacity: closeOpacity,
            marginTop: 100,
            padding: 'clamp(50px, 7vw, 80px) 30px',
            borderTop: '1px solid rgba(255,255,255,.1)',
            borderBottom: '1px solid rgba(255,255,255,.1)',
            textAlign: 'center', position: 'relative',
          }}
        >
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(38px, 5.5vw, 80px)',
            lineHeight: 0.95, letterSpacing: 1,
            color: 'hsl(var(--pl-white))', position: 'relative',
          }}>
            YOU DON'T TAKE IT.
            <br />
            <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>YOU FEEL IT.</em>
          </h3>
          <p style={{
            marginTop: 24,
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(14px, 1.2vw, 17px)',
            color: 'rgba(255,255,255,.65)',
            maxWidth: 540, margin: '24px auto 0',
            lineHeight: 1.6, position: 'relative',
          }}>
            When what you're putting in your body is built right—you don't question it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BuiltDifferent;