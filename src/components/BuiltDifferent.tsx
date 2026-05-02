import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Custom SVG icons — no emojis, on-brand minimal line work
const ProofIcon = ({ type }: { type: string }) => {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (type) {
    case 'no-fillers':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" />
          <path d="M7 7l18 18" />
        </svg>
      );
    case 'transparent':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="9" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
          <path d="M3 16h2M27 16h2M16 3v2M16 27v2" />
        </svg>
      );
    case 'dosages':
      return (
        <svg {...common}>
          <path d="M6 22h20M16 22V6M10 12l6-6 6 6" />
          <circle cx="16" cy="6" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'performance':
      return (
        <svg {...common}>
          <path d="M14 4l-8 14h7l-2 10 9-14h-7l1-10z" />
        </svg>
      );
    default:
      return null;
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

  // Scroll-driven motion for the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Header parallax — drifts up as user scrolls
  const headerY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Proof strip — slides in from sides
  const proofX = useTransform(scrollYProgress, [0.1, 0.4], [-50, 0]);
  const proofOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  // Core message — drifts up slightly slower
  const coreY = useTransform(scrollYProgress, [0.2, 0.7], [120, -40]);
  const coreOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  // Closing block — scales in dramatically
  const closeScale = useTransform(scrollYProgress, [0.55, 0.85], [0.85, 1]);
  const closeOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  // Ambient glow — moves with scroll for depth
  const glowY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  // Background grid lines drift
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'hsl(var(--pl-black))',
        padding: 'clamp(80px, 10vw, 140px) 6vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated grid background — moves with scroll for depth */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          y: gridY,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Animated ambient glow */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          x: '-50%',
          y: glowY,
          opacity: glowOpacity,
          width: '90vw',
          height: '90vw',
          maxWidth: 1400,
          maxHeight: 1400,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 55%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating accent line */}
      {/* <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: 1,
          height: '100%',
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.3) 50%, transparent 100%)',
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          scaleY: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.6]),
          transformOrigin: 'top',
        }}
      /> */}

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        {/* ── Header with scroll parallax ── */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            initial={{ opacity: 0, letterSpacing: '14px' }}
            whileInView={{ opacity: 1, letterSpacing: '6px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: 'hsl(var(--primary))',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 18,
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
              lineHeight: 0.95,
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              marginBottom: 18,
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
              color: 'rgba(255,255,255,.65)',
              maxWidth: 720,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            No fillers. No shortcuts. No watered-down ingredients. Just performance-driven supplements that
            actually do something.
          </motion.p>
        </motion.div>

        {/* ── Proof strip — slides in horizontally ── */}
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
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '22px 22px',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,.08)',
                background: 'linear-gradient(180deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.01) 100%)',
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 2,
                color: 'hsl(var(--pl-white))',
                textTransform: 'uppercase',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.3s ease',
              }}
            >
              {/* icon tile */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'rgba(255,90,0,0.08)',
                  border: '1px solid rgba(255,90,0,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(var(--primary))',
                  flexShrink: 0,
                }}
              >
                <ProofIcon type={p.type} />
              </div>
              <span>{p.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Core message — scroll-driven entrance ── */}
        <motion.div
          style={{
            y: coreY,
            opacity: coreOpacity,
            maxWidth: 820,
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 4.5vw, 60px)',
              lineHeight: 1,
              letterSpacing: 0.5,
              color: 'hsl(var(--pl-white))',
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            BUILT DIFFERENT <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>FROM THE START</em>
          </h3>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,.72)',
              lineHeight: 1.75,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
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

            {/* Scroll-driven taglines */}
            <motion.div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 24,
                marginTop: 16,
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(22px, 2.2vw, 32px)',
                color: 'hsl(var(--primary))',
                letterSpacing: 2,
              }}
            >
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

        {/* ── Closing — scales in dramatically ── */}
        <motion.div
          style={{
            scale: closeScale,
            opacity: closeOpacity,
            marginTop: 100,
            padding: 'clamp(50px, 7vw, 80px) 30px',
            borderTop: '1px solid rgba(255,255,255,.08)',
            borderBottom: '1px solid rgba(255,255,255,.08)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle radial accent behind the closing line */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(38px, 5.5vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              position: 'relative',
            }}
          >
            YOU DON'T TAKE IT.
            <br />
            <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>YOU FEEL IT.</em>
          </h3>
          <p
            style={{
              marginTop: 24,
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,.6)',
              maxWidth: 540,
              margin: '24px auto 0',
              lineHeight: 1.6,
              position: 'relative',
            }}
          >
            When what you're putting in your body is built right—you don't question it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BuiltDifferent;