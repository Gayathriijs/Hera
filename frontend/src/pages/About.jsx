import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Globe, Users, Target, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-24">
      
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-20 mt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-600 mb-6 font-bold tracking-widest uppercase text-sm">
            <Sparkles size={16} /> Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Empowering Women to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              Explore Fearlessly.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-medium">
            HERA is more than just a navigation app. It is a community-driven safety ecosystem designed to give women the confidence to travel, celebrate, and live freely without compromise.
          </p>
        </motion.div>
      </section>

      {/* The "Why" Section - Lengthy and Detailed */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">The Genesis of HERA</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  In vibrant cities like Kochi, festivals and cultural events bring the streets to life. However, navigating dense crowds, unfamiliar neighborhoods, and late-night events often comes with an underlying layer of anxiety for female travelers. 
                </p>
                <p>
                  We realized that traditional mapping apps prioritize the *fastest* route, completely ignoring whether that route is well-lit, heavily populated, or historically safe. <strong>HERA was born to change this narrative.</strong>
                </p>
                <p>
                  By crowdsourcing real-time data from local women and integrating with local authorities like the Pink Police, we have built an intelligent platform that prioritizes your physical safety and peace of mind over saving a few seconds on a commute.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800" 
                alt="Women traveling together safely" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-xl drop-shadow-md">"Freedom of movement is a fundamental right, not a luxury."</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Our Core Pillars</h2>
          <p className="text-lg text-slate-600">The foundation of every feature we build.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck />, title: "Safety First", desc: "Every route, stay, and transport option is vetted for safety before speed or cost.", color: "text-green-500", bg: "bg-green-50" },
            { icon: <Users />, title: "Community Powered", desc: "Verified reviews from real women ensure our data is always accurate and up-to-date.", color: "text-purple-500", bg: "bg-purple-50" },
            { icon: <Target />, title: "Proactive Defense", desc: "We don't just react to emergencies; our AI routes actively help you avoid risky areas.", color: "text-pink-500", bg: "bg-pink-50" },
            { icon: <Heart />, title: "Inclusivity", desc: "Designed to be accessible, intuitive, and a safe space for women from all walks of life.", color: "text-red-500", bg: "bg-red-50" }
          ].map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className={`${pillar.bg} ${pillar.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                {React.cloneElement(pillar.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}