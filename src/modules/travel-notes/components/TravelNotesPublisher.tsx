import { MapPin, Star, FileText } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';

interface TravelNotesPublisherProps {
  language: string;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function TravelNotesPublisher({ language, loading, error, onSubmit }: TravelNotesPublisherProps) {
  const t = useTranslation(language);

  return (
    <div className="min-h-screen relative">
      {/* Cameroon flag gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#CE1126]/5 via-[#FCD116]/8 to-[#007A5E]/5 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 py-12 relative z-10">
        {/* Animated header */}
        <div className="mb-8 pb-6 border-b-4 border-[#FCD116] animate-fade-in">
          <div className="flex items-center gap-3">
            <Star size={28} className="text-[#FCD116] animate-glow-pulse" />
            <h1 className="text-4xl font-black text-gray-900 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] bg-clip-text text-transparent">
              {t('publish')}
            </h1>
          </div>
          <p className="text-gray-500 mt-2 flex items-center gap-2 animate-fade-in-delay">
            <MapPin size={16} className="text-[#007A5E]" />
            {t('shareJourney')}
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:border-[#FCD116]/30 transition-all space-y-6 animate-slide-up">
          {/* Top flag stripe */}
          <div className="h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] -mx-8 -mt-8 mb-6 rounded-t-3xl animate-flag-wave" />

          <div className="flex items-center gap-2 mb-2">
            <FileText size={20} className="text-[#007A5E]" />
            <span className="text-sm font-bold text-[#007A5E]">{t('title')}</span>
            <span className="text-[#CE1126]">*</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder={t('titlePlaceholder')}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007A5E] outline-none transition-all hover:border-[#FCD116] hover:shadow-md"
            required
          />

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{t('description')}</label>
            <textarea
              name="description"
              placeholder={t('descriptionPlaceholder')}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007A5E] outline-none transition-all hover:border-[#FCD116] hover:shadow-md resize-none"
            />
          </div>

          {error && (
            <div className="p-4 bg-[#CE1126]/10 text-[#CE1126] rounded-xl text-sm font-bold animate-bounce-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 text-lg hover:scale-[1.02] transform active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <CameroonStar size={24} className="animate-spin" style={{ animationDuration: '2s' }} />
                {t('loading')}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <MapPin size={22} /> {t('publishBtn')}
              </span>
            )}
          </button>
        </form>

        {/* Decorative stars */}
        <div className="flex justify-center gap-4 mt-8 animate-fade-in-delay">
          <CameroonStar size={18} className="animate-float-star" />
          <CameroonStar size={14} className="animate-float-star" style={{ animationDelay: '0.5s' }} />
          <CameroonStar size={20} className="animate-float-star" style={{ animationDelay: '1s' }} />
          <CameroonStar size={14} className="animate-float-star" style={{ animationDelay: '1.5s' }} />
          <CameroonStar size={18} className="animate-float-star" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
}
