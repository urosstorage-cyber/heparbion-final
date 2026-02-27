import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Award, Shield, Clock, MapPin, Stethoscope } from 'lucide-react';

const PRODUCT_MAIN = 'https://d64gsuwffb70l.cloudfront.net/699afc85723b98553d778884_1771765975701_dcad46bf.jpg';

const ClinicSection: React.FC = () => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: contentRef, isRevealed: contentRevealed } = useScrollReveal(0.1);
  const { ref: cardsRef, isRevealed: cardsRevealed } = useScrollReveal(0.1);
  const { t } = useLanguage();

  const trustCards = [
    { icon: Clock, title: t('clinic.card1.title'), subtitle: t('clinic.card1.sub'), description: t('clinic.card1.desc') },
    { icon: Stethoscope, title: t('clinic.card2.title'), subtitle: t('clinic.card2.sub'), description: t('clinic.card2.desc') },
    { icon: Shield, title: t('clinic.card3.title'), subtitle: t('clinic.card3.sub'), description: t('clinic.card3.desc') },
  ];

  return (
    <section id="clinic" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cream-200/50" />
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-20 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400 uppercase block mb-4">{t('clinic.eyebrow')}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-elegant mb-5">{t('clinic.h2')}</h2>
          <p className="text-base text-foreground/50 max-w-2xl mx-auto leading-relaxed">{t('clinic.sub')}</p>
          <div className="divider-gold w-16 mx-auto mt-8" />
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className={`scroll-reveal-left ${contentRevealed ? 'revealed' : ''}`}>
            <div className="relative">
              <div className="absolute -inset-4 border border-gold-400/10 rounded-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10">
                <img src={PRODUCT_MAIN} alt="Heparbion Plus with traditional Ayurvedic ingredients" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/20 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-4 md:-right-8 glass-card rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center">
                    <Award size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xl font-serif font-bold text-foreground">4.9/5</p>
                    <p className="text-[10px] text-foreground/40">{t('clinic.reviews')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`scroll-reveal-right ${contentRevealed ? 'revealed' : ''}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold-400" />
                <span className="text-xs font-medium tracking-wide text-foreground/50 uppercase">{t('clinic.location')}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-snug">{t('clinic.h3')}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">{t('clinic.desc')}</p>
              <div className="pt-4 space-y-4">
                {[t('clinic.check1'), t('clinic.check2'), t('clinic.check3')].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand/[0.1] flex items-center justify-center mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#00B493" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-foreground/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
          {trustCards.map((card, i) => (
            <div key={i} className={`glass-card rounded-2xl p-7 bento-item scroll-reveal ${cardsRevealed ? 'revealed' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="w-12 h-12 rounded-xl bg-brand/[0.06] flex items-center justify-center mb-5">
                <card.icon size={22} className="text-brand/60" strokeWidth={1.5} />
              </div>
              <div className="mb-2">
                <span className="font-serif text-2xl font-bold text-foreground">{card.title}</span>
                <span className="text-xs text-gold-400 ml-2 font-medium">{card.subtitle}</span>
              </div>
              <p className="text-sm text-foreground/45 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicSection;
