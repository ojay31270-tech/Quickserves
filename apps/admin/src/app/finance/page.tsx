"use client";
import React from 'react';
import { DollarSign, Percent, ArrowUpRight, Download, Wallet } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function AdminFinanceTracker() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-gray-800 italic uppercase">Finance Tracker</h1>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Platform Revenue & Payouts</p>
            </header>

            {/* --- FINANCIAL OVERVIEW --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <FinanceCard
                    label="Total GMV"
                    value={formatNaira(4250000)}
                    sub="Gross Merchandise Value"
                    icon={<DollarSign className="text-blue-500" />}
                />
                <FinanceCard
                    label="Platform Commission"
                    value={formatNaira(425000)}
                    sub="10% Net Profit"
                    icon={<Percent className="text-orange-500" />}
                    highlight
                />
                <FinanceCard
                    label="Pending Payouts"
                    value={formatNaira(850000)}
                    sub="Vendors & Riders"
                    icon={<Wallet className="text-green-500" />}
                />
            </div>

            {/* --- RECENT TRANSACTIONS TABLE --- */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-black text-gray-800 uppercase italic">Transaction Ledger</h3>
                    <button className="flex items-center gap-2 text-xs font-bold text-primary uppercase">
                        <Download size={14} /> Export CSV
                    </button>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <tr>
                            <th className="px-8 py-4">Ref ID</th>
                            <th className="px-8 py-4">Entity</th>
                            <th className="px-8 py-4">Total Amount</th>
                            <th className="px-8 py-4">Commission</th>
                            <th className="px-8 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        <TransactionRow id="#Q-991" name="Mama Cass" total={4500} comm={450} status="settled" />
                        <TransactionRow id="#Q-992" name="Rider James" total={500} comm={50} status="pending" />
                        <TransactionRow id="#Q-993" name="The Place" total={12000} comm={1200} status="settled" />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- Sub-Components ---

function FinanceCard({ label, value, sub, icon, highlight = false }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] border ${highlight ? 'bg-gray-900 border-gray-800 text-white shadow-2xl shadow-orange-900/20' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="mb-4">{icon}</div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-gray-400' : 'text-gray-400'}`}>{label}</p>
            <h2 className="text-3xl font-black italic mt-1">{value}</h2>
            <p className="text-[10px] font-bold mt-2 opacity-60 italic">{sub}</p>
        </div>
    );
}

function TransactionRow({ id, name, total, comm, status }: any) {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="px-8 py-5 text-xs font-bold text-gray-400 tracking-tighter">{id}</td>
            <td className="px-8 py-5 text-sm font-black text-gray-800 italic uppercase">{name}</td>
            <td className="px-8 py-5 text-sm font-black text-gray-800">{formatNaira(total)}</td>
            <td className="px-8 py-5 text-sm font-black text-primary">{formatNaira(comm)}</td>
            <td className="px-8 py-5">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${status === 'settled' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}