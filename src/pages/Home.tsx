import React from 'react';
import { motion } from 'motion/react';
import Hero3D from '../components/ui/Hero3D';
import { ChevronRight, Star, Clock, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block text-[#D4AF37] tracking-[0.4em] uppercase text-sm mb-6 font-medium">
              Elegance in Every Bite
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-light mb-8 tracking-tighter leading-tight">
              The Art of <br /> 
              <span className="italic font-serif text-[#D4AF37]">Luxury Dining</span>
            </h1>
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience a culinary journey through exquisite flavors and meticulously 
              crafted dishes in an atmosphere of unparalleled sophistication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="/reservation"
                className="group relative px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase text-sm tracking-widest overflow-hidden transition-all duration-300 hover:bg-white"
              >
                <span className="relative z-10">Book a Table</span>
              </a>
              <a 
                href="/menu"
                className="group flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors"
              >
                <span>View Menu</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Exquisite Dishes', value: '150+' },
            { label: 'Pro Chefs', value: '12' },
            { label: 'Years of Legacy', value: '25' },
            { label: 'Happy Guests', value: '10k+' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-4xl font-serif text-gold mb-2">{stat.value}</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-glass-border">
              <img 
                src="https://picsum.photos/seed/restaurant1/800/1000" 
                alt="Interior" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 glass p-8 text-white hidden lg:block max-w-xs shadow-2xl">
              <Star className="text-gold mb-4" fill="#C5A028" />
              <p className="italic font-serif text-lg leading-relaxed">
                "The finest culinary experience we've had. The attention to detail is remarkable."
              </p>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-40">Michelin Guide 2024</div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex-1"
          >
            <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Our Story</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight italic">Crafting Memories Since 1999</h2>
            <div className="space-y-6 text-white/60 leading-relaxed font-light">
              <p>
                Founded on the principles of excellence and innovation, Aura Dining has 
                consistently pushed the boundaries of gastronomy. Our chefs combine 
                traditional techniques with modern artistry.
              </p>
              <p>
                Every ingredient is sourced with purity in mind, ensuring that each bite 
                tells a story of quality and dedication to the craft and heritage.
              </p>
            </div>
            <div className="mt-12 flex flex-col space-y-6">
               <div className="flex items-center space-x-6">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                    <Clock className="text-gold" size={16} />
                  </div>
                  <span className="text-[10px] tracking-widest text-white/60 uppercase">Daily: 18:00 — 23:30</span>
               </div>
               <div className="flex items-center space-x-6">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center">
                    <MapPin className="text-gold" size={16} />
                  </div>
                  <span className="text-[10px] tracking-widest text-white/60 uppercase">123 Luxury Ave, Manhattan, NY</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
