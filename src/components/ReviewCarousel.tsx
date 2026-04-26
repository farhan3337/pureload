import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '@/data/pureload';

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % REVIEWS.length), []);
  const goPrev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);

  // Auto-rotate every 5s
  useEffect(() => {
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [goNext]);

  const r = REVIEWS[current];

  return (
    <section
      id="ch-rv"
      style={{
        background: 'hsl(var(--pl-black))',
        padding: 'clamp(60px, 10vw, 110px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid rgba(255,255,255,.04)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 12 }}>Real Results</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 7vw, 84px)',
            lineHeight: '.92',
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
          }}>
            BEASTS <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>DON'T</em> LIE
          </h2>
        </motion.div>

        {/* Featured review card */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            maxWidth: 720,
            margin: '0 auto 36px',
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 18,
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: '0 12px 60px rgba(255,90,0,.06)',
          }}
        >
          <div style={{ color: 'hsl(var(--primary))', fontSize: 16, letterSpacing: 4, marginBottom: 14 }}>
            {'★'.repeat(r.s)}
          </div>
          <div style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,.85)', lineHeight: 1.65,
            fontStyle: 'italic', marginBottom: 20,
          }}>
            "{r.t}"
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: 'hsl(var(--primary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 900, color: '#000',
            }}>
              {r.i}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: 'hsl(var(--pl-white))', letterSpacing: 0.5 }}>
                {r.n}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'hsl(var(--primary))', fontWeight: 700 }}>
                ✓ VERIFIED BUYER
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 28 }}>
          <button
            onClick={goPrev}
            aria-label="Previous review"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
              color: 'hsl(var(--pl-white))', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ←
          </button>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: 2, color: 'rgba(255,255,255,.45)' }}>
            {current + 1} / {REVIEWS.length}
          </span>
          <button
            onClick={goNext}
            aria-label="Next review"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
              color: 'hsl(var(--pl-white))', fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            →
          </button>
        </div>

        {/* Mid-page social proof grid (3-5 short cards always visible) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 14,
          marginTop: 12,
        }}>
          {REVIEWS.slice(0, 4).map((rv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: '#0b0b0b',
                border: '1px solid rgba(255,255,255,.06)',
                borderRadius: 14,
                padding: 20,
              }}
            >
              <div style={{ color: 'hsl(var(--primary))', fontSize: 12, letterSpacing: 3, marginBottom: 10 }}>
                {'★'.repeat(rv.s)}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', lineHeight: 1.6, marginBottom: 14, minHeight: 60 }}>
                "{rv.t.length > 110 ? rv.t.slice(0, 110) + '…' : rv.t}"
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: 'hsl(var(--pl-white))', letterSpacing: 0.5 }}>
                — {rv.n}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
