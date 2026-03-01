import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Play, Pause, X, Volume2, RotateCcw, RotateCw } from 'lucide-react';

const AudioWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Reveal after a few seconds
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // We'll rely mostly on React synthetic events on the <audio> element to fix the duration/seconds issues,
    // but keep a fallback check.
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleListenClick = () => {
    setIsExpanded(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log('Autoplay blocked:', err));
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const jump = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  const handleClose = () => {
    setIsExpanded(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed z-50 transition-all duration-700 w-full md:w-auto left-0 md:left-auto md:right-8 bottom-4 md:bottom-8 px-4 md:px-0 flex justify-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <audio
        ref={audioRef}
        src="/Why_Your_Overheated_Liver_Needs_Bitterness.m4a"
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
          setProgress((e.currentTarget.currentTime / (e.currentTarget.duration || 1)) * 100);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime(0);
        }}
      />
      {isExpanded ? (
        <div className="mx-auto w-[90vw] md:w-[380px] rounded-[24px] p-6 lg:p-8 relative overflow-hidden animate-reveal-up"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
          }}>

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                <Volume2 size={18} className="text-brand" />
              </div>
              <div className="text-left">
                <p className="text-base font-medium text-brand capitalize">{t('audio.podcast')}</p>
                <p className="text-[12px] text-brand/40 font-medium">{t('audio.author')}</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-black/5 transition-colors -mt-1 -mr-1">
              <X size={18} className="text-black/40" />
            </button>
          </div>

          <div className="text-left mb-8 mt-4">
            <h3 className="font-serif text-[20px] font-medium text-brand leading-snug mb-2">{t('audio.title')}</h3>
            <p className="text-[13px] text-brand/50 font-medium">{t('audio.subtitle')}</p>
          </div>

          {/* Golden Waves */}
          <div className="flex items-end justify-center gap-[4px] h-12 mb-6 px-4">
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/80'}`}
                style={{ height: isPlaying ? `${Math.max(6, Math.random() * 40)}px` : `${Math.max(8, Math.sin(i * 0.45) * 16 + 20)}px`, transition: isPlaying ? 'height 0.3s ease' : 'height 0.5s ease' }} />
            ))}
          </div>

          <div className="mb-8">
            <div className="h-1.5 bg-black/5 rounded-full overflow-hidden cursor-pointer" onClick={handleSeek}>
              <div
                className="h-full bg-gradient-to-r from-brand to-[#D4AF37] transition-all duration-150 relative"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2.5 px-0.5">
              <span className="text-[11px] text-brand/35 font-medium tracking-wide">{formatTime(currentTime)}</span>
              <span className="text-[11px] text-brand/35 font-medium tracking-wide">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-[52px] h-[52px] rounded-full bg-brand shadow-lg flex items-center justify-center text-white hover:scale-105 hover:bg-brand-600 transition-all duration-300"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleListenClick} className="ml-auto glass-card rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group flex items-center gap-3 bg-white/60 backdrop-blur-lg border border-gold-400/20">
          <div className="w-10 h-10 rounded-xl bg-brand/[0.08] flex items-center justify-center group-hover:bg-brand/[0.12] transition-colors">
            <Volume2 size={18} className="text-brand" />
          </div>
          <div className="pr-2 text-left">
            <p className="text-xs font-medium text-brand">{t('audio.listen')}</p>
            <div className="flex items-end gap-[2px] h-3 mt-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-[2px] bg-brand/40 rounded-full" style={{ height: `${Math.max(3, Math.sin(i * 0.8) * 8 + 8)}px`, animation: 'pulse 1.5s infinite running' }} />
              ))}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default AudioWidget;
