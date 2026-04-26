import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'What is PURELOAD?',
    a: 'PURELOAD is a premium supplement brand delivering science-backed formulas in convenient, delicious forms — from creatine gummies to hormonal support. All products are lab tested, GMP certified, and manufactured in FDA-registered facilities in the USA.',
  },
  {
    q: 'How do subscriptions work?',
    a: "When you order, you're automatically enrolled in our Subscribe & Save program at a discounted price. You can choose delivery every 30, 60, or 90 days. Cancel or modify anytime — no commitments, no hassle. You can also opt for a one-time purchase instead.",
  },
  {
    q: 'Are your products safe?',
    a: 'Absolutely. Every PURELOAD product is manufactured in a GMP-certified, FDA-registered facility in the United States. All ingredients are clinically studied and lab tested for purity and potency.',
  },
  {
    q: 'How long until I see results?',
    a: 'Most customers notice improvements within 2–4 weeks of consistent daily use. For best results, we recommend at least 8 weeks. Individual results may vary based on diet, exercise, and overall lifestyle.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, contact us and we\'ll make it right. No questions asked.',
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes! All orders ship free within the United States. Orders are processed within 24 hours and typically arrive within 3–5 business days.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes, you can cancel your subscription at any time through your account or by contacting our support team. There are no cancellation fees or penalties.',
  },
  {
    q: 'What makes PURELOAD different from other supplement brands?',
    a: 'We focus on making supplementation enjoyable and effortless. Our gummy and tablet formats eliminate the need for powders and shakers. Every ingredient is clinically dosed, lab tested, and free from artificial junk.',
  },
];

const FAQSection = () => {
  return (
    <section style={{
      background: 'hsl(var(--pl-black))',
      borderTop: '1px solid rgba(255,255,255,.04)',
      padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="sec-ey" style={{ opacity: 1, transform: 'none', textAlign: 'center', marginBottom: 16 }}>
            Got Questions?
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 64px)',
            lineHeight: '.9',
            letterSpacing: 1,
            color: 'hsl(var(--pl-white))',
            textAlign: 'center',
            marginBottom: 40,
          }}>
            FREQUENTLY <em style={{ color: 'hsl(var(--primary))', fontStyle: 'normal' }}>ASKED</em>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                style={{ borderColor: 'rgba(255,255,255,.06)' }}
              >
                <AccordionTrigger
                  className="hover:no-underline py-5"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 18,
                    letterSpacing: 0.5,
                    color: 'hsl(var(--pl-white))',
                    textAlign: 'left',
                  }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,.45)',
                  lineHeight: 1.8,
                  paddingBottom: 20,
                }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
