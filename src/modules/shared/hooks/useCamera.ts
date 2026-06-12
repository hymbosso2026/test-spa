import { useState, useRef, useCallback, useEffect } from 'react';

interface CameraOptions {
  audio?: boolean;
  video?: boolean | MediaTrackConstraints;
}

type CameraFilter = 'none' | 'warm' | 'cool' | 'vintage' | 'dramatic' | 'bw' | 'hdr' | 'vivid';

interface UseCamera {
  videoRef: React.RefObject<HTMLVideoElement>;
  streaming: boolean;
  error: string;
  hasPermission: boolean;
  facingMode: 'user' | 'environment';
  zoom: number;
  filter: CameraFilter;
  countdown: number;
  startCamera: (options?: CameraOptions) => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Blob | null;
  requestPermission: () => Promise<boolean>;
  flipCamera: () => Promise<void>;
  setZoom: (z: number) => void;
  setFilter: (f: CameraFilter) => void;
  startCountdown: (seconds: number, onDone: () => void) => void;
}

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

export const useCamera = (): UseCamera => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [zoom, setZoomState] = useState(1);
  const [filter, setFilterState] = useState<CameraFilter>('none');
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getCanvas = useCallback((): HTMLCanvasElement => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    return canvasRef.current;
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      stream.getTracks().forEach((track) => track.stop());
      setHasPermission(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Camera permission denied';
      setError(message);
      setHasPermission(false);
      return false;
    }
  }, [facingMode]);

  const startCamera = useCallback(
    async (options: CameraOptions = { audio: false, video: true }): Promise<void> => {
      try {
        setError('');
        if (!navigator.mediaDevices?.getUserMedia) {
          setError('Camera API not supported in this browser');
          return;
        }

        const videoConstraints: MediaTrackConstraints = {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          ...(options.video && typeof options.video === 'object' ? options.video : {}),
        };

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: options.audio || false,
          video: videoConstraints,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setStreaming(true);
            setHasPermission(true);
          };
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to access camera';
        setError(message);
        setStreaming(false);
      }
    },
    [facingMode],
  );

  const stopCamera = useCallback((): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  }, []);

  const flipCamera = useCallback(async (): Promise<void> => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    if (streaming) {
      stopCamera();
      await new Promise((r) => setTimeout(r, 200));
      setFacingMode(newMode);
    }
  }, [facingMode, streaming, stopCamera]);

  const setZoom = useCallback((z: number) => {
    setZoomState(Math.max(1, Math.min(5, z)));
  }, []);

  const setFilter = useCallback((f: CameraFilter) => {
    setFilterState(f);
  }, []);

  const startCountdown = useCallback((seconds: number, onDone: () => void) => {
    setCountdown(seconds);
    if (countdownRef.current) clearInterval(countdownRef.current);
    let remaining = seconds;
    countdownRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setCountdown(0);
        onDone();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (streaming && facingMode) {
      startCamera();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const capturePhoto = useCallback((): Blob | null => {
    try {
      if (!videoRef.current || !streaming) return null;

      const video = videoRef.current;
      const canvas = getCanvas();
      if (!canvas.getContext) return null;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Apply zoom
      const zoomedWidth = video.videoWidth / zoom;
      const zoomedHeight = video.videoHeight / zoom;
      const sx = (video.videoWidth - zoomedWidth) / 2;
      const sy = (video.videoHeight - zoomedHeight) / 2;

      ctx.drawImage(video, sx, sy, zoomedWidth, zoomedHeight, 0, 0, canvas.width, canvas.height);

      // Apply filter
      if (filter !== 'none') {
        ctx.filter = FILTER_CSS[filter];
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
      }

      let blob: Blob | null = null;
      canvas.toBlob((b) => { blob = b; }, 'image/jpeg', 0.95);
      return blob;
    } catch (err) {
      console.error('Failed to capture photo:', err);
      return null;
    }
  }, [streaming, zoom, filter, getCanvas]);

  return {
    videoRef,
    streaming,
    error,
    hasPermission,
    facingMode,
    zoom,
    filter,
    countdown,
    startCamera,
    stopCamera,
    capturePhoto,
    requestPermission,
    flipCamera,
    setZoom,
    setFilter,
    startCountdown,
  };
};
