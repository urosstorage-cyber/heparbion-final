import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Shield, FlaskConical, Leaf, Award, Globe } from 'lucide-react';

const TrustBar: React.FC = () => {
  const { ref, isRevealed } = useScrollReveal(0.2);
  const { t } = useLanguage();

  const badges = [
    { icon: Globe, label: t('trust.madeInEU'), sub: t('trust.madeInEU.sub') },
    { icon: Shield, label: t('trust.gmp'), sub: t('trust.gmp.sub') },
    { icon: Award, label: t('trust.iso'), sub: t('trust.iso.sub') },
    { icon: Leaf, label: t('trust.veg'), sub: t('trust.veg.sub') },
    { icon: FlaskConical, label: t('trust.lab'), sub: t('trust.lab.sub') },
  ];

  return (
    <section ref={ref} className="relative py-12 border-y border-foreground/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-4 md:gap-10 lg:gap-16">
          {badges.map((badge, i) => (
            <div key={i}
              className={`flex items-center gap-3 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-10 h-10 rounded-xl bg-brand/[0.06] border border-brand/[0.1] flex items-center justify-center">
                <badge.icon size={18} className="text-brand/70" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground/80 tracking-wide">{badge.label}</p>
                <p className="text-[10px] text-foreground/40">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
