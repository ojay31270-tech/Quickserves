"use client";
import React from 'react';
import {
    Users, Store, Bike, AlertCircle,
    CheckCircle2, DollarSign, Activity, Globe
} from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function AdminCommandCenter() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* 1. SIDEBAR (The Navigation) */}
            <aside className="w-64 bg-gray-900 text-white p-6 hidden lg:flex flex-col">
                <div className="flex text-2xl font-black tracking-tighter mb-10">
                    <span className="text-blue-400">Q</span>
                    <span>uickServe Admin</span>
                </div>

                <nav className="space-y-2 flex-1">
                    <NavItem icon={<Activity size={18} />} label="Live Overview" active />
                    <NavItem icon={<Store size={18} />} label="Vendors" />
                    <NavItem icon={<Bike size={18} />} label="Riders" />
                    <NavItem icon={<Users size={18} />} label="Customers" />
                    <NavItem icon={<DollarSign size={18} />} label="Finances" />
                </nav>

                <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">System Status</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold">All Systems Operational</span>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 italic uppercase">Command Center</h1>
                        <p className="text-gray-500 text-sm">Real-time monitoring for Friday, Jan 16, 2026</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white px-6 py-3 rounded-2xl font-bold shadow-sm border border-gray-100">Export Report</button>
                        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-100">System Settings</button>
                    </div>
                </header>

                {/* --- TOP ROW STATS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <AdminStat icon={<DollarSign />} label="Daily Revenue" value={formatNaira(450200)} trend="+8.4%" />
                    <AdminStat icon={<Activity />} label="Active Subs" value="1,204" trend="+2.1%" />
                    <AdminStat icon={<Bike />} label="Riders Online" value="42" color="text-blue-500" />
                    <AdminStat icon={<AlertCircle />} label="Pending Issues" value="3" color="text-red-500" />
                </div>

                {/* --- LIVE ECOSYSTEM MONITOR --- */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Live Map Placeholder */}
                    <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 min-h-[400px] relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-gray-800 uppercase italic">Live Logistics Map</h3>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-[10px] font-bold"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Riders</span>
                                <span className="flex items-center gap-1 text-[10px] font-bold"><div className="w-2 h-2 bg-orange-500 rounded-full" /> Vendors</span>
                            </div>
                        </div>
                        <div className="absolute inset-0 top-20 bg-gray-50 flex items-center justify-center">
                            <Globe size={100} className="text-gray-200" />
                            <p className="absolute text-gray-400 font-bold uppercase italic text-xs">Awaiting Map Integration...</p>
                        </div>
                    </div>

                    {/* Recent Activity List */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="font-black text-gray-800 uppercase italic mb-6">Recent Verifications</h3>
                        <div className="space-y-6">
                            <ActivityLog
                                title="Mama Cass"
                                desc="New Special Meal Listed"
                                time="2 mins ago"
                                status="auto-verified"
                            />
                            <ActivityLog
                                title="Rider James"
                                desc="Completed Delivery #Q-991"
                                time="15 mins ago"
                                status="success"
                            />
                            <ActivityLog
                                title="User @Tade"
                                desc="Subscribed to Corporate Basic"
                                time="22 mins ago"
                                status="payment-confirmed"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// --- Admin Sub-Components ---

function NavItem({ icon, label, active = false }: any) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all ${active ? 'bg-primary text-white shadow-lg shadow-orange-900/20' : 'text-gray-400 hover:bg-white/5'}`}>
            {icon} {label}
        </div>
    );
}

function AdminStat({ icon, label, value, trend, color = "text-primary" }: any) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className={`${color} mb-4`}>{icon}</div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{label}</p>
            <div className="flex items-end gap-2">
                <h3 className="text-2xl font-black text-gray-800 italic leading-none">{value}</h3>
                {trend && <span className="text-green-500 text-[10px] font-black">{trend}</span>}
            </div>
        </div>
    );
}

function ActivityLog({ title, desc, time, status }: any) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-green-500" />
            </div>
            <div>
                <h4 className="text-sm font-black text-gray-800">{title}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{desc}</p>
                <p className="text-[10px] text-primary mt-1">{time}</p>
            </div>
        </div>
    );
}