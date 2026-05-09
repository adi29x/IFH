import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, PlusCircle, 
  LogOut, Image as ImageIcon, Globe, Shield,
  ChevronRight, Sparkles, LayoutGrid
} from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const mainNav = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FileText, label: 'Articles', path: '/admin/articles' },
    { icon: ImageIcon, label: 'Media Library', path: '/admin/media' },
  ];

  const toolsNav = [
    { icon: PlusCircle, label: 'Create New', path: '/admin/new' },
    { icon: Globe, label: 'View Live', path: '/' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-gray-100 flex flex-col z-[100] transition-all duration-500">
      {/* Brand Section - Inspired by Mentalthy */}
      <div className="p-12 pb-16">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-industrial-blue flex items-center justify-center shadow-2xl shadow-industrial-blue/30 text-white">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tighter leading-none mb-1">IFH <span className="text-industrial-blue">PRO</span></h2>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Enterprise Core</p>
          </div>
        </div>
      </div>

      {/* Navigation Groups - Clean & Airy */}
      <div className="flex-grow px-8 space-y-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 ml-4 mb-6">General</p>
          <nav className="space-y-2">
            {mainNav.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-4 px-6 py-4 rounded-[22px] transition-all duration-300 group ${
                  location.pathname === item.path 
                    ? 'bg-blue-50 text-industrial-blue shadow-sm' 
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} className={location.pathname === item.path ? 'text-industrial-blue' : 'text-gray-300 group-hover:text-gray-900'} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {location.pathname === item.path && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 ml-4 mb-6">Tools</p>
          <nav className="space-y-2">
            {toolsNav.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="flex items-center gap-4 px-6 py-4 rounded-[22px] text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 group"
              >
                <item.icon size={20} className="text-gray-300 group-hover:text-gray-900" />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Profile/Logout Section */}
      <div className="p-8 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-4 mb-8 px-4">
           <div className="w-10 h-10 rounded-full bg-industrial-blue/10 flex items-center justify-center border border-industrial-blue/20">
              <Sparkles size={18} className="text-industrial-blue" />
           </div>
           <div>
              <p className="text-xs font-bold text-gray-900">Admin Expert</p>
              <p className="text-[10px] text-gray-400">Master Level</p>
           </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[20px] text-red-400 hover:text-red-500 hover:bg-red-50 transition-all group font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
