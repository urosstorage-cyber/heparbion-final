import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/hooks/useLanguage';
import { ClipboardCheck, ArrowRight, ArrowLeft, RotateCcw, Download } from 'lucide-react';

const QuizSection: React.FC = () => {
  const { ref, isRevealed } = useScrollReveal(0.15);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const orderUrl = language === 'slo'
    ? 'https://aleksandrakomasz-plus.com/sl/izdelek/heparbion-plus/'
    : 'https://aleksandrakomasz-plus.com/product/heparbion-plus/';

  const [ebookEmail, setEbookEmail] = useState('');
  const [ebookError, setEbookError] = useState('');

  const questions = [
    { text: t('quiz.q1'), options: [{ label: t('quiz.q1a'), value: 'a' }, { label: t('quiz.q1b'), value: 'b' }, { label: t('quiz.q1c'), value: 'c' }] },
    { text: t('quiz.q2'), options: [{ label: t('quiz.q2a'), value: 'a' }, { label: t('quiz.q2b'), value: 'b' }, { label: t('quiz.q2c'), value: 'c' }] },
    { text: t('quiz.q3'), options: [{ label: t('quiz.q3a'), value: 'a' }, { label: t('quiz.q3b'), value: 'b' }, { label: t('quiz.q3c'), value: 'c' }] },
    { text: t('quiz.q4'), options: [{ label: t('quiz.q4a'), value: 'a' }, { label: t('quiz.q4b'), value: 'b' }, { label: t('quiz.q4c'), value: 'c' }] },
  ];

  type ResultKey = 'high' | 'moderate' | 'low';

  const resultsData: Record<ResultKey, { title: string; description: string; recommendation: string; cta: string; isLow?: boolean }> = {
    high: {
      title: t('quiz.result.high.title'), description: t('quiz.result.high.desc'),
      recommendation: t('quiz.result.high.rec'), cta: t('quiz.result.high.cta'),
    },
    moderate: {
      title: t('quiz.result.mod.title'), description: t('quiz.result.mod.desc'),
      recommendation: t('quiz.result.mod.rec'), cta: t('quiz.result.mod.cta'),
    },
    low: {
      title: t('quiz.result.low.title'), description: t('quiz.result.low.desc'),
      recommendation: t('quiz.result.low.rec'), cta: t('quiz.result.low.cta'), isLow: true,
    },
  };

  const handleSelect = (value: string) => setSelectedOption(value);

  const handleNext = () => {
    if (selectedOption === null) return;
    setAnswers({ ...answers, [currentQ]: selectedOption });

    // Track question answer
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_interaction', {
        'question': `q${currentQ + 1}`,
        'answer': selectedOption
      });
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(answers[currentQ + 1] || null);
    } else {
      // Track quiz completion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'quiz_interaction', {
          'question': 'completed',
          'answer': 'quiz_finished'
        });
      }
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelectedOption(answers[currentQ - 1] || null);
    }
  };

  const handleReset = () => {
    setCurrentQ(0); setAnswers({}); setShowResult(false); setSelectedOption(null);
  };

  const getResultKey = (): ResultKey => {
    const allAnswers = Object.values(answers);
    const cCount = allAnswers.filter((a) => a === 'c').length;
    const bCount = allAnswers.filter((a) => a === 'b').length;
    if (cCount >= 2) return 'high';
    if (bCount >= 2 || cCount >= 1) return 'moderate';
    return 'low';
  };

  const progress = showResult ? 100 : ((currentQ) / questions.length) * 100;
  const result = resultsData[getResultKey()];

  const legalText = language === 'slo'
    ? 'PRAVNO OBVESTILO: Ta kviz je namenjen izključno informativnim in izobraževalnim namenom. Ne zagotavlja medicinskih nasvetov ali diagnoze.'
    : 'LEGAL / ETHICAL FOOTER: This quiz is for informational and educational purposes only. It does not provide medical advice or diagnosis.';

  const handleEbookSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = ebookEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEbookError(language === 'slo' ? 'Prosimo, vnesite veljaven e-naslov.' : 'Please enter a valid email address.');
      return;
    }

    setEbookError('');

    try {
      await fetch("https://api.omnisend.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "69944699fa60d2b07675dd24-RzkWFvwc5j47dNuLlYx977dMLlTuRQjekqem4m2G36hyEQQwpL"
        },
        body: JSON.stringify({
          identifiers: [{ type: "email", id: email, channels: { email: { status: "subscribed" } } }],
          tags: ["quiz_lead", `result_${result.title.replace(/\s+/g, '_').toLowerCase()}`]
        })
      });

      const pdfUrl = language === 'slo' ? '/ebooks/heparbion-ebook-slo.pdf' : '/ebooks/heparbion-ebook-en.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = language === 'slo' ? 'heparbion-ebook-slo.pdf' : 'heparbion-ebook-en.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setEbookEmail('');
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <section id="quiz" className="relative py-24 md:py-32">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <span className="text-[10px] font-medium tracking-wide-elegant text-gold-400 uppercase block mb-4">{t('quiz.eyebrow')}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-elegant mb-4">{t('quiz.h2')}</h2>
          <p className="text-sm text-foreground/50 max-w-lg mx-auto">{t('quiz.sub')}</p>
          <div className="divider-gold w-16 mx-auto mt-6" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className={`glass-card rounded-3xl p-8 md:p-10 scroll-reveal-scale ${isRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ClipboardCheck size={16} className="text-foreground/50" />
                  <span className="text-xs text-foreground/50 font-medium">
                    {showResult ? t('quiz.complete') : `${t('quiz.question')} ${currentQ + 1} ${t('quiz.of')} ${questions.length}`}
                  </span>
                </div>
                <span className="text-xs text-foreground/30">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-foreground/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand to-brand-400 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!showResult ? (
              <>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-8 leading-snug">{questions[currentQ].text}</h3>
                <div className="space-y-3 mb-8">
                  {questions[currentQ].options.map((option, i) => (
                    <button key={i} onClick={() => handleSelect(option.value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${selectedOption === option.value
                        ? 'border-brand/30 bg-brand/[0.06] shadow-sm'
                        : 'border-foreground/[0.06] bg-white/30 hover:border-foreground/15 hover:bg-white/50'
                        }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedOption === option.value ? 'border-brand bg-brand' : 'border-foreground/20'
                          }`}>
                          {selectedOption === option.value && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className={`text-sm transition-colors ${selectedOption === option.value ? 'text-foreground font-medium' : 'text-foreground/60'
                          }`}>{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={handleBack} disabled={currentQ === 0}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentQ === 0 ? 'text-foreground/20 cursor-not-allowed' : 'text-foreground/50 hover:text-foreground'
                      }`}>
                    <ArrowLeft size={16} /> {t('quiz.back')}
                  </button>
                  <button onClick={handleNext} disabled={selectedOption === null}
                    className={`btn-glow flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${selectedOption === null ? 'bg-brand/20 text-white/50 cursor-not-allowed' : 'bg-brand text-white hover:bg-brand-600'
                      }`}>
                    {currentQ === questions.length - 1 ? t('quiz.seeResults') : t('quiz.next')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand/[0.08] flex items-center justify-center mx-auto mb-6">
                  <ClipboardCheck size={28} className="text-brand" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">{result.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed mb-4 max-w-md mx-auto">{result.description}</p>
                <p className="text-sm text-foreground/70 font-medium mb-8 max-w-md mx-auto">{result.recommendation}</p>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex w-full justify-center">
                    {result.isLow ? (
                      <div className="w-full max-w-md">
                        <form onSubmit={handleEbookSubmit} className="flex flex-row items-center w-full gap-3">
                          <input
                            type="email"
                            name="email"
                            value={ebookEmail}
                            onChange={(e) => setEbookEmail(e.target.value)}
                            required
                            placeholder={language === 'slo' ? 'Vaš email' : 'Your email'}
                            className="flex-1 px-4 py-3 rounded-full border border-foreground/15 text-sm text-foreground placeholder:text-foreground/30 bg-white/80 focus:outline-none focus:border-brand/40 transition-colors w-full"
                          />
                          <button
                            type="submit"
                            className="btn-glow px-6 py-3.5 bg-brand text-white text-sm font-medium tracking-wide rounded-full flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <Download size={16} className="opacity-70" />
                            {language === 'slo' ? 'Prenesi brezplačen e-priročnik' : 'Download Free E-book'}
                          </button>
                        </form>
                        {ebookError && (
                          <p className="mt-2 text-xs text-red-500 text-left">{ebookError}</p>
                        )}
                      </div>
                    ) : (
                      <a href={orderUrl} target="_blank" rel="noopener noreferrer"
                        className="btn-glow px-8 py-3.5 bg-brand text-white text-sm font-medium tracking-wide rounded-full flex items-center justify-center w-full sm:w-auto gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        {result.cta}
                      </a>
                    )}
                  </div>
                  <button onClick={handleReset} className="flex items-center gap-2 px-6 py-3.5 text-sm text-foreground/50 hover:text-foreground transition-colors mt-2">
                    <RotateCcw size={14} /> {t('quiz.retake')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Legal disclaimer */}
          <p className="text-sm text-foreground/50 text-center mt-6 max-w-lg mx-auto leading-relaxed">{legalText}</p>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
