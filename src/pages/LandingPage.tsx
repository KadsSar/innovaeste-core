
import Section1 from '../components/Section1';
import SectionExperiences from '../components/SectionExperiences';
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
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  );
}
