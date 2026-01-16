"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    TrendingUp, Users, ShoppingCart,
    ChefHat, ArrowUpRight, Clock
} from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function VendorDashboard() {
    const [stats, setStats] = useState({ revenue: 0, customers: 0, orders: 0 });

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* --- STATS HEADER --- */}
            <div className="bg-gray-900 p-8 rounded-b-[3rem] text-white">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Earnings</p>
                <h1 className="text-4xl font-black mt-1 italic">{formatNaira(1250000)}</h1>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    <StatMini icon={<Users size={16} />} label="Subs" value="48" />
                    <StatMini icon={<ShoppingCart size={16} />} label="Orders" value="12" />
                    <StatMini icon={<TrendingUp size={16} />} label="Growth" value="+12%" />
                </div>
            </div>

            {/* --- LIVE KITCHEN MONITOR --- */}
            <section className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gray-800 italic uppercase">Kitchen Monitor</h2>
                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black animate-pulse">
                        LIVE
                    </div>
                </div>

                <div className="space-y-4">
                    <OrderCard
                        id="#9921"
                        customer="Alice"
                        item="Jollof Rice (Standard)"
                        status="PREPARING"
                        time="12:45 PM"
                    />
                    <OrderCard
                        id="#9922"
                        customer="John"
                        item="Amala + Abula (Premium)"
                        status="PENDING"
                        time="1:00 PM"
                    />
                </div>
            </section>

            {/* --- QUICK ACTIONS --- */}
            <section className="px-6 pb-10">
                <h2 className="text-xl font-black text-gray-800 italic uppercase mb-4">Manage Shop</h2>
                <div className="grid grid-cols-2 gap-4">
                    <ActionTile label="Menu Items" icon={<ChefHat />} color="bg-blue-500" />
                    <ActionTile label="Subscriptions" icon={<Users />} color="bg-purple-500" />
                </div>
            </section>
        </div>
    );
}

// --- Dashboard Sub-Components ---

function StatMini({ icon, label, value }: any) {
    return (
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <div className="text-primary mb-1">{icon}</div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">{label}</p>
            <p className="text-sm font-black">{value}</p>
        </div>
    );
}

function OrderCard({ id, customer, item, status, time }: any) {
    return (
        <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
                    <Clock size={24} />
                </div>
                <div>
                    <h4 className="font-black text-gray-800">{item}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                        Order {id} • {customer} • {time}
                    </p>
                </div>
            </div>
            <div className={`px-3 py-1 rounded-lg text-[10px] font-black ${status === 'PREPARING' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-500'}`}>
                {status}
            </div>
        </div>
    );
}

function ActionTile({ label, icon, color }: any) {
    return (
        <div className={`${color} p-6 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden group cursor-pointer active:scale-95 transition-all`}>
            <div className="relative z-10">
                <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4 italic font-bold">
                    {icon}
                </div>
                <p className="font-black italic uppercase text-sm tracking-tight">{label}</p>
            </div>
            <ArrowUpRight className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}