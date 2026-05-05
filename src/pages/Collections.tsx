import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/pureload';
import { fetchInventoryByVariantIds } from '@/lib/shopify'; // adjust path
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

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
  return null; // plenty of stock — no urgency label needed
}

const Collections = () => {
  const [viewerCounts, setViewerCounts] = useState<Record<string, number>>({});
  // null = loading, number = real qty from Shopify
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

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>
      {/* Header — unchanged */}
      <div className="pt-[100px] pb-12 px-6 md:px-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 14 }}>All Products</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(52px,8vw,100px)', lineHeight: '.88', letterSpacing: '2px', color: 'hsl(var(--pl-white))' }}>
          THE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>COLLECTION</em>
        </motion.h1>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            marginTop: 16, display: 'inline-block',
            fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, letterSpacing: 2,
            color: '#000', background: 'hsl(var(--primary))',
            padding: '6px 14px', borderRadius: 100, textTransform: 'uppercase',
          }}>
          Free Shipping On All Orders · Save More with Bundles
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: 20, display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { text: 'Best sellers moving fast' },
            { text: 'GMP Certified · Lab Tested' },
            { text: 'Free US Shipping' },
          ].map((item, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
              color: 'rgba(255,255,255,.4)', textTransform: 'uppercase',
            }}>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 md:px-20 pb-20 max-w-[1400px] mx-auto">
        {PRODUCTS.map((f, i) => {
          const proof = getSocialProof(f.slug);
          const viewers = viewerCounts[f.slug] ?? proof.viewers;
          const qty = inventory[f.slug] ?? null;                  // null while loading
          const urgency = getUrgencyLabel(qty);
          const isLow = qty !== null && qty <= LOW_STOCK_THRESHOLD && qty > 0;
          const isCritical = qty !== null && qty <= CRITICAL_STOCK_THRESHOLD && qty > 0;
          const isOutOfStock = qty !== null && qty <= 0;

          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55 }}>
              <Link to={`/products/${f.slug}`} className="group block rounded-2xl overflow-hidden border transition-all duration-300"
                style={{ background: '#0d0d0d', borderColor: isCritical ? 'rgba(239,68,68,.3)' : 'rgba(255,255,255,.07)', position: 'relative' }}>

                {/* Image area */}
                <div className="h-56 flex items-center justify-center relative overflow-hidden" style={{ background: f.bg }}>
                  <img src={f.img} alt={f.name} className="h-[65%] object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: 'drop-shadow(0 10px 30px rgba(255,90,0,.2))' }} />

                  {f.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                      style={{ fontFamily: 'var(--font-ui)', background: 'hsl(var(--primary))', color: '#000' }}>
                      {f.badge}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      background: isOutOfStock ? 'rgba(107,114,128,.7)' : 'rgba(0,0,0,.6)',
                      color: 'hsl(var(--pl-white))',
                      border: '1px solid rgba(255,255,255,.1)',
                    }}>
                    {isOutOfStock ? 'SOLD OUT' : 'AVAILABLE'}
                  </div>

                  {/* Real urgency badge — only renders once inventory loads */}
                  {isCritical && (
                    <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                      className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                      style={{ fontFamily: 'var(--font-ui)', background: 'rgba(220,38,38,.85)', color: '#fff' }}>
                      Only {qty} left!
                    </motion.div>
                  )}
                  {isLow && !isCritical && (
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                      style={{ fontFamily: 'var(--font-ui)', background: 'rgba(249,115,22,.8)', color: '#fff' }}>
                      Selling Fast
                    </div>
                  )}
                </div>

                {/* Live viewers */}
                <div style={{
                  background: 'rgba(255,90,0,.07)', borderBottom: '1px solid rgba(255,90,0,.1)',
                  padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase' }}>
                    {viewers} people viewing now
                  </span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase' }}>
                    {proof.sold} sold this week
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, letterSpacing: 1, color: 'hsl(var(--pl-white))' }}>{f.name}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'hsl(var(--primary))', marginTop: 4, textTransform: 'uppercase', fontWeight: 700 }}>{f.category}</div>
                  {f.shortBenefit && (
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', marginTop: 8, lineHeight: 1.55 }}>{f.shortBenefit}</div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: isOutOfStock ? 'rgba(255,255,255,.3)' : 'hsl(var(--primary))' }}>
                        ${f.price.toFixed(2)}
                      </span>
                      <div style={{ marginTop: 4 }}>
                        {urgency ? (
                          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 1.5, color: urgency.color, textTransform: 'uppercase', fontWeight: 800 }}>
                            {urgency.text}
                          </span>
                        ) : (
                          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', fontWeight: 700 }}>
                            {f.bundlePricing ? 'Save more with bundles' : 'In Stock — Ships Today'}
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.span whileHover={{ x: 4 }} style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: isOutOfStock ? 'rgba(255,255,255,.25)' : 'hsl(var(--primary))', letterSpacing: 1.5, fontWeight: 700, display: 'inline-block' }}>
                      {isOutOfStock ? 'Sold Out' : isCritical ? 'Buy Now →' : 'Shop Now →'}
                    </motion.span>
                  </div>

                  {/* Stock bar — only shown when inventory data is loaded */}
                  {qty !== null && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 5 }}>
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
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Collections;