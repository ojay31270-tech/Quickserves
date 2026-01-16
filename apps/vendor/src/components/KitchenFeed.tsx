"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ChefHat, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function KitchenFeed({ vendorId }: { vendorId: string }) {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        // 1. Initial Fetch of today's pending orders
        const fetchOrders = async () => {
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('vendor_id', vendorId)
                .eq('status', 'pending');
            if (data) setOrders(data);
        };

        fetchOrders();

        // 2. Realtime Listener for New Incoming Orders
        const channel = supabase
            .channel('kitchen_orders')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders', filter: `vendor_id=eq.${vendorId}` },
                (payload) => {
                    setOrders((current) => [payload.new, ...current]);
                    // Play a sound for the kitchen staff
                    new Audio('/order-alert.mp3').play().catch(() => { });
                }
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [vendorId]);

    const markAsPreparing = async (orderId: string) => {
        await supabase.from('orders').update({ status: 'preparing' }).eq('id', orderId);
        setOrders(orders.filter(o => o.id !== orderId));
    };

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 mb-6">
                <ChefHat className="text-primary" />
                <h2 className="text-xl font-black uppercase italic">Pending Orders ({orders.length})</h2>
            </div>

            {orders.length === 0 ? (
                <div className="bg-gray-50 rounded-3xl p-10 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold italic">No orders in queue...</p>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-100 shadow-sm flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${order.order_type === 'subscription' ? 'bg-orange-100 text-primary' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {order.order_type}
                                </span>
                                <h3 className="text-lg font-black text-gray-800">{order.meal_item}</h3>
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                                + {order.protein_option} • {order.customer_name}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-2 font-medium">
                                <MapPin size={12} /> {order.delivery_address}
                            </div>
                        </div>

                        <button
                            onClick={() => markAsPreparing(order.id)}
                            className="bg-green-600 text-white p-4 rounded-2xl shadow-lg shadow-green-100 active:scale-95 transition-all"
                        >
                            <CheckCircle size={24} />
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}