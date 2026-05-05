import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="ft-top">
        <div>
          <div className="ft-logo">PURE<em>LOAD</em></div>
          <div className="ft-tag">Fuel the Beast Within.</div>
          <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'IG', href: 'https://instagram.com/pureloadsupps' },
              { label: 'TT', href: 'https://tiktok.com/@pureload' },
              { label: 'YT', href: 'https://youtube.com/@pureload' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,.25)', textTransform: 'uppercase', transition: 'color .2s' }}
              >{s.label}</a>
            ))}
          </div>
        </div>
        <div className="ft-cols">
          <div className="ft-col">
            <h4>Products</h4>
            <Link to="/collections">All Products</Link>
            <Link to="/bundles">Bundles</Link>
            {['pureload', 'pureload-male-enhancement-pills', 'pureload-womens-hormonal-support-gummies'].map(s => (
              <Link key={s} to={`/products/${s}`}>{s.replace(/-/g, ' ').replace('pureload', 'Pureload')}</Link>
            ))}
          </div>
          <div className="ft-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Science</a>
            <a href="mailto:support@pureload.com">Contact</a>
          </div>
          <div className="ft-col">
            <h4>Support</h4>
            <a href="mailto:support@pureload.com">support@pureload.com</a>
            <a href="tel:8887923408">(888) 792-3408</a>
            <a href="#">Shipping & Returns</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
      <div className="ft-bot">
        <div className="ft-disc">
          *These statements have not been evaluated by the Food and Drug Administration. 
          This product is not intended to diagnose, treat, cure, or prevent any disease. 
          Distributed by PURELOAD · 12955 Biscayne Blvd Ste 200, PMB 457, Miami, FL 33181
        </div>
        <div className="ft-copy">© {new Date().getFullYear()} PURELOAD. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
