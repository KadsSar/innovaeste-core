import { useEffect, useState } from 'react';
import { Bot, Wrench, BatteryCharging, Home, Droplets } from 'lucide-react';

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
  x: number;
  y: number;
  request: string | null;
};

export default function LiveHotelMap() {
  const [rooms, setRooms] = useState<Record<string, RoomState>>({
    'villa-sol': { id: 'villa-sol', name: 'Villa Sol', x: 25, y: 20, request: null },
    'villa-luna': { id: 'villa-luna', name: 'Villa Luna', x: 75, y: 25, request: null },
    'villa-mar': { id: 'villa-mar', name: 'Villa Mar', x: 50, y: 75, request: null },
  });

  const [botA, setBotA] = useState<BotState>({
    id: 'A', name: 'Robotics Unit 01', x: 10, y: 50, status: 'IDLE', color: 'bg-accent-orange text-white', icon: <Bot size={16} />
  });
  
  const [botB, setBotB] = useState<BotState>({
    id: 'B', name: 'IT & Maintenance', x: 10, y: 50, status: 'CHARGING', color: 'bg-blue-500 text-white', icon: <Wrench size={16} />
  });

  useEffect(() => {
    let mounted = true;

    const setRoomRequest = (roomId: string, request: string | null) => {
      setRooms(prev => ({
        ...prev,
        [roomId]: { ...prev[roomId], request }
      }));
    };

    const runBotASequence = async () => {
      while (mounted) {
        // Base
        setBotA(prev => ({ ...prev, x: 10, y: 50, status: 'IDLE' }));
        await wait(3000);
        
        // Request comes in for Room Service
        if(!mounted) return;
        setRoomRequest('villa-luna', 'I need room service! 🍔');
        await wait(2000);

        setBotA(prev => ({ ...prev, status: 'RESPONDING' }));
        await wait(1000);
        
        // Move to Villa Luna
        setBotA(prev => ({ ...prev, x: 75, y: 25, status: 'DELIVERING' }));
        await wait(7000); // Slower movement
        
        // Un-set request
        setRoomRequest('villa-luna', null);
        setBotA(prev => ({ ...prev, status: 'TASK COMPLETE' }));
        await wait(2000);

        // Return to base
        setBotA(prev => ({ ...prev, x: 10, y: 50, status: 'RETURNING' }));
        await wait(7000);
      }
    };

    const runBotBSequence = async () => {
      await wait(8000); // offset
      while (mounted) {
        // Base
        setBotB(prev => ({ ...prev, x: 10, y: 50, status: 'IDLE' }));
        await wait(3000);
        
        // Request comes in for A/C
        if(!mounted) return;
        setRoomRequest('villa-sol', 'My A/C is broken! ❄️');
        await wait(2000);

        // Move to Villa Sol
        setBotB(prev => ({ ...prev, x: 25, y: 20, status: 'INVESTIGATING' }));
        await wait(5000); 
        
        // Clear request
        setRoomRequest('villa-sol', null);
        setBotB(prev => ({ ...prev, status: 'REPAIRING' }));
        await wait(4000);

        // Next Request: Bedsheets
        setRoomRequest('villa-mar', 'Bedsheets need changing 🛏️');
        await wait(2000);

        setBotB(prev => ({ ...prev, x: 50, y: 75, status: 'REROUTING' }));
        await wait(6000);

        setRoomRequest('villa-mar', null);
        setBotB(prev => ({ ...prev, status: 'CLEANING' }));
        await wait(4000);
        
        // Return to base
        setBotB(prev => ({ ...prev, x: 10, y: 50, status: 'RETURNING' }));
        await wait(6000);
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

      <div className="relative w-full h-[500px] bg-[#eef7ec] border border-green-200/50 rounded-xl overflow-hidden shadow-inner font-sans">
        
        {/* Landscape Elements (Trees, Pools, Paths) */}
        
        {/* Paths (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.05))' }}>
          {/* Main Path from Base */}
          <path d="M 100 250 L 800 250" stroke="#d1ba98" strokeWidth="12" strokeLinecap="round" fill="none" strokeDasharray="4 4" />
          {/* Path to Sol */}
          <path d="M 250 250 L 250 100" stroke="#d1ba98" strokeWidth="12" strokeLinecap="round" fill="none" strokeDasharray="4 4" />
          {/* Path to Luna */}
          <path d="M 750 250 L 750 125" stroke="#d1ba98" strokeWidth="12" strokeLinecap="round" fill="none" strokeDasharray="4 4" />
          {/* Path to Mar */}
          <path d="M 500 250 C 500 350, 400 350, 500 375" stroke="#d1ba98" strokeWidth="12" strokeLinecap="round" fill="none" strokeDasharray="4 4" />
        </svg>

        {/* Trees */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-green-600/20 rounded-full blur-md"></div>
        <div className="absolute top-12 left-12 w-8 h-8 bg-green-700/40 rounded-full"></div>

        <div className="absolute top-20 left-1/3 w-16 h-16 bg-green-600/20 rounded-full blur-md"></div>
        <div className="absolute top-24 left-[34%] w-10 h-10 bg-green-700/40 rounded-full"></div>

        <div className="absolute bottom-10 right-20 w-20 h-20 bg-green-600/20 rounded-full blur-md"></div>
        <div className="absolute bottom-12 right-[5.5rem] w-12 h-12 bg-green-700/40 rounded-full"></div>

        {/* Pools */}
        <div className="absolute bottom-20 left-20">
          <div className="w-32 h-20 bg-blue-200/60 rounded-[40%] border-4 border-blue-100 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-300/30 pattern-wavy"></div>
             <Droplets className="w-6 h-6 text-blue-500/50" />
          </div>
        </div>

        {/* Base Station */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-24 h-24 bg-slate-800 text-white rounded-xl shadow-2xl z-10 flex flex-col items-center justify-center border-b-4 border-slate-900">
          <BatteryCharging className="w-6 h-6 mb-1 text-slate-400" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-center">Hub</span>
        </div>

        {/* Rooms */}
        {(Object.values(rooms) as RoomState[]).map(room => (
          <div 
            key={room.id}
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{ left: `${room.x}%`, top: `${room.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* Request Chat Bubble */}
            <div className={`
              absolute -top-16 left-1/2 -translate-x-1/2 w-max max-w-[150px]
              bg-white text-slate-700 p-2 rounded-xl shadow-xl border border-gray-100
              text-[10px] sm:text-xs font-medium text-center transition-all duration-300 origin-bottom
              ${room.request ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
            `}>
              {room.request}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </div>

            <div className="w-16 h-16 bg-orange-50/90 border-2 border-orange-200/50 rounded-lg shadow-lg flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
               {/* Tiny roof graphic */}
               <div className="absolute top-0 inset-x-0 h-4 bg-orange-200/50"></div>
               <Home className="w-5 h-5 text-orange-600 mt-2" />
            </div>
            <span className="mt-2 text-xs font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded shadow-sm">{room.name}</span>
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
        className="absolute z-30 transition-all duration-[1000ms] pointer-events-none"
        style={{ left: `${bot.x}%`, top: `calc(${bot.y}% - 35px)`, transform: 'translate(-50%, -100%)' }}
      >
        <div className="bg-slate-800 text-white text-[9px] px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center space-x-1">
          <span className="font-semibold">{bot.status}</span>
        </div>
        <div className="w-1.5 h-1.5 bg-slate-800 transform rotate-45 mx-auto -mt-1"></div>
      </div>

      <div 
        className={`absolute flex items-center justify-center w-8 h-8 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-30 transition-all border-2 border-white ring-2 ring-white/50`}
        style={{ 
          left: `${bot.x}%`, 
          top: `${bot.y}%`, 
          transform: 'translate(-50%, -50%)',
          transitionDuration: '5000ms',
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
