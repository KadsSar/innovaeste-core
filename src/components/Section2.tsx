import { Link } from 'react-router-dom';

export default function Section2() {
  return (
    <div className="relative w-full px-20 py-24" style={{ backgroundColor: '#0096C7' }}>
      {/* Headings */}
      <div className="mb-20">
        <h2 className="font-serif text-6xl text-slate-800 tracking-tight">Architecture</h2>
        <div className="flex items-center ml-12">
          <span className="w-8 h-[2px] bg-slate-800 inline-block mr-2" />
          <h2 className="font-serif text-6xl text-slate-800 tracking-tight">Interior</h2>
        </div>
      </div>

      {/* Grid of Images */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 w-full max-w-4xl mx-auto">
        <div className="w-full md:w-1/2">
          <div className="rounded-[2rem] overflow-hidden shadow-lg h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
              alt="Architecture exterior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-end">
          <div className="rounded-[2rem] overflow-hidden shadow-lg h-[300px] w-full">
            <img 
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" 
              alt="Architecture interior" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Text & Button Below Right Image */}
          <div className="mt-8 flex flex-col items-end max-w-sm text-right">
            <Link to="/loading" className="flex items-center space-x-4 bg-white border-2 border-gray-100 shadow-[0_4px_0_#e5e7eb,0_10px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_0_#e5e7eb,0_5px_10px_rgba(0,0,0,0.05)] hover:translate-y-[2px] active:shadow-[0_0px_0_#e5e7eb,0_0px_0px_rgba(0,0,0,0)] active:translate-y-[4px] transition-all rounded-full pl-6 pr-2 py-2 mb-8 group outline-none focus:outline-none">
              <span className="text-[14px] font-sans text-slate-800 font-bold tracking-wide">Explore Platform</span>
              <div className="w-10 h-10 bg-accent-orange rounded-full flex items-center justify-center text-white shadow-sm group-hover:bg-orange-500 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
            <h4 className="font-serif text-2xl text-slate-800 mb-2">Transforming Space,<br/>Elevating Lifestyles With</h4>
            <p className="font-sans text-sm text-slate-400 leading-relaxed mb-6">
              Innovative Architecture &amp; Interior Design<br/>for Modern Living.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
