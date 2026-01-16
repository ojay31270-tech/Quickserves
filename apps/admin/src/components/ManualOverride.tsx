"use client";
import React from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, RefreshCcw } from 'lucide-react';

export default function ManualOverride({ orderId }: { orderId: string }) {
    const forceUpdate = async (status: string) => {
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId);

        if (!error) alert(`Order ${orderId} forced to ${status}`);
    };

    return (
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-600">
                <ShieldAlert size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Admin Override</span>
            </div>
            <div className="flex gap-2">
                <button onClick={() => forceUpdate('ready')} className="text-[10px] bg-white px-3 py-1 rounded-lg border border-red-200 font-bold">SET READY</button>
                <button onClick={() => forceUpdate('delivered')} className="text-[10px] bg-red-600 text-white px-3 py-1 rounded-lg font-bold">FORCE DELIVERED</button>
            </div>
        </div>
    );
}