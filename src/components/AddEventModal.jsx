import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Calendar, Trophy, ExternalLink, MapPin } from 'lucide-react';

export default function AddEventModal({ isOpen, onClose, onAddHackathon }) {
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    platform: 'Unstop',
    prizePool: '₹1,00,000',
    mode: 'Hybrid',
    nextDeadline: '2026-12-15T23:59:00+05:30',
    finaleVenue: 'Mumbai',
    url: '',
    registrationId: '',
    tagline: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newEvent = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      shortName: formData.title.slice(0, 20),
      organizer: formData.organizer || 'Independent Hackathon',
      platform: formData.platform,
      platformBadgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
      url: formData.url || 'https://google.com',
      dashboardUrl: formData.url || 'https://google.com',
      registrationId: formData.registrationId || '',
      mode: formData.mode,
      category: 'General Hackathon',
      teamSize: '1–4 Members',
      currentPhase: 'Active',
      status: 'registered',
      statusText: 'Registered',
      prizePool: formData.prizePool,
      tagline: formData.tagline || 'Custom competition added to schedule',
      nextDeadline: formData.nextDeadline,
      nextDeadlineDisplay: new Date(formData.nextDeadline).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      finaleVenue: formData.finaleVenue,
      venueCity: formData.finaleVenue.split(',')[0],
      deliverables: [
        'Review official competition rules',
        'Finalize solution deck & architecture',
        'Submit demo before cutoff'
      ]
    };

    onAddHackathon(newEvent);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-zinc-900 text-sm tracking-tight">
                Add Hackathon to Schedule
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Track another competition for Team Outliers
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Hackathon Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Smart India Hackathon 2026"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full h-8 px-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Organizer / Host
                </label>
                <input
                  type="text"
                  placeholder="e.g. Softlink / IIT Bombay"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full h-8 px-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full h-8 px-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                >
                  <option value="Unstop">Unstop</option>
                  <option value="Hack2skill">Hack2skill</option>
                  <option value="HackCulture">HackCulture</option>
                  <option value="Hack4Hack">Hack4Hack</option>
                  <option value="E-Cell IITB">E-Cell IIT Bombay</option>
                  <option value="Devfolio">Devfolio</option>
                  <option value="Direct">Direct Portal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Prize Pool
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹5,00,000"
                  value={formData.prizePool}
                  onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                  className="w-full h-8 px-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Next Due Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.nextDeadline.slice(0, 16)}
                  onChange={(e) =>
                    setFormData({ ...formData, nextDeadline: `${e.target.value}:00+05:30` })
                  }
                  className="w-full h-8 px-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Finale Venue
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai / Bangalore / Online"
                  value={formData.finaleVenue}
                  onChange={(e) => setFormData({ ...formData, finaleVenue: e.target.value })}
                  className="w-full h-8 px-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Registration ID (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 127114"
                  value={formData.registrationId}
                  onChange={(e) => setFormData({ ...formData, registrationId: e.target.value })}
                  className="w-full h-8 px-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Portal / Dashboard URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full h-8 px-3 text-xs bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition shadow-xs cursor-pointer"
              >
                Add to Schedule
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
