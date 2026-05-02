import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
  {
    title: 'SCIENCE-BACKED',
    desc: 'Clinically studied ingredients in every product — from creatine monohydrate to Tongkat Ali.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4 L26 8 V16 C26 22 21 26 16 28 C11 26 6 22 6 16 V8 Z" />
        <path d="M12 16 L15 19 L21 13" />
      </svg>
    ),
  },
  {
    title: 'REAL RESULTS',
    desc: 'Premium formulas designed for measurable improvement in strength, energy, and wellness.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 4 L8 18 H15 L14 28 L24 14 H17 Z" />
      </svg>
    ),
  },
  {
    title: 'CLEAN FORMULA',
    desc: 'Lab tested, GMP certified, FDA registered facility. No artificial junk — just pure performance.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="11" />
        <path d="M11 16 L15 20 L22 12" />
      </svg>
    ),
  },
  {
    title: 'MADE IN USA',
    desc: 'Proudly manufactured in the United States. Distributed by Arcdatum, Miami FL.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9 H28 M4 16 H28 M4 23 H28" />
        <rect x="4" y="6" width="13" height="10" />
        <circle cx="10.5" cy="11" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Header parallax — drifts up faster than the pillars
  const headerY = useTransform(scrollYProgress, [0, 1], [100, -80]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Eyebrow letter-spacing animates open
  const eyebrowSpacing = useTransform(scrollYProgress, [0.05, 0.3], ['10px', '6px']);

  // Pillars block — drifts up at a slower rate (parallax depth)
  const pillarsY = useTransform(scrollYProgress, [0.2, 0.9], [120, -40]);

  // Background grid drifts
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  // Glowing accent stripe scales as you scroll through
  // const stripeScale = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);

  // Ambient orange glow moves with scroll
  const glowY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'hsl(var(--pl-dark))',
        borderTop: '1px solid rgba(255,255,255,.04)',
        borderBottom: '1px solid rgba(255,255,255,.04)',
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated grid texture */}
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
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient glow that moves with scroll */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          x: '-50%',
          y: glowY,
          opacity: glowOpacity,
          width: '70vw',
          height: '70vw',
          maxWidth: 900,
          maxHeight: 900,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />

      {/* Vertical accent stripe — scales with scroll */}
      {/* <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '15%',
          bottom: '15%',
          width: 1,
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.4) 50%, transparent 100%)',
          scaleY: stripeScale,
          transformOrigin: 'top',
        }}
      /> */}

      <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Header — scroll parallax ── */}
        <motion.div style={{ y: headerY, opacity: headerOpacity, textAlign: 'center' }}>
          <motion.div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              fontWeight: 800,
              color: 'hsl(var(--primary))',
              textTransform: 'uppercase',
              letterSpacing: eyebrowSpacing,
              marginBottom: 22,
            }}
          >
            — Our Mission —
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 6vw, 78px)',
              lineHeight: 0.9,
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              marginBottom: 30,
            }}
          >
            FUEL THE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>BEAST</em> WITHIN
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: 'rgba(255,255,255,.5)',
              lineHeight: 1.85,
              maxWidth: 660,
              margin: '0 auto 60px',
            }}
          >
            PURELOAD was born from a simple idea: supplementation shouldn't feel like a chore.
            We believe in making science-backed performance accessible, enjoyable, and effortless.
            Our mission is to empower every athlete, gym-goer, and health-conscious individual to reach
            their full potential without compromise.
          </motion.p>
        </motion.div>

        {/* ── Pillars grid — scroll parallax + stagger ── */}
        <motion.div
          style={{
            y: pillarsY,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
            marginTop: 20,
          }}
        >
          {pillars.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -8,
                borderColor: 'hsl(var(--primary) / 0.45)',
              }}
              style={{
                background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 16,
                padding: '40px 26px 34px',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.3s ease',
              }}
            >
              {/* Number marker — top right */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: 'rgba(255,255,255,0.18)',
                }}
              >
                0{i + 1}
              </div>

              {/* Hover orange glow tint */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)',
                  opacity: 0.3,
                }}
              />

              {/* Icon tile */}
              <motion.div
                whileHover={{ rotate: -4, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: 'rgba(255,90,0,0.08)',
                  border: '1px solid rgba(255,90,0,0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(var(--primary))',
                  marginBottom: 22,
                }}
              >
                <div style={{ width: 28, height: 28 }}>{b.icon}</div>
              </motion.div>

              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 22,
                  letterSpacing: 1.5,
                  color: 'hsl(var(--pl-white))',
                  marginBottom: 10,
                  lineHeight: 1.1,
                }}
              >
                {b.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'rgba(255,255,255,.42)',
                  lineHeight: 1.7,
                  letterSpacing: 0.2,
                }}
              >
                {b.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default MissionSection;