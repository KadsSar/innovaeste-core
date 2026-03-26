import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

function HeroTitle() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: -999, y: -999 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = titleRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setCursor({ x: -999, y: -999 });

  const sharedClass = 'text-[15vw] leading-none font-serif font-light text-slate-800 text-center uppercase tracking-tight';

  return (
    <div
      ref={titleRef}
      className="absolute inset-x-0 top-0 z-20 pt-8 px-8 cursor-default select-none"
      style={{ height: '45%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base layer — subtle white stroke, no glow */}
      <h1
        className={sharedClass}
        style={{
          WebkitTextStroke: '1.5px rgba(255,255,255,0.65)',
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '-2rem',
        }}
      >
        Innovaeste
      </h1>

      {/* Glow layer — full glow, masked to circle at cursor */}
      <h1
        className={sharedClass}
        style={{
          WebkitTextStroke: '1.5px white',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,1)) drop-shadow(0 0 28px rgba(200,240,255,0.9))',
          WebkitMaskImage: `radial-gradient(circle 150px at ${cursor.x}px ${cursor.y}px, black 10%, transparent 90%)`,
          maskImage: `radial-gradient(circle 150px at ${cursor.x}px ${cursor.y}px, black 10%, transparent 90%)`,
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '-2rem',
        }}
      >
        Innovaeste
      </h1>
    </div>
  );
}

export default function Section1() {
  return (
    <div className="relative w-full text-slate-800" style={{ backgroundColor: '#0096C7' }}>
      {/* Navbar */}
      <nav className="flex justify-between items-center py-6 px-8">
        {/* Left Links */}
        <div className="flex space-x-6 text-[11px] font-sans font-light uppercase tracking-wide text-gray-500">
          <a href="#" className="hover:text-black">Home</a>
          <a href="#" className="hover:text-black">Agents</a>
          <a href="#" className="hover:text-black whitespace-nowrap">Work in Progress</a>
          <a href="#" className="hover:text-black">Collection</a>
          <a href="#" className="hover:text-black flex items-center gap-1">Start Exploring <span>→</span></a>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border border-orange-200 flex items-center justify-center text-accent-orange text-[10px]">
                i
              </div>
            ))}
          </div>
          <div className="text-[11px] font-sans font-light text-gray-500">
            EN | UA
          </div>
          <button className="bg-white border hover:bg-gray-50 transition-colors border-gray-200 rounded-full px-4 py-2 text-[11px] font-sans flex items-center shadow-sm">
            <span className="mr-2">+92 319 849 2066</span>
            <div className="w-5 h-5 bg-accent-orange rounded-full flex items-center justify-center text-white text-[10px]">
              📞
            </div>
          </button>
        </div>
      </nav>


      {/* Hero Image & Overlaps */}
      <div className="relative z-10">
        <HeroTitle />
        <div 
          className="relative w-full h-[600px]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, black 15%, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, black 15%, black 60%, transparent 100%)'
          }}
        >
          <img 
            src="/16.png" 
            alt="Modern futuristic building" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Floating CTA (Outside the Mask Container) */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-30">
          <Link to="/loading" className="pointer-events-auto inline-block bg-accent-orange text-white font-sans text-[11px] font-bold uppercase tracking-widest py-4 px-8 rounded-full shadow-[0_6px_0_#b45309,0_15px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#b45309,0_10px_15px_rgba(0,0,0,0.2)] hover:translate-y-[2px] active:shadow-[0_0px_0_#b45309,0_0px_0px_rgba(0,0,0,0)] active:translate-y-[6px] transition-all duration-150 outline-none focus:outline-none text-center">
            Request Demo
          </Link>
        </div>

        {/* Absolute floating box on bottom right hanging halfway off */}
        <div className="absolute -bottom-16 right-16 z-20 w-[420px] bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-2xl border border-white/50">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-serif text-3xl text-slate-800">Crafted with<br/>Precision</h3>
            <div className="flex gap-2">
              <span className="text-[10px] uppercase text-gray-400 font-sans tracking-widest border border-gray-200 px-3 py-1 rounded-full">New</span>
              <span className="text-[10px] uppercase text-gray-400 font-sans tracking-widest border border-gray-200 px-3 py-1 rounded-full">Exclusive</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Agent 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white shadow-sm overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" alt="Agent 2" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-sans text-slate-500">
                +8
              </div>
            </div>
            <p className="font-sans text-xs text-slate-500 uppercase tracking-widest">Elite Local Experts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
