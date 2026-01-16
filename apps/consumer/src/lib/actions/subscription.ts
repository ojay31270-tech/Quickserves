"use server";

import { SubscriptionOrder } from "@/types/subscription";

export async function createSubscriptionAction(order: SubscriptionOrder, address: string) {
    // This replaces your _buildSubscriptionPayload logic
    const payload = {
        plan: order.plan.type,
        amount: order.totalPrice,
        cashback: order.cashback,
        deliveryAddress: address,
        startDate: order.startDate.toISOString(),
        selectedMeals: order.selectedMeals.map(m => ({
            menuItem: m.menuItem.name,
            protein: m.protein,
            session: m.session
        })),
        paymentMethod: 'paystack',
    };

    const response = await fetch(`${process.env.BACKEND_URL}/api/subscriptions/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    return response.json();
}