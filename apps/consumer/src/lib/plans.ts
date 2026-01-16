// --- Enums & Types ---
export type SubscriptionCategory = 'corporate' | 'student';
export type PlanType = 'basic' | 'standard' | 'premium';
export type MealSession = 'breakfast' | 'lunch' | 'dinner';
export type ProteinOption = 'beef' | 'fish' | 'chicken' | 'turkey';

export interface SubscriptionPlan {
    type: PlanType;
    category: SubscriptionCategory;
    weeklyPrice: number;
    monthlyPrice: number;
    mealsPerDay: number;
    weeklyCashback: number;
    monthlyCashback: number;
    features: string[];
}

// --- The Pricing Engine ---
export const PLANS: Record<SubscriptionCategory, Record<PlanType, SubscriptionPlan>> = {
    corporate: {
        basic: {
            type: 'basic',
            category: 'corporate',
            weeklyPrice: 10000,
            monthlyPrice: 40000,
            mealsPerDay: 1,
            weeklyCashback: 500,
            monthlyCashback: 2000,
            features: ['1 meal per day', '₦2,000 monthly cashback', 'Basic proteins only'],
        },
        standard: { /* ... logic for 15k/60k */ type: 'standard', category: 'corporate', weeklyPrice: 15000, monthlyPrice: 60000, mealsPerDay: 1, weeklyCashback: 1000, monthlyCashback: 3000, features: ['Chicken included', 'Priority delivery'] },
        premium: { /* ... logic for 17.5k/70k */ type: 'premium', category: 'corporate', weeklyPrice: 17500, monthlyPrice: 70000, mealsPerDay: 1, weeklyCashback: 2000, monthlyCashback: 5000, features: ['Turkey included', 'Premium packaging'] }
    },
    student: {
        basic: {
            type: 'basic',
            category: 'student',
            weeklyPrice: 12500,
            monthlyPrice: 45000,
            mealsPerDay: 2,
            weeklyCashback: 500,
            monthlyCashback: 2000,
            features: ['2 meals per day (Heavy duty)', 'Budget friendly']
        },
        // ... add standard (18k/70k) and premium (25k/100k)
    }
};

// --- Meal Logic ---
export const PROTEIN_RESTRICTIONS: Record<PlanType, ProteinOption[]> = {
    basic: ['beef', 'fish'],
    standard: ['beef', 'fish', 'chicken'],
    premium: ['beef', 'fish', 'chicken', 'turkey'],
};