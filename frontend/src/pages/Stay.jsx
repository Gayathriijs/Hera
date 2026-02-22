import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Star, ArrowLeft, Heart } from 'lucide-react';

// 1. IMPORT YOUR LOCAL IMAGES HERE
// (Change .jpg to .png or .jpeg if your downloaded files are different!)
import hostel1 from '../assets/hostel-1.jpg';
import hostel2 from '../assets/hostel-2.jpg';
import hotel1 from '../assets/hotel-1.jpg';
import hotel2 from '../assets/hotel-2.jpg';
import pg1 from '../assets/pg-1.jpg';
import pg2 from '../assets/pg-2.jpg';

export default function Stay() {
  const { name } = useParams();
  const [activeFilter, setActiveFilter] = useState('All');

  const locationName = name ? name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "the area";

  // 2. UPDATE THE ARRAY TO USE YOUR IMPORTED IMAGES
  const staysData = [
    { id: 1, type: "Hostel", name: "The Lavender Women's Hostel", location: `Princess Street, ${locationName}`, rating: 4.9, price: "₹800/night", img: hostel1, features: ["Women Only", "24/7 Security", "CCTV"] },
    { id: 2, type: "Hotel", name: "SafeHaven Boutique", location: `Heritage Zone, ${locationName}`, rating: 4.8, price: "₹3,500/night", img: hotel1, features: ["Female Staff", "Safe Lockers", "Well-lit Area"] },
    { id: 3, type: "PG", name: "Pink Blossom PG", location: `North End, ${locationName}`, rating: 4.7, price: "₹6,000/month", img: pg1, features: ["Women Only", "Biometric Entry", "Meals Included"] },
    { id: 4, type: "Hostel", name: "Glow Backpackers", location: `Main Square, ${locationName}`, rating: 4.6, price: "₹750/night", img: hostel2, features: ["Female Dorms", "Pink Patrol Route", "Warden"] },
    { id: 5, type: "Hotel", name: "Queen's Residency", location: `Waterfront, ${locationName}`, rating: 4.9, price: "₹2,800/night", img: hotel2, features: ["Pink Police Zone", "SOS Alarm", "Free WiFi"] },
    { id: 6, type: "PG", name: "Serenity Girls PG", location: `Safe Transit Hub, ${locationName}`, rating: 4.8, price: "₹7,000/month", img: pg2, features: ["Women Only", "Curfew Enforced", "CCTV"] }
  ];

  const filteredStays = activeFilter === 'All' 
    ? staysData 
    : staysData.filter(stay => stay.type === activeFilter);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50/50 pt-12 pb-24 px-6 md:px-12">
      
      {/* Aesthetic Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-pink-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[30rem] h-[30rem] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to={`/location/${name}`} className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 mb-6 transition-colors bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-pink-100 shadow-sm w-fit group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to {locationName}
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-slate-900">
              Verified Stays in <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-sm">
                {locationName}
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
              Curated, highly-rated accommodations prioritizing women's safety, verified by the HERA community.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/80 backdrop-blur-md text-green-700 px-6 py-4 rounded-3xl font-bold flex items-center gap-3 border border-green-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="p-2 bg-green-100 rounded-full">
              <ShieldCheck size={24} className="text-green-600" />
            </div>
            100% Vetted Listings
          </motion.div>
        </div>

        {/* Floating Aesthetic Filter Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-4 mb-10">
          {['All', 'Hostel', 'Hotel', 'PG'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3.5 rounded-full font-bold transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_8px_20px_rgba(219,39,119,0.3)] -translate-y-1' 
                  : 'bg-white/70 backdrop-blur-md text-slate-600 border border-white hover:border-pink-200 hover:text-pink-600 hover:shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Frosted Glass Stays Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredStays.map(stay => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, type: "spring" }}
                key={stay.id} 
                className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgba(219,39,119,0.1)] hover:-translate-y-2 transition-all duration-500 group relative"
              >
                {/* Heart/Save Button */}
                <button className="absolute top-6 right-6 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-pink-500 hover:bg-pink-50 transition-colors shadow-sm">
                  <Heart size={20} />
                </button>

                {/* Image Section */}
                <div className="h-64 relative overflow-hidden bg-slate-100 m-2 rounded-[2rem]">
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-800 shadow-sm">
                    {stay.type}
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs font-extrabold text-white flex items-center gap-1 border border-white/10">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" /> {stay.rating}
                  </div>
                  <img src={stay.img} alt={stay.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 pt-6">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight">{stay.name}</h3>
                  <p className="text-slate-500 font-medium flex items-center gap-1.5 mb-6 text-sm">
                    <MapPin size={16} className="text-pink-500" /> {stay.location}
                  </p>
                  
                  {/* Floating Safety Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {stay.features.map((feat, idx) => (
                      <span key={idx} className="bg-pink-50/80 text-pink-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-pink-100/50 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-pink-500" /> {feat}
                      </span>
                    ))}
                  </div>

                  {/* Price and Action */}
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100/80">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Starting at</span>
                      <span className="text-2xl font-extrabold text-slate-900">{stay.price}</span>
                    </div>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-md hover:shadow-[0_8px_20px_rgba(219,39,119,0.3)] hover:-translate-y-0.5 flex items-center gap-2">
                      Book Safe
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}