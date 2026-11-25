import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCountdown from './components/HeroCountdown';
import ConflictAlerts from './components/ConflictAlerts';
import InteractiveCalendar from './components/InteractiveCalendar';
import HackathonCard from './components/HackathonCard';
import HackathonDetailModal from './components/HackathonDetailModal';
import VenueTravelGuide from './components/VenueTravelGuide';
import TeamHub from './components/TeamHub';
import AddHackathonModal from './components/AddHackathonModal';
import { HACKATHONS_DATA, TEAM_OUTLIERS } from './data/hackathonsData';
import { 
  Trophy, 
  Sparkles, 
  Filter, 
  Calendar, 
  AlertTriangle, 
  Bookmark, 
  Flame, 
  CheckCircle2, 
  ArrowUpDown,
  Layers,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hackathons'); // 'hackathons' | 'calendar' | 'conflicts' | 'venues' | 'team'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'super_sunday' | 'prototype_live' | 'qualified' | 'bookmarked'
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Bookmarks in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('outliers_bookmarks');
      return saved ? JSON.parse(saved) : ['tech4bharat-gavs', 'build2036-tie', 'logithon-2026', 'sih-2026'];
    } catch {
      return ['tech4bharat-gavs', 'build2036-tie', 'logithon-2026', 'sih-2026'];
    }
  });

  // Custom user-added hackathons in localStorage
  const [customHackathons, setCustomHackathons] = useState(() => {
    try {
      const saved = localStorage.getItem('outliers_custom_hackathons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Combine initial dataset with custom items
  const allHackathons = useMemo(() => {
    return [...customHackathons, ...HACKATHONS_DATA];
  }, [customHackathons]);

  const handleToggleBookmark = (id) => {
    let next;
    if (bookmarkedIds.includes(id)) {
      next = bookmarkedIds.filter((item) => item !== id);
    } else {
      next = [...bookmarkedIds, id];
    }
    setBookmarkedIds(next);
    localStorage.setItem('outliers_bookmarks', JSON.stringify(next));
  };

  const handleAddHackathon = (newHackathon) => {
    const next = [newHackathon, ...customHackathons];
    setCustomHackathons(next);
    localStorage.setItem('outliers_custom_hackathons', JSON.stringify(next));
    setSelectedHackathon(newHackathon);
  };

  // Filtered hackathons
  const filteredHackathons = useMemo(() => {
    return allHackathons.filter((h) => {
      // Search matching
      const matchesSearch =
        !searchQuery.trim() ||
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.finaleVenue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.prizePool.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category tab filtering
      if (categoryFilter === 'super_sunday') {
        return h.nextDeadline && h.nextDeadline.startsWith('2026-11-30');
      }
      if (categoryFilter === 'prototype_live') {
        return h.status === 'live_prototype';
      }
      if (categoryFilter === 'qualified') {
        return h.status === 'qualified';
      }
      if (categoryFilter === 'bookmarked') {
        return bookmarkedIds.includes(h.id);
      }

      return true;
    });
  }, [allHackathons, searchQuery, categoryFilter, bookmarkedIds]);

  // Quick jump from hero
  const handleFilterBySuperSunday = () => {
    setActiveTab('hackathons');
    setCategoryFilter('super_sunday');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        hackathons={allHackathons}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Container */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* Hero Banner with Live Countdown Timer */}
        <HeroCountdown onFilterBySuperSunday={handleFilterBySuperSunday} />

        {/* View Component based on Active Tab */}
        {activeTab === 'calendar' && (
          <InteractiveCalendar
            hackathons={allHackathons}
            onSelectHackathon={(h) => setSelectedHackathon(h)}
          />
        )}

        {activeTab === 'conflicts' && (
          <ConflictAlerts onSelectHackathon={(h) => setSelectedHackathon(h)} />
        )}

        {activeTab === 'venues' && <VenueTravelGuide />}

        {activeTab === 'team' && <TeamHub />}

        {/* Primary Hackathons Explorer Section */}
        {activeTab === 'hackathons' && (
          <section className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    categoryFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  All Registered ({allHackathons.length})
                </button>

                <button
                  onClick={() => setCategoryFilter('super_sunday')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                    categoryFilter === 'super_sunday'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  🚨 30 Nov Due (5)
                </button>

                <button
                  onClick={() => setCategoryFilter('prototype_live')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                    categoryFilter === 'prototype_live'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  ⚡ Prototype LIVE (1)
                </button>

                <button
                  onClick={() => setCategoryFilter('qualified')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                    categoryFilter === 'qualified'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                      : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  🏆 Qualified Finals (1)
                </button>

                <button
                  onClick={() => setCategoryFilter('bookmarked')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                    categoryFilter === 'bookmarked'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  ⭐ My Priority ({bookmarkedIds.length})
                </button>
              </div>

              {/* Status Info */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>
                  Showing <strong>{filteredHackathons.length}</strong> of{' '}
                  {allHackathons.length} competitions
                </span>
                {categoryFilter !== 'all' && (
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Hackathon Cards Grid */}
            {filteredHackathons.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8">
                <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 text-base">
                  No hackathons match the selected filter.
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing your search query or switching to 'All Registered'.
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHackathons.map((hackathon) => (
                  <HackathonCard
                    key={hackathon.id}
                    hackathon={hackathon}
                    isBookmarked={bookmarkedIds.includes(hackathon.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenDetails={(h) => setSelectedHackathon(h)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12 text-xs text-slate-500">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 tracking-tight text-sm">
              Team Outliers
            </span>
            <span className="text-slate-300">•</span>
            <span>Sardar Patel Institute of Technology (SPIT), Mumbai</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>SIH Team ID: 127114</span>
            <span>•</span>
            <span>GAVS ID: 6ad0ebc2f87f...</span>
            <span>•</span>
            <span className="font-semibold text-indigo-600">
              Vercel Ready
            </span>
          </div>
        </div>
      </footer>

      {/* Full Dossier Modal Drawer */}
      {selectedHackathon && (
        <HackathonDetailModal
          hackathon={selectedHackathon}
          onClose={() => setSelectedHackathon(null)}
        />
      )}

      {/* Add Custom Hackathon Modal */}
      <AddHackathonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddHackathon={handleAddHackathon}
      />
    </div>
  );
}
