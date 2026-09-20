---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: []
---

## Scope & mode

Homepage (`src/app/[locale]/page.tsx`), primary first surface for the redesign. Mode: **Persuade** — a parent decides and acts (calls).

## Audience, job, action, proof, constraints

- **Audience:** a parent on a phone, weekend afternoon, deciding on a family outing; secondary: teachers planning a group visit; secondary: castle visitors nearby.
- **Job:** resolve the parent's real doubt fast — is this safe, gentle, and suitable for a small child? — then get them to call.
- **Action:** tap the phone number. `/rezervacia` stays a placeholder; there is no booking flow.
- **Proof/content:** the association's own words ("Kone — naši kamaráti a učitelia"), the confirmed workshop facts (Tuesdays 14:00–15:00, ages 5–10 — scoped to that workshop and forest pedagogy only, not stated as site-wide), the Ekovan project, and two real photographs from the association's own Instagram (`src/content/photos.ts`). No testimonials, prices, or visitor counts exist — do not invent them; hold visible placeholders instead.
- **Constraints:** weak rural mobile signal (page must be light, usable before fully loaded); trilingual SK/HU/EN with Hungarian's longer strings tested, not assumed; Terra Incognita publicity block (three logos + funding sentence) legible in the footer, not dominant.

## Chosen direction and memorable moment

**Forest Trail Log** (see root `DESIGN.md`, now built): the page is a family's shared field-journal — a cover entry plus a bound spine of dated entries (hole-punch dot + rule line), with the not-yet-built Ekovan project staged as a loose, dashed-border, rotated page outside the spine. Emerald-led palette (Big Shoulders Stencil for headers, Inter for body), calm and legible, parents visibly present throughout. The memorable moment: the cover entry reads as "today's entry" — headline plus the phone number as the logbook's own "who to call" line, tappable immediately, not in a nav bar. It repeats once more at the closing "come visit" entry.

## Unresolved decisions

- Exact emerald hex (`#0e6b4a`, now in `DESIGN.md`'s frontmatter and live on the built site) still hasn't been sampled against the client's own preferred reference (a swatch, existing badge, printed material) — worth a follow-up check against what the client actually points to as "their" emerald.
- No image-generation tool was available this session, so the locked direction was not visualized as comps before building; the build itself is the first look at the composition — worth a screenshot/visual pass with the user before calling it final.
- The other six pages (o-nas, ponuka, ekovan, galeria, kontakt, rezervacia) only inherited the new color/type tokens via a mechanical rename — they were not compositionally rebuilt in this pass and still use their prior generic-template structure (card grids, a numbered 01/02/03 list on `/ekovan`). Extending the Forest Trail Log direction to them is separate follow-up work.
