import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="ft-top">
        {/* Brand block */}
        <div>
          <div className="ft-logo">PURE<em>LOAD</em></div>
          <div className="ft-tag">Fuel the Beast Within.</div>
          <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'IG', href: 'https://instagram.com/pureloadsupps' },
              { label: 'TT', href: 'https://tiktok.com/@pureload' },
              { label: 'YT', href: 'https://youtube.com/@pureload' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: 'rgba(255,255,255,.25)',
                  textTransform: 'uppercase',
                  transition: 'color .2s',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="ft-cols">

          {/* Column 1 — Products */}
          <div className="ft-col">
            <h4>Products</h4>
            <Link to="/collections">All Products</Link>
            <Link to="/best-sellers">Best Sellers</Link>
            <Link to="/bundles">Bundles</Link>
            <Link to="/products/super-creatine-gummies">Super Creatine Gummies</Link>
            <Link to="/products/pureload-womens-hormonal-support-gummies">Women's Hormone Support</Link>
          </div>

          {/* Column 2 — Company */}
          <div className="ft-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Science</a>
            <a href="mailto:support@pureload.com">Contact</a>
          </div>

          {/* Column 3 — Support */}
          <div className="ft-col">
            <h4>Support</h4>
            <a href="mailto:support@pureload.com">support@pureload.com</a>
            <a href="tel:8887923408">(888) 792-3408</a>
            <a href="#">Shipping &amp; Returns</a>
            <a href="#">FAQ</a>
          </div>

          {/* Column 4 — Join Pureload */}
          <div className="ft-col" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h4>Join Pureload</h4>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              color: 'rgba(255,255,255,0.55)',
              margin: '0 0 12px',
              lineHeight: 1.5,
            }}>
              Get 10% off your first order
            </p>
            {subscribed ? (
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
              }}>
                You're in! Check your inbox. ✓
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    color: '#fff',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.45)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    borderRadius: 4,
                    fontFamily: 'var(--font-ui)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bot">
        <div className="ft-disc">
          *These statements have not been evaluated by the Food and Drug Administration.
          This product is not intended to diagnose, treat, cure, or prevent any disease.
          Distributed by PURELOAD · 12955 Biscayne Blvd Ste 200, PMB 457, Miami, FL 33181
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 10,
        }}>
          <div className="ft-copy">© {new Date().getFullYear()} PURELOAD. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service'].map(label => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  letterSpacing: 0.5,
                  transition: 'color .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;