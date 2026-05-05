import { motion } from 'framer-motion';

interface TrustBannerProps {
  variant?: 'default' | 'highlight';
  items?: string[];
}

const DEFAULT_ITEMS = [
  'MADE & SHIPPED IN USA',
  'LAB TESTED & GMP CERTIFIED',
  'FREE SHIPPING ON ALL ORDERS',
  '30-DAY MONEY BACK GUARANTEE',
  'FDA REGISTERED FACILITY',
];

const TrustBanner = ({ variant = 'default', items = DEFAULT_ITEMS }: TrustBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        background: variant === 'highlight'
          ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(24, 100%, 40%))'
          : 'rgba(255,255,255,.02)',
        borderTop: variant === 'default' ? '1px solid rgba(255,255,255,.04)' : 'none',
        borderBottom: variant === 'default' ? '1px solid rgba(255,255,255,.04)' : 'none',
        padding: '18px 0',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex',
        animation: 'scrollTrust 30s linear infinite',
        whiteSpace: 'nowrap',
        width: 'max-content',
      }}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              color: variant === 'highlight' ? '#000' : 'rgba(255,255,255,.5)',
              padding: '0 32px',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustBanner;
