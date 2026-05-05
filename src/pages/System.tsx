import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/image-2.jpeg'; // adjust path if needed

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }),
};

const STEPS = [
  {
    n: '01',
    title: 'Choose Your Goal',
    desc: 'Energy, recovery, wellness, or performance. Know exactly what you want to achieve.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="5" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        <path d="M16 3 V6 M16 26 V29 M3 16 H6 M26 16 H29" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Build Your Routine',
    desc: 'Create a simple daily plan that fits your lifestyle and schedule.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9 V16 L21 20" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Stack with Purpose',
    desc: 'Choose the right combination of products designed to support your goal.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="18" width="22" height="8" rx="2" />
        <rect x="8" y="11" width="16" height="7" rx="2" />
        <rect x="11" y="5" width="10" height="6" rx="2" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Stay Consistent',
    desc: 'Consistency is key. Daily use brings long-term results.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="11" />
        <path d="M4 16 C4 9.4 9.4 4 16 4" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    n: '05',
    title: 'Experience the Difference',
    desc: 'Feel the impact in your energy, focus, and overall performance.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 5 L20 14 L30 14 L22 20 L25 29 L16 23 L7 29 L10 20 L2 14 L12 14 Z" />
      </svg>
    ),
  },
];

const CATEGORIES = [
  {
    title: 'PERFORMANCE',
    desc: 'Pre-workout, Creatine — built to push your limits.',
    cta: '/collections',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 4 L8 18 H15 L14 28 L24 14 H17 Z" />
      </svg>
    ),
  },
  {
    title: 'RECOVERY',
    desc: 'Sleep, Ashwagandha — rebuild stronger every night.',
    cta: '/collections',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20 C8 14 12 10 16 10 C20 10 24 14 24 20" />
        <path d="M6 20 H26" />
        <path d="M13 7 C13 5 15 4 16 4 C17 4 19 5 19 7" />
      </svg>
    ),
  },
  {
    title: 'DAILY WELLNESS',
    desc: 'Multivitamin, Debloat — the foundation of everything.',
    cta: '/collections',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4 L26 8 V16 C26 22 21 26 16 28 C11 26 6 22 6 16 V8 Z" />
        <path d="M12 16 L15 19 L21 13" />
      </svg>
    ),
  },
  {
    title: 'SUPPORT',
    desc: 'Male, Hormone — optimize what matters most.',
    cta: '/collections',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="12" r="5" />
        <path d="M8 28 C8 23 11.6 20 16 20 C20.4 20 24 23 24 28" />
        <path d="M22 8 L26 4 M26 4 H22 M26 4 V8" />
      </svg>
    ),
  },
];

const ROUTINE = [
  {
    time: 'MORNING',
    label: 'Wellness + Energy',
    desc: 'Start the day fuelled and focused.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="6" />
        <path d="M16 4 V7 M16 25 V28 M4 16 H7 M25 16 H28 M7.5 7.5 L9.6 9.6 M22.4 22.4 L24.5 24.5 M24.5 7.5 L22.4 9.6 M9.6 22.4 L7.5 24.5" />
      </svg>
    ),
  },
  {
    time: 'PRE-WORKOUT',
    label: 'Performance',
    desc: 'Prime your body before every session.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 26 V21 M10 26 V16 M15 26 V11 M20 26 V6" />
        <path d="M3 28 H24" />
        <path d="M16 8 L20 6 L19 10" />
      </svg>
    ),
  },
  {
    time: 'NIGHT',
    label: 'Recovery',
    desc: 'Sleep deeper. Rebuild faster.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 8 C14 8 10 12.5 10 18 C10 23.5 14.5 27 20 27 C12 27 7 22 7 15 C7 9.5 12 5 18 5 C18.7 5 19.4 5.07 20 5.2" />
        <path d="M23 7 L25 5 M25 5 H22 M25 5 V8" />
      </svg>
    ),
  },
];

// ── Reusable section wrapper with scroll parallax ──
const ParallaxSection = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.2]);
  const lineScale = useTransform(scrollYProgress, [0.15, 0.65], [0, 1]);

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* Grid texture */}
      <motion.div aria-hidden style={{
        position: 'absolute', inset: 0, y: bgY,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        pointerEvents: 'none',
      }} />
      {/* Ambient glow */}
      <motion.div aria-hidden style={{
        position: 'absolute', top: '20%', left: '50%', x: '-50%',
        opacity: glowOpacity,
        width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.09) 0%, transparent 60%)',
        pointerEvents: 'none', filter: 'blur(50px)',
      }} />
      {/* Vertical accent line */}
      {/* <motion.div aria-hidden style={{
        position: 'absolute', left: '50%', top: '15%', bottom: '15%', width: 1,
        background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.35) 50%, transparent 100%)',
        scaleY: lineScale, transformOrigin: 'top',
      }} /> */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

// ── Card component with consistent design language ──
const Card = ({ children, delay = 0, accent = false }: { children: React.ReactNode; delay?: number; accent?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.94 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8, borderColor: 'rgba(255,90,0,0.35)' }}
    style={{
      background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
      border: `1px solid ${accent ? 'rgba(255,90,0,0.2)' : 'rgba(255,255,255,.06)'}`,
      borderRadius: 16,
      position: 'relative', overflow: 'hidden',
      cursor: 'default', transition: 'border-color 0.3s ease',
    }}
  >
    {/* Top accent line */}
    <div aria-hidden style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 1,
      background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 50%, transparent 100%)',
      opacity: 0.4,
    }} />
    {children}
  </motion.div>
);

const System = () => {
  const heroRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, -80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const { scrollYProgress: closingScroll } = useScroll({ target: closingRef, offset: ['start end', 'end start'] });
  const closingScale = useTransform(closingScroll, [0, 0.6], [0.85, 1]);
  const closingOpacity = useTransform(closingScroll, [0, 0.4], [0, 1]);
  const closingGlowScale = useTransform(closingScroll, [0, 0.8], [0.4, 1.2]);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))', overflow: 'hidden' }}>

     {/* ── HERO ── */}
<ParallaxSection style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}>
  <section
    ref={heroRef}
    className="pt-[130px] pb-20 px-6 md:px-20 text-center"
    style={{
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    {/* Background image */}
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        y: heroY, // parallax with scroll
        scale: 1.05, // slight zoom buffer for parallax
        zIndex: 0,
      }}
    />

    {/* Vignette — darkens edges, keeps centre punchy */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(
            ellipse 90% 80% at 50% 50%,
            transparent 0%,
            rgba(0,0,0,0.55) 60%,
            rgba(0,0,0,0.92) 100%
          )
        `,
        zIndex: 1,
      }}
    />

    {/* Top + bottom gradient — fades into surrounding sections */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(
            to bottom,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.35) 25%,
            rgba(0,0,0,0.35) 70%,
            rgba(0,0,0,0.95) 100%
          )
        `,
        zIndex: 1,
      }}
    />

    {/* Subtle orange wash — ties to brand */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,90,0,0.10) 0%, transparent 70%)',
        zIndex: 1,
      }}
    />

    {/* Content */}
    <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 2 }}>
      <motion.div
        initial={{ opacity: 0, letterSpacing: '14px' }}
        animate={{ opacity: 1, letterSpacing: '6px' }}
        transition={{ duration: 1, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
          color: 'hsl(var(--primary))', textTransform: 'uppercase', marginBottom: 20,
        }}
      >
        — The System —
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(48px, 8vw, 108px)',
          lineHeight: 0.9, letterSpacing: 2,
          color: 'hsl(var(--pl-white))',
          textShadow: '0 4px 32px rgba(0,0,0,0.7)',
        }}
      >
        THE PURELOAD{' '}
        <em style={{
          color: 'hsl(var(--primary))',
          fontStyle: 'normal',
          textShadow: '0 4px 32px rgba(255,90,0,0.4), 0 4px 32px rgba(0,0,0,0.7)',
        }}>SYSTEM</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          maxWidth: 620, margin: '28px auto 0',
          fontFamily: 'var(--font-ui)', fontSize: 'clamp(14px, 1.3vw, 17px)',
          color: 'rgba(255,255,255,.78)',
          lineHeight: 1.7,
          textShadow: '0 2px 12px rgba(0,0,0,0.8)',
        }}
      >
        More than supplements. A structured approach to performance, recovery, and daily discipline.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        style={{ marginTop: 36 }}
      >
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
          <Link to="/collections" className="btn-p">Shop Products</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
</ParallaxSection>

      {/* ── HOW IT WORKS ── */}
<ParallaxSection style={{ padding: 'clamp(80px, 10vw, 130px) clamp(24px, 5vw, 80px)' }}>
  <style>{`
    .how-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;
      position: relative;
      margin-top: 8px;
    }
    @media (min-width: 700px) {
      .how-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1100px) {
      .how-grid {
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
      }
    }
    .how-connector {
      display: none;
    }
    @media (min-width: 1100px) {
      .how-connector {
        display: block;
        position: absolute;
        top: 102px;
        left: 10%;
        right: 10%;
        height: 1px;
        background: linear-gradient(90deg,
          transparent 0%,
          hsl(var(--primary) / 0.4) 12%,
          hsl(var(--primary) / 0.4) 88%,
          transparent 100%);
        z-index: 0;
        pointer-events: none;
      }
    }
    .how-card-inner {
      position: relative;
      padding: 38px 22px 30px;
      min-height: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .how-num-watermark {
      position: absolute;
      top: 12px;
      right: 16px;
      font-family: var(--font-heading);
      font-size: 52px;
      font-weight: 900;
      color: rgba(255,255,255,0.035);
      line-height: 1;
      pointer-events: none;
      transition: color 0.4s ease;
      letter-spacing: -2px;
    }
    .how-card-inner:hover .how-num-watermark {
      color: rgba(255,90,0,0.16);
    }
    .how-icon-node {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background:
        radial-gradient(circle at 30% 30%, rgba(255,90,0,0.20), rgba(255,90,0,0.05) 70%),
        hsl(var(--pl-black));
      border: 1px solid rgba(255,90,0,0.32);
      display: flex;
      align-items: center;
      justify-content: center;
      color: hsl(var(--primary));
      margin-bottom: 24px;
      position: relative;
      z-index: 2;
      transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .how-card-inner:hover .how-icon-node {
      border-color: hsl(var(--primary));
      box-shadow:
        0 0 0 4px rgba(255,90,0,0.06),
        0 0 28px rgba(255,90,0,0.35);
      transform: translateY(-3px) scale(1.04);
    }
    .how-step-label {
      font-family: var(--font-ui);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 4px;
      color: hsl(var(--primary));
      margin-bottom: 12px;
      opacity: 0.85;
    }
    .how-card-title {
      font-family: var(--font-heading);
      font-size: 22px;
      letter-spacing: 0.5px;
      color: hsl(var(--pl-white));
      line-height: 1.15;
      margin-bottom: 12px;
    }
    .how-card-desc {
      font-family: var(--font-ui);
      font-size: 12.5px;
      color: rgba(255,255,255,0.5);
      line-height: 1.65;
    }
  `}</style>

  <div style={{ maxWidth: 1240, margin: '0 auto' }}>
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', marginBottom: 64 }}
    >
      <div style={{
        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
        color: 'hsl(var(--primary))', textTransform: 'uppercase',
        letterSpacing: 6, marginBottom: 18,
      }}>
        — How It Works —
      </div>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(36px, 5vw, 68px)',
        color: 'hsl(var(--pl-white))', letterSpacing: 1, lineHeight: 0.92,
      }}>
        5 STEPS TO <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>RESULTS</em>
      </h2>
      <p style={{
        maxWidth: 520, margin: '20px auto 0',
        fontFamily: 'var(--font-ui)', fontSize: 14,
        color: 'rgba(255,255,255,0.45)', lineHeight: 1.65,
      }}>
        A clear, structured path — from intention to transformation.
      </p>
    </motion.div>

    {/* Cards row with integrated timeline */}
    <div className="how-grid">
      <div className="how-connector" aria-hidden />
      {STEPS.map((s, i) => (
        <Card key={s.n} delay={i * 0.09}>
          <div className="how-card-inner">
            <div className="how-num-watermark">{s.n}</div>

            <motion.div
              className="how-icon-node"
              whileHover={{ rotate: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ width: 30, height: 30 }}>{s.icon}</div>
            </motion.div>

            <div className="how-step-label">STEP {s.n}</div>
            <div className="how-card-title">{s.title}</div>
            <div className="how-card-desc">{s.desc}</div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</ParallaxSection>
      {/* ── CATEGORIES ── */}
      <ParallaxSection style={{
        borderTop: '1px solid rgba(255,255,255,.04)',
        background: 'hsl(var(--pl-dark))',
        padding: 'clamp(80px, 10vw, 130px) clamp(24px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
              color: 'hsl(var(--primary))', textTransform: 'uppercase',
              letterSpacing: 6, marginBottom: 18,
            }}>
              — Build Your Stack —
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              color: 'hsl(var(--pl-white))', letterSpacing: 1, lineHeight: 0.92,
            }}>
              BY <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>CATEGORY</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
            {CATEGORIES.map((c, i) => (
              <Card key={c.title} delay={i * 0.09}>
                <div style={{ padding: '36px 26px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}>
                  {/* Number marker */}
                  <div aria-hidden style={{
                    position: 'absolute', top: 14, right: 18,
                    fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 2,
                    color: 'rgba(255,255,255,0.15)', fontWeight: 700,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div>
                    {/* Icon tile */}
                    <motion.div
                      whileHover={{ rotate: -4, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: 48, height: 48, borderRadius: 11,
                        background: 'rgba(255,90,0,0.08)',
                        border: '1px solid rgba(255,90,0,0.22)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        color: 'hsl(var(--primary))', marginBottom: 20,
                      }}
                    >
                      <div style={{ width: 26, height: 26 }}>{c.icon}</div>
                    </motion.div>

                    <div style={{
                      fontFamily: 'var(--font-heading)', fontSize: 26,
                      letterSpacing: 2, color: 'hsl(var(--pl-white))', marginBottom: 10, lineHeight: 1.1,
                    }}>
                      {c.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.65 }}>
                      {c.desc}
                    </div>
                  </div>

                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} style={{ marginTop: 22 }}>
                    <Link
                      to={c.cta}
                      style={{
                        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
                        letterSpacing: 2, color: 'hsl(var(--primary))', textTransform: 'uppercase',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}
                    >
                      Shop Now
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 4 H9 M6 1 L9 4 L6 7" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ── DAILY ROUTINE ── */}
      <ParallaxSection style={{ padding: 'clamp(80px, 10vw, 130px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
              color: 'hsl(var(--primary))', textTransform: 'uppercase',
              letterSpacing: 6, marginBottom: 18,
            }}>
              — Daily Routine —
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              color: 'hsl(var(--pl-white))', letterSpacing: 1, lineHeight: 0.92,
            }}>
              SIMPLE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>STACK</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {ROUTINE.map((r, i) => (
              <Card key={r.time} delay={i * 0.1} accent>
                <div style={{ padding: '38px 28px 34px', textAlign: 'center' }}>
                  {/* Icon tile */}
                  <motion.div
                    whileHover={{ rotate: -4, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 56, height: 56, borderRadius: 14,
                      background: 'rgba(255,90,0,0.1)',
                      border: '1px solid rgba(255,90,0,0.3)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: 'hsl(var(--primary))', marginBottom: 22,
                    }}
                  >
                    <div style={{ width: 30, height: 30 }}>{r.icon}</div>
                  </motion.div>

                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 4,
                    color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
                    marginBottom: 10,
                  }}>
                    {r.time}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: 28,
                    letterSpacing: 1, color: 'hsl(var(--pl-white))', marginBottom: 10, lineHeight: 1.1,
                  }}>
                    {r.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>
                    {r.desc}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Timeline connector beneath cards */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 0, marginTop: 32, paddingInline: '5%',
          }}>
            {ROUTINE.map((r, i) => (
              <div key={r.time} style={{ display: 'flex', alignItems: 'center', flex: i < ROUTINE.length - 1 ? 1 : 'none' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'hsl(var(--primary))', flexShrink: 0,
                  boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
                }} />
                {i < ROUTINE.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.2))' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ── CLOSING ── */}
      <section
        ref={closingRef}
        style={{
          borderTop: '1px solid rgba(255,255,255,.04)',
          padding: 'clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Glow scales in dramatically */}
        <motion.div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%',
          scale: closingGlowScale,
          width: '80vw', height: '80vw', maxWidth: 1000, maxHeight: 1000,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 55%)',
          pointerEvents: 'none', filter: 'blur(60px)',
        }} />

        <motion.div
          style={{ scale: closingScale, opacity: closingOpacity, maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: '14px' }}
            whileInView={{ opacity: 1, letterSpacing: '6px' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
              color: 'hsl(var(--primary))', textTransform: 'uppercase', marginBottom: 22,
            }}
          >
            — More Than Supplements —
          </motion.div>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'hsl(var(--pl-white))', letterSpacing: 1, lineHeight: 1.1,
          }}>
            This is more than supplements.
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(44px, 7vw, 82px)',
            color: 'hsl(var(--primary))', letterSpacing: 2, marginTop: 12, lineHeight: 0.92,
          }}>
            THIS IS COMMUNITY.
          </div>

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.2 }}
  style={{
    marginTop: 40,
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 24px',
  }}
>
  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
    style={{ display: 'inline-block', minWidth: 0, flex: '1 1 200px', maxWidth: 320 }}>
    <Link to="/collections" className="btn-p"
      style={{ display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>
      Shop Best Sellers
    </Link>
  </motion.div>
  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
    style={{ display: 'inline-block', minWidth: 0, flex: '1 1 200px', maxWidth: 320 }}>
    <Link to="/bundles" className="btn-o"
      style={{ display: 'block', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>
      Shop Bundles
    </Link>
  </motion.div>
</motion.div>

          {/* Shipping line — no emoji */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              marginTop: 24,
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 2,
              color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 2h9v8H1z" />
              <path d="M10 5h3l2 2v3h-5" />
              <circle cx="4" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
            </svg>
            Free Shipping On All Orders
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default System;