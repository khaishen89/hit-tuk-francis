import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const QUOTES = ["Bla Bla Bla!", "Bla bla bla...", "BLA BLA BLA!", "Bla?", "Bla bla bla!", "Bla bla.", "BLA!"];

const HR_BRIEFINGS = [
  "Management efficiency at 100%! Ee Ling Boss has successfully implemented a 'No Noise' policy.",
  "Senior Tuk Francis has been successfully redirected to the cafeteria. Excellent leadership!",
  "Stress levels managed! Ee Ling Boss's action resulted in 400% increase in office peace.",
  "HR notes: Ee Ling Boss shows remarkable focus. Promotion pending!",
  "The office is finally quiet. Senior Tuk is reconsidering his vocal choices.",
  "Direct and effective! Ee Ling Boss set a new record for silencing office chatter."
];

const TukFrancis = ({ id, visible, onHit, quote }: { id: number, visible: boolean, onHit: (id: number) => void, quote?: string }) => {
  const [isHit, setIsHit] = useState(false);
  
  useEffect(() => { 
    if (!visible) {
      const timer = setTimeout(() => setIsHit(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (visible && !isHit) {
      setIsHit(true);
      onHit(id);
    }
  };

  return (
    <div className="relative w-full h-40 md:h-56 flex items-end justify-center perspective-1000 overflow-hidden cursor-none" onClick={handleClick}>
      <div className="absolute bottom-4 w-11/12 h-16 bg-amber-100 rounded-t-2xl border-x-4 border-t-4 border-amber-200 z-0 shadow-inner"></div>
      
      <div className={`relative transition-all duration-300 ease-out transform-gpu z-10 ${visible ? 'translate-y-[-10px] opacity-100' : 'translate-y-full opacity-0 pointer-events-none'} ${isHit ? 'scale-110 -rotate-12 brightness-110' : 'scale-100 hover:scale-105'}`}>
        <div className="relative w-24 h-28 md:w-32 md:h-36 flex flex-col items-center">
          <div className="absolute top-1 w-20 h-10 z-10 flex justify-between px-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full border border-gray-300"></div>
            <div className="w-5 h-5 bg-gray-200 rounded-full border border-gray-300"></div>
          </div>
          
          <div className={`relative w-20 h-22 bg-[#ffdbac] rounded-full shadow-lg border-2 border-[#e1ad8d] flex flex-col items-center justify-center transition-colors ${isHit ? 'bg-red-100' : ''}`}>
            {!isHit && <div className="absolute top-3 w-8 h-1 bg-gray-400/20 rounded-full"></div>}
            <div className="relative flex space-x-6 mt-4 z-20">
              {isHit ? (
                <><div className="text-red-600 font-bold text-xl animate-bounce">X</div><div className="text-red-600 font-bold text-xl animate-bounce">X</div></>
              ) : (
                <>
                  <div className="absolute -inset-x-3 -top-1 flex justify-between">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-500 bg-blue-100/30"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-500 bg-blue-100/30"></div>
                  </div>
                  <div className="w-3 h-3 bg-gray-800 rounded-full z-30 animate-pulse"></div>
                  <div className="w-3 h-3 bg-gray-800 rounded-full z-30 animate-pulse"></div>
                </>
              )}
            </div>
            <div className="w-3 h-4 bg-[#e1ad8d] rounded-full mt-1 border border-[#c6987a]/50"></div>
            <div className={`mt-2 transition-all ${isHit ? 'w-10 h-4 border-b-4 border-red-500 rounded-full' : 'w-6 h-1 bg-gray-800/20 rounded-full'}`}></div>
          </div>
          
          <div className="w-16 h-12 bg-blue-50 rounded-t-xl border-x-2 border-t-2 border-gray-200 shadow-sm flex justify-around overflow-hidden">
            <div className="w-2 h-full bg-amber-900/70"></div>
            <div className="w-2 h-full bg-amber-900/70"></div>
          </div>
          
          {isHit && (
            <div className="absolute -top-10 inset-x-0 flex justify-center space-x-2">
              <span className="text-yellow-400 text-xl animate-ping">⭐</span>
              <span className="text-yellow-400 text-sm animate-bounce">⭐</span>
            </div>
          )}
        </div>

        {visible && !isHit && quote && (
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-44 bg-white text-gray-800 text-xs p-3 rounded-2xl border-2 border-indigo-400 shadow-2xl z-20 animate-bounce">
            <span className="font-bold block text-center leading-tight">{quote}</span>
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full h-12 bg-amber-800 rounded-t-lg border-t-4 border-amber-900 shadow-xl z-20 flex items-center justify-center">
        <div className="bg-yellow-50 px-4 py-1 rounded shadow-inner border-2 border-yellow-200 transform -rotate-1">
          <span className="text-[11px] font-black text-amber-900 uppercase tracking-widest">Sr. Tuk Francis</span>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [stressLevel, setStressLevel] = useState(100);
  const [visibleTuks, setVisibleTuks] = useState<boolean[]>(new Array(9).fill(false));
  const [activeQuotes, setActiveQuotes] = useState<(string | undefined)[]>(new Array(9).fill(undefined));
  const [hrReport, setHrReport] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSwinging, setIsSwinging] = useState(false);

  // Mouse handler
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const onDown = () => { setIsSwinging(true); setTimeout(() => setIsSwinging(false), 150); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
    };
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    setHrReport(HR_BRIEFINGS[Math.floor(Math.random() * HR_BRIEFINGS.length)]);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setStressLevel(100);
    setIsGameOver(false);
    setIsPlaying(true);
    setVisibleTuks(new Array(9).fill(false));
    setActiveQuotes(new Array(9).fill(undefined));
  }, []);

  // MASTER TIMER
  useEffect(() => {
    let interval: number;
    if (isPlaying && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, endGame]);

  // SPAWNING SYSTEM
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        const idx = Math.floor(Math.random() * 9);
        setVisibleTuks(prev => { const next = [...prev]; next[idx] = true; return next; });
        setActiveQuotes(prev => { const next = [...prev]; next[idx] = QUOTES[Math.floor(Math.random() * QUOTES.length)]; return next; });
        
        setTimeout(() => {
          setVisibleTuks(prev => { const next = [...prev]; next[idx] = false; return next; });
        }, 1100);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleHit = useCallback((index: number) => {
    setScore(s => s + 10);
    setStressLevel(s => Math.max(0, s - 5));
  }, []);

  return (
    <div className="min-h-screen bg-[#fff1f2] flex flex-col items-center p-4 md:p-8 cursor-none selection:bg-transparent overflow-hidden">
      <div id="hammer-cursor" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}>
        <div className={`hammer-inner ${isSwinging ? 'swing scale-125' : 'scale-100'} transition-transform duration-75`}>
          <div className="relative">
            <div className="w-14 h-10 bg-rose-500 rounded-xl border-4 border-rose-700 shadow-xl flex items-center justify-center">
              <div className="w-full h-1 bg-rose-400 opacity-50 rounded-full mx-2"></div>
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-12 bg-amber-700 rounded-b-2xl border-x-4 border-b-4 border-amber-900 shadow-md"></div>
          </div>
        </div>
      </div>

      <header className="w-full max-w-4xl flex justify-between items-center mb-6 bg-white p-6 rounded-[2rem] shadow-xl border-b-8 border-indigo-100 z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg animate-bounce">👑</div>
          <div>
            <h1 className="text-2xl font-black text-indigo-900 tracking-tight">Ee Ling Boss</h1>
            <p className="text-xs text-rose-500 font-bold uppercase tracking-widest">Silencer Terminal</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <span className="text-[10px] uppercase text-gray-400 font-black block tracking-tighter">Boss Score</span>
            <span className="text-3xl font-black text-rose-600 tabular-nums">{score}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] uppercase text-gray-400 font-black block tracking-tighter">Deadline</span>
            <span className={`text-3xl font-black tabular-nums transition-all ${isPlaying ? 'text-indigo-700 animate-tick' : 'text-gray-300'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-4xl mb-8 z-10 px-2">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-xs font-black text-indigo-900 uppercase">Boss Patience</span>
          <span className="text-xs font-black text-indigo-900">{stressLevel}%</span>
        </div>
        <div className="w-full h-5 bg-white rounded-full p-1 shadow-inner border-2 border-indigo-50">
          <div className={`h-full rounded-full transition-all duration-500 ${stressLevel > 60 ? 'bg-red-500' : stressLevel > 20 ? 'bg-orange-400' : 'bg-green-500'}`} style={{ width: `${stressLevel}%` }}></div>
        </div>
      </div>

      <main className="relative w-full max-w-5xl bg-indigo-50/50 rounded-[3rem] border-8 border-white shadow-2xl p-6 min-h-[550px] flex items-center justify-center z-10 backdrop-blur-sm">
        {!isPlaying && !isGameOver ? (
          <div className="text-center p-10 bg-white/90 rounded-[3rem] shadow-2xl border-4 border-indigo-50 max-w-md scale-up">
            <div className="w-28 h-28 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-inner">
              <span className="text-6xl animate-bounce">👑</span>
            </div>
            <h2 className="text-3xl font-black text-indigo-950 mb-4">Hello, Ee Ling Boss!</h2>
            <p className="text-indigo-900/60 mb-8 text-sm font-medium">Ready to manage Senior Tuk Francis and his "Bla Bla Bla" interruptions?</p>
            <button onClick={startGame} className="px-10 py-4 bg-rose-600 text-white font-black rounded-2xl shadow-[0_8px_0_0_rgba(190,18,60,1)] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all text-lg cursor-none">START DIRECTING</button>
          </div>
        ) : isPlaying ? (
          <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
            {visibleTuks.map((v, i) => (
              <TukFrancis key={i} id={i} visible={v} onHit={handleHit} quote={activeQuotes[i]} />
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-white/95 rounded-[3rem] shadow-2xl border-4 border-rose-100 max-w-xl">
            <h2 className="text-4xl font-black text-indigo-950 mb-6">WORKDAY OVER</h2>
            <div className="text-7xl font-black text-rose-600 mb-8">{score}</div>
            <div className="bg-rose-50 p-8 rounded-[2rem] border-2 border-rose-100 text-left mb-8 shadow-inner">
              <h3 className="text-[11px] font-black text-rose-400 uppercase mb-3 tracking-widest">HR BRIEFING</h3>
              <p className="italic text-indigo-950 text-lg font-medium">"{hrReport}"</p>
            </div>
            <button onClick={startGame} className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-[0_8px_0_0_rgba(49,46,129,1)] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all text-lg cursor-none">MANAGE AGAIN</button>
          </div>
        )}
      </main>
      
      <footer className="mt-12 text-indigo-400/50 text-[10px] font-black uppercase tracking-[0.3em] text-center z-10">
        BOSS TERMINAL v1.0.5 • HAVE A NICE DAY, EE LING BOSS!
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) createRoot(container).render(<App />);
