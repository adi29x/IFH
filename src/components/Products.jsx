import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import espImg from '../assets/esp.png';
import hybridImg from '../assets/hybrid.png';
import fabricImg from '../assets/fabric.png';
import wasteImg from '../assets/waste.png';

const products = [
  {
    title: 'Electrostatic Precipitator',
    tag: 'Industrial Air Cleaning',
    image: espImg,
  },
  {
    title: 'Hybrid Filter',
    tag: 'Advanced Filtration',
    image: hybridImg,
  },
  {
    title: 'Fabric Filter',
    tag: 'Dust Collection',
    image: fabricImg,
  },
  {
    title: 'Reverse Air Bag House',
    tag: 'High Temperature Systems',
    image: wasteImg,
  },
];

const Products = () => {
  return (
    <section className="section-padding bg-white" id="solutions">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-industrial-blue"></span>
            <span className="text-industrial-blue font-bold uppercase tracking-[0.2em] text-[10px]">100+ Years of Excellence</span>
            <span className="w-10 h-[1px] bg-industrial-blue"></span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-industrial-charcoal mb-6 tracking-tighter uppercase whitespace-nowrap">
            Our <span className="text-industrial-blue italic">Product Range</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Service based customized solutions etc. Leading the industry with engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden mb-8 shadow-2xl border border-gray-100">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:blur-[2px]"
                />
                
                {/* Blueprint Reveal Overlay */}
                <div className="absolute inset-0 bg-industrial-blue/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <div className="absolute inset-0 border-[0.5px] border-white/20 m-6"></div>
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white mb-6 mx-auto group-hover:rotate-45 transition-transform duration-700">
                      <ArrowUpRight size={24} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-2">Technical Specs</p>
                    <h4 className="text-xl font-bold text-white tracking-tighter uppercase mb-4">{product.title}</h4>
                    <div className="flex gap-2 justify-center">
                      <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black opacity-100 group-hover:opacity-0 transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="px-2">
                <p className="text-industrial-blue font-bold uppercase tracking-widest text-[10px] mb-2">{product.tag}</p>
                <h3 className="text-xl font-bold text-industrial-charcoal leading-tight uppercase tracking-tight">{product.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
