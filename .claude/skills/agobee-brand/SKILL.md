---
name: agobee-brand
description: AGOBEE brand identity source of truth — color tokens, typography, motifs, product lines, tone of voice. Load BEFORE writing any UI code, CSS, copy, or design decision for the AGOBEE website.
---

# AGOBEE Brand Identity — Source of Truth

AGOBEE is a premium personal-care brand ("Pure. Natural.") with a gold bee monogram on deep black. Every pixel of the website must feel like the packaging: quiet luxury, generous space, engraved-gold detail. Think five-star hotel amenities, not drugstore shelf.

## Brand mark
- Logo: line-drawn bee (infinity-loop wings, striped abdomen) above the AGOBEE wordmark in a high-contrast serif, with the tagline "PURE. NATURAL." letterspaced beneath.
- The bee mark may be used alone as a favicon/monogram. Never recolor the bee outside the approved palette. Never place the gold logo on mid-tone backgrounds — only on near-black, deep segment colors, or ivory.

## Color tokens (CSS custom properties)
```css
:root {
  /* Core */
  --agobee-noir: #0B0B0C;        /* primary background */
  --agobee-noir-soft: #141416;   /* raised surfaces, cards */
  --agobee-gold: #C6A15B;        /* primary brand gold */
  --agobee-gold-light: #E8CE8F;  /* gradient high, hover */
  --agobee-gold-deep: #97742F;   /* gradient low, borders */
  --agobee-ivory: #F4EFE6;       /* light text on dark, light-section bg */

  /* Segment colors (product lines) — CONFIRMED by the owner (2026-09-23) */
  --agobee-military: #5F6A41;    /* Military — desert beige/khaki, cream (#EADFB6) ink */
  --agobee-daily: #0B0B0C;       /* Daily Life — black & gold ink */
  --agobee-health: #7E1F2B;      /* Healthcare — deep red, ivory ink */
  --agobee-outdoor: #20402E;     /* Outdoor/Camping — deep forest green, gold ink */
  --agobee-hotel: #1C2440;       /* Hotel Collection — midnight navy */
}
```
Gold gradient for headings/accents: `linear-gradient(135deg, #E8CE8F 0%, #C6A15B 45%, #97742F 100%)`.
Packaging source files live in `assets/brand/` (logo.png, wipe-military/daily/green/khaki.png). Transparent logo marks extracted from the real logo: `assets/logo-mark.png` (gold), `logo-mark-ivory.png`, `logo-mark-cream.png`, `logo-full.png` — always use these, never a hand-drawn approximation.

## Typography
- Display/headings: high-contrast serif — **Cormorant Garamond** or **Playfair Display** (closest web match to the wordmark). Uppercase, letter-spacing 0.15–0.35em for hero titles and section labels.
- Body: refined geometric/humanist sans — **Jost**, **Montserrat**, or **Inter** at light/regular weight, ample line-height (1.7+).
- Micro-labels ("PURE. NATURAL.", "HOTEL COLLECTION"): uppercase sans, ~0.4em tracking, small size, gold or ivory.
- Never use bold-heavy sans headlines; luxury reads light and spaced.

## Motifs & texture
- Honeycomb/hexagon pattern as subtle background texture (≤6% opacity line work, like the wipe sachets).
- Thin gold rule lines (1px) with small diamond/hex terminals framing section titles — mirrors the "— ANTIBACTERIAL —" packaging treatment.
- Fine double-line borders around cards, echoing sachet frames.
- Marble/dark-stone photographic backdrops acceptable for product staging.

## Product architecture
1. **Body Cleansing Wipes (antibacterial, single-use)** — four segments:
   - Military / Tactical (black-gold)
   - Daily Life (crimson)
   - Healthcare Institutions
   - Outdoor — Mountaineers & Campers (forest green)
2. **Hotel Collection** — Shampoo, Shower Gel, Conditioner, Hair Conditioner (330 ml pump bottles, black & navy with gold engraving), plus branded towels.

## Tone of voice
- TR + EN bilingual site. Short declarative sentences. No exclamation marks, no discount language, no emoji.
- Vocabulary: pure, natural, refined, crafted, tactical-grade (military segment), hygiene you can trust (healthcare).
- B2B angle matters: military procurement, hospitals, hotels are buyers — include institutional credibility (certifications, MOQ, private-label/OEM) alongside consumer elegance.

## Hard rules
- Dark theme is the brand default; light sections use ivory (#F4EFE6), never pure white except Healthcare contexts.
- Gold is an accent, not a fill: large gold areas are forbidden; use it for type, lines, icons, hover states.
- Contrast: gold-on-noir body text fails WCAG at small sizes — body copy on dark is ivory; gold reserved for headings ≥24px or decorative elements. See the `wcag-audit` skill.
- Animations: slow (400–800ms), eased, subtle — fades, small translates, gold shimmer at most. Nothing bouncy.
