import { Sparkles, Send, Bot, Wrench, Clock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-800 font-sans text-slate-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] p-6 sm:p-10 shadow-2xl space-y-10">
        
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
            <span>System Online: Operational</span>
          </div>
        </header>

        {/* Section 2: AI Request Terminal */}
        <section className="bg-orange-50/50 border border-orange-100/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-accent-orange" />
            <h2 className="text-xl font-semibold text-slate-800">Simulate Guest Request</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="e.g., I spilled coffee in room 402, send a robot with towels" 
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-sans shadow-inner shadow-gray-50"
            />
            <button className="flex items-center justify-center space-x-2 bg-accent-orange hover:bg-orange-500 active:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-orange-500/20 active:translate-y-[1px]">
              <span>Process Request</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </section>

        {/* Section 3: Fleet & Staff Status Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
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
          <div className="bg-white border border-orange-100/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] transition-shadow">
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
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
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

        {/* Section 4: Live Operations Feed */}
        <section className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
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
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-slate-500">10:42 AM</td>
                  <td className="py-4 px-6 font-medium text-slate-800">310</td>
                  <td className="py-4 px-6 italic text-slate-600">"The Wi-Fi keeps dropping on my laptop."</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-slate-700 border border-gray-200">
                      IT / Network
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-accent-orange font-medium">
                      <Clock className="w-4 h-4" />
                      <span>In Progress</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-slate-500">10:15 AM</td>
                  <td className="py-4 px-6 font-medium text-slate-800">402</td>
                  <td className="py-4 px-6 italic text-slate-600">"I need two extra towels please."</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-accent-orange border border-orange-200">
                      Robotics Unit 01
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Resolved</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
