import React from 'react';
import { Settings, Globe, Lightbulb, Beaker, Timer, ArrowUpRight } from 'lucide-react';
import InteractiveGlobe from './InteractiveGlobe';

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="why-ifh">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-industrial-blue"></span>
            <span className="text-industrial-blue font-bold uppercase tracking-[0.2em] text-[10px]">Technical Superiority</span>
            <span className="w-10 h-[1px] bg-industrial-blue"></span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tighter uppercase text-industrial-charcoal">
            Why to choose <span className="text-industrial-blue">Intensiv-Filter</span> Himenviro
          </h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">What makes us the Worlds Best Pollution Control Equipments Manufacturer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              title: 'IN-HOUSE MANUFACTURING AND ENGINEERING',
              description: 'Specialist engineering and state-of-the-art machinery for highest possible manufacturing quality.',
              icon: <Settings size={32} />
            },
            {
              title: 'GLOBAL SERVICES',
              description: 'Catering to your Spare Parts requirements and Aftercare services, all over the world.',
              icon: <Globe size={32} />
            },
            {
              title: 'CUSTOMIZED SOLUTIONS',
              description: 'Tailor-Made Solutions and comprehensive development services as per your industrial needs.',
              icon: <Lightbulb size={32} />
            },
            {
              title: 'GERMAN TECHNOLOGY',
              description: 'Our modern labs for measurement and process engineering are the basis of our innovative and progressive solutions.',
              icon: <Beaker size={32} />
            },
            {
              title: 'MORE THAN 100 YRS EXPERIENCE',
              description: 'We are the Pioneers of Filter Technology with years of expertise and technical know-how of more than 200 dust types.',
              icon: <Timer size={32} />
            }
          ].map((item, index) => (
            <div key={index} className="group p-10 bg-gray-50 rounded-[32px] hover:bg-industrial-charcoal transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center shadow-sm border border-gray-100">
              <div className="text-industrial-blue group-hover:text-white mb-8 transition-colors duration-500 p-4 bg-white rounded-2xl group-hover:bg-white/10 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-[10px] font-bold mb-4 group-hover:text-white transition-colors duration-500 leading-tight uppercase tracking-widest">
                {item.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-[10px] leading-relaxed transition-colors duration-500 font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-40 relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#001A33] via-[#0056A4] to-[#001A33] p-12 lg:p-24 shadow-2xl border border-white/10">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)]"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-[1px] bg-white"></span>
                <span className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Global Operations</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-tight">
                A Global <br />
                <span className="text-white/80">Presence</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed font-medium">
                Intensiv-Filter Himenviro has successful installations worldwide, spanning across continents and serving diverse industrial clusters with cutting-edge German technology.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'Installations Worldwide', val: '70k+' },
                  { label: 'Countries Served', val: '110+' },
                  { label: 'Year Established', val: '1922' },
                  { label: 'Projects Completed', val: '400+' }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-white text-3xl font-bold mb-1 tracking-tighter">{stat.val}</p>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-6">
                <button className="px-10 py-4 bg-white text-industrial-blue rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl">
                  Contact Local Office
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-7 h-[600px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <InteractiveGlobe />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
