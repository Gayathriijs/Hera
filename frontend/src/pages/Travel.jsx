import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, ArrowLeft, Train, Car, Navigation, Clock, Map, Bus, Ship, Loader2, Route } from 'lucide-react';

export default function Travel() {
  const { name } = useParams();
  const locationName = name ? name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "the area";

  // NEW: State to handle the route generation and travel time
  const [startLocation, setStartLocation] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeData, setRouteData] = useState(null);

  // Function to simulate AI calculating the safe route duration
  const handleGenerateRoute = () => {
    if (!startLocation.trim()) return;
    
    setIsCalculating(true);
    setRouteData(null);

    // Simulate a 1.5 second API call to get map data
    setTimeout(() => {
      // Generate a realistic random time between 25 and 55 minutes for the demo
      const randomMins = Math.floor(Math.random() * 30) + 25; 
      
      setRouteData({
        duration: `${randomMins} mins`,
        distance: `${(randomMins / 3).toFixed(1)} km`,
        mode: waterMetroLocations.includes(name) ? "Water Metro / Cab" : "Pink Taxi / Metro",
      });
      setIsCalculating(false);
    }, 1500);
  };

  const transportOptions = [
    { id: 1, type: "Metro", name: "Kochi Metro (Women's Coach)", route: `Nearest hub to ${locationName}`, status: "Highly Safe", time: "6:00 AM - 10:30 PM", icon: <Train size={32} className="text-blue-500" />, features: ["Dedicated Coach", "CCTV", "Guards"] },
    { id: 2, type: "Cab", name: "Pink Taxis", route: `Direct drop to ${locationName}`, status: "High Demand", time: "24/7 Available", icon: <Car size={32} className="text-pink-500" />, features: ["Women Drivers", "GPS Tracked", "SOS Link"] },
    { id: 3, type: "Auto", name: "Verified Pre-paid Autos", route: `Approved stands in ${locationName}`, status: "Safe Stands Only", time: "24/7 Available", icon: <Navigation size={32} className="text-green-500" />, features: ["Police Registered", "Fixed Fares", "Trackable"] },
    { id: 4, type: "Bus", name: "KSRTC / City Bus", route: `Main stops in ${locationName}`, status: "High Frequency", time: "5:00 AM - 11:00 PM", icon: <Bus size={32} className="text-orange-500" />, features: ["Reserved Pink Seats", "Crowded Peak Hours", "Cheap"] }
  ];

  const waterMetroLocations = ['fort-kochi', 'marine-drive', 'kakkanad'];
  if (waterMetroLocations.includes(name)) {
    transportOptions.splice(1, 0, { 
      id: 5, type: "Ferry", name: "Kochi Water Metro", route: `Ferry Terminal at ${locationName}`, status: "Highly Safe & Scenic", time: "7:00 AM - 8:00 PM", icon: <Ship size={32} className="text-cyan-500" />, features: ["AC Cabins", "CCTV Monitored", "Life Vests"]
    });
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50/50 pt-12 pb-24 px-6 md:px-12">
      
      {/* Aesthetic Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[30rem] h-[30rem] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to={`/location/${name}`} className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 mb-6 transition-colors bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-blue-100 shadow-sm w-fit group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to {locationName}
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-slate-900">
              Safe Transit to <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500 drop-shadow-sm">
                {locationName}
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
              Plan your journey with community-vetted transport options that prioritize women's safety and reliability.
            </p>
          </motion.div>
        </div>

        {/* AI Route Planner Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]"></div>
          
          <div className="relative z-10 mb-8 md:mb-0 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-sm mb-4 border border-blue-500/30">
              <Map size={16} /> AI Route Assistant
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Find the safest path.</h2>
            <p className="text-slate-300 font-medium mb-6">Enter your starting point, and our AI will calculate the safest travel time to {locationName}, avoiding poorly-lit streets.</p>
            
            {/* NEW: Dynamic Route Result Box */}
            <AnimatePresence>
              {routeData && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }} 
                  animate={{ opacity: 1, height: 'auto', y: 0 }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-6"
                >
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Est. Travel Time</span>
                    <span className="text-3xl font-extrabold text-white flex items-center gap-2">
                      <Clock size={24} className="text-pink-400" /> {routeData.duration}
                    </span>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Distance & Mode</span>
                    <span className="text-lg font-bold text-white flex items-center gap-2">
                      <Route size={18} className="text-blue-400" /> {routeData.distance} ({routeData.mode})
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder="e.g. Edappally Metro Station" 
              className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:border-pink-500 focus:bg-white/20 transition-all w-full md:w-72 font-medium"
            />
            <button 
              onClick={handleGenerateRoute}
              disabled={isCalculating || !startLocation.trim()}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold shadow-[0_8px_20px_rgba(219,39,119,0.4)] hover:-translate-y-1 transition-all flex justify-center items-center gap-2 whitespace-nowrap min-w-[180px]"
            >
              {isCalculating ? <Loader2 size={20} className="animate-spin" /> : "Calculate Time"}
            </button>
          </div>
        </motion.div>

        {/* Transport Options Grid */}
        <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Verified Transport Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transportOptions.map((transit, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={transit.id} 
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl shadow-inner border border-slate-100 ${transit.type === 'Ferry' ? 'bg-cyan-50' : 'bg-slate-50'}`}>
                  {transit.icon}
                </div>
                <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100 flex items-center gap-1">
                  <ShieldCheck size={14} /> {transit.status}
                </div>
              </div>

              <h4 className="text-xl font-extrabold text-slate-900 mb-2">{transit.name}</h4>
              <p className="text-slate-500 font-medium flex items-center gap-2 mb-4 text-sm">
                <MapPin size={16} className={transit.type === 'Ferry' ? 'text-cyan-500' : 'text-blue-500'} /> {transit.route}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {transit.features.map((feat, i) => (
                  <span key={i} className="bg-blue-50/80 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-100/50">
                    {feat}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-100/80">
                <span className="text-slate-500 text-sm font-bold flex items-center gap-1.5">
                  <Clock size={16} /> {transit.time}
                </span>
                <button className="text-blue-600 font-bold hover:text-blue-800 hover:underline">
                  Book Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}