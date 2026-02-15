
import React, { useState, useEffect } from 'react';

export const ProcessingOverlay: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const messages = [
    "INITIALIZING ENCRYPTION PROTOCOLS...",
    "CROSS-REFERENCING GLOBAL DATABASES...",
    "ISOLATING UNIQUE OPERATIVE TRAITS...",
    "AUTHENTICATING CLEARANCE LEVEL...",
    "SYNTHESIZING AGENT PROFILE...",
    "GENERATING CRYPTOGRAPHIC CODENAME...",
    "FINALIZING AGENCY ENROLLMENT..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLog(prev => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <div className="relative w-24 h-24">
        {/* Animated Radar/Loader */}
        <div className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-[ping_2s_infinite]" />
        <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
        <div className="absolute inset-[10%] border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="font-mono text-[10px] text-emerald-500/80 w-full max-w-sm space-y-1">
        {log.map((msg, idx) => (
          <div key={idx} className="flex space-x-2">
            <span className="text-emerald-500/40">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
            <span className="animate-pulse">{msg}</span>
          </div>
        ))}
        <div className="inline-block w-2 h-4 bg-emerald-500 animate-[blink_1s_steps(2)_infinite] ml-1" />
      </div>

      <style>{`
        @keyframes blink { 0% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
};
