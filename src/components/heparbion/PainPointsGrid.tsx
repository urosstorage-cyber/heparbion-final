import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { ChevronDown } from 'lucide-react';

import liverBalanceImg from '@/assets/heavy-or-bloated.png';
import bitterHerbsImg from '@/assets/energy-crashing.png';
import gutLiverImg from '@/assets/metabolism-sluggish.png';
import dailyRitualImg from '@/assets/painpoints/daily-ritual.jpg';
import traditionalWisdomImg from '@/assets/unrefreshed.png';

const PainPointsGrid: React.FC = () => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal(0.1);
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  const images = [liverBalanceImg, bitterHerbsImg, gutLiverImg, dailyRitualImg, traditionalWisdomImg];

  const sloTitles = [
    'Regulacija in podpora delovanju jeter',
    'Grenka zelišča umirjajo vročinske oblive v obdobju menopavze',
    'Grenka zelišča delujejo celostno na delovanje presnove v jetrih in črevesju',
    'Grenka zelišča so primerna za dolgotrajno uporabo brez stranskih učinkov na telo',
    'Tradicionalna modrost, premišljeno prilagojena sodobnemu življenju',
  ];

  const enTitles = [
    'The liver is central to balance',
    'Bitter herbs are traditionally associated with menopausal balance',
    'The gut–liver relationship works holistically',
    'A daily ritual designed for long-term use without side effects',
    'Traditional wisdom thoughtfully adapted to modern life',
  ];

  const painPoints = [
    { question: t('pain.q1'), detail: t('pain.d1'), span: 'md:col-span-2 md:row-span-1', image: images[0], subtitle: language === 'slo' ? sloTitles[0] : enTitles[0] },
    { question: t('pain.q2'), detail: t('pain.d2'), span: 'md:col-span-1 md:row-span-2', image: images[1], subtitle: language === 'slo' ? sloTitles[1] : enTitles[1] },
    { question: t('pain.q3'), detail: t('pain.d3'), span: 'md:col-span-1 md:row-span-1', image: images[2], subtitle: language === 'slo' ? sloTitles[2] : enTitles[2] },
    { question: t('pain.q4'), detail: t('pain.d4'), span: 'md:col-span-1 md:row-span-1', image: images[3], subtitle: language === 'slo' ? sloTitles[3] : enTitles[3] },
    { question: t('pain.q5'), detail: t('pain.d5'), span: 'md:col-span-2 md:row-span-1', image: images[4], subtitle: language === 'slo' ? sloTitles[4] : enTitles[4] },
  ];

  const sectionTitle = language === 'slo'
    ? '5 razlogov, zakaj so ajurvedska grenka zelišča tako pomembna za jetra in črevesje'
    : '5 Reasons Why Ayurvedic Bitter Herbs Matter for Your Liver & Gut';

  return (
    <section id="pain-points" className="relative py-24 md:py-32">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400 uppercase block mb-4">{t('pain.eyebrow')}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-elegant mb-4">{sectionTitle}</h2>
          <div className="divider-gold w-16 mx-auto mt-6" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {painPoints.map((point, i) => (
            <div key={i}
              className={`${point.span} glass-card rounded-2xl overflow-hidden bento-item scroll-reveal ${gridRevealed ? 'revealed' : ''} cursor-pointer`}
              style={{ transitionDelay: `${i * 120}ms` }}
              onClick={() => setExpanded(expanded === i ? null : i)}>
              {/* Image */}
              <div className="h-36 md:h-44 overflow-hidden">
                <img src={point.image} alt={point.subtitle} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-[11px] font-medium text-brand/60 uppercase tracking-wide mb-2">{point.subtitle}</p>
                <h3 className="font-serif text-lg md:text-xl font-medium text-foreground mb-3 leading-snug">{point.question}</h3>
                <div className="flex items-center gap-1 text-xs text-brand font-medium mb-2">
                  <span>{expanded === i ? (language === 'slo' ? 'Manj' : 'Less') : (language === 'slo' ? 'Podrobnosti' : 'Details')}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${expanded === i ? 'rotate-180' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-500 ${expanded === i ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-foreground/50 leading-relaxed pt-2">{point.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA before Solution section */}
        <div className={`text-center mt-12 scroll-reveal ${gridRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-base md:text-lg font-semibold text-brand/80 mb-4">{t('pain.bottom')}</p>
          <button onClick={() => { const el = document.getElementById('quiz'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-sm font-medium text-gold-400 hover:text-gold-500 transition-colors">
            {t('pain.cta')}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="mt-8">
            <button
              onClick={() => { const el = document.getElementById('solution'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="btn-glow px-8 py-4 bg-brand text-white font-medium text-sm tracking-wide rounded-full hover:bg-brand-600 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <span>{t('hero.cta1')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsGrid;
