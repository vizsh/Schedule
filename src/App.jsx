import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import TopAlertBar from './components/TopAlertBar';
import DeadlinesView from './components/DeadlinesView';
import CalendarView from './components/CalendarView';
import ConflictsView from './components/ConflictsView';
import VenuesView from './components/VenuesView';
import DetailSheet from './components/DetailSheet';
import AddEventModal from './components/AddEventModal';
import { HACKATHONS_DATA } from './data/hackathonsData';

export default function App() {
  const [activeTab, setActiveTab] = useState('deadlines'); // 'deadlines' | 'calendar' | 'conflicts' | 'venues'
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

  // Combine default dataset with custom items
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

  // Filtered list based on search and category filter
  const filteredHackathons = useMemo(() => {
    return allHackathons.filter((h) => {
      const matchesSearch =
        !searchQuery.trim() ||
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (h.finaleVenue && h.finaleVenue.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (h.venueCity && h.venueCity.toLowerCase().includes(searchQuery.toLowerCase())) ||
        h.prizePool.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

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

  const handleFilterSuperSunday = () => {
    if (categoryFilter === 'super_sunday') {
      setCategoryFilter('all');
    } else {
      setActiveTab('deadlines');
      setCategoryFilter('super_sunday');
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top Banner (Compact Alert) */}
      <TopAlertBar
        onFilterSuperSunday={handleFilterSuperSunday}
        isSuperSundayActive={categoryFilter === 'super_sunday'}
      />

      {/* Top Navbar */}
      <Navbar
        hackathons={allHackathons}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        {activeTab === 'deadlines' && (
          <DeadlinesView
            hackathons={filteredHackathons}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectHackathon={(h) => setSelectedHackathon(h)}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            hackathons={allHackathons}
            onSelectHackathon={(h) => setSelectedHackathon(h)}
          />
        )}

        {activeTab === 'conflicts' && (
          <ConflictsView
            onSelectHackathon={(h) => setSelectedHackathon(h)}
          />
        )}

        {activeTab === 'venues' && <VenuesView />}
      </main>

      {/* Slide-over Detail Sheet */}
      {selectedHackathon && (
        <DetailSheet
          hackathon={selectedHackathon}
          onClose={() => setSelectedHackathon(null)}
        />
      )}

      {/* Add Custom Event Modal */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddHackathon={handleAddHackathon}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-5 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800 tracking-tight">Team Outliers</span>
            <span className="text-zinc-300">•</span>
            <span>SPIT Mumbai</span>
            <span className="text-zinc-300">•</span>
            <span className="font-mono text-[11px] text-zinc-400">SIH #127114 · GAVS #6ad0ebc2</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
            <span>10 Competitions</span>
            <span>•</span>
            <span className="font-mono font-medium text-zinc-700">₹43,70,000+ Tracked</span>
            <span>•</span>
            <span>Vercel Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
