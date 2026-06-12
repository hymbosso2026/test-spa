import { ChevronRight, Star } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';

interface AuthFormProps {
  language: string;
  isSignUp: boolean;
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  error: string;
  loading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onFullNameChange: (name: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onToggleMode: () => void;
  onBack: () => void;
}

export function AuthForm({
  language,
  isSignUp,
  email,
  password,
  fullName,
  confirmPassword,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onFullNameChange,
  onConfirmPasswordChange,
  onSubmit,
  onToggleMode,
  onBack,
}: AuthFormProps) {
  const t = useTranslation(language);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cameroon flag color bands */}
      <div className="absolute inset-0 flex opacity-10">
        <div className="w-1/3 bg-[#007A5E]" />
        <div className="w-1/3 bg-[#CE1126]" />
        <div className="w-1/3 bg-[#FCD116]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />

      {/* Floating decorative stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <CameroonStar size={30} className="absolute top-[10%] left-[15%] animate-float-star" style={{ animationDelay: '0s' }} />
        <CameroonStar size={20} className="absolute top-[20%] right-[20%] animate-float-star" style={{ animationDelay: '1s' }} />
        <CameroonStar size={25} className="absolute bottom-[15%] left-[25%] animate-float-star" style={{ animationDelay: '2s' }} />
        <CameroonStar size={18} className="absolute bottom-[25%] right-[10%] animate-float-star" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="max-w-md mx-auto px-4 py-12 relative z-10">
        <button
          onClick={onBack}
          className="mb-8 text-gray-600 hover:text-[#007A5E] flex items-center gap-2 font-bold transition-all group animate-fade-in"
        >
          <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> {t('back')}
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:border-[#FCD116]/30 transition-all animate-slide-up">
          {/* Top flag stripe */}
          <div className="h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] -mx-8 -mt-8 mb-6 rounded-t-3xl animate-flag-wave" />

          <div className="flex justify-center mb-6">
            <CameroonStar size={48} className="animate-glow-pulse" />
          </div>

          <h1 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] bg-clip-text text-transparent animate-fade-in">
            {isSignUp ? t('signUp') : t('signIn')}
          </h1>

          <form onSubmit={onSubmit} className="space-y-4">
            {isSignUp && (
              <div className="animate-slide-up">
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('fullName')}</label>
                <input
                  type="text"
                  placeholder={t('fullName')}
                  value={fullName}
                  onChange={(e) => onFullNameChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007A5E] outline-none transition-all hover:border-[#FCD116]"
                  required
                />
              </div>
            )}

            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t('email')}</label>
              <input
                type="email"
                placeholder={t('email')}
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007A5E] outline-none transition-all hover:border-[#FCD116]"
                required
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-bold text-gray-700 mb-1">{t('password')}</label>
              <input
                type="password"
                placeholder={t('password')}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007A5E] outline-none transition-all hover:border-[#FCD116]"
                required
              />
            </div>

            {isSignUp && (
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('confirmPassword')}</label>
                <input
                  type="password"
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => onConfirmPasswordChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007A5E] outline-none transition-all hover:border-[#FCD116]"
                  required
                />
              </div>
            )}

            {error && (
              <div className={`p-4 rounded-xl text-sm font-bold animate-bounce-in ${
                error === t('accountCreated')
                  ? 'bg-[#007A5E]/10 text-[#007A5E]'
                  : 'bg-[#CE1126]/10 text-[#CE1126]'
              }`}>
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
                  <Star size={20} /> {isSignUp ? t('signUp') : t('signIn')}
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center animate-fade-in-delay">
            <button
              onClick={onToggleMode}
              className="text-[#007A5E] font-bold hover:text-[#00A86B] transition-colors hover:underline"
            >
              {isSignUp ? t('signIn') : t('signUp')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
