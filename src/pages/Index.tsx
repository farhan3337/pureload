import { useCallback, useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '@/data/pureload';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import FullscreenMenu from '@/components/FullscreenMenu';
import HeroSection from '@/components/HeroSection';
import Ticker from '@/components/Ticker';
import ProductSection from '@/components/ProductSection';
import HowItWorks from '@/components/HowItWorks';
import FlavorCarousel from '@/components/FlavorCarousel';
import ReviewCarousel from '@/components/ReviewCarousel';
import OrderSection from '@/components/OrderSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import NotifyModal from '@/components/NotifyModal';
import MissionSection from '@/components/MissionSection';
import DiscountPopup from '@/components/DiscountPopup';
import VideoTestimonials from '@/components/VideoTestimonials';
import FAQSection from '@/components/FAQSection';
import TrustBanner from '@/components/TrustBanner';
import ScrollReveal from '@/components/ScrollReveal';
import BuiltDifferent from '@/components/BuiltDifferent';

gsap.registerPlugin(ScrollTrigger);

interface IndexProps {
  onAddCart: (qty: number, price: number, label: string, variantId?: string, isSubscription?: boolean, subscriptionInterval?: number, img?: string) => void;
  onOpenCart: () => void;
  cartCount: number;
}

const Index = ({ onAddCart, onOpenCart, cartCount }: IndexProps) => {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const animInitRef = useRef(false);

  const gotoSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const addFlavor = useCallback((name: string, variantId: string) => {
    const product = PRODUCTS.find(p => p.shopifyVariantId === variantId);
    onAddCart(1, product?.price || 39.99, `${name} 1-Bottle`, variantId, undefined, undefined, product?.img);
  }, [onAddCart]);

  // Preloader
  useEffect(() => {
    const fill = document.getElementById('plFill');
    const pct = document.getElementById('plPct');
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => setLoaded(true), 400); }
      if (fill) fill.style.width = p + '%';
      if (pct) pct.textContent = Math.round(p) + '%';
    }, 80);
    return () => clearInterval(iv);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!loaded || animInitRef.current) return;
    animInitRef.current = true;

    const isMobile = window.innerWidth <= 900;

    // ─── HERO INTRO ───
    const heroTL = gsap.timeline({ defaults: { ease: 'expo.out' } });
    heroTL
      .fromTo('#hEy', { opacity: 0, y: 20, letterSpacing: '14px' }, { opacity: 1, y: 0, letterSpacing: '7px', duration: .9, delay: .1 })
      .to('.h-h1 .li', { y: '0%', duration: 1.1, stagger: .13, ease: 'expo.out' }, '-=.5')
      .fromTo('#hSub', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .8 }, '-=.5')
      .fromTo('#hCta > button', { opacity: 0, y: 30, scale: .95 }, { opacity: 1, y: 0, scale: 1, duration: .65, stagger: .12, ease: 'back.out(1.4)' }, '-=.4')
      .fromTo('#hDescRight', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .9 }, '-=.7')
      .fromTo('#scrollCue', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .6 }, '-=.2');

    if (!isMobile) {
      // Hero scrolls away with blur+fade
      ScrollTrigger.create({
        trigger: '#ch-hero', start: 'top top', end: 'bottom top', scrub: 1.4,
        onUpdate(self) {
          const p = self.progress;
          gsap.set('#s-hero', { opacity: Math.max(0, 1 - p * 2), scale: 1 - p * .06, filter: `blur(${p * 10}px)` });
        }
      });

      ScrollTrigger.create({ trigger: '#ch-prod', start: 'top top', end: 'bottom bottom', pin: '#s-prod' });
    }

    // ─── PRODUCT SECTION (scroll-driven) ───
    gsap.set('.bottle', { scale: .6, opacity: 0, rotationY: 25 });
    gsap.set('.prd-halo', { scale: .4, opacity: 0 });
    gsap.set('#prdInfo', { opacity: 0, x: 60, filter: 'blur(6px)' });

    ScrollTrigger.create({
      trigger: '#ch-prod', start: 'top 80%', once: true,
      onEnter() {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.to('.prd-halo', { scale: 1, opacity: 1, duration: 1.2 }, 0)
          .to('.bottle', { scale: 1, opacity: 1, rotationY: 0, duration: 1.1, ease: 'back.out(1.2)' }, 0.15)
          .to('#prdInfo', { opacity: 1, x: 0, filter: 'blur(0px)', duration: .9 }, 0.3)
          .to('#prdH', { opacity: 1, y: 0, duration: .8 }, 0.55)
          .to('.prd-desc', { opacity: 1, y: 0, duration: .7 }, 0.7)
          .to('.stat-row .st', { opacity: 1, y: 0, scale: 1, duration: .55, stagger: .09 }, 0.82)
          .to('.prd-info .btn-p', { opacity: 1, y: 0, scale: 1, duration: .55 }, 1.1);
      }
    });

    // Bottle floats + rotates as user scrolls past product section
    if (!isMobile) {
      ScrollTrigger.create({
        trigger: '#ch-prod',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate(self) {
          const p = self.progress;
          gsap.set('.bottle', {
            y: (0.5 - p) * 80,
            rotation: (p - 0.5) * 8,
          });
          gsap.set('.prd-halo', {
            scale: 0.9 + Math.sin(p * Math.PI) * 0.2,
            opacity: 0.6 + Math.sin(p * Math.PI) * 0.4,
          });
          gsap.set('.stat-row', {
            y: (1 - p) * 30,
          });
        },
      });
    }

    // ─── HOW IT WORKS ───
    if (!isMobile) {
      ScrollTrigger.create({ trigger: '#ch-how', start: 'top top', end: 'bottom bottom', pin: '#s-how' });
    }
    gsap.set('#howEy', { opacity: 0, y: 24, letterSpacing: '12px' });
    gsap.set('#howW1', { opacity: 0, x: -120 });
    gsap.set('#howW2', { opacity: 0, x: 120 });
    gsap.set('#howW3', { opacity: 0, x: -120 });
    gsap.set(['#hc1', '#hc2', '#hc3'], { opacity: 0, y: 50, scale: .93 });

    ScrollTrigger.create({
      trigger: '#ch-how', start: 'top 80%', once: true,
      onEnter() {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.to('#howEy', { opacity: 1, y: 0, letterSpacing: '6px', duration: .75 })
          .to('#howW1', { opacity: 1, x: 0, duration: .8, ease: 'back.out(1.4)' }, '-=.3')
          .to('#howW2', { opacity: 1, x: 0, duration: .8, ease: 'back.out(1.4)' }, '-=.3')
          .to('#howW3', { opacity: 1, x: 0, duration: .8, ease: 'back.out(1.4)' }, '-=.3')
          .to(['#hc1', '#hc2', '#hc3'], { opacity: 1, y: 0, scale: 1, duration: .7, stagger: .12 }, '-=.4');
      }
    });

    // How-it-works cards lift slightly as you scroll through them
    if (!isMobile) {
      ['#hc1', '#hc2', '#hc3'].forEach((id, i) => {
        ScrollTrigger.create({
          trigger: '#ch-how',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
          onUpdate(self) {
            const p = self.progress;
            const offset = (i - 1) * 30; // -30, 0, +30 spread
            gsap.set(id, {
              y: offset * (1 - p),
            });
          },
        });
      });
    }

    // ─── FLAVOR CAROUSEL — spotlight + parallax ───
    const flvTrack = document.getElementById('flvTrack');
    const flvFill = document.getElementById('flvFill');
    if (flvTrack && !isMobile) {
      const allCards = Array.from(flvTrack.querySelectorAll('.flv-card')) as HTMLElement[];
      const allImages = allCards.map(c => c.querySelector('.flv-product-img') as HTMLElement);
      const allBodies = allCards.map(c => c.querySelector('.flv-body') as HTMLElement);

      gsap.set(allCards, { opacity: 0, x: 220, scale: 0.82, rotateY: 18 });

      ScrollTrigger.create({
        trigger: '#ch-flv',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#s-flv',
        scrub: 1.0,
        onUpdate(self) {
          const wrap = flvTrack.parentElement;
          if (!wrap) return;
          const maxScroll = flvTrack.scrollWidth - wrap.clientWidth;
          const scrollX = self.progress * maxScroll;
          gsap.set(flvTrack, { x: -scrollX });
          if (flvFill) flvFill.style.width = (self.progress * 100) + '%';

          const viewportCenter = window.innerWidth / 2;
          allCards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distFromCenter = Math.abs(cardCenter - viewportCenter);
            const maxDist = window.innerWidth * 0.65;
            const proximity = Math.max(0, 1 - distFromCenter / maxDist);

            const inView = rect.right > -100 && rect.left < window.innerWidth + 100;

            if (inView) {
              gsap.to(card, {
                opacity: 0.45 + proximity * 0.55,
                scale: 0.86 + proximity * 0.14,
                rotateY: (1 - proximity) * (cardCenter > viewportCenter ? -10 : 10),
                x: 0,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto',
              });

              if (allImages[i]) {
                gsap.to(allImages[i], {
                  x: (cardCenter - viewportCenter) * -0.06,
                  y: -proximity * 14,
                  scale: 1 + proximity * 0.1,
                  rotation: (cardCenter - viewportCenter) * 0.008,
                  duration: 0.5,
                  ease: 'power2.out',
                  overwrite: 'auto',
                });
              }

              if (allBodies[i]) {
                gsap.to(allBodies[i], {
                  y: -proximity * 6,
                  duration: 0.5,
                  ease: 'power2.out',
                  overwrite: 'auto',
                });
              }
            }
          });
        }
      });
    }

    // ─── REVIEWS — cards drift sideways as you scroll ───
    if (!isMobile) {
      ScrollTrigger.create({
        trigger: '#s-rv',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        onUpdate(self) {
          const p = self.progress;
          gsap.utils.toArray<HTMLElement>('.rv-card').forEach((card, i) => {
            const direction = i % 2 === 0 ? 1 : -1;
            gsap.set(card, {
              x: direction * (1 - p) * 50,
              y: (1 - p) * (i % 3 === 0 ? -30 : 30),
              opacity: Math.min(1, p * 1.8),
            });
          });
          gsap.set('.rv-h', {
            x: (1 - p) * -60,
            opacity: Math.min(1, p * 2),
          });
        },
      });
    }

    // ─── ORDER SECTION (scroll-driven slide in) ───
    if (!isMobile) {
      ScrollTrigger.create({ trigger: '#ch-ord', start: 'top top', end: 'bottom bottom', pin: '#s-ord' });

      ScrollTrigger.create({
        trigger: '#ch-ord',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.5,
        onUpdate(self) {
          const p = self.progress;
          gsap.set('.ord-imgs', {
            x: (1 - p) * 120,
            opacity: p,
          });
          gsap.set('.ord-h', {
            x: (1 - p) * -80,
            opacity: p,
          });
          gsap.set('.ord-desc, .pack-row, .ord-price, .qty-row, .atc', {
            x: (1 - p) * -50,
            opacity: Math.min(1, p * 1.4),
          });
        },
      });

      // Order images parallax depth as you scroll past
      ScrollTrigger.create({
        trigger: '#ch-ord',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        onUpdate(self) {
          const p = self.progress;
          gsap.set('.ord-main', {
            y: (0.5 - p) * 60,
          });
          gsap.set('.ord-mini', {
            y: (0.5 - p) * 30,
          });
        },
      });
    }

    // ─── CTA SECTION (scroll-driven scale-in) ───
    if (!isMobile) {
      ScrollTrigger.create({ trigger: '#ch-cta', start: 'top top', end: 'bottom bottom', pin: '#s-cta' });

      ScrollTrigger.create({
        trigger: '#ch-cta',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.5,
        onUpdate(self) {
          const p = self.progress;
          gsap.set('.cta-h', {
            scale: 0.7 + p * 0.3,
            opacity: p,
            letterSpacing: `${1 + p * 2}px`,
          });
          gsap.set('.cta-glow', {
            scale: 0.5 + p * 0.6,
            opacity: p * 0.9,
          });
          gsap.set('.cta-sub, .email-row', {
            y: (1 - p) * 30,
            opacity: Math.min(1, p * 1.5),
          });
        },
      });
    }

    gsap.set('#ctaInner', { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: '#ch-cta', start: 'top 80%', once: true,
      onEnter() { gsap.to('#ctaInner', { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }); }
    });

    // ─── REFRESH ON RESIZE ───
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);

  }, [loaded]);

  return (
    <>
      <Preloader done={loaded} />
      <DiscountPopup />
      <NotifyModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} onGotoSection={gotoSection} />
      <AnnouncementBar />
      <Navbar onOpenMenu={() => setMenuOpen(true)} onOpenCart={onOpenCart} cartCount={cartCount} onGotoSection={gotoSection} />
      <HeroSection onGotoSection={gotoSection} />
      <Ticker />
      <ScrollReveal parallax={40} fade={false}><BuiltDifferent /></ScrollReveal>
      <ScrollReveal parallax={50}><MissionSection /></ScrollReveal>
      <TrustBanner variant="highlight" />
      <ProductSection onGotoSection={gotoSection} />
      <HowItWorks />
      <FlavorCarousel onAddFlavor={addFlavor} onOpenModal={() => setModalOpen(true)} />
      <ScrollReveal parallax={40}><TrustBanner /></ScrollReveal>
      <ScrollReveal parallax={50}><ReviewCarousel /></ScrollReveal>
      <ScrollReveal parallax={40}><VideoTestimonials /></ScrollReveal>
      <OrderSection onAddCart={onAddCart} />
      <ScrollReveal parallax={40} fade={false}><FAQSection /></ScrollReveal>
      <CTASection />
      <Footer />
    </>
  );
};
export default Index;