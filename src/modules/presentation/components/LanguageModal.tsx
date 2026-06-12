import { X } from 'lucide-react';
import { LANGUAGES } from '../../shared/constants';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';

interface LanguageModalProps {
  language: string;
  isOpen: boolean;
  onLanguageChange: (lang: string) => void;
  onClose: () => void;
}

export function LanguageModal({ language, isOpen, onLanguageChange, onClose }: LanguageModalProps) {
  const t = useTranslation(language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CameroonStar size={36} className="animate-pulse" />
              <h2 className="text-2xl font-black text-white">{t('selectLanguage')}</h2>
            </div>
            <button onClick={onClose}>
              <X size={32} className="text-white hover:text-white/80" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(LANGUAGES).map(([code, { name, flag }]) => (
              <button
                key={code}
                onClick={() => {
                  onLanguageChange(code);
                  onClose();
                }}
                className={`p-3 rounded-xl font-bold text-center transition-all transform hover:scale-105 ${
                  language === code
                    ? 'bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{flag}</div>
                <div className="text-xs leading-tight">{name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-xl hover:shadow-lg transition-all"
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </div>
  );
}
