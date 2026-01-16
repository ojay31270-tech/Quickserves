"use client";
import React, { useState } from 'react';
import { Camera, Save, Store, UtensilsCrossed } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function VendorProfileSetup() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Special Meals',
    });

    const handleSave = async () => {
        setLoading(true);
        // Logic to save to your 7-table master schema
        const { error } = await supabase
            .from('vendors')
            .upsert({
                name: formData.name,
                description: formData.description,
                category: formData.category
            });

        setLoading(false);
        if (!error) alert("Profile Live!");
    };

    return (
        <div className="min-h-screen bg-[#FF6B00] p-6">
            <header className="mb-10 pt-8">
                <h1 className="text-4xl font-black text-[#FFD700] italic uppercase tracking-tighter">
                    Kitchen <br /> <span className="text-white">Identity</span>
                </h1>
            </header>

            <div className="space-y-6">
                {/* LOGO UPLOAD SECTION */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="w-full h-full rounded-[2.5rem] bg-black/20 border-2 border-[#FFD700] flex items-center justify-center overflow-hidden">
                        <Store size={40} className="text-[#FFD700] opacity-50" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl text-[#FF6B00]">
                        <Camera size={20} />
                    </button>
                </div>

                {/* INPUT FIELDS */}
                <div className="space-y-4">
                    <div className="bg-black/10 p-4 rounded-3xl border border-white/10">
                        <label className="text-[10px] font-bold text-[#FFD700] uppercase ml-2">Restaurant Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Quickser Special Kitchen"
                            className="w-full bg-transparent text-white font-bold p-2 outline-none placeholder:text-white/20"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="bg-black/10 p-4 rounded-3xl border border-white/10">
                        <label className="text-[10px] font-bold text-[#FFD700] uppercase ml-2">Category</label>
                        <select
                            className="w-full bg-transparent text-white font-bold p-2 outline-none appearance-none"
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option className="bg-[#FF6B00]">Special Meals</option>
                            <option className="bg-[#FF6B00]">Intercontinental</option>
                            <option className="bg-[#FF6B00]">Local Delicacies</option>
                        </select>
                    </div>

                    <div className="bg-black/10 p-4 rounded-[2rem] border border-white/10">
                        <label className="text-[10px] font-bold text-[#FFD700] uppercase ml-2">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Tell customers about your kitchen..."
                            className="w-full bg-transparent text-white font-bold p-2 outline-none placeholder:text-white/20 resize-none"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* SAVE BUTTON */}
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-[#FFD700] text-[#FF6B00] py-6 rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all mt-8"
                >
                    {loading ? "SYNCING..." : <><Save size={20} /> LAUNCH KITCHEN</>}
                </button>
            </div>
        </div>
    );
}