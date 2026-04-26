import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const Mission = () => {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>
      {/* Hero */}
      <section className="pt-[120px] pb-12 px-6 md:px-20 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 14 }}>Our Mission</div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(48px,8vw,108px)',
            lineHeight: '.9',
            letterSpacing: 2,
            color: 'hsl(var(--pl-white))',
          }}>
            FUEL THE BODY.<br />
            SHARPEN THE <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>MIND.</em>
          </h1>
          <p style={{
            fontFamily: 'var(--font-ui)', marginTop: 18, fontSize: 13, letterSpacing: 3,
            color: 'hsl(var(--primary))', textTransform: 'uppercase', fontWeight: 800,
          }}>
            PURELOAD Mission Statement
          </p>
        </motion.div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-20 py-16">
        <div style={{ maxWidth: 820, margin: '0 auto', color: 'rgba(255,255,255,.78)', fontSize: 17, lineHeight: 1.85 }}>
          {[
            'At PURELOAD, our mission is to fuel the body, sharpen the mind, and empower individuals to become the strongest version of themselves—physically, mentally, and purposefully.',
            'We are more than a supplement brand. We are a movement built for those who wake up with intention, chase growth, and refuse to settle for average. PURELOAD exists for the everyday individual in fitness and wellness, and for those who carry a vision—those building something bigger than themselves and seeking a community of like-minded individuals to grow alongside.',
          ].map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} style={{ marginBottom: 22 }}>
              {p}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{
              margin: '32px 0', padding: '20px 24px',
              borderLeft: '3px solid hsl(var(--primary))',
              background: 'rgba(255,90,0,.05)', borderRadius: 6,
              fontFamily: 'var(--font-heading)', fontSize: 22, letterSpacing: 1, color: 'hsl(var(--pl-white))',
            }}
          >
            This brand is deeply personal.
          </motion.div>

          {[
            "PURELOAD is dedicated to the memory of my dear friend and brother, Jonathan \u201CJdub\u201D Garner. Before his tragic passing, we shared a vision of building something meaningful together\u2014something that would bring people together and create impact. Jonathan was the glue\u2014he brought people together, uplifted everyone around him, and lived life with energy and purpose.",
            'That spirit lives on through PURELOAD.',
            'Every product, every message, and every step forward is a reflection of that vision\u2014of unity, strength, and living fully. We don\u2019t just build bodies here\u2014we build discipline, connection, and legacy.',
            'PURELOAD is for those who train hard, think bigger, and move with purpose.',
          ].map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }} style={{ marginBottom: 22 }}>
              {p}
            </motion.p>
          ))}

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', margin: '40px 0' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,42px)', color: 'hsl(var(--pl-white))', letterSpacing: 1, lineHeight: 1.2 }}>
              This is more than supplements.
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,5vw,56px)', color: 'hsl(var(--primary))', letterSpacing: 2, marginTop: 8 }}>
              THIS IS A COMMUNITY!
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tribute */}
      <section className="px-6 md:px-20 pb-24" style={{ borderTop: '1px solid rgba(255,255,255,.05)', paddingTop: 60 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{
            maxWidth: 760, margin: '0 auto', textAlign: 'center',
            padding: '40px 28px', borderRadius: 18,
            background: 'linear-gradient(180deg, rgba(255,90,0,.08), rgba(255,90,0,.02))',
            border: '1px solid rgba(255,90,0,.18)',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 4, color: 'hsl(var(--primary))',
            fontWeight: 800, textTransform: 'uppercase', marginBottom: 18,
          }}>
            In Loving Memory
          </div>
          <p style={{ fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,.85)', lineHeight: 1.7 }}>
            &ldquo;In loving memory of Jonathan &lsquo;Jdub&rsquo; Garner — the glue, the energy, the brotherhood behind the vision.&rdquo;
          </p>
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/collections" className="btn-p" style={{ display: 'inline-block' }}>Shop the Movement</Link>
        </div>
      </section>
    </div>
  );
};

export default Mission;
