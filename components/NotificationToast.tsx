"use client";
import React from 'react';
import { Bell, X, Info } from 'lucide-react';

export default function NotificationToast({ alert, onClose }: { alert: any, onClose: () => void }) {
    if (!alert) return null;

    return (
        <div className="fixed top-6 left-6 right-6 z-[9999] animate-in slide-in-from-top-10 duration-500">
            <div className="bg-gray-900 text-white p-5 rounded-[2rem] shadow-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center animate-bounce">
                        <Bell size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black italic uppercase leading-none">{alert.title}</h4>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                            {alert.message}
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}