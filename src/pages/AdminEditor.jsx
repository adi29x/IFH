import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import RichTextEditor from '../components/Editor/RichTextEditor';
import AdminSidebar from '../components/AdminSidebar';
import slugify from 'slugify';
import { 
  ArrowLeft, Save, Loader2, Image as ImageIcon, 
  Settings, Globe, Zap, Clock, 
  Tag, Layers, Eye, ShieldCheck, Sparkles,
  ChevronRight, Layout, Type, FileText, Calendar, Languages,
  Share2, BarChart3, Search, Info, ChevronDown, CheckCircle2,
  Trash2, Plus
} from 'lucide-react';
import { format } from 'date-fns';

const AdminEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [activeTab, setActiveTab] = useState('editor');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    gallery: [],
    author: 'IFH Expert',
    status: 'published',
    category: 'Industrial',
    language: 'en',
    scheduled_for: '',
    tags: '',
    seo_title: '',
    seo_description: '',
  });

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    try {
      setSaving(true);
      const newUrls = [];
      for (const file of files) {
        const filePath = `gallery/${Math.random()}.${file.name.split('.').pop()}`;
        await supabase.storage.from('media').upload(filePath, file);
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
        newUrls.push(publicUrl);
      }
      setFormData({ ...formData, gallery: [...(formData.gallery || []), ...newUrls] });
    } catch (error) { alert(error.message); } finally { setSaving(false); }
  };

  useEffect(() => {
    if (isEditing) fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
      if (error) throw error;
      setFormData(data);
    } catch (error) { navigate('/admin'); } finally { setLoading(false); }
  };

  const calculateSeoScore = () => {
    let score = 0;
    if (formData.title.length > 30 && formData.title.length < 70) score += 25;
    if (formData.seo_description.length > 100) score += 25;
    if (formData.content.length > 500) score += 25;
    if (formData.image_url) score += 25;
    return score;
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = slugify(title, { lower: true, strict: true });
    setFormData({ ...formData, title, slug: isEditing ? formData.slug : slug, seo_title: isEditing ? formData.seo_title : title });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setSaving(true);
      const filePath = `featured-images/${Math.random()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('media').upload(filePath, file);
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      setFormData({ ...formData, image_url: publicUrl });
    } catch (error) { alert(error.message); } finally { setSaving(false); }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      
      // Clean up the payload to avoid database syntax errors
      const payload = { 
        ...formData, 
        seo_score: calculateSeoScore(), 
        updated_at: new Date().toISOString(),
        scheduled_for: formData.scheduled_for || null, // Convert empty string to null
      };

      const { error } = isEditing 
        ? await supabase.from('blogs').update(payload).eq('id', id)
        : await supabase.from('blogs').insert([payload]);

      if (error) throw error;
      
      navigate('/admin/articles');
    } catch (error) { 
      if (error.message.includes('row-level security')) {
        alert('PERMISSION ERROR: Your Supabase "blogs" table still has RLS enabled. Please disable it in your Supabase Table Editor so you can save articles.');
      } else {
        alert('SAVE FAILED: ' + error.message); 
      }
    } finally { setSaving(false); }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="w-12 h-12 text-industrial-blue animate-spin" /></div>;
  }

  return (
    <div className="flex bg-[#FBFBFC] min-h-screen">
      <AdminSidebar />
      
      <main className="ml-[280px] flex-grow flex flex-col">
        {/* Header - Reverting to Tabbed Logic but Premium Style */}
        <header className="sticky top-0 z-[60] bg-white border-b border-gray-100 h-24 flex items-center px-12 justify-between">
          <div className="flex items-center gap-8">
            <Link to="/admin" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all border border-gray-100 group">
              <ArrowLeft size={20} className="text-gray-400 group-hover:text-gray-900" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none mb-2">
                {isEditing ? 'Editing Insight' : 'Creative Studio'}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formData.status}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-[24px] border border-gray-100">
             {[
               { id: 'editor', icon: Type, label: 'Editor' },
               { id: 'seo', icon: Globe, label: 'SEO' },
               { id: 'settings', icon: Settings, label: 'Config' }
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex items-center gap-2 px-8 py-3 rounded-[18px] text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-lg border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 <tab.icon size={14} /> <span>{tab.label}</span>
               </button>
             ))}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-3 px-10 py-4 bg-industrial-blue text-white rounded-[20px] font-bold uppercase tracking-widest text-[10px] hover:scale-[1.05] transition-all shadow-xl shadow-industrial-blue/20 disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {isEditing ? 'UPDATE' : 'LAUNCH POST'}
          </button>
        </header>

        <div className="p-12 max-w-7xl mx-auto w-full">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-8 space-y-8">
                 {activeTab === 'editor' && (
                    <div className="bg-white rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden p-12 lg:p-20">
                       <textarea 
                          rows="1"
                          value={formData.title}
                          onChange={handleTitleChange}
                          placeholder="Untitled Insight..."
                          className="w-full text-4xl lg:text-6xl font-black bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-100 mb-12 tracking-tighter resize-none"
                       />
                       <div className="cms-editor-refined">
                          <RichTextEditor 
                             value={formData.content}
                             onChange={(content) => setFormData({...formData, content})}
                          />
                       </div>

                       {/* Multiple Image Gallery */}
                       <div className="mt-20 pt-20 border-t border-gray-50">
                          <div className="flex items-center justify-between mb-8">
                             <div>
                                <h4 className="text-xl font-bold text-gray-900">Technical Gallery</h4>
                                <p className="text-xs text-gray-400 font-medium">Add multiple detailed visuals for this technical insight.</p>
                             </div>
                             <label className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-all border border-gray-100">
                                <Plus size={14} /> Add Images
                                <input type="file" multiple className="hidden" onChange={handleGalleryUpload} />
                             </label>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-6">
                             {formData.gallery && formData.gallery.map((url, i) => (
                                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100">
                                   <img src={url} alt="" className="w-full h-full object-cover" />
                                   <button 
                                      onClick={() => {
                                        const newGallery = [...formData.gallery];
                                        newGallery.splice(i, 1);
                                        setFormData({...formData, gallery: newGallery});
                                      }}
                                      className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                                   >
                                      <Trash2 size={20} />
                                   </button>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 )}

                 {activeTab === 'seo' && (
                    <div className="bg-white rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/40 p-12 lg:p-20 space-y-12">
                       <h2 className="text-3xl font-black text-gray-900 tracking-tight">SEO Architecture</h2>
                       <div className="space-y-8">
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">SEO Meta Title</label>
                             <input 
                                type="text"
                                value={formData.seo_title}
                                onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none focus:border-industrial-blue transition-all font-bold"
                                placeholder="Optimize for search engines..."
                             />
                          </div>
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Meta Description</label>
                             <textarea 
                                rows="4"
                                value={formData.seo_description}
                                onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
                                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none focus:border-industrial-blue transition-all font-medium leading-relaxed"
                                placeholder="Summary for Google results..."
                             />
                          </div>
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Custom Slug</label>
                             <input 
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none focus:border-industrial-blue transition-all font-mono text-xs"
                                placeholder="url-path-here"
                             />
                          </div>
                       </div>
                    </div>
                 )}

                 {activeTab === 'settings' && (
                    <div className="bg-white rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/40 p-12 lg:p-20 space-y-12">
                       <h2 className="text-3xl font-black text-gray-900 tracking-tight">Configuration</h2>
                       <div className="grid grid-cols-2 gap-12">
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Status</label>
                             <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none font-bold"
                             >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                             </select>
                          </div>
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Category</label>
                             <select 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none font-bold"
                             >
                                <option value="Industrial">Industrial</option>
                                <option value="Technology">Technology</option>
                                <option value="Sustainability">Sustainability</option>
                                <option value="Case Study">Case Study</option>
                             </select>
                          </div>
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Language</label>
                             <select 
                                value={formData.language}
                                onChange={(e) => setFormData({...formData, language: e.target.value})}
                                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none font-bold"
                             >
                                <option value="en">English</option>
                                <option value="de">German</option>
                                <option value="hi">Hindi</option>
                             </select>
                          </div>
                          <div>
                             <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">Scheduled For</label>
                             <input 
                                type="datetime-local"
                                value={formData.scheduled_for}
                                onChange={(e) => setFormData({...formData, scheduled_for: e.target.value})}
                                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:outline-none font-bold"
                             />
                          </div>
                       </div>
                    </div>
                 )}
              </div>

              <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white p-8 rounded-[44px] border border-gray-100 shadow-2xl shadow-gray-200/40">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">Featured Image</h3>
                    <div className={`relative aspect-video rounded-[32px] bg-gray-50 border-2 border-dashed border-gray-100 overflow-hidden group transition-all ${formData.image_url ? 'border-none shadow-xl' : 'hover:border-industrial-blue/50'}`}>
                       {formData.image_url ? (
                          <img 
                            src={formData.image_url} 
                            alt="Featured" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/800x450?text=Check+Bucket+Permissions';
                              console.error('Image failed to load. Ensure your Supabase bucket "media" is set to PUBLIC.');
                            }}
                          />
                       ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                             <ImageIcon size={32} className="mb-3" />
                             <p className="text-[10px] font-bold uppercase tracking-widest">Select Header</p>
                          </div>
                       )}
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                    </div>
                 </div>

                 <div className="bg-white p-10 rounded-[44px] border border-gray-100 shadow-2xl shadow-gray-200/40">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">SEO Health</h3>
                       <span className="text-xl font-black text-industrial-blue">{calculateSeoScore()}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden mb-8">
                       <div className="h-full bg-industrial-blue transition-all duration-1000" style={{ width: `${calculateSeoScore()}%` }}></div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-xs font-bold text-gray-900">
                          <div className={`w-2 h-2 rounded-full ${formData.title.length > 30 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          Optimal Title Length
                       </div>
                       <div className="flex items-center gap-3 text-xs font-bold text-gray-900">
                          <div className={`w-2 h-2 rounded-full ${formData.image_url ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          Featured Image Present
                       </div>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEditor;
