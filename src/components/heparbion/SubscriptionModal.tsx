import React, { useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import logoImg from '@/assets/aleksandra_komasz_plus_logo.svg';
import personImg from '@/assets/aleksandra-desk.jpg';
import { X } from 'lucide-react';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
    const { t, language } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-xl md:rounded-3xl shadow-2xl animate-reveal-scale z-10 flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-20"
                >
                    <X size={20} className="text-gray-600" />
                </button>

                <div className="p-6 md:p-10 flex flex-col items-center">
                    {/* Logo */}
                    <div className="mb-6 h-12 md:h-16 flex items-center justify-center">
                        <img
                            src={logoImg}
                            alt="Aleksandra Komasz Plus"
                            className="max-h-full w-auto object-contain"
                        />
                    </div>

                    {/* Image */}
                    <div className="w-full mb-8 rounded-xl overflow-hidden aspect-video relative">
                        <img
                            src={personImg}
                            alt="Aleksandra Komasz"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="text-center max-w-xl mx-auto space-y-6 text-gray-800">
                        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-[#2A2A2A] mb-2 leading-tight">
                            {t('modal.title')}
                        </h3>

                        <p className="text-[13px] md:text-sm lg:text-base leading-relaxed">
                            {t('modal.p1')}
                        </p>

                        <p className="text-[13px] md:text-sm lg:text-base leading-relaxed">
                            {t('modal.p2')}
                        </p>

                        <p className="text-[13px] md:text-sm lg:text-base leading-relaxed">
                            {t('modal.p3')}
                        </p>

                        <div className="pt-2 pb-4 flex justify-center">
                            <a
                                href={language === 'slo' ? 'https://aleksandrakomasz-plus.com/sl' : 'https://aleksandrakomasz-plus.com/'}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={onClose}
                                className="bg-[#5CB896] hover:bg-[#4aa57c] text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors text-sm md:text-base cursor-pointer"
                            >
                                {t('modal.btn')}
                            </a>
                        </div>

                        <div className="text-[13px] md:text-sm text-gray-700">
                            <p>{t('modal.signoff1')}</p>
                            <p>{t('modal.signoff2')}</p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 text-[11px] md:text-xs text-black/60 text-left leading-relaxed">
                            <p>
                                <strong>P. S.:</strong> {t('modal.ps').replace(/^P\. ?S\.: /, '')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
