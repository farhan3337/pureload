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

    const heroTL = gsap.timeline({ defaults: { ease: 'expo.out' } });
    heroTL
      .fromTo('#hEy', { opacity: 0, y: 20, letterSpacing: '14px' }, { opacity: 1, y: 0, letterSpacing: '7px', duration: .9, delay: .1 })
      .to('.h-h1 .li', { y: '0%', duration: 1.1, stagger: .13, ease: 'expo.out' }, '-=.5')
      .fromTo('#hSub', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .8 }, '-=.5')
      .fromTo('#hCta > button', { opacity: 0, y: 30, scale: .95 }, { opacity: 1, y: 0, scale: 1, duration: .65, stagger: .12, ease: 'back.out(1.4)' }, '-=.4')
      .fromTo('#hDescRight', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .9 }, '-=.7')
      .fromTo('#scrollCue', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .6 }, '-=.2');

    if (!isMobile) {
      ScrollTrigger.create({
        trigger: '#ch-hero', start: 'top top', end: 'bottom top', scrub: 1.4,
        onUpdate(self) {
          const p = self.progress;
          gsap.set('#s-hero', { opacity: Math.max(0, 1 - p * 2), scale: 1 - p * .06, filter: `blur(${p * 10}px)` });
        }
      });

      ScrollTrigger.create({ trigger: '#ch-prod', start: 'top top', end: 'bottom bottom', pin: '#s-prod' });
    }

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

    // Flavor carousel
    const flvTrack = document.getElementById('flvTrack');
    const flvFill = document.getElementById('flvFill');
    if (flvTrack) {
      const allCards = flvTrack.querySelectorAll('.flv-card');
      gsap.set(allCards, { opacity: 0, x: 280, y: 30, rotation: 4, scale: .88 });
      let lastRevealed = -1;
      ScrollTrigger.create({
        trigger: '#ch-flv', start: 'top top', end: 'bottom bottom',
        pin: isMobile ? false : '#s-flv', scrub: 1.0,
        onUpdate(self) {
          const wrap = flvTrack.parentElement;
          if (!wrap) return;
          const maxScroll = flvTrack.scrollWidth - wrap.clientWidth;
          const scrollX = self.progress * maxScroll;
          gsap.set(flvTrack, { x: -scrollX });
          if (flvFill) flvFill.style.width = (self.progress * 100) + '%';
          const revealIndex = Math.floor(self.progress * allCards.length * 1.2);
          if (revealIndex > lastRevealed) {
            for (let i = lastRevealed + 1; i <= Math.min(revealIndex, allCards.length - 1); i++) {
              gsap.to(allCards[i], { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: .6, ease: 'back.out(1.2)' });
            }
            lastRevealed = Math.min(revealIndex, allCards.length - 1);
          }
        }
      });
    }

    // Reviews now use static layout (no GSAP scroll pin)

    // Order section
    if (!isMobile) {
      ScrollTrigger.create({ trigger: '#ch-ord', start: 'top top', end: 'bottom bottom', pin: '#s-ord' });
    }

    // CTA
    if (!isMobile) {
      ScrollTrigger.create({ trigger: '#ch-cta', start: 'top top', end: 'bottom bottom', pin: '#s-cta' });
    }
    gsap.set('#ctaInner', { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: '#ch-cta', start: 'top 80%', once: true,
      onEnter() { gsap.to('#ctaInner', { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }); }
    });

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
      <TrustBanner />
      <ReviewCarousel />
      <ScrollReveal parallax={40}><VideoTestimonials /></ScrollReveal>
      <OrderSection onAddCart={onAddCart} />
      <ScrollReveal parallax={40} fade={false}><FAQSection /></ScrollReveal>
      <CTASection />
      <Footer />
    </>
  );
};
export default Index;

// FlavorCarousel component