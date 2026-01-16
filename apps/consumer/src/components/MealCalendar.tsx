"use client";
import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isBefore, isAfter } from 'date-fns';
import { CheckCircle2, ChevronLeft, ChevronRight, AlertCircle, Check, Flame } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const PROTEINS = [
  { id: 'beef', name: 'Grilled Beef', emoji: '🥩' },
  { id: 'chicken', name: 'Spicy Chicken', emoji: '🍗' },
  { id: 'fish', name: 'Fried Fish', emoji: '🐟' }
];

export default function MealCalendar({
    scheduledMeals,
    onDateClick,
    mealsPerDay
}: any) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [selections, setSelections] = useState<Record<string, string>>({});

    // Calendar Math (Simplified using date-fns)
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();

    const handleSelect = (proteinId: string) => {
      setSelections({ ...selections, [selectedDay]: proteinId });
    };

    return (
        <div className="min-h-screen bg-[#FF6B00] pb-32">
          {/* --- HEADER --- */}
          <header className="pt-12 px-6 pb-8">
            <h1 className="text-4xl font-black text-[#FFD700] italic uppercase tracking-tighter leading-none">
              Weekly <br /> <span className="text-white">Customizer</span>
            </h1>
            <p className="text-white/80 font-bold text-[10px] uppercase tracking-widest mt-2">
              Pick your proteins for the week
            </p>
          </header>
  
          {/* --- DAY SELECTOR (Horizontal Scroll) --- */}
          <div className="flex overflow-x-auto px-6 gap-3 no-scrollbar mb-10">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-tight transition-all shrink-0 ${
                  selectedDay === day 
                  ? 'bg-[#FFD700] text-[#FF6B00] shadow-lg scale-105' 
                  : 'bg-black/20 text-[#FFD700] border border-white/10'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
  
          {/* --- MEAL OPTIONS --- */}
          <div className="px-6 space-y-4">
            <h2 className="text-[#FFD700] font-black italic uppercase text-sm mb-4">
              Select Protein for {selectedDay}
            </h2>
            
            {PROTEINS.map((protein) => (
              <div 
                key={protein.id}
                onClick={() => handleSelect(protein.id)}
                className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer flex justify-between items-center ${
                  selections[selectedDay] === protein.id 
                  ? 'bg-white border-[#FFD700] shadow-2xl' 
                  : 'bg-black/10 border-white/5 opacity-70'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{protein.emoji}</span>
                  <div>
                    <h3 className={`font-black uppercase italic ${selections[selectedDay] === protein.id ? 'text-[#FF6B00]' : 'text-[#FFD700]'}`}>
                      {protein.name}
                    </h3>
                    <p className={`text-[10px] font-bold uppercase ${selections[selectedDay] === protein.id ? 'text-gray-400' : 'text-white/40'}`}>
                      Standard Portion • Freshly Prepared
                    </p>
                  </div>
                </div>
                {selections[selectedDay] === protein.id && (
                  <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-white">
                    <Check size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
  
          {/* --- SUMMARY FLOATER --- */}
          <div className="fixed bottom-10 left-6 right-6 z-50">
            <button className="w-full bg-black text-[#FFD700] py-6 rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl border border-white/10 active:scale-95 transition-all">
              <Flame size={20} className="animate-pulse" />
              CONFIRM WEEKLY PLAN
            </button>
          </div>
        </div>
    );
}