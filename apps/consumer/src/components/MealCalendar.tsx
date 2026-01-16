"use client";
import React from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isBefore, isAfter } from 'date-fns';
import { CheckCircle2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

export default function MealCalendar({
    scheduledMeals,
    onDateClick,
    mealsPerDay
}: any) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    // Calendar Math (Simplified using date-fns)
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50/50">
                <h3 className="font-black text-gray-800 uppercase tracking-tight">
                    {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentMonth(addDays(currentMonth, -30))} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => setCurrentMonth(addDays(currentMonth, 30))} className="p-2 hover:bg-white rounded-full transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 text-center border-b border-gray-100">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                    <div key={d} className="py-2 text-[10px] font-black text-gray-400">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {/* We generate the days here */}
                {Array.from({ length: 35 }).map((_, i) => {
                    const date = addDays(startDate, i);
                    const dateKey = format(date, 'yyyy-MM-dd');
                    const meals = scheduledMeals[dateKey] || [];
                    const isPast = isBefore(date, addDays(today, -1));
                    const isScheduled = meals.length === mealsPerDay;
                    const isPartial = meals.length > 0 && meals.length < mealsPerDay;

                    return (
                        <button
                            key={dateKey}
                            disabled={isPast}
                            onClick={() => onDateClick(date)}
                            className={`
                h-14 border-b border-r border-gray-50 flex flex-col items-center justify-center relative transition-all
                ${isPast ? 'bg-gray-50/50 opacity-30' : 'active:bg-orange-50'}
                ${isScheduled ? 'bg-green-50/50' : ''}
              `}
                        >
                            <span className={`text-xs font-bold ${isScheduled ? 'text-green-600' : 'text-gray-700'}`}>
                                {format(date, 'd')}
                            </span>
                            {isScheduled && <CheckCircle2 size={12} className="text-green-500 mt-0.5" />}
                            {isPartial && <div className="w-1 h-1 bg-orange-400 rounded-full mt-1 animate-pulse" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}