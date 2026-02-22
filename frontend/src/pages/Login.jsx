import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, Chrome, Github } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate(); // This handles moving to the next page
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 💡 HACKATHON TIP: 
    // Instead of real backend auth, we just "pretend" it worked 
    // and navigate to the home page immediately.
    console.log("Logging in...", email);
    navigate('/'); 
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden px-6">
      {/* ... Rest of the JSX code I provided in the previous message ... */}
      {/* Make sure your form tag uses: onSubmit={handleLogin} */}
      
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-pink-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 text-white mb-6 shadow-2xl shadow-pink-200 rotate-3">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">HERA Login</h1>
          <p className="text-slate-500 font-semibold italic">Empowering Women's Safety</p>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-white">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-pink-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-pink-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4.5 rounded-2xl font-bold shadow-2xl shadow-slate-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 mt-4"
            >
              Secure Sign In <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-4 bg-white/0 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Safety Verified Login</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm shadow-sm active:scale-95">
              <Chrome size={18} className="text-red-500" /> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm shadow-sm active:scale-95">
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}