import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, RefreshCw, Sparkles, Zap } from 'lucide-react';
import { PRESET_ITEMS } from '../data/mockData';
import { Item } from '../types';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemGenerated: (item: Item) => void;
  freeCreditsRemaining: number;
  isPro: boolean;
  onOpenPaywall: () => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onItemGenerated,
  freeCreditsRemaining,
  isPro,
  onOpenPaywall,
}) => {
  const [mode, setMode] = useState<'options' | 'camera' | 'scanning'>('options');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanningProgress, setScanningProgress] = useState(0);
  const [scanStepLabel, setScanStepLabel] = useState('Analyse visuelle de l\'article...');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera when closing or switching mode
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setMode('options');
      setUploadedImage(null);
      setSelectedPresetIndex(null);
      setScanningProgress(0);
    }
  }, [isOpen]);

  // Start live camera
  const startCamera = async () => {
    setCameraError(null);
    setMode('camera');
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Accès à la caméra non autorisé ou non disponible. Vous pouvez importer une photo ou choisir un exemple.');
    }
  };

  const flipCamera = () => {
    stopCamera();
    const newFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacing);
    setTimeout(() => {
      startCamera();
    }, 200);
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        stopCamera();
        setUploadedImage(dataUrl);
        triggerAiScan(dataUrl, null);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        triggerAiScan(result, null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    const preset = PRESET_ITEMS[index];
    triggerAiScan(preset.photos[0], index);
  };

  const triggerAiScan = (imageUrl: string, presetIndex: number | null) => {
    if (!isPro && freeCreditsRemaining <= 0) {
      onOpenPaywall();
      return;
    }

    setMode('scanning');
    setScanningProgress(15);
    setScanStepLabel('Détection de l\'objet et de la marque...');

    setTimeout(() => {
      setScanningProgress(45);
      setScanStepLabel('Identification de la catégorie, taille & état...');
    }, 700);

    setTimeout(() => {
      setScanningProgress(75);
      setScanStepLabel('Génération des fiches Vinted, Leboncoin, eBay & Marketplace...');
    }, 1400);

    setTimeout(() => {
      setScanningProgress(100);
      setScanStepLabel('Annonces prêtes !');

      setTimeout(() => {
        const sourceData = presetIndex !== null ? PRESET_ITEMS[presetIndex] : PRESET_ITEMS[0];
        const newItem: Item = {
          ...sourceData,
          id: `item-${Date.now()}`,
          createdAt: "À l'instant",
          status: 'active',
          photos: [imageUrl, ...(sourceData.photos.slice(1) || [])],
        };

        stopCamera();
        onClose();
        onItemGenerated(newItem);
      }, 400);
    }, 2100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] dark:bg-emerald-950/80 flex items-center justify-center text-[#0F5257] dark:text-emerald-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {mode === 'camera' ? 'Prise de vue en direct' : mode === 'scanning' ? 'Scan IA en cours' : 'Ajouter un nouvel article'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isPro ? '✨ Mode Pro Illimité' : `⚡ ${freeCreditsRemaining} essai${freeCreditsRemaining > 1 ? 's' : ''} gratuit${freeCreditsRemaining > 1 ? 's' : ''} restant${freeCreditsRemaining > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* SCANNING MODE */}
          {mode === 'scanning' && (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-[#0F5257] shadow-xl">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Article en cours d'analyse" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-[#0F5257] animate-pulse" />
                  </div>
                )}
                {/* Glowing Laser Scan Bar */}
                <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 shadow-[0_0_15px_#34D399] animate-scan" />
              </div>

              <div className="space-y-2 max-w-sm">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#0F5257] dark:text-emerald-400">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>{scanStepLabel}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#0F5257] dark:bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${scanningProgress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Vinted, Leboncoin, eBay & Marketplace générés en simultané
                </p>
              </div>
            </div>
          )}

          {/* LIVE CAMERA MODE */}
          {mode === 'camera' && (
            <div className="space-y-4">
              {cameraError ? (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-200 text-sm">
                  <p className="font-semibold mb-2">{cameraError}</p>
                  <button
                    onClick={() => setMode('options')}
                    className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700"
                  >
                    Retour aux options
                  </button>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 flex items-center justify-center shadow-inner">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Viewfinder overlay */}
                  <div className="absolute inset-6 border-2 border-dashed border-white/60 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full font-mono">CADRAGE OPTIMAL</span>
                    </div>
                    <span className="text-[11px] text-white/90 bg-black/50 text-center py-1 px-3 rounded-full mx-auto backdrop-blur-xs">
                      Centre l&apos;article dans le cadre
                    </span>
                  </div>

                  {/* Top camera controls */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={flipCamera}
                      title="Changer de caméra"
                      className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {!cameraError && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      stopCamera();
                      setMode('options');
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  >
                    Annuler
                  </button>

                  <button
                    onClick={captureCameraPhoto}
                    className="px-8 py-3.5 rounded-full bg-[#0F5257] hover:bg-[#0B3C35] text-white font-bold text-sm shadow-xl flex items-center gap-2 transform active:scale-95 transition-all"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Prendre la photo</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MAIN OPTIONS SELECTION */}
          {mode === 'options' && (
            <div className="space-y-6">
              
              {/* Option 1: Live Camera Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={startCamera}
                  className="p-5 rounded-2xl border-2 border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#0F5257] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                    Prendre une photo
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Ouvrir l&apos;appareil photo
                  </span>
                </button>

                {/* Option 2: Upload file */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all flex flex-col items-center justify-center text-center group cursor-pointer hover:shadow-md"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shadow-xs mb-3 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                    Importer une photo
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Depuis la galerie ou fichiers
                  </span>
                </button>
              </div>

              {/* Instant Test Presets (Great for instantaneous testing!) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ou teste instantanément avec un exemple :</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {PRESET_ITEMS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectPreset(idx)}
                      className={`group p-2.5 rounded-xl border transition-all cursor-pointer flex sm:flex-col items-center gap-3 text-left sm:text-center ${
                        selectedPresetIndex === idx
                          ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40'
                          : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <img
                        src={preset.photos[0]}
                        alt={preset.title}
                        className="w-14 h-14 sm:w-full sm:h-24 rounded-lg object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {preset.title}
                        </p>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                          {preset.suggestedPrice} € conseillé
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
