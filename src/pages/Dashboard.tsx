import { Sparkles, Send, Bot, Wrench, Clock, CheckCircle2, ChevronLeft, Server, Wifi, Battery, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import LiveHotelMap from '../components/LiveHotelMap';

export default function Dashboard() {
  const [requestText, setRequestText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequests = async () => {
    const { data } = await supabase.from('service_requests').select('*').order('created_at', { ascending: false });
    if (data) setRequests(data);
  };

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'service_requests'
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleProcessRequest = async () => {
    if (!requestText.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('service_requests').insert([{ guest_text: requestText }]);
      if (error) {
        console.error('Error inserting request:', error);
      } else {
        setRequestText("");
        fetchRequests();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container min-h-screen w-full font-sans text-slate-800 bg-[#F9F8F3] p-6 sm:p-10 space-y-10">
        
        {/* Section 1: Header */}
        <header className="flex justify-between items-center border-b border-gray-100 pb-6">
          <div className="flex items-center space-x-6">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-100 text-slate-400 hover:text-slate-800 transition-colors border border-transparent hover:border-gray-200">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-baseline space-x-3">
                <h1 className="font-serif text-4xl text-slate-800">Innovaeste</h1>
                <span className="font-serif text-2xl text-slate-400">Orchestrator</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">Live AI Operations &amp; Task Routing</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-accent-orange text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
            </span>
            <span>System Online</span>
          </div>
        </header>

        {/* Section 1.5: Interactive Hardware & Network Health Bar */}
        <div className="flex w-full flex-col md:flex-row items-center justify-between px-6 py-3 border border-slate-200 rounded-xl text-sm shadow-sm" style={{ backgroundColor: '#fdf9f4' }}>
          
          <div className="flex items-center space-x-3 w-full md:w-auto p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
            <Server className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <span className="text-slate-600 font-medium">Main Server Ping: <span className="text-slate-800">12ms</span></span>
            <div className="flex space-x-0.5 ml-2 items-end h-3">
              <div className="w-1 h-2 bg-emerald-500 rounded-full"></div>
              <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1.5 bg-emerald-500 rounded-full"></div>
            </div>
          </div>

          <div className="hidden md:block w-px h-6 bg-slate-200"></div>

          <div className="flex items-center space-x-3 w-full md:w-auto p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
            <Wifi className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span className="text-slate-600 font-medium">Guest Network: <span className="text-slate-800">100% Uptime</span></span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2"></div>
          </div>

          <div className="hidden md:block w-px h-6 bg-slate-200"></div>

          <div className="flex items-center space-x-3 w-full md:w-auto p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
            <Battery className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
            <span className="text-slate-600 font-medium">Fleet Power: <span className="text-slate-800">88%</span></span>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden ml-2 ring-1 ring-slate-200 inset-ring">
              <div className="w-[88%] h-full bg-orange-400"></div>
            </div>
          </div>

        </div>

        {/* Section 2: AI Request Terminal & ROI Analytics */}
        <section className="bg-orange-50/30 border border-orange-100/80 rounded-2xl p-6 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group" style={{ backgroundColor: '#fdf9f4' }}>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-accent-orange transition-colors">Avg AI Response Time</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">1.2s</div>
              <div className="text-xs text-emerald-600 mt-1 flex items-center font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                ↑ 30% faster than human routing
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group" style={{ backgroundColor: '#fdf9f4' }}>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-accent-orange transition-colors">Tasks Automated Today</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">142</div>
              <div className="text-xs text-slate-500 mt-1 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" />
                Zero routing errors
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group" style={{ backgroundColor: '#fdf9f4' }}>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-accent-orange transition-colors">Staff Hours Saved</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">4.5 hrs</div>
              <div className="text-xs text-orange-500 font-medium mt-1 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Equivalent to 0.5 shifts
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-accent-orange" />
            <h2 className="text-xl font-semibold text-slate-800">Simulate Guest Request</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleProcessRequest();
              }}
              placeholder="e.g., I spilled coffee in room 402, send a robot with towels" 
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-sans shadow-inner" style={{ backgroundColor: '#fdf9f4' }}
            />
            <button 
              onClick={handleProcessRequest}
              disabled={isSubmitting || !requestText.trim()}
              className="flex items-center justify-center space-x-2 bg-accent-orange hover:bg-orange-500 active:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-orange-500/20 active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Sending..." : "Process Request"}</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </section>

        {/* Section 3: Fleet & Staff Status Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow" style={{ backgroundColor: '#fdf9f4' }}>
            <div className="flex items-center space-x-3 mb-4 text-slate-600">
              <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                <Bot className="w-5 h-5 text-slate-500" />
              </div>
              <h3 className="font-medium text-lg text-slate-800">Robotics Unit 01</h3>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-bold text-slate-800 mb-1">IDLE</div>
              <p className="text-sm text-slate-500">Charging at Base Station (Lobby)</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-orange-100/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] transition-shadow" style={{ backgroundColor: '#fdf9f4' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 blur-3xl rounded-full"></div>
            <div className="flex items-center space-x-3 mb-4 text-slate-600 relative z-10">
              <div className="p-2 bg-orange-50 rounded-lg border border-orange-100/50">
                <Wrench className="w-5 h-5 text-accent-orange" />
              </div>
              <h3 className="font-medium text-lg text-slate-800">IT / Network Admin</h3>
            </div>
            <div className="mt-auto relative z-10">
              <div className="text-3xl font-bold text-accent-orange mb-1">ACTIVE</div>
              <p className="text-sm text-slate-500">Troubleshooting Rm 310 Router</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow" style={{ backgroundColor: '#fdf9f4' }}>
            <div className="flex items-center space-x-3 mb-4 text-slate-600">
              <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                <Sparkles className="w-5 h-5 text-slate-500" />
              </div>
              <h3 className="font-medium text-lg text-slate-800">Housekeeping</h3>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-bold text-emerald-600 mb-1">AVAILABLE</div>
              <p className="text-sm text-slate-500">Floor 4 Staff Ready</p>
            </div>
          </div>
        </section>

        {/* Section 3.5: Live 2D Hotel Map */}
        <LiveHotelMap />

        {/* Section 4: Live Operations Feed */}
        <section className="border border-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ backgroundColor: '#fdf9f4' }}>
          <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#f5efe8' }}>
            <h2 className="text-xl font-semibold text-slate-800">Live Operations Feed</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80 text-sm font-medium text-slate-500">
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Room</th>
                  <th className="py-4 px-6">Guest Request</th>
                  <th className="py-4 px-6">AI Routing</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-slate-500">
                      {new Date(req.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">TBD</td>
                    <td className="py-4 px-6 italic text-slate-600">"{req.guest_text}"</td>
                    <td className="py-4 px-6">
                      {!req.assigned_to ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-slate-700 border border-gray-200">
                          Pending AI
                        </span>
                      ) : req.assigned_to === 'AI Thinking...' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200 animate-pulse">
                          {req.assigned_to}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-accent-orange border border-orange-200">
                          {req.assigned_to}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {req.status === 'Assigning...' ? (
                        <div className="flex items-center space-x-2 text-blue-600 font-medium">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Assigning...</span>
                        </div>
                      ) : req.status === 'pending' ? (
                        <div className="flex items-center space-x-2 text-accent-orange font-medium">
                          <Clock className="w-4 h-4" />
                          <span>Pending</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-emerald-600 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="capitalize">{req.status}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

    </div>
  );
}
