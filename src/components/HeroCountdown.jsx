import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Sparkles, Trophy, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HeroCountdown({ onFilterBySuperSunday, totalPrizeNumber }) {
  // Target: Sunday 30 Nov 2026, 23:59:59 IST
  const targetDate = new Date('2026-11-30T23:59:59+05:30');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-100/80 shadow-sm p-6 sm:p-8 mb-8">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-200/20 to-purple-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-amber-100/30 blur-2xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Context & Urgency */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            NEXT CRITICAL DEADLINE • SUPER SUNDAY
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            5 Major Hackathon Submissions Due in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-indigo-600 to-violet-600">
              {timeLeft.days} Days &amp; {timeLeft.hours} Hours
            </span>
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            Sunday, <strong>30 November 2026 (23:59 IST)</strong> is Team Outliers' highest-leverage milestone window. Submissions close simultaneously for <strong>BUILD 2036, LogiTHON, Build It With AI, Creative Newtech</strong>, and <strong>Maruti Suzuki Ideathon</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onFilterBySuperSunday}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm shadow-indigo-200 transition cursor-pointer"
            >
              Filter 30 Nov Submissions (5)
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-600 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Target: 30 Nov 2026, 23:59 IST
            </span>
          </div>
        </div>

        {/* Right Side: Live Ticking Countdown Timer */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              Time Remaining to Deadline
            </span>
            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
              High Priority
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Days */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                Days
              </div>
            </div>

            {/* Hours */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                Hours
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                Mins
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-indigo-50/70 border border-indigo-200/70 rounded-xl p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-mono tracking-tight">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mt-0.5">
                Secs
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Combined Purse</p>
              <p className="font-bold text-slate-900">₹48.7L+</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Seed Offers</p>
              <p className="font-bold text-indigo-600">₹1–5 Cr</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Finale Stages</p>
              <p className="font-bold text-emerald-600">6 Venues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
