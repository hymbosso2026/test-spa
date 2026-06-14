import { useState } from 'react';
import { X, Camera as CameraIcon, RotateCcw, ZoomIn, ZoomOut, Timer, Sparkles, Sun, Moon, Aperture, Maximize2, Image as ImageIcon } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useCamera } from '../../shared/hooks';
import { useTranslation } from '../../shared/hooks';

type CameraFilter = 'none' | 'warm' | 'cool' | 'vintage' | 'dramatic' | 'bw' | 'hdr' | 'vivid';

const FILTERS: { id: CameraFilter; label: string; color: string; icon: typeof Sun }[] = [
  { id: 'none', label: 'Normal', color: 'bg-gray-200', icon: Sun },
  { id: 'warm', label: 'Warm', color: 'bg-orange-300', icon: Sun },
  { id: 'cool', label: 'Cool', color: 'bg-blue-300', icon: Moon },
  { id: 'vintage', label: 'Vintage', color: 'bg-amber-400', icon: Aperture },
  { id: 'dramatic', label: 'Drama', color: 'bg-red-400', icon: Sparkles },
  { id: 'bw', label: 'B&W', color: 'bg-gray-500', icon: Maximize2 },
  { id: 'hdr', label: 'HDR', color: 'bg-cyan-400', icon: Aperture },
  { id: 'vivid', label: 'Vivid', color: 'bg-green-400', icon: ImageIcon },
];

const FILTER_CSS: Record<CameraFilter, string> = {
  none: '',
  warm: 'sepia(0.2) saturate(1.5) brightness(1.05)',
  cool: 'saturate(0.9) hue-rotate(20deg) brightness(1.1)',
  vintage: 'sepia(0.4) contrast(1.1) brightness(0.95) saturate(1.2)',
  dramatic: 'contrast(1.4) brightness(0.9) saturate(1.3)',
  bw: 'grayscale(1) contrast(1.2) brightness(1.05)',
  hdr: 'contrast(1.25) saturate(1.4) brightness(1.08)',
  vivid: 'saturate(2.0) contrast(1.15) brightness(1.02)',
};

interface CameraCaptureProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
  onCapture: (blob: Blob) => void;
}

export function CameraCapture({ language, isOpen, onClose, onCapture }: CameraCaptureProps) {
  const t = useTranslation(language);
  const {
    videoRef,
    streaming,
    error,
    facingMode,
    zoom,
    filter,
    countdown,
    startCamera,
    stopCamera,
    capturePhoto,
    flipCamera,
    setZoom,
    setFilter,
    startCountdown,
  } = useCamera();

  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);

  const handleOpenCamera = async () => {
    await startCamera({ audio: false, video: true });
  };

  const handleCapturePhoto = async () => {
    const blob = await capturePhoto();
    if (blob) {
      const url = URL.createObjectURL(blob);
      setCapturedPreview(url);
    }
  };

  const handleTimerCapture = (seconds: number) => {
    startCountdown(seconds, async () => {
      await handleCapturePhoto();
    });
  };

  const handleSave = () => {
    if (capturedPreview) {
      fetch(capturedPreview)
        .then((r) => r.blob())
        .then((blob) => {
          onCapture(blob);
          handleClose();
        });
    }
  };

  const handleRetake = () => {
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
      setCapturedPreview(null);
    }
  };

  const handleClose = () => {
    stopCamera();
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
      setCapturedPreview(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <div className="bg-gray-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-700/50 animate-scale-in">
        {/* Header with Cameroon flag gradient */}
        <div className="bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CameroonStar size={24} className="animate-glow-pulse" />
            <h2 className="text-xl font-black text-white">{t('openCamera')}</h2>
          </div>
          <div className="flex items-center gap-2">
            {streaming && (
              <span className="text-white/70 text-xs font-bold bg-white/10 px-2 py-1 rounded-full">
                1080p HD
              </span>
            )}
            <button onClick={handleClose} className="text-white hover:text-white/80 hover:rotate-90 transition-all duration-300">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-4 bg-[#CE1126]/20 text-[#CE1126] rounded-xl text-sm font-bold">
              {error}
            </div>
          )}

          {!streaming && !capturedPreview ? (
            <div className="space-y-6 py-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center animate-glow-pulse">
                    <CameraIcon size={44} className="text-white" />
                  </div>
                  <div className="absolute inset-0 w-28 h-28 rounded-full border-2 border-[#FCD116]/40 animate-pulse-ring" />
                </div>
              </div>
              <button
                onClick={handleOpenCamera}
                className="w-full py-4 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] transform text-lg"
              >
                <CameraIcon size={22} /> {t('allowCamera')}
              </button>
              <p className="text-sm text-gray-400 text-center">{t('cameraAccess')}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-800 rounded-xl p-3">
                  <Aperture size={18} className="mx-auto text-[#FCD116] mb-1" />
                  <span className="text-xs text-gray-400 font-bold">8 Filters</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <ZoomIn size={18} className="mx-auto text-[#007A5E] mb-1" />
                  <span className="text-xs text-gray-400 font-bold">5x Zoom</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <Timer size={18} className="mx-auto text-[#CE1126] mb-1" />
                  <span className="text-xs text-gray-400 font-bold">Timer</span>
                </div>
              </div>
            </div>
          ) : capturedPreview ? (
            /* Preview captured photo */
            <div className="space-y-4 animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={capturedPreview} alt="Captured" className="w-full rounded-2xl" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-[#007A5E]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {filter !== 'none' ? FILTERS.find(f => f.id === filter)?.label : 'HD'}
                  </span>
                  <span className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    1080p
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-[#FCD116] text-gray-900 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> Saved
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  className="flex-1 py-3.5 bg-gray-700 text-white font-black rounded-xl hover:bg-gray-600 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] transform"
                >
                  <RotateCcw size={18} /> {t('retakePhoto')}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] transform"
                >
                  <Sparkles size={18} /> {t('save')}
                </button>
              </div>
            </div>
          ) : (
            /* Live camera view */
            <div className="space-y-3">
              {/* Video preview with filter */}
              <div className="relative rounded-2xl overflow-hidden bg-black shadow-inner">
                <video
                  ref={videoRef}
                  className="w-full rounded-2xl"
                  style={{
                    transform: `scale(${zoom}) ${facingMode === 'user' ? 'scaleX(-1)' : ''}`,
                    filter: filter !== 'none' ? FILTER_CSS[filter] : undefined,
                    transition: 'transform 0.3s ease, filter 0.3s ease',
                  }}
                  autoPlay
                  playsInline
                  muted
                />

                {/* Countdown overlay */}
                {countdown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-8xl font-black text-white animate-bounce-in drop-shadow-2xl">
                      {countdown}
                    </span>
                  </div>
                )}

                {/* Zoom indicator */}
                {zoom > 1 && (
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {zoom.toFixed(1)}x
                  </div>
                )}

                {/* Camera info badges */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-[#007A5E]/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {facingMode === 'user' ? 'Selfie' : 'Photo'}
                  </span>
                  <span className="bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    1080p
                  </span>
                </div>

                {/* Current filter badge */}
                {filter !== 'none' && (
                  <div className="absolute top-3 left-3 bg-[#FCD116]/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    {FILTERS.find(f => f.id === filter)?.label}
                  </div>
                )}

                {/* Golden capture ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 border-2 border-[#FCD116]/40 rounded-full animate-pulse-ring" />
                </div>

                {/* Rule of thirds grid */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/10" />
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-white/10" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-white/10" />
                </div>
              </div>

              {/* Filter selector */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all ${
                      filter === f.id ? 'bg-[#FCD116]/20 ring-2 ring-[#FCD116]' : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full ${f.color} border-2 ${filter === f.id ? 'border-[#FCD116]' : 'border-gray-600'} flex items-center justify-center`}>
                      <f.icon size={14} className={`${f.id === 'bw' ? 'text-white' : 'text-gray-800'}`} />
                    </div>
                    <span className="text-[10px] text-gray-300 font-bold">{f.label}</span>
                  </button>
                ))}
              </div>

              {/* Zoom slider */}
              <div className="flex items-center gap-3 px-2">
                <ZoomOut size={16} className="text-gray-400" />
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-[#FCD116]"
                />
                <ZoomIn size={16} className="text-gray-400" />
                <span className="text-white font-bold text-xs min-w-[2.5rem] text-right">{zoom.toFixed(1)}x</span>
              </div>

              {/* Camera controls */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={flipCamera}
                  className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-all hover:scale-110 transform"
                  title="Flip camera"
                >
                  <RotateCcw size={20} />
                </button>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleTimerCapture(3)}
                    className="p-2.5 bg-gray-800 rounded-full text-[#FCD116] hover:bg-gray-700 transition-all hover:scale-110 transform text-xs font-bold flex items-center gap-1"
                    title="3s timer"
                  >
                    <Timer size={16} /> 3s
                  </button>
                  <button
                    onClick={() => handleTimerCapture(10)}
                    className="p-2.5 bg-gray-800 rounded-full text-[#CE1126] hover:bg-gray-700 transition-all hover:scale-110 transform text-xs font-bold flex items-center gap-1"
                    title="10s timer"
                  >
                    <Moon size={14} /> 10s
                  </button>
                </div>

                <button
                  onClick={() => setFilter(filter === 'none' ? 'hdr' : 'none')}
                  className="p-3 bg-gray-800 rounded-full text-[#FCD116] hover:bg-gray-700 transition-all hover:scale-110 transform"
                  title="Toggle HDR"
                >
                  <Sun size={20} />
                </button>
              </div>

              {/* Capture button */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-all text-sm"
                >
                  {t('close')}
                </button>

                <button
                  onClick={handleCapturePhoto}
                  className="bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all transform active:scale-95 ring-4 ring-white/20"
                  style={{ width: '4.5rem', height: '4.5rem' }}
                >
                  <CameraIcon size={28} className="text-white" />
                </button>

                <button
                  className="px-5 py-2.5 bg-gray-700 text-[#FCD116] font-bold rounded-full hover:bg-gray-600 transition-all flex items-center gap-1.5 text-sm"
                  onClick={() => setFilter(filter === 'none' ? 'vivid' : 'none')}
                >
                  <Sparkles size={16} /> FX
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
