"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Wallet, ArrowUpRight, History, Download, TrendingUp } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function RiderWalletPage({ riderId }: { riderId: string }) {
    const [wallet, setWallet] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const fetchWalletData = async () => {
            // Get current balance
            const { data: walletData } = await supabase
                .from('rider_wallets')
                .select('*')
                .eq('rider_id', riderId)
                .single();

            // Get last 5 transactions
            const { data: transData } = await supabase
                .from('rider_transactions')
                .select('*')
                .eq('rider_id', riderId)
                .order('created_at', { ascending: false })
                .limit(5);

            if (walletData) setWallet(walletData);
            if (transData) setTransactions(transData);
        };

        fetchWalletData();
    }, [riderId]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* --- REVENUE HEADER --- */}
            <div className="bg-gray-900 p-8 rounded-b-[3rem] text-white shadow-2xl">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Available Balance</p>
                        <h1 className="text-4xl font-black mt-1 italic">
                            {wallet ? formatNaira(wallet.balance) : '₦0.00'}
                        </h1>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                        <Wallet className="text-primary" size={24} />
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                        WITHDRAW <ArrowUpRight size={18} />
                    </button>
                    <button className="flex-1 bg-white/10 text-white py-4 rounded-2xl font-black text-sm border border-white/10 flex items-center justify-center gap-2">
                        REPORTS <Download size={18} />
                    </button>
                </div>
            </div>

            {/* --- STATS GRID --- */}
            <section className="p-6 grid grid-cols-2 gap-4 -mt-6">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <TrendingUp className="text-green-500 mb-2" size={20} />
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Earned</p>
                    <p className="text-lg font-black text-gray-800">{wallet ? formatNaira(wallet.total_earned) : '₦0'}</p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                    <History className="text-blue-500 mb-2" size={20} />
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Trips Today</p>
                    <p className="text-lg font-black text-gray-800">12</p>
                </div>
            </section>

            {/* --- RECENT TRANSACTIONS --- */}
            <section className="px-6 mt-4">
                <h2 className="text-xl font-black text-gray-800 italic uppercase mb-4">Recent Payouts</h2>
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${tx.type === 'delivery_fee' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    <TrendingUp size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 capitalize">{tx.type.replace('_', ' ')}</p>
                                    <p className="text-[10px] text-gray-400 font-bold">{new Date(tx.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className={`font-black ${tx.type === 'delivery_fee' ? 'text-green-600' : 'text-red-600'}`}>
                                {tx.type === 'delivery_fee' ? '+' : '-'}{formatNaira(tx.amount)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}