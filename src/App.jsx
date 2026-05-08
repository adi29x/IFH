import React from 'react';
import { Phone, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Industries from './components/Industries';
import About from './components/About';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Industries />
        <About />
        <Products />
        <WhyChooseUs />
        <Testimonials />
        
        {/* Lead Generation CTA Section */}
        <section className="section-padding bg-gradient-to-br from-industrial-charcoal to-[#0A0A0A] text-white relative overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-industrial-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-blue/20 rounded-full mb-8">
                  <span className="w-2 h-2 bg-industrial-blue rounded-full"></span>
                  <span className="text-industrial-blue font-bold uppercase tracking-widest text-[10px]">Technical Support</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tighter leading-tight uppercase">
                  Looking For <br />
                  <span className="text-industrial-blue italic">Advanced</span> <br />
                  Solutions?
                </h2>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed font-medium max-w-lg">
                  Partner with the world's most experienced filter technology company. Let our experts design a custom solution for your specific industrial needs.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-industrial-blue group-hover:border-industrial-blue transition-all duration-500">
                      <Phone size={24} className="text-industrial-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Call Us Now</p>
                      <p className="font-bold text-sm tracking-tight">+49-2053-4200990</p>
                      <p className="font-bold text-sm tracking-tight">+91 93111 59458</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-industrial-blue group-hover:border-industrial-blue transition-all duration-500">
                      <Mail size={24} className="text-industrial-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Email Us</p>
                      <p className="font-bold text-lg tracking-tight">sales@intensiv-filter-himenviro.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-industrial-blue/20 blur-3xl rounded-full -z-10 opacity-30"></div>
                <div className="glass-card p-12 rounded-[40px] border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-industrial-blue to-transparent"></div>
                  
                  <h3 className="text-2xl font-bold mb-8 tracking-tight">Request a Quote</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">First Name</label>
                        <input type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-industrial-blue focus:bg-white/10 transition-all text-white font-medium" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
                        <input type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-industrial-blue focus:bg-white/10 transition-all text-white font-medium" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Work Email</label>
                      <input type="email" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-industrial-blue focus:bg-white/10 transition-all text-white font-medium" placeholder="john@company.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Company Name</label>
                      <input type="text" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-industrial-blue focus:bg-white/10 transition-all text-white font-medium" placeholder="Industrial Solutions Inc." />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                      <textarea rows="4" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-industrial-blue focus:bg-white/10 transition-all text-white font-medium resize-none" placeholder="How can we help you?"></textarea>
                    </div>
                    
                    <button className="w-full py-5 bg-industrial-blue text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-industrial-blue/80 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-industrial-blue/20">
                      Request Technical Support
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Sticky Quick Inquiry (CRO focus) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-3">
        <a href="https://wa.me/919311159458" target="_blank" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
      </div>
    </div>
  );
}

export default App;
