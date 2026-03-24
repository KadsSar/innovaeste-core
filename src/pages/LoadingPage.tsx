import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Building2 } from 'lucide-react';

export default function LoadingPage() {
  const navigate = useNavigate();
  const [moving, setMoving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start animation shortly after mount
    const animTimer = setTimeout(() => setMoving(true), 100);

    // Progress bar effect
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + (100 / 45), 100)); // ~4.5 seconds to 100%
    }, 100);

    // Navigate to dashboard after 5 seconds
    const navTimer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => {
      clearTimeout(animTimer);
      clearInterval(interval);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-sans">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl text-slate-100 mb-2">Innovaeste Orchestrator</h2>
        <p className="text-slate-400 text-sm animate-pulse">Establishing secure connection...</p>
      </div>

      <div className="w-80 sm:w-96 relative h-24 flex items-end">
        {/* Destination Hotel */}
        <div className="absolute right-0 bottom-0 flex flex-col items-center text-slate-300">
          <Building2 className="w-12 h-12 mb-1" />
          <span className="text-[10px] tracking-widest uppercase font-medium">Hotel</span>
        </div>

        {/* Path line */}
        <div className="absolute bottom-2 left-0 right-10 h-[2px] bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500/50 transition-all duration-[4900ms] ease-linear"
            style={{ width: moving ? '100%' : '0%' }}
          />
        </div>

        {/* Animated Robot */}
        <div 
          className="absolute bottom-2 transition-all duration-[4500ms] ease-in-out flex flex-col items-center z-10"
          style={{ 
            left: moving ? 'calc(100% - 3.5rem)' : '0%',
          }}
        >
          <div className="animate-bounce">
            <Bot className="w-8 h-8 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
          </div>
        </div>
      </div>

      <div className="mt-12 text-slate-500 font-mono text-xs">
        {Math.floor(progress)}%
      </div>
    </div>
  );
}
