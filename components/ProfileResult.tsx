
import React from 'react';
import { AgentProfile } from '../types';

interface ProfileResultProps {
  profile: AgentProfile;
  onReset: () => void;
}

export const ProfileResult: React.FC<ProfileResultProps> = ({ profile, onReset }) => {
  return (
    <div className="animate-in fade-in zoom-in duration-1000">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Card Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div className="relative aspect-square border-2 border-emerald-500/40 rounded bg-emerald-900/10 overflow-hidden group">
             {/* Placeholder Avatar */}
            <div className="absolute inset-0 flex items-center justify-center text-emerald-500/20">
              <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>
            </div>
            {/* ID Badge Overlay */}
            <div className="absolute top-2 left-2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
              ACTIVE AGENT
            </div>
            {/* Scanning Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent pointer-events-none" />
          </div>

          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded text-center">
              <h3 className="text-emerald-500/60 text-[10px] uppercase font-bold mb-1">Clearance Level</h3>
              <div className="text-3xl font-orbitron font-black text-emerald-400">{profile.clearanceLevel}</div>
              <div className="flex justify-center space-x-1 mt-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`h-1 w-4 rounded-full ${i <= profile.clearanceLevel ? 'bg-emerald-400' : 'bg-emerald-900/40'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Briefing Area */}
        <div className="flex-1 space-y-8">
          <div>
            <span className="text-emerald-500/60 text-xs uppercase font-mono tracking-widest">Agent Name:</span>
            <h2 className="text-3xl md:text-5xl font-orbitron font-black text-emerald-400 uppercase tracking-tighter shadow-emerald-500/20 drop-shadow-lg">
              Special Agent {profile.lastName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-900/10 border border-emerald-500/10 p-4 rounded hover:border-emerald-500/30 transition-colors">
              <span className="text-emerald-500/60 text-[10px] uppercase block mb-1">Full Name</span>
              <span className="text-emerald-300 font-bold uppercase">{profile.fullName}</span>
            </div>
            <div className="bg-emerald-900/10 border border-emerald-500/10 p-4 rounded hover:border-emerald-500/30 transition-colors">
              <span className="text-emerald-500/60 text-[10px] uppercase block mb-1">Rank</span>
              <span className="text-emerald-300 font-bold uppercase">{profile.rank}</span>
            </div>
            <div className="bg-emerald-900/10 border border-emerald-500/10 p-4 rounded hover:border-emerald-500/30 transition-colors">
              <span className="text-emerald-500/60 text-[10px] uppercase block mb-1">Specialty</span>
              <span className="text-emerald-300 font-bold uppercase">{profile.specialty}</span>
            </div>
            <div className="bg-emerald-900/10 border border-emerald-500/10 p-4 rounded hover:border-emerald-500/30 transition-colors">
              <span className="text-emerald-500/60 text-[10px] uppercase block mb-1">Last Known Location</span>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.43 19.62,14.77 18.96,15.92L17.5,14.46C17.82,13.7 18,12.87 18,12A6,6 0 0,0 12,6V4M12,8A4,4 0 0,1 16,12C16,12.87 15.72,13.67 15.25,14.33L13.84,12.92C13.94,12.63 14,12.32 14,12A2,2 0 0,0 12,10V8M6,12C6,11.13 6.18,10.3 6.5,9.54L7.96,11C7.64,11.76 7.46,12.59 7.46,13.46C7.46,15.65 8.94,17.5 11,18.06V20.12C7.05,19.56 4,16.14 4,12M12,14V16A4,4 0 0,1 8,12H10A2,2 0 0,0 12,14Z" />
                </svg>
                <span className="text-emerald-100 font-bold">{profile.lastKnownLocation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onReset}
          className="px-10 py-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-orbitron uppercase text-sm tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all rounded"
        >
          New Identity Enrollment
        </button>
      </div>
    </div>
  );
};
