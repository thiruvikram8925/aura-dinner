import React from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Get in Touch</span>
              <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">We value your <br /> <span className="italic text-[#D4AF37]">Feedback</span></h1>
              <p className="text-white/50 text-lg mb-12 leading-relaxed">
                Whether you have a question about our menu, need assistance with a private event, 
                or want to share your dining experience, our concierge is here to help.
              </p>
              
              <div className="space-y-12">
                <div className="flex items-center space-x-6 group">
                   <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                      <MapPin className="text-[#D4AF37]" size={24} />
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Our Location</h4>
                      <p className="text-white/40 text-sm italic">123 Luxury Ave, Manhattan, NY 10001</p>
                   </div>
                </div>
                 <div className="flex items-center space-x-6 group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                       <Phone className="text-[#D4AF37]" size={24} />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Direct Line</h4>
                       <p className="text-white/40 text-sm italic">+91 1010101010</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-6 group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                       <Mail className="text-[#D4AF37]" size={24} />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Email Concierge</h4>
                       <p className="text-white/40 text-sm italic">vikramvicky8925@gmail.com</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] backdrop-blur-2xl"
          >
            <form className="space-y-8">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Your Name</label>
                  <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Email Address</label>
                  <input type="email" placeholder="name@email.com" className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Subject</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white appearance-none">
                     <option className="bg-black">General Inquiry</option>
                     <option className="bg-black">Feedback & Reviews</option>
                     <option className="bg-black">Private Events</option>
                     <option className="bg-black">Career Opportunities</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Your Message</label>
                  <textarea rows={4} placeholder="How can we assist you?" className="w-full bg-transparent border-b border-white/10 py-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white resize-none"></textarea>
               </div>
               <button className="w-full py-5 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-white transition-all flex items-center justify-center space-x-3">
                  <Send size={16} />
                  <span>Send Message</span>
               </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
