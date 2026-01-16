"use client";
import React from 'react';
import { ShoppingPlus, Star, Clock } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function MenuCard({ item, onAdd }: { item: any, onAdd: (item: any) => void }) {
    return (
        <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-40 w-full mb-4 overflow-hidden rounded-3xl">
                <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-black">4.5</span>
                </div>
            </div>

            <div className="px-2">
                <h3 className="font-black text-gray-800 text-sm leading-tight uppercase italic">{item.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold mt-1 line-clamp-1 italic uppercase tracking-tighter">
                    {item.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price</p>
                        <p className="text-lg font-black text-primary italic">{formatNaira(item.price)}</p>
                    </div>

                    <button
                        onClick={() => onAdd(item)}
                        className="bg-gray-900 text-white p-3 rounded-2xl shadow-lg shadow-gray-200 active:scale-90 transition-all"
                    >
                        <ShoppingPlus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}