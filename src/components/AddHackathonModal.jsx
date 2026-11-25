import React, { useState } from 'react';
import { X, Plus, Calendar, Trophy, MapPin, Link2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AddHackathonModal({ isOpen, onClose, onAddHackathon }) {
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [platform, setPlatform] = useState('Unstop');
  const [url, setUrl] = useState('');
  const [prizePool, setPrizePool] = useState('₹1,00,000');
  const [category, setCategory] = useState('AI & Web Innovation');
  const [mode, setMode] = useState('Hybrid');
  const [nextAction, setNextAction] = useState('Submit Project & Pitch Deck');
  const [nextDeadline, setNextDeadline] = useState('2026-12-15');
  const [finaleVenue, setFinaleVenue] = useState('Mumbai, Maharashtra');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newHackathon = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      shortName: title.trim().split(' ').slice(0, 3).join(' '),
      tagline: 'Registered Custom Hackathon for Team Outliers',
      organizer: organizer.trim() || 'Independent Organizing Committee',
      platform: platform,
      platformBadgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      url: url.trim() || 'https://unstop.com',
      dashboardUrl: url.trim() || 'https://unstop.com',
      registrationId: `CUSTOM-${Math.floor(100000 + Math.random() * 900000)}`,
      mode: mode,
      category: category.trim(),
      teamSize: '1–4 Members',
      currentPhase: 'Active Preparation',
      status: 'in_progress',
      statusText: 'Registered & Active',
      statusBadgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-1 ring-indigo-500/20',
      prizePool: prizePool.trim(),
      prizePoolNumber: parseInt(prizePool.replace(/[^0-9]/g, '')) || 100000,
      prizeBreakdown: [{ label: 'Total Prize Pool', amount: prizePool.trim() }],
      nextAction: nextAction.trim(),
      nextDeadline: `${nextDeadline}T23:59:00+05:30`,
      finaleDate: `${nextDeadline}T10:00:00+05:30`,
      finaleVenue: finaleVenue.trim() || 'Online / Offline Venue',
      venueCity: finaleVenue.trim().split(',')[0] || 'TBD',
      venueAddress: finaleVenue.trim(),
      venueType: mode,
      conflictRisk: 'Low',
      keyMilestones: [
        {
          title: 'Project Submission Deadline',
          date: `${nextDeadline}T23:59:00+05:30`,
          dateDisplay: nextDeadline,
          status: 'current',
          isUrgent: false,
          description: nextAction.trim()
        }
      ],
      deliverables: ['Working MVP / Prototype', 'Pitch Presentation Deck', 'GitHub Code Repository'],
      themes: [category.trim()],
      strategicAdvice: 'Custom booked event. Ensure milestone requirements are mapped to team calendar.'
    };

    onAddHackathon(newHackathon);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">
              TEAM OUTLIERS PLANNER
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Book / Add a Registered Hackathon
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Hackathon Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HackCelestial 2026, Smart City Sprint..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Organizer / College</label>
              <input
                type="text"
                placeholder="e.g. IIT Delhi, Devfolio, Google..."
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition"
              >
                <option value="Unstop">Unstop</option>
                <option value="Hack2skill">Hack2skill</option>
                <option value="HackCulture">HackCulture</option>
                <option value="Hack4Hack">Hack4Hack</option>
                <option value="Devfolio">Devfolio</option>
                <option value="E-Cell / Campus">E-Cell / Campus</option>
                <option value="Independent Portal">Independent Portal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Prize Pool</label>
              <input
                type="text"
                placeholder="e.g. ₹2,00,000"
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Format / Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition"
              >
                <option value="Hybrid">Hybrid (Online + Offline Finals)</option>
                <option value="Online (Virtual)">100% Online (Virtual)</option>
                <option value="In-Person Offline">100% In-Person Offline</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Portal / Registration URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Next Deadline Date</label>
              <input
                type="date"
                required
                value={nextDeadline}
                onChange={(e) => setNextDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Finale Venue / City</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Bangalore..."
                value={finaleVenue}
                onChange={(e) => setFinaleVenue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Next Action Required</label>
            <input
              type="text"
              placeholder="e.g. Upload 10-slide pitch presentation and demo video..."
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-indigo-500 transition"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-300 transition cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Save to My Planner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
