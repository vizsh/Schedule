import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  Download, 
  Plus, 
  MapPin, 
  Users, 
  Search, 
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { generateIcsCalendar } from '../utils/calendarExport';

export default function Navbar({ 
  hackathons, 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  onOpenAddModal 
}) {
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Topmost Warning Ticker for Super Sunday */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap container mx-auto">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">
            Critical Crunch
          </span>
          <p className="truncate">
            <strong className="font-bold">Sunday, 30 Nov 23:59 IST:</strong> 5 major submissions due simultaneously (BUILD 2036, LogiTHON, Build It With AI, Creative Newtech, Maruti Suzuki)!
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('conflicts')}
          className="shrink-0 bg-white/20 hover:bg-white/30 text-white text-[11px] px-2.5 py-0.5 rounded transition font-medium cursor-pointer"
        >
          View Action Plan →
        </button>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Team Identity */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-indigo-200">
              Ω
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight leading-tight">
                  Team Outliers
                </h1>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                  SPIT Mumbai
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Hackathon Command &amp; Schedule Booker
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by event, city, topic, prize..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-indigo-400 rounded-lg outline-none transition text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Right Action Controls: Live Clock, .ICS Export, Add Event */}
          <div className="flex items-center gap-2.5">
            {/* Live IST Clock */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-mono text-[11px]">{currentTime || 'IST Live'}</span>
            </div>

            {/* Export .ICS Calendar */}
            <button
              onClick={() => generateIcsCalendar(hackathons)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-2xs transition hover:border-slate-400 cursor-pointer"
              title="Download RFC 5545 iCalendar file (.ics) to import into Google Calendar or Apple Calendar"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Export</span> .ICS
            </button>

            {/* Add Custom Hackathon */}
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs shadow-indigo-300 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span> Hackathon
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-slate-100 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('hackathons')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'hackathons'
                ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Registered Hackathons ({hackathons.length})
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
            Interactive Calendar
          </button>

          <button
            onClick={() => setActiveTab('conflicts')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'conflicts'
                ? 'bg-rose-50 text-rose-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Conflict Matrix (4)
          </button>

          <button
            onClick={() => setActiveTab('venues')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'venues'
                ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            Venue &amp; Travel Guides
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              activeTab === 'team'
                ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            Team Outliers Roster
          </button>
        </div>
      </div>
    </header>
  );
}
