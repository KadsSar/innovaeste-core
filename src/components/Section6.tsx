export default function Section6() {
  return (
    <div className="w-full bg-dark-forest px-8 pb-12 pt-8">
      <div className="relative w-full h-[240px] rounded-full overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1537162989-138fa1b40ea5?auto=format&fit=crop&w=1600&q=80" 
            alt="Pool surrounded by tropical plants" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        
        {/* Foregound content */}
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-sans text-[10px] uppercase tracking-widest text-gray-300 mb-4">
            Journey Discoveries Straight
          </p>
          <h2 className="font-serif text-4xl md:text-5xl drop-shadow-lg">
            Sign up for exclusive offers from us
          </h2>
        </div>
      </div>
    </div>
  );
}
