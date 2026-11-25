import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Download, 
  Plus, 
  Layers, 
  AlertTriangle, 
  MapPin,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { exportHackathonsToICS } from '../utils/calendarExport';

export default function Navbar({
  hackathons,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenAddModal
}) {
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [istTime, setIstTime] = useState('');

  // Live IST Clock (clean & understated)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setIstTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleExportICS = () => {
    exportHackathonsToICS(hackathons);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  const navItems = [
    { id: 'deadlines', label: 'Deadlines', count: hackathons.length },
    { id: 'calendar', label: 'Calendar' },
    { id: 'conflicts', label: 'Conflict Matrix', alert: true },
    { id: 'venues', label: 'Venues & Travel' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand / Team */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-xs">
              Ω
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-zinc-900 text-sm tracking-tight">
                Schedule
              </span>
              <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 border border-zinc-200/60 px-1.5 py-0.5 rounded text-xs hidden sm:inline-block">
                Team Outliers
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-zinc-200 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>IST {istTime}</span>
          </div>
        </div>

        {/* Center: Tabs with Framer Motion layout pill */}
        <nav className="flex items-center bg-zinc-100/80 p-0.5 rounded-lg border border-zinc-200/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-tab"
                    className="absolute inset-0 bg-white rounded-md shadow-xs border border-zinc-200/80"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.label}
                  {item.alert && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search /"
              className="w-40 lg:w-52 h-8 pl-8 pr-3 text-xs bg-zinc-50 border border-zinc-200/80 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all"
            />
          </div>

          {/* Sync .ICS Button */}
          <button
            onClick={handleExportICS}
            className="h-8 px-2.5 sm:px-3 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            title="Download .ICS file to sync with Google Calendar, Outlook, or Apple Calendar"
          >
            {copiedStatus ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-emerald-700">Exported</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline">Sync Calendar</span>
              </>
            )}
          </button>

          {/* Add Hackathon */}
          <button
            onClick={onOpenAddModal}
            className="h-8 px-3 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </button>
        </div>
      </div>
    </header>
  );
}
