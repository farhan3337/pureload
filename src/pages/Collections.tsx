import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/pureload';
import { motion } from 'framer-motion';

const Collections = () => {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>
      <div className="pt-[100px] pb-12 px-6 md:px-20 text-center">
        <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 14 }}>All Products</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(52px,8vw,100px)', lineHeight: '.88', letterSpacing: '2px', color: 'hsl(var(--pl-white))' }}>
          THE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>COLLECTION</em>
        </h1>
        <div style={{
          marginTop: 16, display: 'inline-block',
          fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, letterSpacing: 2,
          color: '#000', background: 'hsl(var(--primary))',
          padding: '6px 14px', borderRadius: 100, textTransform: 'uppercase',
        }}>
          📦 Free Shipping On All Orders · Save More with Bundles
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 md:px-20 pb-20 max-w-[1400px] mx-auto">
        {PRODUCTS.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
            <Link to={`/products/${f.slug}`} className="group block rounded-2xl overflow-hidden border transition-all duration-300" style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,.07)' }}>
              <div className="h-56 flex items-center justify-center relative overflow-hidden" style={{ background: f.bg }}>
                <img src={f.img} alt={f.name} className="h-[65%] object-contain relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ filter: 'drop-shadow(0 10px 30px rgba(255,90,0,.2))' }} />
                {f.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20" style={{ fontFamily: 'var(--font-ui)', background: 'hsl(var(--primary))', color: '#000' }}>
                    {f.badge}
                  </div>
                )}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20" style={{ fontFamily: 'var(--font-ui)', background: 'rgba(0,0,0,.6)', color: 'hsl(var(--pl-white))', border: '1px solid rgba(255,255,255,.1)' }}>
                  AVAILABLE
                </div>
              </div>
              <div className="p-5">
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, letterSpacing: 1, color: 'hsl(var(--pl-white))' }}>{f.name}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'hsl(var(--primary))', marginTop: 4, textTransform: 'uppercase', fontWeight: 700 }}>{f.category}</div>
                {f.shortBenefit && (
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', marginTop: 8, lineHeight: 1.55 }}>
                    {f.shortBenefit}
                  </div>
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
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'hsl(var(--primary))', letterSpacing: 1.5, fontWeight: 700 }}>Shop Now →</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
