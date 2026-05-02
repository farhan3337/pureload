import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { REVIEWS, type Review } from '@/data/pureload';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductReviewsProps {
  reviews?: Review[];
  productName?: string;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill={filled ? 'hsl(var(--primary))' : 'rgba(255,90,0,0.25)'}>
    <path d="M8 1l1.8 3.6L14 5.2l-3 2.9.7 4.1L8 10.4l-3.7 1.8.7-4.1-3-2.9 4.2-.6z" />
  </svg>
);

const Stars = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= count} />)}
  </div>
);

const VerifiedIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2 L13 4.5 V9 C13 12 10.5 13.5 8 15 C5.5 13.5 3 12 3 9 V4.5 Z" />
    <path d="M6 8.5 L7.5 10 L11 7" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4 L6 8 L10 12" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4 L10 8 L6 12" />
  </svg>
);

const ProductReviews = ({ reviews, productName }: ProductReviewsProps = {}) => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const list: Review[] = reviews && reviews.length > 0 ? reviews : REVIEWS;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0.2, 0.9], [80, -20]);
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  const goNext = () => setCurrent(c => (c + 1) % list.length);
  const goPrev = () => setCurrent(c => (c - 1 + list.length) % list.length);

  const renderCard = (r: Review, i: number) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, borderColor: 'rgba(255,90,0,0.3)' }}
      style={{
        background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
        border: '1px solid rgba(255,255,255,.06)',
        borderRadius: 16, padding: '26px 22px',
        position: 'relative', overflow: 'hidden', width: '100%',
        cursor: 'default', transition: 'border-color 0.3s ease',
      }}
    >
      {/* Top accent */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.35) 50%, transparent 100%)',
        opacity: 0.4,
      }} />

      {/* Card number */}
      <div aria-hidden style={{
        position: 'absolute', top: 14, right: 16,
        fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 2,
        color: 'rgba(255,255,255,0.15)', fontWeight: 700,
      }}>
        {String(i + 1).padStart(2, '0')}
      </div>

      <Stars count={r.s} />

      {/* Large quote mark */}
      <div aria-hidden style={{
        position: 'absolute', top: 12, right: 18,
        fontFamily: 'var(--font-heading)', fontSize: 80,
        color: 'rgba(255,90,0,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>
        "
      </div>

      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,.65)',
        lineHeight: 1.75, margin: '14px 0 18px', fontStyle: 'italic', position: 'relative', zIndex: 1,
      }}>
        "{r.t.length > 120 ? r.t.slice(0, 120) + '…' : r.t}"
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 900, color: '#000', flexShrink: 0,
          }}>
            {r.i}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: 'hsl(var(--pl-white))' }}>
              {r.n}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 1.5, color: 'hsl(var(--primary))', fontWeight: 700, textTransform: 'uppercase' }}>
              <VerifiedIcon />
              Verified Buyer
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      ref={sectionRef}
      id="product-reviews"
      style={{
        background: 'hsl(var(--pl-black))',
        borderTop: '1px solid rgba(255,255,255,.04)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)',
        scrollMarginTop: 90,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <motion.div aria-hidden style={{
        position: 'absolute', inset: 0, y: bgGridY,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      {/* Glow */}
      <motion.div aria-hidden style={{
        position: 'absolute', top: '20%', left: '50%', x: '-50%', y: glowY, opacity: glowOpacity,
        width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
        pointerEvents: 'none', filter: 'blur(50px)',
      }} />


      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div style={{ y: headerY, opacity: headerOpacity, marginBottom: 50 }}>
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
            — {productName ? `${productName} Reviews` : 'Customer Reviews'} —
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)',
              letterSpacing: 1, color: 'hsl(var(--pl-white))', marginBottom: 20,
            }}
          >
            REAL <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>RESULTS</em>
          </motion.h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => <StarIcon key={i} filled={true} />)}
            </div>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(255,255,255,.4)',
              letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {list.length} REVIEWS
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,90,0,0.4)', display: 'inline-block' }} />
              5.0 AVERAGE
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        {isMobile ? (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {renderCard(list[current % list.length], current)}
              </motion.div>
            </AnimatePresence>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
              <motion.button
                onClick={goPrev} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronLeft />
              </motion.button>
              <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                {list.map((_, i) => (
                  <motion.button key={i} onClick={() => setCurrent(i)}
                    animate={{ width: i === current ? 22 : 6, background: i === current ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.3 }}
                    style={{ height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0 }}
                  />
                ))}
              </div>
              <motion.button
                onClick={goNext} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronRight />
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.div
            style={{ y: gridY, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}
          >
            {list.map((r, i) => renderCard(r, i))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;