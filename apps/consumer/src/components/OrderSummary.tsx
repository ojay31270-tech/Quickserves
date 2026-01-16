"use client";
import React, { useState } from 'react';
import {
    ClipboardCheck, Download, Mail, MapPin,
    Calendar, Receipt, CreditCard, ChevronRight
} from 'lucide-react';
import { formatNaira } from '@/lib/utils'; // Simple helper for ₦ formatting

export default function OrderSummary({ order }: { order: any }) {
    const [address, setAddress] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    return (
        <div className="max-w-md mx-auto pb-24 animate-in slide-in-from-bottom-4 duration-500">
            {/* 1. Plan Header (Preserving your Flutter Gradient) */}
            <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C00] p-6 rounded-3xl text-white shadow-xl shadow-orange-200 m-4">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                            <Receipt size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight">
                                {order.planFullName}
                            </h2>
                            <p className="text-sm opacity-90">{order.duration} Subscription</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black">{formatNaira(order.totalPrice)}</p>
                        <div className="bg-white/20 px-2 py-0.5 rounded-lg text-[10px] font-bold mt-1 uppercase">
                            +{formatNaira(order.cashback)} back
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Schedule & Meals */}
            <div className="px-4 space-y-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="text-primary" size={20} />
                        <h3 className="font-bold text-gray-800">Schedule Details</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Start Date</span>
                            <span className="font-bold">{new Date(order.startDate).toDateString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {order.selectedSessions.map((s: string) => (
                                <span key={s} className="bg-orange-50 text-primary text-[10px] font-black uppercase px-3 py-1.5 rounded-full border border-orange-100">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Delivery Address (Interactive Input) */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="text-primary" size={20} />
                        <h3 className="font-bold text-gray-800">Delivery Address</h3>
                    </div>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your full home or office address..."
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary h-24 transition-all"
                    />
                </div>

                {/* 4. Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-4 border-2 border-primary text-primary rounded-2xl font-bold text-sm hover:bg-orange-50 transition-colors">
                        <Download size={18} /> Download
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 border-2 border-primary text-primary rounded-2xl font-bold text-sm hover:bg-orange-50 transition-colors">
                        <Mail size={18} /> Email Me
                    </button>
                </div>
            </div>

            {/* 5. Fixed Bottom "Subscribe" Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <button
                    disabled={!address || isProcessing}
                    className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-[0.98]"
                >
                    {isProcessing ? "Processing..." : "SUBSCRIBE NOW!"}
                    {!isProcessing && <ChevronRight size={24} />}
                </button>
            </div>
        </div>
    );
}