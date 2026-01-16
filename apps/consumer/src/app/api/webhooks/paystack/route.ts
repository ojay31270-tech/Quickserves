import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { event, data } = body;

    // Only proceed if payment was successful
    if (event === 'charge.success') {
        const { metadata, amount } = data;

        // 1. Create the Order in the DB
        const { error } = await supabase.from('orders').insert([{
            customer_email: data.customer.email,
            total_price: amount / 100,
            order_type: metadata.orderType, // 'on_demand' or 'subscription'
            status: 'pending', // Sent to Vendor instantly
            payment_status: 'paid'
        }]);

        if (!error) {
            return NextResponse.json({ status: 'Order Verified & Created' });
        }
    }

    return NextResponse.json({ status: 'ignored' });
}