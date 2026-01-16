"use client";
import { useEffect, useRef } from "react";

export default function AutoScrollVendors({ vendors }: { vendors: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let remote = setInterval(() => {
            if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft += 1;
            }
        }, 30); // Matches your 30ms Flutter duration

        return () => clearInterval(remote);
    }, [vendors]);

    return (
        <div ref={scrollRef} className="flex overflow-x-auto gap-4 scrollbar-hide">
            {vendors.map((v, i) => (
                <div key={i} className="shrink-0 w-20 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden">
                        <img src={v.logo || '/placeholder.png'} className="object-cover h-full w-full" />
                    </div>
                    <span className="text-[10px] mt-1 font-bold truncate w-full text-center">{v.name}</span>
                </div>
            ))}
        </div>
    );
}