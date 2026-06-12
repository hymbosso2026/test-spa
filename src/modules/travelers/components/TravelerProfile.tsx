import { Heart, MapPin, Calendar, Award, ChevronLeft, Star, Camera, Eye, Sparkles } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';
import type { Travel } from '../../shared/types';

// Cover images for traveler hero sections
const HERO_IMAGES = [
  'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/4554561/pexels-photo-4554561.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

function getHeroImage(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash |= 0;
  }
  return HERO_IMAGES[Math.abs(hash) % HERO_IMAGES.length];
}

interface TravelerProfileProps {
  language: string;
  travelerName: string;
  travelerId: string;
  travels: Travel[];
  onBack: () => void;
  onAppreciate: (travelId: string) => Promise<void>;
  currentUserId?: string;
}

export function TravelerProfile({
  language,
  travelerName,
  travelerId,
  travels,
  onBack,
  onAppreciate,
  currentUserId,
}: TravelerProfileProps) {
  const t = useTranslation(language);
  const totalAppreciations = travels.reduce((sum, tr) => sum + tr.appreciation_count, 0);
  const initial = (travelerName || t('anonymous')).charAt(0).toUpperCase();

  return (
    <div className="min-h-screen relative">
      {/* Hero cover image background */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={getHeroImage(travelerId)}
          alt="Travel cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Floating stars on hero */}
        <CameroonStar size={20} className="absolute top-8 right-12 text-white/40 animate-float-star" />
        <CameroonStar size={16} className="absolute top-16 left-16 text-white/30 animate-float-star" style={{ animationDelay: '1s' }} />
        <CameroonStar size={24} className="absolute bottom-24 right-24 text-[#FCD116]/50 animate-float-star" style={{ animationDelay: '0.5s' }} />

        {/* Flag stripe at top */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] animate-flag-wave" />

        {/* Back button overlay */}
        <div className="absolute top-6 left-4 z-20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full hover:bg-black/60 transition-all group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            {t('back')}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 -mt-20">
        {/* Profile card overlapping hero */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 mb-8 animate-slide-up">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Animated avatar */}
              <div className="relative -mt-16 md:-mt-20 animate-bounce-in">
                <div className="w-28 h-28 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center text-white font-black text-5xl shadow-2xl border-4 border-white animate-glow-pulse">
                  {initial}
                </div>
                <CameroonStar size={28} className="absolute -top-2 -right-2 animate-pulse" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#007A5E] rounded-full flex items-center justify-center border-2 border-white">
                  <Sparkles size={14} className="text-white" />
                </div>
              </div>

              <div className="text-center md:text-left flex-1 mt-4 md:mt-0">
                <h1 className="text-3xl font-black text-gray-900 animate-fade-in">
                  {travelerName || t('anonymous')}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-sm text-gray-500 animate-fade-in-delay">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#007A5E]" />
                    {travels.length} {t('journey').toLowerCase()}(s)
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="text-[#CE1126]" />
                    {totalAppreciations} {t('appreciations').toLowerCase()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={14} className="text-[#FCD116]" />
                    {t('success')}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats bar with Cameroon colors */}
            <div className="grid grid-cols-3 gap-4 mt-8 animate-slide-up-delay">
              <div className="bg-gradient-to-br from-[#007A5E]/10 to-[#007A5E]/5 rounded-2xl p-5 text-center hover:scale-105 transition-transform border border-[#007A5E]/10">
                <div className="text-3xl font-black text-[#007A5E]">{travels.length}</div>
                <div className="text-xs font-bold text-[#007A5E]/70 mt-1">{t('journey')}</div>
              </div>
              <div className="bg-gradient-to-br from-[#CE1126]/10 to-[#CE1126]/5 rounded-2xl p-5 text-center hover:scale-105 transition-transform border border-[#CE1126]/10">
                <div className="text-3xl font-black text-[#CE1126]">{totalAppreciations}</div>
                <div className="text-xs font-bold text-[#CE1126]/70 mt-1">{t('appreciations')}</div>
              </div>
              <div className="bg-gradient-to-br from-[#FCD116]/10 to-[#FCD116]/5 rounded-2xl p-5 text-center hover:scale-105 transition-transform border border-[#FCD116]/10">
                <div className="text-3xl font-black text-[#FCD116]">
                  <Star size={30} className="inline animate-glow-pulse" />
                </div>
                <div className="text-xs font-bold text-[#FCD116]/70 mt-1">{t('rate')}</div>
              </div>
            </div>
          </div>

          {/* Bottom flag stripe */}
          <div className="h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116]" />
        </div>

        {/* Traveler's journeys */}
        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2 animate-fade-in">
          <Camera size={24} className="text-[#007A5E]" />
          {travels.length} {t('journey')}(s)
        </h2>

        {travels.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 animate-fade-in">
            <CameroonStar size={48} className="mx-auto mb-4 animate-pulse" />
            <p className="text-gray-500 font-semibold">{t('noTravels')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {travels.map((travel, index) => (
              <div
                key={travel.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-[#FCD116]/30 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Cover image for each journey */}
                {travel.cover_image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={travel.cover_image_url}
                      alt={travel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <h3 className="text-xl font-black text-white drop-shadow-lg">
                        {travel.title}
                      </h3>
                    </div>
                    {/* Flag stripe */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116]" />
                    {/* Appreciation badge */}
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                      <Heart size={14} className="text-[#CE1126]" fill="#CE1126" /> {travel.appreciation_count}
                    </div>
                    {/* MapPin badge */}
                    <div className="absolute top-3 left-3 bg-[#007A5E]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                      <MapPin size={12} /> {t('destination')}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Title shown below image only if no cover image */}
                  {!travel.cover_image_url && (
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-[#007A5E] transition-colors">
                        {travel.title}
                      </h3>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar size={14} />
                    {new Date(travel.created_at).toLocaleDateString()}
                    <span className="mx-1">-</span>
                    <Eye size={14} />
                    {travel.appreciation_count} {t('appreciations').toLowerCase()}
                  </div>

                  {travel.description && (
                    <p className="text-gray-600 leading-relaxed mb-4">{travel.description}</p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Heart size={18} className="text-[#CE1126]" />
                      <span className="font-bold text-[#CE1126]">{travel.appreciation_count}</span>
                      <span className="text-sm text-gray-400">{t('appreciations')}</span>
                    </div>

                    {currentUserId && currentUserId !== travelerId && (
                      <button
                        onClick={() => onAppreciate(travel.id)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#CE1126] to-[#FCD116] text-white font-black rounded-full hover:shadow-xl transition-all transform hover:scale-105 text-sm"
                      >
                        <Heart size={16} fill="currentColor" /> {t('appreciate')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Decorative stars */}
        <div className="flex justify-center gap-4 mt-12 pb-8 animate-fade-in-delay">
          <CameroonStar size={18} className="animate-float-star" />
          <CameroonStar size={14} className="animate-float-star" style={{ animationDelay: '0.5s' }} />
          <CameroonStar size={22} className="animate-float-star" style={{ animationDelay: '1s' }} />
          <CameroonStar size={14} className="animate-float-star" style={{ animationDelay: '1.5s' }} />
          <CameroonStar size={18} className="animate-float-star" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
}
