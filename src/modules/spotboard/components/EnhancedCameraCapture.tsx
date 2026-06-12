import { useState, useRef, useCallback } from 'react';
import { X, Camera as CameraIcon, RotateCcw, ZoomIn, ZoomOut, Timer, Sparkles, Sun, Moon, Aperture, Maximize2, Image as ImageIcon, Focus, Contrast, Grid3X3, CloudSun, Droplets, Layers, Wand2, Zap } from 'lucide-react';
import { CameroonStar } from '../../shared/components';
import { useTranslation } from '../../shared/hooks';

type CameraFilter = 'none' | 'warm' | 'cool' | 'vintage' | 'dramatic' | 'bw' | 'hdr' | 'vivid' | 'portrait' | 'landscape' | 'night' | 'golden' | 'aqua' | 'cinematic';

const FILTERS: { id: CameraFilter; label: string; color: string; icon: typeof Sun }[] = [
  { id: 'none', label: 'Normal', color: 'bg-gray-200', icon: Sun },
  { id: 'warm', label: 'Warm', color: 'bg-orange-300', icon: Sun },
  { id: 'cool', label: 'Cool', color: 'bg-blue-300', icon: Moon },
  { id: 'vintage', label: 'Vintage', color: 'bg-amber-400', icon: Aperture },
  { id: 'dramatic', label: 'Drama', color: 'bg-red-400', icon: Sparkles },
  { id: 'bw', label: 'B&W', color: 'bg-gray-500', icon: Maximize2 },
  { id: 'hdr', label: 'HDR', color: 'bg-cyan-400', icon: Aperture },
  { id: 'vivid', label: 'Vivid', color: 'bg-green-400', icon: ImageIcon },
  { id: 'portrait', label: 'Portrait', color: 'bg-pink-400', icon: Focus },
  { id: 'landscape', label: 'Paysage', color: 'bg-emerald-400', icon: CloudSun },
  { id: 'night', label: 'Nuit', color: 'bg-indigo-400', icon: Moon },
  { id: 'golden', label: 'Golden', color: 'bg-yellow-500', icon: Droplets },
  { id: 'aqua', label: 'Aqua', color: 'bg-teal-400', icon: Layers },
  { id: 'cinematic', label: 'Cine', color: 'bg-purple-400', icon: Wand2 },
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
  portrait: 'contrast(1.05) saturate(1.2) brightness(1.02) blur(0.5px)',
  landscape: 'saturate(1.4) contrast(1.1) brightness(1.05) hue-rotate(-5deg)',
  night: 'brightness(0.85) contrast(1.3) saturate(0.8)',
  golden: 'sepia(0.3) saturate(1.5) brightness(1.08) contrast(1.1)',
  aqua: 'saturate(1.3) hue-rotate(10deg) brightness(1.05) contrast(1.1)',
  cinematic: 'contrast(1.2) saturate(1.1) brightness(0.95) sepia(0.1)',
};

const ASPECT_RATIOS = [
  { label: '4:3', w: 4, h: 3 },
  { label: '16:9', w: 16, h: 9 },
  { label: '1:1', w: 1, h: 1 },
  { label: '3:4', w: 3, h: 4 },
  { label: '2.39:1', w: 2.39, h: 1 },
];

interface EnhancedCameraCaptureProps {
  language: string;
  isOpen: boolean;
  onClose: () => void;
  onCapture: (blob: Blob) => void;
}

export function EnhancedCameraCapture({ language, isOpen, onClose, onCapture }: EnhancedCameraCaptureProps) {
  const t = useTranslation(language);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState<CameraFilter>('none');
  const [countdown, setCountdown] = useState(0);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(0);
  const [flashMode, setZapMode] = useState(false);
  const [exposure, setExposure] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [resolution, setResolution] = useState('4K');
  const [isRecording, setIsRecording] = useState(false);

  const getCanvas = useCallback((): HTMLCanvasElement => {
    if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
    return canvasRef.current;
  }, []);

  const startCamera = async () => {
    try {
      setError('');
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('Camera API not supported');
        return;
      }
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode,
          width: resolution === '4K' ? { ideal: 3840 } : { ideal: 1920 },
          height: resolution === '4K' ? { ideal: 2160 } : { ideal: 1080 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setStreaming(true);
        };
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to access camera');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStreaming(false);
  };

  const flipCamera = async () => {
    const next = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(next);
    if (streaming) {
      stopCamera();
      await new Promise(r => setTimeout(r, 300));
      await startCamera();
    }
  };

  const startCountdown = (seconds: number) => {
    setCountdown(seconds);
    let remaining = seconds;
    const interval = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setCountdown(0);
        handleCapturePhoto();
      }
    }, 1000);
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current || !streaming) return;
    const video = videoRef.current;
    const canvas = getCanvas();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const z = zoom;
    const zoomedW = video.videoWidth / z;
    const zoomedH = video.videoHeight / z;
    const sx = (video.videoWidth - zoomedW) / 2;
    const sy = (video.videoHeight - zoomedH) / 2;

    ctx.drawImage(video, sx, sy, zoomedW, zoomedH, 0, 0, canvas.width, canvas.height);

    if (filter !== 'none') {
      ctx.filter = FILTER_CSS[filter];
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
    }

    if (flashMode) {
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (showGrid) {
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 3, 0); ctx.lineTo(canvas.width / 3, canvas.height);
      ctx.moveTo(2 * canvas.width / 3, 0); ctx.lineTo(2 * canvas.width / 3, canvas.height);
      ctx.moveTo(0, canvas.height / 3); ctx.lineTo(canvas.width, canvas.height / 3);
      ctx.moveTo(0, 2 * canvas.height / 3); ctx.lineTo(canvas.width, 2 * canvas.height / 3);
      ctx.stroke();
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setCapturedPreview(url);
      }
    }, 'image/jpeg', 0.95);
  };

  const handleSave = () => {
    if (capturedPreview) {
      fetch(capturedPreview)
        .then(r => r.blob())
        .then(blob => {
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
    setZoom(1);
    setFilter('none');
    setShowGrid(true);
    setExposure(0);
    setZapMode(false);
    setIsRecording(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-2 md:p-4 z-50 backdrop-blur-md">
      <div className="bg-gray-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-700/50 animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CameroonStar size={20} className="animate-glow-pulse" />
            <h2 className="text-lg font-black text-white">Appareil Pro</h2>
          </div>
          <div className="flex items-center gap-2">
            {streaming && (
              <span className="text-white/70 text-xs font-bold bg-white/10 px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {resolution}
              </span>
            )}
            <button onClick={handleClose} className="text-white hover:text-white/80 hover:rotate-90 transition-all duration-300">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="p-3">
          {error && (
            <div className="mb-3 p-3 bg-[#CE1126]/20 text-[#CE1126] rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          {!streaming && !capturedPreview ? (
            <div className="space-y-4 py-6">
              {/* Professional camera intro */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center animate-glow-pulse">
                    <CameraIcon size={40} className="text-white" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-[#FCD116]/40 animate-pulse-ring" />
                  <div className="absolute inset-0 w-24 h-24 rounded-full border border-white/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-white font-black text-xl">Camera Professionnelle</h3>
                <p className="text-gray-400 text-sm mt-1">Capturez vos moments en qualite exceptionnelle</p>
              </div>

              {/* Resolution selector */}
              <div className="flex justify-center gap-2">
                {['HD', 'Full HD', '4K'].map(r => (
                  <button
                    key={r}
                    onClick={() => setResolution(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      resolution === r
                        ? 'bg-[#FCD116] text-gray-900'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <button
                onClick={startCamera}
                className="w-full py-3.5 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] transform text-lg"
              >
                <CameraIcon size={22} /> Demarrer
              </button>

              {/* Feature grid */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-800 rounded-xl p-2">
                  <Layers size={16} className="mx-auto text-[#FCD116] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">14 Filtres</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-2">
                  <ZoomIn size={16} className="mx-auto text-[#007A5E] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">10x Zoom</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-2">
                  <Timer size={16} className="mx-auto text-[#CE1126] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">Timer</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-2">
                  <Grid3X3 size={16} className="mx-auto text-[#FCD116] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">Grille</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-2">
                  <Zap size={16} className="mx-auto text-[#FCD116] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">Zap</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-2">
                  <Contrast size={16} className="mx-auto text-[#007A5E] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">HDR</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-2">
                  <Wand2 size={16} className="mx-auto text-[#CE1126] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">Beaute</span>
                </div>
                <div className="bg-gray-800 rounded-xl p-2">
                  <Maximize2 size={16} className="mx-auto text-[#FCD116] mb-1" />
                  <span className="text-[10px] text-gray-400 font-bold">4K</span>
                </div>
              </div>
            </div>
          ) : capturedPreview ? (
            <div className="space-y-3 animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={capturedPreview} alt="Captured" className="w-full rounded-2xl" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-[#007A5E]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {filter !== 'none' ? FILTERS.find(f => f.id === filter)?.label : 'HD'}
                  </span>
                  <span className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {resolution}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-[#FCD116] text-gray-900 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> Excellent!
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRetake}
                  className="flex-1 py-3 bg-gray-700 text-white font-black rounded-xl hover:bg-gray-600 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] transform"
                >
                  <RotateCcw size={18} /> Reprendre
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-gradient-to-r from-[#007A5E] via-[#CE1126] to-[#FCD116] text-white font-black rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] transform"
                >
                  <Sparkles size={18} /> Sauvegarder
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Video preview */}
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

                {countdown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-7xl font-black text-white animate-bounce-in drop-shadow-2xl">
                      {countdown}
                    </span>
                  </div>
                )}

                {zoom > 1 && (
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {zoom.toFixed(1)}x
                  </div>
                )}

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-[#007A5E]/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {facingMode === 'user' ? 'Selfie' : 'Photo'}
                  </span>
                  <span className="bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {resolution}
                  </span>
                </div>

                {filter !== 'none' && (
                  <div className="absolute top-3 left-3 bg-[#FCD116]/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    {FILTERS.find(f => f.id === filter)?.label}
                  </div>
                )}

                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full" /> REC
                  </div>
                )}

                {/* Grid overlay */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10" />
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/10" />
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white/10" />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white/10" />
                  </div>
                )}

                {/* Golden ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 border-2 border-[#FCD116]/30 rounded-full animate-pulse-ring" />
                </div>
              </div>

              {/* Filter carousel */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {FILTERS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all ${
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

              {/* Advanced controls toggle */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-xs text-gray-400 font-bold flex items-center gap-1 hover:text-gray-300 transition-colors"
                >
                  <Wand2 size={12} />
                  {showAdvanced ? 'Masquer avance' : 'Reglages avances'}
                </button>
              </div>

              {/* Advanced controls */}
              {showAdvanced && (
                <div className="space-y-2 bg-gray-800 rounded-xl p-3 animate-slide-up">
                  {/* Zoom */}
                  <div className="flex items-center gap-2">
                    <ZoomOut size={14} className="text-gray-400" />
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-[#FCD116]"
                    />
                    <ZoomIn size={14} className="text-gray-400" />
                    <span className="text-white font-bold text-xs min-w-[2.5rem] text-right">{zoom.toFixed(1)}x</span>
                  </div>

                  {/* Exposure */}
                  <div className="flex items-center gap-2">
                    <Sun size={14} className="text-gray-400" />
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      value={exposure}
                      onChange={(e) => setExposure(parseFloat(e.target.value))}
                      className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-[#FCD116]"
                    />
                    <Moon size={14} className="text-gray-400" />
                    <span className="text-white font-bold text-xs min-w-[2.5rem] text-right">{exposure > 0 ? '+' : ''}{exposure.toFixed(1)}EV</span>
                  </div>

                  {/* Toggles */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setZapMode(!flashMode)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                        flashMode ? 'bg-[#FCD116] text-gray-900' : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      <Zap size={12} /> Zap
                    </button>
                    <button
                      onClick={() => setShowGrid(!showGrid)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                        showGrid ? 'bg-[#FCD116] text-gray-900' : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      <Grid3X3 size={12} /> Grille
                    </button>
                    <button
                      onClick={() => setResolution(resolution === '4K' ? 'HD' : '4K')}
                      className="flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
                    >
                      <Maximize2 size={12} /> {resolution}
                    </button>
                  </div>
                </div>
              )}

              {/* Quick controls */}
              <div className="flex items-center justify-between gap-2">
                <button onClick={flipCamera} className="p-2.5 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-all hover:scale-110">
                  <RotateCcw size={18} />
                </button>
                <div className="flex gap-1.5">
                  <button onClick={() => startCountdown(3)} className="p-2 bg-gray-800 rounded-full text-[#FCD116] hover:bg-gray-700 transition-all hover:scale-110 text-xs font-bold">
                    <Timer size={14} />3s
                  </button>
                  <button onClick={() => startCountdown(10)} className="p-2 bg-gray-800 rounded-full text-[#CE1126] hover:bg-gray-700 transition-all hover:scale-110 text-xs font-bold">
                    <Timer size={14} />10s
                  </button>
                </div>
                <button onClick={() => setFilter(filter === 'none' ? 'portrait' : 'none')} className="p-2.5 bg-gray-800 rounded-full text-[#FCD116] hover:bg-gray-700 transition-all hover:scale-110">
                  <Focus size={18} />
                </button>
              </div>

              {/* Main capture button */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <button onClick={handleClose} className="px-4 py-2 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-all text-sm">
                  Fermer
                </button>
                <button
                  onClick={handleCapturePhoto}
                  className="bg-gradient-to-br from-[#007A5E] via-[#CE1126] to-[#FCD116] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all transform active:scale-95 ring-4 ring-white/20"
                  style={{ width: '4rem', height: '4rem' }}
                >
                  <CameraIcon size={26} className="text-white" />
                </button>
                <button onClick={() => setFilter(filter === 'none' ? 'cinematic' : 'none')} className="px-4 py-2 bg-gray-700 text-[#FCD116] font-bold rounded-full hover:bg-gray-600 transition-all text-sm flex items-center gap-1">
                  <Wand2 size={14} /> FX
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
