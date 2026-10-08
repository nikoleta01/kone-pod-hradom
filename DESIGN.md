---
name: Kone pod hradom
description: A family's shared forest-school field journal for OZ Tymián - kone pod hradom
colors:
  emerald: "#0e6b4a"
  emerald-deep: "#0a4f37"
  emerald-soft: "#e3eee8"
  cream: "#fbf8f1"
  card: "#f3eee1"
  charcoal: "#262b26"
  charcoal-soft: "#4a534c"
  brown: "#6b4a31"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontWeight: 700
    lineHeight: 1.05
  body:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  md: "12px"
  full: "9999px"
components:
  phone-card:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.emerald}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  entry-dot:
    backgroundColor: "{colors.brown}"
    rounded: "9999px"
    size: "12px"
---

# Design System: Kone pod hradom

## Overview

**Creative North Star: "The Forest Trail Log"**

The site reads as a family's shared forest-school field journal — dated entries a parent and child fill in together, in the spirit of the association's own _lesná pedagogika_. It refuses two things at once: the generic eco-tourism template (hero photo, rounded sans, green-gradient button, stock family-in-nature imagery), and any "drop the kids off" summer-camp framing — parents stay in the frame throughout, because the client is explicit that families do the workshops together, not alongside them.

The material world is laminated nature-ID card stock, a hand-ruled logbook grid, rope/twine binding marks, and hole-punch dots — instructional ephemera built to survive rain and small hands, not a marketing surface. Color is carried by the client's own emerald green, refining the incumbent olive documented from the association's posters toward a truer, calmer emerald, used at page scale as the dominant ink rather than as an accent. Cream is the card/page ground; wood brown is structural (binding lines, hole-punch marks) and never decorative texture. No distressed edges, no torn paper, no pinecone clip art, no photo vignettes — the site is warm and calm, not twee.

Structure comes from the logbook itself, not from a staging device layered on top: the homepage's real sections (cover, meeting the horses, the programmes, the visit) read as successive entries on one bound spine — a rule line with a hole-punch mark at each entry — rather than a card grid or dashboard. The Ekovan project, not yet built, is deliberately staged as a loose page tucked outside that spine: a dashed border and a slight rotation, rather than another bound entry. This keeps the page light on weak rural signal — no scroll-driven reveal, no parallax, no always-on animation.

**Key Characteristics:**

- Logbook/field-card structure: a bound spine of entries, plus one unbound "loose page" for what isn't built yet
- Emerald green as the dominant page-scale ink, not an accent color
- Calm, family-and-child-legible, eco-positive — never twee, never salesy
- No shadows-as-decoration, no distressed/vintage texture, no stock photography
- Parents stay in frame: no "drop the kids off" framing anywhere in copy or composition

## Colors

Restrained strategy: emerald carries structure and headings; cream is the resting ground; brown appears only as rule lines and binding marks.

### Primary

- **Trail Emerald** (`#0e6b4a`) — the dominant ink: headings, card/section borders, binding rules, the phone card, active nav state.
- **Trail Emerald, Deep** (`#0a4f37`) — hover/active state for emerald text and links.
- **Trail Emerald, Soft** (`#e3eee8`) — the only tint fill of emerald; used solely for the active-nav pill and the confirmed-age tag background, never as a section background.

### Neutral

- **Cream Ground** (`#fbf8f1`) — the page background.
- **Field Card Cream** (`#f3eee1`) — a section's own ground when it needs to read as a distinct card (the cover entry, the Ekovan aside), one step deeper than the page so no shadow is needed to separate it.
- **Binding Brown** (`#6b4a31`) — rule lines and borders; never a text color or a fill. One exception: below `sm`, where the header castle mark stands alone without the site name, it is brown. From `sm` up, mark and name are both Ink Charcoal.
- **Ink Charcoal** (`#262b26`) — body text; not pure black.
- **Ink Charcoal, Soft** (`#4a534c`) — secondary/supporting text, tinted from the same hue as Ink Charcoal, never gray.

### Named Rules

**The Ink, Not Accent Rule.** Emerald is the page's structural color, not a 10%-accent. It owns headings, borders and the primary action; it is never reduced to a button-only highlight.

**The No-Texture Rule.** Nothing simulates paper wear, distressing, or torn edges. Warmth comes from the logbook structure and voice, not from a rendered material effect — this is the explicit line the redesign draws against the incumbent posters.

## Typography

**Display Font:** Newsreader (variable weight, optical-size axis), with a Georgia / serif fallback. Chosen by the client in Oct 2026, replacing Big Shoulders Stencil. The `font-stencil` utility name is kept and now points at Newsreader.
**Body Font:** Source Sans 3, with a system sans fallback. A humanist sans picked in Oct 2026 to sit with Newsreader, replacing Inter, which read too cool and technical next to the serif.

**Character:** Warm and bookish: headers are a calm reading serif, set at its optical size; body text is plain and legible, carrying no personality of its own so Slovak, Hungarian and English never fight the layout at different string lengths.

### Hierarchy

- **Display** (700, `text-5xl`–`text-7xl` responsive, 1.05 line-height): the cover entry's headline only.
- **Headline** (700, `text-3xl`–`text-4xl`): each spine entry's heading (`h2`).
- **Title** (600, `text-xl`): a service row's name within an entry (`h3`).
- **Body** (400, `text-base`–`text-xl`, 1.5–1.6 line-height): all prose; kept to a comfortable measure so Hungarian's longer strings don't force awkward wraps.
- **Label** (500, `text-xs`–`text-sm`): the cover's location tag, the age tag, the workshop-schedule note — always in the body face, never the display face.

### Named Rules

**The Display-Is-For-Headers-Only Rule.** Newsreader never sets body copy or long-form text; it marks headings and the recurring entry structure, the way a stamp marks a card.

## Layout

The homepage is one continuous logbook: a cover entry (full-width card), then the entries stacked top to bottom inside a `max-w-6xl` column. There is no rule line or dot down the left edge: it was tried and removed in Sep 2026 as visual noise, so entries separate by spacing and their own borders. The Ekovan entry breaks from the column deliberately with a dashed border, indented further right, rotated -1°, reading as an unbound loose page. After it comes the one full-bleed band on the site, "Support us": emerald ground, cream ink, the same rounded cards and a dashed border for what is not ready yet (the 2 % tax share), so the colors invert but the structure does not.

Homepage order: cover, then the offer cards (what you can do here) straight away, then meet the horses, come visit, questions, then the Ekovan loose page, then the Support band. The order follows a parent's decision (what is it, what can we do, how do we get there, what else do I need to know), and asks for money only after that.

**The One Green Band Rule.** Exactly one section on the site sits on a full-width emerald ground: Support us. A second band would turn the separator into a pattern and stop marking anything. Other sections separate by rule lines, borders and the Field Card Cream ground. No scroll-triggered reveal, parallax, or sweep device: the product's constraint is weak rural signal and an anxious parent who needs the point fast, and the redesign named those staging devices and rejected them on that ground.

**The One Line Weight Rule.** Every border and divider on the site is 1px: card borders, buttons, section rules, list dividers, the header rule. Softer separators change color or opacity (`brown/25`), never thickness.

## Elevation & Depth

Flat by default. Depth is conveyed by the logbook's own material logic — the cover entry and the Ekovan aside sit on Field Card Cream, one step deeper than the page's Cream Ground, distinguished by that ground shift and a solid or dashed emerald border, never a shadow.

### Named Rules

**The Flat Field Rule.** No drop shadows as a default decoration anywhere on the site.

## Shapes

Two shapes, one rule each. Buttons and anything you tap to choose (the donation amount chips, and the custom amount field in that same row) are fully round (`rounded-full`), like the nav pills. Everything else, every card, photo, tag and container, uses one radius, `rounded-xl` (12px), like a laminated card's trimmed edge. Never mix in `rounded-lg` or `rounded-2xl`. An element inset inside a 1px border uses the matching inner radius (11px), which is the same corner, not a second radius — not sharp brochure rectangles, not pill-shaped app chrome (nav links are the one intentional exception: full pills, inherited from the incumbent implementation's control language). Binding marks — hole-punch dots on the spine, a dashed border on the Ekovan aside — are the recurring signature geometry, appearing at consistent positions rather than as one-off ornament.

## Components

### Phone card

The site's one conversion, styled as the log's own "who to call" line rather than a generic button. Outlined in green with no fill of its own (the page shows through), 1px Emerald border, Emerald number and phone icon. No pure white anywhere on the site as a live `tel:` link, with one short supporting line under it. Appears once, in the FAQ section next to the social links. The hero instead carries a same-shaped button that scrolls to "Čo u nás zažijete".

### Entry (`Entry`)

A homepage section in the shared column: a heading in the display face, then body content. Used for every homepage section except the cover (which is the spine's origin, not an entry on it) and Ekovan (which is deliberately off the spine).

### Service row

A programme entry in the "programmes" section is a ruled list row, not a same-size icon-card: title plus description, separated by a `border-brown/25` top rule between rows, with a small Emerald-Soft age tag shown only where a real age range is confirmed (never a placeholder chip on this page — unresolved facts stay on `/ponuka`).

### Ekovan aside

A dashed-border, rotated (-1°), indented card in Field Card Cream — the one section that is not a spine entry, matching its own status as "not yet built."

### Navigation

Pill-shaped links (inherited control language). One state grammar shared with the language switcher:

- **Hover** (nav and languages alike): a lighter Emerald-Soft pill (60%) and Emerald-Deep text. In the nav, a faint horseshoe (40%) also appears in its slot, previewing the current-page look.
- **Current page:** full Emerald-Soft pill with a 1px Emerald-Deep border, Emerald-Deep text, and the horseshoe (`HorseshoeMark`, 18px, rotated -15°) inside the pill, left of the label. Every nav link reserves the horseshoe's slot, so labels never shift between pages. In the mobile menu, the current row is Emerald-Deep text with the same horseshoe.
- **Current language:** solid Emerald pill with cream text and a 1px Emerald-Deep border, the same treatment as the hero's primary button. Stronger than the current page on purpose: it is a setting the visitor chose, not a place. Header background is Cream Ground (matching the page, not the card ground it sits above). The header's bottom rule is a 1px, 25% opacity full-width brown line — the same binding-rule color used on the spine below it, kept deliberately subtle rather than a bold divider.

## Do's and Don'ts

### Do:

- **Do** keep families together in every depiction and every line of copy — no framing implies a parent drops a child off.
- **Do** use emerald at page scale (headers, borders, the primary phone card, nav), not as a small accent.
- **Do** keep the hole-punch/binding-rule motif as the site's one recurring signature on spine entries, and reserve the dashed rotated card exclusively for not-yet-built work.
- **Do** keep the phone number tappable and visually part of an entry card, not buried in a nav bar.
- **Do** keep motion minimal and content visible by default, honoring the weak-signal, phone-first constraint from PRODUCT.md.
- **Do** show a real, confirmed fact (like a workshop's age range) as a small tag when it's genuinely on record; never invent one for a service the association hasn't confirmed.

### Don't:

- **Don't** reintroduce the incumbent posters' distressed texture, torn-paper edges, pinecone/mushroom ornament, or circular photo vignettes — that execution was explicitly rejected, not merely softened.
- **Don't** use stock or AI-generic imagery; only the association's own real photographs.
- **Don't** add scroll-driven reveal, parallax, or sweep/scan motion devices — considered and rejected for this world.
- **Don't** invent visitor counts, testimonials, prices, or capabilities the association hasn't confirmed (per PRODUCT.md); an unresolved fact stays a visible placeholder, not a fabricated tag.
- **Don't** treat cream as the resting color choice on its own — emerald leads; cream is ground only.
- **Don't** give the Ekovan aside a dot on the spine or a solid border — that would visually claim it as built when it isn't.
