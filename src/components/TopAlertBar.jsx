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
    <div className="w-full bg-zinc-900 text-zinc-100 border-b border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-medium text-zinc-200">
            Next Major Deadline: <strong className="text-white font-semibold">Super Sunday — Nov 30</strong> (23:59 IST)
          </span>
          <span className="text-zinc-500 hidden md:inline">•</span>
          <span className="font-mono text-amber-300 font-semibold bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s remaining
          </span>
          <span className="text-zinc-400 text-[11px] hidden lg:inline">
            (BUILD 2036, LogiTHON, FirstCheq AI, CNL x I-Hack, MSIL)
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={onFilterSuperSunday}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              isSuperSundayActive
                ? 'bg-amber-400 text-zinc-950 font-semibold'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700'
            }`}
          >
            <span>{isSuperSundayActive ? 'Showing 30 Nov (5)' : 'Focus 30 Nov Deadlines'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
