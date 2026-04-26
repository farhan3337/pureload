import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/data/pureload';
import ProductBenefits from '@/components/ProductBenefits';
import ProductReviews from '@/components/ProductReviews';

interface ProductDetailProps {
  onAddCart: (qty: number, price: number, label: string, variantId?: string, isSubscription?: boolean, subscriptionInterval?: number) => void;
}

const SUBSCRIPTION_INTERVALS = [
  { label: '30 Days', value: 30, discount: 0.15 },
  { label: '60 Days', value: 60, discount: 0.12 },
  { label: '90 Days', value: 90, discount: 0.10 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const ProductDetail = ({ onAddCart }: ProductDetailProps) => {
  const { slug } = useParams();
  const product = PRODUCTS.find(f => f.slug === slug);
  const [qty, setQty] = useState(1);
  const [selectedPack, setSelectedPack] = useState({ items: 3, price: 0, label: '3-Pack' });
  const [subscribe, setSubscribe] = useState(true);
  const [subInterval, setSubInterval] = useState(SUBSCRIPTION_INTERVALS[0]);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Swipe state — tracked via refs so handlers never go stale
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImg(0);
    setQty(1);
    setSelectedPack({ items: 3, price: 0, label: '3-Pack' });
    setSubscribe(true);
    setSubInterval(SUBSCRIPTION_INTERVALS[0]);
    setLightboxIndex(null);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(var(--pl-black))' }}>
        <div className="text-center">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 48, color: 'hsl(var(--pl-white))' }}>PRODUCT NOT FOUND</h1>
          <Link to="/collections" className="btn-p mt-6 inline-block">Back to Collection</Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (lightboxIndex === null || !product?.ingredientImages) return;
    const total = product.ingredientImages.length;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % total);
      else if (e.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + total) % total);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, product]);

  const images = [product.images.front, product.images.nutrition, product.images.back];

  const bp = product.bundlePricing;
  const packs = bp ? [
    { items: 1, price: bp.single, original: bp.single, label: '1-Bottle', tag: '' },
    { items: 2, price: bp.twoPack, original: bp.twoPackOriginal, label: '2-Pack', tag: 'Most Popular' },
    { items: 3, price: bp.threePack, original: bp.threePackOriginal, label: '3-Pack', tag: 'Best Value' },
  ] : [
    { items: 1, price: product.price, original: product.price, label: '1-Bottle', tag: '' },
    { items: 2, price: Math.round(product.price * 1.75 * 100) / 100, original: Math.round(product.price * 2 * 100) / 100, label: '2-Pack', tag: 'Most Popular' },
    { items: 3, price: Math.round(product.price * 2.5 * 100) / 100, original: Math.round(product.price * 3 * 100) / 100, label: '3-Pack', tag: 'Best Value' },
  ];

  const currentPack = selectedPack.price > 0
    ? selectedPack
    : packs.find(p => p.label === selectedPack.label) || packs[2];
  const finalPrice = subscribe ? currentPack.price * (1 - subInterval.discount) : currentPack.price;

  const handleAdd = () => {
    const label = `${product.name} ${currentPack.label}${subscribe ? ` (Sub ${subInterval.label})` : ''}`;
    onAddCart(qty, finalPrice, label, product.shopifyVariantId, subscribe, subscribe ? subInterval.value : undefined);
  };

  const relatedProducts = PRODUCTS.filter(f => f.slug !== slug);
  const productReviews = product.reviews || [];

  // ── Swipe handlers (touch + mouse, both directions, no stale closure) ──
  const SWIPE_THRESHOLD = 40;
  const VERTICAL_LOCK = 10; // if vertical movement exceeds this first, ignore swipe

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    // If primarily a vertical scroll, ignore
    if (Math.abs(dy) > Math.abs(dx) + VERTICAL_LOCK) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) {
      // swipe left → next
      setActiveImg(prev => Math.min(prev + 1, images.length - 1));
    } else {
      // swipe right → previous
      setActiveImg(prev => Math.max(prev - 1, 0));
    }
  }, [images.length]);

  // Mouse drag fallback for desktop
  const mouseStartX = useRef<number | null>(null);
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
  }, []);
  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    mouseStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) {
      setActiveImg(prev => Math.min(prev + 1, images.length - 1));
    } else {
      setActiveImg(prev => Math.max(prev - 1, 0));
    }
  }, [images.length]);
  const onMouseLeave = useCallback(() => { mouseStartX.current = null; }, []);

  // Peek offset: shows ~12% of the next image on the right
  const PEEK = 12; // percent of container visible as next-image peek
  const GAP = 12;  // px gap between slides

  return (
    <motion.div
      key={slug}
      className="min-h-screen"
      style={{ background: 'hsl(var(--pl-black))' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="pt-[100px] px-6 md:px-20"
        style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}
      >
        <Link to="/" style={{ color: 'rgba(255,255,255,.3)' }}>Home</Link>
        <span style={{ color: 'rgba(255,255,255,.15)', margin: '0 8px' }}>/</span>
        <Link to="/collections" style={{ color: 'rgba(255,255,255,.3)' }}>Collection</Link>
        <span style={{ color: 'rgba(255,255,255,.15)', margin: '0 8px' }}>/</span>
        <span style={{ color: 'hsl(var(--primary))' }}>{product.name}</span>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 px-6 md:px-20 py-10 max-w-[1360px] mx-auto items-start">

        {/* Left - Images */}
        <motion.div variants={scaleIn} initial="hidden" animate="visible">

          {/* ── Swipeable image strip (peek layout) ── */}
          <div
            ref={containerRef}
            className="relative mb-4"
            style={{
              height: 'clamp(320px, 50vw, 520px)',
              overflow: 'hidden',
              borderRadius: 16,
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'pan-y',
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            {/* Sliding track */}
            <motion.div
              style={{
                display: 'flex',
                height: '100%',
                gap: GAP,
                // Each slide is (100% - PEEK%) wide so the next peeks by PEEK%
                // We shift left by (slideWidth + gap) * activeImg
              }}
              animate={{
                x: `calc(-${activeImg} * (${100 - PEEK}% + ${GAP}px))`,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: `calc(${100 - PEEK}% - ${GAP * (images.length - 1) / images.length}px)`,
                    height: '100%',
                    borderRadius: 16,
                    background: product.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={img}
                    alt={product.name}
                    draggable={false}
                    style={{
                      maxHeight: '88%',
                      maxWidth: '88%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 20px 60px rgba(255,90,0,.25))',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Available badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
              style={{
                fontFamily: 'var(--font-ui)',
                background: product.av ? 'hsl(var(--primary))' : 'rgba(255,255,255,.12)',
                color: product.av ? '#000' : 'rgba(255,255,255,.45)',
              }}
            >
              {product.av ? 'AVAILABLE' : 'COMING SOON'}
            </div>

            {product.badge && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase z-20"
                style={{ fontFamily: 'var(--font-ui)', background: '#000', color: 'hsl(var(--primary))', border: '1px solid hsl(var(--primary))' }}
              >
                {product.badge}
              </div>
            )}

            {/* Dot indicators */}
            <div style={{
              position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 6, zIndex: 25,
              pointerEvents: 'none',
            }}>
              {images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: activeImg === i ? 22 : 7, height: 7, borderRadius: 4,
                    background: activeImg === i ? 'hsl(var(--primary))' : 'rgba(255,255,255,.4)',
                    transition: 'all .25s',
                  }}
                />
              ))}
            </div>
          </div>
          {/* ── End swipeable strip ── */}

          {/* Ingredient Images */}
          {product.ingredientImages && product.ingredientImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6"
            >
              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 3,
                color: 'hsl(var(--primary))',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: 12,
              }}>
                KEY INGREDIENTS
              </div>
              <div
                className="ingredient-scroll-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(product.ingredientImages.length, 4)}, 1fr)`,
                  gap: 8,
                }}
              >
                {product.ingredientImages.map((ing, i) => (
                  <motion.div
                    key={ing.name}
                    className="cursor-pointer group"
                    onClick={() => setLightboxIndex(i)}
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,.08)',
                      background: '#0d0d0d',
                      transition: 'border-color .3s',
                    }}
                    whileHover={{ scale: 1.03, borderColor: 'rgba(255,90,0,.4)' }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  >
                    <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                      <img
                        src={ing.image}
                        alt={ing.name}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform .4s',
                        }}
                        className="group-hover:scale-105"
                      />
                    </div>
                    <div style={{
                      padding: '8px 6px',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      color: 'hsl(var(--primary))',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}>
                      {ing.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right - Info */}
        <div className="lg:sticky lg:top-[100px]">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 8 }}
          >
            {product.category.toUpperCase()}
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(48px,6vw,80px)',
            lineHeight: '.88',
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
            marginBottom: 12,
          }}>
            {product.name.toUpperCase()}
          </motion.h1>

          {/* Stars */}
          <motion.button
            type="button"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            onClick={() => {
              const el = document.getElementById('product-reviews');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="flex items-center gap-2 mb-4 cursor-pointer bg-transparent border-0 p-0"
            aria-label={`Jump to ${productReviews.length} reviews`}
          >
            <span style={{ color: 'hsl(var(--primary))', fontSize: 14, letterSpacing: 2 }}>★★★★★</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(255,255,255,.45)', letterSpacing: 1, textDecoration: 'underline' }}>
              ({productReviews.length} REVIEWS)
            </span>
          </motion.button>

          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.75, marginBottom: 24, maxWidth: 420 }}
          >
            {product.description}
          </motion.p>

          {/* Key Benefits */}
          <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,.35)', marginBottom: 10, textTransform: 'uppercase' }}>
              Key Benefits
            </div>
            <div className="grid grid-cols-2 gap-2">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,.5)' }}>
                  <span style={{ color: 'hsl(var(--primary))', fontWeight: 800 }}>✓</span>
                  {b}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="stat-row mb-6" style={{ maxWidth: 400 }}>
            {product.stats.map(s => (
              <div className="st" key={s.label}><div className="st-n">{s.value}</div><div className="st-l">{s.label}</div></div>
            ))}
          </motion.div>

          {/* Pack selector */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,.45)', marginBottom: 14, textTransform: 'uppercase' }}>
              Select Size · 📦 Free Shipping On All Orders
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              {packs.map(p => {
                const isSelected = currentPack.label === p.label;
                const isBest = p.label === '3-Pack';
                return (
                  <button
                    key={p.label}
                    onClick={() => setSelectedPack(p)}
                    style={{
                      position: 'relative', padding: '20px 8px 14px', borderRadius: 14, cursor: 'pointer',
                      background: isSelected ? 'rgba(255,90,0,.08)' : 'rgba(255,255,255,.03)',
                      border: isSelected
                        ? '2px solid hsl(var(--primary))'
                        : isBest ? '2px solid rgba(255,90,0,.35)' : '1.5px solid rgba(255,255,255,.08)',
                      transition: 'all .2s', textAlign: 'center',
                    }}
                  >
                    {p.tag && (
                      <div style={{
                        position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                        background: 'hsl(var(--primary))', color: '#000',
                        fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 900, letterSpacing: 1.5,
                        padding: '3px 8px', borderRadius: 100, whiteSpace: 'nowrap', textTransform: 'uppercase',
                      }}>{p.tag}</div>
                    )}
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, letterSpacing: 2, color: 'hsl(var(--pl-white))' }}>
                      {p.label.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'hsl(var(--primary))', marginTop: 4 }}>
                      ${p.price.toFixed(2)}
                    </div>
                    {p.original > p.price && (
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>
                        <span style={{ textDecoration: 'line-through' }}>${p.original.toFixed(2)}</span>
                        <span style={{ color: 'hsl(var(--primary))', marginLeft: 5, fontWeight: 700 }}>
                          Save ${(p.original - p.price).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Purchase type toggle */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
            <div
              className="flex items-center gap-3 p-4 rounded-xl mb-2 cursor-pointer transition-all"
              onClick={() => setSubscribe(true)}
              style={{
                background: subscribe ? 'rgba(255,90,0,.08)' : 'rgba(255,255,255,.03)',
                border: subscribe ? '1.5px solid rgba(255,90,0,.3)' : '1.5px solid rgba(255,255,255,.08)',
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: subscribe ? 'hsl(var(--primary))' : 'transparent',
                  border: subscribe ? 'none' : '2px solid rgba(255,255,255,.2)',
                }}
              >
                {subscribe && <span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>✓</span>}
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'hsl(var(--pl-white))' }}>
                  SUBSCRIBE & SAVE UP TO 15%
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>
                  Auto-ships on your schedule. Cancel anytime.
                </div>
              </div>
              {subscribe && (
                <span style={{
                  fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 800, letterSpacing: 2,
                  background: 'hsl(var(--primary))', color: '#000', padding: '3px 8px', borderRadius: 100,
                }}>BEST VALUE</span>
              )}
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-3 cursor-pointer transition-all"
              onClick={() => setSubscribe(false)}
              style={{
                background: !subscribe ? 'rgba(255,255,255,.05)' : 'transparent',
                border: !subscribe ? '1.5px solid rgba(255,255,255,.15)' : '1.5px solid rgba(255,255,255,.05)',
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: !subscribe ? 'hsl(var(--pl-white))' : 'transparent',
                  border: !subscribe ? 'none' : '2px solid rgba(255,255,255,.15)',
                }}
              >
                {!subscribe && <span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>✓</span>}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 1, color: 'rgba(255,255,255,.5)' }}>
                ONE-TIME PURCHASE
              </div>
            </div>

            {subscribe && (
              <motion.div
                className="flex gap-2 mb-4 flex-wrap"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {SUBSCRIPTION_INTERVALS.map(interval => (
                  <button
                    key={interval.value}
                    onClick={() => setSubInterval(interval)}
                    className="transition-all"
                    style={{
                      padding: '8px 16px',
                      borderRadius: 100,
                      fontFamily: 'var(--font-ui)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1,
                      cursor: 'pointer',
                      background: subInterval.value === interval.value ? 'hsl(var(--primary))' : 'transparent',
                      color: subInterval.value === interval.value ? '#000' : 'rgba(255,255,255,.4)',
                      border: subInterval.value === interval.value ? '1.5px solid hsl(var(--primary))' : '1.5px solid rgba(255,255,255,.12)',
                    }}
                  >
                    EVERY {interval.label.toUpperCase()} · -{Math.round(interval.discount * 100)}%
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Price */}
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible" className="flex items-baseline gap-3 mb-4">
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 50, letterSpacing: 1, color: 'hsl(var(--pl-white))' }}>
              ${finalPrice.toFixed(2)}
            </span>
            {subscribe && (
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, color: 'rgba(255,255,255,.25)', textDecoration: 'line-through' }}>
                ${currentPack.price.toFixed(2)}
              </span>
            )}
          </motion.div>

          {/* Qty + ATC */}
          <motion.div custom={8} variants={fadeUp} initial="hidden" animate="visible">
            <div className="qty-row">
              <div className="qty-ctrl">
                <button className="qb" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <div className="qn">{qty}</div>
                <button className="qb" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <span className="hot-tag">Selling Fast</span>
            </div>
            <motion.button
              className="atc"
              onClick={handleAdd}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              ADD TO CART — ${(finalPrice * qty).toFixed(2)}
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center justify-center gap-5 mt-4 flex-wrap">
            {['🔒 Secure Checkout', '🚚 Fast Shipping', '🔬 Lab Tested', '📦 Free Shipping'].map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', fontWeight: 700 }}>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <ProductBenefits benefits={product.benefits} productName={product.name} benefitsTitle={product.benefitsTitle} />

      {/* Reviews */}
      <ProductReviews reviews={productReviews} productName={product.name} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'hsl(var(--pl-dark))',
            borderTop: '1px solid rgba(255,255,255,.04)',
            padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 16 }}>
              More Products
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              textAlign: 'center',
              marginBottom: 32,
            }}>
              YOU MAY ALSO <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>LIKE</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProducts.map(f => (
                <Link
                  to={`/products/${f.slug}`}
                  key={f.slug}
                  className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:border-orange-500/40"
                  style={{ background: '#0d0d0d', borderColor: 'rgba(255,255,255,.07)' }}
                >
                  <div className="h-56 flex items-center justify-center relative overflow-hidden" style={{ background: f.bg }}>
                    <img src={f.img} alt={f.name} className="h-[65%] object-contain relative z-10 transition-transform duration-400 group-hover:scale-110" style={{ filter: 'drop-shadow(0 10px 30px rgba(255,90,0,.2))' }} />
                  </div>
                  <div className="p-5">
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, letterSpacing: 1, color: 'hsl(var(--pl-white))' }}>{f.name}</div>
                    <div className="flex items-center justify-between mt-4">
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'hsl(var(--primary))' }}>${f.price.toFixed(2)}</span>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'hsl(var(--primary))', letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase' }}>Shop Now →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Lightbox Slider */}
      {lightboxIndex !== null && product.ingredientImages && product.ingredientImages[lightboxIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: 24,
          }}
        >
          <motion.div
            key={lightboxIndex}
            initial={{ scale: 0.92, opacity: 0, x: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 14, maxWidth: '90vw', cursor: 'default',
            }}
          >
            <img
              src={product.ingredientImages[lightboxIndex].image}
              alt={product.ingredientImages[lightboxIndex].name}
              style={{ maxWidth: '90vw', maxHeight: '70vh', objectFit: 'contain', borderRadius: 12 }}
            />
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 800,
              letterSpacing: 3, color: 'hsl(var(--primary))', textTransform: 'uppercase',
            }}>
              {product.ingredientImages[lightboxIndex].name}
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.4)' }}>
              {lightboxIndex + 1} / {product.ingredientImages.length}
            </div>
          </motion.div>

          {product.ingredientImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + product.ingredientImages!.length) % product.ingredientImages!.length);
              }}
              aria-label="Previous ingredient"
              style={{
                position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)',
                color: '#fff', fontSize: 22, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,90,0,.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; }}
            >←</button>
          )}

          {product.ingredientImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % product.ingredientImages!.length);
              }}
              aria-label="Next ingredient"
              style={{
                position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)',
                color: '#fff', fontSize: 22, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,90,0,.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; }}
            >→</button>
          )}

          {product.ingredientImages.length > 1 && (
            <div style={{
              position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 8,
            }}>
              {product.ingredientImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  aria-label={`Go to ingredient ${i + 1}`}
                  style={{
                    width: lightboxIndex === i ? 28 : 8, height: 8, borderRadius: 4,
                    background: lightboxIndex === i ? 'hsl(var(--primary))' : 'rgba(255,255,255,.3)',
                    border: 'none', cursor: 'pointer', transition: 'all .25s',
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: 24, right: 24,
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,.1)', border: 'none',
              color: '#fff', fontSize: 20, cursor: 'pointer',
            }}
          >✕</button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductDetail;