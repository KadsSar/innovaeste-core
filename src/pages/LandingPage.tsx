
import Section1 from '../components/Section1';
import SectionExperiences from '../components/SectionExperiences';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
import Section4 from '../components/Section4';
import Section5 from '../components/Section5';
import Section6 from '../components/Section6';

export default function LandingPage() {
  return (
    <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl my-8 font-sans" style={{ backgroundColor: '#faf8f5' }}>
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
