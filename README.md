# Nairobi — Trusted AFCON Information 🇰🇪 ⚽

> **A premium, modern, living African website design system & civic verification platform for AFCON 2027 in Nairobi.**

Built for the **OSF × Andela Hackathon 2026**.

---

## 🌟 Core Creative Direction

**AFRICAN × KENYAN × SPORT × YOUTH × LIFE × HAPPINESS × PREMIUM × 3D × MOTION**

- **Living 3D WebGL Monument**: Built with Three.js, rendering an interactive geodesic soccer sphere, dynamic athletics ribbons in Kenyan national colors, and ambient savannah solar dust particles with cursor-tracking physics.
- **African Luxury Sports Palette**:
  - `earth-500` (`#C84B31`): Terracotta Rift Valley soil & running tracks
  - `sun-500` (`#E5A93C`): Acacia Sun Gold & optimism
  - `ember-500` (`#D9531E`): Athletic energy & youth vitality
  - `rift-500` (`#1F4E38`): Highland Green
  - `obsidian` (`#121314`): Modern editorial contrast
  - `savannah-sand` (`#FAF8F5`): Warm Ivory backdrop
- **Trilingual Support**: English (EN), Kiswahili (SW), and French (FR).
- **Low-Bandwidth Mode**: Automatic fallback and manual toggle replacing WebGL with an ultra-lightweight animated SVG vector medallion for battery and data savings.

---

## 🛡️ The Civic Trust Layer (FIND → UNDERSTAND → VERIFY → ACT)

Every card across the platform is backed by official sources:
* **✅ Verified**: Forest Emerald — Confirmed against official gazettes.
* **🕐 Recently Updated**: Cobalt Sky — Timetable or gate details modified within 24h.
* **⚠️ Unverified**: Ochre Amber — Public mention without formal gazette.
* **❌ Could Not Verify**: Brick Red — Triggers the "I Can't Verify This" safety fallback.

Clicking any badge launches the **Source Explorer Modal**, exposing:
- Accredited issuing body (KeNHA, National Police Service, CAF, Nairobi City County, Kenya Red Cross, MoH)
- Official document reference & publication date
- Step-by-step verification audit trail
- Explicit **AI vs. Source** distinction notice
- Direct link to offaicial source portals

---

## 📂 Pages & Features

| Route | Feature |
| :--- | :--- |
| `/` | **Homepage**: 3D hero, quick question search, 4 category cards, recent verified updates, "How Trust Works" loop, emergency banner. |
| `/ask` | **Ask AI**: Natural language Q&A, suggested chips, structured Answer Cards, next-step actions, and the "I Can't Verify This" fallback. |
| `/browse` | **Browse Categories**: Filter by status (*Verified, Updated, Unverified*), sort by recency, search within, and detail modal. |
| `/explain` | **Explain This**: Simplifies complex government gazettes and transport notices into plain-language summaries and action items. |
| `/saved` | **Saved / Favorites**: Privacy-first, zero-account local reference set (`localStorage`). |
| `/report` | **Report an Issue**: Low-friction issue reporting with immediate emergency intercept (999/112). |
| `/how-it-works` | **How It Works**: 4-step trust cycle, badge criteria legend, sources directory, and scalability roadmap. |
| `/emergency` | **Emergency Center**: 1-tap direct dialing for 999, 112, 1199 (Red Cross), and stadium medical triage locator. |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 🏗️ Tech Stack
- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS (custom Kenyan/African design tokens)
- **3D Graphics**: Three.js (WebGL Canvas with cursor physics & SVG fallback)
- **Icons & Motion**: Lucide React + Framer Motion
- **Storage**: Privacy-first Browser LocalStorage + Next.js API route handlers
