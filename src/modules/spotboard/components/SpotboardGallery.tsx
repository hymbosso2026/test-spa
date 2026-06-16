import { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Heart, Play, Video, Star, X, MapPin, Eye, ZoomIn, Sparkles } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';
import type { User } from '../../shared/types';
import type { SpotboardPhoto } from '../types';

interface SpotboardGalleryProps {
  language: string;
  user: User | null;
  photos: SpotboardPhoto[];
  onOpenCamera: () => void;
  onOpenEnhancedCamera?: () => void;
  onOpenUpload: () => void;
  loading: boolean;
}

export function SpotboardGallery({
  language,
  user,
  photos,
  onOpenCamera,
  onOpenEnhancedCamera,
  loading,
}: SpotboardGalleryProps) {
  const t = useTranslation(language);
  const [selectedPhoto, setSelectedPhoto] = useState<SpotboardPhoto | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const DEFAULT_CAMEROON_IMAGES = [
    'https://source.unsplash.com/800x600/?cameroon,yaounde',
    'https://source.unsplash.com/800x600/?cameroon,douala',
    'https://source.unsplash.com/800x600/?mount%20cameroon',
    'https://source.unsplash.com/800x600/?kribi,beach',
    'https://source.unsplash.com/800x600/?waza,park',
    'https://source.unsplash.com/800x600/?cameroon,mountain',
  ];
  const LOCAL_FALLBACK_IMAGE = '/image/photo1.jpg';

  useEffect(() => {
    if (videoRef.current && playingVideo) {
      try {
        videoRef.current.playbackRate = 1.1;
        // attempt to play in case autoplay restrictions exist
        videoRef.current.play().catch(() => {});
      } catch (e) {
        // ignore
      }
    }
  }, [playingVideo]);

  const photoCount = photos.filter(p => !p.caption?.startsWith('video:')).length;
  const videoCount = photos.filter(p => p.caption?.startsWith('video:')).length;

  return (
    <div className="min-h-screen relative">
      {/* Cameroon flag gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCD116]/5 via-white to-[#007A5E]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Header with golden accent */}
        <div className="mb-4 pb-4 border-b-4 border-[#FCD116] animate-fade-in">
          <div className="flex items-center gap-3">
            <CameroonStar size={36} className="animate-pulse" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-[#CE1126] to-[#FCD116] bg-clip-text text-transparent">
              {t('spotboard')}
            </h1>
          </div>
        </div>
        <p className="text-gray-500 mb-4 animate-fade-in-delay">{t('sharePhoto')}</p>

        {/* Stats bar */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in-delay">
          <span className="flex items-center gap-1.5 text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
            <Camera size={14} className="text-[#007A5E]" /> {photoCount} photos
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
            <Video size={14} className="text-[#CE1126]" /> {videoCount} videos
          </span>
        </div>

        {/* Action buttons */}
        {user && (
          <div className="mb-12 bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-[#FCD116]/40 transition-all animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
              <Star size={20} className="text-[#FCD116] animate-glow-pulse" />
              <h2 className="text-2xl font-bold text-gray-900">{t('capturePhoto')}</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenCamera}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#007A5E] to-[#00A86B] text-white font-black rounded-full hover:shadow-xl hover:scale-105 transition-all transform"
              >
                <Camera size={20} /> {t('openCamera')}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#CE1126] to-[#FCD116] text-white font-black rounded-full hover:shadow-xl hover:scale-105 transition-all transform"
              >
                <Upload size={20} /> {t('uploadPhoto')}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FCD116] to-[#FFD700] text-gray-900 font-black rounded-full hover:shadow-xl hover:scale-105 transition-all transform"
              >
                <Video size={20} /> Video
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 animate-fade-in">
            <CameroonStar size={48} className="mx-auto animate-spin mb-4" style={{ animationDuration: '3s' }} />
            <p className="text-gray-500 font-bold">{t('loading')}</p>
          </div>
        )}

        {!loading && photos.length === 0 ? (
          <div className="py-8">
            <p className="text-gray-500 text-lg font-semibold text-center mb-6">{t('noPhotos')}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DEFAULT_CAMEROON_IMAGES.map((src, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <img
                src={src}
                alt={`Cameroon ${i}`}
                className="w-full h-48 object-cover"
                onError={(e) => { if (e.currentTarget.src !== LOCAL_FALLBACK_IMAGE) e.currentTarget.src = LOCAL_FALLBACK_IMAGE; }}
              />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => {
              const isVideo = photo.caption?.startsWith('video:') || false;
              const videoTitle = isVideo ? photo.caption?.replace('video:', '') : '';
              return (
                <div
                  key={photo.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-[#FCD116]/40 group animate-slide-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.08}s` }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Image / Video area */}
                  <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                    {photo.url ? (
                      <img
                        src={photo.url}
                        alt={photo.location || photo.caption || 'Photo'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => { if (e.currentTarget.src !== LOCAL_FALLBACK_IMAGE) e.currentTarget.src = LOCAL_FALLBACK_IMAGE; }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] flex items-center justify-center">
                        {isVideo ? (
                          <Video className="text-white/50" size={48} />
                        ) : (
                          <Camera className="text-white/50" size={48} />
                        )}
                      </div>
                    )}

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                        <ZoomIn size={20} className="text-gray-800" />
                      </div>
                    </div>

                    {/* Video badge */}
                    {isVideo && (
                      <div className="absolute top-3 left-3 bg-[#CE1126] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Video size={12} /> VIDEO
                      </div>
                    )}

                    {/* Video play button */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play size={28} className="text-[#CE1126] ml-1" fill="#CE1126" />
                        </div>
                      </div>
                    )}

                    {/* Camera info badge */}
                    {photo.camera_make && (
                      <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                        {photo.camera_make} {photo.camera_model}
                      </div>
                    )}

                    {/* Likes badge */}
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                      <Heart size={12} className="text-[#CE1126]" fill="#CE1126" /> {photo.likes_count}
                    </div>

                    {/* Flag stripe at bottom of image */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116]" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#007A5E] transition-colors">
                      {isVideo ? videoTitle : (photo.location || 'Untitled')}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={12} /> {new Date(photo.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
          onClick={() => { setSelectedPhoto(null); setPlayingVideo(null); }}
        >
          <div
            className="max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CameroonStar size={20} className="animate-glow-pulse" />
                <span className="text-white font-black">
                  {selectedPhoto.caption?.startsWith('video:') ? selectedPhoto.caption.replace('video:', '') : selectedPhoto.location}
                </span>
              </div>
              <button
                onClick={() => { setSelectedPhoto(null); setPlayingVideo(null); }}
                className="text-white hover:text-white/80 hover:rotate-90 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Full image */}
            <div className="relative">
              {selectedPhoto.url ? (
                selectedPhoto.caption?.startsWith('video:') ? (
                  playingVideo === selectedPhoto.id ? (
                    <video
                      ref={videoRef}
                      src={selectedPhoto.url}
                      className="w-full max-h-[70vh] object-contain bg-black"
                      controls
                      playsInline
                      preload="auto"
                      muted={false}
                    />
                  ) : (
                    <div className="relative">
                      <img
                        src={selectedPhoto.url}
                        alt={selectedPhoto.location || 'Video thumbnail'}
                        className="w-full max-h-[70vh] object-contain bg-black"
                      />
                      <button
                        onClick={() => setPlayingVideo(selectedPhoto.id)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                          <Play size={36} className="text-[#CE1126] ml-1" fill="#CE1126" />
                        </div>
                      </button>
                    </div>
                  )
                ) : (
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.location || 'Photo'}
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                )
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <Camera size={48} />
                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="p-6 bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {selectedPhoto.camera_make && (
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Camera size={14} /> {selectedPhoto.camera_make} {selectedPhoto.camera_model}
                    </span>
                  )}
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <MapPin size={14} /> {selectedPhoto.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Heart size={20} className="text-[#CE1126]" fill="#CE1126" />
                  <span className="font-bold">{selectedPhoto.likes_count}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#CE1126] to-[#FCD116] text-white font-black rounded-full hover:shadow-xl hover:scale-105 transition-all transform">
                  <Heart size={18} fill="currentColor" /> {t('appreciate')}
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center gap-2">
                  <Eye size={18} /> {t('rate')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
