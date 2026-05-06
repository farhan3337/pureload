import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/data/pureload';
import { fetchInventoryByVariantIds } from '@/lib/shopify'; // adjust path

interface FlavorCarouselProps {
  onAddFlavor: (name: string, variantId: string) => void;
  onOpenModal: () => void;
}

// Social proof numbers stay pseudo-random (not in Shopify)
function getSocialProof(slug: string) {
  const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    viewers: 8 + (hash % 43),
    sold: 20 + (hash % 80),
  };
}

// Urgency thresholds driven by real Shopify quantity
const LOW_STOCK_THRESHOLD = 10;
const CRITICAL_STOCK_THRESHOLD = 5;

function getUrgencyLabel(qty: number | null): { text: string; color: string } | null {
  if (qty === null) return null;
  if (qty <= 0) return { text: 'Out of Stock', color: '#6b7280' };
  if (qty <= CRITICAL_STOCK_THRESHOLD) return { text: `Only ${qty} left — Selling Fast`, color: '#ef4444' };
  if (qty <= LOW_STOCK_THRESHOLD) return { text: `Low Stock — ${qty} remaining`, color: '#f97316' };
  return null;
}

const FlavorCarousel = ({ onAddFlavor, onOpenModal }: FlavorCarouselProps) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // ── Inventory + social proof state ──
  const [viewerCounts, setViewerCounts] = useState<Record<string, number>>({});
  const [inventory, setInventory] = useState<Record<string, number | null>>({});

  // Fetch real inventory on mount
  useEffect(() => {
    const variantIds = PRODUCTS.map(p => p.shopifyVariantId);
    fetchInventoryByVariantIds(variantIds).then(data => {
      const mapped: Record<string, number | null> = {};
      PRODUCTS.forEach(p => {
        mapped[p.slug] = data[p.shopifyVariantId] ?? null;
      });
      setInventory(mapped);
    });
  }, []);

  // Simulate live viewer fluctuations (social proof only)
  useEffect(() => {
    const initial: Record<string, number> = {};
    PRODUCTS.forEach(p => { initial[p.slug] = getSocialProof(p.slug).viewers; });
    setViewerCounts(initial);
    const iv = setInterval(() => {
      setViewerCounts(prev => {
        const next = { ...prev };
        PRODUCTS.forEach(p => {
          const base = getSocialProof(p.slug).viewers;
          next[p.slug] = Math.max(1, base + Math.floor(Math.random() * 7) - 3);
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(iv);
  }, []);

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
          {PRODUCTS.map((f, i) => {
            const proof = getSocialProof(f.slug);
            const viewers = viewerCounts[f.slug] ?? proof.viewers;
            const qty = inventory[f.slug] ?? null;
            const urgency = getUrgencyLabel(qty);
            const isLow = qty !== null && qty <= LOW_STOCK_THRESHOLD && qty > 0;
            const isCritical = qty !== null && qty <= CRITICAL_STOCK_THRESHOLD && qty > 0;
            const isOutOfStock = qty !== null && qty <= 0;

            return (
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
                  border: `1px solid ${isCritical ? 'rgba(239,68,68,.3)' : 'rgba(255,255,255,.07)'}`,
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
                    background: isOutOfStock
                      ? 'rgba(107,114,128,.7)'
                      : f.av ? 'hsl(var(--primary))' : 'rgba(255,255,255,.12)',
                    color: f.av && !isOutOfStock ? '#000' : 'rgba(255,255,255,.85)',
                  }}>
                    {isOutOfStock ? 'SOLD OUT' : f.av ? 'AVAILABLE' : 'COMING SOON'}
                  </div>

                  {/* Real urgency badge — only renders once inventory loads */}
                  {isCritical && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      style={{
                        position: 'absolute', bottom: 10, left: 10,
                        padding: '4px 10px',
                        borderRadius: 100,
                        fontFamily: 'var(--font-ui)',
                        fontSize: 8,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        background: 'rgba(220,38,38,.85)',
                        color: '#fff',
                      }}
                    >
                      Only {qty} left!
                    </motion.div>
                  )}
                  {isLow && !isCritical && (
                    <div style={{
                      position: 'absolute', bottom: 10, left: 10,
                      padding: '4px 10px',
                      borderRadius: 100,
                      fontFamily: 'var(--font-ui)',
                      fontSize: 8,
                      fontWeight: 800,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      background: 'rgba(249,115,22,.8)',
                      color: '#fff',
                    }}>
                      Selling Fast
                    </div>
                  )}
                </div>

                {/* Live viewers strip */}
                {f.av && (
                  <div style={{
                    background: 'rgba(255,90,0,.07)',
                    borderBottom: '1px solid rgba(255,90,0,.1)',
                    padding: '5px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 700,
                      letterSpacing: 1.2, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase',
                    }}>
                      {viewers} viewing now
                    </span>
                    <span style={{
                      marginLeft: 'auto',
                      fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 700,
                      letterSpacing: 1, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase',
                    }}>
                      {proof.sold} sold
                    </span>
                  </div>
                )}

                {/* Body */}
                <div style={{ padding: '14px 16px 18px' }}>
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
                    marginBottom: 12,
                  }}>
                    {f.category.toUpperCase()} · {f.servingsPerContainer} COUNT
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 28,
                        color: isOutOfStock ? 'rgba(255,255,255,.3)' : 'hsl(var(--primary))',
                      }}>
                        ${f.price.toFixed(2)}
                      </span>
                      {/* Urgency line beneath price */}
                      {f.av && (
                        <div style={{ marginTop: 2 }}>
                          {urgency ? (
                            <span style={{
                              fontFamily: 'var(--font-ui)', fontSize: 8, letterSpacing: 1.2,
                              color: urgency.color, textTransform: 'uppercase', fontWeight: 800,
                            }}>
                              {urgency.text}
                            </span>
                          ) : isOutOfStock ? null : (
                            <motion.span
                              animate={{ opacity: [1, 0.6, 1] }}
                              transition={{ duration: 2.4, repeat: Infinity }}
                              style={{
                                fontFamily: 'var(--font-ui)', fontSize: 8, letterSpacing: 1.2,
                                color: 'hsl(var(--primary))', textTransform: 'uppercase', fontWeight: 800,
                                display: 'inline-block',
                              }}
                            >
                              ⚡ Ships Today
                            </motion.span>
                          )}
                        </div>
                      )}
                    </div>

                    {f.av && !isOutOfStock ? (
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddFlavor(f.name, f.shopifyVariantId); }}
                        style={{
                          padding: '9px 16px',
                          borderRadius: 100,
                          background: isCritical ? '#ef4444' : 'hsl(var(--primary))',
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
                        {isCritical ? '🔥 Buy Now' : 'Add to Cart'}
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
                        {isOutOfStock ? 'Sold Out' : 'Notify Me'}
                      </button>
                    )}
                  </div>

                  {/* Stock bar — only when inventory loaded and product available */}
                  {qty !== null && f.av && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 700,
                        letterSpacing: 1, color: 'rgba(255,255,255,.3)',
                        textTransform: 'uppercase', marginBottom: 4,
                      }}>
                        <span>Stock</span>
                        <span style={{ color: isCritical ? '#ef4444' : isLow ? '#f97316' : 'rgba(255,255,255,.3)' }}>
                          {isOutOfStock ? 'Sold Out' : isCritical ? 'Almost Gone' : isLow ? 'Low Stock' : 'In Stock'}
                        </span>
                      </div>
                      <div style={{ height: 3, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min((qty / 50) * 100, 100)}%`,
                          background: isCritical ? '#ef4444' : isLow ? '#f97316' : 'hsl(var(--primary))',
                          borderRadius: 4,
                          transition: 'width 1s ease',
                        }} />
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
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
            {PRODUCTS.map((f, i) => {
              const proof = getSocialProof(f.slug);
              const viewers = viewerCounts[f.slug] ?? proof.viewers;
              const qty = inventory[f.slug] ?? null;
              const urgency = getUrgencyLabel(qty);
              const isLow = qty !== null && qty <= LOW_STOCK_THRESHOLD && qty > 0;
              const isCritical = qty !== null && qty <= CRITICAL_STOCK_THRESHOLD && qty > 0;
              const isOutOfStock = qty !== null && qty <= 0;

              return (
                <Link
                  to={`/products/${f.slug}`}
                  className="flv-card group"
                  key={i}
                  style={{
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: isCritical ? '1px solid rgba(239,68,68,.3)' : undefined,
                    position: 'relative',
                  }}
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
                    style={{ background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                  >
                    <img src={f.img} alt={f.name} className="flv-product-img" />
                    <div className={`flv-av ${!f.av || isOutOfStock ? 'flv-cs' : ''}`}>
                      {isOutOfStock ? 'SOLD OUT' : f.av ? 'AVAILABLE' : 'COMING SOON'}
                    </div>

                    {/* Urgency badge inside image */}
                    {isCritical && (
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        style={{
                          position: 'absolute', bottom: 12, left: 12,
                          padding: '4px 10px',
                          borderRadius: 100,
                          fontFamily: 'var(--font-ui)',
                          fontSize: 9,
                          fontWeight: 800,
                          letterSpacing: 1.5,
                          textTransform: 'uppercase',
                          background: 'rgba(220,38,38,.85)',
                          color: '#fff',
                          zIndex: 5,
                        }}
                      >
                        Only {qty} left!
                      </motion.div>
                    )}
                    {isLow && !isCritical && (
                      <div style={{
                        position: 'absolute', bottom: 12, left: 12,
                        padding: '4px 10px',
                        borderRadius: 100,
                        fontFamily: 'var(--font-ui)',
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        background: 'rgba(249,115,22,.8)',
                        color: '#fff',
                        zIndex: 5,
                      }}>
                        Selling Fast
                      </div>
                    )}
                  </div>

                  {/* Live viewers strip */}
                  {f.av && (
                    <div style={{
                      background: 'rgba(255,90,0,.07)',
                      borderBottom: '1px solid rgba(255,90,0,.1)',
                      padding: '6px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}
                      />
                      <span style={{
                        fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                        letterSpacing: 1.5, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase',
                      }}>
                        {viewers} people viewing now
                      </span>
                      <span style={{
                        marginLeft: 'auto',
                        fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                        letterSpacing: 1, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase',
                      }}>
                        {proof.sold} sold this week
                      </span>
                    </div>
                  )}

                  <div className="flv-body">
                    <div>
                      <div className="flv-name">{f.name}</div>
                      <div className="flv-sub">{f.category.toUpperCase()} · {f.servingsPerContainer} COUNT</div>
                    </div>
                    <div className="flv-row">
                      <div>
                        <div className="flv-price" style={{ color: isOutOfStock ? 'rgba(255,255,255,.3)' : undefined }}>
                          ${f.price.toFixed(2)}
                        </div>
                        {/* Urgency line under price */}
                        {f.av && (
                          <div style={{ marginTop: 4 }}>
                            {urgency ? (
                              <span style={{
                                fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 1.5,
                                color: urgency.color, textTransform: 'uppercase', fontWeight: 800,
                              }}>
                                {urgency.text}
                              </span>
                            ) : isOutOfStock ? null : (
                              <motion.span
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 2.4, repeat: Infinity }}
                                style={{
                                  fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 1.5,
                                  color: 'hsl(var(--primary))', textTransform: 'uppercase', fontWeight: 800,
                                  display: 'inline-block',
                                }}
                              >
                                ⚡ Limited Stock · Ships Today
                              </motion.span>
                            )}
                          </div>
                        )}
                      </div>

                      {f.av && !isOutOfStock ? (
                        <button
                          className="flv-btn flv-buy"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddFlavor(f.name, f.shopifyVariantId); }}
                          style={isCritical ? { background: '#ef4444' } : undefined}
                        >
                          {isCritical ? '🔥 Buy Now' : 'Add to Cart'}
                        </button>
                      ) : (
                        <button
                          className="flv-btn flv-soon"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenModal(); }}
                        >
                          {isOutOfStock ? 'Sold Out' : 'Notify Me'}
                        </button>
                      )}
                    </div>

                    {/* Stock bar */}
                    {qty !== null && f.av && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{
                          display: 'flex', justifyContent: 'space-between',
                          fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                          letterSpacing: 1, color: 'rgba(255,255,255,.3)',
                          textTransform: 'uppercase', marginBottom: 5,
                        }}>
                          <span>Stock availability</span>
                          <span style={{ color: isCritical ? '#ef4444' : isLow ? '#f97316' : 'rgba(255,255,255,.3)' }}>
                            {isOutOfStock ? 'Sold Out' : isCritical ? 'Almost Gone' : isLow ? 'Low Stock' : 'In Stock'}
                          </span>
                        </div>
                        <div style={{ height: 3, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min((qty / 50) * 100, 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            style={{
                              height: '100%',
                              background: isCritical ? '#ef4444' : isLow ? '#f97316' : 'hsl(var(--primary))',
                              borderRadius: 4,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Urgency footer strip */}
                    {!isOutOfStock && f.av && (
                      <div style={{
                        marginTop: 14,
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: isCritical ? 'rgba(239,68,68,.07)' : 'rgba(255,90,0,.06)',
                        border: `1px solid ${isCritical ? 'rgba(239,68,68,.2)' : 'rgba(255,90,0,.12)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 800, letterSpacing: 1.5,
                          color: isCritical ? '#ef4444' : 'hsl(var(--primary))',
                          textTransform: 'uppercase',
                        }}>
                          {isCritical ? '⚠ Almost Gone — Order Now' : isLow ? '⚡ Selling Fast — Limited Stock' : '✓ In Stock — Buy Now & Save'}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: 1,
                          color: 'rgba(255,255,255,.25)', textTransform: 'uppercase',
                        }}>
                          Free Shipping
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlavorCarousel;