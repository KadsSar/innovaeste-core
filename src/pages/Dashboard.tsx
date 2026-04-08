import { Sparkles, Send, Bot, Wrench, Clock, CheckCircle2, ChevronLeft, Server, Wifi, Battery, TrendingUp, Loader2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ThreeWaves from '../components/ThreeWaves';

export default function Dashboard() {
  const navigate = useNavigate();
  const [requestText, setRequestText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [showAllRequests, setShowAllRequests] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('innovaeste_admin') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const displayedRequests = showAllRequests ? requests : requests.slice(0, 5);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setRequests(data);
    if (error) console.error("Fetch error:", error);
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
        (payload) => {
          console.log("🔥 REALTIME UPDATE CAUGHT! Fetching new data...", payload);
          fetchRequests();
        }
      )
      .subscribe((status) => {
        console.log("📡 Websocket Connection Status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleProcessRequest = async () => {
    if (!requestText.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('service_requests').insert([{ guest_text: requestText }]);
      if (error) throw error;

      setRequestText("");
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container min-h-screen w-full font-sans text-slate-800 relative p-6 sm:p-10">
      <ThreeWaves />
      
      {/* Front Content Layer */}
      <div className="relative z-10 w-full space-y-10 max-w-7xl mx-auto">
        {/* Section 1: Header */}
        <header className="flex justify-between items-center border-b border-white/20 pb-6 bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-6">
            <Link to="/" className="p-2 rounded-full hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-slate-600">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-baseline space-x-3 text-white">
                <h1 className="font-serif text-4xl">Innovaeste</h1>
                <span className="font-serif text-2xl text-blue-200">Orchestrator</span>
              </div>
              <p className="mt-2 text-sm text-blue-100">Live AI Operations &amp; Task Routing</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full border border-blue-400/50 bg-blue-900/50 text-blue-200 text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
              </span>
              <span>System Online</span>
            </div>
            <button 
              onClick={() => {
                sessionStorage.removeItem('innovaeste_admin');
                navigate('/');
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 text-sm font-medium transition-colors backdrop-blur-sm"
            >
              <span>Logout</span>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Section 1.5: Interactive Hardware & Network Health Bar */}
        <div className="flex w-full flex-col md:flex-row items-center justify-between px-6 py-4 border border-white/10 rounded-xl text-sm shadow-xl bg-slate-900/40 backdrop-blur-md">
          
          <div className="flex items-center space-x-3 w-full md:w-auto p-2 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer group">
            <Server className="w-4 h-4 text-blue-300 group-hover:text-blue-100 transition-colors" />
            <span className="text-slate-300 font-medium">Main Server Ping: <span className="text-white">12ms</span></span>
            <div className="flex space-x-0.5 ml-2 items-end h-3">
              <div className="w-1 h-2 bg-emerald-400 rounded-full"></div>
              <div className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1.5 bg-emerald-400 rounded-full"></div>
            </div>
          </div>

          <div className="hidden md:block w-px h-6 bg-white/20"></div>

          <div className="flex items-center space-x-3 w-full md:w-auto p-2 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer group">
            <Wifi className="w-4 h-4 text-blue-300 group-hover:text-emerald-400 transition-colors" />
            <span className="text-slate-300 font-medium">Guest Network: <span className="text-white">100% Uptime</span></span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-2"></div>
          </div>

          <div className="hidden md:block w-px h-6 bg-white/20"></div>

          <div className="flex items-center space-x-3 w-full md:w-auto p-2 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer group">
            <Battery className="w-4 h-4 text-blue-300 group-hover:text-orange-400 transition-colors" />
            <span className="text-slate-300 font-medium">Fleet Power: <span className="text-white">88%</span></span>
            <div className="w-24 h-2 bg-slate-800/50 rounded-full overflow-hidden ml-2 ring-1 ring-white/10 inset-ring">
              <div className="w-[88%] h-full bg-orange-400"></div>
            </div>
          </div>

        </div>

        {/* Section 2: AI Request Terminal & ROI Analytics */}
        <section className="bg-slate-900/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-white/10 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group bg-slate-800/50">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold group-hover:text-white transition-colors">Avg AI Response Time</div>
              <div className="text-2xl font-bold text-white mt-1">1.2s</div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center font-medium">
                <TrendingUp className="w-3 h-3 mr-1" />
                ↑ 30% faster than human routing
              </div>
            </div>
            
            <div className="border border-white/10 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group bg-slate-800/50">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold group-hover:text-white transition-colors">Tasks Automated Today</div>
              <div className="text-2xl font-bold text-white mt-1">142</div>
              <div className="text-xs text-slate-300 mt-1 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
                Zero routing errors
              </div>
            </div>

            <div className="border border-white/10 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group bg-slate-800/50">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold group-hover:text-white transition-colors">Staff Hours Saved</div>
              <div className="text-2xl font-bold text-white mt-1">4.5 hrs</div>
              <div className="text-xs text-orange-400 font-medium mt-1 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Equivalent to 0.5 shifts
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-accent-orange" />
            <h2 className="text-xl font-semibold text-white">Simulate Guest Request</h2>
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
              className="flex-1 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-sans shadow-inner bg-slate-800/50"
            />
            <button 
              onClick={handleProcessRequest}
              disabled={isSubmitting || !requestText.trim()}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-500/50 active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/50"
            >
              <span>{isSubmitting ? "Sending..." : "Process Request"}</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </section>

        {/* Section 3: Fleet & Staff Status Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col hover:shadow-2xl transition-shadow bg-slate-900/60 backdrop-blur-lg">
            <div className="flex items-center space-x-3 mb-4 text-slate-300">
              <div className="p-2 bg-slate-800/80 rounded-lg border border-white/10">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-medium text-lg text-white">Robotics Unit 01</h3>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-bold text-white mb-1">IDLE</div>
              <p className="text-sm text-slate-400">Charging at Base Station (Lobby)</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-blue-500/30 rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] transition-shadow bg-slate-900/60 backdrop-blur-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="flex items-center space-x-3 mb-4 text-slate-300 relative z-10">
              <div className="p-2 bg-slate-800/80 rounded-lg border border-blue-500/30">
                <Wrench className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-medium text-lg text-white">IT / Network Admin</h3>
            </div>
            <div className="mt-auto relative z-10">
              <div className="text-3xl font-bold text-blue-400 mb-1">ACTIVE</div>
              <p className="text-sm text-slate-400">Troubleshooting Rm 310 Router</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col hover:shadow-2xl transition-shadow bg-slate-900/60 backdrop-blur-lg">
            <div className="flex items-center space-x-3 mb-4 text-slate-300">
              <div className="p-2 bg-slate-800/80 rounded-lg border border-white/10">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-medium text-lg text-white">Housekeeping</h3>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-bold text-emerald-400 mb-1">AVAILABLE</div>
              <p className="text-sm text-slate-400">Floor 4 Staff Ready</p>
            </div>
          </div>
        </section>

        {/* Section 4: Live Operations Feed */}
        <section className="border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-slate-900/60 backdrop-blur-lg">
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-800/50">
            <h2 className="text-xl font-semibold text-white">Live Operations Feed</h2>
            {requests.length > 5 && (
              <button
                onClick={() => setShowAllRequests(!showAllRequests)}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors bg-slate-900/50 px-4 py-2 rounded-full shadow-sm border border-white/10 hover:shadow"
              >
                {showAllRequests ? "Show Less" : "View All"}
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-800/30 text-sm font-medium text-slate-300">
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Room</th>
                  <th className="py-4 px-6">Guest Request</th>
                  <th className="py-4 px-6">AI Routing</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white">
                {displayedRequests.map((req) => (
                  <tr key={req.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-200">TBD</td>
                    <td className="py-4 px-6 italic text-slate-300">"{req.guest_text}"</td>
                    <td className="py-4 px-6">
                      {!req.assigned_to ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          Pending AI
                        </span>
                      ) : req.assigned_to === 'AI Thinking...' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-500/30 animate-pulse">
                          {req.assigned_to}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-900/40 text-indigo-300 border border-indigo-500/30">
                          {req.assigned_to}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {req.status === 'Assigning...' ? (
                        <div className="flex items-center space-x-2 text-blue-400 font-medium">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Assigning...</span>
                        </div>
                      ) : req.status === 'pending' ? (
                        <div className="flex items-center space-x-2 text-orange-400 font-medium">
                          <Clock className="w-4 h-4" />
                          <span>Pending</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-emerald-400 font-medium">
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
    </div>
  );
}