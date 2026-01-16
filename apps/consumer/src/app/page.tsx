"use client";
import React, { useState, useEffect } from 'react';
import {
  MapPin, ShoppingBag, User, Search,
  ChevronDown, SlidersHorizontal, Star,
  Zap, Navigation, RefreshCw, Bell, Clock, Filter
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import SubscriptionSelector from '@/components/SubscriptionSelector';
import AnimatedClockBanner from '@/components/AnimatedClockBanner'; // New
import VendorCard from '@/components/VendorCard'; // Import the VendorCard component

export default function ConsumerHomePage() {
  const [location, setLocation] = useState('Detecting...');
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [userInitials, setUserInitials] = useState('');
  const [vendors, setVendors] = useState<any[]>([]);

  useEffect(() => {
    const initApp = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata.full_name || '';
        const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
        setUserInitials(initials);
      }
      setLoading(false);
    };
    initApp();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      const { data } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setVendors(data);
    };
    fetchVendors();
  }, []);

  const detectLocation = () => {
    setLocation('Finding you...');
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation('Lagos, Nigeria');
    }, () => setLocation('Location Denied'));
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <RefreshCw className="text-primary animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 1. YOUR PROFESSIONAL HEADER (Preserved) */}
      <header className="bg-white px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex text-2xl font-black tracking-tighter">
            <span className="text-blue-500">Q</span>
            <span className="text-red-500">u</span>
            <span className="text-yellow-500">i</span>
            <span className="text-blue-500">c</span>
            <span className="text-green-500">k</span>
            <span className="text-red-500">S</span>
            <span className="text-blue-500">e</span>
            <span className="text-yellow-500">r</span>
            <span className="text-green-500">v</span>
            <span className="text-red-500">e</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-gray-100 rounded-xl">
              <ShoppingBag size={22} className="text-green-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1.5 rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {userInitials || <User size={20} />}
            </div>
          </div>
        </div>

        {/* Search & Location Bar */}
        <div className="flex gap-2">
          <button
            onClick={detectLocation}
            className="flex-1 flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-2xl text-left overflow-hidden"
          >
            <MapPin size={18} className="text-red-500 shrink-0" />
            <span className="text-sm font-semibold truncate">{location}</span>
            <ChevronDown size={14} className="text-gray-400 shrink-0" />
          </button>
          <button className="p-3 bg-green-600 text-white rounded-2xl shadow-lg shadow-green-100">
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* 2. THE NEW ANIMATED CLOCK BANNER (Replaces your old h-40 div) */}
      <section className="px-4 mt-2">
        <AnimatedClockBanner />
      </section>

      {/* 3. CATEGORIES: EXPLORE, POPULAR, FEATURED */}
      <section className="mt-8">
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-lg font-black text-gray-800 tracking-tight uppercase italic">Discover</h2>
          <button className="text-primary text-xs font-bold flex items-center gap-1">
            <Filter size={14} /> Filter
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar pb-2">
          <CategoryChip icon="🌍" label="Explore" active />
          <CategoryChip icon="🔥" label="Popular" />
          <CategoryChip icon="⭐" label="Featured" />
          <CategoryChip icon="🍲" label="Local" />
        </div>
      </section>

      {/* 4. SUBSCRIPTION SECTION (Moved here for better flow) */}
      <section className="mt-8 bg-gray-50 py-8">
        <div className="px-4 mb-6 text-center">
          <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase italic">The Special Meal</h2>
          <p className="text-xs text-gray-500 font-bold">SUBSCRIPTION PLANS FOR YOU</p>
        </div>
        <SubscriptionSelector />
      </section>

      {/* 5. VENDOR LIST (Replaced with dynamic content) */}
      <section className="px-4 py-8 space-y-4">
        <h2 className="text-lg font-black text-gray-800 tracking-tight uppercase italic">Top Rated Vendors</h2>
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              name={vendor.name}
              tags={[vendor.category]}
              rating={vendor.rating}
              time="25 min"
              image={vendor.image_url}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-400 font-bold italic">No vendors online yet...</div>
        )}
      </section>
    </div>
  );
}

function CategoryChip({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${active ? 'bg-primary text-white border-primary shadow-orange-100' : 'bg-white text-gray-500 border-gray-100'
      }`}>
      <span>{icon}</span> {label}
    </button>
  );
}