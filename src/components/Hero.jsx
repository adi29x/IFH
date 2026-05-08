import React, { useState } from 'react';
import { Play, ArrowUpRight, X } from 'lucide-react';
import heroImage from '../assets/hero.png';
import Counter from './Counter';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-start pt-40 lg:pt-52 pb-40 overflow-hidden bg-[#F8F9FA]" id="home">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8 animate-fade-in h-6">
              <span className="w-12 h-[1px] bg-industrial-blue"></span>
              <span className="text-industrial-blue font-bold uppercase tracking-[0.2em] text-[10px]">since 1922</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-industrial-charcoal leading-[0.9] mb-10 tracking-tighter animate-slide-up uppercase">
              providing solutions <br />
              for a <span className="text-industrial-blue italic text-shimmer">cleaner</span> and <br />
              <span className="text-industrial-blue text-shimmer">sustainable</span> future
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="max-w-md text-gray-500 text-lg leading-relaxed font-medium">
                Global leaders in industrial dust collection, electrostatic precipitators, and sustainable pollution control solutions since 1922.
              </p>
              <div className="flex items-center">
                <button className="w-52 h-14 bg-industrial-charcoal text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-industrial-blue hover:scale-110 active:scale-95 transition-all group shadow-xl">
                  Explore Now <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-gray-200 animate-slide-up text-industrial-charcoal" style={{ animationDelay: '0.4s' }}>
              <Counter value="70K+" label="Installations" />
              <Counter value="110+" label="Countries" />
              <Counter value="1922" label="Established" />
              <Counter value="400+" label="Projects" />
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-fade-in mt-1" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-[40px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] group">
              <img 
                src={heroImage} 
                alt="Industrial Facility" 
                className="w-full h-[500px] lg:h-[650px] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-charcoal/30 to-transparent"></div>
              
              {/* Excellence Badge */}
              <div className="absolute top-8 left-8 z-20">
                <div className="w-24 h-24 rounded-full bg-industrial-blue/90 backdrop-blur-md flex flex-col items-center justify-center border border-white/20 shadow-2xl animate-pulse-slow">
                  <span className="text-white font-black text-2xl leading-none">100+</span>
                  <span className="text-white/80 font-bold text-[8px] uppercase tracking-widest mt-1 text-center px-2">Years of Excellence</span>
                </div>
              </div>

              {/* Overlay Glass Card */}
              <div className="absolute bottom-8 left-8 right-8 glass-card p-6 border-white/30 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowVideo(true)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-industrial-blue shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Play size={20} fill="currentColor" />
                  </button>
                  <div>
                    <p className="text-white font-bold text-sm">Engineering Legacy</p>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">Watch our process</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-industrial-blue/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 lg:p-20">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-10 right-10 text-white hover:text-industrial-blue transition-colors"
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-6xl aspect-v