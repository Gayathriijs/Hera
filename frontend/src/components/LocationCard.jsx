import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function LocationCard({ location }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }} 
      className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={location.image} 
          alt={location.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      
      {/* Dark gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-hera-deep via-hera-deep/50 to-transparent p-6 flex flex-col justify-end">
        
        {/* Safety Score Badge */}
        <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg border border-white/20">
          <ShieldCheck size={16} />
          {location.safetyScore}/10 Safe
        </div>

        <h3 className="text-2xl font-bold text-hera-lavender mb-2">{location.name}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{location.description}</p>
        
        <Link 
          to={`/location/${location.slug}`} 
          className="w-full py-3 bg-gradient-to-r from-hera-pink/80 to-hera-purple/80 hover:from-hera-pink hover:to-hera-purple text-white text-center rounded-xl font-semibold transition-all border border-hera-pink/50 shadow-[0_0_15px_rgba(224,60,138,0.3)]"
        >
          View Safety Details
        </Link>
      </div>
    </motion.div>
  );
}