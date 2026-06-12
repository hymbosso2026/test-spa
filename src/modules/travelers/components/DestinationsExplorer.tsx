import { useState, useRef } from 'react';
import { MapPin, Plane, Calendar, Heart, Eye, ArrowRight, X, Star, Compass, Thermometer, Clock, Cloud, ChevronLeft, ChevronRight, Bookmark, Share2, Send, MessageCircle, ThumbsUp, Clock3, Globe, Sparkles } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  video: string;
  description: string;
  highlights: string[];
  bestTime: string;
  temperature: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  liked: boolean;
  tags: string[];
  isCameroon?: boolean;
}

interface Review {
  id: string;
  destId: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
  rating: number;
  likes: number;
}

const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Kribi',
    country: 'Cameroun',
    image: 'https://images.pexels.com/photos/3155667/pexels-photo-3155667.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/855940/855940-uhd_2560_1440_25fps.mp4',
    description: 'Les plages de Kribi vous enchantent avec leurs sables fin et chauds, les eaux turquoise et les chutes de la Lobee qui se jetent directement dans l\'ocean.',
    highlights: ['Chutes de la Lobee', 'Plage de Kribi', 'Poisson braisé', 'Route en bord de mer'],
    bestTime: 'Decembre - Mars',
    temperature: '25-30°C',
    rating: 4.8,
    reviews: 1240,
    price: '€',
    duration: '3-5 jours',
    liked: false,
    tags: ['plage', 'nature', 'cameroun'],
    isCameroon: true,
  },
  {
    id: '2',
    name: 'Mont Cameroun',
    country: 'Cameroun',
    image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/3576378/3576378-uhd_2560_1440_25fps.mp4',
    description: 'Le plus haut sommet d\'Afrique de l\'Ouest avec 4 095 m. Une ascension spectaculaire qui traverse les forets tropicales, les savanes et les crateres volcaniques.',
    highlights: ['Sommet 4095m', 'Foret tropicale', 'Cratere volcanique', 'Paysage spectaculaire'],
    bestTime: 'Novembre - Fevrier',
    temperature: '5-25°C',
    rating: 4.9,
    reviews: 890,
    price: '€',
    duration: '2-3 jours',
    liked: false,
    tags: ['montagne', 'aventure', 'cameroun'],
    isCameroon: true,
  },
  {
    id: '3',
    name: 'Reserve de Waza',
    country: 'Cameroun',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/2040005/2040005-uhd_2560_1440_25fps.mp4',
    description: 'Le plus grand parc national du Cameroun. Lions, elephants, girafes, hipopotames et plus de 300 especes d\'oiseaux dans leur habitat naturel.',
    highlights: ['Safari en jeep', 'Big Five', 'Observation oiseaux', 'Campement'],
    bestTime: 'Novembre - Avril',
    temperature: '25-40°C',
    rating: 4.7,
    reviews: 650,
    price: '€€',
    duration: '2-4 jours',
    liked: false,
    tags: ['safari', 'nature', 'cameroun'],
    isCameroon: true,
  },
  {
    id: '4',
    name: 'Yaounde',
    country: 'Cameroun',
    image: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/4314358/4314358-uhd_2560_1440_25fps.mp4',
    description: 'La capitale politique du Cameroun avec ses collines, ses jardins fleuris et une ambiance cosmopolite unique en Afrique centrale.',
    highlights: ['Monument de la Reunification', 'Marche Mfoundi', 'Palais de l\'Unite', 'Musee National'],
    bestTime: 'Toute l\'annee',
    temperature: '20-28°C',
    rating: 4.5,
    reviews: 2100,
    price: '€',
    duration: '3-5 jours',
    liked: false,
    tags: ['ville', 'culture', 'cameroun'],
    isCameroon: true,
  },
  {
    id: '5',
    name: 'Douala',
    country: 'Cameroun',
    image: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/4314358/4314358-uhd_2560_1440_25fps.mp4',
    description: 'La capitale economique, vibrante et dynamique. Les ports, le fleuve Wouri, le marche aux poissons et une gastronomie locale exceptionnelle.',
    highlights: ['Pont sur le Wouri', 'Marche aux poissons', 'Gastronomie locale', 'Vie nocturne'],
    bestTime: 'Novembre - Fevrier',
    temperature: '25-32°C',
    rating: 4.6,
    reviews: 1800,
    price: '€',
    duration: '2-4 jours',
    liked: false,
    tags: ['ville', 'culture', 'cameroun'],
    isCameroon: true,
  },
  {
    id: '6',
    name: 'Santorin',
    country: 'Grece',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-travel-161815.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/3737181/3737181-uhd_2560_1440_25fps.mp4',
    description: 'Decouvrez les villages blancs perches sur les falaises avec vue sur la mer Egee. Une experience inoubliable au coeur de la Mediterranee.',
    highlights: ['Villages blancs', 'Couchers de soleil', 'Plages volcaniques', 'Degustation de vins'],
    bestTime: 'Avril - Octobre',
    temperature: '24-28°C',
    rating: 4.9,
    reviews: 3450,
    price: '€€',
    duration: '5-7 jours',
    liked: false,
    tags: ['romantique', 'plage', 'culture'],
  },
  {
    id: '7',
    name: 'Kyoto',
    country: 'Japon',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/3611699/3611699-uhd_2560_1440_25fps.mp4',
    description: 'Temples anciens, jardins zen et rues traditionnelles. Kyoto offre une immersion totale dans la culture japonaise authentique.',
    highlights: ['Temples bouddhistes', 'Ceremonie du the', 'Jardins zen', 'Quartier de Gion'],
    bestTime: 'Mars - Mai, Octobre - Novembre',
    temperature: '15-22°C',
    rating: 4.8,
    reviews: 2890,
    price: '€€€',
    duration: '7-10 jours',
    liked: false,
    tags: ['culture', 'nature', 'historique'],
  },
  {
    id: '8',
    name: 'Masai Mara',
    country: 'Kenya',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/2040005/2040005-uhd_2560_1440_25fps.mp4',
    description: 'Partez a l\'aventure dans la savane africaine. Le spectacle de la grande migration des gnous est un moment unique au monde.',
    highlights: ['Safari en jeep', 'Big Five', 'Migration des gnous', 'Villages Maasai'],
    bestTime: 'Juillet - Octobre',
    temperature: '20-30°C',
    rating: 4.9,
    reviews: 2100,
    price: '€€€',
    duration: '4-6 jours',
    liked: false,
    tags: ['aventure', 'safari', 'nature'],
  },
  {
    id: '9',
    name: 'Dubai',
    country: 'EAU',
    image: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/4314358/4314358-uhd_2560_1440_25fps.mp4',
    description: 'Ou le futur rencontre le luxe. Dubai vous surprendra avec ses gratte-ciel, ses malls et ses experiences uniques au desert.',
    highlights: ['Burj Khalifa', 'Safari desert', 'Dubai Mall', 'Plage JBR'],
    bestTime: 'Novembre - Mars',
    temperature: '25-35°C',
    rating: 4.7,
    reviews: 4100,
    price: '€€€',
    duration: '5-8 jours',
    liked: false,
    tags: ['luxe', 'ville', 'desert'],
  },
  {
    id: '10',
    name: 'Bali',
    country: 'Indonesie',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/855940/855940-uhd_2560_1440_25fps.mp4',
    description: 'L\'ile des dieux vous accueille avec ses rizieres en terrasses, ses temples et ses plages paradisiaques.',
    highlights: ['Rizieres Ubud', 'Temple Tanah Lot', 'Plages de Seminyak', 'Surf a Uluwatu'],
    bestTime: 'Avril - Octobre',
    temperature: '26-32°C',
    rating: 4.8,
    reviews: 5600,
    price: '€',
    duration: '7-14 jours',
    liked: false,
    tags: ['plage', 'culture', 'nature'],
  },
  {
    id: '11',
    name: 'Patagonie',
    country: 'Argentine/Chili',
    image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/3576378/3576378-uhd_2560_1440_25fps.mp4',
    description: 'Aventure au bout du monde. Glaciers, montagnes sauvages et paysages grandioses vous attendent.',
    highlights: ['Glacier Perito Moreno', 'Torres del Paine', 'Randonnee', 'Faune unique'],
    bestTime: 'Decembre - Fevrier',
    temperature: '5-15°C',
    rating: 4.9,
    reviews: 1800,
    price: '€€€',
    duration: '10-14 jours',
    liked: false,
    tags: ['aventure', 'montagne', 'nature'],
  },
  {
    id: '12',
    name: 'Taj Mahal',
    country: 'Inde',
    image: 'https://images.pexels.com/photos/209074/pexels-photo-209074.jpeg?auto=compress&cs=tinysrgb&w=1200',
    video: 'https://videos.pexels.com/video-files/854720/854720-uhd_2560_1440_25fps.mp4',
    description: 'L\'un des sept merveilles du monde moderne. Un monument d\'amour eternal en marbre blanc.',
    highlights: ['Taj Mahal', 'Fort Rouge', 'Bazar de Sadar', 'Yamuna'],
    bestTime: 'Octobre - Mars',
    temperature: '20-35°C',
    rating: 4.8,
    reviews: 6200,
    price: '€',
    duration: '2-3 jours',
    liked: false,
    tags: ['culture', 'historique', 'romantique'],
  },
];

const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', destId: '1', author: 'Aline N.', avatar: 'AN', text: 'Kribi est magnifique! Les chutes de la Lobee sont un spectacle unique. Vive le Cameroun!', date: '2h', rating: 5, likes: 18 },
  { id: 'r2', destId: '1', author: 'Francois M.', avatar: 'FM', text: 'La plage est propre et le poisson braisé est délicieux. J\'y retourne chaque année.', date: '5h', rating: 5, likes: 12 },
  { id: 'r3', destId: '2', author: 'Marie D.', avatar: 'MD', text: 'L\'ascension du Mont Cameroun est difficile mais le paysage au sommet est inoubliable.', date: '1h', rating: 5, likes: 25 },
  { id: 'r4', destId: '3', author: 'Jean P.', avatar: 'JP', text: 'Waza est un safari incroyable. On a vu des elephants et des lions!', date: '3h', rating: 4, likes: 15 },
  { id: 'r5', destId: '6', author: 'Julien R.', avatar: 'JR', text: 'Santorin est un reve. Les couleurs sont incroyables.', date: '30min', rating: 5, likes: 8 },
  { id: 'r6', destId: '8', author: 'Sarah K.', avatar: 'SK', text: 'Le safari est sur ma bucket list. Quelle experience incroyable!', date: '3h', rating: 5, likes: 22 },
];

interface DestinationsExplorerProps {
  language: string;
  onBack?: () => void;
}

export function DestinationsExplorer({ language, onBack }: DestinationsExplorerProps) {
  const t = useTranslation(language);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const [reviewAuthor] = useState('Vous');
  const [reviewAvatar] = useState('V');
  const [activeTab, setActiveTab] = useState<'all' | 'cameroon'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const reviewInputRef = useRef<HTMLTextAreaElement>(null);

  const filteredDestinations = activeTab === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.isCameroon);

  const destReviews = reviews.filter(r => r.destId === selectedDest?.id);

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleReviewLike = (id: string) => {
    setLikedReviews(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addReview = () => {
    if (!newReview.trim() || !selectedDest) return;
    const review: Review = {
      id: `r${Date.now()}`,
      destId: selectedDest.id,
      author: reviewAuthor,
      avatar: reviewAvatar,
      text: newReview.trim(),
      date: 'maintenant',
      rating: newRating,
      likes: 0,
    };
    setReviews(prev => [...prev, review]);
    setNewReview('');
    setNewRating(5);
    setTimeout(() => reviewInputRef.current?.focus(), 100);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007A5E]/5 via-white to-[#FCD116]/5">
      {/* Hero Section with Video */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <video
          controls
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source src="https://videos.pexels.com/video-files/3737181/3737181-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#007A5E]/40 via-[#CE1126]/20 to-[#007A5E]/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Compass size={36} className="text-[#FCD116] animate-float-y" />
              <Plane size={36} className="text-white animate-float-y" style={{ animationDelay: '0.3s' }} />
              <Compass size={36} className="text-[#FCD116] animate-float-y" style={{ animationDelay: '0.6s' }} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-4">
              Explorez le Monde
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold max-w-2xl mx-auto drop-shadow-lg">
              Du Cameroun aux quatre coins du globe, decouvrez, revez, partez.
            </p>
          </div>
          <div className="flex items-center gap-8 mt-10 animate-fade-in-delay">
            <div className="text-center">
              <div className="text-3xl font-black text-[#FCD116]">{DESTINATIONS.length}</div>
              <div className="text-sm text-white/80 font-bold">Destinations</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-black text-[#FCD116]">
                {(DESTINATIONS.reduce((s, d) => s + d.reviews, 0) / 1000).toFixed(0)}k
              </div>
              <div className="text-sm text-white/80 font-bold">Avis</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-black text-[#FCD116]">4.8</div>
              <div className="text-sm text-white/80 font-bold">Moyenne</div>
            </div>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-[#007A5E]/80 backdrop-blur-md text-white font-bold rounded-full hover:bg-[#007A5E] transition-all hover:scale-105"
          >
            <ChevronLeft size={18} /> Retour
          </button>
        )}

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#007A5E]/5 to-transparent" />
      </div>

      {/* Tab Switcher */}
      <div className="sticky top-16 z-30 bg-[#007A5E]/95 backdrop-blur-sm border-b border-[#FCD116]/30 py-3 px-4">
        <div className="max-w-6xl mx-auto flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 ${
              activeTab === 'all'
                ? 'bg-[#FCD116] text-[#007A5E] shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Globe size={14} /> Toutes
          </button>
          <button
            onClick={() => setActiveTab('cameroon')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 ${
              activeTab === 'cameroon'
                ? 'bg-[#FCD116] text-[#007A5E] shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <CameroonStar size={14} /> Cameroun
          </button>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="max-w-6xl mx-auto px-4 -mt-4 relative z-10 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-[#007A5E] flex items-center gap-2">
            <Star size={24} className="text-[#FCD116] animate-glow-pulse" />
            {activeTab === 'cameroon' ? 'Cameroun' : 'Destinations Phares'}
          </h2>
          <div className="flex gap-2">
            <button onClick={scrollLeft} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-all hover:bg-[#FCD116]/20 border border-[#007A5E]/10">
              <ChevronLeft size={20} className="text-[#007A5E]" />
            </button>
            <button onClick={scrollRight} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-all hover:bg-[#FCD116]/20 border border-[#007A5E]/10">
              <ChevronRight size={20} className="text-[#007A5E]" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {filteredDestinations.map((dest, index) => (
            <div
              key={dest.id}
              className="flex-shrink-0 w-72 snap-start animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white border border-[#007A5E]/10"
                onClick={() => setSelectedDest(dest)}>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#007A5E]/80 via-[#CE1126]/10 to-transparent" />

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(dest.id); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${
                      liked.has(dest.id) ? 'bg-[#CE1126] text-white' : 'bg-black/50 text-white'
                    }`}>
                    <Heart size={16} fill={liked.has(dest.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleSave(dest.id); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${
                      saved.has(dest.id) ? 'bg-[#FCD116] text-[#007A5E]' : 'bg-black/50 text-white'
                    }`}>
                    <Bookmark size={16} fill={saved.has(dest.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      dest.isCameroon ? 'bg-[#FCD116] text-[#007A5E]' : 'bg-[#FCD116] text-[#007A5E]'
                    }`}>
                      {dest.country}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                      {dest.price}
                    </span>
                  </div>
                  <h3 className="text-white font-black text-2xl drop-shadow-lg">{dest.name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-[#FCD116]" fill="#FCD116" /> {dest.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {dest.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer size={14} /> {dest.temperature}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Heart size={14} className="text-[#CE1126]" fill="#CE1126" />
                      <span className="text-white/80 text-sm font-bold">
                        {dest.reviews + (liked.has(dest.id) ? 1 : 0)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Explorer <ArrowRight size={14} />
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-[#007A5E] text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                  <MapPin size={12} /> {dest.bestTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-[#007A5E] mb-8 flex items-center gap-2">
          <MapPin size={24} className="text-[#CE1126]" />
          {activeTab === 'cameroon' ? 'Cameroun' : 'Toutes les Destinations'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest, index) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-[#007A5E]/10 hover:border-[#FCD116]/50 group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => setSelectedDest(dest)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#007A5E]/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-[#007A5E] text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                  <MapPin size={12} /> {dest.country}
                </div>
                <div className="absolute top-3 right-3 bg-[#FCD116] text-[#007A5E] text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {dest.rating}
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {dest.price}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116]" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#007A5E] group-hover:text-[#CE1126] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-[#007A5E]/60 text-sm mt-2 line-clamp-2">{dest.description}</p>
                <div className="flex items-center gap-3 mt-3 text-sm text-[#007A5E]/70">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {dest.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Thermometer size={14} /> {dest.temperature}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="text-[#CE1126]" fill="#CE1126" /> {dest.reviews}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {dest.tags.map(tag => (
                    <span key={tag} className="bg-[#007A5E]/10 text-[#007A5E] text-xs font-bold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#007A5E]/10">
                  <span className="text-sm font-bold text-[#007A5E]/60 flex items-center gap-1">
                    <Clock size={14} /> {dest.bestTime}
                  </span>
                  <span className="text-[#CE1126] font-black flex items-center gap-1 text-sm group-hover:translate-x-1 transition-transform">
                    Voir plus <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      {selectedDest && (
        <div className="fixed inset-0 bg-[#007A5E]/90 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedDest(null)}>
          <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}>
            {/* Video Hero */}
            <div className="relative h-64 md:h-80">
              <video
                controls
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={selectedDest.image}
              >
                <source src={selectedDest.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#007A5E]/90 via-[#CE1126]/20 to-transparent" />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button onClick={() => toggleLike(selectedDest.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${
                    liked.has(selectedDest.id) ? 'bg-[#CE1126] text-white' : 'bg-black/50 text-white'
                  }`}>
                  <Heart size={18} fill={liked.has(selectedDest.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => toggleSave(selectedDest.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 ${
                    saved.has(selectedDest.id) ? 'bg-[#FCD116] text-[#007A5E]' : 'bg-black/50 text-white'
                  }`}>
                  <Bookmark size={18} fill={saved.has(selectedDest.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => setSelectedDest(null)} className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:rotate-90 transition-all">
                  <X size={20} />
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#FCD116] text-[#007A5E] text-xs font-black px-3 py-1 rounded-full">
                    {selectedDest.country}
                  </span>
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {selectedDest.price}
                  </span>
                </div>
                <h2 className="text-4xl font-black text-white drop-shadow-lg">{selectedDest.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-[#FCD116]" fill="#FCD116" /> {selectedDest.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {selectedDest.reviews} avis
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {selectedDest.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <p className="text-[#007A5E]/80 text-lg leading-relaxed">{selectedDest.description}</p>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#FCD116]/10 rounded-2xl p-4 text-center border border-[#FCD116]/20">
                  <Calendar size={24} className="mx-auto text-[#007A5E] mb-2" />
                  <div className="text-[#007A5E]/60 text-xs font-bold">Meilleure periode</div>
                  <div className="text-[#007A5E] font-bold text-sm">{selectedDest.bestTime}</div>
                </div>
                <div className="bg-[#FCD116]/10 rounded-2xl p-4 text-center border border-[#FCD116]/20">
                  <Thermometer size={24} className="mx-auto text-[#CE1126] mb-2" />
                  <div className="text-[#007A5E]/60 text-xs font-bold">Temperature</div>
                  <div className="text-[#007A5E] font-bold text-sm">{selectedDest.temperature}</div>
                </div>
                <div className="bg-[#FCD116]/10 rounded-2xl p-4 text-center border border-[#FCD116]/20">
                  <Clock size={24} className="mx-auto text-[#FCD116] mb-2" />
                  <div className="text-[#007A5E]/60 text-xs font-bold">Duree ideale</div>
                  <div className="text-[#007A5E] font-bold text-sm">{selectedDest.duration}</div>
                </div>
                <div className="bg-[#FCD116]/10 rounded-2xl p-4 text-center border border-[#FCD116]/20">
                  <Cloud size={24} className="mx-auto text-[#007A5E] mb-2" />
                  <div className="text-[#007A5E]/60 text-xs font-bold">Budget</div>
                  <div className="text-[#007A5E] font-bold text-sm">{selectedDest.price}</div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-[#007A5E] font-black text-xl mb-4 flex items-center gap-2">
                  <Star size={20} className="text-[#FCD116]" />
                  Points forts
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedDest.highlights.map(h => (
                    <div key={h} className="flex items-center gap-3 bg-[#FCD116]/10 rounded-xl p-3 hover:bg-[#FCD116]/20 transition-colors border border-[#FCD116]/20">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#007A5E] to-[#FCD116] rounded-full flex items-center justify-center">
                        <Star size={14} className="text-white" fill="white" />
                      </div>
                      <span className="text-[#007A5E] font-bold text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedDest.tags.map(tag => (
                  <span key={tag} className="bg-[#007A5E]/10 text-[#007A5E] text-sm font-bold px-4 py-2 rounded-full border border-[#007A5E]/20">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reviews Section */}
              <div className="border-t border-[#007A5E]/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#007A5E] font-black text-xl flex items-center gap-2">
                    <MessageCircle size={20} className="text-[#CE1126]" />
                    Avis & Commentaires ({destReviews.length})
                  </h3>
                  <button
                    onClick={() => setShowReviews(!showReviews)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FCD116]/20 text-[#007A5E] rounded-full font-bold text-sm hover:bg-[#FCD116]/40 transition-all"
                  >
                    <Send size={14} /> Laisser un avis
                  </button>
                </div>

                {/* Review Input */}
                {showReviews && (
                  <div className="bg-[#FCD116]/10 rounded-2xl p-4 mb-4 border border-[#FCD116]/20">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#007A5E] font-bold text-sm">Votre note:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(r => (
                          <button key={r} onClick={() => setNewRating(r)} className="transition-all hover:scale-110">
                            <Star size={20} className={r <= newRating ? 'text-[#FCD116]' : 'text-gray-300'} fill={r <= newRating ? '#FCD116' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#007A5E] to-[#FCD116] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {reviewAvatar}
                      </div>
                      <div className="flex-1">
                        <textarea
                          ref={reviewInputRef}
                          value={newReview}
                          onChange={(e) => setNewReview(e.target.value)}
                          placeholder="Partagez votre experience..."
                          className="w-full bg-white rounded-xl px-3 py-2 text-sm text-[#007A5E] border border-[#007A5E]/20 focus:border-[#FCD116] focus:ring-2 focus:ring-[#FCD116]/20 focus:outline-none resize-none"
                          rows={2}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              addReview();
                            }
                          }}
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={addReview}
                            disabled={!newReview.trim()}
                            className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-[#007A5E] to-[#FCD116] text-white font-bold text-sm rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send size={14} /> Publier
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-3">
                  {destReviews.length === 0 ? (
                    <div className="text-center py-6 text-[#007A5E]/60 text-sm font-bold">
                      <MessageCircle size={24} className="mx-auto mb-2" />
                      Soyez le premier a donner votre avis!
                    </div>
                  ) : (
                    destReviews.map(review => (
                      <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#007A5E]/10">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#007A5E] to-[#FCD116] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {review.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#007A5E] text-sm">{review.author}</span>
                              <span className="text-gray-400 text-xs flex items-center gap-1">
                                <Clock3 size={10} /> {review.date}
                              </span>
                              <div className="flex items-center gap-0.5 ml-auto">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} size={10} className="text-[#FCD116]" fill="#FCD116" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">{review.text}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button
                                onClick={() => toggleReviewLike(review.id)}
                                className={`flex items-center gap-1 text-xs font-bold transition-all ${
                                  likedReviews.has(review.id) ? 'text-[#CE1126]' : 'text-gray-400 hover:text-[#CE1126]'
                                }`}
                              >
                                <ThumbsUp size={12} fill={likedReviews.has(review.id) ? 'currentColor' : 'none'} />
                                {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 py-4 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-xl hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <Plane size={18} /> Reserver maintenant
                </button>
                <button className="flex items-center gap-2 px-6 py-4 bg-[#FCD116]/20 text-[#007A5E] font-bold rounded-xl hover:bg-[#FCD116]/40 transition-all hover:scale-105">
                  <Share2 size={18} /> Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
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
