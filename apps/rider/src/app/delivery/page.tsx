"use client";
import React, { useState } from 'react';
import { MapPin, Navigation, Phone, CheckCircle, Wallet, Info } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function RiderDeliveryPage() {
    const [status, setStatus] = useState<'pickup' | 'delivering' | 'completed'>('pickup');

    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* 1. MOCK MAP BACKGROUND (In the real app, we'll use Google Maps here) */}
            <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                <div className="text-gray-300 font-black text-4xl opacity-20 rotate-[-45deg] uppercase">
                    GPS Live Tracking Active
                </div>
            </div>

            {/* 2. TOP FLOATING EARNINGS */}
            <div className="absolute top-6 left-6 right-6 z-20">
                <div className="bg-gray-900/90 backdrop-blur-md p-4 rounded-3xl flex justify-between items-center text-white shadow-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500 rounded-xl"><Wallet size={18} /></div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Today's Pay</p>
                            <p className="text-lg font-black">{formatNaira(8450)}</p>
                        </div>
                    </div>
                    <button className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-all">
                        <Info size={18} />
                    </button>
                </div>
            </div>

            {/* 3. DELIVERY BOTTOM SHEET (The "Action" Card) */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${status === 'pickup' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                {status === 'pickup' ? 'Collect From Vendor' : 'On the Way to Client'}
                            </span>
                            <h2 className="text-2xl font-black text-gray-800 mt-2">Order #Q-991</h2>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-full text-gray-400">
                            <Phone size={24} />
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className="space-y-6 mb-8">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full border-4 border-orange-500 bg-white" />
                                <div className="w-0.5 h-12 border-l-2 border-dashed border-gray-200" />
                                <MapPin className="text-blue-500" size={20} />
                            </div>
                            <div className="flex flex-col justify-between py-1">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Vendor</p>
                                    <p className="text-sm font-bold text-gray-800">Mama Cass - Lekki Branch</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase">Customer</p>
                                    <p className="text-sm font-bold text-gray-800">Victoria Island, Plot 14 (Reception)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => setStatus(status === 'pickup' ? 'delivering' : 'completed')}
                        className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${status === 'pickup' ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-blue-600 text-white shadow-blue-200'
                            }`}
                    >
                        {status === 'pickup' ? 'CONFIRM PICKUP' : 'MARK AS DELIVERED'}
                        <Navigation size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}