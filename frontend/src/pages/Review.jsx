import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, MessageSquare, ThumbsUp, Send, Loader2 } from 'lucide-react';

export default function Review() {
  const { name } = useParams();
  const locationName = name ? name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "the area";

  // 1. NEW: State tracking all 5 specific questions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [ratings, setRatings] = useState({
    overall: 0,
    lighting: 0,
    transport: 0,
    crowd: 0,
    security: 0
  });

  // The 5 specific questions the user must answer
  const reviewCriteria = [
    { key: 'overall', label: 'Overall Safety Level', desc: 'How safe did you feel in general?' },
    { key: 'lighting', label: 'Street Lighting', desc: 'Were the paths well-lit at night?' },
    { key: 'transport', label: 'Safe Transport', desc: 'Was verified transport easily available?' },
    { key: 'crowd', label: 'Crowd Atmosphere', desc: 'Did the public crowd feel secure?' },
    { key: 'security', label: 'Police Presence', desc: 'Were authorities visible/accessible?' }
  ];

  // Mock existing community reviews
  const [reviews, setReviews] = useState([
    { id: 1, user: "Anjali M.", date: "2 days ago", avatar: "AM", text: "Felt very safe walking around Princess Street even after 9 PM. The street lights are bright and there were plenty of families around.", scores: { overall: 5, lighting: 5, transport: 5, crowd: 4, security: 4 }, verified: true },
    { id: 2, user: "Sarah T.", date: "1 week ago", avatar: "ST", text: "Stayed at a highly rated hostel here. The pink police patrol passed by a few times which was reassuring. Transport can get crowded during peak hours though.", scores: { overall: 4, lighting: 4, transport: 3, crowd: 4, security: 5 }, verified: true }
  ]);

  // Check if all 5 questions have been answered
  const isFormValid = Object.values(ratings).every(score => score > 0) && reviewText.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        user: "You",
        date: "Just now",
        avatar: "ME",
        text: reviewText,
        scores: { ...ratings },
        verified: true
      };
      setReviews([newEntry, ...reviews]);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setReviewText('');
      setRatings({ overall: 0, lighting: 0, transport: 0, crowd: 0, security: 0 });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  // Helper to render interactive stars
  const renderStars = (currentScore, criteriaKey = null, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            size={interactive ? 24 : 16}
            onClick={() => interactive && setRatings({ ...ratings, [criteriaKey]: star })}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${star <= currentScore ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50/50 pt-12 pb-24 px-6 md:px-12">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-yellow-200/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[30rem] h-[30rem] bg-pink-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to={`/location/${name}`} className="inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-700 mb-6 transition-colors bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-yellow-100 shadow-sm w-fit group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to {locationName}
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-slate-900">
              Community Reviews <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-pink-500 drop-shadow-sm">
                {locationName}
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
              Read real experiences from other women, or fill out the safety survey to help keep the HERA community informed.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: The 5-Question Survey Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-5 space-y-8">
            
            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden border border-slate-800">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <MessageSquare size={20} />
                  <h3 className="text-2xl font-extrabold text-white">Rate Your Safety</h3>
                </div><p className="text-slate-400 text-sm font-medium mb-8">Your anonymous data helps power our AI heatmaps.</p>
                
                
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-xl mb-6 font-bold flex items-center gap-2">
                      <ShieldCheck size={20} /> Review published securely!
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* 5 Specific Survey Questions */}
                  <div className="space-y-5 bg-white/5 p-5 rounded-2xl border border-white/10">
                    {reviewCriteria.map((criteria) => (
                      <div key={criteria.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <div>
                          <label className="text-white text-sm font-bold block">{criteria.label}</label>
                          <span className="text-slate-400 text-xs">{criteria.desc}</span>
                        </div>
                        <div className="shrink-0 bg-slate-950/50 px-3 py-1.5 rounded-full border border-white/5">
                          {renderStars(ratings[criteria.key], criteria.key, true)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-slate-300 text-sm font-bold mb-2 block">Tell us more (Optional but helpful)</label>
                    <textarea 
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share specific details about your experience..." 
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:border-yellow-400 focus:bg-white/20 transition-all font-medium min-h-[100px] resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !isFormValid}
                    className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-bold shadow-[0_8px_20px_rgba(234,179,8,0.3)] hover:-translate-y-1 transition-all flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <><Send size={18} /> Submit Safety Survey</>}
                  </button>
                  
                  {!isFormValid && !showSuccess && (
                    <p className="text-center text-xs text-yellow-500/70 font-bold mt-2">
                      Please rate all 5 categories and add a comment to submit.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Review Feed */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              Recent Activity <span className="bg-pink-100 text-pink-600 text-sm px-3 py-1 rounded-full">{reviews.length}</span>
            </h3>

            <AnimatePresence>
              {reviews.map((review) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  key={review.id}
                  className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center font-extrabold text-pink-700 border-2 border-white shadow-sm">
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                          {review.user}
                          {review.verified && <ShieldCheck size={16} className="text-green-500" />}
                        </h4>
                        <span className="text-slate-400 text-sm font-medium">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Overall</span>
                      {renderStars(review.scores.overall)}
                    </div>
                  </div>

                  <p className="text-slate-600 font-medium leading-relaxed mb-6">"{review.text}"</p>

                  {/* Breakdown of the 5 criteria in the feed */}
                  <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm"><span className="font-bold text-slate-700">Lighting:</span>{renderStars(review.scores.lighting)}</div>
                    <div className="flex items-center gap-2 text-sm"><span className="font-bold text-slate-700">Transport:</span>{renderStars(review.scores.transport)}</div>
                    <div className="flex items-center gap-2 text-sm"><span className="font-bold text-slate-700">Crowd:</span>{renderStars(review.scores.crowd)}</div>
                    <div className="flex items-center gap-2 text-sm"><span className="font-bold text-slate-700">Police:</span>{renderStars(review.scores.security)}</div>
                    
                    <button className="ml-auto flex items-center gap-1.5 text-slate-400 hover:text-pink-600 font-bold transition-colors text-sm">
                      <ThumbsUp size={16} /> Helpful
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

          </motion.div>

        </div>
      </div>
    </div>
  );
}