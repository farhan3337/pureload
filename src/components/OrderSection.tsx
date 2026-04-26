import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '@/data/pureload';

interface OrderSectionProps {
  onAddCart: (qty: number, price: number, label: string, variantId?: string) => void;
}

const OrderSection = ({ onAddCart }: OrderSectionProps) => {
  const navigate = useNavigate();
  const mainProduct = PRODUCTS[0];
  const bp = mainProduct.bundlePricing!;

  const packs = [
    { qty: 1, price: bp.single, original: bp.single, label: '1-Bottle', tag: '' },
    { qty: 2, price: bp.twoPack, original: bp.twoPackOriginal, label: '2-Pack', tag: 'MOST POPULAR' },
    { qty: 3, price: bp.threePack, original: bp.threePackOriginal, label: '3-Pack', tag: 'BEST VALUE' },
  ];

  // Default to 3-Pack
  const [pack, setPack] = useState(packs[2]);
  const [oQty, setOQty] = useState(1);

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
                {/* <div className="ord-lbl">PURELOAD <em>SUPPLEMENTS</em></div> */}
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
