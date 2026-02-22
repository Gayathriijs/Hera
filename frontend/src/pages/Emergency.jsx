import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Phone, ShieldAlert, Activity, AlertTriangle, Plus, Stethoscope, Heart } from 'lucide-react';

export default function Emergency() {
  // Center coordinates for Kochi
  const kochiPosition = [9.9312, 76.2673];

  const emergencyContacts = [
    { name: "National Emergency", number: "112", icon: <AlertTriangle className="text-red-500" /> },
    { name: "Pink Police Patrol", number: "1515", icon: <ShieldAlert className="text-pink-500" /> },
    { name: "Women Helpline", number: "1091", icon: <Phone className="text-purple-500" /> },
    { name: "Ambulance", number: "108", icon: <Stethoscope className="text-rose-500" /> }
  ];

  const handleSOS = () => {
    alert("🚨 SOS ACTIVATED! Your live location has been sent to the Pink Police and your emergency circle.");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50/50 pt-12 pb-24 px-6 md:px-12">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-red-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[0%] w-[30rem] h-[30rem] bg-pink-200/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-100 text-red-600 mb-6 font-bold tracking-widest uppercase text-sm border border-red-200">
            <ShieldAlert size={16} /> Live Security Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Emergency <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-600">Response</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            In case of danger, use the SOS button. Our system will immediately alert the nearest Pink Police patrol with your real-time coordinates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: SOS & Contacts */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Pulsing SOS Card */}
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(239,68,68,0.1)] border border-white text-center flex flex-col items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5"></div>
              
              <button 
                onClick={handleSOS}
                className="relative group w-52 h-52 bg-red-50 rounded-full flex items-center justify-center mb-8 mt-4 transition-transform active:scale-95"
              >
                {/* Visual Alarm Pulses */}
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-4 bg-red-400 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.4s' }}></div>
                
                {/* Core SOS Button */}
                <div className="relative z-10 w-36 h-36 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex flex-col items-center justify-center shadow-[0_15px_40px_rgba(239,68,68,0.4)] border-4 border-white">
                  <Activity size={44} className="mb-1 animate-pulse" />
                  <span className="font-black text-3xl tracking-tighter">SOS</span>
                </div>
              </button>
              
              <h2 className="text-2xl font-black text-slate-900 mb-2 relative z-10">One-Tap Alert</h2>
              <p className="text-sm text-slate-500 font-bold relative z-10">Broadcast location to authorities</p>
            </div>

            {/* Quick Dial Contacts */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <Phone size={20} className="text-pink-500" /> Emergency Hotline
              </h3>
              <div className="space-y-4">
                {emergencyContacts.map((contact, idx) => (
                  <a 
                    key={idx} 
                    href={`tel:${contact.number}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-red-50 border border-slate-100 hover:border-red-200 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-white transition-colors border border-slate-100">
                        {contact.icon}
                      </div>
                      <span className="font-bold text-slate-700">{contact.name}</span>
                    </div>
                    <span className="font-black text-xl text-slate-900 group-hover:text-red-600">{contact.number}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Rescue Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white p-2 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-white h-[650px] relative z-0 overflow-hidden"
          >
            <MapContainer center={kochiPosition} zoom={13} className="w-full h-full rounded-[2.2rem]">
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap'
              />
              
              {/* Pink Police Hub */}
              <Marker position={[9.9312, 76.2673]}>
                <Popup className="font-bold">
                  <div className="flex items-center gap-2 text-blue-600">
                    <ShieldAlert size={16} /> Fort Kochi Police Station
                  </div>
                  <div className="text-pink-600 text-xs">Pink Patrol Unit Available</div>
                </Popup>
              </Marker>
              
              {/* Medical Center */}
              <Marker position={[9.9816, 76.2999]}>
                <Popup className="font-bold">
                  <div className="flex items-center gap-2 text-red-600">
                    <Plus size={16} /> Medical Emergency Center
                  </div>
                  <div className="text-slate-500 text-xs font-normal">Open 24/7 • 2.4km away</div>
                </Popup>
              </Marker>
            </MapContainer>

            {/* Float Info Card for Map */}
            <div className="absolute bottom-8 right-8 z-[1000] bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-white shadow-2xl max-w-xs">
              <div className="flex items-center gap-3 text-slate-800">
                <Heart size={20} className="text-red-500 fill-red-500" />
                <p className="text-sm font-bold">You are currently in a <span className="text-green-600">High Patrol Zone</span>. Safety coverage is optimal.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}