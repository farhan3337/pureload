import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCTS } from '@/data/pureload';
import Footer from '@/components/Footer';

function getProductImg(slug: string) {
  return PRODUCTS.find(p => p.slug === slug)?.img || null;
}
function getProductBg(slug: string) {
  return PRODUCTS.find(p => p.slug === slug)?.bg || '#0d0d0d';
}

// ── SVG Icons ──
const LightningIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 4 L8 18 H15 L14 28 L24 14 H17 Z" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 18 C18 18 13 13 13 7 C13 5.6 13.3 4.3 13.8 3.1 C8.3 4.5 4 9.5 4 15.5 C4 22.4 9.6 28 16.5 28 C22.5 28 27.5 23.7 28.9 18.2 C27.3 18.1 25.7 18 24 18 Z" />
  </svg>
);
const SparkleIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4 L17.5 13 L26 14.5 L17.5 16 L16 25 L14.5 16 L6 14.5 L14.5 13 Z" />
    <path d="M26 4 L26.7 7.3 L30 8 L26.7 8.7 L26 12 L25.3 8.7 L22 8 L25.3 7.3 Z" />
  </svg>
);
const LionIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="14" r="7" />
    <path d="M16 4 V7 M16 21 V25 M9 7 L11 10 M23 7 L21 10 M4 16 H9 M23 16 H28" />
    <path d="M13 17 L16 21 L19 17" />
    <circle cx="13.5" cy="13" r="1" fill="currentColor" />
    <circle cx="18.5" cy="13" r="1" fill="currentColor" />
  </svg>
);
const DnaIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4 C10 4 14 8 14 16 C14 24 10 28 10 28" />
    <path d="M22 4 C22 4 18 8 18 16 C18 24 22 28 22 28" />
    <path d="M10.5 10 H21.5 M10.5 22 H21.5 M11 16 H21" />
  </svg>
);
const SaveIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="11" />
    <path d="M10 16 L14 20 L22 12" />
    <path d="M16 8 V11 M20 9.5 L18.5 12" />
  </svg>
);
const TargetIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="16" r="11" />
    <circle cx="16" cy="16" r="6" />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
    <path d="M16 3 V7 M16 25 V29 M3 16 H7 M25 16 H29" />
  </svg>
);
const PillIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="12" width="20" height="8" rx="4" />
    <path d="M16 12 V20" />
  </svg>
);
const CheckIcon = ({ color = 'currentColor' }: { color?: string }) => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6 L5 9 L10 3" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4 H9 M6 1 L9 4 L6 7" />
  </svg>
);

const STACKS = [
  {
    id: 'performance',
    name: 'Performance Stack',
    tagline: 'TRAIN HARDER. PUSH FURTHER.',
    purpose: 'Built for athletes who demand more from every session. Fuel explosive energy, boost endurance, and support muscle growth — all in one stack.',
    Icon: LightningIcon,
    accentColor: '#FF5A00',
    products: [
      { name: 'Pre-Workout', role: 'Explosive Energy & Focus', slug: 'pureload-wake-up-preworkout' },
      { name: 'Creatine Gummies', role: 'Strength & Power Output', slug: 'pureload' },
      { name: 'Multivitamin', role: 'Foundation & Recovery', slug: 'pureload-multi-gummies' },
    ],
    benefits: ['Increases explosive power', 'Sharpens mental focus', 'Supports muscle growth', 'Reduces fatigue'],
    originalPrice: 119.97,
    bundlePrice: 94.99,
    badge: 'Most Popular',
  },
  {
    id: 'recovery',
    name: 'Recovery Stack',
    tagline: 'REST. REPAIR. COME BACK STRONGER.',
    purpose: 'Recovery is where gains are made. This stack helps you sleep deeper, reduce stress, and let your body rebuild fully between sessions.',
    Icon: MoonIcon,
    accentColor: '#7B5EA7',
    products: [
      { name: 'Sleep Gummies', role: 'Deep Sleep & Restoration', slug: 'pureload-sleep-gummies' },
      { name: 'Ashwagandha Gummies', role: 'Stress & Cortisol Control', slug: 'pureload-ashwagandha-gummies' },
      { name: 'Multivitamin', role: 'Daily Micronutrient Support', slug: 'pureload-multi-gummies' },
    ],
    benefits: ['Improves sleep quality', 'Lowers stress hormones', 'Speeds muscle repair', 'Boosts immunity'],
    originalPrice: 119.97,
    bundlePrice: 94.99,
    badge: 'Best for Rest',
  },
  {
    id: 'balance',
    name: 'Balance Stack',
    tagline: 'FEEL GOOD FROM THE INSIDE OUT.',
    purpose: 'Designed for women who want hormonal harmony, a flatter tummy, and full-body vitality — every single day.',
    Icon: SparkleIcon,
    accentColor: '#E8669A',
    products: [
      { name: "Women's Hormone Support", role: 'Hormonal Balance & Mood', slug: 'pureload-womens-hormonal-support-gummies' },
      { name: 'Debloat ACV Gummies', role: 'Gut Health & Digestion', slug: 'pureload-debloat-acv-gummies' },
      { name: 'Multivitamin', role: 'Complete Nutrient Coverage', slug: 'pureload-multi-gummies' },
    ],
    benefits: ['Supports hormone health', 'Reduces bloating', 'Boosts energy & mood', 'Improves digestion'],
    originalPrice: 119.97,
    bundlePrice: 94.99,
    badge: 'For Her',
  },
  {
    id: 'vitality',
    name: 'Vitality Stack',
    tagline: 'PEAK PERFORMANCE. PEAK MAN.',
    purpose: 'A targeted stack for men who want to optimize testosterone, reduce stress, and feel unstoppable — in the gym and beyond.',
    Icon: LionIcon,
    accentColor: '#2ECC71',
    products: [
      { name: 'Male Enhancement', role: 'Testosterone & Drive', slug: 'pureload-male-enhancement-pills' },
      { name: 'Multivitamin', role: 'Foundation & Vitality', slug: 'pureload-multi-gummies' },
      { name: 'Ashwagandha Gummies', role: 'Stress & Energy Balance', slug: 'pureload-ashwagandha-gummies' },
    ],
    benefits: ['Supports testosterone', 'Increases stamina', 'Reduces stress & fatigue', 'Sharpens focus'],
    originalPrice: 119.97,
    bundlePrice: 94.99,
    badge: 'For Him',
  },
];

const EXPLAINERS = [
  { Icon: DnaIcon, title: 'Synergy', desc: 'Products chosen to amplify each other — not just bundled randomly.' },
  { Icon: SaveIcon, title: 'Save 20%', desc: 'Stack bundles cost less than buying each product on its own.' },
  { Icon: TargetIcon, title: 'Goal-Focused', desc: 'Each stack targets one clear outcome: performance, recovery, balance, or vitality.' },
];

// ── Parallax section wrapper ──
const ParallaxSection = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.2]);

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <motion.div aria-hidden style={{
        position: 'absolute', inset: 0, y: bgY,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        pointerEvents: 'none',
      }} />
      <motion.div aria-hidden style={{
        position: 'absolute', top: '20%', left: '50%', x: '-50%', opacity: glowOpacity,
        width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.09) 0%, transparent 60%)',
        pointerEvents: 'none', filter: 'blur(50px)',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

const StacksPage = ({ onAddCart }: {
  onAddCart: (qty: number, price: number, label: string, variantId?: string, isSubscription?: boolean, subscriptionInterval?: number, img?: string) => void
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, -80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div style={{ background: 'hsl(var(--pl-black))', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── HERO ── */}
      <ParallaxSection style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
        <div
          ref={heroRef}
          style={{
            paddingTop: 'clamp(100px, 14vw, 140px)',
            paddingBottom: 'clamp(48px, 8vw, 80px)',
            paddingLeft: 'clamp(20px, 5vw, 40px)',
            paddingRight: 'clamp(20px, 5vw, 40px)',
            textAlign: 'center',
          }}
        >
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, letterSpacing: '14px' }}
              animate={{ opacity: 1, letterSpacing: '6px' }}
              transition={{ duration: 1, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
                color: 'hsl(var(--primary))', textTransform: 'uppercase', marginBottom: 20,
              }}
            >
              — Supplement Stacks —
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 8vw, 96px)',
                lineHeight: 0.88, letterSpacing: 1,
                color: 'hsl(var(--pl-white))', marginBottom: 24,
              }}
            >
              BUILD YOUR <br />
              <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>PERFECT STACK</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-ui)', fontSize: 'clamp(13px, 1.2vw, 16px)',
                color: 'rgba(255,255,255,.45)', maxWidth: 520,
                margin: '0 auto', lineHeight: 1.75,
              }}
            >
              A stack is a curated set of supplements that work together for a specific goal. Choose yours and save up to 20% vs. buying individually.
            </motion.p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ── EXPLAINER TILES ── */}
      <ParallaxSection style={{ padding: 'clamp(48px, 8vw, 100px) clamp(16px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 12,
          }}>
            {EXPLAINERS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, borderColor: 'rgba(255,90,0,0.3)' }}
                style={{
                  padding: 'clamp(24px, 4vw, 36px) clamp(16px, 3vw, 26px)',
                  borderRadius: 16,
                  background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
                  border: '1px solid rgba(255,255,255,.06)',
                  textAlign: 'center',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default', transition: 'border-color 0.3s ease',
                }}
              >
                <div aria-hidden style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 50%, transparent 100%)',
                  opacity: 0.4,
                }} />
                <div aria-hidden style={{
                  position: 'absolute', top: 14, right: 16,
                  fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 2,
                  color: 'rgba(255,255,255,0.15)', fontWeight: 700,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <motion.div
                  whileHover={{ rotate: -4, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: 'rgba(255,90,0,0.08)',
                    border: '1px solid rgba(255,90,0,0.22)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: 'hsl(var(--primary))', marginBottom: 20,
                  }}
                >
                  <div style={{ width: 28, height: 28 }}><item.Icon /></div>
                </motion.div>
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
                  letterSpacing: 2, color: 'hsl(var(--pl-white))',
                  marginBottom: 10, textTransform: 'uppercase',
                }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(255,255,255,.45)', lineHeight: 1.65 }}>
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* ── STACK CARDS ── */}
      <ParallaxSection style={{ padding: '0 clamp(16px, 5vw, 80px) clamp(60px, 10vw, 140px)' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
          gap: 20,
        }}>
          {STACKS.map((stack, i) => (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredId(stack.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderRadius: 20,
                background: 'linear-gradient(180deg, #0e0e0e 0%, #0a0a0a 100%)',
                border: `1.5px solid ${hoveredId === stack.id ? stack.accentColor + '55' : 'rgba(255,255,255,.07)'}`,
                overflow: 'hidden',
                transition: 'border-color .3s, box-shadow .3s',
                boxShadow: hoveredId === stack.id ? `0 24px 70px ${stack.accentColor}18` : 'none',
                position: 'relative',
                minWidth: 0,
                width: '100%',
              }}
            >
              {/* Accent bar top */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${stack.accentColor}, ${stack.accentColor}00)` }} />

              <div style={{ padding: 'clamp(20px, 4vw, 28px) clamp(16px, 4vw, 28px) 0' }}>

                {/* ── Header: icon + text + badge all in one row, no absolute positioning ── */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  marginBottom: 16,
                  flexWrap: 'wrap',
                }}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.07 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: stack.accentColor + '14',
                      border: `1px solid ${stack.accentColor}33`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: stack.accentColor, flexShrink: 0,
                    }}
                  >
                    <div style={{ width: 28, height: 28 }}><stack.Icon /></div>
                  </motion.div>

                  {/* Tagline + name — takes available space */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                      letterSpacing: 2, color: stack.accentColor,
                      textTransform: 'uppercase', marginBottom: 5,
                      whiteSpace: 'normal', wordBreak: 'break-word',
                    }}>
                      {stack.tagline}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(18px, 3vw, 30px)',
                      letterSpacing: 1, color: 'hsl(var(--pl-white))', lineHeight: 1,
                    }}>
                      {stack.name.toUpperCase()}
                    </div>
                  </div>

                  {/* Badge — in-flow, never overlaps text */}
                  {stack.badge && (
                    <div style={{
                      flexShrink: 0,
                      alignSelf: 'flex-start',
                      background: stack.accentColor,
                      color: '#000',
                      fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 900,
                      letterSpacing: 2, padding: '5px 12px', borderRadius: 100,
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      {stack.badge}
                    </div>
                  )}
                </div>

                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 13,
                  color: 'rgba(255,255,255,.42)', lineHeight: 1.7, marginBottom: 22,
                }}>
                  {stack.purpose}
                </p>

                {/* Includes label */}
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                  letterSpacing: 3, color: 'rgba(255,255,255,.3)',
                  textTransform: 'uppercase', marginBottom: 10,
                }}>
                  — Includes —
                </div>

                {/* Product rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {stack.products.map((prod, j) => {
                    const img = getProductImg(prod.slug);
                    const bg = getProductBg(prod.slug);
                    return (
                      <motion.div
                        key={j}
                        whileHover={{ x: 4, borderColor: `${stack.accentColor}40` }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 12px', borderRadius: 12,
                          background: 'rgba(255,255,255,.03)',
                          border: '1px solid rgba(255,255,255,.06)',
                          transition: 'border-color 0.2s ease',
                          minWidth: 0,
                        }}
                      >
                        <div style={{
                          width: 44, height: 44, borderRadius: 10, background: bg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, overflow: 'hidden',
                        }}>
                          {img ? (
                            <img src={img} alt={prod.name} style={{
                              height: '80%', objectFit: 'contain',
                              filter: `drop-shadow(0 2px 6px ${stack.accentColor}44)`,
                            }} />
                          ) : (
                            <div style={{ color: stack.accentColor, width: 22, height: 22 }}><PillIcon /></div>
                          )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
                            color: 'hsl(var(--pl-white))', letterSpacing: 0.5,
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {prod.name}
                          </div>
                          <div style={{
                            fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 2,
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {prod.role}
                          </div>
                        </div>

                        <Link
                          to={`/products/${prod.slug}`}
                          onClick={e => e.stopPropagation()}
                          style={{
                            fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                            letterSpacing: 1.5, color: stack.accentColor, textDecoration: 'none',
                            textTransform: 'uppercase', opacity: 0.8, flexShrink: 0,
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                          }}
                        >
                          View <ArrowIcon />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Benefits */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
                  gap: '8px 12px',
                  marginBottom: 22,
                }}>
                  {stack.benefits.map((b, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(255,255,255,.5)',
                      minWidth: 0,
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                        background: stack.accentColor + '14',
                        border: `1px solid ${stack.accentColor}30`,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <CheckIcon color={stack.accentColor} />
                      </div>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA footer */}
              <div style={{
                padding: 'clamp(16px, 3vw, 20px) clamp(16px, 4vw, 28px)',
                background: 'rgba(255,255,255,.02)',
                borderTop: '1px solid rgba(255,255,255,.06)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: 16,
                flexWrap: 'wrap',
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(26px, 5vw, 34px)',
                    color: 'hsl(var(--pl-white))', lineHeight: 1,
                  }}>
                    ${stack.bundlePrice.toFixed(2)}
                  </div>
                  <div style={{
                    fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 3,
                    display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                  }}>
                    <span style={{ textDecoration: 'line-through' }}>${stack.originalPrice.toFixed(2)}</span>
                    <span style={{ color: stack.accentColor, fontWeight: 700 }}>
                      Save ${(stack.originalPrice - stack.bundlePrice).toFixed(2)}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAddCart(1, stack.bundlePrice, stack.name)}
                  style={{
                    padding: 'clamp(12px, 2vw, 14px) clamp(18px, 3vw, 28px)',
                    borderRadius: 100,
                    background: stack.accentColor, color: '#000',
                    fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 900,
                    letterSpacing: 2, textTransform: 'uppercase',
                    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                    boxShadow: `0 6px 24px ${stack.accentColor}30`,
                    flex: '1 1 auto', maxWidth: 240,
                    textAlign: 'center',
                  }}
                >
                  Add Stack to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </ParallaxSection>

      {/* ── BOTTOM CTA ── */}
      <ParallaxSection style={{
        borderTop: '1px solid rgba(255,255,255,.04)',
        padding: 'clamp(60px, 10vw, 130px) clamp(16px, 5vw, 80px)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: '14px' }}
            whileInView={{ opacity: 1, letterSpacing: '6px' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 6,
              color: 'rgba(255,255,255,.3)', marginBottom: 18,
              textTransform: 'uppercase', fontWeight: 700,
            }}
          >
            — Not sure which stack? —
          </motion.div>

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 5vw, 56px)',
            color: 'hsl(var(--pl-white))', marginBottom: 32, letterSpacing: 1,
          }}>
            BROWSE ALL <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>PRODUCTS</em>
          </h3>

          <Link to="/collections">
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)',
                borderRadius: 100,
                background: 'transparent', color: 'hsl(var(--pl-white))',
                fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 800,
                letterSpacing: 2.5, textTransform: 'uppercase',
                border: '1.5px solid rgba(255,255,255,.2)', cursor: 'pointer',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}
            >
              View All Products <ArrowIcon />
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              marginTop: 28,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2,
              color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
            }}
          >
            <svg width="14" height="12" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1h9v9H1z" />
              <path d="M10 4h3l2 2v4h-5" />
              <circle cx="4" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
            </svg>
            Free Shipping On All Orders
          </motion.div>
        </motion.div>
      </ParallaxSection>

      <Footer />
    </div>
  );
};

export default StacksPage;