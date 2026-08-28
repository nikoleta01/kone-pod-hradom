---
target: homepage and shared chrome
total_score: 17
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
timestamp: 2026-08-24T16-32-16Z
slug: src-app-locale-page-tsx
---
Method: dual-agent (A: design review · B: detector + mechanical evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | `language-switcher.tsx:26` calls `router.replace()` with no pending state; `site-header.tsx:86` sets `aria-current` but ships an unconditional `className`, so mobile shows no current page |
| 2 | Match System / Real World | 2 | Conversion CTA reads "Napíšte nám" (*write to us*) on a phone-call product; "Rezervácia" in primary nav reserves nothing |
| 3 | User Control and Freedom | 2 | Mobile menu has no Escape, no dismiss overlay, no focus trap, no scroll lock; no skip link past a `sticky z-50` header |
| 4 | Consistency and Standards | 3 | Strong token discipline; deducted for `actions.seeOffer` rendering twice at two weights to one URL, and locale switcher as `<button>` not `<a>` |
| 5 | Error Prevention | 1 | `services.ts` ships invented durations/capacities rendered as fact; `site.ts` ships `+421 900 000 000` as a live `tel:` |
| 6 | Recognition Rather Than Recall | 1 | Zero images, icons or marks site-wide; two real photos sit unreferenced while `galeria/page.tsx:21` reads `const photos = []` |
| 7 | Flexibility and Efficiency | 1 | Scored, not n/a — the missing accelerator IS the product: tap-to-call exists on one page, three taps deep |
| 8 | Aesthetic and Minimalist Design | 2 | Clean but undifferentiated; publicity block dominates the footer it was told not to dominate |
| 9 | Error Recovery | 2 | `not-found.tsx` is decent; no error boundary, no offline state, no stalled-locale feedback |
| 10 | Help and Documentation | 2 | Scored, not n/a — for Persuade, "help" is pre-visit reassurance: no hours, season, minimum age, prices, map or directions |
| **Total** | | **17/40** | **Poor — major UX overhaul required** |

## Design Specificity Verdict

**LLM assessment.** The user's "very AI generic" reading is correct, and the operational test proves it: delete `messages/sk.json`, drop in strings for a yoga studio, a winery or a dental practice, and not one line of `page.tsx` or `globals.css` would need to change.

It lands dead centre in the AI-default cluster, not adjacent to it. Warm cream ground (`--color-cream: #faf6ef`). Terracotta accent (`--color-clay: #b4633c`) — the canonical value, used **exactly once in the entire codebase**, tinting six decorative numerals on a secondary page. High-contrast serif display plus neutral grotesque (`Source_Serif_4` + `Inter`), the most-generated type pairing in existence. Pill buttons, `rounded-2xl` cards, an uppercase `tracking-[0.2em]` eyebrow, and five alternating full-bleed bands on an identical `py-16 md:py-24` rhythm.

The scaffold's own excuse — "deliberately quiet placeholder palette, a starting point, not a decision" — does not survive contact with the output, because the problem is not the hues. There is no visual idea at all: five stacked centre-constrained `max-w-6xl` bands, no asymmetry, no overlap, no scale contrast beyond three type sizes, no texture, rule, mark or motif.

The damning absence: the product is called *kone pod **hradom*** — horses **below the castle**. The castle is in the name, the eyebrow, the meta description and the body copy of all three locales. **Krásna Hôrka appears nowhere in the visual language.** No silhouette, no ridge line, no graphic gesture. The one thing that makes this place unmistakable was converted into body text. Same for horse form, hoof, and thyme — *Tymián* is the association's name, a herb, and a planned herb garden.

**Deterministic scan.** `detect.mjs --json src/app src/components` returned `[]`, **exit 0 — zero findings**. Re-run against the whole `src` tree: also zero. Assessment B verified this is a real clean scan, not a silent no-op, by confirming the walker includes `.tsx/.ts/.css` and that rules including `ai-color-palette`, `overused-font`, `gradient-text`, `flat-type-hierarchy` and `monotonous-spacing` were loaded and simply did not match. No false positives to adjudicate.

**This disagreement is the single most important finding in the report.** The detector is a floor check — it catches botched craft. The craft here is genuinely clean: zero hex literals outside the token block, zero inline styles, four arbitrary Tailwind values total, a passing `next build` producing 24 static pages with no warnings. The scaffold has no defects. It also has no design. A clean detector run cannot distinguish "well-made" from "not yet started," and here it is reporting the second as though it were the first.

**Visual overlays.** No user-visible overlay is available: no browser-automation tool was exposed in this session, so browser visualization was skipped rather than attempted. Playwright MCP has now been added to `.mcp.json` and will be available next session.

## Overall Impression

The engineering is better than most trilingual sites ship with. The design has not begun. Token indirection is total, i18n is structural rather than bolted on, and absences are honestly marked with TODOs — which means the criticism above is expensive in design time and nearly free in engineering time.

The single biggest opportunity is not the palette. It is that **the product's goal and the product's subject are both missing from the interface**: there is no phone number on the homepage, and there is no horse anywhere on the site.

## What's Working

1. **Token architecture is the reason a redesign is cheap.** Eight semantic colour tokens plus two font variables in one `@theme` block, and every component reads them. Assessment B confirmed mechanically: zero hex literals across nine routes and five components, zero inline styles, four arbitrary values total. Swapping the entire visual world is a one-file edit.
2. **i18n is properly structural.** `services.ts` separates structural data from translatable copy; `layout.tsx` requests `latin-ext` with an accurate comment naming the specific glyphs; `setRequestLocale` is called in every route for static rendering; the switcher carries `lang={code}` and `sr-only` full names.
3. **Absences are marked, not papered over.** Dashed publicity placeholders with a TODO naming the exact manual; READMEs listing what is needed; both contact placeholders flagged. This makes the `services.ts` fabrication an aberration rather than a pattern.

## Priority Issues

**[P0] The conversion does not exist on the page.**
No phone number on the homepage, in the header, or in the footer. `grep "site.phone"` hits only `kontakt/page.tsx`. The single `tel:` link is three taps deep inside a `<dl>`, styled identically to the `mailto:` above it. The hero CTA literally reads "Napíšte nám" — *write to us*.
*Why it matters:* PRODUCT.md names the phone call as the only conversion and says it must never be more than a thumb's reach away. Every persona converts by dialling.
*Fix:* Real number in the header as a tappable, visually distinct `tel:`. Persistent bottom call bar on mobile. Hero primary CTA becomes "Zavolajte nám" / "Hívjon minket" / "Call us". Until the real number arrives, render a visible pending slot — never a live fake `tel:`.
*Command:* `/impeccable clarify`

**[P0] Fabricated facts rendered as truth.**
`services.ts` ships `durationMinutes: 60/15/90/120` and `capacity: 4/1/10/20/25`; `ponuka/page.tsx` renders them as "Trvanie: 60 min", "Kapacita: do 4 osôb". PRODUCT.md lists these under facts that exist but whose values were never supplied.
*Why it matters:* A teacher sizes a class against an invented capacity. These are operational commitments the association never made, published in three languages, on a grant-funded public site.
*Fix:* Set every value to `null` — rendering is already conditional, so they vanish with no layout work. Then design the empty slot deliberately: "Trvanie a kapacita — dohodneme telefonicky" converts a missing fact into a reason to call.
*Command:* `/impeccable harden`

**[P1] The design has no subject.**
No image, mark, motif or shape references horses, children, the castle or thyme anywhere. Assessment B confirmed the two real photos in `public/galeria/` have **zero code references** — neither filename appears in `src/`, `messages/` or config — while the gallery renders six dashed `aria-hidden` boxes and ~560KB of real photography sits unused.
*Why it matters:* Persuasion for a horse experience is fundamentally visual. A parent needs to see a child on a led pony with an adult's hand on the bridle. The layout also has no image well, no full-bleed band and no aspect-ratio container on the homepage, so photos will have to be retrofitted into a text layout.
*Fix:* Wire the two photos in now via `next/image`. Build the castle ridge as a real graphic device — an SVG hillside-and-tower silhouette as section divider and hero edge. It is the product's name; it should be the product's shape, and the association has no logo, so that mark is sitting unbuilt in plain sight. Replace Inter.
*Command:* `/impeccable bolder`

**[P1] The header breaks on the primary device, in every locale.**
`site-header.tsx:26` is `flex items-center justify-between gap-4` with no `min-w-0` and no truncation. At 360px the fixed right cluster (three language pills + a text "Menu" pill) takes ~194px, leaving ~118px for a 27–29 character serif wordmark. Hungarian "OZ Tymián – lovak a vár alatt" wraps to three lines, producing a ~90px sticky header. Desktop nav clears 1024px by only ~60px in Hungarian.
*Why it matters:* Phones on weak rural signal are the named primary case and Hungarian is a named first-class layout case. This happens on load, in every language, before any content is read.
*Fix:* `min-w-0` plus a clamp on the wordmark, or split it — "kone pod hradom" as the mark with "OZ Tymián" small beneath. Icon button instead of the text "Menu" toggle. Collapse the switcher to a single expanding control. Re-measure at 360px in Hungarian first.
*Command:* `/impeccable adapt`

**[P2] The footer's last impression is unfinished paperwork.**
`site-footer.tsx:23` renders `<PublicityLogos>` above the association's own identity, in the strongest tint on the page, containing "logo 1 / logo 2 / logo 3" dashed boxes and a developer-facing note. The last clickable element before the copyright is an outbound link away.
*Why it matters:* Peak-end. The final impression is *this site isn't finished*, which a visitor generalises to the operation. The brief said present and legible **without dominating**; it currently dominates, and the funder outranks the client.
*Fix:* Move the block below the identity/nav/contact grid, above the copyright. Drop the tint to the footer ground. Obtain the three logo files and the prescribed per-language sentence. Give the last content slot to the phone number.
*Command:* `/impeccable layout`

## Persona Red Flags

**Jordan (confused first-timer):** The `h1` repeats the wordmark 60px above it — his largest visual input tells him nothing new. Five text-only cards carry full card grammar (`rounded-2xl border`, heading, body) and are inert; he taps one and nothing happens, and the link that does work 40px below is labelled identically to the hero pill he already ignored. "Rezervácia" — the word he understands as *the thing you do on a site like this* — leads to a page saying the system doesn't exist. Three bare codes `SK HU EN` sit in the same visual family as the "Menu" pill and read as more nav.

**Casey (distracted, slow rural connection):** Taps `HU`, `router.replace()` fires with no pending state, the UI freezes on two bars, he taps twice more and leaves — the most likely abandonment event on the site, four lines from being fixed. Inter *and* Source Serif 4 × `latin` + `latin-ext` = four font files on the connection the brief calls out, with `display: swap` reflowing the `text-7xl` hero mid-read. `backdrop-blur` on a `sticky z-50` header is a per-frame compositing cost on a mid-range Android for an effect he'll never notice. He burns a page load reaching six empty rectangles while the photos he came for sit unreferenced on disk.

**The parent of a four-year-old (project-specific, and the brief's centre of gravity):** Nothing on the homepage confirms a small child is safe — no minimum age, no mention that rides are led on foot by an adult, no helmet, no "if she's frightened she can brush the mane instead." The nearest answer is two clauses buried in card body copy on a second page. She has scrolled past three of five sections without seeing a child, a horse or a face. She cannot plan the morning: no hours, no season, no price, no toilet, no distance from the castle car park. Her instinct is to phone and ask "is four too young?" — the site offers her *write to us*, and there is no number. The loudest block on the page tells her they are *building* something; she reads *not ready*. The page ends on "arrange in advance," a small text link, and three boxes labelled logo 1, logo 2, logo 3. She closes the tab and opens Instagram, where the photos actually are.

## Cognitive Load — 4 failures of 8

FAIL **single focus** (five CTAs, four destinations, zero phone calls). FAIL **visual hierarchy** (largest type is the site's own name repeated from the header; strongest colour block is a construction project; loudest footer element is grant placeholders). FAIL **minimal choices** (6 nav items + 3 language pills + menu toggle; two nav destinations are non-destinations). FAIL **working memory** (three inert homepage cards, then `/ponuka` re-renders the same five items in a different form with data the homepage never mentioned).

PASS chunking, grouping, one-thing-at-a-time, progressive disclosure. Diagnostic: all four failures are hierarchy-and-goal failures, not layout failures. The structure is sound; the argument is missing.

## Emotional Journey

Flat → mild disappointment → unfinished. No peak; the end is the low point. A visitor arriving from Instagram has just seen horses and lands on typography. Twenty seconds in, they have not seen a horse, a child, a face or a place — while being asked to trust that a 1,000-pound animal is safe near their four-year-old. The strongest designed moment on the page is about *building an eco-centre*, which a parent choosing Saturday reads as *not finished, not for me yet*. Peak-end then closes on unfinished grant paperwork addressed to the developer.

## Minor Observations

- Three `<h2>` elements in the footer of every page compete with content headings in the document outline.
- `globals.css:27` sets `scroll-behavior: smooth` with zero in-page anchors anywhere — dead rule, with a dutiful `prefers-reduced-motion` override for the thing that never happens.
- Mobile menu toggle is ~36px tall and language pills ~26px — both under the 44px touch minimum, on the primary platform, for the trilingual region's most-used control.
- `publicity-logos.tsx:46` uses `text-[11px]` at `text-bark-soft/70`, failing contrast (placeholder-only). Confirmed by B as one of only four arbitrary Tailwind values in the codebase.
- `galeria/page.tsx:34` renders `null` for the populated case — the gallery has no implementation, only an empty state.
- `services.ts` carries `href` on every service that `page.tsx` never reads; all three homepage cards are inert.
- `site-footer.tsx:96` calls `new Date().getFullYear()` in a statically-rendered server component — the copyright year freezes at build time.
- B confirms `next.config.ts` has no `images` config at all, so the two photos have no optimization pipeline waiting for them.

## Questions to Consider

1. What if the homepage were one screen: a photograph of a child on a led pony, one sentence, and a phone number? Everything else is one tap away in the nav.
2. What if the primary button were the phone number itself at hero scale — the actual digits, tappable? With one conversion and no booking system, the number *is* the call to action.
3. The site is named "horses below the castle" and the castle is nowhere in it. What if the ridge became the structural device — the line the hero sits under, the shape dividing every section, the mark in the header? The association has no logo, and that mark is sitting unbuilt in its own name.
4. What if you designed *for* phone snapshots — hard crops, duotone, deliberate framing — instead of designing around their absence? The two photos in the repo are a free test of this and it has never been run.
5. Should Ekovan be on the homepage at all, or is it the footer's civic-duty section next to the Terra Incognita block? It is the funder's priority, not the visitor's, and it currently has the page's strongest treatment while a four-year-old's safety has none.
6. What if `/rezervacia` didn't exist yet and `/kontakt` were called "Prísť za nami" — come and see us?
7. A placeholder that survives long enough to be reviewed has become the design. The tokens make the swap free. What is the actual cost of committing this week?
8. What would this site look like if you started from the phone number and worked outward, instead of starting from a landing-page template and looking for somewhere to put it?
