import { useEffect, useState } from 'react';
import { Bot, Sparkles, DoorOpen, BatteryCharging } from 'lucide-react';

type BotState = {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  status: string;
  color: string;
  icon: React.ReactNode;
};

export default function LiveHotelMap() {
  // Bot A: Towels (Orange)
  const [botA, setBotA] = useState<BotState>({
    id: 'A', name: 'Robotics Unit 01', x: 5, y: 40, status: 'IDLE', color: 'bg-accent-orange text-white', icon: <Bot size={16} />
  });
  
  // Bot B: Cleaning (Emerald)
  const [botB, setBotB] = useState<BotState>({
    id: 'B', name: 'Housekeeping Bot', x: 5, y: 60, status: 'CHARGING', color: 'bg-emerald-500 text-white', icon: <Sparkles size={16} />
  });

  useEffect(() => {
    let mounted = true;

    const runBotASequence = async () => {
      while (mounted) {
        // IDLE at base
        setBotA(prev => ({ ...prev, x: 5, y: 40, status: 'IDLE (Base)' }));
        await wait(2000);
        
        // Move to hallway aligned with room 102
        setBotA(prev => ({ ...prev, x: 50, y: 40, status: 'NAVIGATING TO 102' }));
        await wait(2000); // Wait for transit
        
        // Enter Room 102 (Top middle)
        setBotA(prev => ({ ...prev, x: 50, y: 20, status: 'ENTERING ROOM' }));
        await wait(1000); // Wait for transit
        
        // Task
        setBotA(prev => ({ ...prev, status: 'DELIVERING TOWELS' }));
        await wait(3000); 
        
        // Exit room
        setBotA(prev => ({ ...prev, x: 50, y: 40, status: 'EXITING ROOM' }));
        await wait(1000);
        
        // Return to base
        setBotA(prev => ({ ...prev, x: 5, y: 40, status: 'RETURNING TO BASE' }));
        await wait(2000);
      }
    };

    const runBotBSequence = async () => {
      // Offset start
      await wait(3500);
      while (mounted) {
        // At base
        setBotB(prev => ({ ...prev, x: 5, y: 60, status: 'IDLE (Base)' }));
        await wait(1000);
        
        // Move to hallway aligned with room 106 (bottom right)
        setBotB(prev => ({ ...prev, x: 80, y: 60, status: 'NAVIGATING TO 106' }));
        await wait(2500); 
        
        // Enter Room 106
        setBotB(prev => ({ ...prev, x: 80, y: 80, status: 'ENTERING ROOM' }));
        await wait(1000); 
        
        // Task
        setBotB(prev => ({ ...prev, status: 'CLEANING ROOM RUN' }));
        await wait(4000); 
        
        // Exit room
        setBotB(prev => ({ ...prev, x: 80, y: 60, status: 'EXITING ROOM' }));
        await wait(1000);
        
        // Return to base
        setBotB(prev => ({ ...prev, x: 5, y: 60, status: 'RETURNING TO BASE' }));
        await wait(2500);
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
          <h2 className="text-xl font-semibold text-slate-800">Live Hotel Map Map</h2>
          <p className="text-sm text-slate-500">Real-time autonomous fleet tracking</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent-orange shadow-sm animate-pulse"></div>
            <span className="text-xs text-slate-600 font-medium">Robotics</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm animate-pulse"></div>
            <span className="text-xs text-slate-600 font-medium">Housekeeping</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[400px] bg-slate-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner font-sans">
        
        {/* Hallway */}
        <div className="absolute left-0 right-0 top-1/2 h-16 bg-gray-200/50 -translate-y-1/2 flex items-center justify-center">
           <div className="w-full border-t-2 border-dashed border-gray-300"></div>
        </div>

        {/* Base Station */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[12%] h-32 bg-slate-800 text-white rounded-r-xl border-4 border-l-0 border-slate-700 flex flex-col items-center justify-center shadow-lg z-10">
          <BatteryCharging className="w-6 h-6 mb-1 text-slate-400" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-center leading-tight">Base<br/>Station</span>
        </div>

        {/* Rooms Top */}
        <Room left="20%" top="5%" name="Room 101" />
        <Room left="50%" top="5%" name="Room 102" activeTask={botA.status === 'DELIVERING TOWELS' ? 'TOWEL DELIVERY' : ''} />
        <Room left="80%" top="5%" name="Room 103" />

        {/* Rooms Bottom */}
        <Room left="20%" bottom="5%" name="Room 104" />
        <Room left="50%" bottom="5%" name="Room 105" />
        <Room left="80%" bottom="5%" name="Room 106" activeTask={botB.status === 'CLEANING ROOM RUN' ? 'CLEANING IN PROGRESS' : ''} />

        {/* Bot A Details Tooltip */}
        <div 
          className="absolute z-30 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{ left: `${botA.x}%`, top: `calc(${botA.y}% - 40px)`, transform: 'translate(-50%, -100%)' }}
        >
          <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center space-x-1">
            <span>{botA.name}:</span>
            <span className="text-orange-400 font-semibold">{botA.status}</span>
          </div>
          {/* Tooltip triangle */}
          <div className="w-2 h-2 bg-slate-800 transform rotate-45 mx-auto -mt-1"></div>
        </div>

        {/* Bot A */}
        <div 
          className={`absolute flex items-center justify-center w-8 h-8 rounded-full shadow-lg z-20 transition-all duration-1000 ease-in-out ${botA.color}`}
          style={{ 
            left: `${botA.x}%`, 
            top: `${botA.y}%`, 
            transform: 'translate(-50%, -50%)',
          }}
        >
          {botA.icon}
        </div>

        {/* Bot B Details Tooltip */}
        <div 
          className="absolute z-30 transition-all duration-1000 ease-in-out pointer-events-none"
          style={{ left: `${botB.x}%`, top: `calc(${botB.y}% + 24px)`, transform: 'translate(-50%, 0)' }}
        >
          {/* Tooltip triangle */}
          <div className="w-2 h-2 bg-slate-800 transform rotate-45 mx-auto -mb-1"></div>
          <div className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center space-x-1">
            <span>{botB.name}:</span>
            <span className="text-emerald-400 font-semibold">{botB.status}</span>
          </div>
        </div>

        {/* Bot B */}
        <div 
          className={`absolute flex items-center justify-center w-8 h-8 rounded-full shadow-lg z-20 transition-all duration-1000 ease-in-out ${botB.color}`}
          style={{ 
            left: `${botB.x}%`, 
            top: `${botB.y}%`, 
            transform: 'translate(-50%, -50%)',
          }}
        >
          {botB.icon}
        </div>

      </div>
    </div>
  );
}

// Sub-component for a Room
function Room({ left, top, bottom, name, activeTask }: { left: string, top?: string, bottom?: string, name: string, activeTask?: string }) {
  const style: any = { left, transform: 'translateX(-50%)', width: '22%', height: '35%' };
  if (top) style.top = top;
  if (bottom) style.bottom = bottom;

  return (
    <div className="absolute bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center z-0" style={style}>
      <DoorOpen className="w-6 h-6 text-gray-300 mb-2" />
      <span className="text-xs font-semibold text-slate-700">{name}</span>
      
      {activeTask && (
        <div className="absolute inset-x-0 bottom-2 flex justify-center">
          <span className="bg-orange-100 text-accent-orange text-[8px] font-bold px-2 py-0.5 rounded-full animate-pulse border border-orange-200">
            {activeTask}
          </span>
        </div>
      )}
    </div>
  );
}
