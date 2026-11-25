import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Trophy,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export default function CalendarView({ hackathons, onSelectHackathon }) {
  const [selectedMonth, setSelectedMonth] = useState('2026-11'); // '2026-11' | '2026-12'
  const [selectedDay, setSelectedDay] = useState(30); // Default to Nov 30

  // Deadlines map: key = 'YYYY-MM-DD', value = Array of events
  const eventsByDate = React.useMemo(() => {
    const map = {};
    hackathons.forEach((h) => {
      // Next deadline
      if (h.nextDeadline) {
        const dateKey = h.nextDeadline.split('T')[0];
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push({
          hackathon: h,
          type: 'deadline',
          title: `${h.shortName || h.title}: Deadline`,
          time: h.nextDeadlineDisplay
        });
      }
      // Finale
      if (h.finaleDate) {
        const dateKey = h.finaleDate.split('T')[0];
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push({
          hackathon: h,
          type: 'finale',
          title: `${h.shortName || h.title}: Grand Finale`,
          venue: h.finaleVenue,
          time: h.finaleDateDisplay
        });
      }
    });
    return map;
  }, [hackathons]);

  const monthConfigs = {
    '2026-11': {
      title: 'November 2026',
      daysCount: 30,
      startDayOffset: 0 // 1 Nov 2026 is Sunday (0)
    },
    '2026-12': {
      title: 'December 2026',
      daysCount: 31,
      startDayOffset: 2 // 1 Dec 2026 is Tuesday (2)
    }
  };

  const currentMonthConfig = monthConfigs[selectedMonth];
  const currentDateKey = `${selectedMonth}-${String(selectedDay).padStart(2, '0')}`;
  const dayEvents = eventsByDate[currentDateKey] || [];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar Grid (Col Span 2) */}
        <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-xl p-3.5 sm:p-5 shadow-2xs">
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-zinc-500 shrink-0" />
              <h3 className="font-semibold text-zinc-900 text-sm tracking-tight truncate">
                {currentMonthConfig.title}
              </h3>
            </div>

            <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/80 shrink-0">
              <button
                onClick={() => {
                  setSelectedMonth('2026-11');
                  setSelectedDay(30);
                }}
                className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  selectedMonth === '2026-11'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Nov 2026
              </button>
              <button
                onClick={() => {
                  setSelectedMonth('2026-12');
                  setSelectedDay(12);
                }}
                className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
                  selectedMonth === '2026-12'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Dec 2026
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mt-3 sm:mt-4 text-center text-[10px] sm:text-[11px] font-mono font-medium text-zinc-400 uppercase">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Calendar Cells (Responsive: compact square on phone, expanded on desktop) */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
            {/* Empty offset days */}
            {Array.from({ length: currentMonthConfig.startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-11 sm:h-16 rounded-lg bg-zinc-50/40" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: currentMonthConfig.daysCount }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${selectedMonth}-${String(dayNum).padStart(2, '0')}`;
              const events = eventsByDate[dateStr] || [];
              const isSelected = selectedDay === dayNum;
              const isSuperSunday = dateStr === '2026-11-30';
              const hasEvents = events.length > 0;

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`h-11 sm:h-16 p-1 sm:p-1.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                      : isSuperSunday
                      ? 'border-amber-300 bg-amber-50/70 text-zinc-900 hover:border-amber-400'
                      : hasEvents
                      ? 'border-zinc-300 bg-zinc-50/80 text-zinc-900 hover:border-zinc-400'
                      : 'border-zinc-100 bg-white text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-mono font-medium ${
                        isSelected ? 'text-white' : 'text-zinc-700'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {hasEvents && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </div>

                  {/* Indicator: Dot on mobile, text pill on tablet/desktop */}
                  {hasEvents && (
                    <div className="w-full flex items-center justify-center sm:justify-start">
                      {/* Mobile indicator dots */}
                      <div className="flex sm:hidden items-center gap-0.5 mt-0.5">
                        {Array.from({ length: Math.min(events.length, 3) }).map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`w-1 h-1 rounded-full ${
                              isSelected ? 'bg-amber-300' : 'bg-amber-500'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Desktop text pill */}
                      <span
                        className={`hidden sm:block text-[9px] font-medium truncate ${
                          isSelected
                            ? 'text-zinc-300'
                            : isSuperSunday
                            ? 'text-amber-800 font-semibold'
                            : 'text-zinc-500'
                        }`}
                      >
                        {events.length} event{events.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda (Col Span 1) */}
        <div className="bg-white border border-zinc-200/80 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col">
          <div className="pb-2.5 sm:pb-3 border-b border-zinc-100">
            <span className="text-[10px] font-mono uppercase text-zinc-400">
              Agenda for
            </span>
            <h4 className="text-sm sm:text-base font-semibold text-zinc-900 tracking-tight">
              {new Date(`${currentDateKey}T00:00:00`).toLocaleDateString('en-IN', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </h4>
          </div>

          <div className="flex-1 mt-3 sm:mt-4 space-y-2.5 sm:space-y-3 overflow-y-auto">
            {dayEvents.length === 0 ? (
              <div className="py-8 sm:py-12 text-center text-xs text-zinc-400">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 text-zinc-300" />
                <span>No scheduled deadlines on this date.</span>
              </div>
            ) : (
              dayEvents.map((evt, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectHackathon(evt.hackathon)}
                  className="p-3 rounded-lg border border-zinc-200/80 hover:border-zinc-300 bg-zinc-50/50 hover:bg-zinc-50 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                        evt.type === 'deadline'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {evt.type === 'deadline' ? 'DEADLINE' : 'FINALE ROUND'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                      {evt.hackathon.prizePool}
                    </span>
                  </div>

                  <h5 className="font-semibold text-xs text-zinc-900 mt-1.5 line-clamp-2 leading-snug">
                    {evt.hackathon.title}
                  </h5>

                  <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                    {evt.time || evt.venue || 'Refer to portal'}
                  </p>

                  <div className="mt-2 pt-1.5 border-t border-zinc-200/50 flex items-center justify-between text-[11px] text-zinc-700 font-medium">
                    <span>View deliverables</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
