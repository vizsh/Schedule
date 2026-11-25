import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, CheckCircle2, ChevronDown, ChevronUp, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import { CONFLICT_ALERTS } from '../data/hackathonsData';

export default function ConflictAlerts({ onSelectHackathon }) {
  const [expandedId, setExpandedId] = useState('conflict-super-sunday');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'HIGH':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'MEDIUM':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            SCHEDULE CONFLICT RADAR
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Schedule Overlaps &amp; Tactical Allocation Matrix
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated conflict detection to prevent missing concurrent deadlines and simultaneous offline round clashes.
          </p>
        </div>

        <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          4 Identified Conflicts
        </span>
      </div>

      {/* Accordion / List of Conflicts */}
      <div className="space-y-3.5">
        {CONFLICT_ALERTS.map((alert) => {
          const isExpanded = expandedId === alert.id;

          return (
            <div
              key={alert.id}
              className={`rounded-xl border transition duration-200 ${
                alert.severity === 'CRITICAL'
                  ? 'border-rose-200 bg-rose-50/20'
                  : alert.severity === 'HIGH'
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-slate-200 bg-slate-50/30'
              }`}
            >
              {/* Alert Header Row */}
              <div
                onClick={() => toggleExpand(alert.id)}
                className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-100 text-rose-700'
                        : alert.severity === 'HIGH'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {alert.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                      {alert.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md">
                    {alert.badge}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {alert.description}
                  </p>

                  {/* Overlapping Events Table */}
                  <div className="bg-white rounded-lg border border-slate-200 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Concurrently Active Hackathons:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {alert.affectedEvents.map((ev, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <strong className="text-slate-800 block text-xs">{ev.name}</strong>
                            <span className="text-slate-500 text-[11px] block mt-0.5">
                              {ev.requirement || ev.format || ev.venue || ev.date}
                            </span>
                          </div>
                          {ev.platform && (
                            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                              {ev.platform}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Outliers Action Plan */}
                  <div className="p-3.5 rounded-lg bg-indigo-50/80 border border-indigo-200/80 text-xs text-indigo-900">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-indigo-950">
                      <Users className="w-4 h-4 text-indigo-600" />
                      Team Outliers Strategy &amp; Squad Allocation:
                    </div>
                    <p className="leading-relaxed">
                      {alert.actionPlan}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
