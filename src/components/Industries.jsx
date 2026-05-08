import React from 'react';
import { Factory, Zap, Flame, ArrowUpRight, Database } from 'lucide-react';
import cementImg from '../assets/cement.png';
import steelImg from '../assets/steel.png';
import powerImg from '../assets/power.png';

const industries = [
  {
    name: 'Cement and Minerals',
    image: cementImg,
    icon: <Zap size={24} />
  },
  {
    name: 'Steel and Metal',
    image: steelImg,
    icon: <Database size={24} />
  },
  {
    name: 'Power Generation',
    image: powerImg,
    icon: <Flame size={24} />
  }
];

const Industries = () => {
  return (
    <section className="pt-32 pb-32 bg-white border-t border-gray-100" id="industries">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-industrial-blue"></span>
              <span className="text-industrial-blue font-bold uppercase tracking-[0.2em] text-[10px]">100+ Years of Excellence</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-industrial-charcoal mb-6 tracking-tighter uppercase">
              Industries <br />
              <span className="text-industrial-blue">We Serve</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl">
              Select your industry and discover what we can do for you. Advanced filtration solutions for the world's most demanding sectors.
            </p>
          </div>
          <button className="px-10 py-4 bg-industrial-charcoal text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-industrial-blue transition-all shadow-xl">
            Explore All Sectors
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="group relative h-[500px] rounded-[40px] overflow-hidden cursor-pointer shadow-2xl"
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${industry.image})` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 text-industrial-blue mb-4">
                    {industry.icon}
                    <span className="h-[1px] w-8 bg-industrial-blue"></span>
                  </div>
                  <h3 className="text-4xl text-white font-bold tracking-tight mb-2 uppercase">{industry.name}</h3>
                  <p className="text-white/60 text-sm max-w-xs font-medium">
                    Advanced pollution control systems for {industry.name.toLowerCase()} plants.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
