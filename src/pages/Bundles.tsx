import { useState, useRef } from 'react';
import { PRODUCTS } from '@/data/pureload';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';

interface BundlesProps {
  onAddCart: (qty: number, price: number, label: string, variantId?: string) => void;
}

const PACK_OPTIONS = [
  { key: 'single', label: '1 BOTTLE', qty: 1, tag: '', savePct: 0, desc: 'Try the PURELOAD experience' },
  { key: 'twoPack', label: '2 PACK', qty: 2, tag: 'SAVE MORE', savePct: 13, desc: 'One month of gains' },
  { key: 'threePack', label: '3 PACK', qty: 3, tag: 'BEST VALUE', savePct: 22, desc: 'Maximum results — most popular' },
];

const Bundles = ({ onAddCart }: BundlesProps) => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedPack, setSelectedPack] = useState(PACK_OPTIONS[2]);
  const [modalOpen, setModalOpen] = useState(false);

  // Ref to Step 2 — used for mobile auto-scroll
  const step2Ref = useRef<HTMLDivElement>(null);

  const bp = selectedProduct.bundlePricing!;
  const priceMap: Record<string, number> = {
    single: bp.single,
    twoPack: bp.twoPack,
    threePack: bp.threePack,
  };
  const originalMap: Record<string, number> = {
    single: bp.single,
    twoPack: bp.twoPackOriginal,
    threePack: bp.threePackOriginal,
  };
  const variantIdMap: Record<string, string> = {
    single: bp.singleVariantId,
    twoPack: bp.twoPackVariantId,
    threePack: bp.threePackVariantId,
  };

  const currentPrice = priceMap[selectedPack.key];
  const originalPrice = originalMap[selectedPack.key];

  const handleProductSelect = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    // Auto-scroll to Step 2 on mobile only
    if (window.innerWidth < 768 && step2Ref.current) {
      setTimeout(() => {
        step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handlePackClick = (pack: typeof PACK_OPTIONS[0]) => {
    setSelectedPack(pack);
    setModalOpen(true);
  };

  const handleAddBundleToCart = () => {
    const variantId = variantIdMap[selectedPack.key];
    onAddCart(1, currentPrice, `${selectedProduct.name} — ${selectedPack.label}`, variantId);
  };

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>

      {/* Mobile-only styles */}
      <style>{`
        @media (max-width: 767px) {
          .mobile-step-nudge { display: block !important; }
        }
      `}</style>

      {/* Header */}
      <div className="pt-[100px] pb-10 px-6 md:px-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 14 }}>
          Save More, Lift More
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(52px,8vw,100px)', lineHeight: '.88', letterSpacing: '2px', color: 'hsl(var(--pl-white))' }}>
          BUILD YOUR{' '}
          <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>BUNDLE</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', marginTop: 14, lineHeight: 1.7 }}>
          Pick your product, choose your pack size, and save up to 22% instantly.
        </motion.p>
      </div>

      {/* Step 1 — Product Selector */}
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto pb-8">
        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: 16 }}>
          Step 1 — Choose Your Product
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PRODUCTS.filter(p => p.bundlePricing).map((p, i) => (
            <motion.button key={p.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}
              onClick={() => handleProductSelect(p)}
              className="flex flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-200"
              style={{
                background: selectedProduct.slug === p.slug ? 'rgba(255,90,0,.1)' : '#0d0d0d',
                border: selectedProduct.slug === p.slug ? '2px solid hsl(var(--primary))' : '1px solid rgba(255,255,255,.08)',
              }}
            >
              <div style={{ width: '100%', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: p.bg, borderRadius: 12, overflow: 'hidden' }}>
                <img src={p.img} alt={p.name} style={{ height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(255,90,0,.3))' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: selectedProduct.slug === p.slug ? 'hsl(var(--primary))' : 'rgba(255,255,255,.6)', letterSpacing: 0.5, textAlign: 'center' }}>
                {p.name}
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: selectedProduct.slug === p.slug ? 'hsl(var(--primary))' : 'rgba(255,255,255,.5)' }}>
                ${p.price.toFixed(2)}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Mobile-only: confirmation nudge after selecting a product */}
        <motion.div
          key={selectedProduct.slug}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mobile-step-nudge"
          style={{
            display: 'none', // overridden to block on mobile via <style>
            marginTop: 16,
            padding: '12px 16px',
            borderRadius: 12,
            background: 'rgba(255,90,0,0.07)',
            border: '1px solid rgba(255,90,0,0.25)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: 'hsl(var(--primary))', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            ✓ {selectedProduct.name} selected — scroll down to choose your pack ↓
          </span>
        </motion.div>
      </div>

      {/* Step 2 — Pack Selector — scroll target */}
      <div
        ref={step2Ref}
        style={{ scrollMarginTop: 80 }}
        className="px-6 md:px-20 max-w-[1400px] mx-auto pb-12"
      >
        <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: 16 }}>
          Step 2 — Choose Your Pack (tap to see details)
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PACK_OPTIONS.map((pack, idx) => {
            const price = priceMap[pack.key];
            const orig = originalMap[pack.key];
            const isSelected = selectedPack.key === pack.key;

            return (
              <motion.button key={pack.key}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.55 }}
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(255,90,0,.15)' } as any}
                onClick={() => handlePackClick(pack)}
                className="relative rounded-3xl p-8 text-left transition-all duration-300"
                style={{
                  background: isSelected ? 'rgba(255,90,0,.06)' : '#0d0d0d',
                  border: isSelected ? '2px solid hsl(var(--primary))' : '1px solid rgba(255,255,255,.07)',
                  cursor: 'pointer',
                  minHeight: 280,
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {pack.tag && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full"
                    style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', background: 'hsl(var(--primary))', color: '#000' }}>
                    {pack.tag}
                  </div>
                )}

                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 34, letterSpacing: 1, color: 'hsl(var(--pl-white))', marginBottom: 8 }}>
                  {pack.label}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginBottom: 20 }}>{pack.desc}</div>

                <div className="flex items-center gap-2 mb-6 flex-1">
                  {Array.from({ length: pack.qty }).map((_, i) => (
                    <div key={i} style={{ flex: 1, height: 100, background: selectedProduct.bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={selectedProduct.img} alt="" style={{ height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(255,90,0,.2))' }} />
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-2">
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 44, color: 'hsl(var(--primary))' }}>${price.toFixed(2)}</span>
                  {pack.savePct > 0 && (
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'rgba(255,255,255,.25)', textDecoration: 'line-through' }}>${orig.toFixed(2)}</span>
                  )}
                </div>
                {pack.savePct > 0 && (
                  <div className="mt-2 inline-block px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,90,0,.12)', fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'hsl(var(--primary))' }}>
                    SAVE {pack.savePct}%
                  </div>
                )}

                <div className="mt-4 text-center" style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'hsl(var(--primary))', letterSpacing: 2, fontWeight: 700 }}>
                  TAP TO VIEW DETAILS →
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Quick CTA */}
      <div className="text-center py-8 px-6">
        <motion.button className="atc" style={{ maxWidth: 480, margin: '0 auto', display: 'block' }}
          whileHover={{ scale: 1.03 } as any} whileTap={{ scale: 0.97 } as any}
          onClick={handleAddBundleToCart}>
          ADD {selectedPack.label} TO CART — ${currentPrice.toFixed(2)}
        </motion.button>
        {selectedPack.savePct > 0 && (
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 12, letterSpacing: 1 }}>
            YOU SAVE ${(originalPrice - currentPrice).toFixed(2)} VS BUYING SEPARATELY
          </p>
        )}
      </div>

      <Footer />

      {/* ── Bundle Detail Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)' }} />

            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 1001,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 24, pointerEvents: 'none',
              }}
            >
              <div style={{
                pointerEvents: 'auto',
                background: '#0d0d0d',
                borderRadius: 28,
                border: '1.5px solid rgba(255,90,0,.25)',
                boxShadow: '0 40px 100px rgba(0,0,0,.8), 0 0 60px rgba(255,90,0,.1)',
                maxWidth: 680, width: '100%',
                maxHeight: '90vh', overflowY: 'auto',
              }}>
                <div style={{ height: 4, background: 'linear-gradient(90deg,hsl(var(--primary)),transparent)', borderRadius: '28px 28px 0 0' }} />

                <div style={{ padding: '36px 36px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div>
                      {selectedPack.tag && (
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 800, letterSpacing: 2, background: 'hsl(var(--primary))', color: '#000', padding: '4px 12px', borderRadius: 100, display: 'inline-block', marginBottom: 10 }}>
                          {selectedPack.tag}
                        </div>
                      )}
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,42px)', letterSpacing: 1, color: 'hsl(var(--pl-white))', lineHeight: 1 }}>
                        {selectedProduct.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: 'hsl(var(--primary))', letterSpacing: 2, marginTop: 6, textTransform: 'uppercase' }}>
                        {selectedPack.label} · {selectedPack.desc}
                      </div>
                    </div>
                    <button onClick={() => setModalOpen(false)}
                      style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: '#fff', fontSize: 16, cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>
                      ✕
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginBottom: 28, justifyContent: 'center' }}>
                    {Array.from({ length: selectedPack.qty }).map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        style={{ flex: 1, maxWidth: 180, height: 160, background: selectedProduct.bg, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={selectedProduct.img} alt={selectedProduct.name} style={{ height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 6px 20px rgba(255,90,0,.3))' }} />
                      </motion.div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(255,255,255,.03)', borderRadius: 16, padding: '20px', border: '1px solid rgba(255,255,255,.06)', marginBottom: 20 }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 12 }}>
                      What's Included
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {(selectedProduct.benefits || []).slice(0, 4).map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,.55)' }}>
                          <span style={{ color: 'hsl(var(--primary))', fontWeight: 800, fontSize: 10 }}>✓</span>
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 52, color: 'hsl(var(--primary))', lineHeight: 1 }}>
                          ${currentPrice.toFixed(2)}
                        </span>
                        {selectedPack.savePct > 0 && (
                          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'rgba(255,255,255,.25)', textDecoration: 'line-through' }}>
                            ${originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {selectedPack.savePct > 0 && (
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: 'hsl(var(--primary))', marginTop: 4 }}>
                          YOU SAVE ${(originalPrice - currentPrice).toFixed(2)} — {selectedPack.savePct}% OFF
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {['✅ Free Shipping', '✅ GMP Certified', '✅ 30-Day Guarantee'].map((t, i) => (
                        <div key={i} style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.35)', letterSpacing: 1 }}>{t}</div>
                      ))}
                    </div>
                  </div>

                  <motion.button className="atc" style={{ width: '100%' }}
                    whileHover={{ scale: 1.02 } as any} whileTap={{ scale: 0.98 } as any}
                    onClick={() => {
                      handleAddBundleToCart();
                      setModalOpen(false);
                    }}>
                    ADD {selectedPack.label} TO CART — ${currentPrice.toFixed(2)}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bundles;