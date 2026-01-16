import { useState, useMemo } from 'react';
import { PlanType, SubscriptionPlan, MealSession, ProteinOption } from '@/lib/plans';

export interface DayMealSchedule {
    menuItemId: string;
    protein: ProteinOption;
    session: MealSession;
}

export function useMealScheduler(plan: SubscriptionPlan) {
    const [isWeekly, setIsWeekly] = useState(true);
    const [scheduledMeals, setScheduledMeals] = useState<Record<string, DayMealSchedule[]>>({});

    const daysRequired = isWeekly ? 7 : 30;
    const mealsPerDay = plan.mealsPerDay;

    // Derived state (Automatic calculations)
    const scheduledDaysCount = useMemo(() => {
        return Object.values(scheduledMeals).filter(meals => meals.length === mealsPerDay).length;
    }, [scheduledMeals, mealsPerDay]);

    const progress = Math.min(scheduledDaysCount / daysRequired, 1);
    const isComplete = scheduledDaysCount >= daysRequired;

    const toggleDayMeal = (dateKey: string, meal: DayMealSchedule) => {
        setScheduledMeals(prev => {
            const existing = prev[dateKey] || [];
            // Logic to prevent double-booking a session (Breakfast/Lunch/Dinner)
            const filtered = existing.filter(m => m.session !== meal.session);

            if (existing.length === filtered.length && existing.length >= mealsPerDay) return prev;

            return { ...prev, [dateKey]: [...filtered, meal] };
        });
    };

    return {
        isWeekly, setIsWeekly,
        scheduledMeals, setScheduledMeals,
        progress, isComplete, daysRequired, scheduledDaysCount,
        toggleDayMeal
    };
}