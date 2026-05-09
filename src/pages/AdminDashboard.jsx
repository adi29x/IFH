import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Plus, Loader2, Filter, ChevronRight,
  ArrowUpRight, TrendingUp, Users, Activity,
  ShieldCheck, Zap, Globe, MessageSquare,
  BarChart3, Target, MousePointer2, Clock,
  Eye, FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.from('blogs').select('*');
      setBlogs(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const topBlog = [...blogs].sort((a, b) => (b.view_count || 0) - (a.view_count || 0))[0];
  const totalViews = blogs.reduce((acc, curr) => acc + (curr.view_count || 0), 0);

  const quickStats = [
    { label: 'Total Views', value: totalViews.toLocaleString(), change: 'Real Data', icon: Eye, color: 'text-blue-500 bg-blue-50' },
    { label: 'Articles', value: blogs.length.toString(), change: 'Published', icon: FileText, color: 'text-purple-500 bg-purple-50' },
    { label: 'Technical Leads', value: '0', change: 'New', icon: Target, color: 'text-orange-500 bg-orange-50' },
    { label: 'Live Insights', value: blogs.filter(b => b.status === 'published').length.toString(), change: 'Live', icon: Globe, color: 'text-green-500 bg-green-50' },
  ];

  return (
    <div className="flex bg-[#FBFBFC] min-h-screen">
      <AdminSidebar />
      
      <main className="ml-[280px] flex-grow p-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Command Center</h1>
            <p className="text-gray-400 font-medium max-w-lg leading-relaxed">
              Real-time analytics and performance metrics for Intensiv-Filter Himenviro.
            </p>
          </div>
          <div className="flex items-center gap-6">
             <Link 
                to="/admin/new" 
                className="flex items-center gap-3 px-10 py-5 bg-industrial-blue text-white rounded-[24px] font-bold uppercase tracking-widest text-[10px] hover:scale-[1.05] transition-all shadow-2xl shadow-industrial-blue/25"
              >
                <Plus size={18} /> New Campaign
              </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-4 gap-8 mb-12">
           {quickStats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/20">
                 <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                       <stat.icon size={22} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                       {stat.change}
                    </span>
                 </div>
                 <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
           ))}
        </div>

        {/* Performance & Spotlight Section */}
        <div className="grid grid-cols-12 gap-12 mb-12">
           <div className="col-span-8 bg-white p-12 rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/30">
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Traffic Intelligence</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Global engagement patterns • Live Data Only</p>
                 </div>
              </div>
              
              <div className="h-[300px] flex items-end gap-4 px-4">
                 {/* Empty graph state until more data is collected */}
                 <div className="w-full h-full flex flex-col items-center justify-center text-gray-200 border-2 border-dashed border-gray-50 rounded-[32px]">
                    <BarChart3 size={48} className="mb-4" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Waiting for traffic data...</p>
                 </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                 <span>Timeline Initialized</span>
              </div>
           </div>

           <div className="col-span-4 bg-industrial-blue p-12 rounded-[48px] text-white shadow-2xl shadow-industrial-blue/30 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md"><TrendingUp size={20} /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Top Performance</p>
                 </div>
                 <h4 className="text-3xl font-black leading-tight mb-8 tracking-tight line-clamp-2">
                    {topBlog?.title || 'System Analysis'}
                 </h4>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Total Views</span>
                       <span className="text-xl font-black">{topBlog?.view_count || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Growth</span>
                       <span className="text-xl font-black">Stable</span>
                    </div>
                 </div>
              </div>
              <Link to="/admin/articles" className="w-full py-5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-[24px] text-center text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-sm relative z-10">
                 Manage All Content
              </Link>
           </div>
        </div>

        {/* Action Widgets - Zeroed out fake stats */}
        <div className="grid grid-cols-3 gap-8">
           <div className="bg-white p-10 rounded-[44px] border border-gray-100 shadow-xl shadow-gray-200/20 flex items-center gap-8 group hover:shadow-2xl transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-[24px] bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Globe size={24} /></div>
              <div>
                 <p className="text-xl font-black text-gray-900 leading-tight">SEO Health</p>
                 <p className="text-xs font-bold text-gray-400">Scan Required</p>
              </div>
           </div>
           <div className="bg-white p-10 rounded-[44px] border border-gray-100 shadow-xl shadow-gray-200/20 flex items-center gap-8 group hover:shadow-2xl transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-[24px] bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform"><MessageSquare size={24} /></div>
              <div>
                 <p className="text-xl font-black text-gray-900 leading-tight">Leads</p>
                 <p className="text-xs font-bold text-gray-400">0 New Queries</p>
              </div>
           </div>
           <div className="bg-white p-10 rounded-[44px] border border-gray-100 shadow-xl shadow-gray-200/20 flex items-center gap-8 group hover:shadow-2xl transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-[24px] bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform"><MousePointer2 size={24} /></div>
              <div>
                 <p className="text-xl font-black text-gray-900 leading-tight">CTR</p>
                 <p className="text-xs font-bold text-gray-400">0.0% Average</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
