import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, MapPin, User, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const OrderPage = () => {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Cart, 2: Details, 3: Success
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const handleCheckout = async (data: any) => {
    try {
      const orderData = {
        customerName: data.name,
        email: data.email,
        address: data.address,
        items: cart.map(item => ({
          foodId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        setStep(3);
        clearCart();
        toast.success('Gourmet order placed successfully!');
      } else {
        throw new Error('Failed to place order');
      }
    } catch (err) {
      toast.error('Checkout failed. Please try again.');
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="pt-48 pb-24 px-6 text-center">
        <ShoppingBag size={80} className="mx-auto text-white/10 mb-8" />
        <h2 className="text-4xl font-serif text-white mb-4">Your Cart is Empty</h2>
        <p className="text-white/40 mb-12 uppercase tracking-widest text-xs">Indulge in our menu and fill your journey</p>
        <a href="/menu" className="px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-all">
          Explore Menu
        </a>
      </div>
    );
  }

  if (step === 3) {
     return (
        <div className="h-screen flex items-center justify-center bg-[#050505] px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl max-w-lg w-full"
          >
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full mx-auto mb-6 flex items-center justify-center">
               <ShoppingBag className="text-black" size={32} />
            </div>
            <h2 className="text-4xl font-serif text-white mb-4">Preparation Started</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Your order has been received. Our chefs are preparing your gourmet meal 
              with meticulous care. We will notify you when it's on the way.
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
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Column: Cart Items or Details */}
        <div className="flex-[2] space-y-8">
          <div className="flex items-center space-x-6 mb-8">
             <button 
               onClick={() => setStep(1)}
               className={`text-xs uppercase tracking-[0.3em] pb-2 border-b-2 transition-all ${step === 1 ? 'border-[#D4AF37] text-white' : 'border-transparent text-white/30'}`}
             >
               01. Your Selection
             </button>
             <button 
               onClick={() => setStep(2)}
               disabled={cart.length === 0}
               className={`text-xs uppercase tracking-[0.3em] pb-2 border-b-2 transition-all ${step === 2 ? 'border-[#D4AF37] text-white' : 'border-transparent text-white/30'}`}
             >
               02. Delivery Details
             </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-6 bg-white/5 border border-white/10 p-4 rounded-2xl group hover:border-[#D4AF37]/30 transition-all">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-serif text-white">{item.name}</h3>
                        <span className="text-[#D4AF37] font-mono text-lg">${item.price * item.quantity}</span>
                      </div>
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-4">{item.category}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 bg-black/40 px-3 py-1 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-[#D4AF37]"><Minus size={14} /></button>
                          <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-[#D4AF37]"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
                           <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
              >
                 <form id="checkout-form" onSubmit={handleSubmit(handleCheckout)} className="space-y-6">
                    <div className="space-y-4">
                       <label className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                          <User size={14} /> <span>Recipent Name</span>
                       </label>
                       <input 
                         {...register('name', { required: true })}
                         type="text" 
                         placeholder="Full Name" 
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white"
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                          <Mail size={14} /> <span>Email Address</span>
                       </label>
                       <input 
                         {...register('email', { required: true })}
                         type="email" 
                         placeholder="email@example.com" 
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white"
                       />
                    </div>
                    <div className="space-y-4">
                       <label className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                          <MapPin size={14} /> <span>Delivery Address</span>
                       </label>
                       <textarea 
                         {...register('address', { required: true })}
                         rows={4}
                         placeholder="Street, Building, Unit Number, City, ZIP" 
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37] outline-none transition-all text-white resize-none"
                       />
                    </div>
                 </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Summary */}
        <div className="flex-1 h-fit">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl sticky top-32">
             <h3 className="text-2xl font-serif text-white mb-8">Order Summary</h3>
             <div className="space-y-4 mb-8 border-b border-white/10 pb-8">
                <div className="flex justify-between text-sm text-white/60">
                   <span>Subtotal</span>
                   <span>${total}</span>
                </div>
                <div className="flex justify-between text-sm text-white/60">
                   <span>Gourmet Fee</span>
                   <span>$12</span>
                </div>
                <div className="flex justify-between text-sm text-white/60">
                   <span>Service Tax (8%)</span>
                   <span>${(total * 0.08).toFixed(2)}</span>
                </div>
             </div>
             <div className="flex justify-between text-2xl font-serif text-[#D4AF37] mb-12">
                <span>Total</span>
                <span>${(total + 12 + total * 0.08).toFixed(2)}</span>
             </div>

             {step === 1 ? (
                <button 
                   onClick={() => setStep(2)}
                   className="w-full py-5 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-[0.3em] rounded-xl hover:bg-white transition-all flex items-center justify-center space-x-3"
                >
                   <span>Proceed to Details</span>
                </button>
             ) : (
                <button 
                   form="checkout-form"
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full py-5 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-[0.3em] rounded-xl hover:bg-white transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                   {isSubmitting ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <>
                      <CreditCard size={16} />
                      <span>Place Order</span>
                   </>}
                </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
