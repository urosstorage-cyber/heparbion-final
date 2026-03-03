import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Mail, MapPin } from 'lucide-react';
import logoImg from '@/assets/aleksandra_komasz_plus_logo.svg';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const currentEmail = email.trim();
      try {
        await fetch("https://api.omnisend.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "69944699fa60d2b07675dd24-RzkWFvwc5j47dNuLlYx977dMLlTuRQjekqem4m2G36hyEQQwpL"
          },
          body: JSON.stringify({
            identifiers: [{ type: "email", id: currentEmail, channels: { email: { status: "subscribed" } } }],
            tags: ["newsletter_footer"]
          })
        });
      } catch (err) {
        console.error('Subscription failed', err);
      }
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: t('footer.nav.formula'), id: 'solution' },
    { label: t('footer.nav.clinic'), id: 'clinic' },
    { label: t('footer.nav.assessment'), id: 'quiz' },
    { label: t('footer.nav.pricing'), id: 'pricing' },
    { label: t('footer.nav.painPoints'), id: 'pain-points' },
  ];

  const qualityItems = [
    t('footer.quality.gmp'), t('footer.quality.iso'), t('footer.quality.lab'),
    t('footer.quality.eu'), t('footer.quality.veg'), t('footer.quality.noSugar'),
  ];


  return (
    <footer className="relative bg-forest text-white overflow-hidden">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImg} alt="Aleksandra Komasz Plus" className="h-12 w-auto object-contain brightness-0 invert opacity-80" />
            </div>
            <p className="text-sm text-white/35 leading-relaxed mb-6">{t('footer.brand.desc')}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <MapPin size={12} />
                <a href={language === 'slo' ? 'https://aleksandrakomasz-plus.com/sl/o-nas/' : 'https://aleksandrakomasz-plus.com/about-us/'} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Ayurvedic Health Center, Ljubljana
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <Mail size={12} />
                <a href="mailto:info@aleksandrakomasz-plus.com" className="hover:text-white transition-colors">
                  info@aleksandrakomasz-plus.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wide-elegant text-white/60 uppercase mb-5">{t('footer.nav')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollTo(link.id)} className="text-sm text-white/35 hover:text-gold-400 transition-colors duration-300">{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wide-elegant text-white/60 uppercase mb-5">{t('footer.quality')}</h4>
            <ul className="space-y-3">
              {qualityItems.map((item, i) => (
                <li key={i} className="text-sm text-white/35">{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wide-elegant text-white/60 uppercase mb-5">{t('footer.wellness')}</h4>
            <p className="text-sm text-white/35 mb-4">{t('footer.wellness.desc')}</p>
            <form onSubmit={handleSubscribe} className="relative mt-4">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-full px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold-400/50 transition-colors pr-24"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-gold-400 text-forest text-xs font-medium rounded-full hover:bg-[#E2C76A] transition-colors"
              >
                {isSubscribed ? t('footer.subscribed') : t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="h-[1px] bg-white/[0.06] mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            {[t('footer.privacy'), t('footer.terms'), t('footer.cookies')].map((link, i) => (
              <button key={i} onClick={() => { }} className="text-xs text-white/20 hover:text-white/40 transition-colors">{link}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
