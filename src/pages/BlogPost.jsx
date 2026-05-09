import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../utils/supabaseClient';
import { 
  Calendar, User, ArrowLeft, Loader2, Share2, 
  Bookmark, Clock, ChevronRight, MessageSquare, 
  ThumbsUp, Twitter, Linkedin, Facebook, Link as LinkIcon,
  Download, ShieldCheck, Mail, Plus, Layers
} from 'lucide-react';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchBlog();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  useEffect(() => {
    if (blog?.id) {
      incrementViews();
      fetchRelatedPosts();
    }
  }, [blog?.id]);

  const incrementViews = async () => {
    try {
      await supabase.rpc('increment_view_count', { blog_id: blog.id });
    } catch (err) {
      await supabase.from('blogs').update({ view_count: (blog.view_count || 0) + 1 }).eq('id', blog.id);
    }
  };

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('id, title, slug, image_url, category')
      .eq('category', blog.category)
      .neq('id', blog.id)
      .limit(3);
    if (data) setRelatedPosts(data);
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const title = blog.title;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const calculateReadingTime = (html) => {
    if (!html) return '5 min';
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-industrial-blue animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-tighter">Insight Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">The technical documentation you're looking for might have been archived or moved.</p>
        <Link to="/blog" className="px-10 py-4 bg-industrial-blue text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all">Back to Library</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBFC] min-h-screen">
      <Helmet>
        <title>{blog.seo_title || blog.title} | IFH Intelligence</title>
        <meta name="description" content={blog.seo_description || blog.excerpt} />
      </Helmet>

      {/* Modern Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 z-[70]">
        <div className="h-full bg-industrial-blue transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="pt-40 pb-32">
        <div className="container mx-auto px-6 lg:px-20">
          
          {/* Breadcrumb / Category */}
          <div className="flex items-center gap-4 mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 max-w-6xl mx-auto">
             <Link to="/blog" className="text-industrial-blue hover:text-industrial-blue/70 flex items-center gap-2">
                <ArrowLeft size={14} /> Back to Hub
             </Link>
             <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
             <span className="text-gray-900">{blog.category}</span>
             <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
             <span className="flex items-center gap-2"><Clock size={14} /> {calculateReadingTime(blog.content)}</span>
          </div>

          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-16 text-gray-900">
              {blog.title}
            </h1>

            {/* Premium Author Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-12 border-y border-gray-100 mb-20 gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[24px] bg-industrial-blue text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-industrial-blue/20">IF</div>
                  <div>
                    <p className="text-lg font-black text-gray-900 leading-tight">{blog.author || 'IFH Expert'}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Lead Technical Strategist</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button onClick={() => sharePost('linkedin')} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-industrial-blue hover:border-industrial-blue/30 transition-all"><Linkedin size={18} /></button>
                  <button onClick={() => sharePost('twitter')} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-industrial-blue hover:border-industrial-blue/30 transition-all"><Twitter size={18} /></button>
                  <button onClick={() => sharePost('copy')} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-industrial-blue hover:border-industrial-blue/30 transition-all"><LinkIcon size={18} /></button>
               </div>
            </div>

            {/* Featured Visual */}
            <div className="relative mb-24 rounded-[60px] overflow-hidden shadow-3xl shadow-gray-200/50">
               <img src={blog.image_url} alt={blog.title} className="w-full h-auto object-cover max-h-[800px]" />
            </div>

            {/* Main Article Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 relative">
               
               {/* Content - 8 Columns for breathing room */}
               <div className="lg:col-span-8">
                  <div className="prose prose-2xl prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-industrial-blue prose-img:rounded-[40px] blog-content-view max-w-none">
                     {blog.content ? (
                       <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                     ) : (
                       <p className="text-gray-300 italic">Technical documentation in progress...</p>
                     )}
                  </div>

                  {/* Dynamic Technical Gallery */}
                  {blog.gallery && blog.gallery.length > 0 && (
                    <div className="mt-32 space-y-12">
                       <div className="flex items-center gap-4">
                          <div className="w-2 h-12 bg-industrial-blue rounded-full"></div>
                          <h3 className="text-4xl font-black tracking-tight">Technical Exhibits</h3>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {blog.gallery.map((url, i) => (
                             <div key={i} className="group relative aspect-[4/3] rounded-[44px] overflow-hidden bg-gray-100 shadow-xl border border-white">
                                <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                   <button className="p-5 bg-white rounded-full text-industrial-blue scale-90 group-hover:scale-100 transition-transform shadow-2xl"><Plus size={24} /></button>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* Post Interaction */}
                  <div className="mt-32 p-12 bg-white rounded-[50px] border border-gray-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex items-center gap-10">
                        <button className="flex flex-col items-center gap-2 group">
                           <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-red-500 group-hover:bg-red-50 group-hover:shadow-lg transition-all"><ThumbsUp size={24} /></div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Validate</span>
                        </button>
                        <button onClick={() => sharePost('copy')} className="flex flex-col items-center gap-2 group">
                           <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-industrial-blue group-hover:bg-blue-50 group-hover:shadow-lg transition-all"><LinkIcon size={24} /></div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reference</span>
                        </button>
                     </div>
                     <button className="px-10 py-5 bg-industrial-blue text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-industrial-blue/30 hover:scale-[1.05] transition-all">
                        Request Expert Consultation
                     </button>
                  </div>
               </div>

               {/* Sidebar - 4 Columns */}
               <aside className="lg:col-span-4">
                  <div className="sticky top-32 space-y-12">
                     
                     {/* On This Page Widget */}
                     <div className="bg-white p-10 rounded-[44px] border border-gray-100 shadow-xl shadow-gray-200/20">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 mb-8 flex items-center gap-3">
                           <Layers size={16} className="text-industrial-blue" /> Section Index
                        </h4>
                        <p className="text-xs text-gray-400 font-medium italic leading-relaxed">
                           Automatic indexing generated from technical headings.
                        </p>
                     </div>

                     {/* Premium Newsletter Card */}
                     <div className="bg-gray-900 p-12 rounded-[50px] text-white shadow-3xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-industrial-blue/20 rounded-full blur-3xl group-hover:bg-industrial-blue/30 transition-colors"></div>
                        <h4 className="text-3xl font-black mb-4 relative z-10 leading-none tracking-tight">The Core <span className="text-industrial-blue">Report.</span></h4>
                        <p className="text-xs text-gray-400 mb-10 relative z-10 leading-relaxed font-bold uppercase tracking-widest">Global Engineering Insights Weekly</p>
                        <div className="space-y-4 relative z-10">
                           <input type="email" placeholder="Work Email" className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-[24px] text-sm focus:outline-none focus:border-industrial-blue focus:bg-white/10 transition-all font-medium" />
                           <button className="w-full py-5 bg-industrial-blue text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-industrial-blue/20 hover:bg-industrial-blue/90 transition-all">Join 5K+ Leaders</button>
                        </div>
                     </div>

                     {/* Tech Specs Download */}
                     <div className="bg-industrial-blue p-10 rounded-[44px] text-white shadow-3xl flex items-center gap-6 group cursor-pointer hover:scale-[1.02] transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform"><Download size={24} /></div>
                        <div>
                           <p className="text-sm font-black tracking-tight">Technical Data Sheet</p>
                           <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mt-1">PDF Download • 4.2 MB</p>
                        </div>
                     </div>
                  </div>
               </aside>

            </div>

            {/* Expanded Recommendations */}
            {relatedPosts.length > 0 && (
               <div className="mt-40 pt-32 border-t border-gray-100">
                  <h3 className="text-5xl font-black mb-16 tracking-tighter">Engineered for <span className="text-industrial-blue">You.</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                     {relatedPosts.map(post => (
                       <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                          <div className="aspect-[16/10] rounded-[44px] overflow-hidden bg-gray-100 mb-8 shadow-xl border border-white">
                             <img src={post.image_url} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-blue mb-4">{post.category}</p>
                          <h4 className="text-2xl font-black mb-4 leading-tight group-hover:text-industrial-blue transition-colors">{post.title}</h4>
                          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">Examine Article <ChevronRight size={14} /></div>
                       </Link>
                     ))}
                  </div>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
