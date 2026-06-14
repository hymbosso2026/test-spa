import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Music2 } from 'lucide-react';
import { useTranslation } from '../hooks';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  description: string;
}

const TRACKS: Track[] = [
  {
    id: 'love-flow',
    title: 'Maitre Gi - Love Flow',
    artist: 'Focus Playlist',
    src: 'https://assets.mixkit.co/active_storage/sfx/2867/2867-preview.mp3',
    description: 'A calm music track for focused work and travel browsing.',
  },
  {
    id: 'romance-beat',
    title: 'Maitre Gi - Romance Beat',
    artist: 'Soft Love',
    src: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
    description: 'A gentle romantic rhythm to keep the mood light and creative.',
  },
  {
    id: 'serene-study',
    title: 'Love & Study',
    artist: 'Ambient Focus',
    src: 'https://assets.mixkit.co/active_storage/sfx/2823/2823-preview.mp3',
    description: 'A relaxing composition for productive sessions and planning.',
  },
];

interface MusicPlayerProps {
  language: string;
}

export function MusicPlayer({ language }: MusicPlayerProps) {
  const t = useTranslation(language);
  const [selectedTrack, setSelectedTrack] = useState<Track>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load();

    if (isPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [selectedTrack, isPlaying]);

  const handleSelectTrack = (track: Track) => {
    setSelectedTrack(track);
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <section className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-5">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#007A5E]/10 text-[#007A5E] font-bold text-sm">
            <Music2 size={18} /> {t('musicTitle')}
          </div>
          <h3 className="mt-3 text-xl font-black text-gray-900">{t('musicSubtitle')}</h3>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">{t('musicPlaylist')}</p>
        </div>

        <button
          type="button"
          onClick={togglePlayback}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] px-5 py-3 text-white font-black shadow-lg hover:scale-[1.02] transition-transform"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />} {isPlaying ? t('pauseTrack') : t('playTrack')}
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {TRACKS.map((track) => (
          <button
            key={track.id}
            type="button"
            onClick={() => handleSelectTrack(track)}
            className={`rounded-3xl border p-4 text-left transition-all hover:shadow-xl ${selectedTrack.id === track.id ? 'border-[#FCD116] bg-[#FCD116]/10 shadow-lg' : 'border-gray-200 bg-white'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-gray-900">{track.title}</p>
                <p className="text-xs text-gray-500">{track.artist}</p>
              </div>
              <span className="text-xs font-semibold text-[#007A5E]">{selectedTrack.id === track.id ? '✓' : ''}</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">{track.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-3xl overflow-hidden border border-gray-200 bg-gray-100">
        <audio
          ref={audioRef}
          controls
          className="w-full bg-gray-100"
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
        >
          <source src={selectedTrack.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">{t('currentTrack')}:</span> {selectedTrack.title}
      </div>
    </section>
  );
}
