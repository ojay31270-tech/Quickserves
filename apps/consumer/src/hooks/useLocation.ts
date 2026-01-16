import { useState, useEffect } from "react";

export function useLocation() {
    const [address, setAddress] = useState("Detecting...");

    const detect = () => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            // Logic to convert Lat/Lng to "Lekki, Lagos"
            const res = await fetch(`/api/geocode?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
            const data = await res.json();
            setAddress(data.address || "Unknown Location");
        });
    };

    return { address, detect };
}