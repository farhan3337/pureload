import { useState, useEffect } from 'react';

const DiscountPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('pl-popup-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (!email.trim()) return;
    console.log('[Email Signup] Subscribe:', email);
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      sessionStorage.setItem('pl-popup-dismissed', '1');
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('pl-popup-dismissed', '1');
  };

  return (
    <div className={`modal ${open ? 'on' : ''}`} onClick={handleClose}>
      <div className="mb" onClick={e => e.stopPropagation()} style={{ maxWidth: 420, padding: '48px 36px' }}>
        {!submitted ? (
          <>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(42px, 6vw, 56px)',
              lineHeight: '.9',
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              marginBottom: 8,
            }}>
              GET <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>20% OFF</em>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, marginBottom: 24 }}>
              Join the PURELOAD squad and get 20% off your first order. No spam — just gains.
            </p>
            <input
              className="mb-in"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <button className="mb-btn" onClick={handleSubmit}>CLAIM MY 20% OFF →</button>
            <button className="mb-no" onClick={handleClose}>No thanks, I'll pay full price</button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: 'hsl(var(--pl-white))', marginBottom: 8 }}>
              YOU'RE IN!
            </div>
            <p style={{ fontSize: 14, color: 'hsl(var(--primary))' }}>
              Use code <strong>BEAST20</strong> at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DiscountPopup;
