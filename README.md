# Kone pod hradom

Website for **OZ Tymián – kone pod hradom** (Krásnohorské Podhradie) and the
**Ekovan – Ekocentrum pri koňoch** project, supported by the Terra Incognita
programme.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS v4 — design tokens in `src/app/globals.css`
- `next-intl` v4 — Slovak (default), Hungarian, English with localized URLs
- Fully static: every page is prerendered at build time

## Getting started

```bash
npm run dev     # http://localhost:3000 -> redirects to /sk
npm run build
npm run lint
```

## Layout

```
messages/                 sk.json | hu.json | en.json — all copy lives here
src/
  app/[locale]/           one folder per route, named with the Slovak pathname
  components/             header, footer, publicity block, page header
  content/site.ts         contact details + social links
  content/services.ts     the bookable catalogue (see below)
  i18n/routing.ts         locales + the localized pathname map
  i18n/navigation.ts      locale-aware Link / router — always import from here
  lib/metadata.ts         canonical + hreflang per page
  proxy.ts                next-intl middleware (Next 16 calls it "proxy")
```

## Adding or changing content

Copy is never hardcoded in components. Edit `messages/sk.json` and mirror the
same keys in `hu.json` and `en.json` — the three files must stay in sync.

Adding a page means: a folder under `src/app/[locale]/`, an entry in
`pathnames` in `src/i18n/routing.ts`, and nav entries in `site-header.tsx` /
`site-footer.tsx`.

## Room left for the reservation system

The booking flow is planned but not built. The seams are already in place:

- **`/rezervacia`** (`/foglalas`, `/booking`) exists as a "coming soon" page,
  already in the nav and already indexed. The booking UI replaces its body.
- **`src/content/services.ts`** holds the catalogue as typed records with
  `durationMinutes`, `capacity`, `priceEur` and `bookable`. These become the
  rows the booking flow reads; no page or translation needs to change.
- Marketing copy lives in JSON, so adding a database touches reservations only.
- When it lands: Neon Postgres for the data, an auth-gated `/admin` for the
  organisers (a real login, not a hidden URL), Resend for confirmation e-mails.

## Before going live

- [ ] Real e-mail and phone in `src/content/site.ts`
- [ ] Three Terra Incognita logos in `public/publicity/` (see the README there)
- [ ] The prescribed funding sentence per the publicity manual
- [ ] Photographs in `public/galeria/`, listed in the gallery page
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] Native review of the Hungarian and English copy
