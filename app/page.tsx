'use client';
import React, { useState, useEffect } from 'react';

export default function WarRoom() {
  const [mounted, setMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const runArchitect = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const result = await res.json();
      setData(result);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans p-4 md:p-10">
      {showOverlay && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-xl border border-sky-500/30 p-10 rounded-[3rem] bg-slate-900">
            <h2 className="text-4xl font-black italic mb-4 uppercase">I'm Stepping In.</h2>
            <p className="text-slate-400 mb-8 text-lg">We are pivoting your idea to a $39/mo Sovereign launch.</p>
            <button onClick={() => setShowOverlay(false)} className="w-full bg-sky-500 text-slate-950 font-black py-4 rounded-xl uppercase tracking-tighter">Enter War Room</button>
          </div>
        </div>
      )}

      <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
        <h1 className="text-2xl font-black italic">LAUNCH<span className="text-sky-500">AI</span></h1>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sovereign v2026</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-900/50 border border-white/10 p-8 rounded-[2rem] min-h-[500px]">
          <h3 className="text-sky-400 font-bold text-[10px] uppercase mb-6 tracking-[.3em]">The Architect's Roadmap</h3>
          <div className="text-slate-300 text-lg whitespace-pre-wrap italic">
            {loading ? "The Board is deliberating..." : (data?.architect || "Input your mission parameters below.")}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          {data?.board ? data.board.map((agent: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
              <h4 className="text-sky-500 font-black text-[10px] uppercase mb-2 italic">{agent.name}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{agent.text}</p>
            </div>
          )) : <div className="text-center text-slate-700 text-[10px] mt-20 uppercase tracking-widest">Board Offline</div>}
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/80 backdrop-blur-md border-t border-white/5">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-6 py-4 text-white" placeholder="Describe your business idea..." />
          <button onClick={runArchitect} className="bg-sky-500 text-slate-950 font-black px-8 py-4 rounded-xl uppercase transition-all active:scale-95">Execute</button>
        </div>
      </footer>
    </div>
  );
}
