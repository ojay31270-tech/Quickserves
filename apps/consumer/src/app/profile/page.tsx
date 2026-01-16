"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    User, Package, Calendar, Settings,
    ChevronRight, LogOut, Star, Clock
} from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'orders' | 'subscriptions'>('orders');
    const [history, setHistory] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (authUser) {
                setUser(authUser);
                // Fetch combined history
                const { data } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('customer_email', authUser.email)
                    .order('created_at', { ascending: false });
                if (data) setHistory(data);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/auth/login';
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* --- 1. PROFILE HEADER --- */}
            <section className="bg-gray-900 pt-16 pb-12 px-6 rounded-b-[3.5rem] text-white">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-orange-600 rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-xl shadow-orange-900/50">
                        {user?.email?.[0].toUpperCase() || <User />}
                    </div>
                    <div>
                        <h1 className="text-2xl font-black italic uppercase tracking-tight">
                            {user?.user_metadata?.full_name || 'QuickServe User'}
                        </h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 2. STATS OVERVIEW --- */}
            <div className="px-6 -mt-6">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-100 flex justify-between border border-gray-100">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase">Orders</p>
                        <p className="text-lg font-black text-gray-800">{history.length}</p>
                    </div>
                    <div className="w-px h-10 bg-gray-100" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase">Cashback</p>
                        <p className="text-lg font-black text-green-500">{formatNaira(2450)}</p>
                    </div>
                    <div className="w-px h-10 bg-gray-100" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase">Rank</p>
                        <p className="text-lg font-black text-primary">Gold</p>
                    </div>
                </div>
            </div>

            {/* --- 3. TABS: ORDERS VS SUBSCRIPTIONS --- */}
            <section className="mt-10 px-6">
                <div className="flex gap-4 p-1.5 bg-gray-100 rounded-2xl mb-6">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                    >
                        Recent Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('subscriptions')}
                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'subscriptions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                    >
                        Special Meals
                    </button>
                </div>

                {/* --- 4. DYNAMIC HISTORY LIST --- */}
                <div className="space-y-4">
                    {history
                        .filter(item => activeTab === 'orders' ? item.order_type === 'on_demand' : item.order_type === 'subscription')
                        .map((item) => (
                            <HistoryCard key={item.id} item={item} />
                        ))}

                    {history.length === 0 && (
                        <div className="text-center py-20">
                            <Package className="mx-auto text-gray-200 mb-4" size={48} />
                            <p className="text-gray-400 font-bold italic uppercase text-xs">No activity found yet</p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- 5. LOGOUT BUTTON --- */}
            <div className="px-6 mt-10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-6 bg-red-50 text-red-600 rounded-[2rem] font-black italic uppercase transition-all active:scale-95"
                >
                    <span>Sign Out of QuickServe</span>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
}

// --- Sub-Component: History Card ---
function HistoryCard({ item }: any) {
    return (
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.order_type === 'subscription' ? 'bg-orange-50 text-primary' : 'bg-blue-50 text-blue-600'}`}>
                    {item.order_type === 'subscription' ? <Calendar size={24} /> : <Package size={24} />}
                </div>
                <div>
                    <h4 className="font-black text-gray-800 text-sm italic uppercase">{item.meal_item || 'Quick Order'}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            {new Date(item.created_at).toLocaleDateString()}
                        </span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className={`text-[10px] font-black uppercase ${item.status === 'delivered' ? 'text-green-500' : 'text-primary animate-pulse'}`}>
                            {item.status}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-black text-gray-800">{formatNaira(item.total_price)}</p>
                <ChevronRight size={16} className="text-gray-300 ml-auto mt-1" />
            </div>
        </div>
    );
}