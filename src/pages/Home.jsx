import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, Calendar, User } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import Hero from '../components/Hero';
import Industries from '../components/Industries';
import About from '../components/About';
import Products from '../components/Products';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data) setLatestBlogs(data);
    };
    fetchLatestBlogs();
  }, []);

  return (
    <>
      <Hero />
      <Industries />
      <About />
      <Products />
      <WhyChooseUs />
      
      {/* Latest Insights Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-blue/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-industrial-blue rounded-full"></span>
                <span className="text-industrial-blue font-bold uppercase tracking-widest text-[10px]">Knowledge Hub</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                Latest <span className="text-industrial-blue">Industrial</span> Insights
              </h2>
            </div>
            <Link to="/blog" className="group flex items-center gap-3 text-industrial-blue font-bold uppercase tracking-widest text-xs mb-2">
              View All Articles <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {latestBlogs.length > 0 ? (
              latestBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  to={`/blog/${blog.slug}`}
                  className="group flex flex-col bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={blog.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-industrial-blue" /> {new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-industrial-blue transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="flex items-center text-industrial-blue font-bold text-[10px] uppercase tracking-widest gap-2">
                      Read More <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Skeletons / Placeholders
              [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-[32px] h-[350px] border border-gray-100">
                  <div className="h-48 bg-gray-200 rounded-t-[32px]"></div>
                  <div className="p-8 space-y-4">
                    <div className="h-3 bg-gray-100 w-1/2 rounded"></div>
                    <div className="h-6 bg-gray-100 w-full rounded"></div>
                    <div className="h-6 bg-gray-100 w-3/4 rounded"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

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
    </>
  );
};


export default Home;
