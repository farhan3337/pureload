

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type StacksPageProps = {
  onAddCart: (qty: number, price: number, label: string, variantId?: string, isSubscription?: boolean, subscriptionInterval?: number, img?: string) => void;
};

// ─── Stack definitions ───────────────────────────────────────────────────────
const STACKS = [
  {
    id: 'performance',
    name: 'Performance Stack',
    tagline: 'TRAIN HARDER. PUSH FURTHER.',
    purpose: 'Built for athletes who demand more from every session. Fuel explosive energy, boost endurance, and support muscle growth — all in one stack.',
    icon: '⚡',
    accentColor: '#FF5A00',
    products: [
      { name: 'Pre-Workout', role: 'Explosive Energy & Focus', slug: 'pureload-wake-up-preworkout', emoji: '🔥' },
      { name: 'Creatine Gummies', role: 'Strength & Power Output', slug: 'pureload', emoji: '💪' },
      { name: 'Multivitamin', role: 'Foundation & Recovery', slug: 'pureload-multi-gummies', emoji: '🛡️' },
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
    icon: '🌙',
    accentColor: '#7B5EA7',
    products: [
      { name: 'Sleep Gummies', role: 'Deep Sleep & Restoration', slug: 'pureload-sleep-gummies', emoji: '😴' },
      { name: 'Ashwagandha Gummies', role: 'Stress & Cortisol Control', slug: 'pureload-ashwagandha-gummies', emoji: '🌿' },
      { name: 'Multivitamin', role: 'Daily Micronutrient Support', slug: 'pureload-multi-gummies', emoji: '🛡️' },
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
    icon: '✨',
    accentColor: '#E8669A',
    products: [
      { name: "Women's Hormone Support", role: 'Hormonal Balance & Mood', slug: 'pureload-womens-hormonal-support-gummies', emoji: '🌸' },
      { name: 'Debloat ACV Gummies', role: 'Gut Health & Digestion', slug: 'pureload-debloat-acv-gummies', emoji: '🍎' },
      { name: 'Multivitamin', role: 'Complete Nutrient Coverage', slug: 'pureload-multi-gummies', emoji: '🛡️' },
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
    icon: '🦁',
    accentColor: '#2ECC71',
    products: [
      { name: 'Male Enhancement', role: 'Testosterone & Drive', slug: 'pureload-male-enhancement-pills', emoji: '💎' },
      { name: 'Multivitamin', role: 'Foundation & Vitality', slug: 'pureload-multi-gummies', emoji: '🛡️' },
      { name: 'Ashwagandha Gummies', role: 'Stress & Energy Balance', slug: 'pureload-ashwagandha-gummies', emoji: '🌿' },
    ],
    benefits: ['Supports testosterone', 'Increases stamina', 'Reduces stress & fatigue', 'Sharpens focus'],
    originalPrice: 119.97,
    bundlePrice: 94.99,
    badge: 'For Him',
  },
];

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────
const StacksPage = ({ onAddCart }: StacksPageProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ background: 'hsl(var(--pl-black))', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{
        paddingTop: 130,
        paddingBottom: 60,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow bg */}
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(255,90,0,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="sec-ey" style={{ marginBottom: 12 }}
        >
          Supplement Stacks
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 0.88,
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
            marginBottom: 20,
          }}
        >
          BUILD YOUR <br />
          <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>PERFECT STACK</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,.45)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.75,
          }}
        >
          A stack is a curated set of supplements that work together for a specific goal.
          Choose yours and save up to 20% vs. buying individually.
        </motion.p>
      </div>

      {/* ── What is a stack? explainer ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 900,
          margin: '0 auto 80px',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {[
          { icon: '🧬', title: 'Synergy', desc: 'Products chosen to amplify each other — not just bundled randomly.' },
          { icon: '💰', title: 'Save 20%', desc: 'Stack bundles cost less than buying each product on its own.' },
          { icon: '🎯', title: 'Goal-Focused', desc: 'Each stack targets one clear outcome: performance, recovery, balance, or vitality.' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '24px 20px',
            borderRadius: 16,
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.07)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
              letterSpacing: 2, color: 'hsl(var(--pl-white))', marginBottom: 6,
              textTransform: 'uppercase',
            }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Stack Cards ── */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px 120px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))',
        gap: 24,
      }}>
        {STACKS.map((stack, i) => (
          <motion.div
            key={stack.id}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredId(stack.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              borderRadius: 24,
              background: '#0d0d0d',
              border: `1.5px solid ${hoveredId === stack.id ? stack.accentColor + '55' : 'rgba(255,255,255,.07)'}`,
              overflow: 'hidden',
              transition: 'border-color .3s, box-shadow .3s',
              boxShadow: hoveredId === stack.id ? `0 20px 60px ${stack.accentColor}22` : 'none',
              position: 'relative',
            }}
          >
            {/* Top accent bar */}
            <div style={{
              height: 4,
              background: `linear-gradient(90deg, ${stack.accentColor}, transparent)`,
            }} />

            {/* Badge */}
            {stack.badge && (
              <div style={{
                position: 'absolute', top: 20, right: 20,
                background: stack.accentColor,
                color: '#000',
                fontFamily: 'var(--font-ui)',
                fontSize: 9, fontWeight: 900, letterSpacing: 2,
                padding: '4px 12px', borderRadius: 100,
                textTransform: 'uppercase',
              }}>
                {stack.badge}
              </div>
            )}

            <div style={{ padding: '28px 28px 0' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: stack.accentColor + '18',
                  border: `1px solid ${stack.accentColor}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  {stack.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                    letterSpacing: 3, color: stack.accentColor,
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>
                    {stack.tagline}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(22px, 3vw, 30px)',
                    letterSpacing: 1,
                    color: 'hsl(var(--pl-white))',
                    lineHeight: 1,
                  }}>
                    {stack.name.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <p style={{
                fontSize: 13, color: 'rgba(255,255,255,.4)',
                lineHeight: 1.7, marginBottom: 24, maxWidth: 440,
              }}>
                {stack.purpose}
              </p>

              {/* Products included */}
              <div style={{
                fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                letterSpacing: 3, color: 'rgba(255,255,255,.3)',
                textTransform: 'uppercase', marginBottom: 12,
              }}>
                Includes
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {stack.products.map((prod, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,.03)',
                    border: '1px solid rgba(255,255,255,.06)',
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{prod.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
                        color: 'hsl(var(--pl-white))', letterSpacing: 0.5,
                      }}>
                        {prod.name}
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>
                        {prod.role}
                      </div>
                    </div>
                    <Link
                      to={`/products/${prod.slug}`}
                      onClick={e => e.stopPropagation()}
                      style={{
                        fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                        letterSpacing: 1.5, color: stack.accentColor,
                        textDecoration: 'none', textTransform: 'uppercase',
                        opacity: 0.8,
                        flexShrink: 0,
                      }}
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '6px 12px', marginBottom: 24,
              }}>
                {stack.benefits.map((b, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11, color: 'rgba(255,255,255,.45)',
                  }}>
                    <span style={{ color: stack.accentColor, fontWeight: 800, fontSize: 10 }}>✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / CTA */}
            <div style={{
              padding: '20px 28px',
              background: 'rgba(255,255,255,.025)',
              borderTop: '1px solid rgba(255,255,255,.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              flexWrap: 'wrap',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: 32,
                  color: 'hsl(var(--pl-white))', lineHeight: 1,
                }}>
                  ${stack.bundlePrice.toFixed(2)}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 2 }}>
                  <span style={{ textDecoration: 'line-through', marginRight: 6 }}>
                    ${stack.originalPrice.toFixed(2)}
                  </span>
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
                  padding: '14px 28px',
                  borderRadius: 100,
                  background: stack.accentColor,
                  color: '#000',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11, fontWeight: 900, letterSpacing: 2,
                  textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Add Stack to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: 'center',
          padding: '60px 24px 100px',
          borderTop: '1px solid rgba(255,255,255,.05)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,.3)', marginBottom: 12, textTransform: 'uppercase' }}>
          Not sure which stack?
        </div>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: 'hsl(var(--pl-white))',
          marginBottom: 24, letterSpacing: 1,
        }}>
          BROWSE ALL <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>PRODUCTS</em>
        </h3>
        <Link to="/collections">
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: '16px 40px',
              borderRadius: 100,
              background: 'transparent',
              color: 'hsl(var(--pl-white))',
              fontFamily: 'var(--font-ui)',
              fontSize: 12, fontWeight: 800, letterSpacing: 2.5,
              textTransform: 'uppercase',
              border: '1.5px solid rgba(255,255,255,.2)',
              cursor: 'pointer',
            }}
          >
            View All Products →
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default StacksPage;