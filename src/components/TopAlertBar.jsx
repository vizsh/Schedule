import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, X, ChevronRight } from 'lucide-react';

export default function TopAlertBar({ onFilterSuperSunday, isSuperSundayActive }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 23,
    minutes: 36,
    seconds: 40
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-30T23:59:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-zinc-900 text-zinc-100 border-b border-zinc-800 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Status & countdown */}
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-medium text-zinc-200 truncate">
            Major Due: <strong className="text-white font-semibold">Super Sunday (30 Nov)</strong>
          </span>
          <span className="font-mono text-[11px] text-amber-300 font-semibold bg-zinc-800/90 px-1.5 py-0.5 rounded border border-zinc-700 shrink-0">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m left
          </span>
        </div>

        {/* Right: Quick action filter */}
        <div className="flex items-center justify-end shrink-0">
          <button
            onClick={onFilterSuperSunday}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              isSuperSundayActive
                ? 'bg-amber-400 text-zinc-950 font-semibold'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
            }`}
          >
            <span>{isSuperSundayActive ? 'Showing 30 Nov' : 'Focus 30 Nov (5)'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
