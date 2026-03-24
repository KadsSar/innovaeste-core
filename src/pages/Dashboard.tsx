import React from 'react';
import { Sparkles, Send, Bot, Wrench, Clock, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        
        {/* Section 1: Header */}
        <header className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-baseline space-x-3">
              <h1 className="font-serif text-4xl text-slate-100">Innovaeste</h1>
              <span className="font-serif text-2xl text-slate-400">Orchestrator</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">Live AI Operations &amp; Task Routing</p>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>System Online: Operational</span>
          </div>
        </header>

        {/* Section 2: AI Request Terminal */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-semibold">Simulate Guest Request</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="e.g., I spilled coffee in room 402, send a robot with towels" 
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-sans"
            />
            <button className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-orange-500/20 active:translate-y-[1px]">
              <span>Process Request</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </section>

        {/* Section 3: Fleet & Staff Status Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col">
            <div className="flex items-center space-x-3 mb-4 text-slate-300">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                <Bot className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-medium text-lg">Robotics Unit 01</h3>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-bold text-slate-100 mb-1">IDLE</div>
              <p className="text-sm text-slate-400">Charging at Base Station (Lobby)</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full"></div>
            <div className="flex items-center space-x-3 mb-4 text-slate-300 relative z-10">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                <Wrench className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-medium text-lg">IT / Network Admin</h3>
            </div>
            <div className="mt-auto relative z-10">
              <div className="text-3xl font-bold text-orange-400 mb-1">ACTIVE</div>
              <p className="text-sm text-slate-400">Troubleshooting Rm 310 Router</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col">
            <div className="flex items-center space-x-3 mb-4 text-slate-300">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                <Sparkles className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-medium text-lg">Housekeeping</h3>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-bold text-emerald-400 mb-1">AVAILABLE</div>
              <p className="text-sm text-slate-400">Floor 4 Staff Ready</p>
            </div>
          </div>
        </section>

        {/* Section 4: Live Operations Feed */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
          <div className="p-6 border-b border-slate-700 bg-slate-800/80">
            <h2 className="text-xl font-semibold">Live Operations Feed</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50 text-sm font-medium text-slate-400">
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Room</th>
                  <th className="py-4 px-6">Guest Request</th>
                  <th className="py-4 px-6">AI Routing</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 text-slate-300">10:42 AM</td>
                  <td className="py-4 px-6 font-medium">310</td>
                  <td className="py-4 px-6 italic text-slate-300">"The Wi-Fi keeps dropping on my laptop."</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700 text-slate-200 border border-slate-600">
                      IT / Network
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-orange-400 font-medium">
                      <Clock className="w-4 h-4" />
                      <span>In Progress</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 text-slate-300">10:15 AM</td>
                  <td className="py-4 px-6 font-medium">402</td>
                  <td className="py-4 px-6 italic text-slate-300">"I need two extra towels please."</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      Robotics Unit 01
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2 text-emerald-400 font-medium">
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
