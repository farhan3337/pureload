import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    console.log('[CTA Email]', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div id="ch-cta" className="ch-cta-wrap">
      <section id="s-cta">
        <div className="cta-glow" />
        <div className="cta-inner" id="ctaInner">
          <h2 className="cta-h">READY TO<br />GO <em>BEAST</em><br />MODE?</h2>
          <p className="cta-sub">
            {submitted
              ? <span style={{ color: 'hsl(var(--primary))' }}>You're in! Check your email for code <strong>BEAST20</strong></span>
              : <>🔥 Limited Stock — Save 10% Today with code <strong>BEAST10</strong></>
            }
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 18 }}>
            <button className="btn-p" onClick={() => navigate('/collections')}>Shop Best Sellers</button>
            <button className="btn-o" onClick={() => navigate('/bundles')}>Shop Bundles</button>
          </div>

          <div style={{
            marginTop: 14, fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, letterSpacing: 2,
            color: 'hsl(var(--primary))', textTransform: 'uppercase',
          }}>
            📦 FREE SHIPPING ON ALL ORDERS
          </div>

          <div className="email-row" style={{ marginTop: 22 }}>
            <input
              className="em-in"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <button className="em-sub" onClick={handleSubmit}>Claim Discount →</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
