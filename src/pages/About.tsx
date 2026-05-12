import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-4 block">The Heritage</span>
            <h1 className="text-6xl font-serif text-white mb-8 leading-tight">Defining <br /> <span className="italic text-[#D4AF37]">Excellence</span></h1>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Aura Dining was born out of a passion for culinary perfection. Since 1999, 
              we have been the sanctuary for those who appreciate the finer things in life.
            </p>
            <p className="text-white/40 leading-relaxed mb-12">
              Our journey began in a small boutique kitchen where every plate was 
              treated as a canvas. Today, we stand as a beacon of luxury dining, 
              honored by critics and beloved by our guests from around the globe.
            </p>
            <div className="flex items-center space-x-12">
               <div>
                  <div className="text-3xl font-serif text-[#D4AF37]">25</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30">Years of Luxury</div>
               </div>
               <div>
                  <div className="text-3xl font-serif text-[#D4AF37]">3</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30">Michelin Stars</div>
               </div>
            </div>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex-1 relative"
          >
             <div className="aspect-square rounded-[100px] overflow-hidden border border-white/10 p-4">
                <img src="https://picsum.photos/seed/chef/800/800" alt="Chef" className="w-full h-full object-cover rounded-[80px]" referrerPolicy="no-referrer" />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-[#D4AF37] p-8 rounded-3xl text-black">
                <div className="text-xl font-serif mb-1">Marco Verratti</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Executive Chef</div>
             </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { title: 'Pure Ingredients', desc: 'We source only the rarest and freshest ingredients from local artisans and global markets.' },
             { title: 'Artistic Plating', desc: 'Every dish is a visual masterpiece, meticulously arranged to delight the senses.' },
             { title: 'Unrivaled Service', desc: 'Our concierge team ensures your experience is seamless from reservation to departure.' },
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-white/5 border border-white/10 p-12 rounded-[40px] hover:border-[#D4AF37]/40 transition-colors"
             >
                <h3 className="text-2xl font-serif text-[#D4AF37] mb-4">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default About;
