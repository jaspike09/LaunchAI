'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('welcome'); // welcome -> powerhouse

  return (
    <div className="h-screen bg-[#020617] text-white flex overflow-hidden">
      {view === 'welcome' ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
          <video className="w-64 h-64 rounded-full border-4 border-blue-500 mb-8 object-cover" autoPlay loop muted>
            <source src="/MentorAI_vid.mp4" type="video/mp4" />
          </video>
          <h2 className="text-3xl font-black italic mb-6">"Founder, your idea is validated. Ready to build?"</h2>
          <button 
            onClick={() => setView('powerhouse')}
            className="bg-blue-600 px-10 py-5 rounded-xl font-black uppercase tracking-widest"
          >
            Create 30-Day Plan
          </button>
        </div>
      ) : (
        <main className="flex-1 grid grid-cols-12 gap-6 p-8 animate-in slide-in-from-bottom duration-1000">
           {/* Powerhouse Logic: Coach, Accountant, and Mentor all active here */}
           <div className="col-span-8 bg-white/5 border border-white/10 p-10 rounded-[3rem]">
              <h3 className="text-blue-500 font-black text-xs uppercase mb-4 tracking-widest">Day 1: The Foundation</h3>
              <p className="text-2xl leading-relaxed italic">Mentor: "First mission: We need a high-converting hook for your $39/mo offer. Accountant, run the numbers on a 5% conversion rate."</p>
           </div>
           {/* Agent Feed */}
           <div className="col-span-4 space-y-4">
              <div className="glass p-6 rounded-3xl"><p className="text-xs font-bold text-green-400">ACCOUNTANT AI</p><p className="text-sm">Targeting $4,875 monthly recurring revenue.</p></div>
              <div className="glass p-6 rounded-3xl"><p className="text-xs font-bold text-orange-400">COACH AI</p><p className="text-sm">Score: 8/10. Stop overthinking the logo. Deploy now.</p></div>
           </div>
        </main>
      )}
    </div>
  );
}
