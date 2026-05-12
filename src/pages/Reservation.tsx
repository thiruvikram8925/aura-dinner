import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Calendar, Users, Clock, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Reservation = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, status: 'pending' }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success('Reservation request sent successfully!');
      } else {
        throw new Error('Failed to book');
      }
    } catch (err) {
      toast.error('Booking failed. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#050505] px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl max-w-lg w-full"
        >
          <CheckCircle className="text-[#D4AF37] w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl font-serif text-white mb-4">Reservation Requested</h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Thank you for choosing Aura Dining. We have received your request and 
            will confirm your table shortly via email or phone.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505] px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        {/* Contact Info */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Reservations</span>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">Secure Your <br /> <span className="italic text-[#D4AF37]">Private Table</span></h1>
            <p className="text-white/50 text-lg mb-12 max-w-md leading-relaxed">
              Experience exclusivity. Our tables are highly sought after; we recommend booking 
              at least 48 hours in advance for weekend dining.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                  <Calendar className="text-[#D4AF37]" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Weekly Operation</h4>
                  <p className="text-white/40 text-sm">Monday — Sunday: 6:00 PM - 11:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                  <Users className="text-[#D4AF37]" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Group Dining</h4>
                  <p className="text-white/40 text-sm">For parties larger than 10, please contact us via phone directly.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Container */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex-1 w-full"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Full Name</label>
                  <input 
                    {...register('name', { required: true })}
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Email Address</label>
                  <input 
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Phone Number</label>
                  <input 
                    {...register('phone', { required: true })}
                    type="tel" 
                    placeholder="+1 (234) 567 890"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">In-Person Guests</label>
                  <select 
                    {...register('guests', { required: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white appearance-none"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n} className="bg-black">{n} Persons</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Date</label>
                  <input 
                    {...register('date', { required: true })}
                    type="date" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Time</label>
                  <select 
                    {...register('time', { required: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white appearance-none"
                  >
                    {['18:00', '19:00', '20:00', '21:00', '22:00'].map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
                  </select>
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-[0.3em] rounded-xl hover:bg-white transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    <span>Confirm Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservation;
