const experiences = [
  { img: '/1.png', label: 'jungle safari' },
  { img: '/2.png', label: 'lamp festival' },
  { img: '/3.png', label: 'sauna and spa' },
  { img: '/4.png', label: 'luxury aquarium restaurant' },
  { img: '/5.png', label: 'netflix under stars' },
  { img: '/6.png', label: 'beach eatery' },
  { img: '/7.png', label: 'all inclusive resort' },
  { img: '/8.png', label: 'scuba diving' },
  { img: '/9.png', label: 'pool sites' },
  { img: '/10.png', label: 'lunch with elephants' },
  { img: '/11.png', label: 'luxury villas' },
  { img: '/12.png', label: "italian chef's special" },
  { img: '/13.png', label: 'pool clubs' },
  { img: '/14.png', label: 'all inclusive breakfast' },
  { img: '/15.png', label: 'beach concert' },
];

export default function SectionExperiences() {
  return (
    <section className="py-12 px-8 overflow-hidden" >
      <h2 className="text-center text-4xl font-serif text-slate-800 mb-8 mx-auto max-w-4xl leading-relaxed">
        Our Packages and Resort Experiences are crafted personally for you
      </h2>
      <div className="flex w-full overflow-hidden whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex gap-6 min-w-max animate-infinite-scroll">
          {experiences.map((exp, index) => (
            <div 
              key={`t1-${index}`}
              className="flex-shrink-0 relative overflow-hidden rounded-2xl shadow-lg border border-slate-100 h-[400px] w-[320px] bg-slate-100 group cursor-pointer"
            >
              <img 
                src={exp.img} 
                alt={exp.label} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                <p className="text-center text-sm font-sans tracking-widest uppercase font-medium text-white shadow-sm">
                  {exp.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Track 2 (Duplicate) */}
        <div className="flex gap-6 min-w-max animate-infinite-scroll ml-6">
          {experiences.map((exp, index) => (
            <div 
              key={`t2-${index}`}
              className="flex-shrink-0 relative overflow-hidden rounded-2xl shadow-lg border border-slate-100 h-[400px] w-[320px] bg-slate-100 group cursor-pointer"
            >
              <img 
                src={exp.img} 
                alt={exp.label} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                <p className="text-center text-sm font-sans tracking-widest uppercase font-medium text-white shadow-sm">
                  {exp.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
