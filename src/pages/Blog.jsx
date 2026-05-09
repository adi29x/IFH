import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { 
  Calendar, User, ArrowRight, Loader2, Search, 
  Filter, Clock, Grid, List as ListIcon, ChevronRight,
  TrendingUp, Sparkles, Globe
} from 'lucide-react';
import { format } from 'date-fns';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [page, setPage] = useState(1);
  const itemsPerPage = 7; // Increased to account for featured post + 6 grid items

  const categories = ['All', 'Industrial', 'Technology', 'Sustainability', 'Case Study'];
  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'German', flag: '🇩🇪' },
    { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
    { code: 'fr', label: 'French', flag: '🇫🇷' }
  ];

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchBlogs();
  }, [currentLanguage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .eq('language', currentLanguage)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateReadingTime = (html) => {
    if (!html) return '5 min';
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-[#FBFBFC] min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 lg:px-20 max-w-7xl">
        
        {/* Spacious Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
           <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-industrial-blue/5 rounded-full mb-8">
                 <Sparkles size={14} className="text-industrial-blue" />
                 <span className="text-industrial-blue font-black uppercase tracking-[0.2em] text-[10px]">Industrial Intelligence Hub</span>
              </div>
              <h1 className="text-6xl lg:text-9xl font-black text-gray-900 tracking-tighter leading-[0.85] mb-8">
                 The Core <span className="text-industrial-blue">Archive.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-400 font-medium leading-relaxed">
                 Engineering the future through technical documentation and industrial insights.
              </p>
           </div>
           
           <div className="flex flex-col gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-3 bg-white p-2 rounded-[24px] border border-gray-100 shadow-xl shadow-gray-200/20">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-[18px] text-[10px] font-bold uppercase tracking-widest transition-all ${currentLanguage === lang.code ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30' : 'text-gray-400 hover:text-gray-900'}`}
                  >
                    <span className="text-sm leading-none">{lang.flag}</span> {lang.label}
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-20 p-4 bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/10">
           <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                  className={`px-8 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
           <div className="relative w-full lg:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Search the archive..."
                className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-[22px] focus:outline-none focus:bg-white focus:ring-4 ring-industrial-blue/5 transition-all text-sm font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-16 h-16 text-industrial-blue animate-spin mb-8" />
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Syncing Knowledge Hub...</p>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <>
            {/* Featured Post - Massive & Airy */}
            {!searchTerm && selectedCategory === 'All' && filteredBlogs[0] && page === 1 && (
               <Link to={`/blog/${filteredBlogs[0].slug}`} className="group block relative mb-32">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                     <div className="lg:col-span-7 relative aspect-[16/10] rounded-[60px] overflow-hidden shadow-3xl shadow-gray-200/50 border-[12px] border-white">
                        <img src={filteredBlogs[0].image_url} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute top-10 left-10">
                           <div className="flex items-center gap-3 px-5 py-2.5 bg-industrial-blue text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                              <TrendingUp size={14} /> Spotlight
                           </div>
                        </div>
                     </div>
                     <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                           <span className="text-industrial-blue">{filteredBlogs[0].category}</span>
                           <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                           <span>{format(new Date(filteredBlogs[0].created_at), 'MMMM d, yyyy')}</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] group-hover:text-industrial-blue transition-colors text-gray-900">
                           {filteredBlogs[0].title}
                        </h2>
                        <p className="text-xl text-gray-500 leading-relaxed line-clamp-3 font-medium">
                           {filteredBlogs[0].excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-industrial-blue font-black uppercase tracking-widest text-[11px] group-hover:gap-8 transition-all">
                           Explore Technical Analysis <ArrowRight size={22} />
                        </div>
                     </div>
                  </div>
               </Link>
            )}

            {/* Grid for other posts - More Gap & Space */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
              {currentBlogs.map((blog, idx) => {
                if (!searchTerm && selectedCategory === 'All' && page === 1 && idx === 0) return null;
                
                return (
                  <Link 
                    key={blog.id} 
                    to={`/blog/${blog.slug}`}
                    className="group flex flex-col bg-white rounded-[50px] border border-gray-100 overflow-hidden hover:shadow-3xl hover:shadow-industrial-blue/10 transition-all duration-700 hover:-translate-y-4"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={blog.image_url} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-8 left-8">
                         <span className="px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-industrial-blue shadow-xl border border-white/50">{blog.category}</span>
                      </div>
                    </div>
                    
                    <div className="p-12 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-8 text-[10px] font-black uppercase tracking-widest text-gray-300">
                        <span className="flex items-center gap-2"><Calendar size={14} className="text-industrial-blue/50" /> {format(new Date(blog.created_at), 'MMM d, yyyy')}</span>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-industrial-blue/50" /> {calculateReadingTime(blog.content)}</span>
                      </div>
                      
                      <h3 className="text-3xl font-black mb-6 leading-tight group-hover:text-industrial-blue transition-colors line-clamp-2 text-gray-900 tracking-tight">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-10 line-clamp-2 leading-relaxed text-sm font-medium">
                        {blog.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center text-industrial-blue font-black text-[10px] uppercase tracking-widest gap-3 group-hover:gap-6 transition-all">
                        Read Analysis <ChevronRight size={18} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination - Spacious */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 pt-16 border-t border-gray-100">
                 <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-16 h-16 rounded-[24px] bg-white border border-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-20 hover:bg-gray-50 transition-all shadow-sm"
                 >
                   <ArrowRight size={24} className="rotate-180" />
                 </button>
                 <div className="flex items-center gap-3">
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-16 h-16 rounded-[24px] text-xs font-black transition-all ${page === i + 1 ? 'bg-industrial-blue text-white shadow-2xl shadow-industrial-blue/30 scale-110' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                 </div>
                 <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-16 h-16 rounded-[24px] bg-white border border-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-20 hover:bg-gray-50 transition-all shadow-sm"
                 >
                   <ArrowRight size={24} />
                 </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-60">
            <div className="w-24 h-24 bg-white rounded-[40px] border border-gray-100 flex items-center justify-center mx-auto mb-8 shadow-xl">
               <Globe size={40} className="text-gray-200" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tight">Archive Empty</h3>
            <p className="text-gray-400 max-w-sm mx-auto font-medium">No technical records match your current parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
