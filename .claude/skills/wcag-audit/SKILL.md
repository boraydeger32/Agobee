---
name: wcag-audit
description: WCAG 2.2 AA accessibility checklist tailored to AGOBEE's dark/gold luxury theme. Load when building, reviewing, or auditing any UI for accessibility.
---

# WCAG 2.2 AA Audit — AGOBEE Edition

Dark-luxury themes fail accessibility in predictable ways. Check these in order.

## 1. Contrast (the gold-on-black trap)
- Body text on `--agobee-noir` must be `--agobee-ivory` (#F4EFE6 on #0B0B0C ≈ 17:1 ✓).
- `--agobee-gold` #C6A15B on #0B0B0C ≈ 7.4:1 — passes AA for normal text, but `--agobee-gold-deep` #97742F ≈ 4.2:1 fails normal text (large text/decorative only).
- Gold gradient text: measure the *darkest* stop against the background.
- Segment colors: ivory text on crimson #7E1F2B, forest #1F3A2D, navy #1C2440 all pass; gold on crimson is borderline — verify with a contrast tool before shipping.
- Verify programmatically: `npx @adobe/leonardo-contrast-colors` or a quick script; never eyeball.

## 2. Semantic structure
- One `<h1>` per page; heading levels never skip. Decorative serif labels ("PURE. NATURAL.") are `<p>`/`<span>`, not headings.
- Landmarks: `<header> <nav> <main> <footer>`; segment card grids are `<ul>`; language switcher is a `<nav aria-label="Language">`.
- `lang` attribute switches with TR/EN content, including `hreflang` on alternate links.

## 3. Keyboard & focus
- Every interactive element reachable by Tab in visual order; no positive tabindex.
- Focus visible: 2px gold outline with 2px offset — the brand hover style (border brighten) is NOT sufficient as focus indicator alone (WCAG 2.4.13-friendly).
- Skip link ("İçeriğe geç / Skip to content") first in DOM, visible on focus, styled on-brand.
- Mobile nav drawer: focus trapped while open, Esc closes, focus returns to trigger.

## 4. Motion & media
- All scroll-reveals and shimmers wrapped in `@media (prefers-reduced-motion: no-preference)`.
- No content conveyed only by animation. Autoplay video: muted, with pause control.
- Product images: meaningful `alt` in the page language ("AGOBEE askeri seri vücut temizleme mendili, siyah-altın ambalaj"), decorative honeycomb textures `alt=""`/CSS backgrounds.

## 5. Forms & targets
- Contact/B2B forms: visible `<label>`s (floating labels must remain visible after fill), errors as text + `aria-describedby`, not color alone.
- Touch targets ≥ 24×24px (2.5.8), buttons ≥ 44px height on mobile.
- Autocomplete attributes on name/email/phone fields.

## 6. Audit procedure
1. Run axe-core (`npx @axe-core/cli <url>`) — zero violations tolerated.
2. Keyboard-only pass through every page and the nav drawer.
3. Contrast-check every text/background pair introduced since last audit.
4. Screen-reader smoke test of hero, product selector, and contact form (VoiceOver: Cmd+F5).
5. Report findings as: severity (blocker/major/minor), WCAG criterion number, element, fix.
