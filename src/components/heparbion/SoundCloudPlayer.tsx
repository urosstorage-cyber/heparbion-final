import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Volume2, X } from 'lucide-react';

const SoundCloudPlayer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // SoundCloud embed URLs
  const sloEmbedUrl = 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/uros-colja/naravna_za&color=%2300B493&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';
  const enEmbedUrl = 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/uros-colja/bitterness-is-the-livers-fire&color=%2300B493&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';

  const embedUrl = language === 'slo' ? sloEmbedUrl : enEmbedUrl;
  const podcastTitle = language === 'slo' ? 'Naravna zaščita jeter z grenkimi zelišči' : 'Natural Liver Protection with Bitter Herbs';

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      {isExpanded ? (
        <div className="glass-card rounded-2xl p-4 w-80 shadow-xl animate-reveal-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-brand" />
              <p className="text-xs font-medium text-foreground truncate max-w-[200px]">{podcastTitle}</p>
            </div>
            <button onClick={() => setIsExpanded(false)} className="p-1.5 rounded-lg hover:bg-foreground/5 transition-colors">
              <X size={14} className="text-foreground/40" />
            </button>
          </div>
          <iframe
            width="100%"
            height="120"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={embedUrl}
            className="rounded-lg"
            title="SoundCloud Player"
          />
        </div>
      ) : (
        <button onClick={() => setIsExpanded(true)}
          className="glass-card rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300 group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/[0.08] flex items-center justify-center group-hover:bg-brand/[0.12] transition-colors">
            <Volume2 size={18} className="text-brand" />
          </div>
          <div className="pr-2">
            <p className="text-xs font-medium text-foreground">{language === 'slo' ? 'Poslušaj' : 'Listen'}</p>
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

export default SoundCloudPlayer;
