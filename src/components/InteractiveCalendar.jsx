import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  ExternalLink, 
  AlertCircle,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { getGoogleCalendarUrl } from '../utils/calendarExport';

export default function InteractiveCalendar({ hackathons, onSelectHackathon }) {
  // Available months: Nov 2026 (month 10 zero-indexed) and Dec 2026 (month 11 zero-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 10 = November
  const [selectedDay, setSelectedDay] = useState(30); // Default to critical 30th Nov

  // Month labels
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to extract all milestones across all hackathons
  const getAllMilestones = () => {
    const list = [];
    hackathons.forEach((h) => {
      h.keyMilestones.forEach((m) => {
        const d = new Date(m.date);
        list.push({
          ...m,
          hackathon: h,
          parsedDate: d,
          year: d.getFullYear(),
          month: d.getMonth(),
          day: d.getDate(),
          isoDate: d.toISOString().split('T')[0]
        });
      });
    });
    return list;
  };

  const allMilestones = getAllMilestones();

  // Days in month calculation
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const startDayOffset = getFirstDayOfMonth(currentYear, currentMonth);

  // Switch month
  const prevMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(10);
      setSelectedDay(30);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 10) {
      setCurrentMonth(11);
      setSelectedDay(12);
    }
  };

  // Get milestones for a specific day
  const getMilestonesForDay = (day) => {
    return allMilestones.filter(
      (m) => m.year === currentYear && m.month === currentMonth && m.day === day
    );
  };

  // Get selected day milestones
  const selectedDayMilestones = selectedDay ? getMilestonesForDay(selectedDay) : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
            TIMELINE RADAR
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Interactive Hackathon Month Planner
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any highlighted date to inspect submission deadlines, evaluation dates, and offline grand finales.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            disabled={currentMonth === 10}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
              currentMonth === 10
                ? 'opacity-40 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-50 border-slate-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold font-mono tracking-tight min-w-[140px] text-center border border-slate-200/80">
            {monthNames[currentMonth]} {currentYear}
          </span>

          <button
            onClick={nextMonth}
            disabled={currentMonth === 11}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
              currentMonth === 11
                ? 'opacity-40 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-50 border-slate-300'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Jump Date Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 text-xs no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Quick Jumps:
        </span>
        <button
          onClick={() => { setCurrentMonth(10); setSelectedDay(30); }}
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
            currentMonth === 10 && selectedDay === 30
              ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          }`}
        >
          🚨 30 Nov: Super Sunday (5 Deadlines)
        </button>
        <button
          onClick={() => { setCurrentMonth(11); setSelectedDay(6); }}
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
            currentMonth === 11 && selectedDay === 6
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
              : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
          }`}
        >
          06 Dec: Innodata &amp; Buildathon
        </button>
        <button
          onClick={() => { setCurrentMonth(11); setSelectedDay(12); }}
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
            currentMonth === 11 && selectedDay === 12
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          🏆 12–13 Dec: Mumbai Double Finales
        </button>
        <button
          onClick={() => { setCurrentMonth(11); setSelectedDay(14); }}
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
            currentMonth === 11 && selectedDay === 14
              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          }`}
        >
          📍 14–15 Dec: TiE Indore Demo Day
        </button>
        <button
          onClick={() => { setCurrentMonth(11); setSelectedDay(20); }}
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
            currentMonth === 11 && selectedDay === 20
              ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
              : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
          }`}
        >
          📍 20 Dec: Innodata Delhi Finale
        </button>
        <button
          onClick={() => { setCurrentMonth(11); setSelectedDay(27); }}
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
            currentMonth === 11 && selectedDay === 27
              ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
              : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
          }`}
        >
          🏰 27 Dec: GAVS Bangalore Palace
        </button>
      </div>

      {/* Main Grid: Calendar on Left, Selected Day Events on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Matrix (7 columns) */}
        <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200 rounded-xl p-4">
          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty slots before first day */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-14 sm:h-16 rounded-lg bg-slate-100/40" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1;
              const dayMilestones = getMilestonesForDay(day);
              const isSelected = selectedDay === day;
              const isToday = currentYear === 2026 && currentMonth === 10 && day === 26; // Nov 26
              const hasEvents = dayMilestones.length > 0;
              const hasUrgent = dayMilestones.some((m) => m.isUrgent);
              const hasFinale = dayMilestones.some((m) => m.venue || m.title.toLowerCase().includes('finale'));

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`h-14 sm:h-16 p-1.5 rounded-lg border transition flex flex-col justify-between cursor-pointer select-none ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-400 shadow-sm'
                      : hasUrgent
                      ? 'bg-rose-50/80 border-rose-300 text-rose-900 hover:bg-rose-100/70'
                      : hasFinale
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 hover:bg-emerald-100/70'
                      : hasEvents
                      ? 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:shadow-2xs'
                      : 'bg-white/60 border-slate-200/50 text-slate-400 hover:bg-white hover:text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : ''}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className={`text-[9px] px-1 rounded font-bold uppercase tracking-wider ${
                        isSelected ? 'bg-white text-indigo-700' : 'bg-slate-900 text-white'
                      }`}>
                        Today
                      </span>
                    )}
                  </div>

                  {/* Badges / Dots */}
                  {hasEvents && (
                    <div className="flex items-center gap-1 flex-wrap mt-auto">
                      {dayMilestones.slice(0, 3).map((m, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected
                              ? 'bg-white'
                              : m.isUrgent
                              ? 'bg-rose-500'
                              : m.venue || m.title.toLowerCase().includes('finale')
                              ? 'bg-emerald-500'
                              : 'bg-indigo-500'
                          }`}
                          title={`${m.hackathon.shortName}: ${m.title}`}
                        />
                      ))}
                      {dayMilestones.length > 3 && (
                        <span className={`text-[9px] font-bold ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                          +{dayMilestones.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-200/70 text-xs text-slate-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Submission Deadline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Grand Finale / Demo Day
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Evaluation / Milestone
            </span>
          </div>
        </div>

        {/* Selected Day Agenda (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                DAY AGENDA &amp; DEADLINES
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                {selectedDay ? `${selectedDay} ${monthNames[currentMonth]} ${currentYear}` : 'Select a date'}
              </h4>
            </div>

            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
              {selectedDayMilestones.length} Event{selectedDayMilestones.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* List of milestones on selected day */}
          {selectedDayMilestones.length === 0 ? (
            <div className="py-12 text-center my-auto">
              <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-medium">No deadlines or events scheduled on this day.</p>
              <button
                onClick={() => { setCurrentMonth(10); setSelectedDay(30); }}
                className="mt-3 text-xs text-indigo-600 font-semibold hover:underline cursor-pointer"
              >
                Jump to 30 Nov Critical Deadline →
              </button>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {selectedDayMilestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition ${
                    m.isUrgent
                      ? 'bg-rose-50/40 border-rose-200'
                      : m.venue || m.title.toLowerCase().includes('finale')
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border text-slate-700 mb-1">
                        {m.hackathon.shortName}
                      </span>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {m.title}
                      </h5>
                    </div>

                    <a
                      href={getGoogleCalendarUrl(m.hackathon, m)}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded border border-transparent hover:border-slate-200 transition"
                      title="Add this milestone to Google Calendar"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="flex items-center gap-3 mt-2 pt-2 border-t border-slate-200/50 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {m.dateDisplay}
                    </span>
                    {m.venue && (
                      <span className="flex items-center gap-1 text-emerald-700 font-medium truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {m.venue}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
