import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Play, Pause, X, Volume2 } from 'lucide-react';

const AudioWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev + 0.5;
        });
      }, 300);
    }
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      {isExpanded ? (
        <div className="glass-card rounded-2xl p-5 w-72 shadow-xl animate-reveal-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.08] flex items-center justify-center">
                <Volume2 size={14} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-500">{t('audio.podcast')}</p>
                <p className="text-[10px] text-emerald-500/40">{t('audio.author')}</p>
              </div>
            </div>
            <button onClick={() => setIsExpanded(false)} className="p-1.5 rounded-lg hover:bg-emerald-500/5 transition-colors">
              <X size={14} className="text-emerald-500/40" />
            </button>
          </div>
          <p className="text-sm font-serif font-medium text-emerald-500 mb-1">{t('audio.title')}</p>
          <p className="text-[10px] text-emerald-500/40 mb-4">{t('audio.subtitle')}</p>
          <div className="flex items-end justify-center gap-[3px] h-8 mb-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={`w-[3px] rounded-full transition-all duration-300 ${isPlaying ? 'bg-gold-400' : 'bg-emerald-500/15'}`}
                style={{ height: isPlaying ? `${Math.max(4, Math.random() * 32)}px` : `${Math.max(4, Math.sin(i * 0.5) * 12 + 12)}px`, transition: isPlaying ? 'height 0.3s ease' : 'height 0.5s ease' }} />
            ))}
          </div>
          <div className="mb-3">
            <div className="h-1 bg-emerald-500/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-gold-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-emerald-500/30">{Math.floor(progress * 0.18)}:{String(Math.floor((progress * 0.18 * 60) % 60)).padStart(2, '0')}</span>
              <span className="text-[9px] text-emerald-500/30">18:00</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsExpanded(true)} className="glass-card rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/[0.08] flex items-center justify-center group-hover:bg-emerald-500/[0.12] transition-colors">
            <Volume2 size={18} className="text-emerald-500" />
          </div>
          <div className="pr-2">
            <p className="text-xs font-medium text-emerald-500">{t('audio.listen')}</p>
            <div className="flex items-end gap-[2px] h-3 mt-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="wave-bar" style={{ height: `${Math.max(3, Math.sin(i * 0.8) * 8 + 8)}px`, animationPlayState: 'running' }} />
              ))}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default AudioWidget;
