import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  ExternalLink,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { CONFLICT_ALERTS } from '../data/hackathonsData';

export default function ConflictsView({ onSelectHackathon }) {
  const conflicts = [
    {
      id: 'super-sunday',
      title: '5 Concurrent Midnight Deadlines',
      date: 'Sunday, 30 November 2026 (23:59 IST)',
      severity: 'Critical',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      description:
        'Five major submissions close at the exact same minute across five separate portals (Hack2skill, Unstop, FirstCheq, and E-Cell IIT Bombay).',
      impactedEvents: [
        'BUILD 2036 (TiE Global Summit) — PPT & Demo Video',
        'LogiTHON 2026 (Softlink Global) — Round 1 PPT & Walkthrough',
        'Build It With AI (FirstCheq x IIT Bombay) — AI Product Deck',
        'Creative Newtech Challenge (CNL x I-Hack) — Solution Deck',
        'Maruti Suzuki Innovation Ideathon — Mobility Presentation'
      ],
      recommendation:
        'Divide and conquer by Saturday 29 Nov. Have 2 members finalize IIT Bombay decks, 2 members polish LogiTHON, and 1 member record the TiE video. Submit by 20:00 IST to avoid server bottlenecks.'
    },
    {
      id: 'mumbai-physical',
      title: 'Mumbai Physical Venue Clash',
      date: '12 – 13 December 2026',
      severity: 'High',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description:
        'Softlink LogiTHON runs a 24-hour offline hackathon at Atharva University (Malad West), while E-Cell IIT Bombay hosts in-person pitches at Powai.',
      impactedEvents: [
        'LogiTHON 2026: Atharva University, Malad West, Mumbai (~24 hours continuous)',
        'IIT Bombay Competitions: IIT Powai Campus (~22 km across Mumbai traffic)'
      ],
      recommendation:
        'Split Team Outliers into Squad Alpha (Malad) and Squad Beta (Powai). Atharva allows 2–4 members on-site.'
    },
    {
      id: 'indore-travel',
      title: 'Mumbai to Indore Travel Turnaround',
      date: '13 – 14 December 2026',
      severity: 'Medium',
      badgeColor: 'bg-zinc-100 text-zinc-700 border-zinc-200',
      description:
        'BUILD 2036 Grand Finale begins at Brilliant Convention Centre, Indore on the morning of 14 Dec, right after the Mumbai hackathons conclude.',
      impactedEvents: [
        'BUILD 2036 Finale: Brilliant Convention Centre, Indore (14–15 Dec)'
      ],
      recommendation:
        'Book the Avantika Express (overnight train) or an early BOM → IDR morning flight (1h 15m) departing evening of 13 Dec.'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-zinc-200/80 rounded-xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-4 h-4 text-zinc-700 shrink-0" />
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
            Schedule Conflict Radar & Team Allocation
          </h3>
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Automated analysis of overlapping submission cutoffs, same-day physical venues, and travel windows for Team Outliers.
        </p>
      </div>

      {/* Conflict Cards */}
      <div className="space-y-3 sm:space-y-4">
        {conflicts.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-zinc-200/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 pb-2.5 sm:pb-3 border-b border-zinc-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${c.badgeColor} shrink-0`}>
                    {c.severity} Priority
                  </span>
                  <span className="text-xs font-semibold text-zinc-900">
                    {c.title}
                  </span>
                </div>
                <span className="text-xs text-zinc-500 font-mono mt-0.5 block">
                  {c.date}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed break-words">
              {c.description}
            </p>

            {/* Impacted Events */}
            <div className="bg-zinc-50/70 rounded-lg p-3 border border-zinc-200/60">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5">
                Impacted Competitions
              </span>
              <ul className="space-y-1 text-xs text-zinc-700">
                {c.impactedEvents.map((evt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                    <span className="break-words">{evt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tactical Strategy */}
            <div className="flex items-start gap-2 p-2.5 sm:p-3 rounded-lg bg-zinc-900 text-zinc-100 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Recommended Strategy: </span>
                <span className="text-zinc-300 break-words">{c.recommendation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
