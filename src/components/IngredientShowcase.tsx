import { motion } from 'framer-motion';
import { useState } from 'react';

interface Ingredient {
  name: string;
  image: string;
}

interface IngredientShowcaseProps {
  title: string;
  subtitle: string;
  ingredients: Ingredient[];
}

const IngredientShowcase = ({ title, subtitle, ingredients }: IngredientShowcaseProps) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <>
      <div style={{
        background: 'hsl(var(--pl-dark))',
        borderTop: '1px solid rgba(255,255,255,.04)',
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 32 }}
          >
            <div className="sec-ey" style={{ opacity: 1, transform: 'none', marginBottom: 12 }}>
              KEY INGREDIENTS
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: '.92',
              letterSpacing: 1,
              color: 'hsl(var(--pl-white))',
              marginBottom: 12,
            }}>
              {title.split(' ').map((word, i) => (
                <span key={i}>
                  {word === 'Targeted' || word === 'Ingredients'
                    ? <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>{word}</em>
                    : word}
                  {' '}
                </span>
              ))}
            </h2>
            <p style={{
              fontSize: 14,
              color: 'rgba(255,255,255,.4)',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {subtitle}
            </p>
          </motion.div>

          {/* Desktop grid / Mobile horizontal scroll */}
          <div
            className="ingredient-scroll-row"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${ingredients.length}, 1fr)`,
              gap: 16,
            }}
          >
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setSelectedImg(ing.image)}
                className="cursor-pointer group"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,.08)',
                  background: '#0d0d0d',
                  transition: 'border-color .3s, transform .3s',
                }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,90,0,.4)' }}
              >
                <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img
                    src={ing.image}
                    alt={ing.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform .4s',
                    }}
                    className="group-hover:scale-105"
                  />
                </div>
                <div style={{
                  padding: '12px 14px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: 'hsl(var(--primary))',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}>
                  {ing.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: 24,
          }}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImg}
            alt="Ingredient detail"
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12 }}
          />
          <button
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.1)',
              border: 'none',
              color: '#fff',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </motion.div>
      )}
    </>
  );
};

export default IngredientShowcase;
