"use client";
import React, { useEffect, useState } from 'react';
import { Activity, Users, Truck, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatNaira } from '@/lib/utils';

export default function AdminOperations() {
    const [stats, setStats] = useState({ orders: 0, revenue: 0, activeRiders: 0 });

    return (
        <div className="min-h-screen bg-[#1A1A1A] text-white p-8">
            {/* --- COMMAND HEADER --- */}
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black text-[#FFD700] italic uppercase tracking-tighter">
                        Operations <br /> <span className="text-[#FF6B00]">Command</span>
                    </h1>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">
                        Real-Time Platform Oversight • Ilorin, Nigeria
                    </p>
                </div>
                <div className="bg-[#FFD700] text-black px-6 py-4 rounded-[2rem] font-black italic flex items-center gap-2">
                    <Activity size={20} className="animate-pulse" /> LIVE
                </div>
            </header>

            {/* --- KPI TILES --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-black/40 border border-[#FFD700]/20 p-8 rounded-[3rem] relative overflow-hidden group">
                    <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-[#FFD700]/5 group-hover:text-[#FFD700]/10 transition-all" />
                    <p className="text-[#FFD700] font-black uppercase text-[10px] tracking-widest mb-1">Total Revenue (Gross)</p>
                    <h2 className="text-4xl font-black italic">{formatNaira(145000)}</h2>
                </div>

                <div className="bg-black/40 border border-[#FF6B00]/20 p-8 rounded-[3rem] relative overflow-hidden group">
                    <ShoppingBag className="absolute -right-4 -bottom-4 w-32 h-32 text-[#FF6B00]/5 group-hover:text-[#FF6B00]/10 transition-all" />
                    <p className="text-[#FF6B00] font-black uppercase text-[10px] tracking-widest mb-1">Active Subscriptions</p>
                    <h2 className="text-4xl font-black italic">42</h2>
                </div>

                <div className="bg-black/40 border border-white/10 p-8 rounded-[3rem] relative overflow-hidden group">
                    <Truck className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 group-hover:text-white/10 transition-all" />
                    <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-1">Riders Online</p>
                    <h2 className="text-4xl font-black italic">12</h2>
                </div>
            </div>

            {/* --- LIVE ORDER FEED --- */}
            <div className="bg-black/60 rounded-[3rem] border border-white/5 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tight">Recent Activity Log</h3>
                    <button className="text-[#FFD700] font-bold text-[10px] uppercase border-b border-[#FFD700]/40">View All Logs</button>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <p className="font-black italic uppercase text-sm">Order #QS-440{item} Picked Up</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">Rider: Yusuf A. • 2 mins ago</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-black italic text-[#FFD700]">{formatNaira(2500)}</p>
                                <span className="text-[9px] font-black bg-white/10 px-2 py-1 rounded text-gray-400 uppercase">IN TRANSIT</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}