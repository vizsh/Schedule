import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Clock, 
  MapPin, 
  Trophy, 
  Bookmark, 
  Star,
  ChevronRight, 
  List, 
  LayoutGrid,
  Sparkles,
  Calendar
} from 'lucide-react';

export default function DeadlinesView({
  hackathons,
  categoryFilter,
  setCategoryFilter,
  bookmarkedIds,
  onToggleBookmark,
  onSelectHackathon
}) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  const getRelativeTimeTag = (dateStr) => {
    if (!dateStr) return null;
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Ended';
    if (days === 0) return 'Due Today';
    if (days === 1) return 'Tomorrow';
    return `in ${days} days`;
  };

  const getStatusBadge = (h) => {
    if (h.status === 'live_prototype') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Prototype LIVE
        </span>
      );
    }
    if (h.status === 'qualified') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
          <Trophy className="w-3 h-3 text-amber-600" />
          Qualified Finale
        </span>
      );
    }
    if (h.nextDeadline && h.nextDeadline.startsWith('2026-11-30')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          30 Nov Due
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
        Registered
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* View & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200/80">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-zinc-900 text-white shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            All Competitions ({hackathons.length})
          </button>

          <button
            onClick={() => setCategoryFilter('super_sunday')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'super_sunday'
                ? 'bg-amber-500 text-zinc-950 font-semibold shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>30 Nov Crunch (5)</span>
          </button>

          <button
            onClick={() => setCategoryFilter('prototype_live')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              categoryFilter === 'prototype_live'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Prototype LIVE (1)</span>
          </button>

          <button
            onClick={() => setCategoryFilter('qualified')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              categoryFilter === 'qualified'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            Qualified (1)
          </button>

          <button
            onClick={() => setCategoryFilter('bookmarked')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              categoryFilter === 'bookmarked'
                ? 'bg-zinc-900 text-white shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Priority ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* View Layout Toggle: List vs Grid */}
        <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
            title="Linear-style minimal list view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
            title="Compact card grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {hackathons.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-zinc-300 rounded-xl bg-white">
          <Clock className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <h4 className="text-sm font-medium text-zinc-800">No competitions found</h4>
          <p className="text-xs text-zinc-500 mt-1">Try resetting your search query or filter.</p>
          <button
            onClick={() => setCategoryFilter('all')}
            className="mt-3 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition"
          >
            Show All
          </button>
        </div>
      ) : viewMode === 'list' ? (
        /* Linear-Style Minimal List View */
        <div className="bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-2xs divide-y divide-zinc-200/60">
          {hackathons.map((h) => {
            const isBookmarked = bookmarkedIds.includes(h.id);
            const relTime = getRelativeTimeTag(h.nextDeadline);
            const isSuperSunday = h.nextDeadline && h.nextDeadline.startsWith('2026-11-30');

            return (
              <motion.div
                key={h.id}
                whileHover={{ backgroundColor: 'rgba(250, 250, 250, 0.9)' }}
                className="group p-3.5 sm:px-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-colors"
                onClick={() => onSelectHackathon(h)}
              >
                {/* Column 1: Star, Title & Organizer */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(h.id);
                    }}
                    className="mt-0.5 text-zinc-300 hover:text-amber-500 transition cursor-pointer"
                    title={isBookmarked ? 'Unstar' : 'Star as priority'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isBookmarked ? 'fill-amber-400 text-amber-500' : ''
                      }`}
                    />
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-zinc-900 text-sm tracking-tight group-hover:text-zinc-950 truncate">
                        {h.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                        {h.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                      <span>{h.organizer}</span>
                      {h.registrationId && (
                        <span className="hidden lg:inline text-[10px] font-mono text-zinc-400">
                          ID: {h.registrationId.slice(0, 10)}...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2: Status & Due Date */}
                <div className="flex items-center gap-4 shrink-0 flex-wrap sm:flex-nowrap">
                  <div>{getStatusBadge(h)}</div>

                  <div className="text-right min-w-[130px]">
                    <div className="text-xs font-semibold text-zinc-800 font-mono">
                      {h.nextDeadlineDisplay || 'TBA'}
                    </div>
                    {relTime && (
                      <span
                        className={`text-[11px] font-medium ${
                          isSuperSunday
                            ? 'text-amber-700 font-semibold'
                            : 'text-zinc-400'
                        }`}
                      >
                        {relTime}
                      </span>
                    )}
                  </div>

                  {/* Column 3: Prize & Venue */}
                  <div className="text-right hidden sm:block min-w-[90px]">
                    <span className="text-xs font-semibold text-zinc-900 font-mono block">
                      {h.prizePool}
                    </span>
                    <span className="text-[11px] text-zinc-400 block truncate max-w-[100px]">
                      {h.venueCity || h.mode}
                    </span>
                  </div>

                  {/* Column 4: Actions */}
                  <div className="flex items-center gap-2 pl-2 border-l border-zinc-100">
                    <a
                      href={h.dashboardUrl || h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition"
                      title="Open portal"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button className="text-zinc-400 group-hover:text-zinc-700 transition">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Compact Clean Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hackathons.map((h) => {
            const isBookmarked = bookmarkedIds.includes(h.id);
            const relTime = getRelativeTimeTag(h.nextDeadline);
            const isSuperSunday = h.nextDeadline && h.nextDeadline.startsWith('2026-11-30');

            return (
              <motion.div
                key={h.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                onClick={() => onSelectHackathon(h)}
                className={`bg-white rounded-xl border p-4.5 flex flex-col justify-between transition-all cursor-pointer shadow-2xs hover:shadow-sm ${
                  isBookmarked
                    ? 'border-zinc-300 ring-1 ring-zinc-300'
                    : isSuperSunday
                    ? 'border-amber-200/90'
                    : 'border-zinc-200/80 hover:border-zinc-300'
                }`}
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                        {h.platform}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium px-1.5 py-0.5 rounded bg-zinc-50">
                        {h.mode}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(h.id);
                      }}
                      className="text-zinc-300 hover:text-amber-500 transition cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-amber-400 text-amber-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title */}
                  <h4 className="font-semibold text-zinc-900 text-sm tracking-tight leading-snug line-clamp-1">
                    {h.title}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                    {h.organizer}
                  </p>

                  {/* Status Badge */}
                  <div className="mt-3">{getStatusBadge(h)}</div>
                </div>

                {/* Footer details */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                      Deadline
                    </span>
                    <span className="font-semibold text-zinc-800 font-mono text-xs">
                      {h.nextDeadlineDisplay ? h.nextDeadlineDisplay.split(',')[0] : 'TBA'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                      Prize
                    </span>
                    <span className="font-semibold text-zinc-900 font-mono text-xs">
                      {h.prizePool}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
