import { useEffect, useState } from 'react';
import { Bot, Wrench, BatteryCharging, Home, Droplets, Dumbbell, Coffee, Wind } from 'lucide-react';

type BotState = {
  id: string;
  name: string;
  x: number;
  y: number;
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
    // Top Row (Villas)
    'villa-sol': { id: 'villa-sol', name: 'Villa Sol', type: 'villa', x: 25, y: 15, request: null, icon: <Home size={18}/> },
    'villa-luna': { id: 'villa-luna', name: 'Villa Luna', type: 'villa', x: 45, y: 15, request: null, icon: <Home size={18}/> },
    'villa-estrella': { id: 'villa-estrella', name: 'Villa Estrella', type: 'villa', x: 65, y: 15, request: null, icon: <Home size={18}/> },
    'villa-cielo': { id: 'villa-cielo', name: 'Villa Cielo', type: 'villa', x: 85, y: 15, request: null, icon: <Home size={18}/> },
    
    // Middle Row (Facilities)
    'spa': { id: 'spa', name: 'Ocean Spa', type: 'facility', x: 80, y: 45, request: null, icon: <Wind size={18}/> },
    'gym': { id: 'gym', name: 'Tribal Gym', type: 'facility', x: 60, y: 55, request: null, icon: <Dumbbell size={18}/> },
    'dining': { id: 'dining', name: 'Panorama Dining', type: 'facility', x: 40, y: 45, request: null, icon: <Coffee size={18}/> },

    // Bottom Row (Villas)
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

  const [randomRequests, setRandomRequests] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;

    // Random Chatter System
    const generateRandomChatter = async () => {
      const phrases = [
        "Extra towels please 🧖‍♀️",
        "Send some champagne! 🍾",
        "Wi-Fi is disconnected 📶",
        "Need an iron please 👔",
        "Late checkout request ⏰",
        "More coffee pods ☕",
        "Pool towels needed 🏊",
        "Dinner reservations? 🍽️"
      ];
      const nodeIds = ['villa-sol', 'villa-luna', 'villa-estrella', 'villa-cielo', 'spa', 'gym', 'dining', 'villa-flora', 'villa-fauna', 'villa-mar'];
      
      while (mounted) {
        await wait(2000 + Math.random() * 3000);
        if (!mounted) return;
        
        const randomRoom = nodeIds[Math.floor(Math.random() * nodeIds.length)];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        setRandomRequests(prev => ({ ...prev, [randomRoom]: randomPhrase }));
        
        setTimeout(() => {
          if (mounted) {
            setRandomRequests(prev => {
              const next = { ...prev };
              delete next[randomRoom];
              return next;
            });
          }
        }, 5000 + Math.random() * 3000);
      }
    };
    generateRandomChatter();

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
        
        // Task 1: Room Service at Villa Luna (45, 15)
        if(!mounted) return;
        setRequest('villa-luna', 'I need room service! 🍔');
        await wait(2000);
        setBotA(prev => ({ ...prev, status: 'DISPATCHED' }));
        await wait(1000);
        setBotA(prev => ({ ...prev, x: 45, y: 50, status: 'EN ROUTE' })); // Waypoint
        await wait(3000); 
        setBotA(prev => ({ ...prev, x: 45, y: 15, status: 'DELIVERING' }));
        await wait(3000); 
        setRequest('villa-luna', null);
        setBotA(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(2000);
        setBotA(prev => ({ ...prev, x: 45, y: 50, status: 'RETURNING' })); // Waypoint
        await wait(3000); 
        setBotA(prev => ({ ...prev, x: 8, y: 50 }));
        await wait(3000);

        // Task 2: Drinks to Spa (80, 45)
        if(!mounted) return;
        setRequest('spa', 'Fresh towels & water 🥒');
        await wait(2000);
        setBotA(prev => ({ ...prev, status: 'REROUTING' }));
        await wait(1000);
        setBotA(prev => ({ ...prev, x: 80, y: 50, status: 'EN ROUTE' })); // Waypoint
        await wait(4000);
        setBotA(prev => ({ ...prev, x: 80, y: 45, status: 'DELIVERING' }));
        await wait(2000);
        setRequest('spa', null);
        setBotA(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(2000);
        setBotA(prev => ({ ...prev, x: 80, y: 50, status: 'RETURNING' })); // Waypoint
        await wait(2000);

        // Task 3: Champagne to Villa Mar (80, 85)
        if(!mounted) return;
        setRequest('villa-mar', 'Champagne please 🍾');
        await wait(2000);
        setBotA(prev => ({ ...prev, x: 80, y: 85, status: 'DELIVERING' }));
        await wait(3000);
        setRequest('villa-mar', null);
        setBotA(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(2000);
        setBotA(prev => ({ ...prev, x: 80, y: 50, status: 'RETURNING' })); // Waypoint
        await wait(3000);

        // Return to base
        setBotA(prev => ({ ...prev, x: 8, y: 50, status: 'RETURNING' }));
        await wait(5000);
      }
    };

    const runBotBSequence = async () => {
      await wait(5000); // 5s offset
      while (mounted) {
        setBotB(prev => ({ ...prev, x: 8, y: 50, status: 'IDLE' }));
        await wait(4000);
        
        // Task 1: A/C Repair (25, 15)
        if(!mounted) return;
        setRequest('villa-sol', 'My A/C is broken! ❄️');
        await wait(2000);
        setBotB(prev => ({ ...prev, x: 25, y: 50, status: 'EN ROUTE' })); // Waypoint
        await wait(3000);
        setBotB(prev => ({ ...prev, x: 25, y: 15, status: 'INVESTIGATING' }));
        await wait(3000); 
        setRequest('villa-sol', null);
        setBotB(prev => ({ ...prev, status: 'REPAIRING' }));
        await wait(3000);
        setBotB(prev => ({ ...prev, x: 25, y: 50, status: 'RETURNING' })); // Waypoint
        await wait(3000);

        // Task 2: Gym equipment maintenance (60, 55)
        if(!mounted) return;
        setRequest('gym', 'Treadmill 4 is stuck 🏃‍♂️');
        await wait(2000);
        setBotB(prev => ({ ...prev, x: 60, y: 50, status: 'EN ROUTE' })); // Waypoint
        await wait(3000);
        setBotB(prev => ({ ...prev, x: 60, y: 55, status: 'MAINTENANCE' }));
        await wait(2000);
        setRequest('gym', null);
        setBotB(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(2000);
        setBotB(prev => ({ ...prev, x: 60, y: 50, status: 'RETURNING' })); // Waypoint
        await wait(2000);

        // Task 3: Cleaning at Villa Fauna (55, 85)
        if(!mounted) return;
        setRequest('villa-fauna', 'Bedsheets need changing 🛏️');
        await wait(2000);
        setBotB(prev => ({ ...prev, x: 55, y: 50, status: 'EN ROUTE' })); // Waypoint
        await wait(1000);
        setBotB(prev => ({ ...prev, x: 55, y: 85, status: 'CLEANING' }));
        await wait(3000);
        setRequest('villa-fauna', null);
        setBotB(prev => ({ ...prev, status: 'COMPLETED' }));
        await wait(3000);
        setBotB(prev => ({ ...prev, x: 55, y: 50, status: 'RETURNING' })); // Waypoint
        await wait(3000);
        
        // Return
        setBotB(prev => ({ ...prev, x: 8, y: 50, status: 'RETURNING' }));
        await wait(5000);
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
          <p className="text-sm text-slate-500">Real-time autonomous fleet routing along boardwalks</p>
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

      <div className="relative w-full h-[600px] bg-[#a8cfad] border-4 border-[#93b797] rounded-xl overflow-hidden shadow-inner font-sans">
        
        {/* Organic Geographical Patches (Ground variations) */}
        {/* Light grass patch top left */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-[#b8dbb8] rounded-[50%_40%_60%_30%] z-0"></div>
        {/* Dark forest patch right */}
        <div className="absolute top-[20%] right-[-15%] w-[45%] h-[60%] bg-[#92bc97] rounded-[40%_60%_30%_70%] z-0"></div>
        {/* Sandy clearing bottom right */}
        <div className="absolute bottom-[-10%] right-[10%] w-[60%] h-[35%] bg-[#ebd9af] rounded-[70%_30%_50%_40%] z-0"></div>

        {/* Huge Organic Lagoon Pool (Bottom left) */}
        <div className="absolute bottom-5 left-8 z-0">
          <div className="w-[300px] h-[180px] bg-blue-400/80 rounded-[40%_60%_70%_30%] border-8 border-yellow-100/30 flex items-center justify-center relative overflow-hidden shadow-[inset_0_5px_20px_rgba(0,0,0,0.2)]">
             <div className="absolute inset-0 bg-blue-300/40 pattern-wavy opacity-50"></div>
             <Droplets className="w-16 h-16 text-blue-200/50 relative z-10" />
          </div>
          {/* Deck bordering the pool */}
          <div className="absolute top-[-10px] left-[-10px] w-[320px] h-[200px] rounded-[40%_60%_70%_30%] border-8 border-[#d4b08c] -z-10"></div>
        </div>

        {/* Orthogonal Wooden Boardwalks */}
        {/* SVG Outer Border (Dark Brown Wood Edge) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path d="M 8% 50% L 90% 50%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 25% 50% L 25% 15%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 45% 50% L 45% 15%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 65% 50% L 65% 15%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 85% 50% L 85% 15%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 40% 50% L 40% 45%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 60% 50% L 60% 55%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 80% 50% L 80% 45%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 30% 50% L 30% 85%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 55% 50% L 55% 85%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
          <path d="M 80% 50% L 80% 85%" stroke="#8b6b47" strokeWidth="22" strokeLinecap="square" fill="none" />
        </svg>

        {/* SVG Inner Path (Light Brown Wooden Planks) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path d="M 8% 50% L 90% 50%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 25% 50% L 25% 15%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 45% 50% L 45% 15%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 65% 50% L 65% 15%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 85% 50% L 85% 15%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 40% 50% L 40% 45%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 60% 50% L 60% 55%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 80% 50% L 80% 45%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 30% 50% L 30% 85%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 55% 50% L 55% 85%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
          <path d="M 80% 50% L 80% 85%" stroke="#c29f79" strokeWidth="16" strokeLinecap="square" strokeDasharray="5 1" fill="none" />
        </svg>

        {/* Hand-drawn organic tree clumps (multiple circles grouped) */}
        <TreeClump top="10%" left="15%" />
        <TreeClump top="12%" left="37%" />
        <TreeClump top="38%" left="20%" />
        <TreeClump top="45%" left="50%" />
        <TreeClump top="75%" left="40%" />
        <TreeClump top="35%" left="75%" />
        <TreeClump top="70%" left="90%" />
        <TreeClump top="10%" left="92%" />

        {/* Base Station / Operations Hub */}
        <div className="absolute left-[8%] top-[50%] -translate-y-1/2 w-28 h-28 bg-[#3d4c53] text-[white] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-10 flex flex-col items-center justify-center border-t-8 border-[#2d3a40] -translate-x-1/2">
          <BatteryCharging className="w-8 h-8 mb-1 text-slate-300" />
          <span className="text-[11px] uppercase tracking-widest font-bold text-center leading-tight">Hub<br/>Station</span>
        </div>

        {/* Nodes (Villas & Buildings) */}
        {(Object.values(nodes) as RoomState[]).map(node => (
          <div 
            key={node.id}
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* Request Chat Bubble */}
            <div className={`
              absolute -top-20 left-1/2 -translate-x-1/2 w-max max-w-[180px]
              bg-white text-slate-700 px-3 py-2 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100
              text-[10px] sm:text-xs font-semibold text-center transition-all duration-300 origin-bottom z-40
              ${node.request || randomRequests[node.id] ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4 pointer-events-none'}
            `}>
              {node.request || randomRequests[node.id]}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </div>

            {/* Building Graphic */}
            <div className={`
              w-16 h-16 shadow-[0_8px_15px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm z-10 border-b-4
              ${node.type === 'villa' ? 'bg-[#f4ebe1] border-[#d8c2ac] text-[#8e6d4c] rounded-md' : 'bg-[#e2e8f0] border-[#cbd5e1] text-[#64748b] rounded-xl'}
            `}>
               {/* Inner Roof simulation */}
               {node.type === 'villa' && (
                 <div className="absolute top-0 inset-x-0 h-full border-t-[20px] border-l-[32px] border-r-[32px] border-t-transparent border-l-transparent border-r-transparent border-b-[30px] border-b-[#e5d4c1] opacity-60"></div>
               )}
               {node.type === 'facility' && (
                 <div className="absolute top-0 inset-x-0 h-4 bg-white/50"></div>
               )}
               <div className="relative z-10 drop-shadow-sm">{node.icon}</div>
            </div>
            <span className="mt-2 text-[10px] font-extrabold text-[#48634e] px-2 py-0.5 whitespace-nowrap drop-shadow-sm">{node.name.toUpperCase()}</span>
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

// Tree generator helper
function TreeClump({ top, left }: { top: string; left: string }) {
  return (
    <div className="absolute z-0" style={{ top, left, transform: 'translate(-50%, -50%)' }}>
      <div className="relative w-20 h-20 drop-shadow-lg">
        <div className="absolute top-0 left-4 w-12 h-12 bg-[#2d633b] rounded-full border-2 border-[#1c4d29]"></div>
        <div className="absolute top-4 left-0 w-10 h-10 bg-[#327344] rounded-full border-2 border-[#1c4d29]"></div>
        <div className="absolute top-6 left-8 w-12 h-12 bg-[#3a834e] rounded-full border-2 border-[#245e33]"></div>
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
          transitionDuration: '3000ms',
          transitionTimingFunction: 'linear' 
        }}
      >
        <div className="bg-[#242e33] text-white text-[9px] px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center space-x-1">
          <span className="font-semibold tracking-wide uppercase">{bot.status}</span>
        </div>
        <div className="w-1.5 h-1.5 bg-[#242e33] transform rotate-45 mx-auto -mt-1"></div>
      </div>

      <div 
        className={`absolute flex items-center justify-center w-8 h-8 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.4)] z-30 transition-all border-2 border-white ring-2 ring-black/10`}
        style={{ 
          left: `${bot.x}%`, 
          top: `${bot.y}%`, 
          transform: 'translate(-50%, -50%)',
          transitionDuration: '3000ms',
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
