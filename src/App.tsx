import React from 'react';
import Section1 from './components/Section1';
import Section2 from './components/Section2';

function App() {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl my-8 font-sans">
      <Section1 />
      <Section2 />
    </div>
  );
}

export default App;
