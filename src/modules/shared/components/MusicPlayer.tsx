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
    id: 'gimset-real',
    title: 'Maitre Gimset - Real Work Vibe',
    artist: 'Studio Edition',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'A longer, richer instrumental mix to give the app a true working soundscape.',
  },
  {
    id: 'gimset-lounge',
    title: 'Maitre Gimset - Lounge Flow',
    artist: 'Live Mix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'A laid-back groove with realistic music quality for focused browsing.',
  },
  {
    id: 'gimset-deep',
    title: 'Maitre Gimset - Deep Rhythm',
    artist: 'Performance Track',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'A deep, warm soundtrack for the duration of your session.',
  },
];

interface MusicPlayerProps {
  language: string;
}

export function MusicPlayer({ language }: MusicPlayerProps) {
  const t = useTranslation(language);
  const [selectedTrack, setSelectedTrack] = useState<Track>(TRACKS[0]);
  const [customTrackUrl, setCustomTrackUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [muted, setMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const customTrack: Track | null = customTrackUrl
    ? {
        id: 'custom',
        title: 'Piste personnalisée',
        artist: 'Lien audio externe',
        src: customTrackUrl,
        description: 'Lecture du lien audio que vous avez fourni.',
      }
    : null;

  const currentTrack = customTrack ?? selectedTrack;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load();

    // apply volume and loop settings
    audio.volume = Math.max(0, Math.min(1, volume / 100));
    audio.muted = muted;
    audio.loop = true;

    if (isPlaying) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrack, isPlaying, volume, muted]);

  // load persisted volume/mute on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('musicVolume');
      const v = raw ? Number(raw) : null;
      if (v !== null && !Number.isNaN(v)) setVolume(Math.max(0, Math.min(100, v)));
      const m = localStorage.getItem('musicMuted');
      if (m !== null) setMuted(m === '1');
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const handleSelectTrack = (track: Track) => {
    setCustomTrackUrl('');
    setSelectedTrack(track);
    setIsPlaying(true);
  };

  const handlePlayCustomTrack = () => {
    if (!customTrackUrl) return;
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

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    try {
      localStorage.setItem('musicVolume', String(value));
    } catch (e) {}
    const audio = audioRef.current;
    if (audio) audio.volume = Math.max(0, Math.min(1, value / 100));
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem('musicMuted', next ? '1' : '0');
    } catch (e) {}
    const audio = audioRef.current;
    if (audio) audio.muted = next;
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

        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] px-5 py-3 text-white font-black shadow-lg hover:scale-[1.02] transition-transform"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />} {isPlaying ? t('pauseTrack') : t('playTrack')}
          </button>

          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 border border-gray-200">
            <button type="button" onClick={toggleMute} className="text-gray-700 hover:text-gray-900">
              {muted ? '🔇' : '🔊'}
            </button>
            <input
              aria-label="Volume"
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-xs font-semibold text-gray-700">{volume}%</span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          {TRACKS.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => handleSelectTrack(track)}
              className={`rounded-3xl border p-4 text-left transition-all hover:shadow-xl ${currentTrack.id === track.id ? 'border-[#FCD116] bg-[#FCD116]/10 shadow-lg' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-gray-900">{track.title}</p>
                  <p className="text-xs text-gray-500">{track.artist}</p>
                </div>
                <span className="text-xs font-semibold text-[#007A5E]">{currentTrack.id === track.id ? '✓' : ''}</span>
              </div>
              <p className="mt-3 text-sm text-gray-600">{track.description}</p>
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-4">
          <label className="block text-sm font-semibold text-gray-700">Lien audio personnalisé</label>
          <input
            type="url"
            value={customTrackUrl}
            onChange={(e) => setCustomTrackUrl(e.target.value)}
            placeholder="Collez ici un lien mp3 ou audio valide"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#007A5E]/30"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePlayCustomTrack}
              disabled={!customTrackUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] px-4 py-2 text-white font-black shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play size={16} /> Play custom link
            </button>
            <span className="text-xs text-gray-500">Utilisez une URL MP3 directe pour écouter un vrai morceau.</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Vous pouvez coller un lien direct vers un fichier audio légal. Si vous n'avez pas de lien, utilisez une piste par défaut.</p>
        </div>
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
        <span className="font-semibold text-gray-700">{t('currentTrack')}:</span> {currentTrack.title}
      </div>
    </section>
  );
}
