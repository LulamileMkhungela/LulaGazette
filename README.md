# LulaGazette

**South African legal information — for individuals and lawyers.**

Built by **[Lulamile Mkhungela](mailto:mkhungela.l@gmail.com)** in Johannesburg.

LulaGazette is a product-in-progress: a clear first stop for Acts, cases, court forms, rules, regulations, provincial material, plain-language guides, templates, a directory of where to go next, and an in-app PDF document reader. It is **not a law firm**. The founder is **not a lawyer**. For advice on a live matter, instruct an admitted South African attorney or advocate.

[![Status](https://img.shields.io/badge/status-work%20in%20progress-yellow)](#status--compliance)
[![License](https://img.shields.io/badge/license-proprietary-lightgrey)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](#requirements)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)

---

## Table of contents

- [Features](#features)
- [Who it’s for](#who-its-for)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Tech stack](#tech-stack)
- [Content & data](#content--data)
- [Environment](#environment)
- [Status & compliance](#status--compliance)
- [Security & privacy](#security--privacy)
- [Contributing](#contributing)
- [Licence](#licence)
- [Contact](#contact)
- [Disclaimer](#disclaimer)

---

## Features

| Area | What you get |
|------|----------------|
| **Home** | Headline, audience-aware insight cards, search, category tiles |
| **Search `/s`** | Filters (licence, date published, category), sort, **list / grid** view, pagination |
| **Documents `/d/[id]`** | Lexark-style reader: PDF canvas (pdf.js), Library / Copy link / Ask Lula (paid), details rail (Author, Year, Pages, summary) |
| **Audience modes** | **Individual** (default) vs **Lawyer** — nav, home cards, templates, directory, footer follow the switch |
| **Guides** | Plain step-by-step for work, housing, debt, consumer, POPIA, and more |
| **Templates** | Draft starters tagged for individuals and/or lawyers |
| **Directory** | Courts, CCMA, Legal Aid, regulators, professional bodies |
| **Courts** | Procedure-oriented maps for SA forums |
| **Pricing** | AI research is a **paid package**, not free default chrome |
| **Contact** | System overview & integration enquiries only (details not sprayed site-wide) |

---

## Who it’s for

- **Individuals** — everyday questions: unfair dismissal, eviction, debt, consumer rights, POPIA.
- **Lawyers** — procedure, authorities, drafting starters, matter notes stored on the device.

Toggle **For individuals / For lawyers** in the header. The choice is stored in `localStorage` (`lulagazette-audience`).

---

## Requirements

- **Node.js** 18+ (20 recommended)
- **npm** 9+
- No cloud API keys required for the default library demo

---

## Quick start

```bash
git clone <your-repo-url> lulagazette
cd lulagazette
npm install
npm run dev
```

Open the URL printed in the terminal (usually **http://localhost:3000**).

`npm run dev` binds to `0.0.0.0` and prefers port **3000** (see `scripts/dev.sh`). If 3000 is busy it tries the next free port.

### Production-style on your machine

```bash
npm run build
npm start
# optional: PORT=3001 npm start
```

More detail: [`RUN_LOCAL.md`](./RUN_LOCAL.md).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server (auto port helper) |
| `npm run dev:3000` | Force `next dev` on `0.0.0.0:3000` |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next config) |

---

## Project structure

```
lulagazette/
├── public/
│   ├── images/          # logo, landing background
│   ├── pdfs/            # educational PDF extracts (by document id)
│   ├── pdfjs/           # pdf.js worker for the in-app reader
│   ├── fonts/           # Figtree, Playfair
│   └── icons/
├── scripts/
│   └── dev.sh           # prefer free port, bind 0.0.0.0
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # UI (Header, search, DocumentViewer, PdfStage, …)
│   ├── context/         # Audience (Individual / Lawyer)
│   ├── data/            # curated SA library, guides, templates, directory
│   └── lib/             # search helpers, optional overview builders
├── LICENSE
├── README.md
├── RUN_LOCAL.md
└── package.json
```

**Useful routes**

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/s` | Search + filters + list/grid |
| `/d/[id]` | Document reader (PDF + details) |
| `/guides`, `/templates`, `/directory`, `/courts` | Audience tools |
| `/lawyers` | Matter notes workspace (device-local) |
| `/pricing`, `/contact`, `/legal/status` | Product & legal |
| `/coverage` | Data coverage, source roles, freshness limits and known gaps |

---

## Tech stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** (design tokens under `lg-*`)
- **react-pdf** + **pdfjs-dist** — in-browser document viewer
- **jsPDF** — generate educational PDF extracts for the demo corpus

---

## Content & data

- Curated educational corpus lives under `src/data/` (e.g. `legal.ts`, `guides.ts`, `templates.ts`, `directory.ts`, `insights.ts`).
- PDF files: `public/pdfs/{documentId}.pdf` with page counts in `src/data/pdfMeta.json`.
- Content is for **research demos and literacy**, not a full Gazette mirror or certified law reports.
- **Do not** bulk-scrape paywalled commercial services (Lexis, Juta, Lexpro, Case Online, etc.). Practitioners who hold licences can paste their own extracts into matter notes.

---

## Environment

No `.env` is required for the default offline library.

If you add integrations later, use `.env.local` (gitignored) and document keys here. Never commit secrets.

---

## Status & compliance

LulaGazette is an **active build**:

- Not a regulated law firm platform  
- Not fully POPIA / production-SaaS certified  
- Not a complete statute database  

See in-app **Platform status** (`/legal/status`), **Terms** (`/terms`), and **Privacy** (`/privacy`).

Roadmap items (hosting, DPIAs, LPC-adjacent workflows) will be scoped with counsel before scale.

---

## Security & privacy

- Audience mode and many notes use **browser `localStorage`** — treat demo deployments as non-confidential.
- **Do not** upload live client files or special personal information into demo forms.
- Contact PII (address, phone, email) is intended **only on Contact Us** in the product UI.
- Report security issues privately to **mkhungela.l@gmail.com** (do not open public issues with exploit detail).

---

## Contributing

This repository is primarily maintained by the founder.

1. Open an issue or email before large changes.  
2. Keep the product **South African** in content and labelling.  
3. Do not reintroduce free “AI overview” as default chrome — AI stays on **Pricing**.  
4. Do not put contact phone/email/address on every page.  
5. Run `npm run build` before proposing a merge.  
6. Respect the [LICENSE](./LICENSE) — no white-label or competing public redistributions without written permission.

---

## Licence

**Proprietary — All Rights Reserved.** See [`LICENSE`](./LICENSE).

- © 2026 **Lulamile Mkhungela**
- Local evaluation and non-production demos are allowed under the licence text.
- Production, commercial redistribution, and use of the **LulaGazette** brand require written permission.
- Third-party packages keep their own open-source licences.

`package.json` field: `"license": "UNLICENSED"` (proprietary).

---

## Contact

| | |
|--|--|
| **Founder** | Lulamile Mkhungela |
| **Email** | [mkhungela.l@gmail.com](mailto:mkhungela.l@gmail.com) |
| **Phone** | 083 719 5064 |
| **Address** | 41 Juta Street, Braamfontein, Johannesburg |

Use contact for **system overview**, **business integrations**, pricing packages, or partnerships — not for legal advice on a dispute.

---

## Disclaimer

Educational software and curated extracts only. Statutes and case law change. **Always verify** the current official Government Gazette, authorised law reports, and primary sources before filing or relying on anything in this app. No attorney–client relationship is created by using LulaGazette or this repository.

—
Lulamile Mkhungela  
Johannesburg, South Africa  
2026
