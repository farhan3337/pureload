import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '@/data/pureload';

interface OrderSectionProps {
  onAddCart: (qty: number, price: number, label: string, variantId?: string) => void;
}

const OrderSection = ({ onAddCart }: OrderSectionProps) => {
  const navigate = useNavigate();
  const mainProduct = PRODUCTS[0];
  const bp = mainProduct.bundlePricing!;

  // Track viewport so we can render a tighter mobile layout
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 900
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const packs = [
    { qty: 1, price: bp.single, original: bp.single, label: '1-Bottle', tag: '' },
    { qty: 2, price: bp.twoPack, original: bp.twoPackOriginal, label: '2-Pack', tag: 'MOST POPULAR' },
    { qty: 3, price: bp.threePack, original: bp.threePackOriginal, label: '3-Pack', tag: 'BEST VALUE' },
  ];

  const [pack, setPack] = useState(packs[2]);
  const [oQty, setOQty] = useState(1);

  // ── Mobile: fresh container, NO #ch-ord / #s-ord IDs (those have desktop CSS) ──
  if (isMobile) {
    return (
      <div style={{
        background: 'hsl(var(--pl-black))',
        padding: '60px 0 50px',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}>
        <div style={{
          padding: '0 20px',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Header */}
          <div className="sec-ey" style={{ marginBottom: 10 }}>Secure Your Stash</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(44px, 12vw, 72px)',
            lineHeight: '.92',
            letterSpacing: '1px',
            color: 'hsl(var(--pl-white))',
            margin: 0,
          }}>
            SECURE<br />
            <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>YOUR STASH.</em>
          </h2>
          <p style={{
            fontSize: 13,
            color: 'rgba(255,255,255,.55)',
            lineHeight: 1.55,
            marginTop: 14,
            marginBottom: 22,
          }}>
            Premium supplements. Lab tested. GMP certified. Made in USA.{' '}
            <strong style={{ color: 'hsl(var(--primary))' }}>FREE shipping on all orders.</strong>
          </p>

          {/* Hero image */}
          <div
            onClick={() => navigate(`/products/${mainProduct.slug}`)}
            style={{
              borderRadius: 20,
              background: 'linear-gradient(180deg, rgba(255,90,0,.08) 0%, rgba(13,13,13,1) 100%)',
              border: '1px solid rgba(255,255,255,.06)',
              padding: '30px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
              cursor: 'pointer',
              minHeight: 280,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <img
              src={mainProduct.images.front}
              alt={mainProduct.name}
              style={{
                maxHeight: 260,
                maxWidth: '100%',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(255,90,0,.25))',
              }}
            />
          </div>

          {/* Thumbnails */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 28,
            width: '100%',
          }}>
            {[mainProduct.images.nutrition, mainProduct.images.back].map((src, i) => (
              <div
                key={i}
                onClick={() => navigate(`/products/${mainProduct.slug}`)}
                style={{
                  borderRadius: 12,
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,.06)',
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 110,
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                <img
                  src={src}
                  alt={i === 0 ? 'Supplement Facts' : 'Product Back'}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>

          {/* Pack selector — equal-height cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
            marginTop: 16,
            marginBottom: 6,
            width: '100%',
          }}>
            {packs.map(p => {
              const isSelected = pack.label === p.label;
              const isBest = p.label === '3-Pack';
              const savings = p.original - p.price;
              return (
                <button
                  key={p.label}
                  onClick={() => setPack(p)}
                  style={{
                    position: 'relative',
                    padding: '22px 4px 14px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(255,90,0,.08)' : 'rgba(255,255,255,.03)',
                    border: isSelected
                      ? '2px solid hsl(var(--primary))'
                      : isBest
                        ? '2px solid rgba(255,90,0,.35)'
                        : '1.5px solid rgba(255,255,255,.08)',
                    transition: 'all .2s',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minHeight: 130,
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  {p.tag && (
                    <div style={{
                      position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)',
                      background: 'hsl(var(--primary))', color: '#000',
                      fontFamily: 'var(--font-ui)', fontSize: 7, fontWeight: 900, letterSpacing: 1,
                      padding: '3px 6px', borderRadius: 100, whiteSpace: 'nowrap',
                    }}>{p.tag}</div>
                  )}
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 800,
                    letterSpacing: 1.2, color: 'hsl(var(--pl-white))',
                  }}>
                    {p.label.toUpperCase()}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: 19,
                    color: 'hsl(var(--primary))', marginTop: 6, lineHeight: 1,
                  }}>
                    ${p.price.toFixed(2)}
                  </div>
                  {savings > 0 && (
                    <div style={{
                      marginTop: 6,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}>
                      <span style={{
                        fontSize: 9,
                        color: 'rgba(255,255,255,.35)',
                        textDecoration: 'line-through',
                      }}>
                        ${p.original.toFixed(2)}
                      </span>
                      <span style={{
                        fontSize: 9,
                        color: 'hsl(var(--primary))',
                        fontWeight: 800,
                        letterSpacing: .5,
                      }}>
                        Save ${savings.toFixed(2)}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected price */}
          <div style={{
            marginTop: 24,
            fontFamily: 'var(--font-heading)',
            fontSize: 38,
            color: 'hsl(var(--pl-white))',
            lineHeight: 1,
          }}>
            ${pack.price.toFixed(2)}
            <sub style={{
              fontFamily: 'var(--font-ui)', fontSize: 12,
              color: 'rgba(255,255,255,.4)', letterSpacing: 1.5, marginLeft: 8,
            }}>
              / {pack.label}
            </sub>
          </div>

          {/* Qty + urgency */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 18,
            gap: 12,
            width: '100%',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 100,
              padding: 4,
              flexShrink: 0,
            }}>
              <button
                onClick={() => setOQty(Math.max(1, oQty - 1))}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: 'none', background: 'transparent',
                  color: 'hsl(var(--pl-white))', fontSize: 18, cursor: 'pointer',
                }}
              >−</button>
              <div style={{
                minWidth: 28, textAlign: 'center',
                fontFamily: 'var(--font-ui)', fontWeight: 800,
                color: 'hsl(var(--pl-white))', fontSize: 15,
              }}>{oQty}</div>
              <button
                onClick={() => setOQty(oQty + 1)}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: 'none', background: 'transparent',
                  color: 'hsl(var(--pl-white))', fontSize: 18, cursor: 'pointer',
                }}
              >+</button>
            </div>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 800,
              letterSpacing: 1.3, color: 'hsl(var(--primary))', textTransform: 'uppercase',
              textAlign: 'right', flex: 1,
            }}>
              ⚡ Selling Fast · Limited Stock
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => onAddCart(oQty, pack.price, pack.label, mainProduct.shopifyVariantId)}
            style={{
              width: '100%',
              marginTop: 18,
              padding: '18px',
              borderRadius: 100,
              background: 'hsl(var(--pl-white))',
              color: '#000',
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxSizing: 'border-box',
            }}
          >
            ADD TO CART
          </button>

          {/* Trust strip */}
          <div style={{
            display: 'flex', justifyContent: 'space-around', gap: 8,
            marginTop: 18, flexWrap: 'wrap',
            fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
            letterSpacing: 1.3, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase',
          }}>
            <span>🔒 Secure Checkout</span>
            <span>🚚 Fast Shipping</span>
            <span>🔬 Lab Tested</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Desktop: original layout untouched ──
  return (
    <div id="ch-ord" style={{ height: '170vh' }}>
      <section id="s-ord">
        <div className="ord-grid">
          <div id="ordL">
            <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 10 }}>Secure Your Stash</div>
            <h2 className="ord-h">SECURE<br /><em>YOUR STASH.</em></h2>
            <p className="ord-desc">Premium supplements. Lab tested. GMP certified. Made in USA. <strong style={{ color: 'hsl(var(--primary))' }}>FREE shipping on all orders.</strong></p>

            <div className="pack-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {packs.map(p => {
                const isSelected = pack.label === p.label;
                const isBest = p.label === '3-Pack';
                return (
                  <button
                    key={p.label}
                    onClick={() => setPack(p)}
                    style={{
                      position: 'relative',
                      padding: '18px 10px 14px',
                      borderRadius: 14,
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(255,90,0,.08)' : 'rgba(255,255,255,.03)',
                      border: isSelected
                        ? '2px solid hsl(var(--primary))'
                        : isBest
                          ? '2px solid rgba(255,90,0,.35)'
                          : '1.5px solid rgba(255,255,255,.08)',
                      transition: 'all .2s',
                      textAlign: 'center',
                    }}
                  >
                    {p.tag && (
                      <div style={{
                        position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                        background: 'hsl(var(--primary))', color: '#000',
                        fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 900, letterSpacing: 1.5,
                        padding: '3px 8px', borderRadius: 100, whiteSpace: 'nowrap',
                      }}>{p.tag}</div>
                    )}
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 800, letterSpacing: 2, color: 'hsl(var(--pl-white))' }}>
                      {p.label.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'hsl(var(--primary))', marginTop: 4 }}>
                      ${p.price.toFixed(2)}
                    </div>
                    {p.original > p.price && (
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>
                        <span style={{ textDecoration: 'line-through' }}>${p.original.toFixed(2)}</span>
                        <span style={{ color: 'hsl(var(--primary))', marginLeft: 6, fontWeight: 700 }}>
                          Save ${(p.original - p.price).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="ord-price" style={{ marginTop: 22 }}>
              ${pack.price.toFixed(2)} <sub>/ {pack.label}</sub>
            </div>

            <div className="qty-row">
              <div className="qty-ctrl">
                <button className="qb" onClick={() => setOQty(Math.max(1, oQty - 1))}>−</button>
                <div className="qn">{oQty}</div>
                <button className="qb" onClick={() => setOQty(oQty + 1)}>+</button>
              </div>
              <span className="hot-tag">Selling Fast · Limited Stock</span>
            </div>

            <button className="atc" onClick={() => onAddCart(oQty, pack.price, pack.label, mainProduct.shopifyVariantId)}>ADD TO CART</button>

            <div style={{
              display: 'flex', justifyContent: 'center', gap: 18, marginTop: 14, flexWrap: 'wrap',
              fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase',
            }}>
              <span>🔒 Secure Checkout</span>
              <span>🚚 Fast Shipping</span>
              <span>🔬 Lab Tested</span>
            </div>
          </div>
          <div id="ordR">
            <div className="ord-imgs" onClick={() => navigate(`/products/${mainProduct.slug}`)} style={{ cursor: 'pointer' }}>
              <div className="ord-main">
                <img src={mainProduct.images.front} alt={mainProduct.name} className="ord-product-img" />
              </div>
              <div className="ord-mini">
                <img src={mainProduct.images.nutrition} alt="Supplement Facts" className="ord-mini-img" />
              </div>
              <div className="ord-mini">
                <img src={mainProduct.images.back} alt="Product Back" className="ord-mini-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSection;