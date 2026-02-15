
import React, { useState, useEffect } from 'react';

interface ScannerSectionProps {
  onScanComplete: () => void;
}

export const ScannerSection: React.FC<ScannerSectionProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
  };

  useEffect(() => {
    if (isScanning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(p => Math.min(p + 2, 100));
      }, 50);
      return () => clearTimeout(timer);
    } else if (progress === 100) {
      setTimeout(() => onScanComplete(), 1000);
    }
  }, [isScanning, progress, onScanComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-12">
      <div className="text-center">
        <h2 className="text-2xl font-orbitron text-emerald-400 mb-2 uppercase tracking-widest">Biometric Verification</h2>
        <p className="text-emerald-500/60 text-xs font-mono">Place hand on scanning interface to finalize enrollment.</p>
      </div>

      {/* Hand Scanner UI */}
      <div className="relative w-64 h-80 border-4 border-emerald-500/30 rounded-3xl flex items-center justify-center overflow-hidden bg-emerald-900/10 group">
        {/* Hand Silhouette Icon (Simplified SVG) */}
        <svg className={`w-40 h-40 transition-all duration-500 ${isScanning ? 'fill-emerald-400 scale-105 opacity-100' : 'fill-emerald-900/40 group-hover:fill-emerald-800/60'}`} viewBox="0 0 24 24">
          <path d="M11,2A2,2 0 0,0 9,4V13.5L8.32,13.23C7.68,12.97 6.94,13.1 6.46,13.58L5,15.03L10.34,20.37C10.77,20.8 11.35,21.04 11.96,21.04H17.41C18.45,21.04 19.34,20.28 19.5,19.25L20.41,13.5C20.57,12.45 19.87,11.5 18.82,11.34L14,10.6V4A2,2 0 0,0 12,2H11M11,4H12V12.18L17.97,13.1L17.41,19.04H11.96L7.87,14.96L8.47,15.2C9.4,15.58 10.45,15.2 10.91,14.34C11,14.2 11,14.05 11,13.91V4Z" />
        </svg>

        {/* Scanning Line */}
        {isScanning && (
          <div 
            className="absolute w-[120%] h-1 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,1)] z-20 left-[-10%]"
            style={{ 
              top: `${progress}%`,
              transition: 'top 50ms linear'
            }}
          />
        )}

        {/* Glow Overlay */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isScanning ? 'bg-emerald-500/10' : 'bg-transparent'}`} />
      </div>

      <div className="w-full max-w-xs space-y-4">
        {isScanning ? (
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-emerald-500 uppercase font-bold tracking-tighter">
              <span>Capturing Neural Signature...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-emerald-900/30 rounded-full overflow-hidden border border-emerald-500/20">
              <div 
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={startScan}
            className="group relative w-full h-16 rounded-full overflow-hidden flex items-center justify-center cursor-pointer transform active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-emerald-600 animate-pulse group-hover:bg-emerald-500" />
            <span className="relative z-10 font-orbitron font-black text-black tracking-widest text-lg">PRESS TO SCAN</span>
            <div className="absolute inset-0 border-2 border-emerald-300/30 rounded-full scale-110 group-hover:scale-125 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
