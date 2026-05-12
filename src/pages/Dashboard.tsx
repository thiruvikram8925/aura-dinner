import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Users, UtensilsCrossed, MessageSquare, 
  TrendingUp, ArrowDownToLine, Trash2, Check, X,
  Settings, LayoutDashboard, Utensils, Clock
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then(res => res.json()),
      fetch('/api/reservations').then(res => res.json()),
      fetch('/api/reviews').then(res => res.json())
    ]).then(([ordersData, resData, reviewsData]) => {
      setOrders(ordersData);
      setReservations(resData);
      setReviews(reviewsData);
    });
  }, []);

  const stats = [
    { label: 'Revenue', value: '$24,840', icon: TrendingUp, color: '#C5A028', trend: '+12%' },
    { label: 'Orders', value: orders.length, icon: UtensilsCrossed, color: '#C5A028', trend: '+5%' },
  ];

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Nav Rail Sidebar */}
      <aside className="nav-rail flex-shrink-0 space-y-8 hidden md:flex">
        <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center font-serif text-xl italic text-gold mb-8">É</div>
        <div className="flex flex-col space-y-8 opacity-40">
           {[LayoutDashboard, UtensilsCrossed, Users, Utensils, MessageSquare, Settings].map((Icon, idx) => (
             <button 
               key={idx} 
               onClick={() => setActiveTab(['Overview', 'Orders', 'Reservations', 'Menu Editor', 'Reviews', 'Settings'][idx])}
               className={`p-2 transition-colors hover:text-gold ${activeTab === ['Overview', 'Orders', 'Reservations', 'Menu Editor', 'Reviews', 'Settings'][idx] ? 'text-gold opacity-100' : 'text-white'}`}
             >
               <Icon size={20} />
             </button>
           ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-10 flex flex-col">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold/60 font-semibold mb-1">Management Dashboard</span>
            <h1 className="font-serif text-4xl italic text-white">L'Élite Gastronomie</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest opacity-40">Live Status</p>
              <p className="text-xs font-semibold text-green-500">Operational 98.4%</p>
            </div>
            <button className="px-6 py-2 rounded-full border border-gold/30 text-[10px] uppercase tracking-widest text-gold hover:bg-gold/10 transition-colors">
              Export to Excel
            </button>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="bento-grid flex-grow h-full">
          {/* Main Hero Card */}
          <div className="col-span-12 lg:col-span-8 row-span-7 glass p-8 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Featured Special</span>
              <h2 className="text-5xl font-serif mt-4 mb-6 leading-tight italic">Truffle Infused<br/>Kobe Medallion</h2>
              <div className="flex items-center space-x-12">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-40 tracking-widest mb-1">Prep Time</span>
                  <span className="text-sm font-medium">45 Mins</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase opacity-40 tracking-widest mb-1">Daily Demand</span>
                  <span className="text-sm font-medium text-gold">High</span>
                </div>
              </div>
            </div>
            {/* Visual Decoration */}
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-gold/10 flex items-center justify-center pointer-events-none opacity-20 lg:opacity-100">
               <div className="w-64 h-64 rounded-full border border-gold/20 flex items-center justify-center p-8 bg-gradient-to-tr from-neutral-900 to-neutral-800 shadow-2xl">
                 <div className="w-full h-full rounded-full bg-gold/5 animate-pulse"></div>
               </div>
            </div>
          </div>

          {/* Real-time Orders Card */}
          <div className="col-span-12 lg:col-span-4 row-span-9 glass p-8 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/60">Live Orders</h3>
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            </div>
            <div className="space-y-4 overflow-y-auto flex-grow pr-2 custom-scrollbar">
              {orders.slice(0, 4).map((order: any, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border-l-4 border-gold group hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex justify-between text-[10px] mb-2">
                    <span className="font-bold opacity-40 uppercase tracking-widest">Order #{order._id?.slice(-4)}</span>
                    <span className="opacity-40">Recently</span>
                  </div>
                  <p className="text-sm font-serif italic mb-1">{order.customerName}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{order.items.length} Items Selected</p>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="py-20 text-center opacity-20 italic font-serif">Awaiting orders...</div>
              )}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <button className="w-full py-4 bg-gold text-black font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all">
                Full Systems Access
              </button>
            </div>
          </div>

          {/* Revenue Stat Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-3 glass p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Financial Peak</h3>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp size={16} className="text-green-500" />
              </div>
            </div>
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="text-4xl font-serif font-light">$24,840</span>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">+12.4%</span>
            </div>
            <div className="h-8 w-full flex items-end space-x-1.5 opacity-40">
              {[30, 50, 40, 70, 90, 60, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-gold rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          {/* Mini Info Card 1 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 glass p-6 flex items-center space-x-6">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center font-serif text-2xl text-gold border border-gold/10">
              {reservations.length}
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-40 tracking-[0.2em] font-bold">Reservations</p>
              <p className="text-sm font-semibold uppercase tracking-widest">Active Today</p>
            </div>
          </div>

          {/* Mini Info Card 2 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 glass p-6 flex items-center space-x-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
              <Clock size={18} className="text-white/40" />
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-40 tracking-[0.2em] font-bold">Arrival Pace</p>
              <p className="text-sm font-semibold uppercase tracking-widest">Fast Flow</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
