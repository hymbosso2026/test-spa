import { Heart, Flame, MapPin, ChevronRight, Star, Eye, Calendar, TrendingUp } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import type { Travel } from '../../shared/types';
import { useTranslation } from '../../shared/hooks';

interface OverviewProps {
  travels: Travel[];
  language: string;
  onAppreciate: (travelId: string) => Promise<void>;
  onPublish: () => void;
  onViewTraveler: (userId: string, userName: string) => void;
}

// Beautiful travel destination images from Pexels
const TRAVEL_IMAGES = [
  'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3250444/pexels-photo-3250444.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4554561/pexels-photo-4554561.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3155667/pexels-photo-3155667.jpeg?auto=compress&cs=tinysrgb&w=800',
];

function getTravelImage(travelId: string): string {
  let hash = 0;
  for (let i = 0; i < travelId.length; i++) {
    hash = ((hash << 5) - hash) + travelId.charCodeAt(i);
    hash |= 0;
  }
  return TRAVEL_IMAGES[Math.abs(hash) % TRAVEL_IMAGES.length];
}

export function OverviewFeed({ travels, language, onAppreciate, onPublish, onViewTraveler }: OverviewProps) {
  const t = useTranslation(language);

  const totalAppreciations = travels.reduce((sum, tr) => sum + tr.appreciation_count, 0);
  const sortedTravels = [...travels].sort((a, b) => b.appreciation_count - a.appreciation_count);
  const topTravel = sortedTravels[0];
  const otherTravels = sortedTravels.slice(1);

  return (
    <div className="min-h-screen relative">
      {/* Cameroon flag gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#007A5E]/5 via-[#FCD116]/5 to-[#CE1126]/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        {/* Animated header */}
        <div className="mb-4 pb-4 border-b-4 border-[#FCD116] animate-fade-in">
          <div className="flex items-center gap-3">
            <Star size={28} className="text-[#FCD116] animate-glow-pulse" />
            <h1 className="text-4xl font-black text-gray-900 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] bg-clip-text text-transparent">
              {t('explore')}
            </h1>
          </div>
        </div>
        <p className="text-gray-500 mb-8 animate-fade-in-delay">{t('shareJourney')}</p>

        {/* Stats overview */}
        {travels.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up">
            <div className="bg-gradient-to-br from-[#007A5E]/10 to-[#007A5E]/5 rounded-2xl p-4 border border-[#007A5E]/10 text-center hover:scale-105 transition-transform">
              <div className="text-2xl font-black text-[#007A5E]">{travels.length}</div>
              <div className="text-xs font-bold text-[#007A5E]/70">{t('journey')}(s)</div>
            </div>
            <div className="bg-gradient-to-br from-[#CE1126]/10 to-[#CE1126]/5 rounded-2xl p-4 border border-[#CE1126]/10 text-center hover:scale-105 transition-transform">
              <div className="text-2xl font-black text-[#CE1126]">{totalAppreciations}</div>
              <div className="text-xs font-bold text-[#CE1126]/70">{t('appreciations')}</div>
            </div>
            <div className="bg-gradient-to-br from-[#FCD116]/10 to-[#FCD116]/5 rounded-2xl p-4 border border-[#FCD116]/10 text-center hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp size={22} className="text-[#FCD116]" />
              </div>
              <div className="text-xs font-bold text-[#FCD116]/70">{t('trending')}</div>
            </div>
          </div>
        )}

        {/* Featured / Top travel */}
        {topTravel && topTravel.appreciation_count > 0 && (
          <div className="mb-10 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={20} className="text-[#CE1126]" />
              <h2 className="text-lg font-black text-gray-800">{t('trending')}</h2>
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#FCD116]/30 group">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={topTravel.cover_image_url || getTravelImage(topTravel.id)}
                  alt={topTravel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] animate-flag-wave" />

                {/* Featured badge */}
                <div className="absolute top-4 left-4 bg-[#FCD116] text-gray-900 text-sm font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse">
                  <Star size={14} fill="currentColor" /> Featured
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h2 className="text-3xl font-black text-white drop-shadow-2xl group-hover:text-[#FCD116] transition-colors duration-500">
                    {topTravel.title}
                  </h2>
                  {topTravel.description && (
                    <p className="text-white/80 mt-2 line-clamp-2 text-sm md:text-base">
                      {topTravel.description}
                    </p>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg">
                  <Heart size={16} className="text-[#CE1126]" fill="#CE1126" />
                  {topTravel.appreciation_count}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                <button
                  onClick={() => onViewTraveler(topTravel.user_id, topTravel.user_profile?.full_name || '')}
                  className="flex items-center gap-3 group/profile hover:bg-gray-50 rounded-xl p-2 -m-2 transition-all w-full text-left"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover/profile:scale-110 transition-transform">
                    {(topTravel.user_profile?.full_name || t('anonymous')).charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover/profile:text-[#007A5E] transition-colors">
                      {topTravel.user_profile?.full_name || t('anonymous')}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(topTravel.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover/profile:text-[#007A5E] group-hover/profile:translate-x-1 transition-all" />
                </button>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-black bg-gradient-to-r from-[#CE1126] to-[#FCD116] bg-clip-text text-transparent">
                      {topTravel.appreciation_count}
                    </div>
                    <div className="text-xs text-gray-500 font-bold">{t('appreciations')}</div>
                  </div>
                  <button
                    onClick={() => onAppreciate(topTravel.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#CE1126] to-[#FCD116] text-white font-black rounded-full hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Heart size={20} fill="currentColor" /> {t('appreciate')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All other travels */}
        {travels.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 animate-bounce-in">
            <Flame size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-semibold">{t('noTravels')}</p>
            <CameroonStar size={36} className="mx-auto mt-4 animate-pulse" />
            <button
              onClick={onPublish}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-full hover:shadow-xl hover:scale-105 transition-all transform"
            >
              {t('publish')}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {(topTravel && topTravel.appreciation_count > 0 ? otherTravels : sortedTravels).map((travel, index) => (
              <div
                key={travel.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-[#FCD116]/40 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Beautiful travel cover image */}
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <img
                    src={travel.cover_image_url || getTravelImage(travel.id)}
                    alt={travel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] animate-flag-wave" />

                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-2xl group-hover:text-[#FCD116] transition-colors duration-500">
                      {travel.title}
                    </h2>
                    {travel.description && (
                      <p className="text-white/80 mt-1 line-clamp-2 text-sm md:text-base">
                        {travel.description}
                      </p>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg">
                    <Heart size={16} className="text-[#CE1126]" fill="#CE1126" />
                    {travel.appreciation_count}
                  </div>

                  <div className="absolute top-4 left-4 bg-[#007A5E]/80 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg text-sm">
                    <MapPin size={14} /> {t('destination')}
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-6">
                  <button
                    onClick={() => onViewTraveler(travel.user_id, travel.user_profile?.full_name || '')}
                    className="flex items-center gap-3 group/profile hover:bg-gray-50 rounded-xl p-2 -m-2 transition-all w-full text-left"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md group-hover/profile:scale-110 transition-transform">
                      {(travel.user_profile?.full_name || t('anonymous')).charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover/profile:text-[#007A5E] transition-colors text-sm">
                        {travel.user_profile?.full_name || t('anonymous')}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(travel.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 group-hover/profile:text-[#007A5E] transition-colors">
                      <Eye size={16} />
                      <ChevronRight size={16} className="group-hover/profile:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-black bg-gradient-to-r from-[#CE1126] to-[#FCD116] bg-clip-text text-transparent">
                        {travel.appreciation_count}
                      </div>
                      <div className="text-xs text-gray-500 font-bold">{t('appreciations')}</div>
                    </div>
                    <button
                      onClick={() => onAppreciate(travel.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#CE1126] to-[#FCD116] text-white font-black rounded-full hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <Heart size={20} fill="currentColor" /> {t('appreciate')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Decorative stars */}
        <div className="flex justify-center gap-4 mt-12 pb-8 animate-fade-in-delay">
          <CameroonStar size={16} className="animate-float-star" />
          <CameroonStar size={12} className="animate-float-star" style={{ animationDelay: '0.5s' }} />
          <CameroonStar size={20} className="animate-float-star" style={{ animationDelay: '1s' }} />
          <CameroonStar size={12} className="animate-float-star" style={{ animationDelay: '1.5s' }} />
          <CameroonStar size={16} className="animate-float-star" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
}
