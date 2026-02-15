'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SailOrFail() {
  const [idea, setIdea] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const handleAudit = () => {
    if (!idea) return;
    setIsAuditing(true);
    // Visual Meter Logic
    let s = 0;
    const target = Math.floor(Math.random() * 30) + 65; 
    const int = setInterval(() => {
      if (s >= target) {
        clearInterval(int);
        setIsAuditing(false);
        // Redirect to Stripe or Success
        setTimeout(() => router.push('/auth'), 1500);
      } else {
        s++;
        setScore(s);
      }
    }, 40);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full glass p-12 rounded-[3rem] text-center space-y-8 border border-blue-500/20">
        <h1 className="text-6xl font-black italic tracking-tighter uppercase">Sail or <span className="text-red-500">Fail?</span></h1>
        <p className="text-slate-400">Describe your idea for a brutal market evaluation.</p>
        
        <textarea 
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full bg-black/40 border border-white/10 p-6 rounded-2xl outline-none focus:border-blue-500"
          placeholder="I want to start a..."
          rows={4}
        />

        <button 
          onClick={handleAudit}
          className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-blue-500 transition-all"
        >
          {isAuditing ? `Neural Score: ${score}%` : 'Begin Evaluation'}
        </button>
      </div>
    </div>
  );
}
