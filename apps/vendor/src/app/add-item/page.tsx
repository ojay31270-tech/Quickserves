"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PackagePlus, Upload, Check } from 'lucide-react';

export default function VendorAddItem() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    const handleSave = async () => {
        setStatus('saving');
        // Save to the 'vendors' or a new 'menu_items' table
        const { error } = await supabase.from('menu_items').insert([
            { name, price: parseInt(price), vendor_id: 'YOUR_VENDOR_ID' }
        ]);

        if (!error) setStatus('success');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-md mx-auto space-y-6">
                <h1 className="text-2xl font-black text-gray-800 italic uppercase">Add New Menu Item</h1>

                <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4">
                    <div className="h-40 bg-gray-100 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                        <Upload size={32} />
                        <p className="text-xs font-bold mt-2 uppercase">Upload Food Image</p>
                    </div>

                    <input
                        placeholder="Item Name (e.g. Jollof Rice)"
                        className="w-full bg-gray-50 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        placeholder="Price (₦)"
                        type="number"
                        className="w-full bg-gray-50 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <button
                        onClick={handleSave}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
                    >
                        {status === 'saving' ? 'Processing...' : status === 'success' ? <><Check /> Saved!</> : 'LIST ITEM'}
                    </button>
                </div>
            </div>
        </div>
    );
}