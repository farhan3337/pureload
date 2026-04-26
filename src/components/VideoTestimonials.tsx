import { useState } from 'react';
import { motion } from 'framer-motion';

interface VideoTestimonial {
  id: string;
  name: string;
  title: string;
  videoUrl: string;
  thumbnail?: string;
}

const PLACEHOLDER_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: '1',
    name: 'Marcus T.',
    title: '12-Week Transformation',
    videoUrl: '',
    thumbnail: '',
  },
  {
    id: '2',
    name: 'Sarah K.',
    title: '90-Day Results',
    videoUrl: '',
    thumbnail: '',
  },
];

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section style={{
      background: 'hsl(var(--pl-dark))',
      borderTop: '1px solid rgba(255,255,255,.04)',
      padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 16 }}>
            Real Results
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 64px)',
            lineHeight: '.9',
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
            textAlign: 'center',
            marginBottom: 14,
          }}>
            CLIENT <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>TRANSFORMATIONS</em>
          </h2>
          <p style={{
            fontSize: 14,
            color: 'rgba(255,255,255,.4)',
            lineHeight: 1.8,
            textAlign: 'center',
            maxWidth: 520,
            margin: '0 auto 40px',
          }}>
            See what PURELOAD has done for real people. These are unsponsored, authentic results from our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
              style={{
                background: '#0b0b0b',
                border: '1px solid rgba(255,255,255,.06)',
              }}
              onClick={() => setActiveVideo(activeVideo === t.id ? null : t.id)}
            >
              {/* Video placeholder - replace src with actual video URLs */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: 'clamp(220px, 30vw, 340px)',
                  background: 'linear-gradient(135deg, #111, #0a0a0a)',
                }}
              >
                {t.videoUrl ? (
                  <video
                    src={t.videoUrl}
                    poster={t.thumbnail}
                    controls={activeVideo === t.id}
                    autoPlay={activeVideo === t.id}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '16px 16px 0 0' }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        background: 'rgba(255,90,0,.15)',
                        border: '2px solid hsl(var(--primary))',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(24,100%,50%)">
                        <polygon points="8,5 20,12 8,19" />
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 10,
                      letterSpacing: 3,
                      color: 'rgba(255,255,255,.3)',
                      textTransform: 'uppercase',
                    }}>
                      Video Coming Soon
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 22,
                  letterSpacing: 1,
                  color: 'hsl(var(--pl-white))',
                  marginBottom: 4,
                }}>
                  {t.title.toUpperCase()}
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: 'rgba(255,255,255,.35)',
                  letterSpacing: 2,
                }}>
                  — {t.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: 36 }}
        >
          <button
            className="btn-p"
            onClick={() => {
              const el = document.getElementById('ch-ord');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.href = '/collections';
              }
            }}
          >
            Shop Now →
          </button>
          <p
            style={{
              marginTop: 18,
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: 'rgba(255,255,255,.25)',
              letterSpacing: 2,
            }}
          >
            TO SUBMIT YOUR RESULTS, EMAIL US AT RESULTS@PURELOAD.COM
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
