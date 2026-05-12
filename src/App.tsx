/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartProvider } from './contexts/CartContext';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import OrderPage from './pages/OrderPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import About from './pages/About';
import Reviews from './pages/Reviews';

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="text-[#D4AF37] animate-pulse tracking-[0.5em] uppercase text-xs">Aura Dining</div>
  </div>
);

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#050505]">
          <Navbar />
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #D4AF37',
            }
          }} />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/cart" element={<OrderPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/reviews" element={<Reviews />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

