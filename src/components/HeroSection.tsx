import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  onGotoSection: (id: string) => void;
}

const HeroSection = ({ onGotoSection }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-linked parallax + zoom on the background video
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  // Content drifts upward and fades as user scrolls
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div id="ch-hero" ref={heroRef} style={{ height: '150vh' }}>
      <section id="s-hero">
        <motion.div
          className="h-video-wrap"
          id="hVideoWrap"
          style={{ y: videoY, scale: videoScale, opacity: videoOpacity, willChange: 'transform, opacity' }}
        >
          <video
            id="hVideo"
            autoPlay
            muted
            loop
            playsInline
            src="/videos/hero-video.mp4"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
        <div className="h-noise" />
        <motion.div className="h-content" style={{ y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}>
          <span className="h-ey" id="hEy">Premium Supplements · Performance · Results</span>
          <h1 className="h-h1" id="hH1">
            <span className="ln"><span className="li">UNLEASH</span></span>
            <span className="ln"><span className="li orn">YOUR</span></span>
            <span className="ln"><span className="li">POTENTIAL</span></span>
          </h1>
          <p className="h-sub" id="hSub">
            Premium supplements for strength, energy, recovery, and hormonal support.
          </p>
          <div className="h-cta" id="hCta">
            <button className="btn-p" onClick={() => onGotoSection('ch-ord')}>Shop Best Sellers</button>
            <button className="btn-o" onClick={() => onGotoSection('ch-ord')}>Shop Bundles</button>
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 18,
            fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: 2,
            color: 'rgba(255,255,255,.65)', textTransform: 'uppercase',
          }}>
            <span>🇺🇸 Made in USA</span>
            <span>🔬 Lab Tested</span>
            <span>✅ GMP Certified</span>
            <span>📦 Free Shipping</span>
          </div>
          <button
            type="button"
            onClick={() => onGotoSection('ch-ord')}
            style={{
              marginTop: 12, display: 'inline-block',
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, letterSpacing: 2,
              color: '#000', background: 'hsl(var(--primary))',
              padding: '6px 12px', borderRadius: 100, textTransform: 'uppercase',
              border: 0, cursor: 'pointer',
            }}
          >
            🔥 Best Sellers Selling Fast — Limited Stock
          </button>
        </motion.div>
        <div className="h-desc-right" id="hDescRight">
          <p>Scientifically formulated, lab tested, GMP certified supplements. Made in the USA. <strong style={{ color: 'hsl(var(--primary))' }}>Free shipping on all orders.</strong></p>
          <div className="h-rating" style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onGotoSection('ch-rv')}
              style={{
                background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
                color: 'inherit', font: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
              aria-label="See reviews"
            >
              <span>★★★★★</span>
              <em>5.0</em>
            </button>
            <span aria-hidden style={{ opacity: .4 }}>·</span>
            <button
              type="button"
              onClick={() => onGotoSection('ch-ord')}
              className="btn-p"
              style={{ padding: '8px 18px', fontSize: 11, letterSpacing: 2 }}
            >
              SHOP NOW →
            </button>
          </div>
        </div>
        <div className="h-prod-float" id="hProdFloat" />
        <div className="scroll-cue" id="scrollCue">
          <div className="sc-txt">Scroll</div>
          <div className="sc-mouse"><div className="sc-dot" /></div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
