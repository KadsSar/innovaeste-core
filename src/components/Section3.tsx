export default function Section3() {
  const tabs = [
    "Restaurant & Bar",
    "Spa & Wellness",
    "Yoga & Fitness",
    "Summer Terrace",
    "Kids playroom",
    "Swimming pool",
    "Events & Meetings",
  ];

  return (
    <div className="relative w-full px-20 py-24 border-t border-gray-100" style={{ backgroundColor: '#0096C7' }}>
      {/* Heading & Video Button */}
      <div className="flex justify-between items-start mb-12">
        <h2 className="font-serif text-5xl text-slate-800 leading-tight w-1/2">
          Giving the<br/>best just for you
        </h2>
        <button className="w-20 h-20 bg-slate-800 rounded-full flex flex-col items-center justify-center text-white space-y-1 hover:bg-slate-700 transition-colors shadow-xl">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-[8px] font-sans tracking-widest uppercase">Video tour</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-16 pl-4 md:pl-10">
        {tabs.map((tab, idx) => (
          <button 
            key={idx}
            className={`px-6 py-2 rounded-full text-[11px] font-sans transition-colors ${
              idx === 0 
                ? 'bg-slate-800 text-white' 
                : 'bg-white border border-gray-200 text-slate-500 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Columns */}
      <div className="flex flex-col md:flex-row gap-16 px-4 md:px-10">
        <div className="w-full md:w-5/12">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl h-[360px]">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80" 
              alt="Restaurant and Bar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-7/12 flex flex-col justify-center gap-12 max-w-lg">
          <div>
            <h4 className="font-sans font-bold text-[13px] text-slate-800 mb-4 tracking-wide">
              Stylish decor and extensive beverage selection
            </h4>
            <p className="font-sans text-[11px] text-slate-400 leading-relaxed font-light">
              Immerse yourself in an atmosphere of sophistication with our stylish decor while enjoying an extensive array of carefully curated beverages to suit every taste. Serene ambiance, indulgent treatments for ultimate relaxation.
            </p>
          </div>
          <div>
            <h4 className="font-sans font-bold text-[13px] text-slate-800 mb-4 tracking-wide">
              Outdoor seating and live entertainment options
            </h4>
            <p className="font-sans text-[11px] text-slate-400 leading-relaxed font-light">
              Relish the ambiance of our outdoor seating areas, where you can enjoy live entertainment options while dining under the stars in perfect harmony.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
