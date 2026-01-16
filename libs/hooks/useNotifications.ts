"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useNotifications(userId: string) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [newAlert, setNewAlert] = useState<any>(null);

    useEffect(() => {
        if (!userId) return;

        // 1. Listen for new rows in the notifications table
        const channel = supabase
            .channel(`user-notifications-${userId}`)
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
                (payload) => {
                    setNewAlert(payload.new);
                    setNotifications((prev) => [payload.new, ...prev]);

                    // Trigger System Notification
                    if (Notification.permission === "granted") {
                        new Notification(payload.new.title, { body: payload.new.message });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);

    return { notifications, newAlert, clearAlert: () => setNewAlert(null) };
}