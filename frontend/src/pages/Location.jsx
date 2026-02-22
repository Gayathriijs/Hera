import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { mockLocations } from '../data/mockLocations';
import { ArrowLeft, Map, Home as HomeIcon, Star, MapPin, Car, Train, ShieldCheck } from 'lucide-react';

export default function Location() {
  const { name } = useParams(); 

  const locationData = mockLocations.find(loc => loc.slug === name) || {
    name: name.replace('-', ' ').toUpperCase(),
    description: "A beautiful and culturally rich destination in Kochi.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kochi_Skyline.jpg/800px-Kochi_Skyline.jpg"
  };

  const mapCoordinates = {
    'fort-kochi': [9.9633, 76.2381],
    'marine-drive': [9.9774, 76.2756],
    'edappally': [10.0261, 76.3125],
    'kakkanad': [10.0284, 76.3419]
  };
  const position = mapCoordinates[name] || [9.9312, 76.2673];

  // UPDATED: The 4 requested feature categories
  const locationFeatures = [
    { title: "Travel", icon: <Map size={28} />, link: `/travel/${name}`, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Stay", icon: <HomeIcon size={28} />, link: `/stay/${name}`, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Review", icon: <Star size={28} />, link: `/review/${name}`, color: "text-yellow-500", bg: "bg-yellow-50" },
    { title: "Locations", icon: <MapPin size={28} />, link: `/heatmap/${name}`, color: "text-green-500", bg: "bg-green-50" }
  ];

  // CATEGORY 1: Stay Recommendations (Fixed the broken PG image!)
  const stayRecommendations = [
    { type: "Hostel", name: "The Lavender Women's Hostel", rating: 4.9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Interior_of_a_hostel_room.jpg/800px-Interior_of_a_hostel_room.jpg" },
    { type: "Hotel", name: "SafeHaven Boutique Hotel", rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hotel_room_in_Kochi.jpg/800px-Hotel_room_in_Kochi.jpg" },
    { type: "PG", name: "Pink Blossom PG for Women", rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/A_bedroom_in_a_hostel.jpg/800px-A_bedroom_in_a_hostel.jpg" }
  ];

  // CATEGORY 2: Travel/Transport Recommendations
  const travelRecommendations = [
    { type: "Metro", name: "Kochi Metro (Women's Coach)", status: "Highly Safe", icon: <Train size={24} className="text-blue-500" /> },
    { type: "Cab", name: "Pink Taxis (Women Drivers)", status: "24/7 Available", icon: <Car size={24} className="text-pink-500" /> },
    { type: "Auto", name: "Verified Pre-paid Rickshaws", status: "Safe Stands Only", icon: <ShieldCheck size={24} className="text-green-500" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[50vh] w-full">
        <img src={locationData.image} alt={locationData.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md w-fit font-medium border border-white/30">
            <ArrowLeft size={18} /> Back to Search
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">{locationData.name}</h1>
            <p className="text-white/90 max-w-2xl text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
              {locationData.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 space-y-16">
        
        {/* 2. THE 4 FEATURES GRID */}
        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Explore {locationData.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {locationFeatures.map((feat, idx) => (
              <Link 
                key={idx} 
                to={feat.link}
                className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-pink-50 hover:border-pink-200 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 group"
              >
                <div className={`${feat.bg} ${feat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <span className="font-extrabold text-slate-800 text-lg">{feat.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. STAY RECOMMENDATIONS */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Recommended Stays</h2>
            <Link to={`/stay/${name}`} className="text-pink-600 font-bold hover:underline hidden md:block">View all stays →</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stayRecommendations.map((rec, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-extrabold text-slate-700 shadow-sm">
                    {rec.type}
                  </div>
                  <img src={rec.img} alt={rec.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{rec.name}</h3>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                      <Star size={14} className="text-green-600 fill-green-600" />
                      <span className="text-sm font-bold text-green-700">{rec.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm flex items-center gap-1 mt-3">
                    <ShieldCheck size={14} className="text-pink-500"/> Verified safe for women
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. TRAVEL / TRANSPORT RECOMMENDATIONS */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Safe Travel Options</h2>
            <Link to="/travel" className="text-blue-500 font-bold hover:underline hidden md:block">Plan route →</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelRecommendations.map((rec, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all flex items-center gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl shrink-0">
                  {rec.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{rec.name}</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">{rec.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. INTERACTIVE MAP SECTION */}
        <section>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Location Map</h2>
          <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-200 relative z-0">
            <MapContainer center={position} zoom={14} className="w-full h-full">
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap'
              />
              <Marker position={position}>
                <Popup className="font-bold text-slate-800">
                  {locationData.name} <br/>
                  <span className="text-pink-600 font-normal">Welcome to the safe zone!</span>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

      </div>
    </div>
  );
}