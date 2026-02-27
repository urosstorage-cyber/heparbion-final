import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { ChevronDown } from 'lucide-react';

const FAQSection: React.FC = () => {
  const { ref, isRevealed } = useScrollReveal(0.1);
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const title = language === 'slo' ? 'Pogosta vprašanja' : 'Frequently Asked Questions';
  const eyebrow = language === 'slo' ? 'FAQ' : 'FAQ';

  const faqs = language === 'slo' ? [
    { q: 'Ali je ta formula varna in certificirana?', a: 'Da. Proizvedeno v EU v obratu z GMP, ISO 22000 in FSSC certifikati, z natančno laboratorijsko preverjenimi sestavinami.' },
    { q: 'Zakaj ta izdelek ne obljublja "hitrega detoksa"?', a: 'Ajurvedska filozofija (in EU znanost) se strinjata: hitri diuretiki in odvajala telo le obremenijo. Naša formula nudi dolgoročno, kumulativno in nežno podporo presnovi in ravnovesju.' },
    { q: 'Ali izdelek vsebuje alergene?', a: 'Kapsule so primerne za vegane, vendar pa zaradi vključitve celotnega spektra naravnih zelišč za prebavo vsebujejo naravno zeleno (celery), kar skrbno transparentno navajamo.' },
    { q: 'Kako dolgo traja dostava v tujino?', a: 'Dostava preko GLS partnerja traja običajno od 1 do 6 delovnih dni od dneva odpreme.' },
    { q: 'Ali je Heparbion Plus primeren za dolgotrajno vsakodnevno jemanje?', a: 'Absolutno. Ne vsebuje megadoz posameznih izoliranih snovi, temveč sinergijo zelišč (kot so ingver, sladki koren in amalaki), ki so zasnovana prav za varno vsakodnevno rutino.' },
    { q: 'Kako dolgo traja ena steklenička?', a: 'Ena steklenička vsebuje 120 kapsul. Pri priporočenem odmerku 2 kapsuli na dan zadošča za 60 dni (2 meseca).' },
  ] : [
    { q: 'Is this formula safe and certified?', a: 'Yes. Manufactured in the EU in a facility with GMP, ISO 22000, and FSSC certifications, with precisely lab-verified ingredients.' },
    { q: 'Why doesn\'t this product promise a "quick detox"?', a: 'Ayurvedic philosophy (and EU science) agree: fast diuretics and laxatives only burden the body. Our formula offers long-term, cumulative, and gentle metabolic and balance support.' },
    { q: 'Does the product contain allergens?', a: 'The capsules are suitable for vegans, but due to the full-spectrum natural digestive herbs, they contain natural celery, which we transparently declare.' },
    { q: 'How long does international delivery take?', a: 'Delivery via our GLS partner typically takes 1 to 6 business days from the date of dispatch.' },
    { q: 'Is Heparbion Plus suitable for long-term daily use?', a: 'Absolutely. It doesn\'t contain megadoses of isolated compounds, but rather a synergy of herbs (such as ginger, licorice root, and amalaki) designed for safe daily routine.' },
    { q: 'How long does one bottle last?', a: 'One bottle contains 120 capsules. At the recommended dose of 2 capsules per day, it lasts 60 days (2 months).' },
  ];

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-cream-200/30" />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400 uppercase block mb-4">{eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-elegant">{title}</h2>
          <div className="divider-gold w-16 mx-auto mt-6" />
        </div>

        <div className={`space-y-3 scroll-reveal ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                <span className="font-serif text-sm md:text-base font-medium text-foreground pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`flex-shrink-0 text-foreground/30 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIdx === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-sm text-foreground/50 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
