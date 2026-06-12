import { Users, MapPin, Heart, Star, ChevronRight } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';
import type { Travel } from '../../shared/types';

interface TravelerInfo {
  user_id: string;
  full_name: string;
  travelCount: number;
  totalAppreciations: number;
  latestTravel?: Travel;
}

interface TravelerGalleryProps {
  language: string;
  travels: Travel[];
  onViewTraveler: (userId: string, userName: string) => void;
}

// Beautiful travel destination cover images from Pexels
const COVER_IMAGES = [
  'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3250444/pexels-photo-3250444.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4554561/pexels-photo-4554561.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/3155667/pexels-photo-3155667.jpeg?auto=compress&cs=tinysrgb&w=600',
];

function getCoverImage(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash |= 0;
  }
  return COVER_IMAGES[Math.abs(hash) % COVER_IMAGES.length];
}

export function TravelerGallery({ language, travels, onViewTraveler }: TravelerGalleryProps) {
  const t = useTranslation(language);

  // Group travels by user
  const travelerMap = new Map<string, TravelerInfo>();
  travels.forEach((travel) => {
    const uid = travel.user_id;
    const name = travel.user_profile?.full_name || t('anonymous');
    if (!travelerMap.has(uid)) {
      travelerMap.set(uid, {
        user_id: uid,
        full_name: name,
        travelCount: 0,
        totalAppreciations: 0,
        latestTravel: travel,
      });
    }
    const info = travelerMap.get(uid)!;
    info.travelCount += 1;
    info.totalAppreciations += travel.appreciation_count;
  });

  const travelers = Array.from(travelerMap.values()).sort(
    (a, b) => b.totalAppreciations - a.totalAppreciations
  );

  return (
    <div className="min-h-screen relative">
      {/* Cameroon flag background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCD116]/5 via-[#CE1126]/5 to-[#007A5E]/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        {/* Animated header */}
        <div className="mb-4 pb-4 border-b-4 border-[#FCD116] animate-fade-in">
          <div className="flex items-center gap-3">
            <Users size={32} className="text-[#007A5E]" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] bg-clip-text text-transparent">
              {t('gallery')}
            </h1>
          </div>
        </div>
        <p className="text-gray-500 mb-12 animate-fade-in-delay flex items-center gap-2">
          <Star size={16} className="text-[#FCD116] animate-glow-pulse" />
          {travelers.length} {t('presentation').toLowerCase()}
        </p>

        {travelers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 animate-bounce-in">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-semibold">{t('noTravels')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelers.map((traveler, index) => (
              <button
                key={traveler.user_id}
                onClick={() => onViewTraveler(traveler.user_id, traveler.full_name)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-[#FCD116]/50 group text-left animate-slide-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Cover image */}
                <div className="h-36 relative overflow-hidden">
                  <img
                    src={getCoverImage(traveler.user_id)}
                    alt="Travel destination"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Traveler avatar over cover */}
                  <div className="absolute -bottom-6 left-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl border-3 border-white group-hover:scale-110 transition-transform">
                      {traveler.full_name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-[#FCD116] text-gray-900 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star size={12} /> {traveler.travelCount}
                  </div>
                </div>

                {/* Info section */}
                <div className="p-6 pt-8">
                  <h3 className="font-black text-gray-900 text-lg group-hover:text-[#007A5E] transition-colors flex items-center justify-between">
                    {traveler.full_name}
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-[#007A5E] group-hover:translate-x-1 transition-all" />
                  </h3>

                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-[#007A5E] font-bold">
                      <MapPin size={14} /> {traveler.travelCount} {t('journey')}(s)
                    </span>
                    <span className="flex items-center gap-1 text-[#CE1126] font-bold">
                      <Heart size={14} /> {traveler.totalAppreciations}
                    </span>
                  </div>

                  {/* Latest travel preview */}
                  {traveler.latestTravel && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl group-hover:bg-[#007A5E]/5 transition-colors">
                      <p className="text-sm text-gray-600 font-semibold line-clamp-2">
                        {traveler.latestTravel.title}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom stripe */}
                <div className="h-1 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
