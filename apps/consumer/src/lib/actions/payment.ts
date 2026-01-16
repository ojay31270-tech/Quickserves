"use server";
import { supabase } from '@/lib/supabase';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

export async function initializePayment(orderData: { email: string; amount: number; metadata: any }) {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: orderData.email,
            amount: orderData.amount * 100, // Paystack uses kobo (100 kobo = 1 Naira)
            metadata: orderData.metadata,
            callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
        }),
    });

    const data = await response.json();
    if (!data.status) throw new Error(data.message);

    return data.data.authorization_url; // This is the link to the payment page
}