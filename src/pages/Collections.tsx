import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/pureload';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

// Random excitement data per product
function getExcitement(slug: string) {
  const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const stock = 3 + (hash % 14); // 3–16
  const viewers = 8 + (hash % 43); // 8–50
  const sold = 20 + (hash % 80); // 20–99
  return { stock, viewers, sold };
}

const Collections = () => {
  const [viewerCounts, setViewerCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const initial: Record<string, number> = {};
    PRODUCTS.forEach(p => { initial[p.slug] = getExcitement(p.slug).viewers; });
    setViewerCounts(initial);
    // Simulate live viewer count fluctuations
    const iv = setInterval(() => {
      setViewerCounts(prev => {
        const next = { ...prev };
        PRODUCTS.forEach(p => {
          const base = getExcitement(p.slug).viewers;
          next[p.slug] = Math.max(1, base + Math.floor(Math.random() * 7) - 3);
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>
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
          📦 Free Shipping On All Orders · Save More with Bundles
        </motion.div>

        {/* Live activity ticker */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: 20, display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '🔥', text: 'Best sellers moving fast' },
            { icon: '✅', text: 'GMP Certified · Lab Tested' },
            { icon: '🚀', text: 'Free US Shipping' },
          ].map((item, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
              color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{item.icon}</span>{item.text}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 md:px-20 pb-20 max-w-[1400px] mx-auto">
        {PRODUCTS.map((f, i) => {
          const exc = getExcitement(f.slug);
          const isLow = exc.stock <= 6;
          const viewers = viewerCounts[f.slug] ?? exc.viewers;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55 }}>
              <Link to={`/products/${f.slug}`} className="group block rounded-2xl overflow-hidden border transition-all duration-300"
                style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,.07)', position: 'relative' }}>

                {/* Image area */}
                <div className="h-56 flex items-center justify-center relative overflow-hidden" style={{ background: f.bg }}>
                  <img src={f.img} alt={f.name} className="h-[65%] object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ filter: 'drop-shadow(0 10px 30px rgba(255,90,0,.2))' }} />

                  {/* Badge */}
                  {f.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                      style={{ fontFamily: 'var(--font-ui)', background: 'hsl(var(--primary))', color: '#000' }}>
                      {f.badge}
                    </div>
                  )}

                  {/* Available tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                    style={{ fontFamily: 'var(--font-ui)', background: 'rgba(0,0,0,.6)', color: 'hsl(var(--pl-white))', border: '1px solid rgba(255,255,255,.1)' }}>
                    AVAILABLE
                  </div>

                  {/* Low stock warning */}
                  {isLow && (
                    <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                      className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                      style={{ fontFamily: 'var(--font-ui)', background: 'rgba(220,38,38,.85)', color: '#fff' }}>
                      🔥 Only {exc.stock} left!
                    </motion.div>
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
                    {exc.sold} sold this week
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
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'hsl(var(--primary))' }}>${f.price.toFixed(2)}</span>
                      {f.bundlePricing && (
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, letterSpacing: 1.5, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', fontWeight: 700, marginTop: 2 }}>
                          Save more with bundles
                        </div>
                      )}
                    </div>
                    <motion.span whileHover={{ x: 4 }} style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'hsl(var(--primary))', letterSpacing: 1.5, fontWeight: 700, display: 'inline-block' }}>
                      Shop Now →
                    </motion.span>
                  </div>

                  {/* Stock bar */}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 5 }}>
                      <span>Stock availability</span>
                      <span style={{ color: isLow ? '#ef4444' : 'rgba(255,255,255,.3)' }}>{isLow ? 'Low!' : 'Good'}</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${(exc.stock / 16) * 100}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.05 }}
                        style={{ height: '100%', background: isLow ? '#ef4444' : 'hsl(var(--primary))', borderRadius: 4 }} />
                    </div>
                  </div>
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
