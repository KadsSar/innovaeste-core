export default function Section4() {
  const rooms = [
    {
      title: "Premium suite",
      price: "$400.00",
      img: "https://images.unsplash.com/photo-1582719508461-890ce6bb9a42?auto=format&fit=crop&w=600&q=80",
      beds: "2 Double",
      size: "350m2",
      guests: "3 Guests"
    },
    {
      title: "Guest rooms",
      price: "$450.00",
      img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80",
      beds: "1 Double",
      size: "120m2",
      guests: "2 Guests"
    },
    {
      title: "Economy room",
      price: "$300.00",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
      beds: "1 Double",
      size: "200m2",
      guests: "1 Guest"
    },
    {
      title: "Standard deluxe",
      price: "$400.00",
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
      beds: "2 Double",
      size: "800m2",
      guests: "3 Guests"
    }
  ];

  return (
    <div className="relative w-full bg-cream px-20 py-24 pb-32">
      {/* Heading Flex Container */}
      <div className="flex justify-between items-end mb-16 px-4 md:px-10">
        <h2 className="font-serif text-[42px] leading-tight text-slate-800 w-1/2">
          Your dream<br/>luxurious hotel room
        </h2>
        <div className="w-1/3 text-right">
          <p className="font-sans text-[11px] text-slate-400 font-light mb-4">
            Opulent furnishings, breathtaking views, lavish amenities, and personalized massage service await.
          </p>
          <a href="#" className="font-sans text-xs text-slate-800 font-medium underline underline-offset-4 decoration-gray-300 hover:decoration-slate-800 transition-colors">
            View all rooms
          </a>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-10">
        {rooms.map((room, idx) => (
          <div key={idx} className="flex flex-col">
            {/* Image */}
            <div className="w-full h-[220px] rounded-t-[2rem] overflow-hidden shadow-md mb-4">
              <img src={room.img} alt={room.title} className="w-full h-full object-cover" />
            </div>
            
            {/* Icons / Stats row */}
            <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-sans mb-3 uppercase tracking-wider">
              <span className="flex items-center gap-1">🛏 {room.beds}</span>
              <span className="flex items-center gap-1">📐 {room.size}</span>
              <span className="flex items-center gap-1">👤 {room.guests}</span>
            </div>

            {/* Title */}
            <h4 className="font-serif text-lg text-slate-800 mb-4">{room.title}</h4>

            {/* Bottom Row */}
            <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
              <span className="font-serif text-lg text-slate-800 font-semibold">{room.price}</span>
              <button className="border border-gray-200 rounded-full px-4 py-1.5 text-[10px] uppercase font-sans tracking-wide text-slate-500 hover:bg-slate-50 transition-colors">
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
