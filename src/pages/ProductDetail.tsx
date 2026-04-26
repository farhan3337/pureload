import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

// ── SVG icon components ──
const CheckIcon = ({ size = 12, color = '#000' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8 L7 12 L13 5" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4 L6 8 L10 12" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4 L10 8 L6 12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 3 L13 13 M13 3 L3 13" />
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill={filled ? 'hsl(var(--primary))' : 'rgba(255,90,0,0.25)'}>
    <path d="M8 1l1.8 3.6L14 5.2l-3 2.9.7 4.1L8 10.4l-3.7 1.8.7-4.1-3-2.9 4.2-.6z" />
  </svg>
);

const Stars = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= count} />)}
  </div>
);

const TrustBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 7,
    fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 1.5,
    color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', fontWeight: 700,
  }}>
    <div style={{ color: 'hsl(var(--primary))', flexShrink: 0 }}>{icon}</div>
    {label}
  </div>
);

const ProductDetail = ({ onAddCart }: ProductDetailProps) => {
  const { slug } = useParams();
  const product = PRODUCTS.find(f => f.slug === slug);
  const [qty, setQty] = useState(1);
  const [selectedPack, setSelectedPack] = useState({ items: 3, price: 0, label: '3-Pack' });
  const [subscribe, setSubscribe] = useState(true);
  const [subInterval, setSubInterval] = useState(SUBSCRIPTION_INTERVALS[0]);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  // Image column parallax
  const imgY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  // Info column drifts at different rate
  const infoY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

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
    { items: 2, price: bp.twoPack, original: bp.twoPackOriginal, label: '2-Pack', tag: 'Popular' },
    { items: 3, price: bp.threePack, original: bp.threePackOriginal, label: '3-Pack', tag: 'Best Value' },
  ] : [
    { items: 1, price: product.price, original: product.price, label: '1-Bottle', tag: '' },
    { items: 2, price: Math.round(product.price * 1.75 * 100) / 100, original: Math.round(product.price * 2 * 100) / 100, label: '2-Pack', tag: 'Popular' },
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

  const SWIPE_THRESHOLD = 40;
  const VERTICAL_LOCK = 10;

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
    if (Math.abs(dy) > Math.abs(dx) + VERTICAL_LOCK) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) setActiveImg(prev => Math.min(prev + 1, images.length - 1));
    else setActiveImg(prev => Math.max(prev - 1, 0));
  }, [images.length]);

  const mouseStartX = useRef<number | null>(null);
  const onMouseDown = useCallback((e: React.MouseEvent) => { mouseStartX.current = e.clientX; }, []);
  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    const dx = e.clientX - mouseStartX.current;
    mouseStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) setActiveImg(prev => Math.min(prev + 1, images.length - 1));
    else setActiveImg(prev => Math.max(prev - 1, 0));
  }, [images.length]);
  const onMouseLeave = useCallback(() => { mouseStartX.current = null; }, []);

  const PEEK = 12;
  const GAP = 12;

  return (
    <motion.div
      ref={pageRef}
      key={slug}
      className="min-h-screen"
      style={{ background: 'hsl(var(--pl-black))', position: 'relative', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background grid texture */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: '25%',
          left: '40%',
          width: '50vw',
          height: '50vw',
          maxWidth: 700,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pt-[100px] px-6 md:px-20"
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 3,
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <Link to="/" style={{ color: 'rgba(255,255,255,.3)', transition: 'color 0.2s' }}>Home</Link>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
            <path d="M2 1 L6 4 L2 7" />
          </svg>
          <Link to="/collections" style={{ color: 'rgba(255,255,255,.3)' }}>Collection</Link>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
            <path d="M2 1 L6 4 L2 7" />
          </svg>
          <span style={{ color: 'hsl(var(--primary))' }}>{product.name}</span>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 px-6 md:px-20 py-10 max-w-[1360px] mx-auto items-start">

          {/* ── Left: Images ── */}
          <motion.div variants={scaleIn} initial="hidden" animate="visible" style={{ y: imgY }}>
            <div
              ref={containerRef}
              className="relative mb-4"
              style={{
                height: 'clamp(320px, 50vw, 520px)',
                overflow: 'hidden',
                borderRadius: 20,
                cursor: 'grab',
                userSelect: 'none',
                touchAction: 'pan-y',
                border: '1px solid rgba(255,255,255,.06)',
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              <motion.div
                style={{ display: 'flex', height: '100%', gap: GAP }}
                animate={{ x: `calc(-${activeImg} * (${100 - PEEK}% + ${GAP}px))` }}
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
                    {/* Subtle gradient overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)',
                      pointerEvents: 'none',
                    }} />
                    <img
                      src={img}
                      alt={product.name}
                      draggable={false}
                      style={{
                        maxHeight: '88%', maxWidth: '88%',
                        width: 'auto', height: 'auto', objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 60px rgba(255,90,0,.25))',
                        pointerEvents: 'none', position: 'relative', zIndex: 1,
                      }}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Availability badge */}
              <div style={{
                position: 'absolute', top: 14, right: 14, zIndex: 20,
                fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 900,
                letterSpacing: 2, textTransform: 'uppercase',
                padding: '5px 12px', borderRadius: 100,
                background: product.av ? 'hsl(var(--primary))' : 'rgba(255,255,255,.12)',
                color: product.av ? '#000' : 'rgba(255,255,255,.45)',
              }}>
                {product.av ? 'AVAILABLE' : 'COMING SOON'}
              </div>

              {product.badge && (
                <div style={{
                  position: 'absolute', top: 14, left: 14, zIndex: 20,
                  fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 900,
                  letterSpacing: 2, textTransform: 'uppercase',
                  padding: '5px 12px', borderRadius: 100,
                  background: '#000', color: 'hsl(var(--primary))',
                  border: '1px solid hsl(var(--primary))',
                }}>
                  {product.badge}
                </div>
              )}

              {/* Dot indicators */}
              <div style={{
                position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 6, zIndex: 25, pointerEvents: 'none',
              }}>
                {images.map((_, i) => (
                  <div key={i} style={{
                    width: activeImg === i ? 22 : 7, height: 7, borderRadius: 4,
                    background: activeImg === i ? 'hsl(var(--primary))' : 'rgba(255,255,255,.4)',
                    transition: 'all .25s',
                  }} />
                ))}
              </div>
            </div>

            {/* Ingredient images */}
            {product.ingredientImages && product.ingredientImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6"
              >
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700,
                  letterSpacing: 3, color: 'hsl(var(--primary))',
                  textTransform: 'uppercase', textAlign: 'center', marginBottom: 12,
                }}>
                  — Key Ingredients —
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
                        borderRadius: 12, overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,.08)',
                        background: '#0d0d0d',
                        transition: 'border-color .3s',
                      }}
                      whileHover={{ scale: 1.04, borderColor: 'rgba(255,90,0,.4)' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                    >
                      <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                        <img
                          src={ing.image} alt={ing.name} loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
                          className="group-hover:scale-105"
                        />
                      </div>
                      <div style={{
                        padding: '8px 6px', fontFamily: 'var(--font-ui)', fontSize: 8,
                        fontWeight: 700, letterSpacing: 1.5, color: 'hsl(var(--primary))',
                        textTransform: 'uppercase', textAlign: 'center',
                      }}>
                        {ing.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── Right: Info ── */}
          <motion.div className="lg:sticky lg:top-[100px]" style={{ y: infoY }}>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 8 }}
            >
              {product.category.toUpperCase()}
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(48px,6vw,80px)',
                lineHeight: '.88', letterSpacing: 1,
                color: 'hsl(var(--pl-white))', marginBottom: 12,
              }}
            >
              {product.name.toUpperCase()}
            </motion.h1>

            {/* Stars */}
            <motion.button
              type="button" custom={2} variants={fadeUp} initial="hidden" animate="visible"
              onClick={() => document.getElementById('product-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="flex items-center gap-2 mb-4 cursor-pointer bg-transparent border-0 p-0"
              aria-label={`Jump to ${productReviews.length} reviews`}
            >
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(i => <StarIcon key={i} filled={true} />)}
              </div>
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
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5,
                      background: 'rgba(255,90,0,0.12)',
                      border: '1px solid rgba(255,90,0,0.25)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <CheckIcon size={9} color="hsl(var(--primary))" />
                    </div>
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
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,.45)', marginBottom: 14, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4h14M1 8h14M1 12h7" />
                </svg>
                Select Size · Free Shipping On All Orders
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
                {packs.map(p => {
                  const isSelected = currentPack.label === p.label;
                  const isBest = p.label === '3-Pack';
                  return (
                    <motion.button
                      key={p.label}
                      onClick={() => setSelectedPack(p)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        position: 'relative', padding: '20px 8px 14px', borderRadius: 14, cursor: 'pointer',
                        background: isSelected ? 'rgba(255,90,0,.08)' : 'rgba(255,255,255,.03)',
                        border: isSelected ? '2px solid hsl(var(--primary))' : isBest ? '2px solid rgba(255,90,0,.35)' : '1.5px solid rgba(255,255,255,.08)',
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
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Purchase type toggle */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
              {/* Subscribe */}
              <div
                className="flex items-center gap-3 p-4 rounded-xl mb-2 cursor-pointer transition-all"
                onClick={() => setSubscribe(true)}
                style={{
                  background: subscribe ? 'rgba(255,90,0,.08)' : 'rgba(255,255,255,.03)',
                  border: subscribe ? '1.5px solid rgba(255,90,0,.3)' : '1.5px solid rgba(255,255,255,.08)',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: subscribe ? 'hsl(var(--primary))' : 'transparent',
                  border: subscribe ? 'none' : '2px solid rgba(255,255,255,.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {subscribe && <CheckIcon size={11} color="#000" />}
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

              {/* One-time */}
              <div
                className="flex items-center gap-3 p-3 rounded-xl mb-3 cursor-pointer transition-all"
                onClick={() => setSubscribe(false)}
                style={{
                  background: !subscribe ? 'rgba(255,255,255,.05)' : 'transparent',
                  border: !subscribe ? '1.5px solid rgba(255,255,255,.15)' : '1.5px solid rgba(255,255,255,.05)',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: !subscribe ? 'hsl(var(--pl-white))' : 'transparent',
                  border: !subscribe ? 'none' : '2px solid rgba(255,255,255,.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {!subscribe && <CheckIcon size={11} color="#000" />}
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
                      style={{
                        padding: '8px 16px', borderRadius: 100,
                        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, letterSpacing: 1,
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(var(--primary))', animation: 'pulse 2s infinite' }} />
                  <span className="hot-tag">Selling Fast</span>
                </div>
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

            {/* Trust badges — no emojis */}
            <motion.div
              custom={9} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}
            >
              <TrustBadge label="Secure Checkout" icon={
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2 L13 4 V9 C13 12 10.5 14 8 15 C5.5 14 3 12 3 9 V4 Z" />
                  <path d="M6 8 L7.5 9.5 L10.5 7" />
                </svg>
              } />
              <TrustBadge label="Fast Shipping" icon={
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 2h9v8H1z" /><path d="M10 5h3l2 2v3h-5" />
                  <circle cx="4" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" />
                </svg>
              } />
              <TrustBadge label="Lab Tested" icon={
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 V9 L3 14 H13 L10 9 V2" /><path d="M5 2 H11" /><path d="M5 11 H11" />
                </svg>
              } />
              <TrustBadge label="Free Shipping" icon={
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3 L13 5.5 V10.5 L8 13 L3 10.5 V5.5 Z" />
                  <path d="M8 13 V8 M3 5.5 L8 8 L13 5.5" />
                </svg>
              } />
            </motion.div>
          </motion.div>
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
                — More Products —
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                letterSpacing: 1, color: 'hsl(var(--pl-white))',
                textAlign: 'center', marginBottom: 32,
              }}>
                YOU MAY ALSO <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>LIKE</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedProducts.map((f, i) => (
                  <motion.div
                    key={f.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -6, borderColor: 'rgba(255,90,0,0.35)' }}
                    style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.07)', background: '#0d0d0d', transition: 'border-color 0.3s ease' }}
                  >
                    <Link to={`/products/${f.slug}`} style={{ display: 'block' }}>
                      <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: f.bg }}>
                        <img src={f.img} alt={f.name} style={{ height: '65%', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 10px 30px rgba(255,90,0,.2))', transition: 'transform 0.4s ease' }}
                          className="group-hover:scale-110"
                        />
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, letterSpacing: 1, color: 'hsl(var(--pl-white))' }}>{f.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'hsl(var(--primary))' }}>${f.price.toFixed(2)}</span>
                          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'hsl(var(--primary))', letterSpacing: 1.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                            SHOP NOW
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 6h8M7 3l3 3-3 3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Lightbox */}
        {lightboxIndex !== null && product.ingredientImages && product.ingredientImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,.94)',
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
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, maxWidth: '90vw', cursor: 'default' }}
            >
              <img
                src={product.ingredientImages[lightboxIndex].image}
                alt={product.ingredientImages[lightboxIndex].name}
                style={{ maxWidth: '90vw', maxHeight: '70vh', objectFit: 'contain', borderRadius: 14 }}
              />
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 800, letterSpacing: 3, color: 'hsl(var(--primary))', textTransform: 'uppercase' }}>
                {product.ingredientImages[lightboxIndex].name}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.4)' }}>
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(product.ingredientImages.length).padStart(2, '0')}
              </div>
            </motion.div>

            {product.ingredientImages.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + product.ingredientImages!.length) % product.ingredientImages!.length); }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,90,0,0.25)' }}
                  style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ChevronLeft />
                </motion.button>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % product.ingredientImages!.length); }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,90,0,0.25)' }}
                  style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ChevronRight />
                </motion.button>
              </>
            )}

            {product.ingredientImages.length > 1 && (
              <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
                {product.ingredientImages.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    style={{ width: lightboxIndex === i ? 28 : 8, height: 8, borderRadius: 4, background: lightboxIndex === i ? 'hsl(var(--primary))' : 'rgba(255,255,255,.3)', border: 'none', cursor: 'pointer', transition: 'all .25s' }}
                  />
                ))}
              </div>
            )}

            <motion.button
              onClick={() => setLightboxIndex(null)}
              whileHover={{ scale: 1.1 }}
              style={{ position: 'absolute', top: 24, right: 24, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CloseIcon />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;