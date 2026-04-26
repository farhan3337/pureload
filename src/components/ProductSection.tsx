import { PRODUCTS } from '@/data/pureload';

interface ProductSectionProps {
  onGotoSection: (id: string) => void;
}

const ProductSection = ({ onGotoSection }: ProductSectionProps) => {
  const mainProduct = PRODUCTS[0];
  return (
    <div id="ch-prod" style={{ height: '160vh' }}>
      <section id="s-prod">
        <div className="prd-grid">
          <div className="prd-vis">
            <div className="prd-halo" />
            <div className="bottle">
              <img
                src={mainProduct.img}
                alt={mainProduct.name}
                className="bottle-img"
              />
            </div>
          </div>
          <div className="prd-info" id="prdInfo">
            <div className="sec-ey">The Product</div>
            <h2 className="sec-h" id="prdH">
              SUPPLEMENTS<br /><em>REIMAGINED.</em>
            </h2>
            <p className="prd-desc">
              Premium, lab-tested supplements engineered for peak performance.
              From creatine gummies to hormonal support — PURELOAD delivers
              science-backed results in forms you'll actually enjoy taking.
            </p>
            <div className="stat-row">
              {mainProduct.stats.map(s => (
                <div className="st" key={s.label}>
                  <div className="st-n">{s.value}</div>
                  <div className="st-l">{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn-p" onClick={() => onGotoSection('ch-ord')}>Shop Best Sellers</button>
              <button className="btn-o" onClick={() => onGotoSection('ch-ord')}>Shop Bundles — Save up to 22%</button>
            </div>
            <div style={{
              marginTop: 14, fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 2,
              color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
            }}>
              📦 FREE SHIPPING ON ALL ORDERS · Limited Stock
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSection;
