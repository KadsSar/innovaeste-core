import { Link } from 'react-router-dom';
import Section1 from '../components/Section1';
import SectionExperiences from '../components/SectionExperiences';
import LiveHotelMap from '../components/LiveHotelMap';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
import Section4 from '../components/Section4';
import Section5 from '../components/Section5';
import Section6 from '../components/Section6';

export default function LandingPage() {
  return (
    <div className="app-container w-full min-h-screen bg-[#F9F8F3] overflow-hidden font-sans">
      <Section1 />
      <SectionExperiences />

      <section className="bg-[#F9F8F3] py-20 px-8 w-full">
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h2 className="font-serif text-4xl text-slate-800 mb-6 drop-shadow-sm">Live Autonomous Fleet Tracking</h2>
          <p className="font-sans text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Experience the future of hospitality. Watch our state-of-the-art robotics fleet and dedicated staff coordinate in real-time to deliver exceptional, seamless service across the resort.
          </p>
        </div>
        <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-2xl border border-slate-200" style={{ backgroundColor: '#fdf9f4' }}>
          <LiveHotelMap />
        </div>
      </section>

      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />

      <div className="w-full bg-dark-forest pb-6 flex justify-center">
        <Link to="/login" className="text-[10px] text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest font-sans">
          Staff Portal
        </Link>
      </div>
    </div>
  );
}
