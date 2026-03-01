import React, { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Droplets, Wind, Sparkles, ChevronDown, X } from 'lucide-react';

import amalakiImg from '@/assets/ingredients/amalaki.jpg';
import barberryImg from '@/assets/ingredients/barberry.jpg';
import bhumyamalakiImg from '@/assets/ingredients/bhumyamalaki.jpg';
import celerySeedImg from '@/assets/ingredients/celery.jpg';
import fenugreekImg from '@/assets/ingredients/fenugreek.jpg';
import gingerImg from '@/assets/ingredients/ginger.jpg';
import kalmeghImg from '@/assets/ingredients/kalmegh.jpg';
import haritakiImg from '@/assets/ingredients/haritaki.jpg';
import licoriceImg from '@/assets/ingredients/licorice-root.jpeg';
import turmericImg from '@/assets/ingredients/tumeric.jpg';
import productImg from '@/assets/heparbion-product-photo.jpg';

const SolutionSection: React.FC = () => {
  const { ref: titleRef, isRevealed: titleRevealed } = useScrollReveal();
  const { ref: contentRef, isRevealed: contentRevealed } = useScrollReveal(0.1);
  const { ref: ingredientRef, isRevealed: ingredientRevealed } = useScrollReveal(0.1);
  const { t, language } = useLanguage();
  const [expandedIng, setExpandedIng] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const productImages = [productImg];

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % productImages.length);
  }, [productImages.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const ingredients = [
    {
      name: language === 'slo' ? 'Kalmegha (Andrographis paniculata)' : 'Kalmegh (Andrographis paniculata)',
      detail:
        language === 'slo'
          ? `Kalmegha (Andrographis paniculata) je eno najpomembnejših grenkih zelišč v tradicionalni indijski in kitajski medicini. Glavni bioaktivni metaboliti v rastlini so diterpenski laktoni, ki so predmet obsežnih kliničnih in prekliničnih študij zaradi svojih protivnetnih, antioksidativnih in presnovnih mehanizmov delovanja. Kalmegha je povezana s spodbujanjem presnovnih fizioloških poti, ki so pomembne za uravnavanje presnove in delovanja jeter. Študije kažejo, da diterpenski laktoni delujejo kot selektivni modulanti imunskega sistema, ki lahko zmanjšujejo izražanje pro-vnetnih citokinov (npr. TNF-α, IL-6) in antimikrobni agenti proti določenim bakterijam in virusom v vitro modelih, kar lahko izboljša integriteto prebavnega trakta in zmanjša vnetne odzive. Empirične študije podpirajo njen vpliv na jetra in presnovo lipidov, vnetne in imunološke odzive ter antioksidativno zaščito celic.`
          : 'Premier Ayurvedic bitter herb rich in diterpene lactones, supporting liver metabolism, inflammatory balance, and cellular protection.',
      strength: '200mg',
      image: kalmeghImg,
    },
    {
      name: language === 'slo' ? 'Bhumyamalaki (Phyllanthus niruri)' : 'Bhumyamalaki (Phyllanthus niruri)',
      detail:
        language === 'slo'
          ? `Bhumyamalaki (Phyllanthus niruri) je v ajurvedi znana kot pomembna rastlina za podporo jetrom in sečilom, je ena najbolj raziskanih rastlin iz rodu Phyllanthus. Uporablja se v ajurvedski, siddha in tradicionalni kitajski medicini. Rastlina vsebuje bogat nabor bioaktivnih spojin, med katerimi so najpomembnejši lignani (npr. phyllanthin, hypophyllanthin), flavonoidi, tanini, fenolne kisline, alkaloidi in terpeni. Lignani, zlasti phyllanthin in hypophyllanthin, so ključne učinkovine, ki so predmet številnih farmakoloških in kliničnih raziskav zaradi svojega vpliva na delovanje jeter, protivnetne in antioksidativne aktivnosti. Raziskave kažejo, da bioaktivne spojine podpirajo hepatocitno integriteto in celično stabilnost, sodelujejo pri modulaciji jetrnih encimskih poti, vključenih v presnovo lipidov in toksinov, ter prispevajo k uravnavanju oksidativnega stresa v jetrnem tkivu. Zaradi teh lastnosti se Phyllanthus niruri pogosto vključuje v formulacije, namenjene dolgoročni podpori jetrnemu ravnovesju. Snovi v rastlini hkrati delujejo kot imunomodulatorji in prispevajo k uravnavanju kroničnih, nizkointenzivnih vnetnih procesov. Bhumyamalaki deluje antioksidativno, saj njene fenolne in flavonoidne spojine pomagajo nevtralizirati proste radikale in s tem ščitijo jetrne celice pred oksidativnimi poškodbami.`
          : 'Phyllanthus niruri extract supporting liver cell integrity, long-term hepatic balance, antioxidant protection, and gentle immune modulation.',
      strength: '150mg',
      image: bhumyamalakiImg,
    },
    {
      name: language === 'slo' ? 'Berberis / češminov koren (Berberis vulgaris)' : 'Barberry root (Berberis vulgaris)',
      detail:
        language === 'slo'
          ? `Berberis oziroma češminov koren (Berberis vulgaris) se tradicionalno uporablja v evropski fitoterapiji, ajurvedi in tradicionalni kitajski medicini, zlasti kot podpora delovanju jeter, žolča in prebavnega sistema. Rastlina vsebuje bogat nabor bioaktivnih spojin, med katerimi so najpomembnejši izoquinolinski alkaloidi, predvsem berberin, pa tudi palmatin, berbamin in jatrorhizin, ter flavonoidi in fenolne spojine. Berberin je ključna učinkovina, ki je predmet številnih farmakoloških in kliničnih raziskav zaradi svojega vpliva na uravnavanje presnove, delovanje jeter in uravnavanje vnetnih procesov. Raziskave kažejo, da berberin sodeluje pri modulaciji jetrnih encimskih poti, vključenih v presnovo lipidov in glukoze, ter podpira izločanje žolča. Poleg tega prispeva k zmanjševanju oksidativnega stresa in podpira odpornost ter dolgoživost jetrnih celic. Bioaktivne spojine v češminovem korenu izkazujejo tudi protivnetne in imunomodulacijske lastnosti, kar je pomembno pri dolgotrajnih, nizkointenzivnih presnovnih obremenitvah. Zaradi teh lastnosti se Berberis vulgaris pogosto vključuje v formulacije, namenjene dolgoročni podpori ravnovesja v jetrih in črevesju.`
          : 'Barberry root rich in berberine, traditionally used to support bile flow, lipid and glucose metabolism, and long-term liver–gut balance.',
      strength: '200mg',
      image: barberryImg,
    },
    {
      name: language === 'slo' ? 'Haritaki (Terminalia chebula)' : 'Haritaki (Terminalia chebula)',
      detail:
        language === 'slo'
          ? `Haritaki (Terminalia chebula) je sadež, ki vsebuje predvsem polifenole in tanine, ki se v raziskavah najpogosteje povezujejo z antioksidativnim delovanjem ter podporo prebavi.`
          : 'Fruit rich in polyphenols and tannins, traditionally used for antioxidant support and healthy digestion.',
      strength: '—',
      image: haritakiImg,
    },
    {
      name: language === 'slo' ? 'Amalaki (Phyllanthus emblica)' : 'Amalaki (Phyllanthus emblica)',
      detail:
        language === 'slo'
          ? `Amalaki (Phyllanthus emblica) je sadež, ki vsebuje veliko vitamina C ter polifenole in tanine, med njimi emblicanin A in B ter galno in elagno kislino. Deluje antioksidativno, vitamin C pa hkrati prispeva k normalnemu delovanju imunskega sistema in k normalni tvorbi kolagena.`
          : 'Vitamin C–rich fruit with polyphenols and tannins, offering antioxidant protection and supporting immunity and collagen formation.',
      strength: '100mg',
      image: amalakiImg,
    },
    {
      name: language === 'slo' ? 'Sladki koren (Glycyrrhiza glabra)' : 'Licorice root (Glycyrrhiza glabra)',
      detail:
        language === 'slo'
          ? `Sladki koren (Glycyrrhiza glabra) vsebuje predvsem glicirizin in flavonoide, kot sta liquiritin in glabridin, zato se tradicionalno uporablja za podporo prebavi.`
          : 'Root rich in glycyrrhizin and flavonoids, traditionally used to soothe and support digestive comfort.',
      strength: '—',
      image: licoriceImg,
    },
    {
      name: language === 'slo' ? 'Triplat / fenugreek (Trigonella foenum-graecum)' : 'Fenugreek (Trigonella foenum-graecum)',
      detail:
        language === 'slo'
          ? `Triplat oziroma fenugreek (Trigonella foenum-graecum) vsebuje topne vlaknine galaktomanane, steroidne saponine z diosgeninom, alkaloid trigonelin in aminokislino 4-hidroksiizolevcin, zato podpira prebavo in presnovo. V raziskavah se najpogosteje omenja zaradi vloge vlaknin pri počasnejšem dvigu glukoze po obroku.`
          : 'Fenugreek seed providing soluble fibers and saponins that support digestion, metabolism, and healthy post-meal glucose response.',
      strength: '—',
      image: fenugreekImg,
    },
    {
      name: language === 'slo' ? 'Kurkuma (Curcuma longa)' : 'Turmeric (Curcuma longa)',
      detail:
        language === 'slo'
          ? `Kurkuma (Curcuma longa) vsebuje kurkuminoide, predvsem kurkumin, demetoksikurkumin in bisdemetoksikurkumin, ter hlapna eterična olja, med katerimi so pomembni turmeroni. V formulo je vključena zaradi antioksidativnih in protivnetnih lastnosti.`
          : 'Turmeric root with curcuminoids and essential oils, included for its antioxidant and inflammation-balancing properties.',
      strength: '—',
      image: turmericImg,
    },
    {
      name: language === 'slo' ? 'Ingver (Zingiber officinale)' : 'Ginger (Zingiber officinale)',
      detail:
        language === 'slo'
          ? `Ingver (Zingiber officinale) vsebuje predvsem gingerole in shogaole ter zingeron, poleg tega pa eterična olja, ki mu dajejo značilen aromatičen profil. Zaradi teh rastlinskih spojin se tradicionalno uporablja za podporo prebavnemu udobju in občutku toplote, posebej kadar se po obrokih želi lažji, bolj urejen ritem.`
          : 'Warming root with gingerols and shogaols, traditionally used to support digestive comfort and post‑meal lightness.',
      strength: '100mg',
      image: gingerImg,
    },
    {
      name: language === 'slo' ? 'Seme zelene (Apium graveolens)' : 'Celery seed (Apium graveolens)',
      detail:
        language === 'slo'
          ? `Seme zelene (Apium graveolens) vsebuje eterična olja, predvsem limonen in sedanolid, ter flavonoide, zato se tradicionalno uporablja kot podpora prebavi in hitrejšemu metabolizmu. Opomba: vsebuje alergen zelene (celery).`
          : 'Celery seed with essential oils and flavonoids, traditionally used to support digestion and metabolism. Note: contains celery allergen.',
      strength: '50mg',
      image: celerySeedImg,
    },
  ];

  const principles = [
    { icon: Droplets, title: t('solution.p1.title'), desc: t('solution.p1.desc') },
    { icon: Wind, title: t('solution.p2.title'), desc: t('solution.p2.desc') },
    { icon: Sparkles, title: t('solution.p3.title'), desc: t('solution.p3.desc') },
  ];

  return (
    <section id="solution" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-20 scroll-reveal ${titleRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400/70 uppercase block mb-4">{t('solution.eyebrow')}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-elegant mb-5">
            {t('solution.h2.1')}<span className="text-shimmer">{t('solution.h2.shimmer')}</span>
          </h2>
          <p className="text-base text-white/50 max-w-2xl mx-auto leading-relaxed">{t('solution.sub')}</p>
          <div className="divider-gold w-16 mx-auto mt-8 opacity-40" />
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className={`scroll-reveal-left ${contentRevealed ? 'revealed' : ''}`}>
            <div className="space-y-8">
              {principles.map((item, i) => (
                <div key={i} className={`flex gap-5 scroll-reveal ${contentRevealed ? 'revealed' : ''}`} style={{ transitionDelay: `${(i + 1) * 150}ms` }}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <item.icon size={20} className="text-gold-400/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`flex justify-center scroll-reveal-right ${contentRevealed ? 'revealed' : ''}`}>
            <div className="relative w-[300px] md:w-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-brand/10 rounded-3xl blur-3xl scale-110" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20 aspect-[3/4]">
                {productImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Heparbion Plus product ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeSlide === idx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              {/* Slide indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? 'bg-gold-400 w-6' : 'bg-white/20'}`}
                  />
                ))}
              </div>
              <div className="absolute -top-4 -right-4 glass-dark rounded-xl px-4 py-2.5 animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-[10px] text-gold-400/60 uppercase tracking-wide">{t('solution.badge')}</p>
                <p className="text-sm font-medium text-white">120 {t('solution.capsules')}</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={ingredientRef}>
          <h3 className={`font-serif text-2xl font-medium text-white text-center mb-10 scroll-reveal ${ingredientRevealed ? 'revealed' : ''}`}>
            {t('solution.ingredients')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.map((ing, i) => (
              <div key={i}
                className={`group relative rounded-2xl bg-white/[0.04] border border-white/[0.06] overflow-hidden hover:bg-white/[0.08] hover:border-gold-400/20 transition-all duration-500 bento-item scroll-reveal ${ingredientRevealed ? 'revealed' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="h-32 overflow-hidden cursor-pointer" onClick={() => setLightboxImg(ing.image)}>
                  <img src={ing.image} alt={ing.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-serif text-base font-medium text-white group-hover:text-gold-300 transition-colors">{ing.name}</h4>
                    <span className="text-xs font-mono text-gold-400/60 bg-gold-400/[0.08] px-2 py-0.5 rounded-full">{ing.strength}</span>
                  </div>
                  <button onClick={() => setExpandedIng(expandedIng === i ? null : i)}
                    className="flex items-center gap-1 text-xs text-gold-400/70 hover:text-gold-300 transition-colors mb-1">
                    <span>{expandedIng === i ? (language === 'slo' ? 'Manj' : 'Less') : (language === 'slo' ? 'Podrobnosti' : 'Details')}</span>
                    <ChevronDown size={12} className={`transition-transform ${expandedIng === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedIng === i ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs text-white/35 leading-relaxed pt-1">{ing.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setLightboxImg(null)}>
            <X size={28} />
          </button>
          <img src={lightboxImg} alt="Ingredient detail" className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default SolutionSection;
