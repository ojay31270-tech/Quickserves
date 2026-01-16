"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, MapPin, ArrowRight, Home } from 'lucide-react';
import Confetti from 'react-confetti'; // Install with: npm install react-confetti
import { useWindowSize } from 'react-use'; // Install with: npm install react-use

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    // Stop confetti after 5 seconds to save battery
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

            {/* --- SUCCESS ICON --- */}
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-[2.5rem] flex items-center justify-center text-green-600 animate-bounce">
                    <CheckCircle2 size={48} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white text-[10px] font-black">
                    OK
                </div>
            </div>

            {/* --- CONTENT --- */}
            <h1 className="text-3xl font-black text-gray-900 italic uppercase leading-tight">
                Payment <br /><span className="text-primary">Successful!</span>
            </h1>
            <p className="mt-4 text-gray-500 font-medium max-w-[250px]">
                Your order has been auto-verified. The kitchen is now preparing your meal.
            </p>

            {/* --- TRACKING CARD --- */}
            <div className="w-full max-w-sm mt-10 bg-gray-50 rounded-[2.5rem] p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-left">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estimated Arrival</p>
                        <p className="text-xl font-black text-gray-800 italic">25 - 35 MINS</p>
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-primary">
                        <Package size={24} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-left">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-xs font-bold text-gray-700">Kitchen is preparing your Jollof Rice</p>
                    </div>
                    <div className="flex items-center gap-3 text-left opacity-50">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        <p className="text-xs font-bold text-gray-400">Rider will be assigned shortly</p>
                    </div>
                </div>
            </div>

            {/* --- ACTIONS --- */}
            <div className="w-full max-w-sm mt-10 space-y-3">
                <button
                    onClick={() => router.push('/profile')}
                    className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
                >
                    TRACK MY ORDER <ArrowRight size={20} />
                </button>

                <button
                    onClick={() => router.push('/')}
                    className="w-full bg-white text-gray-400 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:text-gray-600 transition-all"
                >
                    <Home size={18} /> BACK TO HOME
                </button>
            </div>
        </div>
    );
}