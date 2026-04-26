import { motion } from 'framer-motion';

const proofs = [
  { icon: '🚫', label: 'No Fillers' },
  { icon: '🔍', label: 'Fully Transparent' },
  { icon: '⚖️', label: 'Real Dosages' },
  { icon: '⚡', label: 'Performance Driven' },
];

const BuiltDifferent = () => {
  return (
    <section
      style={{
        background: 'hsl(var(--pl-black))',
        padding: 'clamp(80px, 10vw, 140px) 6vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orange glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: 1200,
          maxHeight: 1200,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        {/* Hero line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              letterSpacing: 6,
              color: 'hsl(var(--primary))',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            The Difference
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(44px, 6.5vw, 92px)',
              lineHeight: 0.95,
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              marginBottom: 18,
            }}
          >
            BUILT WITH <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>INTENTION.</em>
            <br />
            DESIGNED TO BE FELT.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              color: 'rgba(255,255,255,.65)',
              maxWidth: 720,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            No fillers. No shortcuts. No watered-down ingredients. Just performance-driven supplements that
            actually do something.
          </p>
        </motion.div>

        {/* Proof Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 14,
            margin: '50px auto 80px',
            maxWidth: 980,
          }}
        >
          {proofs.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: 'backOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '20px 18px',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,.08)',
                background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.01))',
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 2,
                color: 'hsl(var(--pl-white))',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ fontSize: 20 }} aria-hidden>{p.icon}</span>
              {p.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Core message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          style={{ maxWidth: 820, margin: '0 auto', textAlign: 'left' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 4.5vw, 60px)',
              lineHeight: 1,
              letterSpacing: 0.5,
              color: 'hsl(var(--pl-white))',
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            BUILT DIFFERENT <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>FROM THE START</em>
          </h3>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,.72)',
              lineHeight: 1.75,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <p>
              Most supplements are built to maximize margins—loaded with cheap ingredients, hidden blends, and
              doses too low to make a difference.
            </p>
            <p style={{ color: 'hsl(var(--pl-white))', fontWeight: 600 }}>
              We didn't build PURELOAD that way.
            </p>
            <p>
              Every product is carefully developed with purpose, using ingredients that serve a real function
              in your body—supporting energy, recovery, balance, and performance.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                marginTop: 8,
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(20px, 2vw, 28px)',
                color: 'hsl(var(--primary))',
                letterSpacing: 1,
              }}
            >
              <span>NO FILLER COMPOUNDS.</span>
              <span>NO GUESSWORK.</span>
              <span>NO SHORTCUTS.</span>
            </div>
            <p style={{ marginTop: 8, color: 'hsl(var(--pl-white))', fontWeight: 600 }}>
              Just products built to work.
            </p>
          </div>
        </motion.div>

        {/* Short close */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: 90,
            padding: '50px 30px',
            borderTop: '1px solid rgba(255,255,255,.08)',
            borderBottom: '1px solid rgba(255,255,255,.08)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(38px, 5.5vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
            }}
          >
            YOU DON'T TAKE IT.
            <br />
            <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>YOU FEEL IT.</em>
          </h3>
          <p
            style={{
              marginTop: 20,
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              color: 'rgba(255,255,255,.6)',
              maxWidth: 540,
              margin: '20px auto 0',
              lineHeight: 1.6,
            }}
          >
            When what you're putting in your body is built right—you don't question it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BuiltDifferent;
