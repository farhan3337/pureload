import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PRODUCTS } from '@/data/pureload';

interface ProductSectionProps {
  onGotoSection: (id: string) => void;
}

const ProductSection = ({ onGotoSection }: ProductSectionProps) => {
  const mainProduct = PRODUCTS[0];
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Bottle floats and rotates as you scroll
  const bottleY = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const bottleRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 4]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);

  // Halo pulses + drifts opposite direction (parallax depth)
  const haloY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.95]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.4]);

  // Info column drifts up at slower rate
  const infoY = useTransform(scrollYProgress, [0, 1], [80, -60]);

  // Background grid drifts
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  // Eyebrow letter spacing animates
  const eyebrowSpacing = useTransform(scrollYProgress, [0.05, 0.3], ['12px', '6px']);

  // Stats row staggered drift
  const statsY = useTransform(scrollYProgress, [0.2, 0.7], [40, -10]);

  return (
    <div id="ch-prod" ref={sectionRef} style={{ height: '160vh', position: 'relative' }}>
      <section id="s-prod" style={{ overflow: 'hidden', position: 'relative' }}>

        {/* Animated grid background */}
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
            zIndex: 0,
          }}
        />

        {/* Vertical accent line, scroll-driven */}
        {/* <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            top: '15%',
            bottom: '15%',
            width: 1,
            background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.35) 50%, transparent 100%)',
            scaleY: useTransform(scrollYProgress, [0.1, 0.6], [0, 1]),
            transformOrigin: 'top',
            zIndex: 0,
          }}
        /> */}

        <div className="prd-grid" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Bottle visual with parallax + floating motion ── */}
          <div className="prd-vis">
            <motion.div
              className="prd-halo"
              style={{
                y: haloY,
                scale: haloScale,
                opacity: haloOpacity,
              }}
            />

            {/* Floating accent dots around the bottle */}
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'hsl(var(--primary))',
                opacity: 0.5,
                y: useTransform(scrollYProgress, [0, 1], [-30, 50]),
              }}
            />
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                top: '70%',
                right: '12%',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'hsl(var(--primary))',
                opacity: 0.4,
                y: useTransform(scrollYProgress, [0, 1], [40, -60]),
              }}
            />
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                top: '35%',
                right: '20%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                border: '1px solid hsl(var(--primary) / 0.4)',
                y: useTransform(scrollYProgress, [0, 1], [20, -40]),
              }}
            />

            <motion.div
              className="bottle"
              style={{
                y: bottleY,
                rotate: bottleRotate,
                scale: bottleScale,
              }}
            >
              <img
                src={mainProduct.img}
                alt={mainProduct.name}
                className="bottle-img"
              />
            </motion.div>
          </div>

          {/* ── Info column with scroll parallax ── */}
          <motion.div
            className="prd-info"
            id="prdInfo"
            style={{ y: infoY }}
          >
            <motion.div
              className="sec-ey"
              style={{
                letterSpacing: eyebrowSpacing,
                opacity: 1,
                transform: 'none',
              }}
            >
              — The Product —
            </motion.div>

            <h2 className="sec-h" id="prdH">
              SUPPLEMENTS<br />
              <em>REIMAGINED.</em>
            </h2>

            <p className="prd-desc">
              Premium, lab-tested supplements engineered for peak performance. From creatine gummies to
              hormonal support — PURELOAD delivers science-backed results in forms you'll actually enjoy
              taking.
            </p>

            {/* ── Stats with scroll parallax ── */}
            <motion.div className="stat-row" style={{ y: statsY }}>
              {mainProduct.stats.map((s, i) => (
                <motion.div
                  className="st"
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, background: '#141414' }}
                  style={{ cursor: 'default', transition: 'background 0.25s ease' }}
                >
                  <div className="st-n">{s.value}</div>
                  <div className="st-l">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── CTA buttons ── */}
            <div style={{ marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <motion.button
                className="btn-p"
                onClick={() => onGotoSection('ch-ord')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Best Sellers
              </motion.button>
              <motion.button
                className="btn-o"
                onClick={() => onGotoSection('ch-ord')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Bundles — Save up to 22%
              </motion.button>
            </div>

            {/* ── Shipping info — emoji removed, replaced with SVG icon ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                marginTop: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                letterSpacing: 2,
                color: 'hsl(var(--primary))',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              {/* Truck icon — clean SVG, no emoji */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 3h15v13H1z" />
                <path d="M16 8h4l3 3v5h-7" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>FREE SHIPPING ON ALL ORDERS</span>
              <span
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: 'hsl(var(--primary) / 0.5)',
                }}
              />
              <span>Limited Stock</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductSection;