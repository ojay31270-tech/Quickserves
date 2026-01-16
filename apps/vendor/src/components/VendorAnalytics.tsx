"use client";
import React from 'react';
import { BarChart3, TrendingUp, Award, Users } from 'lucide-react';

export default function VendorAnalysis({ data }: any) {
    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl">Business Analysis</h2>

            {/* 1. TOP SELLING MEALS */}
            <div className="bg-black/20 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                    <Award className="text-[#FFD700]" />
                    <h3 className="text-sm">Best Sellers</h3>
                </div>
                <div className="space-y-4">
                    <ProgressBar label="Jollof Rice Special" value={85} />
                    <ProgressBar label="Poundo & Egusi" value={65} />
                    <ProgressBar label="Catfish Pepper Soup" value={40} />
                </div>
            </div>

            {/* 2. CUSTOMER LOYALTY */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-5 rounded-[2rem] text-center">
                    <Users size={20} className="mx-auto mb-2 text-[#FFD700]" />
                    <p className="text-[10px] uppercase font-bold text-white/60">New Subs</p>
                    <p className="text-xl font-black">+12</p>
                </div>
                <div className="bg-black/20 p-5 rounded-[2rem] text-center">
                    <TrendingUp size={20} className="mx-auto mb-2 text-green-400" />
                    <p className="text-[10px] uppercase font-bold text-white/60">Revenue</p>
                    <p className="text-xl font-black">24% ↑</p>
                </div>
            </div>
        </div>
    );
}

function ProgressBar({ label, value }: { label: string, value: number }) {
    return (
        <div>
            <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#FFD700]" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}