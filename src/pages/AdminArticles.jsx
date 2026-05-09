import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Plus, Edit, Trash2, Loader2, Search, 
  Clock, Eye, Share2, Filter, ChevronRight,
  FileText, ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';

const AdminArticles = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await supabase.from('blogs').delete().eq('id', id);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error) { alert(error.message); }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex bg-[#FBFBFC] min-h-screen">
      <AdminSidebar />
      
      <main className="ml-[280px] flex-grow p-16">
        {/* Header - Focused on Management */}
        <div className="flex justify-between items-start mb-20">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Content Library</h1>
            <p className="text-gray-400 font-medium max-w-lg leading-relaxed">
              Manage, edit, and curate your industrial technical insights.
            </p>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4 bg-white p-2 rounded-[24px] shadow-sm border border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search Insight..."
                    className="pl-12 pr-6 py-3 w-64 bg-transparent focus:outline-none text-sm font-bold text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
             </div>
             <Link 
                to="/admin/new" 
                className="flex items-center gap-3 px-10 py-5 bg-industrial-blue text-white rounded-[24px] font-bold uppercase tracking-widest text-[10px] hover:scale-[1.05] transition-all shadow-2xl shadow-industrial-blue/25"
              >
                <Plus size={18} /> New Article
              </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-12 px-2">
           <div className="flex items-center gap-4 bg-white p-1.5 rounded-[20px] border border-gray-50 shadow-sm">
              {['all', 'published', 'draft'].map(status => (
                 <button 
                   key={status}
                   onClick={() => setFilterStatus(status)}
                   className={`px-8 py-2.5 rounded-[16px] text-[10px] font-bold uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-industrial-blue text-white' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   {status}
                 </button>
              ))}
           </div>
           <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{filteredBlogs.length} Results Found</p>
        </div>

        {/* Article Grid */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center">
            <Loader2 className="w-16 h-16 text-industrial-blue animate-spin mb-6" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Syncing Insights...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-[44px] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/20 group hover:shadow-gray-200/40 transition-all">
                 <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={blog.image_url} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute top-8 left-8">
                       <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-gray-900 uppercase tracking-widest shadow-sm">
                         {blog.category}
                       </span>
                    </div>
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-2">
                       <Link to={`/admin/edit/${blog.id}`} className="p-3 bg-white text-gray-400 hover:text-industrial-blue rounded-2xl shadow-xl hover:scale-110 transition-all border border-gray-50"><Edit size={18} /></Link>
                       <button onClick={() => deleteBlog(blog.id)} className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-2xl shadow-xl hover:scale-110 transition-all border border-gray-50"><Trash2 size={18} /></button>
                       <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="p-3 bg-white text-gray-400 hover:text-green-500 rounded-2xl shadow-xl hover:scale-110 transition-all border border-gray-50"><ExternalLink size={18} /></a>
                    </div>
                 </div>

                 <div className="p-10">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                       <Clock size={12} className="text-industrial-blue" />
                       <span>{blog.status === 'published' ? 'Active' : 'Draft'}</span>
                       <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                       <span>{format(new Date(blog.created_at), 'MMM d, yyyy')}</span>
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 leading-tight mb-4 group-hover:text-industrial-blue transition-colors line-clamp-2">
                       {blog.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-3 mb-8">
                       {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-industrial-blue/10 border border-industrial-blue/10 flex items-center justify-center text-industrial-blue font-black text-[10px]">IF</div>
                          <div>
                             <p className="text-[11px] font-black text-gray-900 leading-none mb-1">IFH Author</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{blog.category}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                             <Eye size={14} /> {blog.view_count || 0}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 ml-4">
                             <Share2 size={14} />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminArticles;
