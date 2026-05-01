import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import jdubImg from '../assets/mission-1.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const Mission = () => {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--pl-black))' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="pt-[120px] pb-12 px-6 md:px-20 text-center"
        style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}
      >
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

      {/* ── BODY COPY ────────────────────────────────────── */}
      <section className="px-6 md:px-20 py-16">
        <div style={{ maxWidth: 820, margin: '0 auto', color: 'rgba(255,255,255,.78)', fontSize: 17, lineHeight: 1.85 }}>
          {[
            'At PURELOAD, our mission is to fuel the body, sharpen the mind, and empower individuals to become the strongest version of themselves—physically, mentally, and purposefully.',
            'We are more than a supplement brand. We are a movement built for those who wake up with intention, chase growth, and refuse to settle for average. PURELOAD exists for the everyday individual in fitness and wellness, and for those who carry a vision—those building something bigger than themselves and seeking a community of like-minded individuals to grow alongside.',
          ].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ marginBottom: 22 }}
            >
              {p}
            </motion.p>
          ))}

          {/* Pull‑quote */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{
              margin: '32px 0', padding: '20px 24px',
              borderLeft: '3px solid hsl(var(--primary))',
              background: 'rgba(255,90,0,.05)', borderRadius: 6,
              fontFamily: 'var(--font-heading)', fontSize: 22, letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
            }}
          >
            This brand is deeply personal.
          </motion.div>

          {[
            'PURELOAD is dedicated to the memory of my dear friend and brother, Jonathan \u201CJdub\u201D Garner. Before his tragic passing, we shared a vision of building something meaningful together\u2014something that would bring people together and create impact. Jonathan was the glue\u2014he brought people together, uplifted everyone around him, and lived life with energy and purpose.',
            'That spirit lives on through PURELOAD.',
            'Every product, every message, and every step forward is a reflection of that vision\u2014of unity, strength, and living fully. We don\u2019t just build bodies here\u2014we build discipline, connection, and legacy.',
            'PURELOAD is for those who train hard, think bigger, and move with purpose.',
          ].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
              style={{ marginBottom: 22 }}
            >
              {p}
            </motion.p>
          ))}

          {/* Community callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', margin: '40px 0' }}
          >
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,42px)',
              color: 'hsl(var(--pl-white))', letterSpacing: 1, lineHeight: 1.2,
            }}>
              This is more than supplements.
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px,5vw,56px)',
              color: 'hsl(var(--primary))', letterSpacing: 2, marginTop: 8,
            }}>
              THIS IS A COMMUNITY!
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRIBUTE ──────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,.06)',
          paddingTop: 80,
          paddingBottom: 100,
          paddingLeft: 'clamp(20px, 6vw, 80px)',
          paddingRight: 'clamp(20px, 6vw, 80px)',
          background: 'linear-gradient(180deg, rgba(255,90,0,.04) 0%, transparent 60%)',
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: 5,
            color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
          }}>
            <span style={{ display: 'block', width: 40, height: 1, background: 'hsl(var(--primary))' }} />
            In Loving Memory
            <span style={{ display: 'block', width: 40, height: 1, background: 'hsl(var(--primary))' }} />
          </div>
        </motion.div>

        {/* ── Two‑column card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(255,90,0,.22)',
            boxShadow: '0 32px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.03)',
            /* grid on desktop, stack on mobile */
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          }}
        >
          {/* Photo */}
          <div style={{ position: 'relative', minHeight: 320 }}>
            <img
              src={jdubImg}
              alt="Jonathan 'Jdub' Garner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block',
                minHeight: 320,
              }}
            />
            {/* Fade right → text panel (desktop) */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: 100,
              background: 'linear-gradient(to right, transparent, rgb(14,8,4))',
              pointerEvents: 'none',
            }} />
            {/* Fade bottom → text panel (mobile) */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
              background: 'linear-gradient(to bottom, transparent, rgb(14,8,4))',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Text panel */}
          <div style={{
            background: 'rgb(14,8,4)',
            padding: 'clamp(28px, 5vw, 52px) clamp(24px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 22,
          }}>
            {/* Eyebrow */}
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 4,
              color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
            }}>
              The Heart Behind PURELOAD
            </div>

            {/* Name */}
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: 'hsl(var(--pl-white))',
              letterSpacing: 1,
              lineHeight: 1.05,
              margin: 0,
            }}>
              JONATHAN<br />
              <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>&ldquo;JDUB&rdquo;</em><br />
              GARNER
            </h2>

            {/* Accent line */}
            <div style={{ width: 52, height: 3, background: 'hsl(var(--primary))', borderRadius: 2 }} />

            {/* Quote */}
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,.72)',
              lineHeight: 1.85,
              margin: 0,
            }}>
              &ldquo;The glue, the energy, the brotherhood behind the vision. He brought people together, uplifted everyone around him, and lived life with energy and purpose.&rdquo;
            </p>

            {/* Forever badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px',
              background: 'rgba(255,90,0,.1)',
              border: '1px solid rgba(255,90,0,.28)',
              borderRadius: 40,
              width: 'fit-content',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'hsl(var(--primary))', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: 3,
                color: 'hsl(var(--primary))', fontWeight: 800, textTransform: 'uppercase',
              }}>
                Forever In Our Hearts
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <Link to="/collections" className="btn-p" style={{ display: 'inline-block' }}>
            Shop the Movement
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Mission;