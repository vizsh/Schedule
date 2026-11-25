import React from 'react';
import { 
  ExternalLink, 
  Clock, 
  MapPin, 
  Trophy, 
  Calendar, 
  AlertTriangle, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { getGoogleCalendarUrl } from '../utils/calendarExport';

export default function HackathonCard({ 
  hackathon, 
  onOpenDetails, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const isSuperSunday = hackathon.nextDeadline && hackathon.nextDeadline.startsWith('2026-11-30');

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
      isBookmarked 
        ? 'border-indigo-400 ring-2 ring-indigo-500/10 shadow-sm' 
        : isSuperSunday 
        ? 'border-rose-200/90 hover:border-rose-300' 
        : 'border-slate-200/90 hover:border-slate-300'
    }`}>
      {/* Card Header */}
      <div className="p-5 sm:p-6 pb-4">
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${hackathon.platformBadgeColor}`}>
              {hackathon.platform}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold px-2 py-0.5 rounded bg-slate-100">
              {hackathon.mode}
            </span>
            {hackathon.registrationId && (
              <span className="text-[9px] text-slate-400 font-mono px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200">
                ID: {hackathon.registrationId}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleBookmark(hackathon.id)}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 text-amber-500 border-amber-300'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 border-slate-200'
            }`}
            title={isBookmarked ? 'Remove from My Priority Schedule' : 'Pin to My Priority Schedule'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title & Tagline */}
        <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-snug hover:text-indigo-600 transition">
          {hackathon.title}
        </h4>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {hackathon.organizer}
        </p>
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {hackathon.tagline}
        </p>

        {/* Prize Pool & Status Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Prize Pool
            </span>
            <span className="text-base font-extrabold text-slate-900 font-mono tracking-tight flex items-center gap-1 text-emerald-700">
              <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />
              {hackathon.prizePool}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Status
            </span>
            <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md border ${hackathon.statusBadgeColor}`}>
              {hackathon.statusText}
            </span>
          </div>
        </div>

        {/* Next Required Action Box */}
        <div className={`mt-4 p-3 rounded-xl border text-xs ${
          isSuperSunday 
            ? 'bg-rose-50/70 border-rose-200 text-rose-900' 
            : 'bg-indigo-50/50 border-indigo-100 text-indigo-900'
        }`}>
          <div className="flex items-center gap-1.5 font-bold mb-0.5">
            <Clock className={`w-3.5 h-3.5 ${isSuperSunday ? 'text-rose-600' : 'text-indigo-600'}`} />
            Next Action:
          </div>
          <p className="leading-snug">{hackathon.nextAction}</p>
        </div>

        {/* Finale Venue / City */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            <strong>Finale:</strong> {hackathon.finaleVenue}
          </span>
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="p-4 sm:p-5 pt-3 bg-slate-50/70 border-t border-slate-100 rounded-b-2xl flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenDetails(hackathon)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
        >
          View Full Dossier
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={hackathon.dashboardUrl || hackathon.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition shadow-2xs"
        >
          Open Portal
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
}
