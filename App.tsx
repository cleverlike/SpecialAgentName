
import React, { useState, useEffect } from 'react';
import { AppStep, UserResponses, AgentProfile } from './types.ts';
import { TerminalFrame } from './components/TerminalFrame.tsx';
import { InputSection } from './components/InputSection.tsx';
import { ScannerSection } from './components/ScannerSection.tsx';
import { ProcessingOverlay } from './components/ProcessingOverlay.tsx';
import { ProfileResult } from './components/ProfileResult.tsx';
import { generateAgentIdentity } from './services/geminiService.ts';

// Conflicting local declaration of window.aistudio removed to use the globally provided AIStudio type.

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [userData, setUserData] = useState<UserResponses | null>(null);
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for API key on mount using the provided aistudio helper
  useEffect(() => {
    const checkKey = async () => {
      // API key is handled via process.env.API_KEY; check selection status if not present
      if (!process.env.API_KEY) {
        if (window.aistudio) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            setStep(AppStep.KEY_REQUIRED);
          }
        }
      }
    };
    checkKey();
  }, []);

  const handleConnectKey = async () => {
    if (window.aistudio) {
      try {
        // Open the selection dialog for a paid API key
        await window.aistudio.openSelectKey();
        // Assume selection success to proceed, avoiding race conditions in key injection as per guidelines
        setStep(AppStep.INPUT);
      } catch (err) {
        console.error("Key selection failed", err);
      }
    }
  };

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
    } catch (err: any) {
      console.error("Agency Connection Error:", err);
      
      // If error indicates missing key/entity, prompt for re-selection
      if (err?.message?.includes("Requested entity was not found")) {
        setError("INVALID AGENCY KEY. PLEASE RE-ESTABLISH CONNECTION.");
        setTimeout(() => setStep(AppStep.KEY_REQUIRED), 3000);
      } else {
        setError("FAILED TO ESTABLISH AGENCY CONNECTION. RETRYING...");
        setTimeout(() => setStep(AppStep.INPUT), 3000);
      }
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

          {step === AppStep.KEY_REQUIRED && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-orbitron text-red-500 uppercase tracking-widest animate-pulse">Connection Required</h2>
                <p className="text-emerald-500/60 max-w-md mx-auto text-sm leading-relaxed">
                  Agency protocols require a secure identity link to access the global operative database. 
                  Please establish a connection using your Gemini API key.
                </p>
                <div className="text-[10px] text-emerald-500/40 uppercase">
                  Note: A paid Google Cloud Project key is required. 
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="ml-1 text-emerald-400 hover:underline">
                    View Billing Docs
                  </a>
                </div>
              </div>

              <button
                onClick={handleConnectKey}
                className="group relative px-12 py-4 bg-red-500/10 border border-red-500/50 text-red-500 font-orbitron font-bold tracking-widest hover:bg-red-500 hover:text-black transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-500/20 group-hover:bg-transparent animate-pulse" />
                ESTABLISH SECURE LINK
              </button>
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

        <div className="mt-4 flex justify-between items-center text-[10px] text-emerald-500/40 uppercase tracking-widest px-2">
          <div className="flex items-center space-x-4">
            <span>Uplink: {step === AppStep.KEY_REQUIRED ? 'OFFLINE' : 'STABLE'}</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-1 h-3 ${step === AppStep.KEY_REQUIRED ? 'bg-red-500/20' : 'bg-emerald-500/20'}`} />
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
