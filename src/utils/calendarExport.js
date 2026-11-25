// Utility to generate and download an RFC 5545 compliant .ICS file
export function generateIcsCalendar(hackathons) {
  const events = [];

  hackathons.forEach((h) => {
    (h.keyMilestones || []).forEach((m, idx) => {
      if (!m.date) return;
      const startDate = new Date(m.date);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration default

      const formatDate = (d) => {
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const dtStart = formatDate(startDate);
      const dtEnd = formatDate(endDate);
      const summary = `[${h.shortName || h.title}] ${m.title}`;
      const description = `${m.description || ''}\\n\\nOrganizer: ${h.organizer}\\nPlatform: ${h.platform}\\nPrize Pool: ${h.prizePool}\\nPortal Link: ${h.url}`;
      const location = m.venue || h.finaleVenue || h.mode;

      events.push(
        [
          'BEGIN:VEVENT',
          `UID:${h.id}-${idx}-${Date.now()}@outliers.schedule`,
          `DTSTAMP:${formatDate(new Date())}`,
          `DTSTART:${dtStart}`,
          `DTEND:${dtEnd}`,
          `SUMMARY:${summary}`,
          `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
          `LOCATION:${location}`,
          `URL:${h.url}`,
          'STATUS:CONFIRMED',
          'END:VEVENT'
        ].join('\r\n')
      );
    });
  });

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Team Outliers//Hackathon Schedule Booker//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Team Outliers Hackathons 2026',
    'X-WR-TIMEZONE:Asia/Kolkata',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Team_Outliers_Hackathon_Schedule_2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const exportHackathonsToICS = generateIcsCalendar;

// Generate single Google Calendar web link for a milestone
export function getGoogleCalendarUrl(hackathon, milestone) {
  const targetMilestone = milestone || {
    date: hackathon?.nextDeadline || '2026-11-30T23:59:00+05:30',
    title: 'Submission Due',
    description: hackathon?.tagline || 'Team Outliers Hackathon Submission',
    venue: hackathon?.finaleVenue || hackathon?.mode
  };

  const startDate = new Date(targetMilestone.date);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatGCal = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const title = encodeURIComponent(`[${hackathon?.shortName || hackathon?.title || 'Hackathon'}] ${targetMilestone.title}`);
  const details = encodeURIComponent(
    `${targetMilestone.description || ''}\n\nOrganizer: ${hackathon?.organizer || ''}\nPrize: ${hackathon?.prizePool || ''}\nLink: ${hackathon?.url || ''}`
  );
  const location = encodeURIComponent(targetMilestone.venue || hackathon?.finaleVenue || hackathon?.mode || '');
  const dates = `${formatGCal(startDate)}/${formatGCal(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
