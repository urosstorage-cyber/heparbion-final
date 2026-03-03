import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Check, Star, Package, Truck, ShieldCheck } from 'lucide-react';

const PricingSection: React.FC = () => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: cardsRef, isRevealed: cardsRevealed } = useScrollReveal(0.1);
  const { t, language } = useLanguage();

  const orderUrl = language === 'slo'
    ? 'https://aleksandrakomasz-plus.com/sl/izdelek/heparbion-plus/'
    : 'https://aleksandrakomasz-plus.com/product/heparbion-plus/';

  const tiers = [
    {
      id: 'heparbion-1', name: t('pricing.tier1.name'), bottles: 1,
      price: 36.90, originalPrice: 36.90, perBottle: '36.90', savings: 0,
      features: [t('pricing.feature.capsules1'), t('pricing.feature.formula'), t('pricing.feature.shipping'), t('pricing.feature.cert')],
      cta: t('pricing.tier1.cta'), description: t('pricing.tier1.desc'),
    },
    {
      id: 'heparbion-3', name: t('pricing.tier2.name'), bottles: 3,
      price: 94.09, originalPrice: 110.70, perBottle: '31.36', savings: 16.61,
      badge: t('pricing.tier2.badge'), popular: true,
      features: [t('pricing.feature.capsules3'), t('pricing.feature.formula'), t('pricing.feature.shippingFree'), t('pricing.feature.cert'), t('pricing.feature.support')],
      cta: t('pricing.tier2.cta'), description: t('pricing.tier2.desc'),
    },
    {
      id: 'heparbion-5', name: t('pricing.tier3.name'), bottles: 5,
      price: 138.38, originalPrice: 184.50, perBottle: '27.68', savings: 46.12,
      badge: t('pricing.tier3.badge'),
      features: [t('pricing.feature.capsules6'), t('pricing.feature.formula'), t('pricing.feature.shippingExpress'), t('pricing.feature.cert'), t('pricing.feature.support'), t('pricing.feature.guide')],
      cta: t('pricing.tier3.cta'), description: t('pricing.tier3.desc'),
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-dark" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400/70 uppercase block mb-4">{t('pricing.eyebrow')}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-elegant mb-5">
            {t('pricing.h2.1')}<span className="text-shimmer">{t('pricing.h2.shimmer')}</span>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">{t('pricing.sub')}</p>
          <div className="divider-gold w-16 mx-auto mt-8 opacity-40" />
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {tiers.map((tier, i) => (
            <div key={tier.id}
              className={`relative rounded-3xl transition-all duration-500 scroll-reveal ${cardsRevealed ? 'revealed' : ''} ${tier.popular ? 'bg-white/[0.1] border-2 border-gold-400/30 shadow-xl shadow-gold-400/5' : 'bg-white/[0.04] border border-white/[0.08]'
                }`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${tier.popular ? 'bg-gold-400 text-forest' : 'bg-white/10 text-white/70 border border-white/10'
                    }`}>
                    {tier.popular && <Star size={12} />}
                    {tier.badge}
                  </span>
                </div>
              )}
              <div className="p-7 md:p-8">
                <h3 className="font-serif text-xl font-medium text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-white/30 mb-6">{tier.description}</p>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl md:text-5xl font-bold text-white">{tier.price.toFixed(2)}</span>
                    <span className="text-sm text-white/30">EUR</span>
                  </div>
                  {tier.savings > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-white/25 line-through">{tier.originalPrice.toFixed(2)}</span>
                      <span className="text-xs font-medium text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded-full">{t('pricing.save')} {tier.savings.toFixed(2)}</span>
                    </div>
                  )}
                  <p className="text-xs text-white/25 mt-1">{tier.perBottle} {t('pricing.perBottle')}</p>
                </div>
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-2.5">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-brand/20 flex items-center justify-center mt-0.5">
                        <Check size={10} className="text-brand-300" />
                      </div>
                      <span className="text-xs text-white/50">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href={
                  language === 'slo'
                    ? `https://aleksandrakomasz-plus.com/sl/zakljucek-nakupa/?add-to-cart=1584&quantity=${tier.bottles}`
                    : `https://aleksandrakomasz-plus.com/zakljucek-nakupa/?add-to-cart=489&quantity=${tier.bottles}`
                } target="_blank" rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${tier.popular ? 'btn-glow bg-gold-400 text-forest hover:bg-gold-300' : 'btn-glow bg-white/10 text-white border border-white/10 hover:bg-white/15'
                    }`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={`flex flex-wrap justify-center gap-6 md:gap-10 mt-12 scroll-reveal ${cardsRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '500ms' }}>
          {[
            { icon: Truck, label: t('pricing.trustShipping') },
            { icon: ShieldCheck, label: t('pricing.trustPayment') },
            { icon: Package, label: t('pricing.trustReturns') },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon size={16} className="text-white/20" strokeWidth={1.5} />
              <span className="text-xs text-white/30">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
