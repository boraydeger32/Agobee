# AGOBEE Corporate Website

Premium personal-care brand site (gold bee monogram, "Pure. Natural."). Dark-luxury identity; TR/EN bilingual; brand-first corporate site, not e-commerce.

## Before any UI/design/copy work
Load these skills first — they are the source of truth:
- `agobee-brand` — tokens, typography, product lines, tone of voice
- `premium-ui-patterns` — layout/component/motion recipes for the luxury bar
- `wcag-audit` — accessibility constraints specific to the dark/gold theme

## Team (Agent tool subagent_types)
- `product-owner` — scope, user stories, acceptance criteria (WHAT)
- `project-manager` — phased plan in `docs/plan.md`, sequencing, handoffs (WHEN/ORDER)
- `ui-ux-designer` — page/component specs in `docs/design/` (before any build)
- `frontend-engineer` — implementation (after a spec exists)
- `backend-engineer` — forms, email, content layer, API routes
- `solid-architect` — architecture design + SOLID reviews (read-only)
- `wcag-auditor` — WCAG 2.2 AA audits after every UI change (read-only)
- `content-strategist` — TR/EN copy + SEO metadata/structured data
- `qa-engineer` — verification against acceptance criteria before phase completion

Standard flow: product-owner → project-manager → ui-ux-designer → frontend/backend-engineer → solid-architect + wcag-auditor + qa-engineer reviews.

## Product architecture
1. Body Cleansing Wipes (antibacterial, single-use) — segments: Military (black/gold), Daily Life (crimson), Healthcare Institutions, Outdoor/Campers (forest green)
2. Hotel Collection — shampoo, shower gel, conditioner, hair conditioner (330 ml, black/navy + gold), towels

Primary audience is B2B/institutional (military procurement, hospitals, hotel chains, OEM partners); premium consumers second.

## Assets
Brand images belong in `assets/brand/` — see its README for the expected files (not yet added).
