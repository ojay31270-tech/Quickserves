"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    TrendingUp, Star, Bike, ChevronRight,
    Wallet, Calendar, Award, Zap
} from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function RiderEarningsPage({ riderId }: { riderId: string }) {
    const [stats, setStats] = useState({
        totalEarnings: 0,
        tripsToday: 0,
        rating: 4.9,
        acceptanceRate: '98%'
    });

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* --- 1. HERO EARNINGS CARD --- */}
            <section className="bg-gray-900 pt-16 pb-20 px-6 rounded-b-[3.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <Zap size={200} className="text-primary" />
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Today's Revenue</p>
                    <h1 className="text-5xl font-black text-white italic tracking-tighter">
                        {formatNaira(8450)}
                    </h1>
                    <div className="flex gap-3 mt-6">
                        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-white tracking-tight">Active Shift</span>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-2xl text-xs font-black shadow-lg shadow-orange-900/50">
                            WITHDRAW
                        </button>
                    </div>
                </div>
            </section>

            {/* --- 2. PERFORMANCE GRID --- */}
            <div className="px-6 -mt-10">
                <div className="grid grid-cols-2 gap-4">
                    <PerformanceTile
                        icon={<Bike className="text-blue-500" />}
                        label="Trips Today"
                        value="14"
                        sub="Goal: 20"
                    />
                    <PerformanceTile
                        icon={<Star className="text-yellow-400 fill-yellow-400" />}
                        label="Service Rating"
                        value="4.92"
                        sub="Top 5% Rider"
                    />
                </div>
            </div>

            {/* --- 3. WEEKLY ACTIVITY CHART (Placeholder for Visual) --- */}
            <section className="mt-10 px-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black text-gray-800 uppercase italic tracking-tight">Weekly Activity</h2>
                    <Calendar size={18} className="text-gray-400" />
                </div>
                <div className="bg-gray-50 h-32 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-end justify-between p-6 gap-2">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} className="w-full bg-primary/20 rounded-t-lg relative group">
                            <div
                                className="bg-primary rounded-t-lg transition-all duration-700"
                                style={{ height: `${h}%` }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 4. RECENT TRIPS LIST --- */}
            <section className="mt-10 px-6">
                <h2 className="text-lg font-black text-gray-800 uppercase italic tracking-tight mb-6">Trip History</h2>
                <div className="space-y-4">
                    <TripItem id="Q-882" amount={500} time="10:45 AM" status="Paid" />
                    <TripItem id="Q-881" amount={750} time="09:12 AM" status="Paid" />
                    <TripItem id="Q-880" amount={500} time="08:30 AM" status="Paid" />
                </div>
            </section>
        </div>
    );
}

// --- Sub-Components ---

function PerformanceTile({ icon, label, value, sub }: any) {
    return (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100">
            <div className="mb-3">{icon}</div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</p>
            <h3 className="text-xl font-black text-gray-800 mt-1">{value}</h3>
            <p className="text-[10px] font-bold text-primary mt-1 italic">{sub}</p>
        </div>
    );
}

function TripItem({ id, amount, time, status }: any) {
    return (
        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-gray-100 group active:scale-95 transition-all">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <TrendingUp size={18} className="text-green-500" />
                </div>
                <div>
                    <p className="text-sm font-black text-gray-800 italic uppercase">Order {id}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{time} • {status}</p>
                </div>
            </div>
            <p className="text-lg font-black text-gray-800 tracking-tighter">{formatNaira(amount)}</p>
        </div>
    );
}