
import React, { useState } from 'react';
import { UserResponses } from '../types.ts';

interface InputSectionProps {
  onSubmit: (data: UserResponses) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserResponses>({
    favoriteColor: '',
    favoriteAnimal: '',
    favoriteSnack: '',
    birthMonth: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = (Object.values(formData) as string[]).every(val => val.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) onSubmit(formData);
  };

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto py-4">
      <div className="text-center mb-8">
        <h2 className="text-xl font-orbitron text-emerald-400 mb-2 uppercase tracking-widest">Enlistment Questionnaire</h2>
        <p className="text-emerald-500/60 text-xs italic">Complete the following modules to initiate profile generation.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-emerald-500/70 text-[10px] uppercase font-bold mb-1 ml-1">Module 01: Chromatic Reference</label>
          <input
            name="favoriteColor"
            type="text"
            placeholder="FAVORITE COLOR"
            value={formData.favoriteColor}
            onChange={handleChange}
            className="w-full bg-emerald-950/20 border border-emerald-500/30 rounded px-4 py-2 text-emerald-400 placeholder:text-emerald-900 focus:outline-none focus:border-emerald-400/60 transition-colors uppercase text-sm"
          />
        </div>

        <div>
          <label className="block text-emerald-500/70 text-[10px] uppercase font-bold mb-1 ml-1">Module 02: Bio-Affinity</label>
          <input
            name="favoriteAnimal"
            type="text"
            placeholder="FAVORITE ANIMAL"
            value={formData.favoriteAnimal}
            onChange={handleChange}
            className="w-full bg-emerald-950/20 border border-emerald-500/30 rounded px-4 py-2 text-emerald-400 placeholder:text-emerald-900 focus:outline-none focus:border-emerald-400/60 transition-colors uppercase text-sm"
          />
        </div>

        <div>
          <label className="block text-emerald-500/70 text-[10px] uppercase font-bold mb-1 ml-1">Module 03: Sustenance Preference</label>
          <input
            name="favoriteSnack"
            type="text"
            placeholder="FAVORITE SNACK"
            value={formData.favoriteSnack}
            onChange={handleChange}
            className="w-full bg-emerald-950/20 border border-emerald-500/30 rounded px-4 py-2 text-emerald-400 placeholder:text-emerald-900 focus:outline-none focus:border-emerald-400/60 transition-colors uppercase text-sm"
          />
        </div>

        <div>
          <label className="block text-emerald-500/70 text-[10px] uppercase font-bold mb-1 ml-1">Module 04: Temporal Index</label>
          <select
            name="birthMonth"
            value={formData.birthMonth}
            onChange={handleChange}
            className="w-full bg-emerald-950/20 border border-emerald-500/30 rounded px-4 py-3 text-emerald-400 focus:outline-none focus:border-emerald-400/60 transition-colors uppercase text-sm appearance-none"
          >
            <option value="" disabled className="bg-black">SELECT BIRTH MONTH</option>
            {months.map(m => <option key={m} value={m} className="bg-black">{m}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-4 font-orbitron font-bold tracking-[0.2em] rounded transition-all transform active:scale-95 ${
          isFormValid 
          ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer' 
          : 'bg-emerald-900/20 text-emerald-900 cursor-not-allowed border border-emerald-900/30'
        }`}
      >
        NEXT PHASE
      </button>
    </form>
  );
};
