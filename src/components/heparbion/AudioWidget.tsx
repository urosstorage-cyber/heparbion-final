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

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
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
              <div className="w-10 h-10 rounded-xl bg-brand/[0.08] flex items-center justify-center border border-brand/5">
                <Volume2 size={18} className="text-brand" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-widest text-brand uppercase">{t('audio.podcast')}</p>
                <p className="text-[11px] text-brand/60">{t('audio.author')}</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-brand/5 transition-colors -mt-1 -mr-1">
              <X size={20} className="text-gold-400" />
            </button>
          </div>

          <div className="text-left mb-8 mt-2">
            <h3 className="font-serif text-[22px] font-medium text-brand leading-snug mb-1">{t('audio.title')}</h3>
            <p className="text-base text-brand/80">{t('audio.subtitle')}</p>
          </div>

          <div className="mb-8">
            <div className="h-[3px] bg-brand/10 rounded-full overflow-hidden cursor-pointer" onClick={handleSeek}>
              <div
                className="h-full bg-[#D4AF37] transition-all duration-150 relative"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 px-1">
              <span className="text-[10px] text-brand/50 font-medium tracking-wide">{formatTime(currentTime)}</span>
              <span className="text-[10px] text-brand/50 font-medium tracking-wide">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8">
            <button onClick={() => jump(-15)} className="text-foreground/70 hover:text-gold-400 transition-colors p-2 flex flex-col items-center">
              <RotateCcw size={22} />
              <span className="text-[9px] font-medium mt-1">15s</span>
            </button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E2C76A] to-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center text-white hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/40 transition-all duration-300 border border-white/40"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={() => jump(15)} className="text-foreground/70 hover:text-gold-400 transition-colors p-2 flex flex-col items-center">
              <RotateCw size={22} />
              <span className="text-[9px] font-medium mt-1">15s</span>
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
