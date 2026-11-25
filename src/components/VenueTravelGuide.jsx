import React from 'react';
import { MapPin, Navigation, Calendar, Train, Plane, Car, ExternalLink, Clock, Building2 } from 'lucide-react';
import { VENUE_GUIDES } from '../data/hackathonsData';

export default function VenueTravelGuide() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            GRAND FINALE TRAVEL &amp; LOGISTICS
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Offline Hackathon Venues &amp; Transit Guide
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete venue dossiers, transit hubs, and reporting addresses for Team Outliers' in-person rounds.
          </p>
        </div>

        <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
          5 Key Destinations
        </span>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {VENUE_GUIDES.map((venue, idx) => {
          const mapQuery = encodeURIComponent(`${venue.venueName}, ${venue.city}`);
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-white p-5 flex flex-col justify-between transition hover:shadow-md"
            >
              <div>
                {/* City & Dates Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {venue.city}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {venue.dates}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base tracking-tight leading-snug">
                  {venue.venueName}
                </h4>

                <p className="text-xs text-slate-500 mt-1 flex items-start gap-1 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{venue.address}</span>
                </p>

                {/* Events taking place here */}
                <div className="mt-4 pt-3 border-t border-slate-200/70">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Competitions Hosted Here:
                  </p>
                  <ul className="space-y-1">
                    {venue.events.map((ev, i) => (
                      <li key={i} className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Travel Notes */}
                <div className="mt-3.5 p-3 rounded-xl bg-slate-100/70 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-700 text-[11px] flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-indigo-600" />
                    Transit &amp; Route Guidance:
                  </div>
                  <p className="leading-relaxed text-[11px]">{venue.travelNotes}</p>
                </div>
              </div>

              {/* Footer Map Link */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
