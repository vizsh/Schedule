import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Trophy, 
  Clock, 
  MapPin, 
  CheckSquare, 
  Square, 
  Calendar, 
  AlertTriangle, 
  Users, 
  ShieldCheck, 
  FileText,
  Lightbulb
} from 'lucide-react';
import { getGoogleCalendarUrl } from '../utils/calendarExport';

export default function HackathonDetailModal({ hackathon, onClose }) {
  if (!hackathon) return null;

  // Local state for deliverables checklist saved in localStorage
  const storageKey = `deliverables_${hackathon.id}`;
  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleDeliverable = (item) => {
    const next = { ...completedItems, [item]: !completedItems[item] };
    setCompletedItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${hackathon.platformBadgeColor}`}>
                {hackathon.platform}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold px-2 py-0.5 rounded bg-slate-200/70">
                {hackathon.mode}
              </span>
              {hackathon.registrationId && (
                <span className="text-[10px] text-indigo-700 font-mono px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                  Reg ID: {hackathon.registrationId}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {hackathon.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {hackathon.organizer}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Top Info Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Prize Pool */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Total Prize Pool
              </span>
              <span className="text-lg font-extrabold text-emerald-700 font-mono mt-0.5 block">
                {hackathon.prizePool}
              </span>
              <span className="text-[11px] text-emerald-800/80 block mt-1">
                Cash rewards &amp; perks
              </span>
            </div>

            {/* Current Phase */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">
                Current Status
              </span>
              <span className="text-sm font-extrabold text-indigo-900 mt-1 block">
                {hackathon.statusText}
              </span>
              <span className="text-[11px] text-indigo-700/80 block mt-1">
                {hackathon.currentPhase}
              </span>
            </div>

            {/* Team Size & Category */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Category &amp; Team
              </span>
              <span className="text-sm font-bold text-slate-800 mt-1 block truncate" title={hackathon.category}>
                {hackathon.category}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Team Size: {hackathon.teamSize}
              </span>
            </div>
          </div>

          {/* Strategic Advisory Box */}
          {hackathon.strategicAdvice && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-900 block mb-0.5">
                  Team Outliers Strategic Advisory:
                </strong>
                <p className="leading-relaxed">{hackathon.strategicAdvice}</p>
              </div>
            </div>
          )}

          {/* Prize Breakdown Section */}
          {hackathon.prizeBreakdown && hackathon.prizeBreakdown.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                Prize Structure &amp; Awards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {hackathon.prizeBreakdown.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="font-medium text-slate-700">{p.label}</span>
                    <strong className="text-emerald-700 font-mono font-bold">{p.amount}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Deliverables Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                Required Submission Deliverables
              </h4>
              <span className="text-[11px] text-slate-400">
                Click item to mark done
              </span>
            </div>

            <div className="space-y-2">
              {hackathon.deliverables.map((item, idx) => {
                const isChecked = !!completedItems[item];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleDeliverable(item)}
                    className={`p-3 rounded-xl border text-xs flex items-center gap-3 cursor-pointer transition select-none ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="leading-relaxed font-medium">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Milestones & Dates Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Competition Architecture &amp; Rounds
            </h4>

            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {hackathon.keyMilestones.map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-3 pl-8 text-xs">
                  <div className={`absolute left-2 top-1 h-3.5 w-3.5 rounded-full border-2 bg-white ${
                    m.status === 'completed'
                      ? 'border-emerald-500 bg-emerald-500'
                      : m.isUrgent
                      ? 'border-rose-500 bg-rose-500 animate-pulse'
                      : 'border-indigo-500'
                  }`} />

                  <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <strong className="font-bold text-slate-900">{m.title}</strong>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500 text-[11px] font-semibold">
                          {m.dateDisplay}
                        </span>
                        <a
                          href={getGoogleCalendarUrl(hackathon, m)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-indigo-600"
                          title="Add to Google Calendar"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                    {m.description && (
                      <p className="text-slate-600 mt-1 text-xs leading-relaxed">{m.description}</p>
                    )}
                    {m.venue && (
                      <div className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                        <MapPin className="w-3 h-3" />
                        Venue: {m.venue}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Venue & Travel Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Grand Finale Venue &amp; Travel Spec
            </h4>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{hackathon.finaleVenue}</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {hackathon.venueType}
                </span>
              </div>
              <p className="text-slate-600">{hackathon.venueAddress}</p>
              {hackathon.conflictNote && (
                <p className="text-rose-700 font-medium pt-1 border-t border-slate-200/60 mt-1">
                  ⚠️ Note: {hackathon.conflictNote}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
          >
            Close
          </button>

          <a
            href={hackathon.dashboardUrl || hackathon.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs shadow-indigo-300 transition cursor-pointer"
          >
            Go to Official Submission Portal
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
