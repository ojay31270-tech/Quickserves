"use client";
import React from 'react';
import { Navigation, MapPin, Phone, MessageSquare, ExternalLink } from 'lucide-react';

export default function LiveNavigator({ order }: { order: any }) {
    // Logic to open native Maps app
    const openNavigation = () => {
        const coords = order.delivery_coords; // e.g., "6.4589,3.6015"
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Current Task</p>
                    <h2 className="text-2xl font-black text-gray-900 italic uppercase leading-none">
                        Deliver to <br /> {order.customer_name}
                    </h2>
                </div>
                <div className="flex gap-2">
                    <button className="p-4 bg-gray-100 rounded-2xl text-gray-500 active:scale-90 transition-all">
                        <Phone size={20} />
                    </button>
                    <button className="p-4 bg-gray-100 rounded-2xl text-gray-500 active:scale-90 transition-all">
                        <MessageSquare size={20} />
                    </button>
                </div>
            </div>

            {/* --- THE ROUTE VISUALIZER --- */}
            <div className="relative pl-8 space-y-10 mb-10">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-gray-200" />

                <div className="relative">
                    <div className="absolute -left-8 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">Pickup Point</p>
                    <p className="text-sm font-bold text-gray-800">{order.vendor_name}</p>
                </div>

                <div className="relative">
                    <div className="absolute -left-8 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="text-blue-500" size={14} />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">Drop-off Point</p>
                    <p className="text-sm font-bold text-gray-800">{order.delivery_address}</p>
                </div>
            </div>

            {/* --- THE ACTION BUTTON --- */}
            <button
                onClick={openNavigation}
                className="w-full bg-gray-900 text-white py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all active:scale-95 mb-4"
            >
                <Navigation size={22} className="animate-pulse" />
                OPEN IN GOOGLE MAPS
            </button>

            <div className="flex items-center justify-center gap-2 text-gray-400">
                <ExternalLink size={14} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Redirects to External GPS</p>
            </div>
        </div>
    );
}