import { motion } from 'framer-motion';

const MissionSection = () => {
  return (
    <section style={{
      background: 'hsl(var(--pl-dark))',
      borderTop: '1px solid rgba(255,255,255,.04)',
      borderBottom: '1px solid rgba(255,255,255,.04)',
      padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 20 }}>
            Our Mission
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: '.9',
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
            textAlign: 'center',
            marginBottom: 28,
          }}>
            FUEL THE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>BEAST</em> WITHIN
          </h2>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,.45)',
            lineHeight: 1.85,
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto 40px',
          }}>
            PURELOAD was born from a simple idea: supplementation shouldn't feel like a chore.
            We believe in making science-backed performance accessible, enjoyable, and effortless.
            Our mission is to empower every athlete, gym-goer, and health-conscious
            individual to reach their full potential without compromise.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,.04)',
          borderRadius: 12,
          overflow: 'hidden',
          marginTop: 20,
        }}>
          {[
            { 
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              title: 'SCIENCE-BACKED', 
              desc: 'Clinically studied ingredients in every product — from creatine monohydrate to Tongkat Ali.' 
            },
            { 
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
              title: 'REAL RESULTS', 
              desc: 'Premium formulas designed for measurable improvement in strength, energy, and wellness.' 
            },
            { 
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
              title: 'CLEAN FORMULA', 
              desc: 'Lab tested, GMP certified, FDA registered facility. No artificial junk — just pure performance.' 
            },
            { 
              icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(24,100%,50%)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
              title: 'MADE IN USA', 
              desc: 'Proudly manufactured in the United States. Distributed by Arcdatum, Miami FL.' 
            },
          ].map(b => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: '#0b0b0b',
                padding: '36px 28px',
                textAlign: 'center',
              }}
            >
              <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 22,
                letterSpacing: 1,
                color: 'hsl(var(--pl-white))',
                marginBottom: 8,
              }}>
                {b.title}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', lineHeight: 1.7 }}>
                {b.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
