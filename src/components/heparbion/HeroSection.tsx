import React, { useEffect, useState } from 'react';
import { useParallax } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowDown, Leaf } from 'lucide-react';

import heroImage from '@/assets/naslovna-slika.png';

const PRODUCT_IMG = heroImage;
const HeroSection: React.FC = () => {
  const parallaxRef = useParallax();
  const [loaded, setLoaded] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-hero bg-cream-100" />
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-3xl" />
      <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-gold-400/[0.04] blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className={`flex items-center gap-2 mb-6 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Leaf size={14} className="text-gold-400" />
              <span className={`text-xs font-medium tracking-wide-elegant text-foreground/50 ${language === 'slo' ? '' : 'uppercase'}`}>{t('hero.eyebrow')}</span>
            </div>

            <h1 className={`font-serif text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-semibold leading-[1.1] text-foreground mb-6 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('hero.h1.1')}
              <span className="italic text-brand">{t('hero.h1.italic')}</span>
              {t('hero.h1.2')}
              <span className="relative inline-block">
                {t('hero.h1.underline')}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-400/60" />
              </span>
              {t('hero.h1.3')}
            </h1>

            <p className={`text-base md:text-lg text-foreground/55 leading-relaxed max-w-xl mb-8 transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('hero.sub')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 mb-10 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={() => scrollTo('solution')}
                className="btn-glow px-8 py-4 bg-brand text-white font-medium text-sm tracking-wide rounded-full hover:bg-brand-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>{t('hero.cta1')}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={() => scrollTo('quiz')}
                className="px-8 py-4 border border-foreground/15 text-foreground font-medium text-sm tracking-wide rounded-full hover:border-foreground/30 hover:bg-foreground/[0.03] transition-all duration-300">
                {t('hero.cta2')}
              </button>
            </div>

            <div className={`flex items-center gap-3 text-xs text-foreground/40 transition-all duration-700 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="font-medium">{t('hero.trust1')}</span>
              <span className="w-1 h-1 rounded-full bg-gold-400/40" />
              <span>{t('hero.trust2')}</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div ref={parallaxRef} className={`relative transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-gold-400/5 rounded-full blur-3xl scale-110" />
              <div className="parallax-float relative">
                <img src={PRODUCT_IMG} alt="Heparbion Plus - Premium Ayurvedic Liver Support" className="w-[280px] md:w-[360px] lg:w-[420px] h-auto drop-shadow-2xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 animate-float-slow" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <Leaf size={14} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/50 uppercase tracking-wide">{t('hero.badge2')}</p>
                    <p className="text-xs font-semibold text-foreground">{t('hero.badge1')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[10px] tracking-wide-elegant text-foreground/30 uppercase">{t('hero.discover')}</span>
          <ArrowDown size={16} className="text-foreground/30 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
