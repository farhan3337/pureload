import { motion } from 'framer-motion';

interface ProductBenefitsProps {
  benefits: string[];
  productName: string;
  benefitsTitle?: string;
}

const BENEFIT_ICONS = [
  <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>,
  <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  <svg key="4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  <svg key="5" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="6" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
];

const ProductBenefits = ({ benefits, productName, benefitsTitle }: ProductBenefitsProps) => {
  return (
    <div style={{
      background: 'hsl(var(--pl-dark))',
      borderTop: '1px solid rgba(255,255,255,.04)',
      padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 16 }}>
            {benefitsTitle || `Why ${productName}?`}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 64px)',
            lineHeight: '.9',
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
            textAlign: 'center',
            marginBottom: 40,
          }}>
            THE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>BENEFITS</em>
          </h2>
        </motion.div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,.04)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{
                background: '#0b0b0b',
                padding: '32px 28px',
                transition: 'background .3s',
                cursor: 'default',
              }}
              whileHover={{ backgroundColor: '#111' }}
            >
              <div style={{ marginBottom: 12 }}>{BENEFIT_ICONS[i % BENEFIT_ICONS.length]}</div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 20,
                letterSpacing: 1,
                color: 'hsl(var(--pl-white))',
                marginBottom: 4,
              }}>
                BENEFIT {i + 1}
              </div>
              <div style={{
                fontSize: 13,
                color: 'rgba(255,255,255,.48)',
                lineHeight: 1.7,
              }}>
                {b}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBenefits;
