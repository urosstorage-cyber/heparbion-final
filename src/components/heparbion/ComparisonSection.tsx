import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { Check, X as XIcon, Minus } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const { ref, isRevealed } = useScrollReveal(0.1);
  const { language } = useLanguage();

  const title = language === 'slo' ? 'Kako se Heparbion Plus primerja z ostalimi izdelki na trgu' : 'How Heparbion Plus Compares to Other Products on the Market';
  const eyebrow = language === 'slo' ? 'Primerjalna tabela' : 'Comparison Table';
  const subtitle = language === 'slo'
    ? 'Kako se Heparbion Plus uvršča v širšo sliko?'
    : 'How Heparbion Plus fits into the bigger picture?';
  const intro = language === 'slo'
    ? 'Na trgu je veliko izdelkov z oznako "detox" ali "podpora jetrom". Niso vsi zasnovani z enako filozofijo. Spodaj je splošna primerjava, ki vam pomaga razumeti razlike.'
    : 'There are many products labeled as "detox" or "liver support". They are not all designed with the same philosophy. Below is a general comparison to help you understand the differences.';

  const categories = language === 'slo' ? [
    {
      label: 'Osredotočenost na osnovno ravnovesje',
      hep: 'Zasnovan okoli ravnovesja jeter in črevesja ter dolgoročne presnovne stabilnosti',
      detox: 'Pogosto osredotočeni na kratkoročno izgubo vode namesto na osnovno ravnovesje',
      juice: 'Običajno kratkoročni, omejevalni in težko vključljivi v vsakodnevno življenje',
      generic: 'Lahko podpirajo splošno delovanje jeter, a pogosto brez celostnega okvira',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Grenka zelišča in filozofija podpore žolču',
      hep: 'Zgrajen okoli grenkih ajurvedskih zelišč, tradicionalno povezanih z ravnovesjem',
      detox: 'Pogosto zanašanje na odvajalne ali diuretične učinke',
      juice: 'Običajno malo grenkih spojin in zdravih maščob',
      generic: 'Lahko vključujejo posamezne sestavine brez sinergijske formulacije',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Vsakodnevna uporaba in združljivost z življenjskim slogom',
      hep: 'Zasnovan za dosledno vsakodnevno uporabo brez stimulansov',
      detox: 'Pogosto niso primerni za dolgotrajno uporabo',
      juice: 'Nadomeščajo obroke in motijo rutino',
      generic: 'Zelo različno; pogosto niso pozicionirani kot del širše rutine',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Pristop in namen',
      hep: 'Navdihnjen z ajurvedsko tradicijo in prilagojen sodobnemu življenju',
      detox: 'Trendno, kozmetično pozicioniranje',
      juice: 'Mentaliteta kratkoročnega "reseta"',
      generic: 'Pogosto enosestavinski ali neosredotočeni pripravki',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Primernost za vsakdan',
      hep: 'Deluje ob obrokih, delu, potovanjih in družabnem življenju',
      detox: 'Lahko povzročijo nelagodje ali nujnost',
      juice: 'Težko vzdrževati z vsakodnevnimi obveznostmi',
      generic: 'Pogosto uporabljeni brez vodstva ali izobraževanja',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
  ] : [
    {
      label: 'Focus on underlying balance',
      hep: 'Designed around liver–gut balance and long-term metabolic steadiness',
      detox: 'Often focus on short-term water loss rather than underlying balance',
      juice: 'Typically short-term, restrictive, and difficult to integrate into daily life',
      generic: 'May support general liver function but often lack a holistic framework',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Bitter botanicals & bile support philosophy',
      hep: 'Built around bitter Ayurvedic herbs traditionally associated with balance',
      detox: 'Often rely on laxative or diuretic effects',
      juice: 'Usually low in bitter compounds and healthy fats',
      generic: 'May include individual ingredients without synergistic formulation',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Daily use & lifestyle compatibility',
      hep: 'Designed for consistent daily use without stimulants',
      detox: 'Often not suitable for long-term use',
      juice: 'Replace meals and disrupt routine',
      generic: 'Varies widely; often not positioned as part of a broader routine',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Approach & intention',
      hep: 'Inspired by Ayurvedic tradition and adapted to modern life',
      detox: 'Trend-driven, cosmetic positioning',
      juice: 'Short-term reset mentality',
      generic: 'Often single-ingredient or unfocused blends',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
    {
      label: 'Real-world fit',
      hep: 'Works alongside meals, work, travel, and social life',
      detox: 'May cause discomfort or urgency',
      juice: 'Difficult to maintain with everyday responsibilities',
      generic: 'Often used without guidance or education',
      hepVal: true, detoxVal: false, juiceVal: false, genericVal: 'partial',
    },
  ];

  const colHeaders = language === 'slo'
    ? ['Heparbion Plus', 'Detox čaji', 'Sokovi za čiščenje', 'Generični dodatki']
    : ['Heparbion Plus', 'Detox Teas', 'Juice Cleanses', 'Generic Supplements'];

  const renderIcon = (val: boolean | string) => {
    if (val === true) return <Check size={16} className="text-brand" />;
    if (val === 'partial') return <Minus size={16} className="text-gold-400" />;
    return <XIcon size={16} className="text-foreground/20" />;
  };

  const closingLine = language === 'slo'
    ? 'Heparbion Plus ni za ekstreme. Gre za stalno podporo, tradicionalno modrost in vsakodnevno integracijo. Heparbion Plus ni namenjen ekstremno hitrim rešitvam.'
    : 'Heparbion Plus is not about extremes. It is about steady support, traditional wisdom, and daily integration. Heparbion Plus is not intended for extreme quick fixes.';

  const ctaTitle = language === 'slo' ? 'Pripravljeni začeti stalnejšo rutino?' : 'Ready to begin a steadier routine?';
  const ctaBtn = language === 'slo' ? 'Začnite' : 'Get Started';
  const ctaSub = language === 'slo' ? 'Ali opravite kviz ravnovesja, če niste prepričani →' : 'Or take the balance quiz if you\'re unsure →';

  const orderUrl = language === 'slo'
    ? 'https://aleksandrakomasz-plus.com/sl/izdelek/heparbion-plus/'
    : 'https://aleksandrakomasz-plus.com/product/heparbion-plus/';

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-dark" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400/70 uppercase block mb-4">{eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white tracking-elegant mb-3">{title}</h2>
          <p className="font-serif text-lg text-white/60 mb-4">{subtitle}</p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto leading-relaxed">{intro}</p>
          <div className="divider-gold w-16 mx-auto mt-6 opacity-40" />
        </div>

        {/* Mobile: card-based layout; Desktop: table */}
        <div className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr>
                  <th className="text-left text-xs text-white/30 font-medium pb-4 pr-4 w-[22%]"></th>
                  {colHeaders.map((h, i) => (
                    <th key={i} className={`text-center text-xs font-semibold pb-4 px-3 ${i === 0 ? 'text-brand' : 'text-white/40'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, i) => (
                  <tr key={i} className="border-t border-white/[0.06]">
                    <td className="text-sm text-white/60 py-5 pr-4 font-medium">{cat.label}</td>
                    <td className="py-5 px-3">
                      <div className="flex flex-col items-center gap-1.5">
                        {renderIcon(cat.hepVal)}
                        <span className="text-[11px] text-white/40 text-center leading-tight">{cat.hep}</span>
                      </div>
                    </td>
                    <td className="py-5 px-3">
                      <div className="flex flex-col items-center gap-1.5">
                        {renderIcon(cat.detoxVal)}
                        <span className="text-[11px] text-white/30 text-center leading-tight">{cat.detox}</span>
                      </div>
                    </td>
                    <td className="py-5 px-3">
                      <div className="flex flex-col items-center gap-1.5">
                        {renderIcon(cat.juiceVal)}
                        <span className="text-[11px] text-white/30 text-center leading-tight">{cat.juice}</span>
                      </div>
                    </td>
                    <td className="py-5 px-3">
                      <div className="flex flex-col items-center gap-1.5">
                        {renderIcon(cat.genericVal)}
                        <span className="text-[11px] text-white/30 text-center leading-tight">{cat.generic}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {categories.map((cat, i) => (
              <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-5">
                <h4 className="font-serif text-sm font-medium text-white mb-4">{cat.label}</h4>
                <div className="space-y-3">
                  {[
                    { name: colHeaders[0], val: cat.hepVal, desc: cat.hep },
                    { name: colHeaders[1], val: cat.detoxVal, desc: cat.detox },
                    { name: colHeaders[2], val: cat.juiceVal, desc: cat.juice },
                    { name: colHeaders[3], val: cat.genericVal, desc: cat.generic },
                  ].map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="mt-0.5">{renderIcon(item.val)}</div>
                      <div>
                        <span className={`text-xs font-medium ${j === 0 ? 'text-brand' : 'text-white/50'}`}>{item.name}</span>
                        <p className="text-[11px] text-white/30 leading-tight mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <div className={`text-center mt-12 scroll-reveal ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '400ms' }}>
          <p className="text-sm md:text-base text-white/50 italic max-w-2xl mx-auto leading-relaxed">{closingLine}</p>
        </div>

        {/* CTA */}
        <div className={`text-center mt-10 scroll-reveal ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '500ms' }}>
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-6">{ctaTitle}</h3>
          <a href={orderUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 rounded-xl bg-brand text-white font-medium text-sm tracking-wide hover:bg-brand/90 transition-colors shadow-lg shadow-brand/20 mb-4">
            {ctaBtn}
          </a>
          <p className="text-xs text-gold-400/70 cursor-pointer hover:text-gold-300 transition-colors"
            onClick={() => { const el = document.getElementById('quiz'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
            {ctaSub}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
