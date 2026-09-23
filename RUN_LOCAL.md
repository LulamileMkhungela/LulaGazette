# Running LulaGazette locally

Notes from Lulamile — keep this simple so anyone on the team can boot the app without drama.

## You need

- Node.js 18+ (20 is fine)
- npm 9+

## Install and start

```bash
cd lulagazette
npm install
npm run dev
```

`npm run dev` binds to `0.0.0.0` and prefers port **3000**. The terminal prints the URL.

### Port already in use

```bash
# free 3000 (macOS / Linux)
kill $(lsof -t -iTCP:3000 -sTCP:LISTEN) 2>/dev/null
npm run dev
```

Or:

```bash
PORT=3001 npm run dev
```

## Production-style on your laptop

```bash
npm run build
npm start
```

## What works offline

Home, `/s` search with filters, `/d/…` document reader (PDF + details), guides, directory, templates, courts, contact, pricing, terms, privacy, platform status.

No external keys required. South African library content is bundled.

If something throws on boot, fix that before adding features — the product has to run clean for demos.
