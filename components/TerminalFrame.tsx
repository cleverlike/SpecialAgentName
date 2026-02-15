
import React from 'react';

interface TerminalFrameProps {
  children: React.ReactNode;
  title?: string;
}

export const TerminalFrame: React.FC<TerminalFrameProps> = ({ children, title = "AGENCY TERMINAL v4.2" }) => {
  return (
    <div className="relative border-2 border-emerald-500/30 bg-black/80 shadow-[0_0_50px_rgba(16,185,129,0.1)] rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 flex justify-between items-center">
        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase font-orbitron">{title}</span>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
        </div>
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-10" />
      
      {/* Content */}
      <div className="relative z-0 p-6 flex-1 flex flex-col overflow-auto scrollbar-hide">
        {children}
      </div>
      
      {/* Footer Decoration */}
      <div className="h-4 bg-emerald-500/5 border-t border-emerald-500/10 flex justify-end px-4 items-center">
        <span className="text-[8px] text-emerald-500/30">ENCRYPTION ACTIVE: AES-256-GCM</span>
      </div>
    </div>
  );
};
