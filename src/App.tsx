import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Menu, X, LogOut, Plus, Home, Globe, Camera, Users, Star, Image, MapPin, Compass } from 'lucide-react';
import { useAuth, useTravels, useAppreciate, useTranslation } from '@/modules/shared/hooks';
import { LANGUAGES, STORAGE_KEYS, DEFAULT_LANGUAGE } from '@/modules/shared/constants';
import type { User } from '@/modules/shared/types';
import { WelcomePage, AuthForm, LanguageModal } from '@/modules/presentation/components';
import { TravelNotesPublisher } from '@/modules/travel-notes/components';
import { OverviewFeed } from '@/modules/overview/components';
import { SpotboardGallery, CameraCapture, EnhancedCameraCapture } from '@/modules/spotboard/components';
import { TravelerProfile, TravelerGallery, TravelPhotosGallery, DestinationsExplorer } from '@/modules/travelers/components';
import { useSpotboardPhotos } from '@/modules/spotboard/hooks';
import { CameroonStar, MusicPlayer } from '@/modules/shared/components';
import Starfield from '@/modules/shared/components/Starfield';

type PageType = 'welcome' | 'auth' | 'overview' | 'travel-notes' | 'spotboard' | 'traveler' | 'gallery' | 'photos' | 'destinations';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [language, setLanguage] = useState(() => {
    const storedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return storedLang && LANGUAGES[storedLang] ? storedLang : DEFAULT_LANGUAGE;
  });
  const [page, setPage] = useState<PageType>('overview');
  const [user, setUser] = useState<User | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const { signUp, signIn, logout, loading: authLoading } = useAuth();
  const { travels, fetchTravels, publishTravel, loading: travelsLoading, error: travelsError } = useTravels();
  const { toggleAppreciation } = useAppreciate();
  const { photos, fetchPhotos, loading: photosLoading } = useSpotboardPhotos();
  const t = useTranslation(language);

  const [showCameraCapture, setShowCameraCapture] = useState(false);
  const [showEnhancedCamera, setShowEnhancedCamera] = useState(false);

  const [selectedTravelerId, setSelectedTravelerId] = useState('');
  const [selectedTravelerName, setSelectedTravelerName] = useState('');
  const [travelerTravels, setTravelerTravels] = useState<typeof travels>([]);
  const [travelerReturnPage, setTravelerReturnPage] = useState<PageType>('overview');

  useEffect(() => {
    const selectedLanguage = LANGUAGES[language] ? language : DEFAULT_LANGUAGE;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, selectedLanguage);
    document.documentElement.lang = selectedLanguage;
    document.title = t('welcome');
  }, [language, t]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('full_name')
          .eq('id', data.session.user.id)
          .maybeSingle();

        setUser({
          id: data.session.user.id,
          email: data.session.user.email || '',
          fullName: profile?.full_name,
        });
        setPage('overview');
        await fetchTravels();
        await fetchPhotos();
      } else {
        setPage('welcome');
      }
    };
    checkAuth();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setAuthError(t('passwordMismatch'));
          return;
        }

        const result = await signUp(email, password, fullName);
        if (!result.success) {
          setAuthError(result.error || 'Sign up failed');
          return;
        }

        setAuthError(t('checkEmailToConfirm'));
        setIsSignUp(false);
        setEmail('');
        setPassword('');
        setFullName('');
        setConfirmPassword('');
      } else {
        const result = await signIn(email, password);
        if (!result.success) {
          setAuthError(result.error || 'Sign in failed');
          return;
        }

        if (result.user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('full_name')
            .eq('id', result.user.id)
            .maybeSingle();

          setUser({
            id: result.user.id,
            email: result.user.email || '',
            fullName: profile?.full_name,
          });
          setPage('overview');
          await fetchTravels();
        }
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setPage('welcome');
    setEmail('');
    setPassword('');
    setMobileMenuOpen(false);
  };

  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    const result = await publishTravel(user.id, title, description);
    if (result.success) {
      (e.target as HTMLFormElement).reset();
      setPage('overview');
    }
  };

  const handleAppreciateTravel = async (travelId: string) => {
    if (!user) {
      setPage('auth');
      return;
    }
    await toggleAppreciation(travelId, user.id);
    await fetchTravels();
  };

  const handleCameraCaptured = async () => {
    if (!user) return;
    setShowCameraCapture(false);
  };

  const handleViewTraveler = async (userId: string, userName: string) => {
    setSelectedTravelerId(userId);
    setSelectedTravelerName(userName);
    setTravelerReturnPage(page);
    const { data } = await supabase
      .from('travels')
      .select('*, user_profile:user_profiles(full_name)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setTravelerTravels(data || []);
    setPage('traveler');
  };

  // ==================== WELCOME PAGE ====================
  if (page === 'welcome' && !showLanguageModal) {
    return (
      <WelcomePage
        language={language}
        onSignIn={() => { setIsSignUp(false); setPage('auth'); }}
        onSignUp={() => { setIsSignUp(true); setPage('auth'); }}
        onLanguageSelect={() => setShowLanguageModal(true)}
      />
    );
  }

  // ==================== LANGUAGE MODAL ====================
  if (showLanguageModal) {
    return (
      <LanguageModal
        language={language}
        isOpen={true}
        onLanguageChange={setLanguage}
        onClose={() => {
          setShowLanguageModal(false);
          setPage(user ? 'overview' : 'welcome');
        }}
      />
    );
  }

  // ==================== AUTH PAGE ====================
  if (page === 'auth') {
    return (
      <AuthForm
        language={language}
        isSignUp={isSignUp}
        email={email}
        password={password}
        fullName={fullName}
        confirmPassword={confirmPassword}
        error={authError}
        loading={authLoading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onFullNameChange={setFullName}
        onConfirmPasswordChange={setConfirmPassword}
        onSubmit={handleAuth}
        onToggleMode={() => { setIsSignUp(!isSignUp); setAuthError(''); }}
        onBack={() => setPage('welcome')}
      />
    );
  }

  // ==================== MAIN APP ====================
  return (
    <div className="min-h-screen relative pb-64">
      <Starfield />
      <div className="h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] animate-flag-wave" />

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <button onClick={() => setPage('overview')} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-lg">N</span>
              </div>
              <CameroonStar size={14} className="absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="font-black text-xl bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] bg-clip-text text-transparent hidden sm:block">
              NKY Travel
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <button onClick={() => setPage('overview')} className={`flex items-center gap-2 font-bold transition-all px-3 py-2 rounded-xl text-sm ${page === 'overview' ? 'text-[#007A5E] bg-[#007A5E]/10 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Home size={16} /> {t('home')}
            </button>
            <button onClick={() => setPage('travel-notes')} className={`flex items-center gap-2 font-bold transition-all px-3 py-2 rounded-xl text-sm ${page === 'travel-notes' ? 'text-[#CE1126] bg-[#CE1126]/10 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Plus size={16} /> {t('publish')}
            </button>
            <button onClick={() => setPage('spotboard')} className={`flex items-center gap-2 font-bold transition-all px-3 py-2 rounded-xl text-sm ${page === 'spotboard' ? 'text-[#FCD116] bg-[#FCD116]/10 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Camera size={16} /> {t('spotboard')}
            </button>
            <button onClick={() => setPage('photos')} className={`flex items-center gap-2 font-bold transition-all px-3 py-2 rounded-xl text-sm ${page === 'photos' ? 'text-[#CE1126] bg-[#CE1126]/10 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Image size={16} /> {t('photos')}
            </button>
            <button onClick={() => setPage('destinations')} className={`flex items-center gap-2 font-bold transition-all px-3 py-2 rounded-xl text-sm ${page === 'destinations' ? 'text-[#007A5E] bg-[#007A5E]/10 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              <MapPin size={16} /> Destinations
            </button>
            <button onClick={() => setPage('gallery')} className={`flex items-center gap-2 font-bold transition-all px-3 py-2 rounded-xl text-sm ${page === 'gallery' ? 'text-[#007A5E] bg-[#007A5E]/10 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Users size={16} /> {t('gallery')}
            </button>

            <div className="w-px h-6 bg-gray-200 mx-1" />

            <button onClick={() => setShowLanguageModal(true)} className="flex items-center gap-2 font-bold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all text-sm">
              <Globe size={16} />
              <span className="text-lg">{LANGUAGES[language]?.flag}</span>
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-gradient-to-r from-[#CE1126] to-[#E63946] text-white rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2 hover:scale-105 transform text-sm">
              <LogOut size={14} /> {t('logout')}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setShowLanguageModal(true)} className="text-gray-600 hover:text-gray-900 p-2">
              <Globe size={22} />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-gray-900 p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-2 animate-slide-up">
            <button onClick={() => { setPage('overview'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 text-gray-900 font-bold hover:bg-[#007A5E]/10 rounded-xl flex items-center gap-2 transition-all">
              <Home size={18} className="text-[#007A5E]" /> {t('home')}
            </button>
            <button onClick={() => { setPage('travel-notes'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 text-gray-900 font-bold hover:bg-[#CE1126]/10 rounded-xl flex items-center gap-2 transition-all">
              <Plus size={18} className="text-[#CE1126]" /> {t('publish')}
            </button>
            <button onClick={() => { setPage('spotboard'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 text-gray-900 font-bold hover:bg-[#FCD116]/10 rounded-xl flex items-center gap-2 transition-all">
              <Camera size={18} className="text-[#FCD116]" /> {t('spotboard')}
            </button>
            <button onClick={() => { setPage('photos'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 text-gray-900 font-bold hover:bg-[#CE1126]/10 rounded-xl flex items-center gap-2 transition-all">
              <Image size={18} className="text-[#CE1126]" /> {t('photos')}
            </button>
            <button onClick={() => { setPage('destinations'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 text-gray-900 font-bold hover:bg-[#007A5E]/10 rounded-xl flex items-center gap-2 transition-all">
              <MapPin size={18} className="text-[#007A5E]" /> {t('destination')}
            </button>
            <button onClick={() => { setPage('gallery'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 text-gray-900 font-bold hover:bg-[#007A5E]/10 rounded-xl flex items-center gap-2 transition-all">
              <Users size={18} className="text-[#007A5E]" /> {t('gallery')}
            </button>
            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-[#CE1126] font-bold hover:bg-red-50 rounded-xl flex items-center gap-2 transition-all">
              <LogOut size={18} /> {t('logout')}
            </button>
          </div>
        )}
      </header>

      <main key={page} className="min-h-screen animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <MusicPlayer language={language} />
        </div>

        {page === 'traveler' && (
          <TravelerProfile
            language={language}
            travelerName={selectedTravelerName}
            travelerId={selectedTravelerId}
            travels={travelerTravels}
            onBack={() => setPage(travelerReturnPage)}
            onAppreciate={handleAppreciateTravel}
            currentUserId={user?.id}
          />
        )}

      {page === 'travel-notes' && (
        <TravelNotesPublisher
          language={language}
          loading={travelsLoading}
          error={travelsError}
          onSubmit={handlePublish}
        />
      )}

      {page === 'overview' && (
        <OverviewFeed
          travels={travels}
          language={language}
          onAppreciate={handleAppreciateTravel}
          onPublish={() => setPage('travel-notes')}
          onViewTraveler={handleViewTraveler}
        />
      )}

      {page === 'gallery' && (
        <TravelerGallery
          language={language}
          travels={travels}
          onViewTraveler={handleViewTraveler}
        />
      )}

      {page === 'photos' && (
        <TravelPhotosGallery
          language={language}
          onBack={() => setPage('overview')}
        />
      )}

      {page === 'destinations' && (
        <DestinationsExplorer
          language={language}
          onBack={() => setPage('overview')}
        />
      )}

      {page === 'spotboard' && (
        <>
          <SpotboardGallery
            language={language}
            user={user}
            photos={photos}
            onOpenCamera={() => setShowCameraCapture(true)}
            onOpenEnhancedCamera={() => setShowEnhancedCamera(true)}
            onOpenUpload={() => {}}
            loading={photosLoading}
          />
          <CameraCapture
            language={language}
            isOpen={showCameraCapture}
            onClose={() => setShowCameraCapture(false)}
            onCapture={handleCameraCaptured}
          />
          <EnhancedCameraCapture
            language={language}
            isOpen={showEnhancedCamera}
            onClose={() => setShowEnhancedCamera(false)}
            onCapture={handleCameraCaptured}
          />
        </>
      )}
      </main>
    </div>
  );
}
