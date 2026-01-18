"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Package, Navigation, CheckCircle, Navigation2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RiderDeliveryTask() {
    const [status, setStatus] = useState('accepted'); // accepted, picked_up, delivered
    const [loading, setLoading] = useState(false);

    const updateStatus = async (newStatus: string) => {
        setLoading(true);
        // Logic updates your 'orders' table in the 7-table master schema
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .match({ id: 'current_order_id' }); // This would come from the URL params

        if (!error) setStatus(newStatus);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            {/* --- TASK HEADER --- */}
            <header className="pt-10 mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black text-[#FFD700] italic uppercase tracking-tighter">
                        Active <br /> <span className="text-white">Delivery</span>
                    </h1>
                    <p className="text-[#FFD700]/60 text-[10px] font-bold uppercase tracking-widest mt-2">
                        Order #QS-9921
                    </p>
                </div>
                <div className="bg-[#FF6B00] px-4 py-2 rounded-2xl font-black text-[10px] uppercase italic">
                    Live Now
                </div>
            </header>

            {/* --- MAP NAVIGATION BRIDGE --- */}
            <div className="bg-zinc-900 rounded-[2.5rem] p-6 border border-white/5 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center text-black">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Pickup From</p>
                            <p className="font-black text-white uppercase italic">Quickser Kitchen</p>
                        </div>
                    </div>
                    <button className="p-4 bg-white/5 rounded-2xl text-[#FFD700]">
                        <Navigation2 size={24} />
                    </button>
                </div>

                <div className="w-full h-px bg-white/5 my-4" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-white">
                            <Navigation size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Deliver To</p>
                            <p className="font-black text-white uppercase italic">Oko Erin, Ilorin</p>
                        </div>
                    </div>
                    <button className="p-4 bg-white/5 rounded-2xl text-[#FF6B00]">
                        <Phone size={24} />
                    </button>
                </div>
            </div>

            {/* --- ORDER DETAILS --- */}
            <div className="bg-zinc-900 rounded-[2.5rem] p-6 border border-white/5 mb-8">
                <h3 className="text-[#FFD700] font-black italic uppercase text-xs mb-4 flex items-center gap-2">
                    <Package size={16} /> Item Details
                </h3>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-black italic uppercase text-white">1x Special Beef Plan</p>
                    <p className="text-[#FFD700] font-black italic">₦2,500</p>
                </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="fixed bottom-10 left-6 right-6">
                {status === 'accepted' && (
                    <button
                        onClick={() => updateStatus('picked_up')}
                        className="w-full bg-[#FFD700] text-black py-6 rounded-[2.5rem] font-black text-lg shadow-2xl active:scale-95 transition-all"
                    >
                        CONFIRM PICKUP
                    </button>
                )}
                {status === 'picked_up' && (
                    <button
                        onClick={() => updateStatus('delivered')}
                        className="w-full bg-green-500 text-white py-6 rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all"
                    >
                        <CheckCircle size={24} /> MARK DELIVERED
                    </button>
                )}
            </div>
        </div>
    );
}