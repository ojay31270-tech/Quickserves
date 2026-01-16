"use client";
import React, { useState, useEffect } from 'react';

export default function AnimatedClockBanner({ onTap }: { onTap?: () => void }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Calculate rotations for clock hands
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secDegrees = (seconds / 60) * 360;
    const minDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

    return (
        <div
            onClick={onTap}
            className="relative w-full p-5 rounded-2xl cursor-pointer overflow-hidden transition-all active:scale-[0.98] shadow-lg animate-pulse-glow"
            style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFB366 100%)',
            }}
        >
            <div className="flex items-center justify-between">
                {/* Left Side: Text Content */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-lg font-black tracking-tighter">
                            <span className="text-blue-500">Q</span>
                            <span className="text-red-500">u</span>
                            <span className="text-yellow-500">i</span>
                            <span className="text-blue-500">c</span>
                            <span className="text-green-500">k</span>
                            <span className="text-red-500">S</span>
                        </span>
                        <span className="text-white font-bold text-sm">Special Meal</span>

                        {/* Digital Ticking Badge */}
                        <div className="bg-white/20 px-2 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                            <span className="text-white text-[10px] font-mono font-bold">
                                {time.toLocaleTimeString('en-GB')}
                            </span>
                        </div>
                    </div>

                    <p className="text-white text-xs opacity-90 leading-tight">
                        Subscribe & Save! Affordable meals delivered daily.
                    </p>

                    <div className="inline-block bg-white/20 px-3 py-1 rounded-full border border-white/30">
                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                            Tap to Subscribe →
                        </span>
                    </div>
                </div>

                {/* Right Side: Analog Clock Display */}
                <div className="relative w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 100 100" className="transform -rotate-90">
                        {/* Clock Face Markers */}
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="85" y1="50" x2="92" y2="50"
                                stroke="white" strokeWidth="3" strokeOpacity="0.5"
                                transform={`rotate(${i * 30} 50 50)`}
                            />
                        ))}

                        {/* Hour Hand */}
                        <line
                            x1="50" y1="50" x2="70" y2="50"
                            stroke="white" strokeWidth="5" strokeLinecap="round"
                            style={{ transform: `rotate(${hourDegrees}deg)`, transformOrigin: '50px 50px' }}
                        />

                        {/* Minute Hand */}
                        <line
                            x1="50" y1="50" x2="85" y2="50"
                            stroke="white" strokeWidth="3" strokeLinecap="round"
                            style={{ transform: `rotate(${minDegrees}deg)`, transformOrigin: '50px 50px' }}
                        />

                        {/* Second Hand */}
                        <line
                            x1="50" y1="50" x2="90" y2="50"
                            stroke="#FFD700" strokeWidth="2" strokeLinecap="round"
                            style={{ transform: `rotate(${secDegrees}deg)`, transformOrigin: '50px 50px' }}
                        />

                        <circle cx="50" cy="50" r="4" fill="white" />
                    </svg>
                </div>
            </div>

            {/* Tailwind Style for Pulse Glow */}
            <style jsx global>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3); }
          50% { box-shadow: 0 4px 25px rgba(255, 107, 0, 0.6); }
          100% { box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}