const HowItWorks = () => {
  return (
    <div id="ch-how" className="ch-how-wrap">
      <section id="s-how">
        <div className="how-noise" />
        <div style={{ width: '100%', maxWidth: 1160, padding: '0 clamp(20px, 5vw, 80px)' }}>
          <div className="how-top">
            <div className="sec-ey" id="howEy" style={{ opacity: 0, transform: 'translateY(24px)' }}>How It Works</div>
            <h2 className="sec-h how-heading" id="howH">
              <span className="how-word how-word-l" id="howW1">SIMPLE.</span>
              <span className="how-word how-word-r how-word-em" id="howW2">POWERFUL.</span>
              <span className="how-word how-word-l" id="howW3">EFFECTIVE.</span>
            </h2>
          </div>
          <div className="how-cards">
            <div className="hc" id="hc1">
              <div className="hc-n">01</div>
              <div className="hc-ico">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <div className="hc-t">Choose</div>
              <div className="hc-d">Browse our lineup of premium supplements. From creatine gummies to hormonal support — find your perfect fit.</div>
            </div>
            <div className="hc" id="hc2">
              <div className="hc-n">02</div>
              <div className="hc-ico">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <div className="hc-t">Take Daily</div>
              <div className="hc-d">Follow the recommended dosage daily. Consistency is key to unlocking real, measurable results.</div>
            </div>
            <div className="hc" id="hc3">
              <div className="hc-n">03</div>
              <div className="hc-ico">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <div className="hc-t">Transform</div>
              <div className="hc-d">Watch your performance, energy, and overall wellbeing transform. Real ingredients, real results.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
