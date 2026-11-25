import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Clock, 
  CheckSquare, 
  Square,
  AlertCircle,
  FileText,
  Navigation,
  Train,
  Plane
} from 'lucide-react';
import { getGoogleCalendarUrl } from '../utils/calendarExport';

export default function DetailSheet({ hackathon, onClose }) {
  const [copiedId, setCopiedId] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});
  const [teamNote, setTeamNote] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Load and save tasks in localStorage
  useEffect(() => {
    if (!hackathon) return;
    try {
      const savedTasks = localStorage.getItem(`tasks_${hackathon.id}`);
      if (savedTasks) {
        setCompletedTasks(JSON.parse(savedTasks));
      } else {
        const initial = {};
        (hackathon.deliverables || []).forEach((_, idx) => {
          initial[idx] = false;
        });
        setCompletedTasks(initial);
      }

      const savedNote = localStorage.getItem(`note_${hackathon.id}`);
      if (savedNote) setTeamNote(savedNote);
      else setTeamNote('');
    } catch {
      // Ignore storage errors
    }
  }, [hackathon]);

  const toggleTask = (index) => {
    const next = { ...completedTasks, [index]: !completedTasks[index] };
    setCompletedTasks(next);
    localStorage.setItem(`tasks_${hackathon.id}`, JSON.stringify(next));
  };

  const handleNoteChange = (e) => {
    const val = e.target.value;
    setTeamNote(val);
    localStorage.setItem(`note_${hackathon.id}`, val);
  };

  const handleCopyId = () => {
    if (hackathon?.registrationId) {
      navigator.clipboard.writeText(hackathon.registrationId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  if (!hackathon) return null;

  const isSuperSunday = hackathon.nextDeadline && hackathon.nextDeadline.startsWith('2026-11-30');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
        />

        {/* Slide-over Drawer Panel (Responsive: full width on mobile, max-w-xl on desktop) */}
        <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-full sm:w-screen sm:max-w-xl bg-white border-l border-zinc-200 shadow-2xl flex flex-col h-full"
          >
            {/* Mobile Sheet Pull Handle */}
            <div className="sm:hidden pt-2 pb-1 flex justify-center bg-zinc-50/50">
              <div className="w-10 h-1 bg-zinc-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-zinc-200/80 bg-zinc-50/50 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {hackathon.platform}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    {hackathon.mode}
                  </span>
                  {isSuperSunday && (
                    <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      30 Nov Due
                    </span>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="p-2 -mr-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
                  aria-label="Close sheet"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 tracking-tight leading-snug break-words">
                  {hackathon.title}
                </h2>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
                  {hackathon.organizer}
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex items-center gap-2 pt-1 flex-wrap sm:flex-nowrap">
                <a
                  href={hackathon.dashboardUrl || hackathon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-10 sm:h-9 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition shadow-xs"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {hackathon.registrationId && (
                  <button
                    onClick={handleCopyId}
                    className="h-10 sm:h-9 px-3 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                    title="Click to copy registration ID"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>ID: {hackathon.registrationId.slice(0, 6)}...</span>
                      </>
                    )}
                  </button>
                )}

                <a
                  href={getGoogleCalendarUrl(hackathon)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 sm:h-9 px-3 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition shadow-2xs"
                  title="Add milestone to Google Calendar"
                >
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>GCal</span>
                </a>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="p-2.5 sm:p-3 rounded-lg border border-zinc-200/80 bg-zinc-50/40">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Prize Pool
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 font-mono">
                    {hackathon.prizePool}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg border border-zinc-200/80 bg-zinc-50/40">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Next Due Date
                  </span>
                  <span className="text-xs font-semibold text-zinc-900 block truncate">
                    {hackathon.nextDeadlineDisplay || 'Check Portal'}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-lg border border-zinc-200/80 bg-zinc-50/40 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                    Finale Venue
                  </span>
                  <span className="text-xs font-semibold text-zinc-900 block truncate">
                    {hackathon.venueCity || 'Online / Hybrid'}
                  </span>
                </div>
              </div>

              {/* Tagline / Overview */}
              {hackathon.tagline && (
                <div className="text-xs text-zinc-600 leading-relaxed bg-zinc-50/60 p-3 sm:p-3.5 rounded-lg border border-zinc-200/60">
                  <span className="font-semibold text-zinc-800">Brief: </span>
                  {hackathon.tagline}
                </div>
              )}

              {/* Deliverables & Submission Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Submission Checklist</span>
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    Auto-saved
                  </span>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  {(hackathon.deliverables && hackathon.deliverables.length > 0
                    ? hackathon.deliverables
                    : [
                        'Review official problem statement guidelines',
                        'Prepare solution architecture & slides',
                        'Record screen walkthrough demo video',
                        'Submit final deliverables on portal before cutoff'
                      ]
                  ).map((item, idx) => {
                    const isChecked = !!completedTasks[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleTask(idx)}
                        className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-colors cursor-pointer text-xs min-h-[44px] ${
                          isChecked
                            ? 'bg-zinc-50/80 border-zinc-200 text-zinc-400 line-through'
                            : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                        }`}
                      >
                        <button className="mt-0.5 text-zinc-400 hover:text-zinc-600 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-300" />
                          )}
                        </button>
                        <span className="flex-1 leading-normal break-words">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Milestones Timeline */}
              {hackathon.keyMilestones && hackathon.keyMilestones.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Milestones</span>
                  </h3>

                  <div className="relative pl-3.5 space-y-3.5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
                    {hackathon.keyMilestones.map((m, idx) => {
                      const isDone = m.status === 'completed';
                      const isCurrent = m.status === 'current';
                      return (
                        <div key={idx} className="relative pl-3">
                          <div
                            className={`absolute -left-3.5 top-1.5 w-2 h-2 rounded-full ring-4 ring-white ${
                              isDone
                                ? 'bg-zinc-400'
                                : isCurrent
                                ? 'bg-emerald-500 ring-emerald-100 animate-pulse'
                                : 'bg-zinc-300'
                            }`}
                          />
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
                            <span
                              className={`text-xs font-semibold ${
                                isCurrent
                                  ? 'text-zinc-900'
                                  : isDone
                                  ? 'text-zinc-400 line-through'
                                  : 'text-zinc-600'
                              }`}
                            >
                              {m.title}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 whitespace-nowrap">
                              {m.dateDisplay}
                            </span>
                          </div>
                          {m.description && (
                            <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed break-words">
                              {m.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Venue & Travel Info */}
              {hackathon.finaleVenue && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Venue Logistics</span>
                  </h3>

                  <div className="p-3 rounded-lg border border-zinc-200/80 bg-zinc-50/40 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-zinc-800 block break-words">
                        {hackathon.finaleVenue}
                      </span>
                      {hackathon.venueAddress && (
                        <span className="text-[11px] text-zinc-500 mt-0.5 block break-words">
                          {hackathon.venueAddress}
                        </span>
                      )}
                    </div>

                    {hackathon.conflictNote && (
                      <div className="flex items-start gap-2 p-2 rounded bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-800 break-words">
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-600" />
                        <span>{hackathon.conflictNote}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Team Scratchpad / Notes */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Team Scratchpad</span>
                </h3>
                <textarea
                  value={teamNote}
                  onChange={handleNoteChange}
                  placeholder="Jot down pitch ideas, repo URLs, teammate assignments..."
                  className="w-full h-24 p-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-3.5 sm:p-4 border-t border-zinc-200 bg-zinc-50/80 flex items-center justify-between text-xs text-zinc-500">
              <span className="text-[10px] sm:text-[11px] font-mono">Team Outliers</span>
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-md transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
