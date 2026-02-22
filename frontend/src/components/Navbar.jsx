import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Map, AlertCircle, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-pink-200 px-8 py-4 flex justify-between items-center text-slate-800 shadow-sm">
      
      {/* Logo - Now clearly visible with a strong pink-to-purple gradient */}
      <Link to="/" className="flex items-center gap-2 group">
        <Shield className="text-pink-600 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-700">HERA</span>
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-8 items-center font-bold text-sm tracking-wider">
        <Link to="/about" className="hover:text-pink-600 transition-colors">
           About
        </Link>
        <Link to="/heatmap" className="hover:text-pink-600 transition-colors">
           Heatmap
        </Link>
        <Link to="/emergency" className="hover:text-red-600 transition-colors">
           Emergency
        </Link>
        
        {/* Login Button - Strong gradient with bright white text */}
        <Link to="/login" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
          <User size={18} /> Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;