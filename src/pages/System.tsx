import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }),
};

const STEPS = [
  { n: '01', title: 'Choose Your Goal', desc: 'Energy, recovery, wellness, or performance.' },
  { n: '02', title: 'Build Your Stack', desc: 'Pick the products that match your goals.' },
  { n: '03', title: 'Stay Consistent', desc: 'Daily use + routine = real results.' },
];

const CATEGORIES = [
  { title: 'PERFORMANCE', desc: 'Pre-workout, Creatine', cta: '/collections' },
  { title: 'RECOVERY', desc: 'Sleep, Ashwagandha', cta: '/collections' },
  { title: 'DAILY WELLNESS', desc: 'Multivitamin, Debloat', cta: '/collections' },
  { title: 'SUPPORT', desc: 'Male / Hormone', cta: '/collections' },
];

const ROUTINE = [
  { time: 'MORNING', desc: 'Wellness + Energy' },
  { time: 'PRE-WORKOUT', desc: 'Performance' },
  { time: 'NIGHT', desc: 'Recovery' },
];

const System = () => {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>
      {/* Hero */}
      <section className="pt-[120px] pb-16 px-6 md:px-20 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 14 }}>The System</div>
        </motion.div>
        <motion.h1
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px,8vw,108px)',
            lineHeight: '.9', letterSpacing: 2, color: 'hsl(var(--pl-white))',
          }}
        >
          THE PURELOAD <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>SYSTEM</em>
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" custom={2} variants={fadeUp}
          style={{ maxWidth: 620, margin: '24px auto 0', fontSize: 16, color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}
        >
          More than supplements. A structured approach to performance, recovery, and daily discipline.
        </motion.p>
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} style={{ marginTop: 28 }}>
          <Link to="/collections" className="btn-p">Shop Products</Link>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-20 py-20">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 14 }}>How It Works</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,5vw,64px)',
            color: 'hsl(var(--pl-white))', textAlign: 'center', letterSpacing: 1, marginBottom: 40,
          }}>
            3 STEPS TO <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>RESULTS</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{
                  padding: 28, borderRadius: 14,
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,.06)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 56, color: 'hsl(var(--primary))', lineHeight: 1, letterSpacing: 1 }}>
                  {s.n}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, letterSpacing: 1, color: 'hsl(var(--pl-white))', marginTop: 8 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.7, marginTop: 8 }}>
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 md:px-20 py-20" style={{ borderTop: '1px solid rgba(255,255,255,.05)', background: 'hsl(var(--pl-dark))' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 14 }}>Build Your Stack</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,5vw,64px)',
            color: 'hsl(var(--pl-white))', textAlign: 'center', letterSpacing: 1, marginBottom: 40,
          }}>
            BY <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>CATEGORY</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  padding: 28, borderRadius: 14, background: '#0b0b0b',
                  border: '1px solid rgba(255,255,255,.06)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200,
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, letterSpacing: 2, color: 'hsl(var(--pl-white))' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginTop: 8 }}>{c.desc}</div>
                </div>
                <Link
                  to={c.cta}
                  style={{
                    marginTop: 18, alignSelf: 'flex-start',
                    fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, letterSpacing: 2,
                    color: 'hsl(var(--primary))', textTransform: 'uppercase',
                  }}
                >
                  Shop →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily routine */}
      <section className="px-6 md:px-20 py-20">
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 14 }}>Daily Routine</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,5vw,64px)',
            color: 'hsl(var(--pl-white))', textAlign: 'center', letterSpacing: 1, marginBottom: 40,
          }}>
            SIMPLE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>STACK</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
            {ROUTINE.map((r, i) => (
              <motion.div
                key={r.time}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: 28, borderRadius: 14, background: '#0d0d0d',
                  border: '1px solid rgba(255,90,0,.15)', textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 3,
                  color: 'hsl(var(--primary))', fontWeight: 800,
                }}>
                  {r.time}
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: 28, letterSpacing: 1,
                  color: 'hsl(var(--pl-white))', marginTop: 8,
                }}>
                  {r.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 md:px-20 py-24" style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,42px)', color: 'hsl(var(--pl-white))', letterSpacing: 1, lineHeight: 1.25 }}>
            This is more than supplements.
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px,6vw,72px)', color: 'hsl(var(--primary))', letterSpacing: 2, marginTop: 10 }}>
            THIS IS COMMUNITY.
          </div>
          <div style={{ marginTop: 30, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/collections" className="btn-p">Shop Best Sellers</Link>
            <Link to="/bundles" className="btn-o">Shop Bundles</Link>
          </div>
          <div style={{
            marginTop: 18, fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 2,
            color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
          }}>
            📦 FREE SHIPPING ON ALL ORDERS
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default System;
