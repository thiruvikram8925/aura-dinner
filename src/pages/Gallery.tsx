import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Gallery = () => {
  const [images, setImages] = useState([
    { id: 1, src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200', size: 'large' },
    { id: 2, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: 3, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: 4, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200', size: 'large' },
    { id: 5, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: 6, src: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: 7, src: 'https://images.unsplash.com/photo-1551632432-c735e8399521?auto=format&fit=crop&q=80&w=1200', size: 'large' },
    { id: 8, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: 9, src: 'https://images.unsplash.com/photo-1599249300675-c39f1dd2d6be?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: 10, src: 'https://images.unsplash.com/photo-1550966841-3eeec10e75a6?auto=format&fit=crop&q=80&w=1200', size: 'large' },
    { id: 11, src: 'https://images.unsplash.com/photo-1502301103665-0b95cc738def?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: 12, src: 'https://images.unsplash.com/photo-1511910849309-0dffb8785146?auto=format&fit=crop&q=80&w=800', size: 'small' },
  ]);

  const handleImageError = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif text-[#D4AF37] mb-4"
          >
            Visual Journey
          </motion.h2>
          <p className="text-white/40 tracking-[0.2em] uppercase text-xs">Capturing the soul of Aura Dining</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence>
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-3xl group ${img.size === 'large' ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
              >
                  <img 
                    src={img.src} 
                    alt="Gallery" 
                    onError={() => handleImageError(img.id)}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold border border-[#D4AF37] px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">Enlarge</span>
                  </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
