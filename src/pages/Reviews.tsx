import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Quote, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Thank you for your elegant feedback');
        reset();
        fetchReviews();
      }
    } catch (err) {
      toast.error('Could not save your review');
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Section Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Guest Experiences</span>
              <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight italic">What They <br /> <span className="text-white not-italic">Say About Us</span></h1>
              <p className="text-white/50 text-lg mb-12 leading-relaxed max-w-md">
                Our guests represent the pinnacle of global society. Their words reflect our 
                commitment to the highest standards of culinary artistry and service.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <div className="text-3xl font-serif text-[#D4AF37]">4.9 / 5</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30">Average Rating</div>
                 </div>
                 <div>
                    <div className="text-3xl font-serif text-[#D4AF37]">2.5k+</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30">Total Reviews</div>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Submission Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="glass p-8 md:p-12">
               <h3 className="text-2xl font-serif text-white mb-8">Share Your Thoughts</h3>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Your Name</label>
                     <input 
                       {...register('userName', { required: true })}
                       type="text" 
                       placeholder="E.g. Alexander Knight"
                       className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-gold outline-none transition-all text-white" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Rating Excellence</label>
                     <select 
                       {...register('rating', { required: true })}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-gold outline-none transition-all text-white appearance-none"
                     >
                        {[5,4,3,2,1].map(n => <option key={n} value={n} className="bg-black">{n} Stars - {n === 5 ? 'Exceptional' : 'Superb'}</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Your Perspective</label>
                     <textarea 
                       {...register('comment', { required: true })}
                       rows={4}
                       placeholder="Describe your dining journey..."
                       className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-gold outline-none transition-all text-white resize-none" 
                     />
                  </div>
                  <button className="w-full py-5 bg-gold text-black font-bold uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-white transition-all flex items-center justify-center space-x-3">
                     {isSubmitting ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <>
                        <Send size={14} />
                        <span>Imprint Feedback</span>
                     </>}
                  </button>
               </form>
            </div>
          </motion.div>
        </div>

        {/* Masonry or Grid of Reviews */}
        <div className="mt-32 space-y-12">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif text-white">Guest Chronicles</h2>
              <div className="h-[1px] flex-1 bg-white/5 mx-8"></div>
              <MessageSquare size={20} className="text-gold" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {reviews.map((rev: any, i) => (
                  <motion.div
                    key={rev._id || i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-8 relative group hover:border-gold/30 transition-colors"
                  >
                    <Quote className="absolute top-6 right-6 text-gold/10 group-hover:text-gold/20 transition-colors" size={40} />
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < rev.rating ? 'text-gold' : 'text-white/10'} 
                          fill={i < rev.rating ? '#C5A028' : 'none'} 
                        />
                      ))}
                    </div>
                    <p className="text-white/70 italic font-serif leading-relaxed mb-6">"{rev.comment}"</p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                       <span className="text-sm font-bold text-white uppercase tracking-widest">{rev.userName}</span>
                       <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{new Date(rev.date || rev.createdAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
