# Māhira House — hotel website preview

A lightweight, responsive multi-page website concept for a fictional heritage hotel on Lake Pichola in Udaipur. Built with plain HTML, CSS and JavaScript so it can be previewed and hosted as a static site without a build step or third-party packages.

## Pages

- `index.html` — cinematic home page and stay availability form
- `stays.html` — room cards, view/bed filters and interactive floorplan previews
- `celebrations.html` — guest-capacity venue recommender and celebration enquiry form
- `dining.html` — tabbed Mewari, all-day and high-tea menus with vegetarian/Jain/seasonal tags
- `experiences.html` — lake, wellness and local experiences with a sample day itinerary

## Run locally

From the repository root, start any static server, for example:

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Then open `http://localhost:8080` (or the forwarded preview URL when running in a hosted workspace).

## Before a real launch

This is a design/demo property; the name, location, descriptions, room inventory, rates and menu are illustrative. Replace them with verified hotel information before publishing.

- The stay and celebration forms validate entries and save a preview copy to this browser's `localStorage`. They do **not** send data to the hotel. Connect a booking engine / reservation inbox and a secure server before accepting live enquiries or payments.
- Add the hotel's WhatsApp Business number (country code followed by digits, with no `+`, spaces or punctuation) to `HOTEL_WHATSAPP` near the top of `scripts/site.js`. Until configured, WhatsApp links open a share flow rather than a direct hotel chat.
- No Razorpay/Cashfree keys or payment processing are included; integrate these through a secure server-side booking flow.
- The local WebP images are original AI-generated concept imagery and should be replaced with approved property photography when available.

Fonts load from Google Fonts when online; system fallbacks are provided.
