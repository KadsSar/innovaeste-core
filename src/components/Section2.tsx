export default function Section2() {
  return (
    <div className="relative w-full bg-white px-20 py-24">
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
          <div className="mt-8 text-right max-w-sm">
            <h4 className="font-serif text-xl text-slate-800 mb-2">Transforming Space,<br/>Elevating Lifestyles With</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
              Innovative Architecture &amp; Interior Design<br/>for Modern Living.
            </p>
            <button className="flex items-center space-x-3 ml-auto border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors">
              <span className="text-[11px] font-sans text-slate-800 font-medium">Explore</span>
              <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center text-white">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
