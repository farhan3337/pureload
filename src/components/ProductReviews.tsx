import { useState } from 'react';
import { motion } from 'framer-motion';
import { REVIEWS, type Review } from '@/data/pureload';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductReviewsProps {
  reviews?: Review[];
  productName?: string;
}

const ProductReviews = ({ reviews, productName }: ProductReviewsProps = {}) => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const list: Review[] = reviews && reviews.length > 0 ? reviews : REVIEWS;

  const goNext = () => setCurrent((c) => (c + 1) % list.length);
  const goPrev = () => setCurrent((c) => (c - 1 + list.length) % list.length);

  const renderCard = (r: Review, i: number) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06, duration: 0.5 }}
      whileHover={{ borderColor: 'rgba(255,90,0,.28)' }}
      style={{
        background: '#0c0c0c',
        border: '1px solid rgba(255,255,255,.06)',
        borderRadius: 14,
        padding: '24px 20px',
        transition: 'border-color .3s',
        width: '100%',
      }}
    >
      <div style={{ color: 'hsl(var(--primary))', fontSize: 12, letterSpacing: 3, marginBottom: 10 }}>
        {'★'.repeat(r.s)}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,.58)', lineHeight: 1.75, marginBottom: 14, fontStyle: 'italic' }}>
        "{r.t}"
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', background: 'hsl(var(--primary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 900, color: '#000',
        }}>
          {r.i}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: 'hsl(var(--pl-white))' }}>{r.n}</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 2, color: 'hsl(var(--primary))' }}>✓ VERIFIED BUYER</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div id="product-reviews" style={{
      background: 'hsl(var(--pl-black))',
      borderTop: '1px solid rgba(255,255,255,.04)',
      padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
      scrollMarginTop: 90,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 16 }}>
            {productName ? `${productName} Reviews` : 'Customer Reviews'}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
            marginBottom: 8,
          }}>
            REAL <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>RESULTS</em>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <span style={{ color: 'hsl(var(--primary))', fontSize: 14, letterSpacing: 2 }}>★★★★★</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'rgba(255,255,255,.4)', letterSpacing: 1 }}>
            {list.length} REVIEWS · 5.0 AVERAGE
          </span>
        </div>

        {isMobile ? (
          <div>
            <div style={{ overflow: 'hidden' }}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {renderCard(list[current % list.length], current)}
              </motion.div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20 }}>
              <button
                onClick={goPrev}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
                  color: 'hsl(var(--pl-white))', fontSize: 18, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ←
              </button>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: 2, color: 'rgba(255,255,255,.4)' }}>
                {(current % list.length) + 1} / {list.length}
              </span>
              <button
                onClick={goNext}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
                  color: 'hsl(var(--pl-white))', fontSize: 18, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {list.map((r, i) => renderCard(r, i))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
