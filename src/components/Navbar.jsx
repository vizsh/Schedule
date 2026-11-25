import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Download, 
  Plus, 
  Layers, 
  AlertTriangle, 
  MapPin,
  Clock,
  Check,
  X,
  ShieldAlert
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
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
    { id: 'deadlines', label: 'Deadlines', icon: Clock, count: hackathons.length },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'conflicts', label: 'Conflicts', icon: ShieldAlert, alert: true },
    { id: 'venues', label: 'Venues', icon: MapPin },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-2">
          {/* Left: Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-7 h-7 shrink-0 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs tracking-tighter shadow-xs">
              Ω
            </div>
            <div className="flex items-baseline gap-1.5 truncate">
              <span className="font-semibold text-zinc-900 text-sm tracking-tight">
                Schedule
              </span>
              <span className="text-[10px] font-medium text-zinc-500 bg-zinc-100 border border-zinc-200/60 px-1.5 py-0.2 rounded hidden xs:inline-block">
                Outliers
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 pl-2.5 border-l border-zinc-200 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>IST {istTime}</span>
            </div>
          </div>

          {/* Center (Desktop only): Segmented Tabs */}
          <nav className="hidden md:flex items-center bg-zinc-100/80 p-0.5 rounded-lg border border-zinc-200/60">
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
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop Search input */}
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search /"
                className="w-40 lg:w-48 h-8 pl-8 pr-3 text-xs bg-zinc-50 border border-zinc-200/80 rounded-lg text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Export .ICS */}
            <button
              onClick={handleExportICS}
              className="h-8 px-2 sm:px-3 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              title="Download .ICS file"
            >
              {copiedStatus ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline text-emerald-700">Exported</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="hidden sm:inline">Sync</span>
                </>
              )}
            </button>

            {/* Add Event */}
            <button
              onClick={onOpenAddModal}
              className="h-8 px-2.5 sm:px-3 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Add</span>
            </button>
          </div>
        </div>

        {/* Mobile Full-Width Search Input (Collapsible) */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-zinc-100 bg-zinc-50 px-3 py-2"
            >
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter competitions, venues, dates..."
                  className="w-full h-9 pl-9 pr-8 text-sm bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed for phone UX) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/90 pb-[env(safe-area-inset-bottom)] shadow-lg">
        <div className="grid grid-cols-4 h-14">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition cursor-pointer relative ${
                  isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <div className="relative">
                  <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  {item.alert && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 border border-white" />
                  )}
                </div>
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-zinc-900 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
