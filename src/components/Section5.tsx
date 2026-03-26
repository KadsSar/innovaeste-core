export default function Section5() {
  const arches = [
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fa5c6a656?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="relative w-full" >
      {/* The Arches (z-10 relative) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-16 md:px-32 max-w-6xl mx-auto">
        {arches.map((img, idx) => (
          <div key={idx} className="w-full">
            <div 
              className="w-full h-[360px] rounded-t-full rounded-b-none overflow-hidden shadow-2xl"
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            >
              <img src={img} alt={`Arch ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* The Overlap Dark Section (z-0, negative margin) */}
      <div className="relative z-0 -mt-24 pt-40 pb-24 px-20 bg-dark-forest">
        <div className="flex flex-col md:flex-row justify-between items-end max-w-5xl mx-auto px-4">
          <h2 className="font-serif text-white text-4xl md:text-5xl leading-tight w-1/2">
            With our experience<br/>we will serve you
          </h2>
          
          <div className="flex space-x-12 md:space-x-20 text-white pb-2">
            <div className="flex flex-col">
              <span className="font-serif text-5xl">800+</span>
              <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest mt-2">Cities</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-5xl">3500+</span>
              <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest mt-2">Exclusive Hotels</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-5xl">2M</span>
              <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest mt-2">Exclusive Rooms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
