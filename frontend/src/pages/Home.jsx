import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LocationCard from '../components/LocationCard';
import { mockLocations } from '../data/mockLocations';
import { MapPin, ArrowDown, ShieldAlert, Map, Home as HomeIcon, Activity, Search, Navigation, Sparkles } from 'lucide-react';

export default function Home() {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const scrollToSearch = () => {
    document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      const slug = destination.toLowerCase().trim().replace(/\s+/g, '-');
      navigate(`/location/${slug}`);
    }
  };

  const features = [
    { 
      icon: <Map className="text-pink-500" size={32} />, 
      title: "Travel", 
      desc: "Safe transit options and real-time navigation avoiding low-lit or poorly rated streets." 
    },
    { 
      icon: <HomeIcon className="text-purple-600" size={32} />, 
      title: "Verified Stays", 
      desc: "Women-only and highly rated accommodations, vetted by the community." 
    },
    { 
      icon: <Activity className="text-pink-500" size={32} />, 
      title: "Dynamic Heatmap", 
      desc: "Live safety scores based on community reviews and police data." 
    },
    { 
      icon: <ShieldAlert className="text-red-500" size={32} />, 
      title: "Emergency Services", 
      desc: "Instant location sharing with Pink Police and quick access to emergency contacts." 
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      
      {/* --- NEW: HIGH-END BACKGROUND AURAS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-pink-200/40 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-200/30 rounded-full blur-[130px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 text-pink-600 mb-8 shadow-xl shadow-pink-100/20">
            <Sparkles size={16} className="text-pink-500" />
            <span className="text-sm font-bold tracking-widest uppercase">Kochi Edition</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight text-slate-900">
            Explore Kochi <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              Fearlessly.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium">
            Smart travel safety for women during festivals & beyond.
          </p>

          <button 
            onClick={scrollToSearch}
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
          >
            Plan Safe Trip
            <ArrowDown className="group-hover:translate-y-1 transition-transform" size={20} />
          </button>
        </motion.div>
      </section>

      {/* Features Grid - UPGRADED TO GLASS MORPHISM */}
      <section className="px-6 md:px-12 py-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-3">{feat.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- NEW: THE POWER SEARCH BAR --- */}
      <section id="search-section" className="px-6 py-24 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative group"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <form onSubmit={handleSearch} className="relative bg-white p-3 md:p-4 rounded-[2.5rem] shadow-2xl border border-white flex flex-col md:flex-row gap-4 items-center">
            
            {/* Destination Input */}
            <div className="flex-1 w-full flex items-center bg-slate-50 rounded-2xl px-5 py-3 md:py-4 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-pink-100">
              <Navigation className="text-pink-500 mr-3" size={22} />
              <input 
                type="text" 
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where do you want to go in Kochi?" 
                className="bg-transparent w-full outline-none text-slate-800 placeholder-slate-400 font-bold text-lg"
              />
            </div>

            {/* Updated Search Button */}
            <button type="submit" className="w-full md:w-auto px-10 py-4 bg-slate-900 hover:bg-pink-600 text-white font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-1 active:scale-95">
              <Search size={22} />
              Analyze Safely
            </button>
          </form>
        </motion.div>
      </section>

      {/* Locations Section */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Curated Safe Zones</h2>
          <p className="text-pink-600 font-bold text-lg tracking-wide uppercase text-sm">Community-verified locations in Kochi</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockLocations.map((location, index) => (
            <motion.div 
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <LocationCard location={location} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}