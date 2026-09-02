# Arden Exteriors — Design Guide

## Purpose

A premium, cinematic landing-page foundation for a residential exterior, roofing, siding, or construction company. The copy, images, logo treatment, contact details, and video are designed to be replaced without changing the layout.

## Brand direction

- Tone: deliberate, architectural, restrained, trustworthy.
- Primary surface: charcoal `#151719`.
- Light surface: warm white `#F7F7F5`.
- Accent: construction red `#DF1F3D`.
- Type: Cabinet Grotesk with DM Mono for utility text and navigation.

## Page structure

1. Full-screen autoplay video hero.
2. Compact proof strip.
3. Three service cards.
4. Dark credibility chapter with a visual and three reasons.
5. Six-image project grid.
6. Testimonial carousel.
7. FAQ.
8. Contact form and footer.

## Navigation behavior

The navigation is intentionally hidden while the page is at the video hero. Once the visitor scrolls past roughly 82% of the viewport, it enters as a fixed charcoal bar. This logic lives in `script.js` and is styled in `styles.css`.

## Replaceable content

- Hero video: `assets/hero-roof.webm`
- Hero copy and links: `index.html`, inside `.hero`
- Service, project, testimonial, FAQ, and contact copy: `index.html`
- Placeholder project photography: direct image URLs in `index.html`
- Color tokens: the `:root` rules in `styles.css`

## Running locally

Open `index.html` directly, or serve the folder with any static web server. No build step is required. GSAP and fonts load from public CDNs.
