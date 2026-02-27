import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import logoImg from '@/assets/aleksandra_komasz_plus_logo.svg';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: t('nav.formula'), id: 'solution' },
    { label: t('nav.clinic'), id: 'clinic' },
    { label: t('nav.assessment'), id: 'quiz' },
    { label: t('nav.pricing'), id: 'pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
          <img src={logoImg} alt="Aleksandra Komasz Plus" className="h-10 md:h-12 w-auto object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              className="text-sm font-medium tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-300 relative group">
              {link.label.toUpperCase()}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center bg-foreground/[0.04] border border-foreground/[0.08] rounded-full p-0.5">
            <button onClick={() => setLanguage('slo')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 ${language === 'slo' ? 'bg-brand text-white shadow-sm' : 'text-foreground/50 hover:text-foreground'}`}>
              SLO
            </button>
            <button onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 ${language === 'en' ? 'bg-brand text-white shadow-sm' : 'text-foreground/50 hover:text-foreground'}`}>
              EN
            </button>
          </div>
          <button
            onClick={() => scrollTo('pricing')}
            className="btn-glow relative px-6 py-2.5 bg-brand text-white text-sm font-medium tracking-wide rounded-full hover:bg-brand-600 transition-all duration-300"
          >
            {t('nav.orderNow')}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setLanguage(language === 'en' ? 'slo' : 'en')}
            className="px-2 py-1 rounded-lg bg-foreground/[0.06] text-[10px] font-bold text-foreground/70 tracking-wide">
            {language === 'en' ? 'SLO' : 'EN'}
          </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-6 animate-reveal-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="text-left text-base font-medium tracking-wide text-foreground/80 hover:text-foreground py-2 border-b border-foreground/5">
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('pricing')}
              className="mt-2 w-full py-3 bg-brand text-white text-sm font-medium tracking-wide rounded-full text-center block"
            >
              {t('nav.orderNow')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
