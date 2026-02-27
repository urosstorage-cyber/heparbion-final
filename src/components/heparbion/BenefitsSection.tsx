import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Activity, Heart, Sparkles, Droplets, Brain, Flame, Shield, Leaf } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal(0.1);
  const { language } = useLanguage();

  const title = language === 'slo' ? 'Prednosti podpore jetrom in prebavilom' : 'Benefits of Liver & Gut Support';
  const eyebrow = language === 'slo' ? '8 ključnih prednosti' : '8 Key Benefits';

  const benefits = language === 'slo' ? [
    { icon: Activity, title: 'Podpora presnovi', desc: 'Spodbuja naravne presnovne poti za učinkovito predelavo hranil.' },
    { icon: Heart, title: 'Zdravi biomerkerji', desc: 'Podpira zdrave ravni lipidov in jetrnih encimov.' },
    { icon: Sparkles, title: 'Videz kože', desc: 'Čistejša jetra se pogosto odražajo v svetlejši, bolj zdrav videz kože.' },
    { icon: Droplets, title: 'Pretok žolča', desc: 'Spodbuja naravno izločanje žolča za boljšo prebavo maščob.' },
    { icon: Brain, title: 'Mentalna jasnost', desc: 'Zmanjšuje "možgansko meglico" z razbremenjevanjem presnovnih poti.' },
    { icon: Flame, title: 'Energija in vitalnost', desc: 'Podpira stalni tok energije brez popoldanskih padcev.' },
    { icon: Shield, title: 'Celična zaščita', desc: 'Antioksidanti ščitijo hepatocite pred oksidativnim stresom.' },
    { icon: Leaf, title: 'Prebavno ravnovesje', desc: 'Sinergija zelišč podpira celostno prebavno udobje.' },
  ] : [
    { icon: Activity, title: 'Metabolic Support', desc: 'Promotes natural metabolic pathways for efficient nutrient processing.' },
    { icon: Heart, title: 'Healthy Biomarkers', desc: 'Supports healthy lipid levels and liver enzyme balance.' },
    { icon: Sparkles, title: 'Skin Appearance', desc: 'A cleaner liver often reflects in brighter, healthier-looking skin.' },
    { icon: Droplets, title: 'Bile Flow', desc: 'Encourages natural bile secretion for better fat digestion.' },
    { icon: Brain, title: 'Mental Clarity', desc: 'Reduces "brain fog" by relieving metabolic load.' },
    { icon: Flame, title: 'Energy & Vitality', desc: 'Supports steady energy without afternoon crashes.' },
    { icon: Shield, title: 'Cellular Protection', desc: 'Antioxidants protect hepatocytes from oxidative stress.' },
    { icon: Leaf, title: 'Digestive Balance', desc: 'Botanical synergy supports holistic digestive comfort.' },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400 uppercase block mb-4">{eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-elegant">{title}</h2>
          <div className="divider-gold w-16 mx-auto mt-6" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <div key={i}
              className={`glass-card rounded-2xl p-6 bento-item scroll-reveal ${gridRevealed ? 'revealed' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="w-11 h-11 rounded-xl bg-brand/[0.06] flex items-center justify-center mb-4">
                <b.icon size={20} className="text-brand/70" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-base font-medium text-foreground mb-2">{b.title}</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
