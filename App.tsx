
import React, { useState, useCallback } from 'react';
import { AppStep, UserResponses, AgentProfile } from './types';
import { TerminalFrame } from './components/TerminalFrame';
import { InputSection } from './components/InputSection';
import { ScannerSection } from './components/ScannerSection';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { ProfileResult } from './components/ProfileResult';
import { generateAgentIdentity } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [userData, setUserData] = useState<UserResponses | null>(null);
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputSubmit = (data: UserResponses) => {
    setUserData(data);
    setStep(AppStep.SCAN);
  };

  const handleScanComplete = async () => {
    if (!userData) return;
    setStep(AppStep.PROCESSING);
    
    try {
      const generatedProfile = await generateAgentIdentity(userData);
      setProfile(generatedProfile);
      setStep(AppStep.RESULT);
    } catch (err) {
      console.error(err);
      setError("FAILED TO ESTABLISH AGENCY CONNECTION. RETRYING...");
      setTimeout(() => setStep(AppStep.INPUT), 3000);
    }
  };

  const resetApp = () => {
    setStep(AppStep.INPUT);
    setUserData(null);
    setProfile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 grid-bg p-4 md:p-8 flex items-center justify-center font-mono">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
        <div className="scanline" />
      </div>

      <div className="w-full max-w-5xl crt-flicker">
        <TerminalFrame title={profile ? `OPERATIVE PROFILE: ${profile.fullName}` : "AGENCY ENROLLMENT TERMINAL"}>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 p-4 mb-4 text-red-500 text-xs animate-pulse font-bold">
              SYSTEM ERROR: {error}
            </div>
          )}

          {step === AppStep.INPUT && (
            <InputSection onSubmit={handleInputSubmit} />
          )}

          {step === AppStep.SCAN && (
            <ScannerSection onScanComplete={handleScanComplete} />
          )}

          {step === AppStep.PROCESSING && (
            <ProcessingOverlay />
          )}

          {step === AppStep.RESULT && profile && (
            <ProfileResult profile={profile} onReset={resetApp} />
          )}
        </TerminalFrame>

        {/* Bottom Technical Status */}
        <div className="mt-4 flex justify-between items-center text-[10px] text-emerald-500/40 uppercase tracking-widest px-2">
          <div className="flex items-center space-x-4">
            <span>Uplink: STABLE</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-1 h-3 bg-emerald-500/20" />
              ))}
            </div>
          </div>
          <div className="animate-pulse">SATELLITE NODE-X7 RELAY ACTIVE</div>
          <div>EST: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
