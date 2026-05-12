import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter text-[#D4AF37] block mb-8">
              AURA <span className="text-white font-light">DINING</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Setting the standard for luxury dining since 1999. Experience 
              culinary excellence in an atmosphere of pure sophistication.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-white/40 hover:text-[#D4AF37] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white/40 hover:text-[#D4AF37] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-white/40 hover:text-[#D4AF37] transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/menu" className="hover:text-[#D4AF37] transition-colors">Our Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-[#D4AF37] transition-colors">Table Reservation</Link></li>
              <li><Link to="/gallery" className="hover:text-[#D4AF37] transition-colors">Visual Gallery</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#D4AF37] transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-center space-x-4">
                <MapPin size={16} className="text-[#D4AF37]" />
                <span>123 Luxury Ave, Manhattan, NY</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone size={16} className="text-[#D4AF37]" />
                <span>+91 1010101010</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={16} className="text-[#D4AF37]" />
                <span>vikramvicky8925@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Newsletter</h4>
            <p className="text-white/40 text-xs mb-6 uppercase tracking-widest">Subscribe for exclusive event invites</p>
            <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden p-1">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none text-xs px-4 py-2 outline-none flex-1 text-white"
              />
              <button className="bg-[#D4AF37] text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/20">
          <p>© 2024 Aura Dining Group. All rights reserved.</p>
          <div className="flex items-center space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
