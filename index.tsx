import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const TukFrancis = ({ id, visible, onHit, quote }: { id: number, visible: boolean, onHit: (id: number) => void, quote?: string }) => {
  const [isHit, setIsHit] = useState(false);
  useEffect(() => { if (!visible) setIsHit(false); }, [visible]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (visible && !isHit) {
      setIsHit(true);
      onHit(id);
    }
  };

  return (
    <div className="relative w-full h-40 md:h-56 flex items-end justify-center perspective-1000 overflow-hidden" onClick={handleClick}>
      {/* The Hole */}
      <div className="absolute bottom-4 w-11/12 h-16 bg-amber-100 rounded-t-lg border-x-4 border-t-4 border-amber-200 z-0"></div>
      
      {/* Senior Tuk Francis */}
      <div className={`relative transition-all duration-300 transform-gpu z-10 ${visible && !isHit ? 'translate-y-[-12px] opacity-100' : 'translate-y-full opacity-0 pointer-events-none'} ${isHit ? 'scale-110 -rotate-12 brightness-110' : 'scale-100'}`}>
        <div className="relative w-24 h-28 md:w-32 md:h-36 flex flex-col items-center">
          {/* Hair/Head top */}
          <div className="absolute top-2 w-20 h-10 z-10 flex justify-between px-1">
            <div className="w-6 h-6 bg-gray-200 rounded-full border border-gray-300"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full border border-gray-300"></div>
          </div>
          
          {/* Face */}
          <div className="relative w-20 h-22 bg-[#ffdbac] rounded-full shadow-md border-2 border-[#e1ad8d] flex flex-col items-center justify-center">
            {!isHit && <div className="absolute top-3 w-8 h-0.5 bg-gray-800/20 rounded-full"></div>}
            <div className="relative flex space-x-6 mt-4 z-20">
              {isHit ? (
                <><div className="text-gray-800 font-bold text-lg">X</div><div className="text-gray-800 font-bold text-lg">X</div></>
              ) : (
                <>
                  <div className="absolute -inset-x-3 -top-1 flex justify-between">
                    <div className="w-7 h-7 rounded-full border-2 border-gray-600 bg-blue-100/20"></div>
                    <div className="w-7 h-7 rounded-full border-2 border-gray-600 bg-blue-100/20"></div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-gray-800 rounded-full z-30"></div>
                  <div className="w-2.5 h-2.5 bg-gray-800 rounded-full z-30"></div>
                </>
              )}
            </div>
            <div className="w-3 h-4 bg-[#e1ad8d] rounded-full mt-1 border border-[#c6987a]/50"></div>
            <div className={`mt-2 transition-all ${isHit ? 'w-8 h-2 border-b-2 border-red-500 rounded-full' : 'w-5 h-1 bg-gray-800/10 rounded-full'}`}></div>
          </div>
          
          {/* Suit/Shirt */}
          <div className="w-16 h-10 bg-blue-50 rounded-t-lg border-x-2 border-t-2 border-gray-200 shadow-sm flex justify-around overflow-hidden">
            <div className="w-2 h-10 bg-amber-900/80"></div>
            <div className="w-2 h-10 bg-amber-900/80"></div>
          </div>
          
          {isHit && <div className="absolute -top-6 inset-x-0 flex justify-center space-x-1 animate-spin duration-1000"><span className="text-yellow-400 text-sm">⭐</span><span className="text-yellow-400 text-xs">⭐</span></div>}
        </div>

        {/* Speech Bubble */}
        {visible && !isHit && quote && (
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 bg-white text-gray-800 text-xs p-2 rounded-xl border-2 border-indigo-500 shadow-xl z-20">
            <span className="font-bold">{quote}</span>
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
          </div>
        )}
      </div>

      {/* Desk Nameplate */}
      <div className="absolute bottom-0 w-full h-12 bg-amber-800 rounded-t-sm border-t-4 border-amber-900 shadow-xl z-20 flex items-center justify-center">
        <div className="bg-yellow-100 px-3 py-1 rounded shadow-inner border border-yellow-300 transform rotate-1">
          <span className="text-[10px] font-bold text-amber-900 uppercase">Sr. Tuk Francis</span>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [gameState, setGameState] = useState({ score: 0, timeLeft: 30, isGameOver: false, isPlaying: false, stressLevel: 100 });
  const [visibleTuks, setVisibleTuks] = useState<boolean[]>(new Array(9).fill(false));
  const [activeQuotes, setActiveQuotes] = useState<(string | undefined)[]>(new Array(9).fill(undefined));
  const [hrReport, setHrReport] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSwinging, setIsSwinging] = useState(false);

  const timerRef = useRef<number | null>(null);
  const spawnRef = useRef<number | null>(null);
  
  const quotes = ["Bla Bla Bla!", "Bla bla bla...", "BLA BLA BLA!", "Bla?", "Bla bla bla bla bla!", "Bla bla.", "BLA!"];
  
  const hrBriefings = [
    "Management efficiency at 100%! Ee Ling Boss has successfully implemented a 'No Noise' policy for the next 15 minutes.",
    "Senior Tuk Francis has been successfully redirected to the cafeteria. Excellent leadership work, Boss!",
    "Stress levels managed! Ee Ling Boss's decisive action has resulted in a 400% increase in office peace.",
    "HR notes: Ee Ling Boss shows remarkable focus when dealing with 'Bla Bla Bla' interruptions. Promotion pending!",
    "The office is finally quiet. Senior Tuk is currently reconsidering his vocal life choices thanks to your management style.",
    "Direct and effective! Ee Ling Boss has set a new record for silencing office chatter."
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => { setIsSwinging(true); setTimeout(() => setIsSwinging(false), 100); };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    return () => { 
      window.removeEventListener('mousemove', handleMouseMove); 
      window.removeEventListener('mousedown', handleMouseDown); 
    };
  }, []);

  const startGame = useCallback(() => {
    setGameState({ score: 0, timeLeft: 30, isGameOver: false, isPlaying: true, stressLevel: 100 });
    setHrReport('');
    setVisibleTuks(new Array(9).fill(false));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false, isGameOver: true }));
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (spawnRef.current) window.clearInterval(spawnRef.current);
    
    // Pick a random funny report
    const report = hrBriefings[Math.floor(Math.random() * hrBriefings.length)];
    setHrReport(report);
  }, [hrBriefings]);

  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) { 
            endGame(); 
            return { ...prev, timeLeft: 0 }; 
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [gameState.isPlaying, endGame]);

  useEffect(() => {
    if (gameState.isPlaying) {
      spawnRef.current = window.setInterval(() => {
        const idx = Math.floor(Math.random() * 9);
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        setVisibleTuks(p => { const n = [...p]; n[idx] = true; return n; });
        setActiveQuotes(p => { const n = [...p]; n[idx] = q; return n; });
        setTimeout(() => {
          setVisibleTuks(p => { const n = [...p]; n[idx] = false; return n; });
        }, 1200);
      }, 700);
    }
    return () => { if (spawnRef.current) window.clearInterval(spawnRef.current); };
  }, [gameState.isPlaying]);

  const handleHit = (index: number) => {
    setGameState(prev => ({ 
      ...prev, 
      score: prev.score + 10, 
      stressLevel: Math.max(0, prev.stressLevel - 3) 
    }));
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center p-4 md:p-8">
      {/* Custom Hammer Cursor */}
      <div id="hammer-cursor" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}>
        <div className={`hammer-inner ${isSwinging ? 'swing' : ''} flex items-center justify-center`}>
          <div className="relative">
            <div className="w-12 h-8 bg-red-500 rounded-lg border-2 border-red-700 shadow-md"></div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-10 bg-yellow-600 rounded-b-lg border-x-2 border-b-2 border-yellow-800"></div>
          </div>
        </div>
      </div>

      <header className="w-full max-w-4xl flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border-2 border-indigo-100 z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">👑</div>
          <div>
            <h1 className="text-xl font-bold text-indigo-900">Ee Ling Boss Terminal</h1>
            <p className="text-xs text-pink-400 font-medium">Silencing the "Bla Bla Bla"!</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <span className="text-[10px] uppercase text-gray-400 font-bold block">Boss Score</span>
            <span className="text-2xl font-black text-pink-500">{gameState.score}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] uppercase text-gray-400 font-bold block">Deadline</span>
            <span className="text-2xl font-black text-indigo-600">{gameState.timeLeft}s</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-4xl mb-6 z-10">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-gray-600 flex items-center gap-1">👑 Boss Patience</span>
          <span className="text-xs font-bold text-gray-600">{gameState.stressLevel}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-white">
          <div className={`h-full transition-all duration-500 ${gameState.stressLevel > 60 ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: `${gameState.stressLevel}%` }}></div>
        </div>
      </div>

      <main className="relative w-full max-w-5xl bg-slate-200 rounded-3xl border-8 border-white shadow-2xl p-6 min-h-[500px] flex items-center justify-center z-10 overflow-hidden">
        {!gameState.isPlaying && !gameState.isGameOver ? (
          <div className="text-center p-8 bg-white/80 rounded-3xl shadow-lg border border-white">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 floating">
              <span className="text-5xl">👑</span>
            </div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-2">Good Day, Ee Ling Boss!</h2>
            <p className="text-gray-500 mb-6 text-sm max-w-xs mx-auto font-medium">Senior Tuk is flooding the office with his "Bla Bla Bla". Restore peace and quiet!</p>
            <button onClick={startGame} className="px-8 py-3 bg-pink-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">START DIRECTING</button>
          </div>
        ) : gameState.isPlaying ? (
          <div className="grid grid-cols-3 gap-6 w-full">
            {visibleTuks.map((v, i) => <TukFrancis key={i} id={i} visible={v} onHit={handleHit} quote={activeQuotes[i]} />)}
          </div>
        ) : (
          <div className="text-center p-8 bg-white/95 rounded-3xl shadow-lg border border-white max-w-xl animate-in fade-in zoom-in">
            <h2 className="text-3xl font-black text-indigo-900 mb-4">SESSION COMPLETE</h2>
            <div className="text-5xl font-black text-pink-500 mb-6">{gameState.score} <span className="text-xl">Points</span></div>
            <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-100 text-left mb-6">
              <h3 className="text-[10px] font-black text-pink-400 uppercase mb-2">HR BRIEFING</h3>
              <p className="italic text-indigo-900 leading-relaxed">"{hrReport}"</p>
            </div>
            <button onClick={startGame} className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">RE-MANAGE</button>
          </div>
        )}
      </main>
      
      <footer className="mt-8 text-indigo-300 text-[10px] font-medium text-center z-10">
        <p>© 2024 Boss Management Terminal • Hello Ee Ling Boss!</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
