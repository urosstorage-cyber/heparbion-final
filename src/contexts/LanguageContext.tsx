import React, { createContext, useState, useCallback } from 'react';

export type Language = 'en' | 'slo';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.formula': 'Formula',
    'nav.clinic': 'Clinic',
    'nav.assessment': 'Assessment',
    'nav.pricing': 'Pricing',
    'nav.orderNow': 'ORDER NOW',

    // Hero
    'hero.eyebrow': 'Ayurvedic Botanical Formula',
    'hero.h1.1': 'When Your Liver Is ',
    'hero.h1.italic': 'overloaded',
    'hero.h1.2': ', Your Body Simply ',
    'hero.h1.underline': 'Holds On',
    'hero.h1.3': '\u00a0.',
    'hero.sub': 'An original botanical formula from the renowned Ayurvedic clinic of Aleksandra Komasz. A synergy of traditional bitter herbs designed for daily inner balance, without aggressive "detox" shocks.',
    'hero.cta1': 'SUPPORT YOUR LIVER',
    'hero.cta2': 'TAKE THE ASSESSMENT',
    'hero.trust1': '15% off 6-month supply',
    'hero.trust2': 'Free EU shipping over 60',
    'hero.badge1': '120 Capsules',
    'hero.badge2': '2-month supply',
    'hero.discover': 'Discover',

    // Trust Bar
    'trust.madeInEU': 'Made in EU',
    'trust.madeInEU.sub': 'European Quality',
    'trust.gmp': 'GMP Certified',
    'trust.gmp.sub': 'Pharmaceutical Grade',
    'trust.iso': 'ISO 22000',
    'trust.iso.sub': 'Food Safety',
    'trust.veg': 'Vegan',
    'trust.veg.sub': 'Suitable for Vegans',
    'trust.lab': 'Lab Tested',
    'trust.lab.sub': 'Independent Verification',

    // Pain Points
    'pain.eyebrow': 'Recognize the Signs',
    'pain.h2': 'Is Your Body Asking for Help?',
    'pain.q1': 'Do you often feel heavy or slowed down after meals?',
    'pain.d1': `In modern physiology, the liver plays a central role in nutrient metabolism, digestion, detoxification, hormone balance and overall metabolic harmony. Ayurveda views the liver through the lens of transformation and inner heat, responsible for transforming both physical substances and mental impressions. When the hepatic system is exposed to long‑term overload (heavy food, stress, lack of routine), this transformative capacity can become disturbed – and you feel it immediately in your body.

In Ayurvedic tradition, bitter herbs (tikta rasa) have a special place. They are described as plants that help regulate the heat needed for metabolism, cool and relieve the whole body, support smooth metabolic processes and assist natural detoxification.

By using bitter herbs, we can re‑align the natural rhythm and balance of liver and digestive function – which is exactly why they are at the core of the Heparbion Plus formula, designed for gentle, long‑term support of the liver and the entire digestive system.`,
    'pain.q2': 'Are hot flashes and inner heat affecting your balance, especially around menopause?',
    'pain.d2': `In Ayurveda, bitter herbs (tikta rasa) are traditionally linked to regulating liver temperature. Classical Ayurvedic pharmacology highlights Kalmegha (Andrographis paniculata) and Bhumyamalaki (Phyllanthus niruri) as two of the most effective herbs for easing hot flashes and excess heat.

Because the liver is closely connected to pitta dosha balance and to agni (the metabolic "fire" responsible for transforming substances in the body), cooling, bitter plants are often included in formulas for this purpose. Their role is not to suppress metabolism, but to regulate its intensity, so processes run more harmoniously and with less strain on the system.

Modern physiology offers a complementary explanation: bitter compounds activate bitter taste receptors (T2R) in the mouth and digestive tract, triggering reflex responses via the vagus nerve. This contributes to increased secretion of digestive juices (bile, stomach acid, enzymes) and more coordinated peristalsis, helping the body shift from stress (sympathetic) mode into a more regulated, parasympathetic "rest and digest" state.`,
    'pain.q3': 'Do you sense that your liver–gut metabolism needs more holistic support?',
    'pain.d3': `Good wellbeing starts with good digestion. Both traditional systems and modern physiology emphasise the functional connection between the gut and the liver in metabolising and absorbing nutrients. When this axis is overloaded, we may feel bloated, heavy, foggy or "stuck".

Heparbion Plus is a synergistic blend of bitter herbs traditionally used to support digestion, metabolism and detoxification that flows through both liver and intestines. By working on this gut–liver connection, the formula supports a more integrated, whole‑system metabolic balance.`,
    'pain.q4': 'Are you looking for something you can safely take long‑term, without harsh side effects?',
    'pain.d4': `Ayurvedic bitter herbs do not act aggressively on the body. Instead, they gently support natural physiological processes without forcing or blocking the body’s own regulatory mechanisms.

Unlike substances that unnaturally speed up or inhibit specific pathways, bitter herbs work through natural signalling and reflex physiological routes. Their effect is gradual, cumulative and adaptable to each individual, allowing the body to respond according to its current needs. With the right plant selection and dosing, they are generally well tolerated and suitable for daily, long‑term use.`,
    'pain.q5': 'Do you want traditional Ayurvedic wisdom translated into a simple, modern daily routine?',
    'pain.d5': `The Heparbion Plus formula follows the Ayurvedic principle of synergy: we bring together several bitter herbs into a single capsule that is easy to use every day.

“Synergistic formula” means the product does not rely on a single active compound, but on a thoughtful, research‑supported combination of medicinal plants. These are chosen so that their properties complement each other and together create a coherent whole. Beyond the active constituents, the taste and aroma that each herb contributes also matter – they are part of how the body recognises and responds to the formula.`,
    'pain.bottom': 'If you answered yes to 2 or more, your liver may benefit from targeted botanical support.',
    'pain.cta': 'Take the Clinical Assessment',

    // Solution
    'solution.eyebrow': 'The Science of Ayurveda',
    'solution.h2.1': 'The Secret is in the ',
    'solution.h2.shimmer': 'Bitters',
    'solution.sub': 'Unlike generic supplements, Heparbion Plus focuses on the "Cooling & Clearing" principle — a time-tested Ayurvedic approach to hepatic balance.',
    'solution.p1.title': 'Cooling & Clearing',
    'solution.p1.desc': 'Our bitter formula targets the liver\'s natural cooling pathways, reducing inflammatory heat and supporting bile flow for optimal digestion.',
    'solution.p2.title': 'Vagus Nerve Stimulation',
    'solution.p2.desc': 'Bitter compounds activate the vagus nerve, signaling your body to shift from "fight or flight" stress mode into "rest and digest" recovery mode.',
    'solution.p3.title': 'Synergistic Botanical Blend',
    'solution.p3.desc': 'Each ingredient is selected not just for individual potency, but for how they amplify each other\'s therapeutic effects.',
    'solution.badge': '2-month supply',
    'solution.capsules': 'Capsules',
    'solution.ingredients': 'Key Ingredients',

    // Quiz
    'quiz.eyebrow': 'Clinical Assessment',
    'quiz.h2': 'Liver Health Assessment',
    'quiz.sub': 'Answer 4 quick questions to receive a personalized analysis of your metabolic indicators.',
    'quiz.complete': 'Complete',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.back': 'Back',
    'quiz.next': 'Next',
    'quiz.seeResults': 'See Results',
    'quiz.retake': 'Retake Assessment',
    'quiz.q1': 'Do you experience a sensation of heaviness or pressure in the upper right abdomen after meals?',
    'quiz.q1a': 'Never, I feel light.',
    'quiz.q1b': 'Occasionally, especially after heavier meals.',
    'quiz.q1c': 'Frequently, it\'s a consistent discomfort.',
    'quiz.q2': 'How do you feel 30 minutes after a main meal?',
    'quiz.q2a': 'Energetic and light.',
    'quiz.q2b': 'Slightly bloated, need a short rest.',
    'quiz.q2c': 'Heavy fatigue (brain fog) and a sense of weight.',
    'quiz.q3': 'Does your body tend to retain water or feel "stagnant" despite a healthy diet?',
    'quiz.q3a': 'No, my fluid balance feels normal.',
    'quiz.q3b': 'Sometimes, especially in the evenings.',
    'quiz.q3c': 'Yes, I feel constantly "puffy" and sluggish.',
    'quiz.q4': 'How important is it for you that a supplement is independently lab-tested and verified for purity in the EU?',
    'quiz.q4a': 'It\'s a nice-to-have.',
    'quiz.q4b': 'It\'s important for my peace of mind.',
    'quiz.q4c': 'It is a non-negotiable requirement for my safety.',
    'quiz.result.high.title': 'High Metabolic Load Detected',
    'quiz.result.high.desc': 'Your system shows signs of significant metabolic burden. The patterns you describe suggest your liver could benefit from a structured, clinical-grade botanical protocol.',
    'quiz.result.high.rec': 'We recommend a 6-month Heparbion Plus protocol (3 bottles) to support hepatic recovery and bile flow.',
    'quiz.result.high.cta': 'Add 3-Bottle Bundle to Cart',
    'quiz.result.mod.title': 'Your System is Seeking Balance',
    'quiz.result.mod.desc': 'Your responses indicate moderate digestive and metabolic stress. Heparbion Plus provides the necessary bitters to maintain healthy liver function and daily digestive comfort.',
    'quiz.result.mod.rec': 'Start with a single bottle to experience the difference in your daily wellbeing.',
    'quiz.result.mod.cta': 'Add 1 Bottle to Cart',
    'quiz.result.low.title': 'Preventive Wellness',
    'quiz.result.low.desc': 'Your liver appears to be functioning well. However, proactive support with bitter botanicals can help maintain this balance, especially during periods of stress or dietary changes.',
    'quiz.result.low.rec': 'Consider Heparbion Plus as a preventive addition to your wellness routine.',
    'quiz.result.low.cta': 'Download Free E-book',

    // Clinic
    'clinic.eyebrow': 'Trust & Authority',
    'clinic.h2': 'Aleksandra Komasz Ayurveda',
    'clinic.sub': 'Rooted in 20 years of clinical Ayurvedic practice at the Health Center in Ljubljana, our formulas bridge ancient wisdom with modern pharmaceutical standards.',
    'clinic.location': 'Ljubljana, Slovenia',
    'clinic.h3': 'Where Ancient Ayurvedic Wisdom Meets Modern Clinical Precision',
    'clinic.desc': 'Every bottle of Heparbion Plus carries the expertise of Aleksandra Komasz — a practitioner who has dedicated her career to understanding the liver\'s role in holistic health. Our formula isn\'t born from a marketing brief; it\'s born from thousands of patient consultations and clinical observations.',
    'clinic.check1': 'Formulated from real clinical practice, not theoretical research alone',
    'clinic.check2': 'Used in professional Ayurvedic therapy protocols at the clinic',
    'clinic.check3': 'Each batch independently tested for purity and potency',
    'clinic.card1.title': '20 Years',
    'clinic.card1.sub': 'Clinical Practice',
    'clinic.card1.desc': 'Formulated based on two decades of hands-on clinical experience in Ayurvedic medicine.',
    'clinic.card2.title': 'Clinical-Grade',
    'clinic.card2.sub': 'Professional Formula',
    'clinic.card2.desc': 'Not just a supplement — a formula used in our professional therapeutic protocols.',
    'clinic.card3.title': 'GMP / ISO 22000',
    'clinic.card3.sub': 'Pharmaceutical Standard',
    'clinic.card3.desc': 'Produced in a pharmaceutical-grade facility with independent lab testing for purity.',
    'clinic.reviews': '511+ Reviews',

    // Pricing
    'pricing.eyebrow': 'Choose Your Protocol',
    'pricing.h2.1': 'Invest in Your ',
    'pricing.h2.shimmer': 'Liver Health',
    'pricing.sub': 'Every bundle includes free EU shipping, GMP-certified quality, and our satisfaction commitment.',
    'pricing.tier1.name': '60-Day Supply',
    'pricing.tier1.desc': 'Perfect for trying Heparbion Plus for the first time. One bottle lasts 2 months.',
    'pricing.tier1.cta': 'Start Your Journey',
    'pricing.tier2.name': '6-Month Supply',
    'pricing.tier2.desc': 'The recommended protocol for meaningful metabolic change. 3 bottles, 6 months of support.',
    'pricing.tier2.cta': 'Best for Results',
    'pricing.tier2.badge': 'Most Popular',
    'pricing.tier3.name': 'Full Year Supply',
    'pricing.tier3.desc': 'For those committed to long-term liver health. 6 bottles, 12 months of daily support.',
    'pricing.tier3.cta': 'Maximum Savings',
    'pricing.tier3.badge': 'Best Value',
    'pricing.feature.capsules1': '120 capsules (60-day supply)',
    'pricing.feature.capsules3': '360 capsules (6-month supply)',
    'pricing.feature.capsules6': '720 capsules (12-month supply)',
    'pricing.feature.formula': 'Full-spectrum botanical formula',
    'pricing.feature.shipping': 'Free shipping over €60',
    'pricing.feature.shippingFree': 'Free EU shipping included',
    'pricing.feature.shippingExpress': 'Free express EU shipping',
    'pricing.feature.cert': 'GMP & ISO 22000 certified',
    'pricing.feature.support': 'Priority customer support',
    'pricing.feature.guide': 'Exclusive wellness guide PDF',
    'pricing.save': 'Save',
    'pricing.perBottle': 'per bottle',
    'pricing.trustShipping': 'Free EU Shipping',
    'pricing.trustPayment': 'Secure Payment',
    'pricing.trustReturns': '14-Day Returns',

    // Footer
    'footer.brand.desc': 'An original Ayurvedic botanical formula for daily inner balance. Clinical-grade liver support from Ljubljana to your home.',
    'footer.nav': 'Navigate',
    'footer.nav.formula': 'Our Formula',
    'footer.nav.clinic': 'The Clinic',
    'footer.nav.assessment': 'Health Assessment',
    'footer.nav.pricing': 'Pricing',
    'footer.nav.painPoints': 'Pain Points',
    'footer.quality': 'Quality Standards',
    'footer.quality.gmp': 'GMP Certified Production',
    'footer.quality.iso': 'ISO 22000 Food Safety',
    'footer.quality.lab': 'Independent Lab Testing',
    'footer.quality.eu': 'EU Manufactured',
    'footer.quality.veg': 'Suitable for Vegans',
    'footer.quality.noSugar': 'No Sugar, Gluten Free',
    'footer.wellness': 'WELLNESS INSIGHTS',
    'footer.wellness.desc': 'Receive Ayurvedic liver health tips and exclusive offers directly to your inbox.',
    'footer.subscribe': 'Subscribe',
    'footer.subscribed': 'Subscribed!',
    'footer.emailPlaceholder': 'Your email',
    'footer.copyright': '2026 Aleksandra Komasz / Plus+. All rights reserved. Made with care in the EU.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.cookies': 'Cookie Settings',

    // Audio
    'audio.podcast': 'Podcast',
    'audio.author': 'Aleksandra Komasz',
    'audio.title': 'Ayurvedic Liver Deep-Dive',
    'audio.subtitle': 'Understanding the bitter principle in liver health',
    'audio.listen': 'Listen',

    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Explore our Heparbion Plus bundles and start your liver health journey.',
    'cart.viewBundles': 'View Bundles',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.shippingFree': 'Free',
    'cart.shippingNote': 'Free shipping on orders over 60 EUR',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.saving': "You're saving",
    'cart.onThisOrder': 'EUR on this order',
    'cart.bottle': 'bottle',
    'cart.bottles': 'bottles',
  },
  slo: {
    // Nav
    'nav.formula': 'Formula',
    'nav.clinic': 'Klinika',
    'nav.assessment': 'Ocena',
    'nav.pricing': 'Cenik',
    'nav.orderNow': 'NAROČITE ZDAJ',

    // Hero
    'hero.eyebrow': 'Ajurvedska botanična formula',
    'hero.h1.1': 'Ko So Vaša Jetra ',
    'hero.h1.italic': 'preobremenjena',
    'hero.h1.2': ', Telo Preprosto ',
    'hero.h1.underline': 'Zadržuje',
    'hero.h1.3': '\u00a0.',
    'hero.sub': 'Originalna botanična formula iz priznane ajurvedske klinike Aleksandre Komasz. Sinergija tradicionalnih grenkih zelišč, zasnovana za vsakodnevno notranje ravnovesje, brez agresivnih "detox" šokov.',
    'hero.cta1': 'PODPRITE SVOJA JETRA',
    'hero.cta2': 'OPRAVITE OCENO',
    'hero.trust1': '15% popust ob 6-mesečni zalogi',
    'hero.trust2': 'Brezplačna dostava v EU nad 60€',
    'hero.badge1': '120 kapsul',
    'hero.badge2': 'Zaloga za 2 meseca',
    'hero.discover': 'Odkrijte',

    // Trust Bar
    'trust.madeInEU': 'Izdelano v EU',
    'trust.madeInEU.sub': 'Evropska kakovost',
    'trust.gmp': 'GMP Certifikat',
    'trust.gmp.sub': 'Farmacevtski standard',
    'trust.iso': 'ISO 22000',
    'trust.iso.sub': 'Varnost hrane',
    'trust.veg': 'Vegansko',
    'trust.veg.sub': 'Primerno za vegane',
    'trust.lab': 'Skrbno testirano',
    'trust.lab.sub': 'Neodvisna verifikacija',

    // Pain Points
    'pain.eyebrow': 'Prepoznajte znake',
    'pain.h2': 'Ali vaše telo prosi za pomoč?',
    'pain.q1': 'Se pogosto počutite težke ali upočasnjene po obrokih?',
    'pain.d1': `V sodobni fiziologiji imajo jetra s svojim delovanjem osrednjo vlogo pri presnovi hranil, uravnavanju prebave, razstrupljevalnih procesih ter ravnovesju hormonov in presnove. Ajurveda delovanje jeter razume nekoliko drugače, vendar se kljub temu ujema s sodobnim znanjem iz fiziologije. Jetra so v ajurvedi povezana z načelom transformacije in toplote ter notranje dinamike teh dveh načel. Odgovorna so za transformacijo fizičnih snovi in umskih senzacij. Ko je jetrni sistem dlje časa izpostavljen prekomerni obremenitvi (npr. težja hrana, stres, pomanjkanje rutine), se učinkovita transformacija lahko poruši, kar lahko takoj občutimo na svojem telesu.

V ajurvedski tradiciji imajo grenka zelišča (tikta rasa) posebno mesto. Opisana so kot rastline, ki pomagajo regulirati toploto, ki je potrebna za presnovo, ohladijo in razbremenijo celotno telo, vplivajo na nemoteno delovanje presnovnih procesov ter podpirajo razstrupljanje telesa.

Z grenkimi zelišči lahko ponovno »ujamemo« naravni ritem in ravnotežje delovanja jeter in prebave – prav zato smo jih vključili v našo formulo Heparbion Plus, za namen dolgotrajne in nežne podpore delovanja jeter in celotne prebave.`,
    'pain.q2': 'Grenka zelišča umirjajo vročinske oblive v obdobju menopavze',
    'pain.d2': `V ajurvedi so grenka zelišča (tikta rasa) tradicionalno povezana z regulacijo temperature jeter. V klasični ajurvedski farmakologiji sta med najbolj učinkovitimi zelišči za zmanjševanje vročinskih oblivov Kalmegha (Andrographis paniculata) in Bhumyamalaki (Phyllanthus niruri).

Ker so jetra v ajurvedi tesno povezana z ravnotežjem pitta doše in z delovanjem agnija (presnovnega »ognja«), odgovornega za transformacijo snovi v telesu, se grenke, hladilne rastline s tem namenom pogosto vključujejo v tovrstne formulacije. Njihova vloga ni zaviranje presnove, temveč regulacija njene intenzivnosti, zato procesi potekajo bolj usklajeno in manj obremenjujoče za sistem.

Sodobna fiziologija ponuja dopolnilno razlago, zakaj grenke snovi delujejo na regulacijo intenzivnosti presnove. Grenki okus aktivira receptorje za grenko (T2R) v ustni votlini in prebavnem traktu, kar sproži refleksni odziv preko vagusnega živca. Ta odziv prispeva k povečanemu izločanju prebavnih sokov (žolča, želodčne kisline, encimov) in bolj usklajeni peristaltiki, telo pa tako lažje preklopi iz stresnega (simpatičnega) v bolj regulativni, parasimpatični način delovanja.`,
    'pain.q3': 'Grenka zelišča delujejo celostno na delovanje presnove v jetrih in črevesju',
    'pain.d3': `Dobro počutje se začne z dobro prebavo. Tako tradicionalni pristopi kot sodobna fiziologija poudarjajo funkcionalno povezanost med črevesjem in jetri pri presnovi in absorpciji potrebnih hranil. Ko je ta os preobremenjena, se lahko pojavljajo napihnjenost, občutek teže, meglica ali občutek »zastajanja«.

Heparbion Plus je sinergijska mešanica grenkih zelišč, ki se tradicionalno uporabljajo za podporo prebavi, presnovi in razstrupljanju, ki poteka preko jeter in črevesja. Z delovanjem na to os črevesje–jetra formula podpira bolj celostno, integrirano presnovno ravnovesje.`,
    'pain.q4': 'Grenka zelišča so primerna za dolgotrajno uporabo brez stranskih učinkov na telo',
    'pain.d4': `Ajurvedska grenka zelišča ne delujejo agresivno na naše telo, temveč nežno podpirajo naravne fiziološke procese brez poseganja v njegove notranje ravnotežne mehanizme.

Za razliko od snovi, ki nenaravno pospešujejo ali zavirajo določene fiziološke mehanizme v telesu, grenka zelišča delujejo naravno preko signalnih in refleksnih fizioloških poti. Njihov učinek je postopen, kumulativen in prilagodljiv vsakemu posamezniku, kar omogoča, da se telo nanje odziva v skladu s svojimi trenutnimi potrebami. Ob pravilni izbiri rastlin in ustreznem odmerjanju jih praviloma dobro prenašamo in so primerna za vsakodnevno jemanje.`,
    'pain.q5': 'Tradicionalna modrost, premišljeno prilagojena sodobnemu življenju',
    'pain.d5': `Formula Heparbion Plus sledi ajurvedskemu načelu sinergije, kjer smo vključili več grenkih zelišč hkrati v eno kapsulo, ki je enostavna za vsakodnevno uporabo.

Sinergijska formula pomeni, da izdelek ne vsebuje samo ene učinkovine, ampak je sestavljen iz premišljene, znanstveno podprte kombinacije zdravilnih zelišč. Te so izbrane tako, da se njihove lastnosti dopolnjujejo in skupaj ustvarijo zaokroženo celoto. Poleg zdravilnih učinkovin sta pomembna tudi okus in vonj, ki ju zdravilno zelišče prinese v mešanico – sta del tega, kako telo prepozna in integrira formulo.`,
    'pain.bottom': 'Če ste na 2 ali več vprašanj odgovorili z da, bi vaša jetra lahko imela koristi od ciljne botanične podpore.',
    'pain.cta': 'Opravite klinično oceno',

    // Solution
    'solution.eyebrow': 'Znanost ajurvede',
    'solution.h2.1': 'Skrivnost je v ',
    'solution.h2.shimmer': 'grenčinah',
    'solution.sub': 'Heparbion Plus je zeliščno prehransko dopolnilo, zasnovano kot celostna, vsakodnevna podpora zdravju, delovanju in ravnovesju vaših jeter. Skrivnost naše formule so ajurvedska tradicionalna grenka zelišča, ki podpirajo celoten gastrointestinalni trakt ter spodbujajo nežno, naravno razstrupljanje brez agresivnih šokov.',
    'solution.p1.title': 'Hlajenje in čiščenje',
    'solution.p1.desc': 'Naša grenka formula cilja na naravne hladilne poti jeter, zmanjšuje vnetno vročino in podpira pretok žolča za optimalno prebavo.',
    'solution.p2.title': 'Stimulacija vagusnega živca',
    'solution.p2.desc': 'Z aktivacijo receptorjev za grenko okus (T2R) pomaga telesu, da preklopi iz stresnega (simpatičnega) v regulativni (parasimpatični) način.',
    'solution.p3.title': 'Sinergijska botanična mešanica',
    'solution.p3.desc': 'Vsaka sestavina je izbrana ne le za individualno moč, temveč za to, kako ojača terapevtske učinke drugih sestavin.',
    'solution.badge': 'Zaloga za 2 meseca',
    'solution.capsules': 'Kapsul',
    'solution.ingredients': 'Ključne sestavine',

    // Ingredient names/details in SLO
    'ing.milkThistle': 'Pegasti badelj',
    'ing.milkThistle.detail': 'Visoka vsebnost silimarina za zaščito hepatocitov',
    'ing.artichoke': 'Artičoka',
    'ing.artichoke.detail': 'Spodbuja proizvodnjo in pretok žolča',
    'ing.dandelion': 'Regrat',
    'ing.dandelion.detail': 'Tradicionalno tonik za jetra in nežen diuretik',
    'ing.kalmegh': 'Kalmegha',
    'ing.kalmegh.detail': 'Ajurvedski "kralj grenčin" za hlajenje jeter, bogat z diterpenskimi laktoni',
    'ing.bhumyamalaki': 'Bhumyamalaki',
    'ing.bhumyamalaki.detail': 'Phyllanthus niruri za regeneracijo jeter, bogat z lignani',
    'ing.berberine': 'Berberin HCl',
    'ing.berberine.detail': 'Ekstrakt korenine Berberis vulgaris (češmin), v sinergiji podpira presnovo lipidov',

    // Quiz
    'quiz.eyebrow': 'Klinična ocena',
    'quiz.h2': 'Ocena zdravja jeter',
    'quiz.sub': 'Odgovorite na 4 hitra vprašanja za personalizirano analizo vaših presnovnih kazalcev.',
    'quiz.complete': 'Zaključeno',
    'quiz.question': 'Vprašanje',
    'quiz.of': 'od',
    'quiz.back': 'Nazaj',
    'quiz.next': 'Naprej',
    'quiz.seeResults': 'Rezultati',
    'quiz.retake': 'Ponovno opravi oceno',
    'quiz.q1': 'Ali po obrokih občutite težo ali pritisk v zgornjem desnem delu trebuha?',
    'quiz.q1a': 'Nikoli, počutim se lahkotno.',
    'quiz.q1b': 'Občasno, zlasti po težjih obrokih.',
    'quiz.q1c': 'Pogosto, je stalno neugodje.',
    'quiz.q2': 'Kako se počutite 30 minut po glavnem obroku?',
    'quiz.q2a': 'Energičen/a in lahkoten/a.',
    'quiz.q2b': 'Rahlo napihnjen/a, potrebujem kratek počitek.',
    'quiz.q2c': 'Huda utrujenost (meglica) in občutek teže.',
    'quiz.q3': 'Ali vaše telo nagiba k zadrževanju vode ali se počutite "zastarano" kljub zdravi prehrani?',
    'quiz.q3a': 'Ne, moje ravnovesje tekočin je normalno.',
    'quiz.q3b': 'Včasih, zlasti zvečer.',
    'quiz.q3c': 'Da, nenehno se počutim "nabuhlega" in počasnega.',
    'quiz.q4': 'Kako pomembno je za vas, da je prehransko dopolnilo neodvisno laboratorijsko testirano in preverjeno za čistost v EU?',
    'quiz.q4a': 'Je prijetna dodatna lastnost.',
    'quiz.q4b': 'Pomembno je za moj mir.',
    'quiz.q4c': 'To je nepogrešljiva zahteva za mojo varnost.',
    'quiz.result.high.title': 'Zaznana visoka presnovna obremenitev',
    'quiz.result.high.desc': 'Vaš sistem kaže znake pomembne presnovne obremenitve. Vzorci, ki jih opisujete, nakazujejo, da bi vaša jetra imela koristi od strukturiranega klinično kakovostnega botaničnega protokola.',
    'quiz.result.high.rec': 'Priporočamo 6-mesečni protokol Heparbion Plus (3 stekleničke) za podporo okrevanja jeter in pretoka žolča.',
    'quiz.result.high.cta': 'Dodaj 3-paket v košarico',
    'quiz.result.mod.title': 'Vaš sistem išče ravnovesje',
    'quiz.result.mod.desc': 'Vaši odgovori kažejo na zmerno prebavno in presnovno obremenitev. Heparbion Plus zagotavlja potrebne grenčine za zdravo delovanje jeter.',
    'quiz.result.mod.rec': 'Začnite z eno stekleničko in izkusite razliko.',
    'quiz.result.mod.cta': 'Dodaj 1 stekleničko v košarico',
    'quiz.result.low.title': 'Preventivno počutje',
    'quiz.result.low.desc': 'Zdi se, da vaša jetra delujejo dobro. Proaktivna podpora z grenčinami pa pomaga ohranjati to ravnovesje, zlasti v obdobjih stresa.',
    'quiz.result.low.rec': 'Razmislite o Heparbion Plus kot preventivnem dodatku vaši rutini.',
    'quiz.result.low.cta': 'Prenesi brezplačen e-priročnik',

    // Clinic
    'clinic.eyebrow': 'Zaupanje in avtoriteta',
    'clinic.h2': 'Aleksandra Komasz Ayurveda',
    'clinic.sub': 'Ni še en "white-label" izdelek. To je klinična formula, preizkušena v praksi.',
    'clinic.location': 'Ljubljana, Slovenija',
    'clinic.h3': 'Kjer se starodavna ajurvedska modrost sreča s sodobno klinično natančnostjo',
    'clinic.desc': 'Heparbion Plus ni nastal v generičnem laboratoriju. Razvila ga je Aleksandra Komasz, na podlagi več kot 20-letnih izkušenj in dela s pacienti v njeni priznani ajurvedski kliniki v Ljubljani (Poljanska 19). Medtem ko je večina dodatkov v trgovinah ustvarjenih za "hitre trende" na policah, je Heparbion Plus ista sinergijska formula, ki jo Aleksandra priporoča pacientom po celostni Panchakarma terapiji.',
    'clinic.check1': 'Zasnovana na dejanskem kliničnem razumevanju presnove',
    'clinic.check2': 'Uporabljena v profesionalnih ajurvedskih terapevtskih protokolih',
    'clinic.check3': 'Vsaka serija neodvisno testirana za čistost in moč',
    'clinic.card1.title': '20 let',
    'clinic.card1.sub': 'Klinične prakse',
    'clinic.card1.desc': 'Zasnovana na dveh desetletjih praktičnih kliničnih izkušenj v ajurvedski medicini.',
    'clinic.card2.title': 'Klinična kakovost',
    'clinic.card2.sub': 'Profesionalna formula',
    'clinic.card2.desc': 'Ni le dopolnilo — formula, ki se uporablja v naših profesionalnih terapevtskih protokolih.',
    'clinic.card3.title': 'GMP / ISO 22000',
    'clinic.card3.sub': 'Farmacevtski standard',
    'clinic.card3.desc': 'Proizvedeno v obratu farmacevtske kakovosti z neodvisnim laboratorijskim testiranjem.',
    'clinic.reviews': '511+ mnenj',

    // Pricing
    'pricing.eyebrow': 'Izberite svoj protokol',
    'pricing.h2.1': 'Investirajte v ',
    'pricing.h2.shimmer': 'zdravje jeter',
    'pricing.sub': 'Vsak paket vključuje brezplačno dostavo po EU, GMP-certificirano kakovost in naše jamstvo zadovoljstva.',
    'pricing.tier1.name': 'Zaloga za 2 meseca',
    'pricing.tier1.desc': 'Popolno za prvi preizkus Heparbion Plus. Ena steklenička zadošča za 60 dni.',
    'pricing.tier1.cta': 'Začnite svojo pot',
    'pricing.tier2.name': 'Zaloga za 6 mesecev',
    'pricing.tier2.desc': 'Priporočen protokol za smiselno presnovno spremembo. 3 stekleničke za pol leta podpore.',
    'pricing.tier2.cta': 'Najboljši za rezultate',
    'pricing.tier2.badge': 'Najbolj priljubljeno',
    'pricing.tier3.name': 'Letna zaloga',
    'pricing.tier3.desc': 'Za tiste, ki so predani dolgotrajnemu zdravju jeter. 6 stekleničk za celotno leto.',
    'pricing.tier3.cta': 'Največji prihranek',
    'pricing.tier3.badge': 'Najboljša vrednost',
    'pricing.feature.capsules1': '120 kapsul (zaloga za 60 dni)',
    'pricing.feature.capsules3': '360 kapsul (zaloga za 6 mesecev)',
    'pricing.feature.capsules6': '720 kapsul (letna zaloga)',
    'pricing.feature.formula': 'Botanična formula polnega spektra',
    'pricing.feature.shipping': 'Brezplačna dostava nad 60€',
    'pricing.feature.shippingFree': 'Brezplačna EU dostava vključena',
    'pricing.feature.shippingExpress': 'Brezplačna hitra EU dostava',
    'pricing.feature.cert': 'GMP & ISO 22000 certificirano',
    'pricing.feature.support': 'Prednostna podpora strankam',
    'pricing.feature.guide': 'Ekskluzivni vodnik za počutje (PDF)',
    'pricing.save': 'Prihranite',
    'pricing.perBottle': 'na stekleničko',
    'pricing.trustShipping': 'Brezplačna EU dostava',
    'pricing.trustPayment': 'Varno plačilo',
    'pricing.trustReturns': '14-dnevno vračilo',

    // Footer
    'footer.brand.desc': 'Originalna ajurvedska botanična formula za vsakodnevno notranje ravnovesje. Klinično kakovostna podpora jeter iz Ljubljane do vašega doma.',
    'footer.nav': 'Navigacija',
    'footer.nav.formula': 'Naša formula',
    'footer.nav.clinic': 'Klinika',
    'footer.nav.assessment': 'Ocena zdravja',
    'footer.nav.pricing': 'Cenik',
    'footer.nav.painPoints': 'Simptomi',
    'footer.quality': 'Standardi kakovosti',
    'footer.quality.gmp': 'GMP certificirana proizvodnja',
    'footer.quality.iso': 'ISO 22000 varnost hrane',
    'footer.quality.lab': 'Neodvisno laboratorijsko testiranje',
    'footer.quality.eu': 'Izdelano v EU',
    'footer.quality.veg': 'Primerno za vegane',
    'footer.quality.noSugar': 'Brez sladkorja, brez glutena',
    'footer.wellness': 'NASVETI ZA POČUTJE',
    'footer.wellness.desc': 'Prejmite ajurvedske nasvete za zdravje jeter in ekskluzivne ponudbe neposredno v vaš e-poštni predal.',
    'footer.subscribe': 'Naročite se',
    'footer.subscribed': 'Naročeno!',
    'footer.emailPlaceholder': 'Vaš email',
    'footer.copyright': '2026 Aleksandra Komasz / Plus+. Vse pravice pridržane. Izdelano z ljubeznijo v EU.',
    'footer.privacy': 'Pravilnik o zasebnosti',
    'footer.terms': 'Pogoji uporabe',
    'footer.cookies': 'Nastavitve piškotkov',

    // Audio
    'audio.podcast': 'Podcast',
    'audio.author': 'Aleksandra Komasz',
    'audio.title': 'Ajurvedski poglabljanje v jetra',
    'audio.subtitle': 'Razumevanje principa grenčin pri zdravju jeter',
    'audio.listen': 'Poslušaj',

    // Cart
    'cart.title': 'Vaša košarica',
    'cart.empty': 'Vaša košarica je prazna',
    'cart.emptyDesc': 'Raziščite naše pakete Heparbion Plus in začnite svojo pot do zdravih jeter.',
    'cart.viewBundles': 'Oglejte si pakete',
    'cart.subtotal': 'Vmesni seštevek',
    'cart.shipping': 'Dostava',
    'cart.shippingFree': 'Brezplačno',
    'cart.shippingNote': 'Brezplačna dostava pri naročilih nad 60 EUR',
    'cart.total': 'Skupaj',
    'cart.checkout': 'Nadaljuj na blagajno',
    'cart.saving': 'Prihranite',
    'cart.onThisOrder': 'EUR pri tem naročilu',
    'cart.bottle': 'steklenička',
    'cart.bottles': 'stekleničk',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'slo' : 'en'));
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || translations.en[key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
