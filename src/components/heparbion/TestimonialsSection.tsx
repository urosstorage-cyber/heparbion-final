import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal(0.1);
  const { language } = useLanguage();

  const title = language === 'slo' ? 'Mnenja strank' : 'What Our Clients Say';
  const eyebrow = language === 'slo' ? 'Pričevanja' : 'Testimonials';

  const testimonials = language === 'slo' ? [
    {
      text: 'Že dolgo sem imel težave z uravnavanjem presnove in prebave. Spremenil sem življenjski stil in začel jemati zelišča po Sandrinem nasvetu. Vesel sem, da lahko vzdržujem ravnovesje na naraven, neagresiven način, brez občutka teže!',
      name: 'Peter', age: '50 let', stars: 5,
    },
    {
      text: 'Po treh mesecih rednega jemanja opažam izjemno razliko v energiji in prebavi. Končno sem našla izdelek, ki dejansko deluje brez stranskih učinkov.',
      name: 'Mojca', age: '43 let', stars: 5,
    },
    {
      text: 'Kot profesionalec pod stresom sem iskal naravno rešitev. Heparbion Plus mi je pomagal pri popoldanskih padcih energije in napihnjenosti po obrokih.',
      name: 'Marko', age: '38 let', stars: 5,
    },
  ] : [
    {
      text: 'I had long struggled with regulating my metabolism and digestion. I changed my lifestyle and started taking herbs on Sandra\'s advice. I\'m glad I can maintain balance naturally, without feeling heavy!',
      name: 'Peter', age: '50 years', stars: 5,
    },
    {
      text: 'After three months of regular use, I notice an incredible difference in energy and digestion. I finally found a product that actually works without side effects.',
      name: 'Mojca', age: '43 years', stars: 5,
    },
    {
      text: 'As a stressed professional, I was looking for a natural solution. Heparbion Plus helped me with afternoon energy crashes and post-meal bloating.',
      name: 'Marko', age: '38 years', stars: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-16 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400 uppercase block mb-4">{eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-elegant">{title}</h2>
          <div className="divider-gold w-16 mx-auto mt-6" />
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {/* Mobile slider (single card) */}
          <div className="block md:hidden">
            <div
              className={`glass-card rounded-2xl p-7 scroll-reveal ${gridRevealed ? 'revealed' : ''}`}
            >
              <Quote size={24} className="text-gold-400/30 mb-4" />
              <p className="text-sm text-foreground/60 leading-relaxed mb-6 italic">
                "{testimonials[activeIndex].text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonials[activeIndex].stars }).map((_, si) => (
                  <Star key={si} size={14} className="text-gold-400 fill-gold-400" />
                ))}
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground">
                  {testimonials[activeIndex].name}
                </p>
                <p className="text-xs text-foreground/40">
                  {testimonials[activeIndex].age}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrev}
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  ‹ {language === 'slo' ? 'Prejšnje mnenje' : 'Previous'}
                </button>
                <div className="flex items-center gap-1">
                  {testimonials.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i === activeIndex ? 'bg-gold-400' : 'bg-foreground/15'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  {language === 'slo' ? 'Naslednje mnenje' : 'Next'} ›
                </button>
              </div>
            </div>
          </div>

          {/* Desktop grid (three cards) */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 col-span-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`glass-card rounded-2xl p-7 scroll-reveal ${gridRevealed ? 'revealed' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <Quote size={24} className="text-gold-400/30 mb-4" />
                <p className="text-sm text-foreground/60 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={14} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-foreground/40">{t.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
