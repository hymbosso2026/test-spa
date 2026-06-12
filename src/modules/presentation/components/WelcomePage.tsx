import { CameroonStar } from '../../shared/components';
import { LANGUAGES } from '../../shared/constants';
import { useTranslation } from '../../shared/hooks';
import { Globe, Camera, MapPin, Users, Star, Sparkles } from 'lucide-react';

interface WelcomePageProps {
  language: string;
  onSignIn: () => void;
  onSignUp: () => void;
  onLanguageSelect: () => void;
}

export function WelcomePage({ language, onSignIn, onSignUp, onLanguageSelect }: WelcomePageProps) {
  const t = useTranslation(language);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Cameroon flag color bands */}
      <div className="absolute inset-0 flex">
        <div className="w-1/3 bg-[#007A5E]" />
        <div className="w-1/3 bg-[#CE1126]" />
        <div className="w-1/3 bg-[#FCD116]" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating stars */}
        {[...Array(16)].map((_, i) => (
          <CameroonStar
            key={i}
            size={15 + Math.random() * 25}
            className="absolute animate-float-star"
            style={{
              left: `${3 + Math.random() * 94}%`,
              top: `${3 + Math.random() * 94}%`,
              animationDelay: `${i * 0.25}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Glowing orbs */}
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-56 h-56 bg-[#FCD116]/25 rounded-full blur-2xl top-1/3 right-1/4 animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute w-40 h-40 bg-[#007A5E]/20 rounded-full blur-2xl bottom-1/4 left-1/4 animate-pulse" style={{ animationDelay: '1.2s' }} />

        {/* Shimmer overlay */}
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      <div className="max-w-lg w-full relative z-10 text-center space-y-8">
        {/* NKY Logo */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <CameroonStar size={130} className="animate-spin" style={{ animationDuration: '25s' }} />
          </div>

          <div className="relative z-10 flex items-center justify-center gap-3">
            {['N', 'K', 'Y'].map((letter, i) => (
              <div
                key={letter}
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce
                  border-4 border-white/30 backdrop-blur-sm"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '2s',
                  background: i === 0
                    ? 'linear-gradient(135deg, #007A5E, #00A86B)'
                    : i === 1
                    ? 'linear-gradient(135deg, #CE1126, #E63946)'
                    : 'linear-gradient(135deg, #FCD116, #FFD700)',
                }}
              >
                <span className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">{letter}</span>
                <div className="absolute -top-2 -right-2">
                  <CameroonStar size={22} className="animate-glow-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Decorative corner stars */}
          <CameroonStar size={24} className="absolute -top-6 left-6 animate-float-star" />
          <CameroonStar size={20} className="absolute -bottom-4 right-6 animate-float-star" style={{ animationDelay: '0.6s' }} />
          <CameroonStar size={16} className="absolute top-2 -left-4 animate-float-star" style={{ animationDelay: '1.2s' }} />
          <CameroonStar size={22} className="absolute -top-4 right-8 animate-float-star" style={{ animationDelay: '0.3s' }} />
        </div>

        {/* Title and subtitle */}
        <div className="space-y-3 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight leading-tight">
            {t('welcome')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-semibold drop-shadow flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-[#FCD116] animate-glow-pulse" />
            {t('subtitle')}
            <Sparkles size={18} className="text-[#FCD116] animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in-delay">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20 hover:scale-105 transition-transform">
            <MapPin size={24} className="mx-auto text-white mb-1" />
            <span className="text-white text-xs font-bold block">{t('journey')}</span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20 hover:scale-105 transition-transform">
            <Camera size={24} className="mx-auto text-white mb-1" />
            <span className="text-white text-xs font-bold block">{t('camera')}</span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 border border-white/20 hover:scale-105 transition-transform">
            <Users size={24} className="mx-auto text-white mb-1" />
            <span className="text-white text-xs font-bold block">{t('gallery')}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onSignIn}
            className="w-full py-4 bg-white text-[#007A5E] font-black rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all text-lg shadow-xl hover:bg-gray-50"
          >
            {t('signIn')}
          </button>

          <button
            onClick={onSignUp}
            className="w-full py-4 border-3 border-white text-white font-black rounded-2xl hover:bg-white/20 transition-all text-lg bg-white/10 backdrop-blur-sm hover:scale-105 transform"
          >
            <span className="flex items-center justify-center gap-2">
              <Star size={20} /> {t('signUp')}
            </span>
          </button>

          <button
            onClick={onLanguageSelect}
            className="w-full py-4 bg-[#FCD116]/30 border-2 border-[#FCD116] text-white font-black rounded-2xl hover:bg-[#FCD116]/50 transition-all flex items-center justify-center gap-3 text-lg backdrop-blur-sm hover:scale-105 transform"
          >
            <Globe size={24} /> {t('selectLanguage')}
          </button>
        </div>

        {/* Current language indicator */}
        <p className="text-white/60 text-sm flex items-center justify-center gap-2 animate-fade-in">
          {LANGUAGES[language]?.flag} {LANGUAGES[language]?.name}
        </p>
      </div>
    </div>
  );
}
