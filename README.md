# Mirāan Agra — luxury hotel demo

A cinematic, mobile-first hotel website concept for **Mirāan Agra**, a fictional design-led stay inspired by the light, craft and layered history of Agra. The attached visuals were treated as creative direction only; the site uses original generated concept imagery and should not be mistaken for a live hotel or booking service.

## Stack

- Next.js App Router and React
- Tailwind CSS 4 plus a responsive editorial stylesheet
- GSAP + ScrollTrigger for reveals, parallax and counters
- Lenis for smooth scrolling (automatically skipped when reduced motion is preferred)
- Optimized local WebP concept imagery in `public/images/`

## Pages

- `/` — full-bleed Agra hero, optional ambient video, sticky booking bar, rooms, celebrations, dining and city stories
- `/rooms` — room cards, Taj / garden / heritage view filters, bed filters and illustrative interactive floorplans
- `/weddings` — 100–500+ guest venue-fit calculator, browser-only event enquiry and a floating WhatsApp concierge link
- `/dining` — tabbed vegetarian menu with green-dot vegetarian markers and Jain / seasonal labels
- `/experiences` — Agra discovery cards and a sample, flexible day itinerary

The responsive navigation, booking enquiry dialog, enquiry form feedback, menu tabs, room filters and gallery controls are interactive. The design honours `prefers-reduced-motion`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Create an optimized production build with:

```bash
npm run build
npm run start
```

## Optional configuration

Copy `.env.example` to `.env.local` if you want to configure optional integrations:

- `NEXT_PUBLIC_HERO_VIDEO_URL` — an externally hosted, muted/looping MP4 or WebM. If unset, the site uses its local dusk image treatment.
- `NEXT_PUBLIC_HOTEL_WHATSAPP` — WhatsApp Business number in international digits only (country code included; no `+`, spaces or punctuation). When empty, the prefilled button opens WhatsApp’s share flow rather than a direct hotel chat.

## Prototype boundaries — read before launch

This is a front-end demonstration, not a reservation system. Do not collect live guest data or payments with it.

- Stay and event enquiries are only saved to the visitor’s browser `localStorage`; they are not sent to hotel staff or a server.
- The Razorpay / UPI / NetBanking marks in the reservation dialog are **integration placeholders only**. No checkout, payment capture or payment credentials are configured. A live implementation needs a server-created Razorpay order, signature verification, webhook handling and appropriate data protection; never expose a Razorpay secret in client code.
- Room availability, INR rates, venue capacities, amenities, itineraries and all property details are illustrative. Verify every operational claim with the hotel before publishing.
- The visual assets are generated concept imagery. Replace them with approved, correctly licensed hotel photography before a real launch.
- Google Fonts are loaded online; local serif and sans-serif fallbacks are included.
