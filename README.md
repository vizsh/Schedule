# 🏆 Team Outliers • Hackathon Command & Schedule Booker

> **State-of-the-art schedule manager, deadline radar, and logistics booker tailored for Team Outliers (Sardar Patel Institute of Technology, Mumbai).**

![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)
![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ⚡ Overview & Strategic Mission

Team Outliers is actively registered across **10 high-stakes national and international hackathons** totaling over **₹48,70,000+ in cash prize pools** and **₹1–5 Crore in institutional seed investment offers**.

With concurrent submissions and overlapping grand finale dates across Mumbai, Indore, New Delhi, and Bengaluru, this portal acts as an intelligent command center to:
1. **Track all deadlines down to the second** with live countdown clocks.
2. **Flag concurrent timeline bottlenecks** via an automated Conflict Radar (e.g. *Super Sunday 30 Nov 23:59 IST* where 5 submissions are due simultaneously!).
3. **Explore monthly timelines** in an Interactive Day-by-Day Calendar (November & December 2026).
4. **Coordinate Grand Finale Travel & Venues** (IIT Bombay Powai, Atharva University Malad, Brilliant Convention Centre Indore, New Delhi, and Bangalore Main Palace).
5. **Manage Team Deliverables & Sprint Delegations** with persistent task checklists.
6. **Export instant `.ICS` calendar files** to sync directly with Google Calendar, Apple Calendar, or Outlook.

---

## 📅 The 10 Tracked Competitions

| Hackathon | Organizer & Platform | Format | Total Prize Pool | Next Milestone & Critical Date | Grand Finale Venue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TECH4BHARAT — GAVS Hackathon 2026** | KAVMS × RVCE × Jan AI (`HackCulture`) | Hybrid | **₹15,00,000** | Prototype Dev LIVE (Due 13 Dec 23:59 IST) | Bangalore Main Palace, Bengaluru |
| **BUILD 2036** | TiE Global Summit × Hack2skill (`Hack2skill`) | Hybrid | **₹6,00,000** | Prototype Closes **30 Nov EOD** | Brilliant Convention Centre, Indore |
| **LogiTHON 2026** | Softlink Global Ltd (`Unstop`) | Hybrid | **₹3,00,000** | Round 1 PPT + Video Due **30 Nov 23:59 IST** | Atharva University, Malad (W), Mumbai |
| **Innodata AI Hackathon 2026** | Innodata Inc. × Hack2skill (`Hack2skill`) | Hybrid | **₹10,00,000** | Pipeline Submissions Due **06 Dec 2026** | In-Person Arena, New Delhi |
| **Build It With AI** | FirstCheq × E-Cell IIT Bombay (`E-Summit`) | Hybrid | **₹3,00,000 + ₹1–5 Cr Seed** | Round 1 Pitch Deck Due **30 Nov 23:59 IST** | IIT Bombay Campus, Powai, Mumbai |
| **Creative Newtech Innovation Challenge** | Creative Newtech × E-Cell IIT Bombay (`i-Hack`) | Hybrid | **₹3,50,000** | Solution Paper Due **30 Nov EOD** | IIT Bombay Campus, Powai, Mumbai |
| **Maruti Suzuki Ideathon** | Maruti Suzuki × IIT Bombay (`E-Summit`) | Hybrid | **Cash + Pilot Deploy** | Concept Presentation Due **30 Nov EOD** | IIT Bombay Campus, Powai, Mumbai |
| **NovaStark Hacks 2026** | NovaStark Hacks (`Hack4Hack`) | Hybrid | **₹2,70,000** | Online Round 1 Closes **07 Dec 2026** | Mumbai Campus Venue |
| **Buildathon 1.0** | Hack4Hack Community (`Hack4Hack`) | 100% Online | **₹50,000** | Round 1 PPT Closes **06 Dec 2026** | Virtual Evaluation |
| **Smart India Hackathon (SIH) 2026** | MoE Innovation Cell × AICTE (`sih.gov.in`) | In-Person | **₹1,00,000 / PS** | **QUALIFIED FOR GRAND FINALE** (PS 187 MHA) | Designated Central Nodal Centre |

---

## 🚨 Critical Conflict Matrix & Squad Strategy

1. **Super Sunday Crunch (Sunday, 30 Nov 2026 at 23:59 IST)**:
   - 5 submissions due simultaneously (BUILD 2036, LogiTHON, Build It With AI, Creative Newtech, Maruti Suzuki).
   - *Action Plan*: Pair team members into 2-person squads to complete LogiTHON and BUILD 2036 on Friday/Saturday (Nov 28-29) to avoid last-minute portal slowdowns.
2. **Mumbai Double Finales (12–13 Dec 2026)**:
   - LogiTHON 24-hr Hackathon at Atharva University (Malad West) vs IIT Bombay E-Summit (Powai).
   - *Action Plan*: Divide into Squad A (Atharva Malad 24-hr coding) and Squad B (IIT Bombay pitch sessions) — campuses are ~45 minutes apart via JVLR.
3. **Tight Turnaround to Indore (13–14 Dec 2026)**:
   - TiE Global Summit in-person demo day begins Monday Dec 14 at 9:00 AM in Indore immediately after Mumbai hackathons conclude on Dec 13.
4. **Year-End Flagship (27 Dec 2026)**:
   - GAVS Tech4Bharat Grand Finale at the historic **Bangalore Main Palace**.

---

## 👥 Team Outliers Roster (SPIT Mumbai)

- **Jeevesh Bodhani** — Team Leader & Architect
- **Swayam Panchal** — Full-Stack & Systems Engineer
- **Shreyas Kale** — AI/ML & Vision Specialist
- **Dravvya Jain** — Data & Pipeline Engineer
- **Rishit Lahoti** — Backend & Cloud Architect
- **Vrindaa Talwar** — Product Strategy & Research Nominee

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (Light SaaS Aesthetic, crisp typography, responsive layout)
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti
- **State Persistence**: Browser `localStorage` for bookmarks, custom events, and checklist progress
- **Export Standards**: RFC 5545 iCalendar (`.ics`) generation & Google Calendar URL format

---

## 🚀 Deployment & Local Setup

```bash
# Clone the repository
git clone https://github.com/vizsh/Schedule.git
cd Schedule

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Deployable to **Vercel** with zero extra configuration!
