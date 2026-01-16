"use client";
import React, { useState } from 'react';
import { PLANS, SubscriptionCategory } from '@/lib/plans';
import { CheckCircle2, GraduationCap, Briefcase } from 'lucide-react';

export default function SubscriptionSelector() {
    const [category, setCategory] = useState<SubscriptionCategory>('corporate');
    const [isMonthly, setIsMonthly] = useState(true);

    return (
        <div className="p-4 space-y-6">
            {/* Category Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-2xl">
                <button
                    onClick={() => setCategory('corporate')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${category === 'corporate' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}
                >
                    <Briefcase size={18} /> <span className="font-bold text-sm">Corporate</span>
                </button>
                <button
                    onClick={() => setCategory('student')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${category === 'student' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}
                >
                    <GraduationCap size={18} /> <span className="font-bold text-sm">Student</span>
                </button>
            </div>

            {/* Pricing Cards */}
            <div className="space-y-4">
                {Object.values(PLANS[category]).map((plan) => (
                    <div key={plan.type} className="relative bg-white p-6 rounded-[2rem] border-2 border-gray-100 shadow-sm overflow-hidden active:scale-[0.98] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-black text-gray-800 uppercase italic">{plan.type}</h3>
                                <p className="text-xs text-gray-500">{plan.mealsPerDay} Delicious Meal{plan.mealsPerDay > 1 ? 's' : ''} Daily</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-primary">₦{(isMonthly ? plan.monthlyPrice : plan.weeklyPrice).toLocaleString()}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{isMonthly ? 'Per Month' : 'Per Week'}</p>
                            </div>
                        </div>

                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                    <CheckCircle2 size={14} className="text-green-500" /> {feature}
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-100">
                            Select {plan.type} Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}