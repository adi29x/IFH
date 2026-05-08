import React, { useState, useRef } from 'react';
import { Check } from 'lucide-react';
import aboutImg from '../assets/cement.png';
import Counter from './Counter';

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="section-padding bg-[#0A0A0A] text-white relative overflow-hidden" 
      id="about-us"
    >
      {/* Flashlight Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 86, 164, 0.15), transparent 80%)`
        }}
      ></div>
      
      {/* Background Texture revealed by flashlight */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <div className="container mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-[40px] overflow-hidden group shadow-2xl border border-white/5">
              <img 
                src={aboutImg} 
                alt="Intensiv-Filter Legacy" 
                className="w-full h-[700px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-industrial-blue/10"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-blue/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-industrial-blue rounded-full"></span>
              <span className="text-industrial-blue font-bold uppercase tracking-widest text-[10px]">A 100 Years Old Legacy</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-10 tracking-tighter leading-[0.9] uppercase">
              Pioneers of <br />
              <span className="text-industrial-blue italic text-shimmer">Filter</span> <br />
              Technology
            </h2>
            
            <p className="text-gray-400 text-lg mb-12 leading-relaxed font-medium max-w-xl">
              With over a hundred years of experience and expertise, Intensiv-Filter Himenviro is a leading global company in Clean Air Technology.
            </p>

            {/* Legacy Timeline */}
            <div className="space-y-12 mb-16 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-white/10"></div>
              
              {[
                { year: '1922', title: 'The Foundation', desc: 'Established as pioneers in industrial filtration technology in Germany.' },
                { year: '70k+', title: 'Global Impact', desc: 'Successfully completed over 70,000 installations across diverse industries.' },
                { year: '100+', title: 'Years of Excellence', desc: 'A century of engineering leadership and technical innovation.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-10 group">
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-industrial-blue flex items-center justify-center group-hover:bg-industrial-blue transition-colors duration-500">
                      <div className="w-2 h-2 rounded-full bg-industrial-blue group-hover:bg-white transition-colors"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-white">
                      <Counter value={item.year} label={item.title} duration={1.5} />
                    </div>
                    <p className="text-gray-500 text-sm max-w-md mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-industrial-blue">
                  <Check size={20} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest">German Technology</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-industrial-blue">
                  <Check size={20} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Global Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
