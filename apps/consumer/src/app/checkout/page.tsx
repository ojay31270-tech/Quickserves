"use client";
import React, { useState } from 'react';
import { initializePayment } from '@/lib/actions/payment';
import { CreditCard, ShieldCheck, ShoppingCart } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function CheckoutPage({ cartItems, userEmail }: any) {
    const [loading, setLoading] = useState(false);
    const total = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);

    const handlePayNow = async () => {
        setLoading(true);
        try {
            const authUrl = await initializePayment({
                email: userEmail,
                amount: total,
                metadata: { cartItems, orderType: 'on_demand' }
            });
            window.location.href = authUrl; // Redirect to Paystack
        } catch (err) {
            alert("Payment failed to initialize. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-2xl font-black italic uppercase mb-8">Final Checkout</h1>

            <div className="bg-gray-50 p-6 rounded-[2.5rem] mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <ShoppingCart size={18} className="text-primary" />
                    <h2 className="font-bold text-gray-800">Order Summary</h2>
                </div>
                {cartItems.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm mb-2 font-medium">
                        <span className="text-gray-500">{item.name}</span>
                        <span>{formatNaira(item.price)}</span>
                    </div>
                ))}
                <hr className="my-4 border-dashed border-gray-200" />
                <div className="flex justify-between items-center">
                    <span className="font-black italic uppercase">Total Pay</span>
                    <span className="text-2xl font-black text-primary italic">{formatNaira(total)}</span>
                </div>
            </div>

            <button
                onClick={handlePayNow}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:bg-gray-300 transition-all"
            >
                {loading ? "Processing..." : <><CreditCard /> PAY SECURELY</>}
            </button>

            <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
                <ShieldCheck size={16} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-center">
                    Secured by Paystack • Admin Auto-Verify Active
                </p>
            </div>
        </div>
    );
}