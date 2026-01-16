"use client";
import { useNotifications } from '@/lib/hooks/useNotifications';
import NotificationToast from '@/components/NotificationToast';
import { useAuth } from '@/lib/hooks/useAuth'; // Assume you have an auth hook

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth(); // Get the logged-in user ID
    const { newAlert, clearAlert } = useNotifications(user?.id);

    return (
        <html lang="en">
            <body>
                {/* The Toast will appear globally on any page if a new alert comes in */}
                <NotificationToast alert={newAlert} onClose={clearAlert} />

                {children}
            </body>
        </html>
    );
}