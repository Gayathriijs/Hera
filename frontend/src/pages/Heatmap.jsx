import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet';
import { ArrowLeft, Activity, ShieldAlert, ShieldCheck, Info } from 'lucide-react';

export default function Heatmap() {
  const { name } = useParams();
  const locationName = name ? name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "the area";

  // Base coordinates for the map center
  const mapCoordinates = {
    'fort-kochi': [9.9633, 76.2381],
    'marine-drive': [9.9774, 76.2756],
    'edappally': [10.0261, 76.3125],
    'kakkanad': [10.0284, 76.3419]
  };
  const position = mapCoordinates[name] || [9.9312, 76.2673];

  // Simulated AI Heatmap Data around Kochi
  const heatZones = [
    { id: 1, pos: [position[0], position[1]], radius: 600, safety: 'high', name: `Main Square, ${locationName}`, desc: 'Highly populated, excellent lighting, pink police presence.' },
    { id: 2, pos: [position[0] + 0.005, position[1] - 0.005], radius: 400, safety: 'moderate', name: 'West Alleyways', desc: 'Safe during the day, but lower lighting after 10 PM. Travel in groups.' },
    { id: 3, pos: [position[0] - 0.008, position[1] + 0.002], radius: 350, safety: 'low', name: 'Industrial Sector Boundary', desc: 'Isolated area with minimal CCTV. AI recommends avoiding at night.' },
    { id: 4, pos: [position[0] + 0.002, position[1] + 0.008], radius: 500, safety: 'high', name: 'Transit Hub', desc: '24/7 security, bustling crowd, heavily monitored.' }
  ];

  const getColor = (safety) => {
    if (safety === 'high') return { color: '#22c55e', fill: '#86efac' }; // Green
    if (safety === 'moderate') return { color: '#eab308', fill: '#fde047' }; // Yellow
    if (safety === 'low') return { color: '#ef4444', fill: '#fca5a5' }; // Red
    return { color: '#3b82f6', fill: '#93c5fd' };
  };

  return (
    <div className="min-h-screen relative bg-slate-50 pt-12 pb-24 px-6 md:px-12 flex flex-col">
      
      {/* Aesthetic Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-pink-200/40 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[0%] right-[-10%] w-[30rem] h-[30rem] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to={`/location/${name}`} className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 mb-6 transition-colors bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-pink-100 shadow-sm w-fit group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to {locationName}
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-slate-900 flex items-center gap-3">
              Dynamic Heatmap <Activity className="text-pink-500" size={36} />
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
              Live safety mapping for <span className="text-pink-600 font-bold">{locationName}</span>. Powered by community data and AI analysis.
            </p>
          </motion.div>
        </div>

        {/* Map and Legend Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
          
          {/* Legend Sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1 space-y-6 flex flex-col">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <Info size={20} className="text-blue-500" /> Map Legend
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-green-50 transition-colors border border-transparent hover:border-green-100">
                  <div className="p-2 bg-green-100 rounded-full shrink-0 mt-1"><ShieldCheck size={18} className="text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-green-700">Safe Zone</h4>
                    <p className="text-sm text-slate-500 font-medium">Well-lit, high crowd presence, active patrols.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-yellow-50 transition-colors border border-transparent hover:border-yellow-100">
                  <div className="p-2 bg-yellow-100 rounded-full shrink-0 mt-1"><ShieldAlert size={18} className="text-yellow-600" /></div>
                  <div>
                    <h4 className="font-bold text-yellow-700">Moderate</h4>
                    <p className="text-sm text-slate-500 font-medium">Safe by day, use caution or travel in groups at night.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">
                  <div className="p-2 bg-red-100 rounded-full shrink-0 mt-1"><ShieldAlert size={18} className="text-red-600" /></div>
                  <div>
                    <h4 className="font-bold text-red-700">Avoid at Night</h4>
                    <p className="text-sm text-slate-500 font-medium">Poor lighting, isolated areas, or poorly reviewed.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-800 relative overflow-hidden mt-auto">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]"></div>
               <div className="relative z-10 text-center">
                 <p className="text-white font-bold text-sm mb-2">Live Status</p>
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full font-extrabold text-sm">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                   Data up to date
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Interactive Map */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-3 bg-white p-2 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white h-[600px] relative z-0 overflow-hidden">
            <MapContainer center={position} zoom={15} className="w-full h-full rounded-[2rem]">
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap'
              />
              
              {/* Render the Heat Zones */}
              {heatZones.map(zone => {
                const colors = getColor(zone.safety);
                return (
                  <Circle 
                    key={zone.id}
                    center={zone.pos} 
                    radius={zone.radius} 
                    pathOptions={{ color: colors.color, fillColor: colors.fill, fillOpacity: 0.4, weight: 2 }}
                  >
                    <Popup className="font-bold">
                      <div className="text-slate-900 text-lg mb-1">{zone.name}</div>
                      <div className="text-slate-600 font-normal text-sm">{zone.desc}</div>
                    </Popup>
                  </Circle>
                );
              })}

              {/* Pin for the center of the searched location */}
              <Marker position={position}>
                <Popup className="font-bold text-pink-600">
                  Center of {locationName}
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>

        </div>
      </div>
    </div>
  );
}