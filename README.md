# Aangan House — Homestay website preview (Version 2)

A fresh, responsive multi-page concept for a fictional family homestay in Braj, Mathura. Version 2 replaces the palace-hotel concept with a warmer, more lived-in homestay identity: deep plum, rose clay, saffron and neem green, original local-feeling AI imagery, and lightweight motion built with CSS and vanilla JavaScript.

## Pages

- `index.html` — cinematic home page, date enquiry bar, rooms, small rituals and the family table
- `stays.html` — three illustrative rooms, view/bed filters and room-layout previews
- `our-home.html` — host story, homestay notes and FAQs
- `experiences.html` — filterable at-home / out-in-Braj activities and a sample slow-day timeline
- `dining.html` — tabbed vegetarian menus with Jain and seasonal tags

## Preview locally

No package installation or build step is needed. From the repository root:

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Then open `http://localhost:8080` (or the hosted workspace preview URL).

## Motion and interaction

The site includes an animated image-led hero, staggered intro, scroll reveals, a reading-progress line, gentle parallax, hover transitions, a horizontal swipe gallery, responsive mobile navigation, room filters, native-dialog floorplan sketches, menu tabs and a stay enquiry modal. Reduced-motion preferences are respected.

## Before a real launch

Aangan House, its Mathura/Braj setting, host imagery, room inventory, rates, menu and experiences are illustrative. Replace demo details with verified information before publishing.

- Enquiry forms validate and save a preview record in the visitor's browser `localStorage`; they do **not** send information to a host. Connect a secure booking backend, hotel inbox or reservation engine before accepting live enquiries.
- Add the real WhatsApp Business number to `HOST_WHATSAPP` near the top of `scripts/site.js` (country code plus digits, no `+`, spaces or punctuation). Until configured, the link opens WhatsApp's share flow rather than a direct chat.
- No Razorpay/Cashfree payment gateway is connected. Add payment processing through a secure server-side reservation flow.
- Replace the local WebP concept images with approved homestay photography when available. Google Fonts load online; local fallbacks are included.
