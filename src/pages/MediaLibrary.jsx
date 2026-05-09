import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Upload, Trash2, Copy, Search, Loader2, 
  Image as ImageIcon, Grid, List, Filter, 
  CheckCircle2, Plus, ArrowUpRight, X, Info
} from 'lucide-react';

const MediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFolder, setActiveFolder] = useState('featured-images');

  useEffect(() => {
    fetchMedia();
  }, [activeFolder]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      // Attempt to list files in the active folder
      const { data, error } = await supabase.storage.from('media').list(activeFolder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (error) throw error;

      const mediaWithUrls = (data || [])
        .filter(file => file.name !== '.emptyFolderPlaceholder') // Filter out hidden system files
        .map(file => ({
          ...file,
          url: supabase.storage.from('media').getPublicUrl(`${activeFolder}/${file.name}`).data.publicUrl
        }));

      setMedia(mediaWithUrls);
    } catch (error) { 
      console.error('Fetch error:', error.message);
      setMedia([]); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${activeFolder}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;

      fetchMedia(); // Refresh list
      alert('Asset uploaded successfully to ' + activeFolder);
    } catch (error) { 
      alert('Upload failed: ' + error.message); 
    } finally { 
      setUploading(false); 
    }
  };

  const deleteMedia = async (name) => {
    if (!window.confirm('Are you sure you want to delete this asset? This cannot be undone.')) return;
    try {
      const { error } = await supabase.storage.from('media').remove([`${activeFolder}/${name}`]);
      if (error) throw error;
      setMedia(media.filter(m => m.name !== name));
    } catch (error) { 
      alert('Delete failed: ' + error.message); 
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('Public URL copied to clipboard!');
  };

  const folders = [
    { id: 'featured-images', label: 'Featured Images' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'uploads', label: 'General Uploads' }
  ];

  const filteredMedia = media.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex bg-[#FBFBFC] min-h-screen">
      <AdminSidebar />
      
      <main className="ml-[280px] flex-grow p-16">
        <div className="flex justify-between items-start mb-20">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Media Library</h1>
            <p className="text-gray-400 font-medium max-w-lg leading-relaxed">
              Your centralized hub for high-fidelity industrial assets. Choose a folder below to manage your visuals.
            </p>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-4 bg-white p-2 rounded-[24px] shadow-sm border border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search Assets..."
                    className="pl-12 pr-6 py-3 w-64 bg-transparent focus:outline-none text-sm font-bold text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
             </div>
             <label className="flex items-center gap-3 px-10 py-5 bg-industrial-blue text-white rounded-[24px] font-bold uppercase tracking-widest text-[10px] hover:scale-[1.05] transition-all shadow-2xl shadow-industrial-blue/25 cursor-pointer">
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                Upload to {activeFolder.split('-')[0]}
                <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
             </label>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-16 px-2 overflow-x-auto pb-4 no-scrollbar">
           {folders.map((folder) => (
              <button 
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={`px-8 py-3.5 rounded-[20px] text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeFolder === folder.id ? 'bg-white text-gray-900 shadow-xl shadow-gray-200/40 border border-gray-100' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {folder.label}
              </button>
           ))}
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center">
            <Loader2 className="w-16 h-16 text-industrial-blue animate-spin mb-6" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Accessing Vault...</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-10">
            {filteredMedia.length > 0 ? filteredMedia.map((file) => (
              <div key={file.name} className="group relative">
                 <div className="bg-white p-4 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/20 group-hover:shadow-gray-200/50 transition-all cursor-pointer">
                    <div className="relative aspect-square rounded-[30px] overflow-hidden bg-gray-50 mb-6">
                       <img src={file.url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                          <button onClick={() => copyUrl(file.url)} className="p-3 bg-white text-gray-900 rounded-2xl shadow-xl hover:scale-110 transition-all" title="Copy Link"><Copy size={18} /></button>
                          <button onClick={() => deleteMedia(file.name)} className="p-3 bg-white text-red-500 rounded-2xl shadow-xl hover:scale-110 transition-all" title="Delete"><Trash2 size={18} /></button>
                       </div>
                    </div>
                    <div className="px-2 pb-2">
                       <p className="text-[11px] font-black text-gray-900 truncate mb-1">{file.name}</p>
                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Metadata Loaded</p>
                    </div>
                 </div>
              </div>
            )) : (
              <div className="col-span-full py-40 text-center">
                 <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-200 mx-auto mb-6">
                    <ImageIcon size={32} />
                 </div>
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">This folder is currently empty.</p>
              </div>
            )}
            
            <label className="flex flex-col items-center justify-center aspect-[4/5] rounded-[40px] border-2 border-dashed border-gray-100 hover:border-industrial-blue/50 hover:bg-gray-50 transition-all cursor-pointer group">
               <div className="w-16 h-16 rounded-[24px] bg-gray-50 group-hover:bg-industrial-blue/10 flex items-center justify-center text-gray-300 group-hover:text-industrial-blue transition-all mb-4">
                  <Plus size={32} />
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-industrial-blue">Add to {activeFolder.split('-')[0]}</p>
               <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        )}
      </main>
    </div>
  );
};

export default MediaLibrary;
