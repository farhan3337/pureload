import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/pureload';

interface FlavorCarouselProps {
  onAddFlavor: (name: string, variantId: string) => void;
  onOpenModal: () => void;
}

const FlavorCarousel = ({ onAddFlavor, onOpenModal }: FlavorCarouselProps) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Mobile: track native scroll progress for the progress bar
  useEffect(() => {
    if (!isMobile) return;
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      setProgress(track.scrollLeft / max);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  if (isMobile) {
    // ── Mobile: native horizontal scroll, no GSAP ──
    return (
      <div style={{ background: 'hsl(var(--pl-black))', padding: '60px 0 40px' }}>
        {/* Header */}
        <div style={{ padding: '0 24px 28px' }}>
          <div className="sec-ey">All Products</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(42px, 10vw, 72px)',
            lineHeight: '.9',
            letterSpacing: '1px',
            color: 'hsl(var(--pl-white))',
            marginTop: 8,
          }}>
            PICK YOUR{' '}
            <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>PRODUCT</em>
          </h2>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 3,
          background: 'rgba(255,255,255,.08)',
          margin: '0 24px 20px',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'hsl(var(--primary))',
            borderRadius: 2,
            transition: 'width .1s linear',
          }} />
        </div>

        {/* Swipe hint */}
        <div style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 10,
          letterSpacing: 3,
          color: 'rgba(255,255,255,.3)',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 20,
        }}>
          ← Swipe to explore →
        </div>

        {/* Native scroll track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'visible',
            gap: 16,
            padding: '8px 24px 20px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="hide-scrollbar"
        >
          {PRODUCTS.map((f, i) => (
            <Link
              to={`/products/${f.slug}`}
              key={i}
              style={{
                textDecoration: 'none',
                flexShrink: 0,
                width: 'clamp(220px, 72vw, 280px)',
                scrollSnapAlign: 'start',
                borderRadius: 20,
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,.07)',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              {/* Image */}
              <div style={{
                height: 200,
                background: f.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img
                  src={f.img}
                  alt={f.name}
                  style={{
                    height: '70%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 30px rgba(255,90,0,.25))',
                  }}
                />
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  padding: '4px 10px',
                  borderRadius: 100,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 8,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  background: f.av ? 'hsl(var(--primary))' : 'rgba(255,255,255,.12)',
                  color: f.av ? '#000' : 'rgba(255,255,255,.45)',
                }}>
                  {f.av ? 'AVAILABLE' : 'COMING SOON'}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '16px 16px 20px' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 24,
                  letterSpacing: 1,
                  color: 'hsl(var(--pl-white))',
                  marginBottom: 4,
                }}>
                  {f.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'rgba(255,255,255,.35)',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}>
                  {f.category.toUpperCase()} · {f.servingsPerContainer} COUNT
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 28,
                    color: 'hsl(var(--primary))',
                  }}>
                    ${f.price.toFixed(2)}
                  </span>
                  {f.av ? (
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddFlavor(f.name, f.shopifyVariantId); }}
                      style={{
                        padding: '9px 16px',
                        borderRadius: 100,
                        background: 'hsl(var(--primary))',
                        color: '#000',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenModal(); }}
                      style={{
                        padding: '9px 16px',
                        borderRadius: 100,
                        background: 'transparent',
                        color: 'rgba(255,255,255,.5)',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        border: '1.5px solid rgba(255,255,255,.15)',
                        cursor: 'pointer',
                      }}
                    >
                      Notify Me
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // ── Desktop: original GSAP scroll-driven layout ──
  return (
    <div id="ch-flv" className="ch-flv-wrap">
      <section id="s-flv">
        <div className="flv-top">
          <div className="sec-ey">All Products</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(52px,7vw,88px)',
            lineHeight: '.9',
            letterSpacing: '1px',
            color: 'hsl(var(--pl-white))'
          }}>
            PICK YOUR <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>PRODUCT</em>
          </h2>
        </div>
        <div className="flv-prog"><div className="flv-pfill" id="flvFill" /></div>
        <div className="flv-hint">↓ Keep scrolling to explore all products</div>
        <div className="flv-track-wrap">
          <div className="flv-track" id="flvTrack">
            {PRODUCTS.map((f, i) => (
              <Link
                to={`/products/${f.slug}`}
                className="flv-card group"
                key={i}
                style={{ textDecoration: 'none', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(255,90,0,.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div
                  className="flv-img"
                  style={{ background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img src={f.img} alt={f.name} className="flv-product-img" />
                  <div className={`flv-av ${!f.av ? 'flv-cs' : ''}`}>
                    {f.av ? 'AVAILABLE' : 'COMING SOON'}
                  </div>
                </div>
                <div className="flv-body">
                  <div>
                    <div className="flv-name">{f.name}</div>
                    <div className="flv-sub">{f.category.toUpperCase()} · {f.servingsPerContainer} COUNT</div>
                  </div>
                  <div className="flv-row">
                    <div className="flv-price">${f.price.toFixed(2)}</div>
                    {f.av ? (
                      <button
                        className="flv-btn flv-buy"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddFlavor(f.name, f.shopifyVariantId); }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="flv-btn flv-soon"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenModal(); }}
                      >
                        Notify Me
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlavorCarousel;