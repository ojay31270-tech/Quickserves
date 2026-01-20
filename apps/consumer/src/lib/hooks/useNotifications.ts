import { useState } from 'react';

export function useNotifications() {
    const [notifications, setNotifications] = useState([]);
    const addNotification = (msg: string) => console.log("Notification:", msg);
    return { notifications, addNotification };
}