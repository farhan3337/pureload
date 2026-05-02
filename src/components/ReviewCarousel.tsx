import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { REVIEWS } from '@/data/pureload';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill={filled ? 'hsl(var(--primary))' : 'rgba(255,90,0,0.25)'}>
    <path d="M8 1l1.8 3.6L14 5.2l-3 2.9.7 4.1L8 10.4l-3.7 1.8.7-4.1-3-2.9 4.2-.6z" />
  </svg>
);

const Stars = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= count} />)}
  </div>
);

const VerifiedIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1l1.5 3 3.5.5-2.5 2.4.6 3.5L8 8.8 4.9 10.4l.6-3.5L3 4.5l3.5-.5z" />
    <path d="M6 8l1.5 1.5 3-3" />
  </svg>
);

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const goNext = useCallback(() => setCurrent(c => (c + 1) % REVIEWS.length), []);
  const goPrev = () => setCurrent(c => (c - 1 + REVIEWS.length) % REVIEWS.length);

  useEffect(() => {
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [goNext]);

  const r = REVIEWS[current];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Header parallax
  const headerY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Featured card drifts at a different rate
  const featuredY = useTransform(scrollYProgress, [0.1, 0.9], [60, -40]);

  // Grid cards drift slower (parallax depth)
  const gridY = useTransform(scrollYProgress, [0.3, 1], [80, -20]);

  // Background grid texture
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  // Glow drifts
  const glowY = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  // Accent line scale
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  // Eyebrow letter spacing
  const eyebrowSpacing = useTransform(scrollYProgress, [0.05, 0.3], ['12px', '6px']);

  return (
    <section
      ref={sectionRef}
      id="ch-rv"
      style={{
        background: 'hsl(var(--pl-black))',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated grid background */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          y: bgGridY,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
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
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.09) 0%, transparent 60%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />



      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Header — scroll parallax ── */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity, textAlign: 'center', marginBottom: 56 }}
        >
          <motion.div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              fontWeight: 800,
              color: 'hsl(var(--primary))',
              textTransform: 'uppercase',
              letterSpacing: eyebrowSpacing,
              marginBottom: 18,
            }}
          >
            — Real Results —
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 7vw, 84px)',
              lineHeight: 0.92,
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              marginBottom: 20,
            }}
          >
            BEASTS <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>DON'T</em> LIE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: 'rgba(255,255,255,.45)',
              maxWidth: 440,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Thousands of verified customers. Real people. Real performance gains.
          </motion.p>
        </motion.div>

        {/* ── Featured review — scroll parallax ── */}
        <motion.div style={{ y: featuredY }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: 740,
                margin: '0 auto 32px',
                background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 20,
                padding: 'clamp(28px, 4vw, 46px)',
                boxShadow: '0 20px 80px rgba(255,90,0,.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle top accent line */}
              {/* <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.5) 50%, transparent 100%)',
                }}
              /> */}

              {/* Large quote mark */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 24,
                  fontFamily: 'var(--font-heading)',
                  fontSize: 120,
                  color: 'rgba(255,90,0,0.05)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                "
              </div>

              <Stars count={r.s} />

              <div
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 20px)',
                  color: 'rgba(255,255,255,.88)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  margin: '20px 0 24px',
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: 'var(--font-body)',
                  letterSpacing: 0.2,
                }}
              >
                "{r.t}"
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 16,
                      fontWeight: 900,
                      color: '#000',
                      flexShrink: 0,
                    }}
                  >
                    {r.i}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 14,
                        fontWeight: 700,
                        color: 'hsl(var(--pl-white))',
                        letterSpacing: 0.5,
                        marginBottom: 4,
                      }}
                    >
                      {r.n}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 9,
                        letterSpacing: 2,
                        color: 'hsl(var(--primary))',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <VerifiedIcon />
                      Verified Buyer
                    </div>
                  </div>
                </div>

                {/* Counter */}
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 10,
                    letterSpacing: 2,
                    color: 'rgba(255,255,255,.25)',
                    fontWeight: 700,
                  }}
                >
                  {String(current + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 60 }}>
            <motion.button
              onClick={goPrev}
              aria-label="Previous review"
              whileHover={{ scale: 1.08, borderColor: 'hsl(var(--primary) / 0.6)' }}
              whileTap={{ scale: 0.94 }}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.1)',
                color: 'hsl(var(--pl-white))',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.2s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 4 L6 8 L10 12" />
              </svg>
            </motion.button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
              {REVIEWS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  animate={{
                    width: i === current ? 22 : 6,
                    background: i === current ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: 6,
                    borderRadius: 3,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={goNext}
              aria-label="Next review"
              whileHover={{ scale: 1.08, borderColor: 'hsl(var(--primary) / 0.6)' }}
              whileTap={{ scale: 0.94 }}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.1)',
                color: 'hsl(var(--pl-white))',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.2s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4 L10 8 L6 12" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Social proof grid — scroll parallax ── */}
        <motion.div
          style={{
            y: gridY,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          {REVIEWS.slice(0, 4).map((rv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: 'rgba(255,90,0,0.3)' }}
              style={{
                background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 16,
                padding: '28px 24px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
            >
              {/* Top accent line */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.3) 50%, transparent 100%)',
                  opacity: 0.5,
                }}
              />

              {/* Card number */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 16,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'rgba(255,255,255,0.15)',
                  fontWeight: 700,
                }}
              >
                0{i + 1}
              </div>

              <Stars count={rv.s} />

              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'rgba(255,255,255,.72)',
                  lineHeight: 1.65,
                  margin: '14px 0 18px',
                  minHeight: 60,
                  fontStyle: 'italic',
                }}
              >
                "{rv.t.length > 110 ? rv.t.slice(0, 110) + '…' : rv.t}"
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'hsl(var(--pl-white))',
                    letterSpacing: 0.5,
                  }}
                >
                  — {rv.n}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontFamily: 'var(--font-ui)',
                    fontSize: 8,
                    letterSpacing: 1.5,
                    color: 'hsl(var(--primary))',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  <VerifiedIcon />
                  Verified
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ReviewCarousel;