# LulaGazette

**Pan-African & South African legal intelligence — for individuals, lawyers, and scholars across all 54 African countries.**

Built by **Lulamile Mkhungela** in Johannesburg.

LulaGazette is an active legal intelligence platform: a central gateway for official gazettes, Acts of Parliament, landmark apex court rulings, court forms, procedural rules, regulations, multi-source live data scrapers, plain-language guides, drafting templates, and an in-app document reader. It covers **all 54 sovereign African countries** and regional frameworks (African Union, ECOWAS, EAC, SADC, OHADA). It is **not a law firm**. The founder is **not a lawyer**. For advice on a live matter, instruct an admitted attorney or advocate in the relevant jurisdiction.

[![Status](https://img.shields.io/badge/status-active%20multi--source-brightgreen)](#status--compliance)
[![License](https://img.shields.io/badge/license-proprietary-lightgrey)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](#requirements)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Pan-African](https://img.shields.io/badge/coverage-54%20African%20Countries-blue)](#all-54-african-countries)

---

## Table of contents

- [Features](#features)
- [All 54 African Countries](#all-54-african-countries)
- [Live Scrapers & Data Pullers](#live-scrapers--data-pullers)
- [Authentication & Accounts](#authentication--accounts)
- [Who it’s for](#who-its-for)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Tech stack](#tech-stack)
- [Contributing](#contributing)
- [Licence](#licence)
- [Disclaimer](#disclaimer)

---

## Features

| Area | What you get |
|------|----------------|
| **Home** | Headline, audience-aware insight cards, search, category tiles, live harvester status |
| **Search `/s`** | Filters (African jurisdiction, category, license, date), sort, **list / grid** view, pagination |
| **Scraper Hub `/sources`** | Automated legal data pulling across 22+ African sources (AfricanLII, SAFLII, Kenya Law, LawNigeria, GhanaLII, etc.) |
| **African Atlas `/countries`** | Interactive registry of all 54 African nations, apex courts, and official gazette publications |
| **Documents `/d/[id]`** | Reader with dual-mode viewing: in-browser PDF canvas and verified official gazette text extract |
| **Authentication `/sign-in`** | Practitioner sign in & registration with African country selector and verified demo personas |
| **My Account `/account`** | User profile, active jurisdiction preference, saved documents & bookmarks, and recent scraped gazettes |
| **Audience modes** | **Individual** vs **Lawyer / Scholar** — nav, home cards, templates, directory, footer follow the switch |
| **Guides** | Step-by-step plain-language guides for work, housing, debt, consumer, and data privacy |
| **Templates** | Draft starters tagged for individuals and lawyers |
| **Directory** | African judiciaries, apex courts, CCMA, Legal Aid, bar associations, and regulators |
| **Data Coverage `/coverage`** | Transparent reporting of live connectors, provenance contracts, and verification guidelines |

---

## All 54 African Countries

LulaGazette covers all 54 sovereign African nations grouped by region, plus supranational frameworks:

- **Southern Africa**: South Africa 🇿🇦, Namibia 🇳🇦, Botswana 🇧🇼, Zimbabwe 🇿🇼, Zambia 🇿🇲, Malawi 🇲🇼, Lesotho 🇱🇸, Eswatini 🇸🇿, Mozambique 🇲🇿, Angola 🇦🇴
- **East Africa**: Kenya 🇰🇪, Tanzania 🇹🇿, Uganda 🇺🇬, Rwanda 🇷🇼, Ethiopia 🇪🇹, Seychelles 🇸🇨, Mauritius 🇲🇺, Burundi 🇧🇮, South Sudan 🇸🇸, Somalia 🇸🇴, Djibouti 🇩🇯, Eritrea 🇪🇷, Madagascar 🇲🇬, Comoros 🇰🇲
- **West Africa**: Nigeria 🇳🇬, Ghana 🇬🇭, Senegal 🇸🇳, Côte d'Ivoire 🇨🇮, Sierra Leone 🇸🇱, Liberia 🇱🇷, The Gambia 🇬🇲, Benin 🇧🇯, Togo 🇹🇬, Burkina Faso 🇧🇫, Mali 🇲🇱, Niger 🇳🇪, Guinea 🇬🇳, Guinea-Bissau 🇬🇼, Cape Verde 🇨🇻, Mauritania 🇲🇷
- **North Africa**: Egypt 🇪🇬, Morocco 🇲🇦, Algeria 🇩🇿, Tunisia 🇹🇳, Libya 🇱🇾, Sudan 🇸🇩
- **Central Africa**: DR Congo 🇨🇩, Republic of the Congo 🇨🇬, Cameroon 🇨🇲, Gabon 🇬🇦, Central African Republic 🇨🇫, Chad 🇹🇩, Equatorial Guinea 🇬🇶, São Tomé and Príncipe 🇸🇹
- **Regional Bodies**: African Union (AU), AfCFTA, ECOWAS Court of Justice, East African Court of Justice (EACJ), SADC Tribunal, OHADA

---

## Live Scrapers & Data Pullers

The platform includes an automated multi-source harvesting engine:

- **Web UI `/sources`**: Interactive console allowing users to filter by source and country, trigger live pulls, view progress logs, and save harvested gazettes.
- **API Endpoints**:
  - `GET /api/scrape?source=kenya-law&country=KE`
  - `POST /api/scrape` with `{ "source": "all", "country": "NG" }`
  - `GET /api/pull`
- **CLI Harvester**: `npm run scrape` runs `scripts/scrape_all_sources.mjs` to pull and verify all 22+ connected sources from the command line.

---

## Authentication & Accounts

- Interactive Sign In and Registration at `/sign-in`.
- Practitioners can select their active jurisdiction from all 54 African countries.
- Includes one-click demo profiles:
  - 🇿🇦 Adv. Lulamile Mkhungela (Advocate of the High Court · South Africa)
  - 🇰🇪 Dr. Amina Ochieng (Constitutional Scholar · Kenya)
  - 🇳🇬 Barrister Chinedu Adeleke (Corporate Counsel · Nigeria)
  - 🇬🇭 Kwame Mensah (Citizen & SME Owner · Ghana)
- Account management at `/account` tracks saved documents, matter files, and scraper history.

---

## Requirements

- **Node.js** 18+ (20 recommended)
- **npm** 9+

---

## Quick start

```bash
git clone <your-repo-url> lulagazette
cd lulagazette
npm install
npm run dev
```

Open the URL printed in the terminal (usually **http://localhost:3000**).

`npm run dev` binds to `0.0.0.0` and prefers port **3000** (see `scripts/dev.sh`).

### CLI Scraper

```bash
npm run scrape
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server (auto port helper) |
| `npm run dev:3000` | Force `next dev` on `0.0.0.0:3000` |
| `npm run build` | Production build (301+ static routes) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint verification |
| `npm run scrape` | Run the Pan-African multi-source legal harvester CLI |

---

## Tech stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** (design tokens under `lg-*`)
- **react-pdf** + **pdfjs-dist** — in-browser document viewer
- **Multi-Source Harvester Engine** — pulls and normalizes gazettes and judgments

---

## Licence

**Proprietary — All Rights Reserved.** See [`LICENSE`](./LICENSE).

- © 2026 **Lulamile Mkhungela**
- Local evaluation and non-production demos are allowed under the licence text.

---

## Disclaimer

Educational software and curated extracts only. Statutes and case law change. **Always verify** the current official Government Gazette, authorised law reports, and primary sources before filing or relying on anything in this app. No attorney–client relationship is created by using LulaGazette or this repository.

—
Lulamile Mkhungela  
Johannesburg, South Africa  
2026
