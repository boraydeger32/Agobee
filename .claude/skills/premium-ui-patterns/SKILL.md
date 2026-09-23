---
name: premium-ui-patterns
description: Luxury web design patterns for the AGOBEE site — layout, spacing, motion, imagery treatment, component recipes that make a page read as "elite/premium". Load before building or reviewing any page or component.
---

# Premium UI Patterns (AGOBEE)

Load `agobee-brand` first for tokens. This skill covers *how* premium is constructed.

## Layout principles
- Whitespace is the luxury signal: section vertical padding ≥ 120px desktop / 64px mobile. Max content width 1200–1320px; hero text max-width ~640px.
- Asymmetric editorial layouts (image 7 cols / text 5 cols) beat centered-everything. Center only heroes and section titles.
- One idea per viewport. Never stack more than one CTA pair per section.
- 12-column grid, 24px gutter; align to it strictly — misalignment reads as cheap.

## Section recipes
- **Hero**: full-bleed noir, subtle honeycomb texture, bee monogram, serif uppercase headline with tracked letters, thin gold rule, single gold-outline CTA. Optional slow Ken-Burns product image.
- **Product line selector**: 4 segment cards (Military/Daily/Healthcare/Outdoor), each tinted with its segment color, gold line frame, hover = 1.02 scale + border brightens. Links to segment detail pages.
- **Hotel Collection**: horizontal showcase on dark marble imagery, product bottles cut out or in-situ, navy accent.
- **B2B strip**: ivory background section — certifications, OEM/private label, procurement contact. Serif pull-quote style.
- **Footer**: noir, three thin columns, gold hairline top border, monogram centered above legal line.

## Component details
- Buttons: 1px gold border, transparent fill, uppercase tracked label, 48px min height; hover fills with gold gradient + noir text. No rounded-pill; 2px radius max.
- Cards: `--agobee-noir-soft` bg, 1px `--agobee-gold-deep` border at 40% opacity, inner 1px offset line (double-frame packaging effect).
- Dividers: centered 1px gold line, 120px wide, with a small hexagon or diamond at each end.
- Forms: underline-only inputs on dark (1px ivory 30%, focus → gold), floating labels, generous spacing.
- Nav: transparent over hero → solid noir with hairline gold bottom border after 40px scroll. Logo center or left, uppercase tracked links, langswitch TR/EN.

## Imagery
- Product photos on dark marble/stone or pure noir; never white e-commerce cutouts on the dark theme.
- Apply subtle vignette; keep gold highlights warm (no cold color grading).
- Reserve full-color lifestyle imagery for segment pages (mountains for Outdoor, clinical for Healthcare, field/tactical for Military — tasteful, no weapons imagery).

## Motion
- Scroll-reveal: opacity 0→1 + translateY 24px→0, 600ms cubic-bezier(0.22,1,0.36,1), stagger 80ms. Once per element, respect `prefers-reduced-motion`.
- Gold shimmer on headings: allowed once (hero), background-position animation over the gold gradient, ≥6s loop, subtle.
- Never: parallax jank, autoplaying carousels faster than 6s, bounce easings, loading spinners in brand gold (use hairline progress bar).

## Anti-patterns (instant premium-killers)
- Drop shadows with visible blur radius > 24px or dark "glow" cards
- Pure #FFF backgrounds abutting noir sections without an ivory transition
- More than 2 font families, or bold condensed sans headlines
- Emoji, badge clutter ("SALE", "NEW"), star-rating widgets on the corporate site
- Stock icon packs with filled colorful icons — use 1px line icons only, gold or ivory
