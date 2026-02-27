import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Shield } from 'lucide-react';

const MegadoseSection: React.FC = () => {
  const { ref, isRevealed } = useScrollReveal(0.15);
  const { language } = useLanguage();

  const title = language === 'slo' ? 'Zakaj ni megadoz' : 'Why There Are No Megadoses';
  const eyebrow = language === 'slo' ? 'Filozofija formule' : 'Formula Philosophy';
  const content = language === 'slo'
    ? 'Heparbion Plus ne vsebuje megadoz posameznih izoliranih snovi. Namesto agresivnih visokih odmerkov ponujamo sinergijo zelišč — ingver, sladki koren, amalaki in druge — ki so zasnovana prav za varno, vsakodnevno in dolgoročno rutino. Ajurvedska tradicija in sodobna znanost se strinjata: prava moč je v uravnoteženi kombinaciji, ne v ekstremnih količinah posamezne sestavine.'
    : 'Heparbion Plus doesn\'t contain megadoses of isolated compounds. Instead of aggressive high doses, we offer a synergy of herbs — ginger, licorice root, amalaki and more — designed for safe, daily, long-term use. Ayurvedic tradition and modern science agree: true power lies in balanced combination, not extreme quantities of a single ingredient.';

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`glass-card rounded-3xl p-8 md:p-12 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand/[0.08] flex items-center justify-center">
              <Shield size={22} className="text-brand" strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400 uppercase block">{eyebrow}</span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-foreground/55 leading-relaxed">{content}</p>
        </div>
      </div>
    </section>
  );
};

export default MegadoseSection;
