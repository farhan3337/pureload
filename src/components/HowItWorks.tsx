import howBg from "../assets/how-it-works.jpeg";

const HowItWorks = () => {
  return (
    <div id="ch-how" className="ch-how-wrap">
      <style>{`
        #s-how {
          min-height: 100vh;
          padding-top: clamp(100px, 18vw, 180px);
          padding-bottom: clamp(60px, 10vw, 120px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .how-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 48px;
        }

        @media (max-width: 900px) {
          .how-cards {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .hc {
            background: rgba(10, 10, 10, 0.80) !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
          }
        }
      `}</style>

      <section
        id="s-how"
        style={{
          backgroundImage: `url(${howBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        {/* Dark gradient overlay — lighter on mobile so image shows */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.68) 0%,
                rgba(0,0,0,0.40) 35%,
                rgba(0,0,0,0.40) 65%,
                rgba(0,0,0,0.85) 100%
              )
            `,
            zIndex: 0,
          }}
        />

        {/* Subtle orange vignette */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(255,90,0,0.10) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />

        <div className="how-noise" style={{ zIndex: 1 }} />

        <div
          style={{
            width: '100%',
            maxWidth: 1160,
            padding: '0 clamp(20px, 5vw, 80px)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* ── Header ── */}
          <div className="how-top">
            <div
              className="sec-ey"
              id="howEy"
              style={{ opacity: 0, transform: 'translateY(24px)' }}
            >
              — How It Works —
            </div>
            <h2 className="sec-h how-heading" id="howH">
              <span className="how-word how-word-l" id="howW1">SIMPLE.</span>
              <span className="how-word how-word-r how-word-em" id="howW2">POWERFUL.</span>
              <span className="how-word how-word-l" id="howW3">EFFECTIVE.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: 'rgba(255,255,255,.45)',
                maxWidth: 540,
                margin: '24px auto 0',
                textAlign: 'center',
                lineHeight: 1.7,
                letterSpacing: 0.3,
              }}
            >
              Three steps to unlock the version of yourself you've been working for.
            </p>
          </div>

          {/* ── Steps grid ── */}
          <div className="how-cards">

            {/* Step 01 — Choose */}
            <div className="hc" id="hc1">
              <div className="hc-n">01</div>

              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(255,90,0,0.08)',
                  border: '1px solid rgba(255,90,0,0.22)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(var(--primary))',
                  marginBottom: 22,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="6" y="10" width="20" height="16" rx="2" />
                  <path d="M9 10 V8 a3 3 0 0 1 3 -3 h8 a3 3 0 0 1 3 3 v2" />
                  <path d="M11 16 h10" />
                  <path d="M11 20 h6" />
                </svg>
              </div>

              <div className="hc-t">Choose</div>
              <div className="hc-d">
                Browse our lineup of premium supplements. From creatine gummies to hormonal support — find
                your perfect fit.
              </div>

              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 18,
                  right: 18,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'rgba(255,90,0,0.55)',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                NEXT
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 4 H9 M6 1 L9 4 L6 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Step 02 — Take Daily */}
            <div className="hc" id="hc2">
              <div className="hc-n">02</div>

              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(255,90,0,0.08)',
                  border: '1px solid rgba(255,90,0,0.22)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(var(--primary))',
                  marginBottom: 22,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4 h8 v3 h-8 z" />
                  <path d="M11 7 h10 v18 a3 3 0 0 1 -3 3 h-4 a3 3 0 0 1 -3 -3 z" />
                  <path d="M14 14 h4 M16 12 v4" />
                </svg>
              </div>

              <div className="hc-t">Take Daily</div>
              <div className="hc-d">
                Follow the recommended dosage daily. Consistency is key to unlocking real, measurable results.
              </div>

              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 18,
                  right: 18,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'rgba(255,90,0,0.55)',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                NEXT
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 4 H9 M6 1 L9 4 L6 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Step 03 — Transform */}
            <div className="hc" id="hc3">
              <div className="hc-n">03</div>

              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(255,90,0,0.08)',
                  border: '1px solid rgba(255,90,0,0.22)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'hsl(var(--primary))',
                  marginBottom: 22,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 26 V21 M12 26 V16 M19 26 V11 M26 26 V6" />
                  <path d="M3 28 H29" />
                  <path d="M21 8 L26 6 L25 11" />
                </svg>
              </div>

              <div className="hc-t">Transform</div>
              <div className="hc-d">
                Watch your performance, energy, and overall wellbeing transform. Real ingredients, real
                results.
              </div>

              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 18,
                  right: 18,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'hsl(var(--primary))',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: 100,
                  background: 'rgba(255,90,0,0.1)',
                  border: '1px solid rgba(255,90,0,0.3)',
                }}
              >
                YOUR GOAL
              </div>
            </div>
          </div>

          {/* ── Bottom CTA hint ── */}
          <div
            style={{
              marginTop: 50,
              textAlign: 'center',
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              letterSpacing: 4,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            <span style={{ color: 'hsl(var(--primary))' }}>·</span> NO COMPLEXITY. NO GUESSWORK. <span style={{ color: 'hsl(var(--primary))' }}>·</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;