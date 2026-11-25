import React from 'react';
import { MapPin, Plane, Train, Navigation, ExternalLink } from 'lucide-react';
import { VENUE_GUIDES } from '../data/hackathonsData';

export default function VenuesView() {
  const venues = [
    {
      id: 'iit-bombay',
      name: 'IIT Bombay Campus',
      city: 'Powai, Mumbai',
      address: 'Main Gate Rd, IIT Area, Powai, Mumbai, Maharashtra 400076',
      events: ['Build It With AI (FirstCheq)', 'CNL x I-Hack Innovation', 'MSIL Ideathon'],
      dates: '12 – 13 December 2026',
      transit: {
        nearestAirport: 'Chhatrapati Shivaji Maharaj Int. Airport (BOM) — ~9 km (~30 min)',
        nearestStation: 'Kanjurmarg / Vikhroli (Central Railway) — ~3 km (~10 min auto)',
        metro: 'Metro Line 6 (Swami Samarth Nagar – Vikhroli) / Ghatkopar Metro',
        tips: 'Carry student ID card & government ID. Enter through Main Gate for E-Cell venues.'
      }
    },
    {
      id: 'atharva-mumbai',
      name: 'Atharva University / College of Engineering',
      city: 'Malad West, Mumbai',
      address: 'Malad-Marve Road, Charkop Naka, Asmita Jyoti Housing Society, Malad West, Mumbai 400095',
      events: ['LogiTHON 2026 (Softlink Global)'],
      dates: '12 – 13 December 2026 (24-Hour Continuous)',
      transit: {
        nearestAirport: 'Chhatrapati Shivaji Maharaj Int. Airport (BOM) — ~16 km (~45 min)',
        nearestStation: 'Malad Station (Western Railway) — ~4 km (~15 min auto/bus)',
        metro: 'Metro Line 2A (Yellow Line) — Malad West / Valnai Station',
        tips: 'Continuous 24-hr offline hackathon. Carry multi-plug extension cords and power banks.'
      }
    },
    {
      id: 'brilliant-indore',
      name: 'Brilliant Convention Centre (BCC)',
      city: 'Indore, Madhya Pradesh',
      address: 'Plot No. 5, Scheme No. 78, Part II, Vijay Nagar, Indore, Madhya Pradesh 452010',
      events: ['BUILD 2036 (TiE Global Summit)'],
      dates: '14 – 15 December 2026',
      transit: {
        nearestAirport: 'Devi Ahilyabai Holkar Airport (IDR) — ~14 km (~30 min cab)',
        nearestStation: 'Indore Junction (INDB) — ~8 km (~20 min cab)',
        transitOption: 'Overnight train from Mumbai: Avantika Express (12961) or 1h 15m BOM → IDR flight',
        tips: 'TiE Global Summit venue. Formal or business-casual attire recommended for investor pitches.'
      }
    },
    {
      id: 'bangalore-palace',
      name: 'Bangalore Main Palace',
      city: 'Bengaluru, Karnataka',
      address: 'Palace Road, Vasanth Nagar, Bengaluru, Karnataka 560052',
      events: ['TECH4BHARAT — GAVS Hackathon 2026'],
      dates: '27 December 2026 (09:00 AM – 06:00 PM)',
      transit: {
        nearestAirport: 'Kempegowda International Airport (BLR) — ~32 km (~50 min via KIA bus or cab)',
        nearestStation: 'KSR Bengaluru City Junction (SBC) / Bengaluru Cantt (BNC) — ~4 km',
        metro: 'Cubbon Park Metro Station (Purple Line) — ~3 km',
        tips: 'Global Accelerator Vision Summit. High-profile investor audience.'
      }
    },
    {
      id: 'innodata-delhi',
      name: 'Innodata India HQ / Hub',
      city: 'Noida / New Delhi NCR',
      address: 'Innodata India Private Limited, Sector 62, Noida, Uttar Pradesh 201309',
      events: ['Innodata AI Hackathon 2026'],
      dates: '20 December 2026',
      transit: {
        nearestAirport: 'Indira Gandhi International Airport (DEL) — ~35 km (~1 hr)',
        nearestStation: 'New Delhi Railway Station (NDLS) / Anand Vihar (ANVT) — ~15 km',
        metro: 'Noida Electronic City Metro (Blue Line) — ~1.5 km',
        tips: 'Bring laptop, HDMI adapter, and presentation on USB drive.'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-zinc-700" />
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
            Offline Venue Logistics & Commute Guide
          </h3>
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Addresses, nearest transit hubs, transit timings, and practical pointers for Team Outliers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map((v) => (
          <div
            key={v.id}
            className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-zinc-900 text-sm tracking-tight">
                    {v.name}
                  </h4>
                  <span className="text-xs font-mono text-zinc-500 block mt-0.5">
                    {v.city}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                  {v.dates}
                </span>
              </div>

              <p className="text-xs text-zinc-500 mt-2 font-mono">
                {v.address}
              </p>

              {/* Tagged Competitions */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                {v.events.map((evt, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-zinc-700"
                  >
                    {evt}
                  </span>
                ))}
              </div>

              {/* Transit Details */}
              <div className="mt-4 pt-3 border-t border-zinc-100 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-zinc-600">
                  <Plane className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-400" />
                  <span>{v.transit.nearestAirport}</span>
                </div>

                <div className="flex items-start gap-2 text-zinc-600">
                  <Train className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-400" />
                  <span>{v.transit.nearestStation}</span>
                </div>

                {v.transit.metro && (
                  <div className="flex items-start gap-2 text-zinc-600">
                    <Navigation className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-400" />
                    <span>{v.transit.metro}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Practical Tip */}
            <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/60 text-[11px] text-zinc-600">
              <span className="font-semibold text-zinc-800">Note: </span>
              {v.transit.tips}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
