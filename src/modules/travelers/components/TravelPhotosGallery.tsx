import { useState, useEffect, useRef } from 'react';
import { MapPin, Heart, Eye, Camera, Star, ArrowLeft, X, ZoomIn, Share2, Bookmark, Play, ChevronRight, Send, MessageCircle, ThumbsUp, Clock } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';

interface TravelPhoto {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  location: string;
  photographer: string;
  avatar: string;
  likes: number;
  views: number;
  category: string;
  isVideo?: boolean;
  videoUrl?: string;
  width: number;
  height: number;
}

interface Comment {
  id: string;
  photoId: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
}

// Cameroun photos from Pexels + international travel photos
const TRAVEL_PHOTOS: TravelPhoto[] = [
  {
    id: 'm1',
    url: 'https://source.unsplash.com/1200x800/?mount%20cameroon',
    thumbnail: 'https://source.unsplash.com/400x300/?mount%20cameroon',
    title: 'Mount Cameroon',
    location: 'Mount Cameroon, Cameroun',
    photographer: 'Local Photographer',
    avatar: 'MC',
    likes: 8421,
    views: 45200,
    category: 'montagne',
    width: 1200, height: 800,
  },
  {
    id: 'm2',
    url: 'https://source.unsplash.com/1200x800/?cameroon,landscape',
    thumbnail: 'https://source.unsplash.com/400x300/?cameroon,landscape',
    title: 'Cameroon Highlands',
    location: 'Bamboutos, Cameroun',
    photographer: 'Local Photographer',
    avatar: 'BH',
    likes: 6320,
    views: 29800,
    category: 'montagne',
    width: 1200, height: 800,
  },
  {
    id: '1',
    url: 'https://images.pexels.com/photos/5833873/pexels-photo-5833873.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/5833873/pexels-photo-5833873.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Fete de la Jeunesse',
    location: 'Yaounde, Cameroun',
    photographer: 'Kamga Paul',
    avatar: 'KP',
    likes: 5421,
    views: 32100,
    category: 'culture',
    width: 800, height: 600,
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/3843885/pexels-photo-3843885.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3843885/pexels-photo-3843885.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Bataille de Ngondo',
    location: 'Douala, Cameroun',
    photographer: 'Emilienne Mbarga',
    avatar: 'EM',
    likes: 4823,
    views: 28900,
    category: 'culture',
    width: 800, height: 1000,
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/161815/santorini-oia-greece-travel-161815.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/161815/santorini-oia-greece-travel-161815.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Santorin Paradisiaque',
    location: 'Santorin, Grece',
    photographer: 'Sophie Laurent',
    avatar: 'SL',
    likes: 7845,
    views: 45420,
    category: 'plage',
    width: 800, height: 600,
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Safari Kenyane',
    location: 'Masai Mara, Kenya',
    photographer: 'James Omondi',
    avatar: 'JO',
    likes: 5678,
    views: 32100,
    category: 'safari',
    width: 800, height: 533,
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/3155667/pexels-photo-3155667.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3155667/pexels-photo-3155667.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Plages de Zanzibar',
    location: 'Zanzibar, Tanzanie',
    photographer: 'Aisha Mbwana',
    avatar: 'AM',
    likes: 4234,
    views: 28900,
    category: 'plage',
    width: 800, height: 1000,
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/3250444/pexels-photo-3250444.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/3250444/pexels-photo-3250444.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Coucher de Soleil',
    location: 'Santorin, Grece',
    photographer: 'Nikos Papadou',
    avatar: 'NP',
    likes: 8932,
    views: 45600,
    category: 'sunset',
    width: 800, height: 600,
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Explore Tokyo',
    location: 'Tokyo, Japon',
    photographer: 'Yuki Tanaka',
    avatar: 'YT',
    likes: 6123,
    views: 34200,
    category: 'ville',
    width: 800, height: 1200,
  },
  {
    id: '8',
    url: 'https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Mediterranee',
    location: 'Positano, Italie',
    photographer: 'Giulia Rossi',
    avatar: 'GR',
    likes: 7545,
    views: 39800,
    category: 'mer',
    width: 800, height: 600,
  },
  {
    id: '9',
    url: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Pharaon Egyptien',
    location: 'Caire, Egypte',
    photographer: 'Amir Hassan',
    avatar: 'AH',
    likes: 3987,
    views: 25600,
    category: 'culture',
    width: 800, height: 1000,
  },
  {
    id: '10',
    url: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Lac de Montagne',
    location: 'Lake Louise, Canada',
    photographer: 'Olivia Smith',
    avatar: 'OS',
    likes: 6789,
    views: 36700,
    category: 'nature',
    width: 800, height: 533,
  },
  {
    id: '11',
    url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Cascade Mystique',
    location: 'Iguazu, Argentine',
    photographer: 'Carlos Mendez',
    avatar: 'CM',
    likes: 5210,
    views: 28900,
    category: 'nature',
    width: 600, height: 900,
  },
  {
    id: '12',
    url: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Campement sous les Etoiles',
    location: 'Dubai, EAU',
    photographer: 'Fatima Al-Rashid',
    avatar: 'FA',
    likes: 3456,
    views: 19800,
    category: 'aventure',
    width: 800, height: 600,
  },
  {
    id: '13',
    url: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Riziere Vietnam',
    location: 'Sapa, Vietnam',
    photographer: 'Minh Nguyen',
    avatar: 'MN',
    likes: 7890,
    views: 42300,
    category: 'nature',
    width: 800, height: 1000,
  },
  {
    id: '14',
    url: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'New York Vibes',
    location: 'Manhattan, USA',
    photographer: 'David Kim',
    avatar: 'DK',
    likes: 9234,
    views: 51200,
    category: 'ville',
    width: 800, height: 1200,
  },
  {
    id: '15',
    url: 'https://images.pexels.com/photos/209074/pexels-photo-209074.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/209074/pexels-photo-209074.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Taj Mahal',
    location: 'Agra, Inde',
    photographer: 'Priya Sharma',
    avatar: 'PS',
    likes: 8123,
    views: 47800,
    category: 'culture',
    width: 800, height: 600,
  },
  {
    id: '16',
    url: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1200',
    thumbnail: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Dubai Skyline',
    location: 'Dubai, EAU',
    photographer: 'Ahmed Khan',
    avatar: 'AK',
    likes: 5678,
    views: 31200,
    category: 'ville',
    width: 800, height: 1000,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Tous', icon: Star },
  { id: 'aventure', label: 'Aventure', icon: MapPin },
  { id: 'plage', label: 'Plage', icon: Camera },
  { id: 'montagne', label: 'Montagne', icon: MapPin },
  { id: 'ville', label: 'Ville', icon: Camera },
  { id: 'nature', label: 'Nature', icon: MapPin },
  { id: 'culture', label: 'Culture', icon: Star },
  { id: 'safari', label: 'Safari', icon: Camera },
];

const INITIAL_COMMENTS: Comment[] = [
  { id: 'c1', photoId: '1', author: 'Aline N.', avatar: 'AN', text: 'Magnifique! La culture camerounaise est tellement riche et vibrante.', date: '2h', likes: 12 },
  { id: 'c2', photoId: '1', author: 'Francois M.', avatar: 'FM', text: 'J\'ai participe a cette fete l\'annee derniere, c\'etait inoubliable!', date: '5h', likes: 8 },
  { id: 'c3', photoId: '2', author: 'Marie D.', avatar: 'MD', text: 'Le Cameroun a tellement de belles traditions. Vive l\'Afrique!', date: '1h', likes: 15 },
  { id: 'c4', photoId: '3', author: 'Julien R.', avatar: 'JR', text: 'Santorin est un reve. Les couleurs sont incroyables.', date: '30min', likes: 6 },
  { id: 'c5', photoId: '4', author: 'Sarah K.', avatar: 'SK', text: 'Le safari est sur ma bucket list. Quelle experience incroyable!', date: '3h', likes: 22 },
];

interface TravelPhotosGalleryProps {
  language: string;
  onBack?: () => void;
}

export function TravelPhotosGallery({ language, onBack }: TravelPhotosGalleryProps) {
  const t = useTranslation(language);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<TravelPhoto | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [savedPhotos, setSavedPhotos] = useState<Set<string>>(new Set());
  const [imageLoaded, setImageLoaded] = useState<Set<string>>(new Set());
  const [scrollY, setScrollY] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor] = useState('Vous');
  const [commentAvatar] = useState('V');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? TRAVEL_PHOTOS
    : TRAVEL_PHOTOS.filter(p => p.category === selectedCategory);

  const photoComments = comments.filter(c => c.photoId === selectedPhoto?.id);

  const toggleLike = (id: string) => {
    setLikedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCommentLike = (id: string) => {
    setLikedComments(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedPhoto) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      photoId: selectedPhoto.id,
      author: commentAuthor,
      avatar: commentAvatar,
      text: newComment.trim(),
      date: 'maintenant',
      likes: 0,
    };
    setComments(prev => [...prev, comment]);
    setNewComment('');
    setTimeout(() => commentInputRef.current?.focus(), 100);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007A5E]/5 via-white to-[#FCD116]/5">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[60vh] min-h-[400px] overflow-hidden"
      >
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5833873/pexels-photo-5833873.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#007A5E]/40 via-[#CE1126]/20 to-[#007A5E]/70" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FCD116]/60 rounded-full animate-float-star"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CameroonStar size={40} className="animate-glow-pulse text-[#FCD116]" />
              <Camera size={40} className="text-white animate-float-y" />
              <CameroonStar size={40} className="animate-glow-pulse text-[#FCD116]" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-4">
              {t('gallery') || 'Galerie de Voyage'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold max-w-2xl mx-auto drop-shadow-lg">
              {t('gallerySubtitle') || 'Decouvrez les plus belles destinations du monde et du Cameroun'}
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-8 mt-10 animate-fade-in-delay">
            <div className="text-center">
              <div className="text-3xl font-black text-[#FCD116]">{TRAVEL_PHOTOS.length}</div>
              <div className="text-sm text-white/80 font-bold">Destinations</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-black text-[#FCD116]">
                {TRAVEL_PHOTOS.reduce((s, p) => s + p.likes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-white/80 font-bold">J\'aime</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-black text-[#FCD116]">
                {CATEGORIES.length - 1}
              </div>
              <div className="text-sm text-white/80 font-bold">Categories</div>
            </div>
          </div>
        </div>

        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-[#007A5E]/80 backdrop-blur-md text-white font-bold rounded-full hover:bg-[#007A5E] transition-all hover:scale-105"
          >
            <ArrowLeft size={18} /> Retour
          </button>
        )}

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#007A5E]/5 to-transparent" />
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-[#007A5E]/95 backdrop-blur-sm border-b border-[#FCD116]/30 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all hover:scale-105 ${
                    isActive
                      ? 'bg-[#FCD116] text-[#007A5E] shadow-lg border-2 border-[#FCD116]'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-[#FCD116]/40'
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Masonry Photo Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="break-inside-avoid animate-slide-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-[#007A5E]/10 hover:border-[#FCD116]/50"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={photo.thumbnail}
                    alt={photo.title}
                    className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      imageLoaded.has(photo.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ aspectRatio: `${photo.width}/${photo.height}` }}
                    onLoad={() => setImageLoaded(prev => new Set(prev).add(photo.id))}
                    loading="lazy"
                  />
                  {!imageLoaded.has(photo.id) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#007A5E]/20 to-[#FCD116]/20 animate-pulse" style={{ aspectRatio: `${photo.width}/${photo.height}` }} />
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#007A5E]/70 via-[#CE1126]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-[#FCD116] text-[#007A5E] text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                      {photo.category}
                    </span>
                    {photo.location.includes('Cameroun') && (
                      <span className="bg-[#CE1126] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                        Cameroun
                      </span>
                    )}
                  </div>

                  {/* Top right actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSave(photo.id); }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${
                        savedPhotos.has(photo.id) ? 'bg-[#FCD116] text-[#007A5E]' : 'bg-black/50 text-white'
                      }`}
                    >
                      <Bookmark size={16} fill={savedPhotos.has(photo.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(photo.id); }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${
                        likedPhotos.has(photo.id) ? 'bg-[#CE1126] text-white' : 'bg-black/50 text-white'
                      }`}
                    >
                      <Heart size={16} fill={likedPhotos.has(photo.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Play button for video */}
                  {photo.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 bg-[#FCD116]/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={28} className="text-[#CE1126] ml-1" fill="#CE1126" />
                      </div>
                    </div>
                  )}

                  {/* Bottom info */}
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-black text-lg drop-shadow-lg">{photo.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                      <MapPin size={12} /> {photo.location}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {photo.avatar}
                        </div>
                        <span className="text-white/90 text-sm font-bold">{photo.photographer}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80 text-sm">
                        <span className="flex items-center gap-1">
                          <Heart size={12} /> {photo.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} /> {photo.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom stripe */}
                <div className="h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116]" />
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 animate-bounce-in">
            <Camera size={64} className="mx-auto text-[#007A5E]/30 mb-4" />
            <p className="text-[#007A5E] text-lg font-semibold">Aucune photo dans cette categorie</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-[#007A5E]/90 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {selectedPhoto.avatar}
                </div>
                <div>
                  <div className="text-white font-black text-sm">{selectedPhoto.photographer}</div>
                  <div className="text-white/70 text-xs flex items-center gap-1">
                    <MapPin size={10} /> {selectedPhoto.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm transition-all ${
                    showComments ? 'bg-[#FCD116] text-[#007A5E]' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <MessageCircle size={14} /> {photoComments.length}
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-white hover:text-white/80 hover:rotate-90 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Full image */}
              <div className="relative flex-1 bg-black">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full max-h-[65vh] md:max-h-[70vh] object-contain"
                />
              </div>

              {/* Comments panel */}
              {showComments && (
                <div className="w-full md:w-80 bg-[#FCD116]/10 border-l border-[#007A5E]/10 flex flex-col max-h-[300px] md:max-h-[70vh]">
                  <div className="p-4 border-b border-[#007A5E]/10">
                    <h3 className="text-[#007A5E] font-black text-lg flex items-center gap-2">
                      <MessageCircle size={18} /> Commentaires ({photoComments.length})
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {photoComments.length === 0 ? (
                      <div className="text-center py-6 text-[#007A5E]/60 text-sm font-bold">
                        <MessageCircle size={24} className="mx-auto mb-2" />
                        Soyez le premier a commenter!
                      </div>
                    ) : (
                      photoComments.map(comment => (
                        <div key={comment.id} className="bg-white rounded-xl p-3 shadow-sm border border-[#007A5E]/10">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#007A5E] to-[#FCD116] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                              {comment.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#007A5E] text-sm">{comment.author}</span>
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                  <Clock size={10} /> {comment.date}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  onClick={() => toggleCommentLike(comment.id)}
                                  className={`flex items-center gap-1 text-xs font-bold transition-all ${
                                    likedComments.has(comment.id) ? 'text-[#CE1126]' : 'text-gray-400 hover:text-[#CE1126]'
                                  }`}
                                >
                                  <ThumbsUp size={12} fill={likedComments.has(comment.id) ? 'currentColor' : 'none'} />
                                  {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                                </button>
                                <button className="text-xs font-bold text-gray-400 hover:text-[#007A5E] transition-all">
                                  Repondre
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-4 border-t border-[#007A5E]/10">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#007A5E] to-[#FCD116] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {commentAvatar}
                      </div>
                      <div className="flex-1">
                        <textarea
                          ref={commentInputRef}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Ajouter un commentaire..."
                          className="w-full bg-white rounded-xl px-3 py-2 text-sm text-gray-700 border border-[#007A5E]/20 focus:border-[#FCD116] focus:ring-2 focus:ring-[#FCD116]/20 focus:outline-none resize-none"
                          rows={2}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              addComment();
                            }
                          }}
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={addComment}
                            disabled={!newComment.trim()}
                            className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-[#007A5E] to-[#FCD116] text-white font-bold text-sm rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send size={14} /> Envoyer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-[#FCD116]/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#007A5E] font-black text-xl">{selectedPhoto.title}</h3>
                  <p className="text-[#007A5E]/70 text-sm flex items-center gap-2 mt-1">
                    <span className="bg-[#FCD116]/30 text-[#007A5E] px-2 py-0.5 rounded-full text-xs font-bold">
                      {selectedPhoto.category}
                    </span>
                    <MapPin size={12} /> {selectedPhoto.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(selectedPhoto.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all hover:scale-105 ${
                      likedPhotos.has(selectedPhoto.id)
                        ? 'bg-[#CE1126] text-white'
                        : 'bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#CE1126]/20'
                    }`}
                  >
                    <Heart size={18} fill={likedPhotos.has(selectedPhoto.id) ? 'currentColor' : 'none'} />
                    {selectedPhoto.likes + (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#007A5E]/10 text-[#007A5E] rounded-full font-bold hover:bg-[#007A5E]/20 transition-all hover:scale-105">
                    <Share2 size={16} /> Partager
                  </button>
                  <button
                    onClick={() => toggleSave(selectedPhoto.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all hover:scale-105 ${
                      savedPhotos.has(selectedPhoto.id)
                        ? 'bg-[#FCD116] text-[#007A5E]'
                        : 'bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#FCD116]/20'
                    }`}
                  >
                    <Bookmark size={16} fill={savedPhotos.has(selectedPhoto.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all hover:scale-105 ${
                      showComments ? 'bg-[#007A5E] text-[#FCD116]' : 'bg-[#007A5E]/10 text-[#007A5E] hover:bg-[#007A5E]/20'
                    }`}
                  >
                    <MessageCircle size={16} />
                    {photoComments.length}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative footer */}
      <div className="flex justify-center gap-4 py-12 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116]">
        <CameroonStar size={16} className="animate-float-star text-white" />
        <CameroonStar size={12} className="animate-float-star text-white" style={{ animationDelay: '0.5s' }} />
        <CameroonStar size={20} className="animate-float-star text-white" style={{ animationDelay: '1s' }} />
        <CameroonStar size={12} className="animate-float-star text-white" style={{ animationDelay: '1.5s' }} />
        <CameroonStar size={16} className="animate-float-star text-white" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}
