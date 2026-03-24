import { useEffect, useState } from 'react';
import { Bot, Wrench, BatteryCharging, Home, Droplets, Dumbbell, Coffee, Wind, Waves } from 'lucide-react';

type BotState = {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  status: string;
  color: string;
  icon: React.ReactNode;
};

type RoomState = {
  id: string;
  name: string;
  type: 'villa' | 'facility';
  x: number;
  y: number;
  request: string | null;
  icon: React.ReactNode;
};

export default function LiveHotelMap() {
  const [nodes, setNodes] = useState<Record<string, RoomState>>({
    // Ocean View Villas (Top)
    'villa-sol': { id: 'villa-sol', name: 'Villa Sol', type: 'villa', x: 25, y: 15, request: null, icon: <Home size={18}/> },
    'villa-luna': { id: 'villa-luna', name: 'Villa Luna', type: 'villa', x: 45, y: 15, request: null, icon: <Home size={18}/> },
    'villa-estrella': { id: 'villa-estrella', name: 'Villa Estrella', type: 'villa', x: 65, y: 15, request: null, icon: <Home size={18}/> },
    'villa-cielo': { id: 'villa-cielo', name: 'Villa Cielo', type: 'villa', x: 85, y: 15, request: null, icon: <Home size={18}/> },
    
    // Facilities (Center Right)
    'spa': { id: 'spa', name: 'Ocean Spa', type: 'facility', x: 80, y: 45, request: null, icon: <Wind size={18}/> },
    'gym': { id: 'gym', name: 'Tribal Gym', type: 'facility', x: 60, y: 55, request: null, icon: <Dumbbell size={18}/> },
    'dining': { id: 'dining', name: 'Panorama Dining', type: 'facility', x: 40, y: 45, request: null, icon: <Coffee size={18}/> },

    // Garden Villas (Bottom)
    'villa-flora': { id: 'villa-flora', name: 'Villa Flora', type: 'villa', x: 30, y: 85, request: null, icon: <Home size={18}/> },
    'villa-fauna': { id: 'villa-fauna', name: 'Villa Fauna', type: 'villa', x: 55, y: 85, request: null, icon: <Home size={18}/> },
    'villa-mar': { id: 'villa-mar', name: 'Villa Mar', type: 'villa', x: 80, y: 85, request: null, icon: <Home size={18}/> },
  });

  const [botA, setBotA] = useState<BotState>({
    id: 'A', name: 'Service Bot 01', x: 8, y: 50, status: 'IDLE', color: 'bg-accent-orange text-white', icon: <Bot size={16} />
  });
  
  const [botB, setBotB] = useState<BotState>({
    id: 'B', name: 'Maintenance Unit', x: 8, y: 50, status: 'CHARGING', color: 'bg-blue-500 text-white', icon: <Wrench size={16} />
  });

  useEffect(() => {
    let mounted = true;

    const setRequest = (id: string, request: string | null) => {
      setNodes(prev => ({
        ...prev,
        [id]: { ...prev[id], request }
      }));
    };

    const runBotASequence = async () => {
      while (mounted) {
        setBotA(prev => ({ ...prev, x: 8, y: 50, status: 'IDLE' }));
        await wait(3000);
        
        // Task 1: Room Service at Villa Luna
        if(!mounted) return;
        setRequest('villa-luna', 'I need room service! 🍔');
        await wait(2000);
        setBotA(prev => ({ ...prev, status: 'DISPATCHED' }));
        await wait(1000);
        setBotA(prev => ({ ...prev, x: 45, y: 15, status: 'DELIVERING' }));
        await wait(7000); 
        setRequest('villa-luna', null);
        setBotA(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(2000);

        // Task 2: Drinks to Spa
        if(!mounted) return;
        setRequest('spa', 'Fresh towels & cucumber water 🥒');
        await wait(2000);
        setBotA(prev => ({ ...prev, status: 'REROUTING' }));
        await wait(1000);
        setBotA(prev => ({ ...prev, x: 80, y: 45, status: 'DELIVERING' }));
        await wait(7000);
        setRequest('spa', null);
        setBotA(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(2000);

        // Task 3: Champagne to Villa Mar
        if(!mounted) return;
        setRequest('villa-mar', 'Champagne delivery please 🍾');
        await wait(2000);
        setBotA(prev => ({ ...prev, x: 80, y: 85, status: 'DELIVERING' }));
        await wait(7000);
        setRequest('villa-mar', null);
        setBotA(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(2000);

        // Return to base
        setBotA(prev => ({ ...prev, x: 8, y: 50, status: 'RETURNING' }));
        await wait(8000);
      }
    };

    const runBotBSequence = async () => {
      await wait(7000); // 7s offset
      while (mounted) {
        setBotB(prev => ({ ...prev, x: 8, y: 50, status: 'IDLE' }));
        await wait(4000);
        
        // Task 1: A/C Repair
        if(!mounted) return;
        setRequest('villa-sol', 'My A/C is broken! ❄️');
        await wait(2000);
        setBotB(prev => ({ ...prev, x: 25, y: 15, status: 'INVESTIGATING' }));
        await wait(7000); 
        setRequest('villa-sol', null);
        setBotB(prev => ({ ...prev, status: 'REPAIRING' }));
        await wait(4000);

        // Task 2: Gym equipment maintenance
        if(!mounted) return;
        setRequest('gym', 'Treadmill 4 is stuck 🏃‍♂️');
        await wait(2000);
        setBotB(prev => ({ ...prev, x: 60, y: 55, status: 'REROUTING' }));
        await wait(6000);
        setRequest('gym', null);
        setBotB(prev => ({ ...prev, status: 'MAINTENANCE' }));
        await wait(4000);

        // Task 3: Cleaning at Villa Fauna
        if(!mounted) return;
        setRequest('villa-fauna', 'Bedsheets need changing 🛏️');
        await wait(2000);
        setBotB(prev => ({ ...prev, x: 55, y: 85, status: 'REROUTING' }));
        await wait(6000);
        setRequest('villa-fauna', null);
        setBotB(prev => ({ ...prev, status: 'CLEANING' }));
        await wait(5000);
        
        // Return
        setBotB(prev => ({ ...prev, x: 8, y: 50, status: 'RETURNING' }));
        await wait(8000);
      }
    };

    runBotASequence();
    runBotBSequence();

    return () => { mounted = false; };
  }, []);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Live Resort Map</h2>
          <p className="text-sm text-slate-500">Real-time autonomous fleet tracking</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent-orange shadow-sm animate-pulse"></div>
            <span className="text-xs text-slate-600 font-medium">Service</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm animate-pulse"></div>
            <span className="text-xs text-slate-600 font-medium">Maintenance</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[600px] bg-[#eef7ec] border border-green-200/50 rounded-xl overflow-hidden shadow-inner font-sans">
        
        {/* Terrain Zones */}
        {/* Ocean Stripe (Top) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-blue-100/50 border-b border-blue-200/50 flex flex-col items-center justify-end pb-2">
           <Waves className="w-24 h-24 text-blue-200/30 absolute top-2 right-20" />
           <Waves className="w-24 h-24 text-blue-200/30 absolute top-4 left-40" />
           <span className="text-[10px] text-blue-400/80 font-bold tracking-[0.2em] uppercase">Private Beach Access</span>
        </div>

        {/* Sand Zone */}
        <div className="absolute top-32 left-0 right-0 h-16 bg-[#fbf5e6] opacity-70"></div>

        {/* Central Resort Area (Paving) */}
        <div className="absolute top-[40%] left-[30%] w-[60%] h-[30%] bg-white/40 rounded-3xl blur-md"></div>

        {/* Huge Lagoon Pool (Bottom left) */}
        <div className="absolute bottom-10 left-10">
          <div className="w-64 h-40 bg-blue-200/80 rounded-[40%_60%_70%_30%] border-4 border-blue-100 flex items-center justify-center relative overflow-hidden shadow-inner">
             <div className="absolute inset-0 bg-blue-300/20 pattern-wavy"></div>
             <Droplets className="w-12 h-12 text-blue-500/30" />
          </div>
        </div>

        {/* Paths (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.05))' }}>
           {/* Main central spine */}
          <path d="M 8% 50% L 90% 50%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          
          {/* Branches Top */}
          <path d="M 25% 50% L 25% 15%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          <path d="M 45% 50% L 45% 15%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          <path d="M 65% 50% L 65% 15%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          <path d="M 85% 50% L 85% 15%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />

          {/* Branches Facilities */}
          <path d="M 40% 50% L 40% 45%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          <path d="M 60% 50% L 60% 55%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          <path d="M 80% 50% L 80% 45%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />

          {/* Branches Bottom */}
          <path d="M 30% 50% L 30% 85%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          <path d="M 55% 50% L 55% 85%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
          <path d="M 80% 50% L 80% 85%" stroke="#d1ba98" strokeWidth="8" strokeLinecap="round" fill="none" strokeDasharray="6 6" />
        </svg>

        {/* Trees */}
        <div className="absolute top-[48%] left-[20%] w-16 h-16 bg-green-700/30 rounded-full blur-sm"></div>
        <div className="absolute top-[52%] left-[40%] w-12 h-12 bg-green-800/40 rounded-full blur-sm"></div>
        <div className="absolute bottom-[20%] right-[30%] w-24 h-24 bg-green-600/20 rounded-full blur-md"></div>
        <div className="absolute top-[30%] right-[10%] w-20 h-20 bg-green-700/30 rounded-full blur-sm"></div>

        {/* Base Station */}
        <div className="absolute left-[8%] top-[50%] -translate-y-1/2 w-28 h-28 bg-slate-800 text-white rounded-xl shadow-2xl z-10 flex flex-col items-center justify-center border-b-4 border-slate-900 -translate-x-1/2">
          <BatteryCharging className="w-8 h-8 mb-1 text-slate-400" />
          <span className="text-[11px] uppercase tracking-widest font-bold text-center leading-tight">Hub<br/>Station</span>
        </div>

        {/* Nodes (Rooms & Facilities) */}
        {Object.values(nodes).map(node => (
          <div 
            key={node.id}
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* Request Chat Bubble */}
            <div className={`
              absolute -top-20 left-1/2 -translate-x-1/2 w-max max-w-[180px]
              bg-white text-slate-700 px-3 py-2 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100
              text-[10px] sm:text-xs font-medium text-center transition-all duration-300 origin-bottom z-40
              ${node.request ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4 pointer-events-none'}
            `}>
              {node.request}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </div>

            <div className={`
              w-14 h-14 rounded-full shadow-lg flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm z-10
              ${node.type === 'villa' ? 'bg-orange-50/90 border-2 border-orange-200 text-orange-600' : 'bg-slate-50/90 border-2 border-slate-300 text-slate-600'}
            `}>
               {node.icon}
            </div>
            <span className="mt-2 text-[10px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">{node.name}</span>
          </div>
        ))}

        {/* Bot A (Orange) */}
        <BotIcon bot={botA} />

        {/* Bot B (Blue) */}
        <BotIcon bot={botB} />

      </div>
    </div>
  );
}

function BotIcon({ bot }: { bot: BotState }) {
  return (
    <>
      <div 
        className="absolute z-30 transition-all pointer-events-none"
        style={{ 
          left: `${bot.x}%`, 
          top: `calc(${bot.y}% - 28px)`, 
          transform: 'translate(-50%, -100%)',
          transitionDuration: '6000ms',
          transitionTimingFunction: 'linear' 
        }}
      >
        <div className="bg-slate-800 text-white text-[9px] px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center space-x-1">
          <span className="font-semibold tracking-wide uppercase">{bot.status}</span>
        </div>
        <div className="w-1.5 h-1.5 bg-slate-800 transform rotate-45 mx-auto -mt-1"></div>
      </div>

      <div 
        className={`absolute flex items-center justify-center w-8 h-8 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-30 transition-all border-2 border-white ring-2 ring-white/50`}
        style={{ 
          left: `${bot.x}%`, 
          top: `${bot.y}%`, 
          transform: 'translate(-50%, -50%)',
          transitionDuration: '6000ms',
          transitionTimingFunction: 'linear'
        }}
      >
        <div className={`w-full h-full rounded-full flex items-center justify-center ${bot.color}`}>
          {bot.icon}
        </div>
      </div>
    </>
  );
}
