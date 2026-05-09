import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/admin');
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-industrial-blue text-white rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-industrial-blue/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">CMS Gatekeeper</h1>
          <p className="text-gray-400 font-medium">Authorized Access Only</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-industrial-blue"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-industrial-blue transition-all font-medium"
                  placeholder="admin@intensiv-filter.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="password" 
                  required
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-industrial-blue transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-industrial-blue text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-industrial-blue/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>Enter Dashboard <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-300">
           <ShieldCheck size={16} />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Encryption Active</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
