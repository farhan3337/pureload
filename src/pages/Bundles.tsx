import { useState } from 'react';
import { PRODUCTS } from '@/data/pureload';

interface BundlesProps {
  onAddCart: (qty: number, price: number, label: string, variantId?: string) => void;
}

const PACK_OPTIONS = [
  { key: 'single', label: '1 BOTTLE', qty: 1, tag: '', savePct: 0 },
  { key: 'twoPack', label: '2 PACK', qty: 2, tag: 'SAVE MORE', savePct: 13 },
  { key: 'threePack', label: '3 PACK', qty: 3, tag: 'BEST VALUE', savePct: 22 },
];

const Bundles = ({ onAddCart }: BundlesProps) => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedPack, setSelectedPack] = useState(PACK_OPTIONS[2]);

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

  const currentPrice = priceMap[selectedPack.key];
  const originalPrice = originalMap[selectedPack.key];

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>
      {/* Header */}
      <div className="pt-[100px] pb-8 px-6 md:px-20 text-center">
        <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 14 }}>
          Save More, Lift More
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(52px,8vw,100px)',
            lineHeight: '.88',
            letterSpacing: '2px',
            color: 'hsl(var(--pl-white))',
          }}
        >
          BUILD YOUR{' '}
          <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>BUNDLE</em>
        </h1>
      </div>

      {/* Product Selector */}
      <div className="px-6 md:px-20 max-w-[1360px] mx-auto pb-6">
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,.35)',
            marginBottom: 12,
          }}
        >
          Step 1 — Choose Your Product
        </p>
        <div className="flex flex-wrap gap-3">
          {PRODUCTS.filter(p => p.bundlePricing).map(p => (
            <button
              key={p.slug}
              onClick={() => setSelectedProduct(p)}
              className="flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200"
              style={{
                background: selectedProduct.slug === p.slug ? 'rgba(255,90,0,.1)' : '#0d0d0d',
                border:
                  selectedProduct.slug === p.slug
                    ? '1.5px solid hsl(var(--primary))'
                    : '1px solid rgba(255,255,255,.08)',
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-8 w-8 object-contain"
                style={{ filter: 'drop-shadow(0 2px 6px rgba(255,90,0,.2))' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  fontWeight: 700,
                  color:
                    selectedProduct.slug === p.slug
                      ? 'hsl(var(--primary))'
                      : 'rgba(255,255,255,.6)',
                  letterSpacing: 0.5,
                }}
              >
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pack Selector */}
      <div className="px-6 md:px-20 max-w-[1360px] mx-auto pb-10">
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,.35)',
            marginBottom: 12,
          }}
        >
          Step 2 — Choose Your Pack
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PACK_OPTIONS.map(pack => {
            const price = priceMap[pack.key];
            const orig = originalMap[pack.key];
            const isSelected = selectedPack.key === pack.key;

            return (
              <button
                key={pack.key}
                onClick={() => setSelectedPack(pack)}
                className="relative rounded-2xl p-6 text-left transition-all duration-300"
                style={{
                  background: isSelected ? 'rgba(255,90,0,.06)' : '#0d0d0d',
                  border: isSelected
                    ? '2px solid hsl(var(--primary))'
                    : '1px solid rgba(255,255,255,.07)',
                }}
              >
                {pack.tag && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      background: 'hsl(var(--primary))',
                      color: '#000',
                    }}
                  >
                    {pack.tag}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 28,
                    letterSpacing: 1,
                    color: 'hsl(var(--pl-white))',
                    marginBottom: 4,
                  }}
                >
                  {pack.label}
                </div>

                {/* Product images */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: pack.qty }).map((_, i) => (
                    <img
                      key={i}
                      src={selectedProduct.img}
                      alt=""
                      className="h-14 object-contain"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(255,90,0,.15))' }}
                    />
                  ))}
                </div>

                <div className="flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 40,
                      color: 'hsl(var(--primary))',
                    }}
                  >
                    ${price.toFixed(2)}
                  </span>
                  {pack.savePct > 0 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 14,
                        color: 'rgba(255,255,255,.2)',
                        textDecoration: 'line-through',
                      }}
                    >
                      ${orig.toFixed(2)}
                    </span>
                  )}
                </div>

                {pack.savePct > 0 && (
                  <div
                    className="mt-2 inline-block px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,90,0,.12)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 2,
                      color: 'hsl(var(--primary))',
                    }}
                  >
                    SAVE {pack.savePct}%
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-12 px-6">
        <button
          className="atc"
          style={{ maxWidth: 420, margin: '0 auto', display: 'block' }}
          onClick={() =>
            onAddCart(
              selectedPack.qty,
              currentPrice,
              `${selectedProduct.name} — ${selectedPack.label}`,
              selectedProduct.shopifyVariantId,
            )
          }
        >
          ADD {selectedPack.label} TO CART — ${currentPrice.toFixed(2)}
        </button>
        {selectedPack.savePct > 0 && (
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: 'rgba(255,255,255,.3)',
              marginTop: 12,
              letterSpacing: 1,
            }}
          >
            YOU SAVE ${(originalPrice - currentPrice).toFixed(2)} VS BUYING SEPARATELY
          </p>
        )}
      </div>
    </div>
  );
};

export default Bundles;